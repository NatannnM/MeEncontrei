import { AfterViewInit, Component } from '@angular/core';
import { cleanMapStyle, iconColors, mapaEsucriShapes } from './utils/map-style';
import { FloorManager } from './services/floor-manager.service';
import { GoogleMapsLoader } from './services/google-maps-loader.service';
import { InfoWindowService } from './services/info-window.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.page.html',
  styleUrls: ['./mapas.page.scss'],
  standalone: false
})
export class MapasPage implements AfterViewInit {
  map!: google.maps.Map;
  floorManager!: FloorManager;
  static editMode: boolean = true;
  
  eventId: string = '';
  establishmentId: string = '';
  modo: string = '';

  constructor(
    private mapsLoader: GoogleMapsLoader,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.eventId = this.activatedRoute.snapshot.params['id_event'];
    this.establishmentId = this.activatedRoute.snapshot.params['id_establishment'];
    this.modo = this.activatedRoute.snapshot.params['modo'];
    if(this.modo === 'exibir'){
      if(this.eventId){
        MapasPage.editMode = false;  
      }else{
        MapasPage.editMode = false; 
      }
    } else {
      if(this.eventId){
        MapasPage.editMode = true; 
      }else{
        MapasPage.editMode = true; 
      }
    }
      
   }

  async ngAfterViewInit() {
    await this.mapsLoader.load();
    this.initMap();
    // this.addUserLocationMarker();
    if (MapasPage.editMode) {
      this.initDrawing();
    }
    this.floorManager = new FloorManager(this.map, this.router, this.establishmentId);
    this.floorManager.insertMapShapes(mapaEsucriShapes);
  }

  private initMap(): void {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: -28.681528266431894, lng: -49.37356673246187 },
      zoom: 20,
      minZoom: MapasPage.editMode ? undefined : 19,
      mapTypeId: "roadmap",
      disableDefaultUI: true,
      styles: cleanMapStyle,
      // restriction: HomePage.editMode ? undefined : {
      //   latLngBounds: {
      //     north: -28.6718,
      //     south: -28.6722,
      //     east: -49.3731,
      //     west: -49.3735
      //   },
      //   strictBounds: true
      // }
    }

    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, mapOptions);

    this.addBuildingOverlay();
  }

  private addBuildingOverlay(): void {
    if (!this.map) return;

    const imageBounds = {
      north: -28.681362,  // -28.681333 - 0.00003
      south: -28.681670,  // -28.681641 - 0.00003
      east: -49.37337,    // -49.37335 - 0.00003
      west: -49.37377     // -49.37375 - 0.00003
    };

    const overlay = new google.maps.GroundOverlay("./assets/imagemMapa1.png", imageBounds);
    const overlay2 = new google.maps.GroundOverlay("./assets/imagemMapa2.png", imageBounds);
    const overlay3 = new google.maps.GroundOverlay("./assets/imagemMapa3.png", imageBounds);
    const overlay4 = new google.maps.GroundOverlay("./assets/imagemMapa4.png", imageBounds);
    const overlay5 = new google.maps.GroundOverlay("./assets/imagemMapa5.png", imageBounds);
    const overlay6 = new google.maps.GroundOverlay("./assets/imagemMapa6.png", imageBounds);

    // overlay.setMap(this.map);
    // overlay2.setMap(this.map);
    // overlay3.setMap(this.map);
    // overlay4.setMap(this.map);
    // overlay5.setMap(this.map);
    // overlay6.setMap(this.map);
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

          this.map.setCenter(userLatLng);
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
