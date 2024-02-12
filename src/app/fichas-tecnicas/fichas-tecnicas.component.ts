import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageServiceService } from '../storage-service.service';

@Component({
  selector: 'app-fichas-tecnicas',
  templateUrl: './fichas-tecnicas.component.html',
  styleUrls: ['./fichas-tecnicas.component.css']
})
export class FichasTecnicasComponent {
  constructor(private router: Router, private storage : StorageServiceService) { }  
  user = '';
  carrera='';
  salidaFichas: Record<number, boolean> = {};
  fichasTecnicas() {
    this.router.navigate(['/Sursumversus/Fichas-Tecnicas']);
  }
  recomendacion() {
    this.router.navigate(['/Sursumversus']);
  }
  cruds(){
    this.router.navigate(['/Sursumversus/Admin']);
  }
  ngOnInit(): void {
    this.user = this.storage.getDataItem('userTipe') ?? ''; 
    this.carrera = this.storage.getDataItem('idCarrera')?? '';
    console.log(this.carrera);
    for (let i = 1; i <= 10; i++) {
      this.salidaFichas[i] = false;
    }
    let contador = -1;

    const intervalo = setInterval(() => {
      contador++;
      this.salidaFichas[contador] = true;
      // Detener el intervalo después de 10 veces
      if (contador === 10) {
        clearInterval(intervalo);
      }
    }, 100); // Se ejecutará cada 1000 milisegundos (1 segundo)
  }
}
