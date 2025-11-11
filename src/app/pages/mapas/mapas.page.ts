import { AfterViewInit, Component, OnInit } from '@angular/core';
import { cleanMapStyle, iconColors, mapaEsucriShapes } from './utils/map-style';
import { FloorManager } from './services/floor-manager.service';
import { GoogleMapsLoader } from './services/google-maps-loader.service';
import { InfoWindowService } from './services/info-window.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EstablishmentService } from '../establishment/establishment-services/establishment.service';
import { NavController, ToastController, ViewDidEnter } from '@ionic/angular';
import { Establishment } from '../establishment/models/establishment.type';
import { firstValueFrom, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { Event } from '../event/models/event.type';
import { eventsService } from '../event/event-services/event.service';

interface Marker {
  centered: boolean;
  zoom: number;
  position: { lat: number; lng: number };
}

interface FloorData {
  shapes: {
    markers: Marker;
  };
}

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.page.html',
  styleUrls: ['./mapas.page.scss'],
  standalone: false
})
export class MapasPage implements OnInit {
  map!: google.maps.Map;
  floorManager!: FloorManager;
  static editMode: boolean = true;
  est!: Establishment;
  evt!: Event;

  eventId: string = '';
  establishmentId: string = '';
  modo: string = '';
  mapaInserido: string = '';
  conteudoParams: string = '';
  conteudo: string = '';

  zoomRecebido!: number;
  centerRecebido!: { lat: number; lng: number };

  constructor(
    private mapsLoader: GoogleMapsLoader,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private establishmentService: EstablishmentService,
    private eventService: eventsService,
    private toastController: ToastController,
    private navCtrl: NavController
  ) {
    this.eventId = this.activatedRoute.snapshot.params['id_event'];
    this.establishmentId = this.activatedRoute.snapshot.params['id_establishment'];
    this.modo = this.activatedRoute.snapshot.params['modo'];

    const nav = this.router.getCurrentNavigation();
    this.conteudoParams = nav?.extras.state?.['conteudo'];

    this.activatedRoute.queryParams.subscribe(params => {
      this.mapaInserido = params['conteudo'];
    });

    /*this.aleatorio = floor.shapes.markers.map(m => {
      m.centered ? m.zoom : 
    }
      ({
        position: {
          lat: m.mapObject.getPosition()?.lat() ?? 0,
          lng: m.mapObject.getPosition()?.lng() ?? 0
        },
        centered: m.centered,
        zoom: m.zoom,
        name: m.name,
        icon: m.icon,
        description: m.description,
      })),
  }))*/

    if (this.modo === 'exibir') {
      MapasPage.editMode = false;
    } else {
      MapasPage.editMode = true;
    }
  }

  recuperarZoomCenter(conteudo: string) {

    const valores = JSON.parse(conteudo).map((f: any) => {

      console.log('f dentro do map:', f);
      if (f.shapes && f.shapes.markers) {
        const marker = f.shapes.markers.find((m: any) => m.centered);
        if (marker) {
          console.log('marker: ', marker);
          return { zoom: marker.zoom, center: marker.position };
        }
      }
      return null;
    }).filter((item: any) => item !== null);
    this.zoomRecebido = valores.length === 0 ? 8 : valores[0].zoom;
    this.centerRecebido = valores.length === 0 ? { lat: -28.681528266431894, lng: -49.37356673246187 } : valores[0].center;
  }

  goBack() {
    this.router.navigate(['/mapas/establishment', this.establishmentId]);
  }

