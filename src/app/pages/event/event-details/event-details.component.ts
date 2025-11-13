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
      const conteudo: any = await this.lerArquivo(file);
      if (!this.isValidMapContent(JSON.parse(conteudo))) throw { message: "Falha ao ler o arquivo ou JSON inválido.", code: 400 }
      this.router.navigate(['/event/mapas', this.event.id, 'editar'], {
        state: { conteudo }
      });

    } catch (error: any) {
      const toast = await this.toastController.create({
        message: error.message ?? '',
        color: 'danger',
        duration: 3000,
      });
      toast.present();
    }
  }

  async baixar_mapa() {
    let json = this.event.map;
    if (!json) {
      json = '';
    }

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

  isValidMapContent(data: any): boolean {
    console.log(data);

    try {
      if (!Array.isArray(data)) return false;

      for (const floor of data) {
        if (typeof floor.name !== "string") return false;
        if (!floor.shapes || typeof floor.shapes !== "object") return false;

        const { markers, circles, rectangles, polygons, polylines } = floor.shapes;

        // MARKERS
        if (!Array.isArray(markers)) return false;
        for (const marker of markers) {
          if (
            typeof marker.position !== "object" ||
            typeof marker.position.lat !== "number" ||
            typeof marker.position.lng !== "number" ||
            typeof marker.centered !== "boolean" ||
            typeof marker.zoom !== "number" ||
            typeof marker.name !== "string" ||
            typeof marker.icon !== "number" ||
            typeof marker.description !== "string"
          ) {
            return false;
          }
        }

        // CIRCLES
        if (!Array.isArray(circles)) return false;
        for (const circle of circles) {
          if (
            typeof circle.center !== "object" ||
            typeof circle.center.lat !== "number" ||
            typeof circle.center.lng !== "number" ||
            typeof circle.radius !== "number" ||
            (circle.fillColor !== null && typeof circle.fillColor !== "string") ||
            (circle.fillOpacity !== null && typeof circle.fillOpacity !== "number") ||
            (circle.strokeColor !== null && typeof circle.strokeColor !== "string") ||
            (circle.strokeOpacity !== null && typeof circle.strokeOpacity !== "number") ||
            (circle.strokeWeight !== null && typeof circle.strokeWeight !== "number")
          ) {
            return false;
          }
        }

        // RECTANGLES
        if (!Array.isArray(rectangles)) return false;
        for (const rect of rectangles) {
          if (
            rect.bounds !== null &&
            (
              typeof rect.bounds !== "object" ||
              typeof rect.bounds.north !== "number" ||
              typeof rect.bounds.south !== "number" ||
              typeof rect.bounds.east !== "number" ||
              typeof rect.bounds.west !== "number"
            )
          ) {
            return false;
          }
          if (
            (rect.fillColor !== null && typeof rect.fillColor !== "string") ||
            (rect.fillOpacity !== null && typeof rect.fillOpacity !== "number") ||
            (rect.strokeColor !== null && typeof rect.strokeColor !== "string") ||
            (rect.strokeOpacity !== null && typeof rect.strokeOpacity !== "number") ||
            (rect.strokeWeight !== null && typeof rect.strokeWeight !== "number")
          ) {
            return false;
          }
        }

        // POLYGONS
        if (!Array.isArray(polygons)) return false;
        for (const polygon of polygons) {
          if (!Array.isArray(polygon.path)) return false;
          for (const coord of polygon.path) {
            if (typeof coord.lat !== "number" || typeof coord.lng !== "number") return false;
          }
          if (
            (polygon.fillColor !== null && typeof polygon.fillColor !== "string") ||
            (polygon.fillOpacity !== null && typeof polygon.fillOpacity !== "number") ||
            (polygon.strokeColor !== null && typeof polygon.strokeColor !== "string") ||
            (polygon.strokeOpacity !== null && typeof polygon.strokeOpacity !== "number") ||
            (polygon.strokeWeight !== null && typeof polygon.strokeWeight !== "number")
          ) {
            return false;
          }
        }

        // POLYLINES
        if (!Array.isArray(polylines)) return false;
        for (const line of polylines) {
          if (!Array.isArray(line.path)) return false;
          for (const coord of line.path) {
            if (typeof coord.lat !== "number" || typeof coord.lng !== "number") return false;
          }
          if (
            (line.strokeColor !== null && typeof line.strokeColor !== "string") ||
            (line.strokeOpacity !== null && typeof line.strokeOpacity !== "number") ||
            (line.strokeWeight !== null && typeof line.strokeWeight !== "number")
          ) {
            return false;
          }
        }
      }

      return true;
    } catch (_err) {
      return false;
    }
  }

}
