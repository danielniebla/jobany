import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { StorageServiceService } from '../storage-service.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor(private router: Router, private storage : StorageServiceService) { }
  user= '';
  recomendacion() {
    this.router.navigate(['/Evaluaciones']);
  }
  fichasTecnicas() {
    this.router.navigate(['/Evaluaciones/FichaTecnica']);
  }
  cruds(){
    this.router.navigate(['/Evaluaciones/Admin']);
  }
  admin(){
    this.storage.setDataItem('idCarrera','0');
    window.location.href = 'https://localhost:80';
    // window.location.reload();

  }
  async initializeUserData() {
    // Usa la función 'getDataItem' del servicio 'StorageServiceService'
    this.user = this.storage.getDataItem('userTipe') || '';
  }

  ngOnInit(): void {
    this.initializeUserData();
  }
}
  