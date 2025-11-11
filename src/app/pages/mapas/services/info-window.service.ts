import { MapasPage } from "../mapas.page";
import { iconColors } from "../utils/map-style";
import { FloorManager } from "./floor-manager.service";

export class InfoWindowService {
	private static infoWindow?: google.maps.InfoWindow;
	private static floorManager: FloorManager;
	private static infoWindowContent: string;

	static setFloorManager(manager: FloorManager) {
		this.floorManager = manager;
	}

	static open(marker: google.maps.Marker, data: { centered: boolean, zoom: number, icon: number, name: string, description: string }, editMode: boolean) {
		if (!this.infoWindow) {
			this.infoWindow = new google.maps.InfoWindow();
		}

		const updateCenterContent = () => {
			const centerContent = document.getElementById("centerContent");
			if (!centerContent) return;

			if (editMode) {
				centerContent.innerHTML = data.centered ? this.generateCenterEnabledContent(data) : this.generateCenterDisabledContent(data);
			} else {
				centerContent.innerHTML = this.generateOnlyShowContent(data);
			}

			if (!editMode) return;

			const map = marker.getMap();
			const zoomMinus = document.getElementById("zoomMinus");
			const zoomPlus = document.getElementById("zoomPlus");
			const zoomValue = document.getElementById("zoomValue");

			let zoom = data.zoom;

			zoomMinus?.addEventListener("click", () => {
				if (zoom > 19) zoom--;
				if (zoomValue) zoomValue.textContent = zoom.toString();
				if (map instanceof google.maps.Map) {
					map.setZoom(zoom);
					map.panTo(marker.getPosition()!);
				}
				this.floorManager.setMarkerData(marker, { zoom });
			});

			zoomPlus?.addEventListener("click", () => {
				if (zoom < 21) zoom++;
				if (zoomValue) zoomValue.textContent = zoom.toString();
				if (map instanceof google.maps.Map) {
					map.setZoom(zoom);
					map.panTo(marker.getPosition()!);
				}
				this.floorManager.setMarkerData(marker, { zoom });
			});

			const iconSelect = document.getElementById("iconColorSelector") as HTMLSelectElement | null;
			const nameInput = document.getElementById("nameInput") as HTMLInputElement | null;
			const descriptionInput = document.getElementById("descriptionInput") as HTMLTextAreaElement | null;

			if (iconSelect) iconSelect.onchange = () => this.saveInputValues(marker, data);
			if (nameInput) {
				nameInput.oninput = () => {
					if (nameInput.value.length > 20) {
						nameInput.value = nameInput.value.slice(0, 20);
					}

					nameInput.style.color = nameInput.value.length >= 20 ? "#FFC107" : "";

					this.saveInputValues(marker, data);
				};
			}
			if (descriptionInput) {
				descriptionInput.oninput = () => {
					this.saveInputValues(marker, data);

					const charCount = document.getElementById("charCount");
					if (charCount) {
						const len = descriptionInput.value.length;
						charCount.textContent = `${len}/250`;
						charCount.style.color = len > 250 ? "#FF4B4B" : "#666";
					}
				};
			}
		};

		if (editMode) {
			this.infoWindowContent = data.centered ? this.generateCenterEnabledContent(data) : this.generateCenterDisabledContent(data);
		} else {
			this.infoWindowContent = this.generateOnlyShowContent(data);
		}

		this.infoWindow.setContent(`
			<div style="display:flex;flex-direction:column;gap:8px;">
				${MapasPage.editMode ? this.generateToggleSwitch("Centro do mapa", data) : ""}
				<div id="centerContent">
					${this.infoWindowContent}
				</div>
			</div>
    `);

		this.infoWindow.open(marker.getMap(), marker);

		google.maps.event.addListenerOnce(this.infoWindow, "domready", () => {
			const toggle = document.getElementById("toggleContainer");
			const ball = document.getElementById("toggleBall");

			if (toggle && ball) {
				toggle.addEventListener("click", () => {
					let { centered, zoom, icon, name, description } = data;
					centered = !centered;

					this.floorManager.setMarkerData(marker, { centered, zoom, icon, name, description });

					ball.style.left = data.centered ? "26px" : "2px";
					toggle.style.backgroundColor = data.centered ? "#4CAF50" : "#ccc";

					updateCenterContent();
				});
			}

			updateCenterContent();
		});
	}

	static close() {
		this.infoWindow?.close();
	}

	private static generateOnlyShowContent(data: { name: string, description: string }) {
		return `
			<div style="position:relative;display:flex;flex-direction:column;gap:4px;min-width:220px;overflow:visible;">
				<div style="border: 1px solid black ;border-radius:6px;margin-top: 10px;padding:20px 8px 8px 8px;position:relative;box-sizing:border-box;overflow:visible;">
					<span style="position:absolute;top:-10px;left:12px;color: #000000ff !important;background-color: #ffffffff !important;padding:0 4px;font-size:14px;color:#333;white-space:nowrap;">
						${data.name ?? ''}
					</span>
					<div style="font-size:14px;color: #000000ff !important;margin-top:4px;max-height:120px;overflow-y:auto;">
						${data.description ?? ""}
					</div>
				</div>
			</div>
    `;
	}

