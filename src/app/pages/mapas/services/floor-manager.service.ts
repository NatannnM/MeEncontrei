import { Router } from "@angular/router";
import { MapasPage } from "../mapas.page";
import { Floor } from "../models/floor.model";
import { iconColors } from "../utils/map-style";
import { InfoWindowService } from "./info-window.service";
import { EstablishmentService } from "../../establishment/establishment-services/establishment.service";
import { Establishment } from "../../establishment/models/establishment.type";
import { NavController, ToastController, ViewWillLeave } from "@ionic/angular";
import { Event } from "../../event/models/event.type";
import { eventsService } from "../../event/event-services/event.service";

export class FloorManager {
  floors: Floor[];
  currentFloorIndex: number;
  establishment: Establishment;
  event?: Event

  controlDiv: HTMLDivElement;
  sideBar?: HTMLDivElement;

  controlShapesDiv: HTMLDivElement;
  private deleteShapeBtn!: HTMLButtonElement;

  controlSaveDiv: HTMLDivElement;

  controlReturnDiv: HTMLDivElement;

  private editableShape: any = null;

  toastOnScreenAdd: boolean = false;
  toastOnScreenRemove: boolean = false;

  constructor(
    private map: google.maps.Map | null,
    private router: Router,
    private establishmentId: string,
    private eventId: string,
    private establishmentService: EstablishmentService,
    private eventService: eventsService,
    private toastController: ToastController,
    private est: Establishment,
    private evt: Event,
    private navCtrl: NavController
  ) {
    this.establishment = { id: '', location: '', city: '', name: '', description: '', owner: '', photo: '', map: '', image: '', public: 'PRIVATE' };
    this.map = map;
    this.floors = [
      { name: "T", shapes: { markers: [], circles: [], rectangles: [], polygons: [], polylines: [] } },
    ];
    this.currentFloorIndex = 0;

    // Botão de andares
    this.controlDiv = this.createControlContainer();
    if (this.map) {
      this.map.controls[google.maps.ControlPosition.LEFT_CENTER].push(this.controlDiv);
    }


    // Botão de controle dos shapes
    this.controlShapesDiv = this.createControlShapesDiv();
    if (this.map) {
      this.map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(this.controlShapesDiv);
    }
    this.deleteShapeBtn = this.controlShapesDiv.querySelector("button") as HTMLButtonElement;

    // Botão de salvar
    this.controlSaveDiv = this.createControlSaveDiv();
    if (MapasPage.editMode) {
      if (this.map) {
        this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(this.controlSaveDiv);
      }
    }

    // Botão de voltar página
    this.controlReturnDiv = this.createReturnContainer();
    if (this.map) {
      this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(this.controlReturnDiv);
    }

    this.renderFloors();
    if (this.map) {
      google.maps.event.addListener(this.map, "click", () => this.closeSideBar());
    }

    document.addEventListener("click", (event: MouseEvent) => {
      if (!this.sideBar) return;
      const target = event.target as Node;
      if (this.sideBar.contains(target)) return;
      if (this.controlDiv.contains(target)) return;
      this.closeSideBar();
    });
    console.log(this.est);
    if (this.evt?.id) {
      this.insertMapShapes(JSON.parse(this.evt.map));
    } else {
      this.insertMapShapes(JSON.parse(this.est.map));
    }
  }

  private createReturnContainer(): HTMLDivElement {
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.flexDirection = "row";
    div.style.alignItems = "center";
    div.style.justifyContent = "center";
    div.style.gap = "8px";
    div.style.marginTop = "10px";
    div.style.marginLeft = "10px";
    div.style.background = "#fff";
    div.style.border = "2px solid #4CAF50";
    div.style.borderRadius = "12px";
    div.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
    div.style.pointerEvents = "auto";

    const button = document.createElement("button");
    button.innerHTML = "← Voltar";
    button.style.background = "#4CAF50";
    button.style.color = "#fff";
    button.style.border = "none";
    button.style.borderRadius = "8px";
    button.style.padding = "6px 12px";
    button.style.cursor = "pointer";
    button.style.fontSize = "14px";
    button.style.fontWeight = "bold";
    button.style.transition = "background-color 0.2s ease";

    button.addEventListener("click", () => {
      this.navCtrl.back();
    });

    div.appendChild(button);
    return div;
  }

