import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { StorageServiceService } from '../storage-service.service';
@Component({
  selector: 'app-unidad-academica',
  templateUrl: './unidad-academica.component.html',
  styleUrls: ['./unidad-academica.component.css']
})
export class UnidadAcademicaComponent implements OnInit{
  constructor(private http: HttpClient, private storage : StorageServiceService) { }
  flagZona:{[key:number]:boolean}={};
  flagFacultades:{[key:number]:boolean}={};
  open = false;
  zonas: any[] = [];
  facultades: any[] = [];
  carreras: any[] = [];
  lastFId=0;
  lastZId=0;
  estructuraOrganizada: any[] = [];
  server = '';
  dinamica='';
  carrera='';
  user='';
  agregarClaseFacultad(id: any) {
    this.flagFacultades[this.lastFId?? 0] = false;
    setTimeout(() => {
      this.flagFacultades[id] = true;
    }, 10);
    this.lastFId=id;
  }
  async initializeData() {
    this.dinamica = this.storage.getDataItem('idDinamico') || '';
    this.carrera = this.storage.getDataItem('idCarrera') || '';
    this.server = this.storage.getDataItem('server') || '';
    this.user = this.storage.getDataItem('userTipe') || '';
  }
  
  ngOnInit(): void {
    this.initializeData();

    forkJoin({
      zonas: this.http.get(`${this.server}/api/Zona/Consultar_Zona`),
      facultades: this.http.get(`${this.server}/api/Facultades/Consultar_Facultad`),
      carreras: this.http.get(`${this.server}/api/Carreras/Consultar_Carrera`)
    }).subscribe({
      next: (responses: any) => {
      this.zonas = responses.zonas;
      this.facultades = responses.facultades;
      this.carreras = responses.carreras;
      this.revisarDatos();
    },
    error: (err) => {
      console.error('Error:', err);
    }
  });
  
  }
  revisarDatos(){
    
      // Aplicar lógica según el tipo de usuario
      if (this.user === '3') {
        this.zonas = this.zonas.filter((zona: any) => zona.id_zona === this.dinamica);

    
      } else if (this.user === '4') {
        // Filtrar las facultades para mostrar solo datos de la facultad del usuario
        this.facultades = this.facultades.filter((facultad: any) => facultad.id_facultad === this.dinamica);

        // Encontrar la zona a la que pertenece la facultad del usuario
        const zonaUsuario = this.zonas.find(zona =>
          zona.id_zona === this.facultades[0]?.id_zona // Utiliza la primera facultad encontrada (si existe)
        );

        // Filtrar las zonas para mostrar solo datos de esa zona
        this.zonas = zonaUsuario ? [zonaUsuario] : [];


      } else if(this.user == '5') {
        // No habrá datos
        this.zonas = [];
        this.facultades = [];
        this.carreras = [];
      }  
      // Estructurar la información una vez que todas las respuestas han sido recibidas
      this.estructuraOrganizada = this.organizarInformacion();
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
    this.flagZona[id] = true;
    this.flagZona[this.lastZId?? 0] = false;
    this.lastZId=id;
  }
  cambiarCarrera(id: number){
    localStorage.setItem('idCarrera', id.toString());
    // window.location.href = 'https://uas-proy.com/';
    window.location.reload();
  }
  dropDown() {
    this.open = !this.open;
  }
}
