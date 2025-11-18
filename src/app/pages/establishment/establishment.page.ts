import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Establishment } from './models/establishment.type';
import { EstablishmentService } from './establishment-services/establishment.service';
import { LocationService } from 'src/app/services/location.service';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-establishment',
  templateUrl: './establishment.page.html',
  styleUrls: ['./establishment.page.scss'],
  standalone: false
})
export class EstablishmentPage implements OnInit, ViewDidEnter {

  establishmentList: Establishment[] = [];
  pesquisaEstablishment: Establishment[] = [];
  termoPesquisado: string = '';
  city: string | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private establishmentService: EstablishmentService,
    private toastController: ToastController,
    private locSv: LocationService,
    private storage: Storage
  ) {
  }

  async ionViewDidEnter(): Promise<void> {
    this.city = await this.detectCity();
    this.establishmentService.getList().subscribe({
      next: (response) => {
        this.establishmentList = response.facility;
        this.pesquisaEstablishment = [...this.establishmentList];
      },
      error: (error) => {
        this.toastController.create({
          message: error.error.message,
          header: 'Erro ao carregar lista de estabelecimentos',
          color: 'danger',
          position: 'top',
          duration: 3000
        }).then(toast => toast.present())
        console.error(error);
        console.error(error.error.details);
      }
    });
  }

  pesquisaEstabelecimentos() {
    const termo = this.termoPesquisado.toLowerCase().trim();

    if (termo === '') {
      this.pesquisaEstablishment = [...this.establishmentList];
      return;
    }

    this.pesquisaEstablishment = this.establishmentList.filter((est) =>
      est.name.toLowerCase().includes(termo)
    );
  }


  ngOnInit() { }

  async detectCity() {
    const city = await this.storage.get('city');
    if (city) {
      console.log('Cidade recuperada do storage:', city);
      return city;
    } else {
      console.log('Cidade não encontrada no storage.');
      return null;
    }
  }

}
