import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosRecomendacionService {
  private datosRecomendacion = new BehaviorSubject<any>(null);
  datosRecomendacion$ = this.datosRecomendacion.asObservable();

  enviarDatosRecomendacion(datos: any) {
    this.datosRecomendacion.next(datos);
  }
}
