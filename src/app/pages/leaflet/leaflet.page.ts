import { Component, AfterViewInit } from '@angular/core';
import * as leaflet from 'leaflet';
import 'leaflet-routing-machine';

declare let L: any; 

@Component({
  selector: 'app-leaflet',
  templateUrl: './leaflet.page.html',
  styleUrls: ['./leaflet.page.scss'],
})
export class LeafletPage implements AfterViewInit {
  private map: leaflet.Map | undefined;

  constructor() {}
    
  ngAfterViewInit(): void {
    this.loadMap();
    setTimeout(() => {
      this.map?.invalidateSize(); // Ajusta el mapa después de renderizar
    }, 0);
  }

  loadMap() {
    if (!this.map) {
      // Inicialización en Madrid
      this.map = leaflet.map('map').setView([40.4168, -3.7038], 8);

      // Capa de OpenStreetMap
      leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(this.map);

      // Marcador en Madrid
      const madrid = leaflet.marker([40.4168, -3.7038]).addTo(this.map).bindPopup("Madrid");

      // Marcador en Toledo
      const toledo = leaflet.marker([39.8628, -4.0273]).addTo(this.map).bindPopup("Toledo");

      // Camino entre Madrid y Toledo
      (leaflet as any).Routing.control({
        waypoints: [
          leaflet.latLng(40.4168, -3.7038),
          leaflet.latLng(39.8628, -4.0273)
        ],
        lineOptions: {
          styles: [{color:'blue', opacity: 0.8, wight: 5}]
        },
        createMarker:()=>null,
        routeWhileDragging:false,
        show: false,
        addWaypoints: false,
        draggableWaypoints: false,
        routerOptions: {
          suppressDemarcation: true
        }
      }).addTo(this.map);

      setTimeout(() => {
        const controlContainer = document.querySelector(".leaflet-routing-container");
        if (controlContainer) {
          controlContainer.remove();
        }
      })
    }
  }
}




/*
TAREA EVALUATIVA 1

import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-leaflet',
  templateUrl: './leaflet.page.html',
  styleUrls: ['./leaflet.page.scss'],
})
export class LeafletPage implements AfterViewInit {
  private map: L.Map | undefined;

  constructor() {}
    
  ngAfterViewInit(): void {
    this.loadMap();
    setTimeout(() => {
      this.map?.invalidateSize(); // Ajusta el mapa después de renderizar
    }, 0);
  }

  loadMap() {
    if (!this.map) {
      this.map = L.map('map').setView([40.4168, -3.7038], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(this.map);

      L.marker([40.4168, -3.7038])
        .addTo(this.map)
        .bindPopup('Madrid, España')
        .openPopup();
    }
  }
}
*/