import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-eventday',
  templateUrl: './eventday.component.html',
  styleUrls: ['./eventday.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class EventdayComponent {
  @Input() dia:any;

  ngAfterViewInit(){
    if(this.dia.length == 0)return;
    let blocks = document.getElementsByClassName("block");
    let td = blocks[0].closest("td");
    for(let ievent = 0;ievent<this.dia.length;ievent++){
      for(let iblock = 0; iblock<blocks.length;iblock++){
        if(blocks[iblock].textContent?.trim() == this.dia[ievent].nameProject.trim()){
          let start = new Date(this.dia[ievent].date_start);
          let end = new Date(this.dia[ievent].date_end);
          let n = end.getDate() - start.getDate();
          if(td?.offsetWidth != undefined){
            blocks[iblock].setAttribute("style","width:"+(td?.offsetWidth * n)+"px");
          }
        }
      }
    }
  }

  onResize(event:any){
    if(this.dia.length == 0)return;
    let blocks = document.getElementsByClassName("block");
    let td = blocks[0].closest("td");
    for(let ievent = 0;ievent<this.dia.length;ievent++){
      for(let iblock = 0; iblock<blocks.length;iblock++){
        if(blocks[iblock].textContent?.trim() == this.dia[ievent].nameProject.trim()){
          let start = new Date(this.dia[ievent].date_start);
          let end = new Date(this.dia[ievent].date_end);
          let n = end.getDate() - start.getDate();
          if(td?.offsetWidth != undefined){
            blocks[iblock].setAttribute("style","width:"+(td?.offsetWidth * n)+"px");
          }
        }
      }
    }
  }
}
