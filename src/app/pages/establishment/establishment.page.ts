import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Establishment } from './models/establishment.type';
@Component({
  selector: 'app-establishment',
  templateUrl: './establishment.page.html',
  styleUrls: ['./establishment.page.scss'],
  standalone: false
})
export class EstablishmentPage implements OnInit, ViewWillEnter, ViewDidEnter, ViewWillLeave, ViewDidLeave {

  establishmentList: Establishment[] = [
    {
      title: 'ESUCRI',
      image: 'https://www.esucri.com.br/img/icons/facebook.jpg',
      text: 'A Escola Superior de Criciúma (ESUCRI) é uma instituição de ensino superior privada, fundada em 2000, localizada no centro de Criciúma, Santa Catarina. Oferece 13 cursos de graduação e pós-graduação nas áreas de saúde, exatas, humanas e sociais, com infraestrutura moderna e mais de 9.000 m² de área construída . A ESUCRI também disponibiliza bolsas de estudo de até 100% e descontos especiais para alunos e colaboradores de empresas conveniadas .',
    },
    {
      title: 'Shopping Iguatemi',
      image: 'https://dcomercio.com.br/public/upload/gallery/imagens/dcomercio-shopping-iguatemi-sp-fachada-foto-clovis-ferreira-dc.jpg',
      text: 'O Shopping Iguatemi é um centro comercial moderno que oferece variedade de lojas nacionais e internacionais, praça de alimentação diversificada, cinema e eventos especiais. Com ambiente climatizado e seguro, é um espaço para compras, lazer e encontros sociais.'
    },
    {
      title: 'Shopping Eldorado',
      image: 'https://applications-media.feverup.com/image/upload/f_auto/fever2/plan/photo/354e187c-d595-11ee-9f5c-aaa61a5e53a1.jpg',
      text: 'possui uma estrutura de mais de 200 mil m², distribuídos em vários andares. Conta com centenas de lojas, praça de alimentação ampla, restaurantes, cinemas, teatro, academias e estacionamento com milhares de vagas. O prédio tem arquitetura moderna, climatização central e áreas de convivência planejadas para receber um grande fluxo diário de visitantes.'
    },
  ]
  constructor(private authService: AuthService, private router: Router) { }


  ionViewDidLeave(): void {
  }
  ionViewWillLeave(): void {
  }
  ionViewDidEnter(): void {
  }
  ionViewWillEnter(): void {
  }

  ngOnInit() { }



}
