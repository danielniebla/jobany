import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageServiceService } from '../storage-service.service';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent {
  constructor(private router: Router, private storage : StorageServiceService) { }
  user='';
  recomendacion() {
    this.router.navigate(['/Evaluaciones']);
  }
  fichasTecnicas() {
    this.router.navigate(['/Evaluaciones/FichaTecnica']);
  }
  cruds(){
    this.router.navigate(['/Evaluaciones/Admin']);
  }
  async initializeUserData() {
    // Usa la función 'getDataItem' del servicio 'StorageServiceService'
    this.user = this.storage.getDataItem('userTipe') || '';
  }

}