  private createControlContainer(): HTMLDivElement {
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.alignItems = "center";
    div.style.justifyContent = "center";
    div.style.height = "auto";
    div.style.pointerEvents = "auto";
    div.style.gap = "8px";
    div.style.marginLeft = "10px";
    div.style.padding = "4px";
    div.style.borderRadius = "8px";
    return div;
  }

  private createControlShapesDiv(): HTMLDivElement {
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.flexDirection = "row";
    div.style.alignItems = "center";
    div.style.justifyContent = "center";
    div.style.gap = "8px";
    div.style.marginBottom = "10px";
    div.style.padding = "6px 10px";
    div.style.background = "#fff";
    div.style.border = "2px solid #4CAF50";
    div.style.borderRadius = "12px";
    div.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";

    // Botão de deletar
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "🗑 Deletar";
    deleteBtn.style.background = "#ff4d4d";
    deleteBtn.style.color = "#fff";
    deleteBtn.style.border = "none";
    deleteBtn.style.borderRadius = "6px";
    deleteBtn.style.padding = "6px 12px";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.style.fontWeight = "bold";
    deleteBtn.style.display = "none";

    deleteBtn.onclick = () => this.deleteEditableShape();

    div.appendChild(deleteBtn);
    return div;
  }

  private createCircleButton(label: string, bg: string, color: string, border: string): HTMLDivElement {
    const btn = document.createElement("div");
    btn.innerText = label;
    btn.style.width = "40px";
    btn.style.height = "40px";
    btn.style.borderRadius = "50%";
    btn.style.backgroundColor = bg;
    btn.style.color = color;
    btn.style.display = "flex";
    btn.style.alignItems = "center";
    btn.style.justifyContent = "center";
    btn.style.cursor = "pointer";
    btn.style.border = border;
    btn.style.fontWeight = "bold";
    return btn;
  }

  private createControlSaveDiv() {
    const div = document.createElement("div");
    div.style.marginRight = "10px";
    div.style.marginBottom = "10px";

    const fab = document.createElement("ion-fab");
    fab.setAttribute("vertical", "bottom");
    fab.setAttribute("horizontal", "end");
    fab.setAttribute("slot", "fixed");

    const fabButton = document.createElement("ion-fab-button");
    fabButton.setAttribute("color", "success");

    const icon = document.createElement("ion-icon");
    icon.setAttribute("name", "checkmark");

    fabButton.appendChild(icon);
    fab.appendChild(fabButton);
    div.appendChild(fab);

    fabButton.addEventListener("click", () => this.saveMap());

    return div;
  }

