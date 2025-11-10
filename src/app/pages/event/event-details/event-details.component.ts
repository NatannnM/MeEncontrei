import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IonicModule, ToastController, ViewDidEnter } from '@ionic/angular';
import { Event } from '../models/event.type';
import { eventsService } from '../event-services/event.service';
import { Alert } from '../../alert/models/alert.type';
import { AlertService } from '../../alert/alert-services/alert.service';
import { firstValueFrom, switchMap } from 'rxjs';
import { User } from '../../user/models/user.type';
import { EventUser } from '../models/eventUser.type';
import { EventUserService } from '../event-services/eventUser.service';
import { AuthService } from 'src/app/services/auth.service';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class EventDetailsComponent implements OnInit {
  currentUser!: User;
  alerts: Alert[] = [];
  event!: Event;
  eventUser: EventUser[] | undefined = [];
  origin: string = '';
  selectedFile: File | null = null;
  mapData: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsService: eventsService,
    private toastController: ToastController,
    private router: Router,
    private alertService: AlertService,
    private eventUserService: EventUserService,
    private authService: AuthService
  ) {
    this.carregarUsuario();
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

  async ngOnInit() {
    const eventId = this.activatedRoute.snapshot.params['id'];
    this.origin = this.activatedRoute.snapshot.params['origin'];

    const eventUser = await firstValueFrom(this.eventUserService.getByEventId(eventId));
    this.eventUser = eventUser;
    this.eventsService.getById(eventId).pipe(
      switchMap((response) => {
        this.event = response.event;
        return this.alertService.getByEventId(eventId);
      })
    ).subscribe({
      next: (data) => {
        this.alerts = data;

        const currentDate = new Date();

        this.alerts.forEach(alert => {
          const endDate = new Date(alert.end_date);

          if (endDate >= currentDate) {
            this.toastController.create({
              message: `${alert.title} - ${alert.description}`,
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

  lerArquivo(arquivo: any) {
    return new Promise((resolve, reject) => {
      const leitor = new FileReader();

      leitor.onload = () => {
        resolve(leitor.result);
      };

      leitor.onerror = () => {
        reject(leitor.error);
      };

      leitor.readAsText(arquivo);
    });
  }

  async inserir_mapa(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const conteudo = await this.lerArquivo(file);
      this.router.navigate(['/event/mapas', this.event.id, 'editar'], {
        state: { conteudo }
      });

    } catch (erro) {
      console.error("Erro ao ler o arquivo:", erro);
      alert("Falha ao ler o arquivo ou JSON inválido.");
    }
  }

  async baixar_mapa() {
    const json = this.event.map;

    if ((window as any).Capacitor?.isNativePlatform()) {
      await Filesystem.writeFile({
        path: 'dados.json',
        data: json,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
    } else {
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;

      const regexInvalido = /[/\:*?"<>|]/;
      
      a.download = !regexInvalido.test(this.event.name) ? `${this.event.name}.txt` : "mapa.txt";
      a.click();
      URL.revokeObjectURL(url);
    }
  }


}
