import { Component,OnInit } from '@angular/core';
import { Facultad } from '../interfaces/facultad';
import { ProgrmaEducativo } from '../interfaces/progrma-educativo';
import { Zona } from '../interfaces/zona';
import { Indicador } from '../interfaces/indicador'; 

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  open=false;
  zonas: Zona[] = [
    { zona: "Zona Norte", agregarClaseFlag: false },
    { zona: "Zona Centro", agregarClaseFlag: false },
    { zona: "Zona Sur", agregarClaseFlag: false },
    { zona: "Zona Occidente", agregarClaseFlag: false }
  ];

  
  facultades: Facultad[] = [
    { nombre: "Facultad de Ciencias Naturales y Exactas", zona: "Zona Norte", agregarClaseFlag: false },
    { nombre: "Facultad de Derecho", zona: "Zona Centro", agregarClaseFlag: false },
    { nombre: "Facultad de Ciencias Agropecuarias", zona: "Zona Sur", agregarClaseFlag: false },
    { nombre: "Facultad de Ingeniería", zona: "Zona Centro", agregarClaseFlag: false }
  ];
  programasEducativos:  ProgrmaEducativo [] = [
    { nombre: "Licenciatura en Matemáticas", facultad: "Facultad de Ciencias Naturales y Exactas" },
    { nombre: "Licenciatura en Derecho", facultad: "Facultad de Derecho" },
    { nombre: "Ingeniería en Agronomía", facultad: "Facultad de Ciencias Agropecuarias" },
    { nombre: "Ingeniería en Informática", facultad: "Facultad de Ingeniería" },
  ];
  indicadores: Indicador[] = [
    { nombre: "Indicador 1", valoracion: "Valor del Indicador 1", flag: false },
    { nombre: "Indicador 2 con un nombre más largo", valoracion: "Este es un valor más largo para el Indicador 2. Puede contener una descripción detallada.", flag: false },
    { nombre: "Indicador 3", valoracion: "Valor del Indicador 3", flag: false },
    { nombre: "Indicador 4", valoracion: "Valor del Indicador 4", flag: false },
    { nombre: "Indicador 5", valoracion: "Valor del Indicador 5", flag: false }
  ];
  agcz(zona: Zona) {
    zona.agregarClaseFlag = !zona.agregarClaseFlag;
  }
  agcf(facultad: Facultad) {
    facultad.agregarClaseFlag = !facultad.agregarClaseFlag;
  }
  toggle(){
    this.open= !this.open;
  }
  toggle2(indicador: any) {
    indicador.flag = !indicador.flag;
  }
  toggle3(){
    var elemento = document.getElementById("indicador");

    if (elemento) {
      if (elemento.style.display === "none") {
        elemento.style.display = "block";
      } else {
        elemento.style.display = "none";
      }
    } else {
      console.error("El elemento no fue encontrado en el DOM.");
    }
  }
  ngOnInit(): void {
    
  }
  
}