  private saveMap() {
    try {
      const floorsData = this.floors.map(floor => ({
        name: floor.name,
        shapes: {
          markers: floor.shapes.markers.map(m => ({
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
          circles: floor.shapes.circles.map(c => ({
            center: {
              lat: c.mapObject.getCenter()?.lat() ?? 0,
              lng: c.mapObject.getCenter()?.lng() ?? 0
            },
            radius: c.mapObject.getRadius() ?? 0,
            fillColor: c.mapObject.get("fillColor") ?? null,
            fillOpacity: c.mapObject.get("fillOpacity") ?? null,
            strokeColor: c.mapObject.get("strokeColor") ?? null,
            strokeOpacity: c.mapObject.get("strokeOpacity") ?? null,
            strokeWeight: c.mapObject.get("strokeWeight") ?? null
          })),
          rectangles: floor.shapes.rectangles.map(r => {
            const bounds = r.mapObject.getBounds();
            return {
              bounds: bounds ? {
                north: bounds.getNorthEast().lat(),
                east: bounds.getNorthEast().lng(),
                south: bounds.getSouthWest().lat(),
                west: bounds.getSouthWest().lng()
              } : null,
              fillColor: r.mapObject.get("fillColor") ?? null,
              fillOpacity: r.mapObject.get("fillOpacity") ?? null,
              strokeColor: r.mapObject.get("strokeColor") ?? null,
              strokeOpacity: r.mapObject.get("strokeOpacity") ?? null,
              strokeWeight: r.mapObject.get("strokeWeight") ?? null
            };
          }),
          polygons: floor.shapes.polygons.map(p => ({
            path: p.mapObject.getPath()?.getArray().map(latlng => ({
              lat: latlng.lat(),
              lng: latlng.lng()
            })) ?? [],
            fillColor: p.mapObject.get("fillColor") ?? null,
            fillOpacity: p.mapObject.get("fillOpacity") ?? null,
            strokeColor: p.mapObject.get("strokeColor") ?? null,
            strokeOpacity: p.mapObject.get("strokeOpacity") ?? null,
            strokeWeight: p.mapObject.get("strokeWeight") ?? null
          })),
          polylines: floor.shapes.polylines.map(l => ({
            path: l.mapObject.getPath()?.getArray().map(latlng => ({
              lat: latlng.lat(),
              lng: latlng.lng()
            })) ?? [],
            strokeColor: l.mapObject.get("strokeColor") ?? null,
            strokeOpacity: l.mapObject.get("strokeOpacity") ?? null,
            strokeWeight: l.mapObject.get("strokeWeight") ?? null
          }))
        }
      }));
      if (this.establishmentId) {
        this.establishment.id = this.establishmentId;
        this.establishment.map = JSON.stringify(floorsData);
        this.establishmentService.save({
          ...this.establishment,
        }).subscribe({
          next: () => {
            this.toastController.create({
              message: 'Estabelecimento salvo com sucesso!',
              duration: 3000,
              position: 'bottom',
              cssClass: 'toast-design'
            }).then(toast => toast.present());
            this.navCtrl.back();
          },
          error: (error) => {
            console.log(this.establishment);
            this.toastController.create({
              message: error.error.message,
              header: 'Erro ao salvar o estabelecimento ' + this.establishment.name + '!',
              color: 'danger',
              position: 'top',
              buttons: [
                { text: 'X', role: 'cancel' }
              ]
            }).then(toast => toast.present())
            console.error(error);
            console.error(error.error.details);
          }
        })
      } else {
        if (this.evt) {
          this.evt.id = this.eventId;
          this.evt.map = JSON.stringify(floorsData);
          this.eventService.save({
            ...this.evt,
          }).subscribe({
            next: () => {
              this.toastController.create({
                message: 'Evento salvo com sucesso!',
                duration: 3000,
                position: 'bottom',
                cssClass: 'toast-design'
              }).then(toast => toast.present());
              this.navCtrl.back();
            },
            error: (error) => {
              console.log(this.evt);
              this.toastController.create({
                message: error.error.message,
                header: 'Erro ao salvar o evento ' + this.evt.name + '!',
                color: 'danger',
                position: 'top',
                buttons: [
                  { text: 'X', role: 'cancel' }
                ]
              }).then(toast => toast.present())
              console.error(error);
              console.error(error.error.details);
            }
          })
        }
      }



    } catch (error) {
      console.error("Erro ao salvar mapa:", error);
    }
  }

  insertMapShapes(importedShapes: object[]) {
    this.floors = (importedShapes as Floor[]).map((floor: Floor) => {
      const newFloor: Floor = {
        name: floor.name,
        shapes: {
          markers: (floor.shapes.markers as any[]).map(m => {
            const { centered, zoom, icon, name, description } = m;

            const mapObject = new google.maps.Marker({
              position: m.position,
              map: this.map,
              draggable: true,
              icon: iconColors[m.icon],
              label: m.name
            });

            InfoWindowService.setMarkerIcon(mapObject, name, icon, centered);

            const markerShape = { mapObject, centered, zoom, icon, name, description };

            this.addShapesToCurrentFloor("marker", markerShape);

            google.maps.event.addListener(mapObject, "click", () => {
              InfoWindowService.setFloorManager(this);
              InfoWindowService.open(mapObject, markerShape, MapasPage.editMode);
              this.setEditable(mapObject);
            });

            return markerShape;
          }),
          circles: (floor.shapes.circles as any[]).map(c => {
            const mapObject = new google.maps.Circle({
              map: this.map,
              center: c.center,
              radius: c.radius,
              fillColor: c.fillColor || "#b3b3b3ff",
              fillOpacity: c.fillOpacity ?? 1,
              strokeColor: c.strokeColor || "#b3b3b3ff",
              strokeOpacity: c.strokeOpacity ?? 1,
              strokeWeight: c.strokeWeight ?? 3,
            });

            google.maps.event.addListener(mapObject, "click", () => this.setEditable(mapObject));

            return { mapObject };
          }),
          rectangles: (floor.shapes.rectangles as any[]).map(r => {
            const mapObject = new google.maps.Rectangle({
              map: this.map,
              bounds: r.bounds,
              fillColor: r.fillColor || "#b3b3b3ff",
              fillOpacity: r.fillOpacity ?? 1,
              strokeColor: r.strokeColor || "#b3b3b3ff",
              strokeOpacity: r.strokeOpacity ?? 1,
              strokeWeight: r.strokeWeight ?? 3,
            });

            google.maps.event.addListener(mapObject, "click", () => this.setEditable(mapObject));
            return { mapObject };
          }),
          polygons: (floor.shapes.polygons as any[]).map(p => {
            const mapObject = new google.maps.Polygon({
              map: this.map,
              paths: p.path,
              fillColor: p.fillColor || "#b3b3b3ff",
              fillOpacity: p.fillOpacity ?? 1,
              strokeColor: p.strokeColor || "#b3b3b3ff",
              strokeOpacity: p.strokeOpacity ?? 1,
              strokeWeight: p.strokeWeight ?? 3,
            });

            google.maps.event.addListener(mapObject, "click", () => this.setEditable(mapObject));
            return { mapObject };
          }),
          polylines: (floor.shapes.polylines as any[]).map(l => {
            const mapObject = new google.maps.Polyline({
              map: this.map,
              path: l.path,
              strokeColor: l.strokeColor || "#b3b3b3ff",
              strokeOpacity: l.strokeOpacity ?? 1,
              strokeWeight: l.strokeWeight ?? 3,
            });

            google.maps.event.addListener(mapObject, "click", () => this.setEditable(mapObject));
            return { mapObject };
          }),
        }
      };

      return newFloor;
    });

    this.currentFloorIndex = this.floors.length - 1;
    this.removeAllShapesFromMap();
    this.addCurrentFloorShapes();
    this.renderFloors();
  }

  renderFloors() {
    this.controlDiv.innerHTML = "";

    this.floors.forEach((floor, index) => {
      const wrapper = document.createElement("div");
      wrapper.style.display = "flex";
      wrapper.style.alignItems = "center";
      wrapper.style.position = "relative";

      const isActive = index === this.currentFloorIndex;
      const floorBtn = this.createCircleButton(
        floor.name,
        isActive ? "#4CAF50" : "#ffffff",
        isActive ? "#fff" : "#333",
        "2px solid #4CAF50"
      );

      floorBtn.onclick = () => this.handleFloorClick(index, wrapper);

      wrapper.appendChild(floorBtn);
      this.controlDiv.appendChild(wrapper);
    });

    if (MapasPage.editMode) {
      const addBtn = this.createCircleButton("+", "#fff", "#4CAF50", "2px solid #4CAF50");
      addBtn.onclick = () => this.addFloor();
      this.controlDiv.appendChild(addBtn);
    }

    this.disableAllShapes();
  }

  private handleFloorClick(index: number, wrapper: HTMLDivElement) {
    if (this.currentFloorIndex === index) {
      this.openFloorSideBar(wrapper, index);
      return;
    }

    this.removeAllShapesFromMap();
    this.currentFloorIndex = index;
    this.renderFloors();
    this.addCurrentFloorShapes();
  }

  private closeSideBar() {
    if (!this.sideBar) return;

    const panel = this.sideBar;
    panel.style.transition = "transform 0.3s ease, opacity 0.3s ease";
    panel.style.transform = "scaleX(0)";
    panel.style.opacity = "0";

    setTimeout(() => {
      panel.remove();
      this.sideBar = undefined;
    }, 300);
  }

  private openFloorSideBar(wrapper: HTMLDivElement, index: number) {
    if (!MapasPage.editMode) {
      return;
    }

    if (this.sideBar && this.sideBar.parentElement === wrapper) {
      this.closeSideBar();
      return;
    }

    if (this.sideBar) this.closeSideBar();

    const panel = document.createElement("div");
    panel.style.cssText = `
      position:absolute;left:50px;top:0;
      display:flex;flex-direction:row;align-items:center;gap:6px;
      padding:6px 10px;background:#fff;
      border:2px solid #4CAF50;border-radius:12px;
      box-shadow:0 2px 6px rgba(0,0,0,0.1);
      z-index:100;transform:scaleX(0);transform-origin:left center;
      opacity:0;
    `;

    panel.innerHTML = `
      <div style="width: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;">
          <button class="btn-moveup" ${index === 0 ? "disabled" : ""} style="
            font-size: 13px;
            line-height: 0.6; 
            transform: scaleX(1.5);
            padding: 2px 4px;
            width: fit-content;
            
            border-width: 1.3px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            margin-bottom: 1px;
            ">∧</button>
          <button class="btn-movedown" ${index === this.floors.length - 1 ? "disabled" : ""} style="
            font-size: 13px;
            display: inline-block;
            padding: 2px 4px;
            width: fit-content;
            
            border-width: 1.3px;
            line-height: 0.6; 
            transform: scaleX(1.5);
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
          ">∨</button>
      </div>
      <button class="btn-remove" style="background:#ff4d4d;color:#fff;border:none;border-radius:6px;padding:4px 8px;cursor:pointer;">🗑</button>
      <button class="btn-duplicate" style="background:#4CAF50;color:#fff;border:none;border-radius:6px;padding:4px 8px;cursor:pointer;">⧉</button>
      <input type="text" class="floor-name" value="${this.floors[index].name}" style="color: black;background-color: white;flex:1;border:1px solid #000000ff;border-radius:6px;padding:4px 6px;" />
    `;

    wrapper.appendChild(panel);
    this.sideBar = panel;

    setTimeout(() => {
      panel.style.transition = "transform 0.3s ease, opacity 0.3s ease";
      panel.style.transform = "scaleX(1)";
      panel.style.opacity = "1";
    }, 10);

    const btnMoveUp = panel.querySelector(".btn-moveup") as HTMLButtonElement;
    const btnMoveDown = panel.querySelector(".btn-movedown") as HTMLButtonElement;
    const btnRemove = panel.querySelector(".btn-remove") as HTMLButtonElement;
    const btnDuplicate = panel.querySelector(".btn-duplicate") as HTMLButtonElement;
    const inputName = panel.querySelector(".floor-name") as HTMLInputElement;

    btnMoveUp.onclick = () => {
      const arr = this.floors;
      if (index <= 0) return;
      [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
      this.currentFloorIndex -= 1;
      this.renderFloors();
    }

    btnMoveDown.onclick = () => {
      const arr = this.floors;
      if (index >= arr.length - 1) return;
      [arr[index + 1], arr[index]] = [arr[index], arr[index + 1]];
      this.currentFloorIndex += 1;
      this.renderFloors();
    }

    btnRemove.onclick = () => this.removeFloor(index);

    btnDuplicate.onclick = () => {
      const originalFloor = this.floors[index];
      const clonedName = originalFloor.name.toString()[0] + "_copy";

      this.addFloor(clonedName);
      const newFloor = this.floors[this.floors.length - 1];

      const cloneShape = (shapeData: any, type: string) => {
        const original = shapeData.mapObject;
        let newMapObject: any = null;

        const commonOptions: any = {
          map: this.map,
          fillColor: original.get("fillColor") || "#b3b3b3ff",
          fillOpacity: original.get("fillOpacity") || 1,
          strokeColor: original.get("strokeColor") || "#b3b3b3ff",
          strokeOpacity: original.get("strokeOpacity") || 1,
          strokeWeight: original.get("strokeWeight") || 3,
        };

        switch (type) {
          case "markers":
            newMapObject = new google.maps.Marker({
              position: original.getPosition(),
              map: this.map,
              draggable: true,
              icon: original.getIcon(),
              label: original.getLabel()
            });

            google.maps.event.addListener(newMapObject, "click", () => {
              const markerData = newFloor.shapes.markers.find(m => m.mapObject === newMapObject);
              if (!markerData) return;

              InfoWindowService.setFloorManager(this);
              InfoWindowService.open(newMapObject, markerData, MapasPage.editMode);
              this.setEditable(newMapObject);
            });
            break;
          case "circles":
            newMapObject = new google.maps.Circle({
              ...commonOptions,
              center: original.getCenter(),
              radius: original.getRadius()
            });
            break;

          case "rectangles":
            newMapObject = new google.maps.Rectangle({
              ...commonOptions,
              bounds: original.getBounds()
            });
            break;

          case "polygons":
            newMapObject = new google.maps.Polygon({
              ...commonOptions,
              paths: original.getPath().getArray()
            });
            break;

          case "polylines":
            newMapObject = new google.maps.Polyline({
              ...commonOptions,
              path: original.getPath().getArray(),
            });
            break;
        }

        google.maps.event.addListener(newMapObject, "click", () => {
          this.setEditable(newMapObject);
        });

        return { ...shapeData, mapObject: newMapObject };
      };

      const orig = originalFloor.shapes;
      newFloor.shapes = {
        markers: orig.markers.map(m => cloneShape(m, "markers")),
        circles: orig.circles.map(c => cloneShape(c, "circles")),
        rectangles: orig.rectangles.map(r => cloneShape(r, "rectangles")),
        polygons: orig.polygons.map(p => cloneShape(p, "polygons")),
        polylines: orig.polylines.map(l => cloneShape(l, "polylines")),
      };

      this.removeAllShapesFromMap();
      this.addCurrentFloorShapes();
    };

    inputName.onchange = () => {
      if (inputName.value.length > 5) {
        this.floors[index].name = inputName.value.slice(0, 6);
      } else {
        this.floors[index].name = inputName.value || this.floors[index].name;
      }
      this.renderFloors();
    };

    inputName.addEventListener("input", () => {
      if (inputName.value.length > 6) {
        inputName.style.color = "red";
      } else {
        inputName.style.color = "";
      }
    });
  }

  private addFloor(name?: string) {
    if (this.floors.length >= 9) {
      if (!this.toastOnScreenAdd) {
        this.toastController.create({
          message: 'Limite de andares atingido!',
          duration: 3000,
          position: 'bottom',
          cssClass: 'toast-design'
        }).then(toast => toast.present());
        this.toastOnScreenAdd = true;
      }
      return;
    }
    const floorName = name || String(this.floors.length + 1);
    this.floors.push({
      name: floorName,
      shapes: { markers: [], circles: [], rectangles: [], polygons: [], polylines: [] },
    });
    this.currentFloorIndex = this.floors.length - 1;
    this.removeAllShapesFromMap();
    this.renderFloors();
    this.forceCenter(this.controlDiv, false, true);
    this.toastOnScreenRemove = false;
  }

  private removeFloor(index: number) {
    if (this.floors.length <= 1) {
      if (!this.toastOnScreenRemove) {
        this.toastController.create({
          message: 'Você não pode apagar este andar!',
          duration: 3000,
          position: 'bottom',
          cssClass: 'toast-design'
        }).then(toast => toast.present())
        this.toastOnScreenRemove = true;
      }

      this.renderFloors();
      return;
    };
    this.removeAllShapesFromMap();
    this.floors.splice(index, 1);
    if (this.currentFloorIndex >= this.floors.length) {
      this.currentFloorIndex = this.floors.length - 1;
    }
    this.addCurrentFloorShapes();
    this.renderFloors();
    this.forceCenter(this.controlDiv, false, true);
    this.toastOnScreenAdd = false;
  }

  addShapesToCurrentFloor(shapeType: "marker" | "circle" | "rectangle" | "polygon" | "polyline", data: any) {
    this.renderFloors();
    const shapes = this.floors[this.currentFloorIndex].shapes;
    switch (shapeType) {
      case "marker": shapes.markers.push(data); break;
      case "circle": shapes.circles.push(data); break;
      case "rectangle": shapes.rectangles.push(data); break;
      case "polygon": shapes.polygons.push(data); break;
      case "polyline": shapes.polylines.push(data); break;
    }
  }

  private removeAllShapesFromMap() {
    this.floors.forEach(floor => {
      const shapes = floor.shapes;
      shapes.markers.forEach(m => m.mapObject.setMap(null));
      shapes.circles.forEach(c => c.mapObject.setMap(null));
      shapes.rectangles.forEach(r => r.mapObject.setMap(null));
      shapes.polygons.forEach(p => p.mapObject.setMap(null));
      shapes.polylines.forEach(l => l.mapObject.setMap(null));
    });
  }

  private addCurrentFloorShapes() {
    const shapes = this.floors[this.currentFloorIndex].shapes;
    shapes.markers.forEach(m => {
      if (!MapasPage.editMode && m.centered) return;
      m.mapObject.setMap(this.map);
    });
    shapes.circles.forEach(c => c.mapObject.setMap(this.map));
    shapes.rectangles.forEach(r => r.mapObject.setMap(this.map));
    shapes.polygons.forEach(p => p.mapObject.setMap(this.map));
    shapes.polylines.forEach(l => l.mapObject.setMap(this.map));
  }

  disableAllShapes() {
    this.floors.forEach(floor => {
      const shapes = floor.shapes;
      shapes.markers.forEach(m => { m.mapObject.setDraggable?.(false); });
      shapes.circles.forEach(c => { c.mapObject.setEditable?.(false); c.mapObject.setDraggable?.(false); });
      shapes.rectangles.forEach(r => { r.mapObject.setEditable?.(false); r.mapObject.setDraggable?.(false); });
      shapes.polygons.forEach(p => { p.mapObject.setEditable?.(false); p.mapObject.setDraggable?.(false); });
      shapes.polylines.forEach(l => { l.mapObject.setEditable?.(false); l.mapObject.setDraggable?.(false); });
    });

    this.editableShape = null;
    this.controlShapesDiv.style.display = "none";
    this.deleteShapeBtn.style.display = "none";
  }

  private deleteEditableShape() {
    if (!this.editableShape) return;

    this.editableShape.setMap(null);

    const shapes = this.floors[this.currentFloorIndex].shapes;
    shapes.markers = shapes.markers.filter(m => m.mapObject !== this.editableShape);
    shapes.circles = shapes.circles.filter(s => s.mapObject !== this.editableShape);
    shapes.rectangles = shapes.rectangles.filter(s => s.mapObject !== this.editableShape);
    shapes.polygons = shapes.polygons.filter(s => s.mapObject !== this.editableShape);
    shapes.polylines = shapes.polylines.filter(s => s.mapObject !== this.editableShape);

    this.editableShape = null;
    this.controlShapesDiv.style.display = "none";
    this.deleteShapeBtn.style.display = "none";
  }

  setEditable(shape: any) {
    this.disableAllShapes();

    if (shape instanceof google.maps.Marker && MapasPage.editMode) {
      shape.setDraggable(true);
    } else if (shape.setEditable && MapasPage.editMode) {
      shape.setEditable(true);
      shape.setDraggable(true);
    } else {
      return; // Entra aqui quando está só no modo de visualização
    }

    this.editableShape = shape;

    if (this.editableShape) {
      this.deleteShapeBtn.style.display = "block";
      this.controlShapesDiv.style.display = "flex";
    }

    this.forceCenter(this.controlShapesDiv, true, false);
  }

  private forceCenter(div: HTMLDivElement, horizontal: boolean, vertical: boolean) {
    if (!div) return;
    if (!this.map) return;
    const mapDiv = this.map.getDiv() as HTMLDivElement;

    if (horizontal) {
      const mapWidth = mapDiv.offsetWidth;
      const divWidth = div.offsetWidth;
      div.style.left = `${(mapWidth - divWidth) / 2}px`;
    }

    if (vertical) {
      const mapHeight = mapDiv.offsetHeight;
      const divHeight = div.offsetHeight;
      div.style.top = `${(mapHeight - divHeight) / 2}px`;
    }
  }

  setMarkerData(marker: google.maps.Marker, data: Partial<{ centered: boolean, zoom: number, icon: number, name: string, description: string }>) {
    const floor = this.floors[this.currentFloorIndex];
    const markerData = floor.shapes.markers.find(m => m.mapObject === marker);
    if (!markerData) return;

    if (data.centered) {
      floor.shapes.markers.forEach(m => {
        if (m.mapObject !== marker) {
          m.centered = false;
          InfoWindowService.setMarkerIcon(m.mapObject, m.name, m.icon);
        }
      });

      InfoWindowService.setMarkerIcon(marker, "Centro", 0, true);
    } else {
      InfoWindowService.setMarkerIcon(marker, data.name ?? "Centro", data.icon ?? 0, !Boolean(data.name));
    }

    if (data.centered !== undefined) markerData.centered = data.centered;
    if (data.zoom !== undefined) markerData.zoom = data.zoom;
    if (data.name !== undefined) markerData.name = data.name;
    if (data.description !== undefined) markerData.description = data.description;
  }
}