  async ngOnInit() {
    try {
      if (!this.conteudoParams) {
        if (this.eventId) {
          const response = await firstValueFrom(
            this.eventService.getById(this.eventId)
          );
          this.evt = response.event;
          if (this.evt.map) {
            this.recuperarZoomCenter(this.evt.map);
          } else {
            const response = await firstValueFrom(
              this.establishmentService.getById(this.evt.id_facility)
            );
            this.est = response.facility;
            this.evt.map = this.est.map;
            if (!this.est.map) this.est.map = JSON.stringify([{ name: "T", shapes: { markers: [], circles: [], rectangles: [], polygons: [], polylines: [] } },]);
            this.recuperarZoomCenter(this.evt.map);
          }
        } else {
          const response = await firstValueFrom(
            this.establishmentService.getById(this.establishmentId)
          );
          this.est = response.facility;
          if (!this.est.map) this.est.map = JSON.stringify([{ name: "T", shapes: { markers: [], circles: [], rectangles: [], polygons: [], polylines: [] } },]);
          this.recuperarZoomCenter(this.est.map);
        }
      } else {
        if (this.eventId) {
          const response = await firstValueFrom(
            this.eventService.getById(this.eventId)
          );
          this.evt = response.event;
          this.evt.map = this.conteudoParams;
          if (!this.est.map) this.est.map = JSON.stringify([{ name: "T", shapes: { markers: [], circles: [], rectangles: [], polygons: [], polylines: [] } },]);
          this.recuperarZoomCenter(this.evt.map);
        } else {
          this.est = { id: '', location: '', city: '', name: '', description: '', owner: '', photo: '', map: this.conteudoParams, image: '', public: 'PRIVATE' };
          if (!this.est.map) this.est.map = JSON.stringify([{ name: "T", shapes: { markers: [], circles: [], rectangles: [], polygons: [], polylines: [] } },]);
          this.recuperarZoomCenter(this.est.map);
        }
      }
    } catch (error) {
      const err = error as HttpErrorResponse;

      const toast = await this.toastController.create({
        message: (err.error && typeof err.error === 'object' && 'message' in err.error
          ? err.error.message
          : typeof err.error === 'string'
            ? err.error
            : err.message) ?? 'Ocorreu um erro inesperado.',
        header: 'Erro ao carregar estabelecimento!',
        color: 'danger',
        duration: 3000,
      });
      toast.present();
    }
    await this.mapsLoader.load();
    this.initMap();
    this.addUserLocationMarker();
    if (MapasPage.editMode) {
      this.initDrawing();
    }
    if (!this.est.map) {
      this.est.map = '';
    }
    this.floorManager = new FloorManager(this.map, this.router, this.establishmentId, this.eventId, this.establishmentService, this.eventService, this.toastController, this.est, this.evt, this.navCtrl);
  }

