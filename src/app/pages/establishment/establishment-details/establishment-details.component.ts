import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ToastController, ViewDidEnter } from '@ionic/angular';
import { Establishment } from '../models/establishment.type';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EstablishmentService } from '../establishment-services/establishment.service';
import { AlertService } from '../../alert/alert-services/alert.service';
import { Alert } from '../../alert/models/alert.type';
import { firstValueFrom, switchMap } from 'rxjs';
import { User } from '../../user/models/user.type';
import { EstablishmentUserService } from '../establishment-services/establishmentUser.service';
import { AuthService } from 'src/app/services/auth.service';
import { EstablishmentUser } from '../models/establishmentUser.type';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Component({
  selector: 'app-establishment-details',
  templateUrl: './establishment-details.component.html',
  styleUrls: ['./establishment-details.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule]
})
export class EstablishmentDetailsComponent implements OnInit, ViewDidEnter {
  currentUser!: User;
  alerts: Alert[] = [];
  establishment!: Establishment;
  establishmentUser: EstablishmentUser[] | undefined = [];
  origin: string = '';
  selectedFile: File | null = null;
  mapData: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController,
    private establishmentService: EstablishmentService,
    private alertService: AlertService,
    private establishmentUserService: EstablishmentUserService,
    private authService: AuthService
  ) {
    this.carregarUsuario();

  }

  async ionViewDidEnter(): Promise<void> {
    const establishmentId = this.activatedRoute.snapshot.params['id'];
    this.origin = this.activatedRoute.snapshot.params['origin'];

    const establishmentUser = await firstValueFrom(this.establishmentUserService.getByFacilityId(establishmentId));
    this.establishmentUser = establishmentUser;
    this.establishmentService.getById(establishmentId).pipe(
      switchMap((response) => {
        this.establishment = response.facility;
        return this.alertService.getByFacilityId(establishmentId);
      })
    ).subscribe({
      next: (data) => {
        this.alerts = data;

        const currentDate = new Date();

        this.alerts.forEach(alert => {
          const endDate = new Date(alert.end_date);

          if (endDate >= currentDate) {
            this.toastController.create({
              message: `${alert.title} — ${alert.description}`,
              position: 'bottom',
              cssClass: 'toast-design',
              buttons: [
                { text: 'X', role: 'cancel' }
              ]
            }).then(toast => toast.present());
          }
        });
      },
      error: (err) => {
        console.log('Erro ao recuperar Alertas:', err);
      }
    });
  }

  async carregarUsuario() {
    try {
      const dadosUsuario = await this.authService.getUserData();
      this.currentUser = dadosUsuario.user;
    } catch (err) {
      console.error('Erro ao carregar dados do usuário', err);
    }
  }

  abrir_mapa() {
    this.router.navigate(['../establishment-maps']);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.mapData = reader.result as string;
        this.router.navigate(['../establishment-maps']);
      };
      reader.readAsText(file);
    }
  }

  /*async inserir_mapa(){
    const file = event.target.files[0];
  if (!file) return;

  try {
    const conteudo = await lerArquivo(file);
    const json = JSON.parse(conteudo);
    console.log("Arquivo lido com sucesso:", json);
    alert("Arquivo carregado! Veja o console.");
  } catch (erro) {
    console.error("Erro ao ler o arquivo:", erro);
    alert("Falha ao ler o arquivo ou JSON inválido.");
  }

    return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);

    reader.readAsText(file); // lê como texto (pode ser JSON)
  });
  }*/

  async baixar_mapa() {
    const json = this.establishment.map;

    if ((window as any).Capacitor?.isNativePlatform()) {
      await Filesystem.writeFile({
        path: 'dados.json',
        data: json,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
      alert('Arquivo salvo no dispositivo!');
    } else {
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'dados.txt';
      a.click();
      URL.revokeObjectURL(url);
    }
  }

  ngOnInit() { }

}