	private static generateToggleSwitch(label: string, data: { centered: boolean, zoom: number, icon: number, name: string, description: string }) {
		return `
				<div style="display:flex;align-items:center;gap:8px;white-space:nowrap;margin-bottom:12px;">
					<div id="toggleContainer" style="width:50px;height:26px;background-color:${data.centered ? "#4CAF50" : "#ccc"};border-radius:13px;position:relative;cursor:pointer;transition:background-color 0.3s;">
						<div id="toggleBall" style="width:22px;height:22px;background-color:#fff;border-radius:50%;position:absolute;top:2px;left:${data.centered ? "26px" : "2px"};box-shadow: 0 2px 4px rgba(0,0,0,0.3);transition: left 0.3s;">
						</div>
					</div>
					<span style="font-size:14px;">${label}</span>
				</div>
    `;
	}

	private static generateCenterEnabledContent(data: { centered: boolean, zoom: number, icon: number, name: string, description: string }) {
		return `
			<div style="display:flex;align-items:center;justify-content:center;gap:8px;">
				<button id="zoomMinus" style="padding:4px 8px;font-size:16px;border:none;border-radius:6px;background:#ddd;cursor:pointer;">-</button>
				<span id="zoomValue" style="min-width:24px;text-align:center;font-weight:bold;">${data.zoom}</span>
				<button id="zoomPlus" style="padding:4px 8px;font-size:16px;border:none;border-radius:6px;background:#ddd;cursor:pointer;">+</button>
			</div>
		`;
	}

	private static generateCenterDisabledContent(data: { centered: boolean, zoom: number, icon: number, name: string, description: string }) {
		const descriptionLength = data.description?.length ?? 0;

		return `
			<div style="display:flex;flex-direction:column;gap:10px;width:100%;box-sizing:border-box;overflow:hidden;">
				<div style="display:flex;align-items:center;gap:8px;width:100%;">
					<label style="font-size:14px;width:90px;white-space:nowrap;">Cor do Ícone:</label>
					<select id="iconColorSelector" style="flex:1;padding:6px 8px;font-size:14px;border:1px solid #ccc;border-radius:6px;min-height:36px;box-sizing:border-box;width:calc(100% - 90px - 8px);">
						<option value="1" ${data.icon === 1 ? 'selected' : ''}>🔵 Azul</option>
						<option value="2" ${data.icon === 2 ? 'selected' : ''}>🔴 Vermelho</option>
						<option value="3" ${data.icon === 3 ? 'selected' : ''}>🟢 Verde</option>
						<option value="4" ${data.icon === 4 ? 'selected' : ''}>🟡 Amarelo</option>
						<option value="5" ${data.icon === 5 ? 'selected' : ''}>🟣 Roxo</option>
					</select>
				</div>
				<div style="display:flex;align-items:center;gap:8px;width:100%;">
					<label style="font-size:14px;width:90px;white-space:nowrap;">Nome:</label>
					<input id="nameInput" type="text" value="${data.name ?? ''}" style="flex:1;padding:6px 8px;font-size:14px;border:1px solid #ccc;border-radius:6px;min-height:36px;box-sizing:border-box;width:calc(100% - 90px - 8px);"/>
				</div>
				<div style="display:flex;flex-direction:column;gap:6px;width:100%;">
					<div style="display:flex;align-items:center;justify-content:space-between;">
					<label style="font-size:14px;">Descrição:</label>
						<span id="charCount" style="font-size:12px;color:${descriptionLength > 250 ? "#FF4B4B" : "#666"};">${descriptionLength}/250</span>
					</div>
					<textarea id="descriptionInput" rows="4" style="width:100%;padding:8px;font-size:14px;border:1px solid #ccc;border-radius:6px;resize:vertical;box-sizing:border-box;">${data.description ?? ''}</textarea>
				</div>
			</div>
    `;
	}

	private static saveInputValues(marker: google.maps.Marker, data: { centered: boolean, zoom: number, icon: number, name: string, description: string }) {
		const iconSelect = document.getElementById("iconColorSelector") as HTMLSelectElement | null;
		const nameInput = document.getElementById("nameInput") as HTMLInputElement | null;
		const descriptionInput = document.getElementById("descriptionInput") as HTMLTextAreaElement | null;

		if (!iconSelect || !nameInput || !descriptionInput) return;

		const icon = parseInt(iconSelect.value);
		const name = nameInput.value;
		const description = descriptionInput.value;

		data.icon = icon;
		data.name = name;
		data.description = description;

		this.floorManager.setMarkerData(marker, data);

		this.setMarkerIcon(marker, name, icon);
	}

	static setMarkerIcon(marker: google.maps.Marker, text: string, icon: number, center?: boolean) {
		marker.setIcon({
			path: center ? "M12 2 L15 9 H22 L17 14 L19 21 L12 17 L5 21 L7 14 L2 9 H9 Z" : "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z M12 11.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z",
			fillColor: center ? iconColors[0] : iconColors[icon],
			fillOpacity: 1,
			strokeColor: "white",
			strokeWeight: 2,
			scale: 1.5,
			anchor: new google.maps.Point(12, 24),
			labelOrigin: new google.maps.Point(12, 30)
		});

		marker.setOptions({
			label: {
				text: center ? "Centro" : text,
				color: "black",
				fontSize: "12px",
				fontWeight: "bold"
			}
		});
	}
}