  private initMap(): void {
    const mapOptions: google.maps.MapOptions = {
      center: this.centerRecebido,
      zoom: this.zoomRecebido,
      minZoom: MapasPage.editMode ? undefined : 19,
      mapTypeId: "roadmap",
      disableDefaultUI: true,
      styles: cleanMapStyle,
      restriction: MapasPage.editMode ? undefined : {
        latLngBounds: {
          north: this.centerRecebido.lat + 0.000649, // norte
          south: this.centerRecebido.lat - 0.000649, // sul
          east: this.centerRecebido.lng + 0.000610,  // leste
          west: this.centerRecebido.lng - 0.000610   // oeste
        },
        strictBounds: true
      }
    }

    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, mapOptions);

  }


  private initDrawing(): void {
    const map = this.map;
    const OverlayType = google.maps.drawing.OverlayType;

    const drawingManager = new google.maps.drawing.DrawingManager({
      map,
      drawingMode: null,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [OverlayType.MARKER, OverlayType.CIRCLE, OverlayType.POLYGON, OverlayType.POLYLINE, OverlayType.RECTANGLE]
      },
      markerOptions: {
        draggable: true,
        icon: {
          path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z M12 11.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z",
          fillColor: iconColors[1],
          fillOpacity: 1,
          strokeColor: "white",
          strokeWeight: 2,
          scale: 1.5,
          anchor: new google.maps.Point(12, 24),
          labelOrigin: new google.maps.Point(12, 34)
        },
        label: {
          text: "Novo Marcador",
          color: "black",
          fontSize: "12px",
          fontWeight: "bold"
        }
      },
      circleOptions: this.getDefaultShapeStyle(),
      rectangleOptions: this.getDefaultShapeStyle(),
      polygonOptions: this.getDefaultShapeStyle(),
      polylineOptions: { ...this.getDefaultShapeStyle(), strokeColor: "black" }
    });

    drawingManager.addListener("drawingmode_changed", () => {
      this.floorManager.disableAllShapes();
      this.floorManager.renderFloors();
      InfoWindowService.close();
    });

    google.maps.event.addListener(this.map, "click", () => {
      this.floorManager.disableAllShapes();
      this.floorManager.renderFloors();
      InfoWindowService.close();
    });

    google.maps.event.addListener(drawingManager, "markercomplete", (marker: google.maps.Marker) => {
      this.floorManager.addShapesToCurrentFloor("marker", { mapObject: marker, centered: false, zoom: 20, icon: 1, name: "Novo Marcador", description: "" });
      this.floorManager.setEditable(marker);
      console.log('Marcador lat', marker.getPosition()?.lat());
      console.log('Marcador lng', marker.getPosition()?.lng());

      google.maps.event.addListener(marker, "click", () => {
        const markerData = this.floorManager.floors[this.floorManager.currentFloorIndex].shapes.markers
          .find(m => m.mapObject === marker);

        if (!markerData) return;

        InfoWindowService.setFloorManager(this.floorManager);
        InfoWindowService.open(marker, markerData, MapasPage.editMode);

        this.floorManager.setEditable(marker);
      });
    });

    google.maps.event.addListener(drawingManager, "circlecomplete", (circle: google.maps.Circle) => {
      this.floorManager.addShapesToCurrentFloor("circle", { mapObject: circle });

      this.floorManager.setEditable(circle);

      google.maps.event.addListener(circle, "click", () => {
        this.floorManager.setEditable(circle);
      });
    });

    google.maps.event.addListener(drawingManager, "rectanglecomplete", (rectangle: google.maps.Rectangle) => {
      this.floorManager.addShapesToCurrentFloor("rectangle", { mapObject: rectangle });

      this.floorManager.setEditable(rectangle);

      google.maps.event.addListener(rectangle, "click", () => {
        this.floorManager.setEditable(rectangle);
      });
    });

    google.maps.event.addListener(drawingManager, "polygoncomplete", (polygon: google.maps.Polygon) => {
      this.floorManager.addShapesToCurrentFloor("polygon", { mapObject: polygon });

      this.floorManager.setEditable(polygon);

      google.maps.event.addListener(polygon, "click", () => {
        this.floorManager.setEditable(polygon);
      });
    });

    google.maps.event.addListener(drawingManager, "polylinecomplete", (polyline: google.maps.Polyline) => {
      this.floorManager.addShapesToCurrentFloor("polyline", { mapObject: polyline });

      this.floorManager.setEditable(polyline);
      google.maps.event.addListener(polyline, "click", () => {
        this.floorManager.setEditable(polyline);
      });
    });
  }

  private getDefaultShapeStyle() {
    return {
      fillColor: "#b3b3b3ff",
      fillOpacity: 1,
      strokeColor: "#b3b3b3ff",
      strokeOpacity: 1,
      strokeWeight: 3
    };
  }

  private addUserLocationMarker(): void {
    if (!navigator.geolocation) {
      console.error("Geolocalização não é suportada neste navegador.");
      return;
    }

    let userMarker: google.maps.Marker | null = null;

    navigator.geolocation.watchPosition(
      (position) => {
        const userLatLng = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        if (!userMarker) {
          userMarker = new google.maps.Marker({
            position: userLatLng,
            map: this.map,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 6,
              fillColor: '#4285F4',
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: 'white',
            },
          });

        } else {
          userMarker.setPosition(userLatLng);
        }
      },
      (error) => {
        console.error("Erro ao obter localização:", error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );
  }
}
