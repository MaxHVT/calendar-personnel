import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-eventday',
  templateUrl: './eventday.component.html',
  styleUrls: ['./eventday.component.css'],
  // Escucha el evento de redimensionamiento de la ventana para ajustar el tamaño de los bloques
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class EventdayComponent {
  // Recibe la información del día desde el componente padre
  @Input() dia: any;

  // Se ejecuta después de que la vista ha sido inicializada
  ngAfterViewInit() {
    // Si no hay eventos en el día, no hace nada
    if (this.dia.length == 0) return;
    // Obtiene todos los elementos con la clase 'block' (cada evento)
    let blocks = document.getElementsByClassName("block");
    // Obtiene la celda <td> que contiene los bloques
    let td = blocks[0].closest("td");
    // Recorre todos los eventos del día
    for (let ievent = 0; ievent < this.dia.length; ievent++) {
      // Recorre todos los bloques encontrados en la celda
      for (let iblock = 0; iblock < blocks.length; iblock++) {
        // Si el nombre del proyecto coincide con el texto del bloque
        if (blocks[iblock].textContent?.trim() == this.dia[ievent].nameProject.trim()) {
          // Calcula la duración del evento en días
          let start = new Date(this.dia[ievent].date_start);
          let end = new Date(this.dia[ievent].date_end);
          let n = end.getDate() - start.getDate();
          // Ajusta el ancho del bloque proporcionalmente al número de días
          if (td?.offsetWidth != undefined) {
            blocks[iblock].setAttribute("style", "width:" + (td?.offsetWidth * n) + "px");
          }
        }
      }
    }
  }

  // Se ejecuta cuando la ventana cambia de tamaño para recalcular el ancho de los bloques
  onResize(event: any) {
    if (this.dia.length == 0) return;
    let blocks = document.getElementsByClassName("block");
    let td = blocks[0].closest("td");
    for (let ievent = 0; ievent < this.dia.length; ievent++) {
      for (let iblock = 0; iblock < blocks.length; iblock++) {
        if (blocks[iblock].textContent?.trim() == this.dia[ievent].nameProject.trim()) {
          let start = new Date(this.dia[ievent].date_start);
          let end = new Date(this.dia[ievent].date_end);
          let n = end.getDate() - start.getDate();
          if (td?.offsetWidth != undefined) {
            blocks[iblock].setAttribute("style", "width:" + (td?.offsetWidth * n) + "px");
          }
        }
      }
    }
  }


}
