import { Injectable } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Injectable({
  providedIn: 'root',
})
export class GoogleMapsLoader {
  private loader: Loader;

  constructor() {
    this.loader = new Loader({
      apiKey: '',
      version: 'weekly',
      libraries: ['drawing', 'geometry'],
    });
  }

  async load(): Promise<void> {
    return this.loader.load().then(() => {
      console.log('Google Maps carregado');
    });
  }
  
}
