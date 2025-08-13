import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface CardItem {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage {

  establishments: CardItem[] = [
    {
      title: 'ESUCRI',
      description: 'A Escola Superior de Criciúma (ESUCRI) é uma instituição de ensino superior privada, fundada em 2000, localizada no centro de Criciúma, Santa Catarina. Oferece 13 cursos de graduação e pós-graduação nas áreas de saúde, exatas, humanas e sociais, com infraestrutura moderna e mais de 9.000 m² de área construída . A ESUCRI também disponibiliza bolsas de estudo de até 100% e descontos especiais para alunos e colaboradores de empresas conveniadas .',
      image: 'https://www.esucri.com.br/img/icons/facebook.jpg',
    },
    {
      title: 'Shopping Iguatemi',
      description: 'O Shopping Iguatemi é um centro comercial moderno que oferece variedade de lojas nacionais e internacionais, praça de alimentação diversificada, cinema e eventos especiais. Com ambiente climatizado e seguro, é um espaço para compras, lazer e encontros sociais.',
      image: 'https://dcomercio.com.br/public/upload/gallery/imagens/dcomercio-shopping-iguatemi-sp-fachada-foto-clovis-ferreira-dc.jpg',
    },
    {
      title: 'Shopping Eldorado',
      description: 'possui uma estrutura de mais de 200 mil m², distribuídos em vários andares. Conta com centenas de lojas, praça de alimentação ampla, restaurantes, cinemas, teatro, academias e estacionamento com milhares de vagas. O prédio tem arquitetura moderna, climatização central e áreas de convivência planejadas para receber um grande fluxo diário de visitantes.',
      image: 'https://applications-media.feverup.com/image/upload/f_auto/fever2/plan/photo/354e187c-d595-11ee-9f5c-aaa61a5e53a1.jpg',
    },
  ];


  events: CardItem[] = [
    {
      title: 'BGS',
      description: 'A Brasil Game Show (BGS) é a maior feira de games da América Latina, reunindo fãs, desenvolvedores e empresas do setor. O evento apresenta lançamentos, campeonatos de e-sports, palestras e experiências interativas. É um ponto de encontro para quem ama jogos e tecnologia.',
      image: 'https://imgs.search.brave.com/z_6Ky2pRUE-8oaFuY4gCzGfblIapfzy3a6cESeHt6Gc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9saWNl/bnNpbmdpbnRlcm5h/dGlvbmFsLm9yZy93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMy8w/Ni9CR1MtJUUyJTgw/JTkzLUJyYXppbC1H/YW1lLVNob3cucG5n',
    },
    {
      title: 'CCXP',
      description: 'uma das maiores convenções de cultura pop do mundo. Ela reúne quadrinistas, atores, dubladores, estúdios e fãs de cinema, séries, HQs, games e cosplay, com painéis, lançamentos exclusivos e atrações interativas.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/CCXP_logo.png',
    },
  ];

  constructor(private router: Router) { }

  goToEstablishments() {
    this.router.navigateByUrl('/establishment');
  }

  goToEvents() {
    this.router.navigateByUrl('/event');
  }
}