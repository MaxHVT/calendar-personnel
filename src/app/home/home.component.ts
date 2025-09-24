import { Component } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // Guarda la fecha actual
  today: Date = new Date();
  // Variables para el mes y año seleccionados en el calendario
  month: any;
  year: any;
  // Nombres de los meses para mostrar en la interfaz
  months: any[] = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  // Lista de usuarios y sus eventos por día (se actualiza con los datos del backend)
  personal: any[] = [];
  // Arreglo con los días del mes actual (para la tabla)
  dias: any[] = [];

  // Inyecta el servicio BackendService para hacer peticiones al backend
  constructor(protected backendService: BackendService) { }

  // Se ejecuta al inicializar el componente
  ngOnInit() {
    // Inicializa el año y mes con la fecha actual
    this.year = this.today.getFullYear();
    this.month = this.today.getMonth();
    // Obtiene los proyectos/eventos del mes actual
    this.getProjects();
  }

  // Devuelve la cantidad de días de un mes y año dados
  daysInMonth(month: any, year: any) {
    return new Date(year, month + 1, 0).getDate();
  }

  // Obtiene los proyectos/eventos del backend y los organiza por usuario y día
  getProjects() {
    // Construye el objeto de consulta para el backend
    let projects = {
      bd: "hvtest2",
      table: "meeting",
      action: "get",
      opts: {
        customSelect: "meeting.id as idProject,meeting.name as nameProject,user.id as idUser,user.first_name,user.last_name,meeting.date_start,meeting.date_end",
        relationship: {
          assigned_personnel: ["assigned_personnel.meeting_id", "meeting.id"],
          user: ["assigned_personnel.user_id", "user.id"]
        },
        where: {
          greaterequal: {
            // Fecha de inicio mayor o igual al primer día del mes
            date_start: this.year + "-" + (this.month + 1) + "-01 00:00:00",
          },
          lesserequal: {
            // Fecha de inicio menor o igual al último día del mes
            date_start: this.year +
            "-" +
            (this.month + 1) +
            "-" +
            this.daysInMonth(this.month, this.year) +
            " 23:59:59",
          }
        }
      }
    };
    // Reinicia el arreglo de días del mes
    this.dias = [];
    for(let i=0;i<this.daysInMonth(this.month,this.year);i++)this.dias.push(i);
    this.backendService.post(projects).subscribe((response:any)=>{
      if(response.result){
        let users:any[] = [];
        response.result.forEach((element:any) => {
          let usr = users.find((el:any)=>el.id == element.idUser);
          if(usr == undefined)users.push({name:element.first_name + ' ' + element.last_name,id:element.idUser,day:[]});
        });

        users.forEach((user:any)=>{
          let srch = response.result.filter((res:any)=>user.id == res.idUser);
          for(let i=0;i<this.daysInMonth(this.month,this.year);i++){
            let day = new Date(this.year,this.month, i + 1);
            let events = srch.filter((result:any)=>{
              let start = new Date(result.date_start);
              return day.getDate()==start.getDate();
            });
            if(events == undefined){
              user.day.push([]);
            }else{
              user.day.push(events);
            }
          }
        });
        this.personal = users;
        console.log(this.personal)
      }
    });
  }

  // Cambia al mes anterior y actualiza los datos
  previousMonth() {
    if (this.month == 0) {
      this.month = 11;
      this.year = this.year - 1;
    } else {
      this.month = this.month - 1;
    }
    this.getProjects();
  }

  // Cambia al mes siguiente y actualiza los datos
  nextMonth() {
    if (this.month == 11) {
      this.month = 0;
      this.year = this.year + 1;
    } else {
      this.month = this.month + 1;
    }
    this.getProjects();
  }

  // Vuelve al mes y año actual y actualiza los datos
  getToday() {
    this.year = this.today.getFullYear();
    this.month = this.today.getMonth();
    this.getProjects();
  }
}
