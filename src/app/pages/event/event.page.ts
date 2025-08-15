import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, ViewDidEnter, ViewDidLeave, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Event } from './models/event.type';
@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
  standalone: false
})
export class EventPage implements OnInit, ViewWillEnter, ViewDidEnter, ViewWillLeave, ViewDidLeave {

  eventList: Event[] = [
    {
      title: 'Brasil Game Show',
      image: 'https://imgs.search.brave.com/z_6Ky2pRUE-8oaFuY4gCzGfblIapfzy3a6cESeHt6Gc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9saWNl/bnNpbmdpbnRlcm5h/dGlvbmFsLm9yZy93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMy8w/Ni9CR1MtJUUyJTgw/JTkzLUJyYXppbC1H/YW1lLVNob3cucG5n',
      text: ' A Brasil Game Show (BGS) é a maior feira de games da América Latina, reunindo fãs, desenvolvedores e empresas do setor. O evento apresenta lançamentos, campeonatos de e-sports, palestras e experiências interativas. É um ponto de encontro para quem ama jogos e tecnologia.',
    },
    {
      title: 'Anime Friends',
      image: 'https://imgs.search.brave.com/TjKbWB0KSt-iKxPrWveimqEJzjIDGMeW5pPIrvPjwzE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kaXN0/cml0b2FuaGVtYmku/Y29tLmJyL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDI0LzAzL2Fu/aW1lLWZyaWVuZHMu/anBn',
      text: 'O Anime Friends é um dos maiores eventos de cultura pop asiática da América Latina, realizado anualmente no Brasil. Ele reúne fãs de anime, mangá, cosplay, games e música, oferecendo shows, palestras, concursos e estandes temáticos. É um ponto de encontro para amantes da cultura japonesa e geek.'
    },
    {
      title: 'CCXP',
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/CCXP_logo.png',
      text: 'uma das maiores convenções de cultura pop do mundo. Ela reúne quadrinistas, atores, dubladores, estúdios e fãs de cinema, séries, HQs, games e cosplay, com painéis, lançamentos exclusivos e atrações interativas.'
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
