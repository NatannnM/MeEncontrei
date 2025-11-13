import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
    async getCoordsBrowser(timeoutMs = 10000): Promise<{ lat: number, lon: number }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        return reject(new Error('Geolocalização não suportada pelo navegador.'));
      }

      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: timeoutMs,
        maximumAge: 0
      };

      navigator.geolocation.getCurrentPosition(
        pos => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
        err => reject(err),
        options
      );
    });
  }

  async reverseGeocodeNominatim(lat: number, lon: number): Promise<any> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&addressdetails=1`;

    const resp = await fetch(url, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!resp.ok) throw new Error('Erro ao consultar Nominatim: ' + resp.statusText);
    const data = await resp.json();
    
    const addr = data.address || {};
    const city = addr.city || addr.town || addr.village || addr.hamlet || addr.county || null;

    return city;
  }

  async getCityFromBrowser(timeoutMs = 10000): Promise<string | null> {
    const coords = await this.getCoordsBrowser(timeoutMs);
    const city = await this.reverseGeocodeNominatim(coords.lat, coords.lon);
    return city;
  }

}