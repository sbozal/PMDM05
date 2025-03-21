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

  /*
  ngOnInit(): void {
    setTimeout(() => {
      this.loadMap();
    }, 1000);
  }
*/
    
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
