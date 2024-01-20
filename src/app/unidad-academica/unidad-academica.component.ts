import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-unidad-academica',
  templateUrl: './unidad-academica.component.html',
  styleUrls: ['./unidad-academica.component.css']
})
export class UnidadAcademicaComponent implements OnInit{
  constructor(private http: HttpClient) { }
  flagZona:{[key:number]:boolean}={};
  open = false;
  zonas: any[] = [];
  facultades: any[] = [];
  carreras: any[] = [];
  estructuraOrganizada: any[] = [];
  server = '';
  agregarClaseFacultad(facultad: any) {
    facultad.agregarClaseFlag = !facultad.agregarClaseFlag;
  }
  ngOnInit(): void {
    this.server = localStorage.getItem('server') ?? '';
    forkJoin({
      zonas: this.http.get(`${this.server}/api/Zona/Consultar_Zona`),
      facultades: this.http.get(`${this.server}/api/Facultades/Consultar_Facultad`),
      carreras: this.http.get(`${this.server}/api/Carreras/Consultar_Carrera`)
    }).subscribe((responses: any) => {
      this.zonas = responses.zonas;
      this.facultades = responses.facultades;
      this.carreras = responses.carreras;
      
      // Estructurar la información una vez que todas las respuestas han sido recibidas
      this.estructuraOrganizada = this.organizarInformacion();
    }, (error) => {
      console.error('Error:', error);
    });
    
  }
  organizarInformacion() {
    // Lógica para estructurar la información
    const estructura = this.zonas.map(zona => {
      zona.facultades = this.facultades.filter(facultad => facultad.id_zona === zona.id_zona);
      zona.facultades.forEach((facultad: any) => {
        facultad.carreras = this.carreras.filter(carrera => carrera.id_facultad === facultad.id_facultad);
      });
      return zona;
    });
    return estructura;
  }
  agregarClaseZona(id: number) {
    if (this.flagZona[id] == null || this.flagZona[id] == false) {
      this.flagZona[id] = true;
    } else {
      this.flagZona[id] = false;
    }
  }
  cambiarCarrera(id: number){
    localStorage.setItem('idCarrera', id.toString());
    window.location.reload();
  }
  dropDown() {
    this.open = !this.open;
  }
}
