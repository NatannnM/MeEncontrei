import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-establishment-maps',
  templateUrl: './establishment-maps.component.html',
  styleUrls: ['./establishment-maps.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class EstablishmentMapsComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
