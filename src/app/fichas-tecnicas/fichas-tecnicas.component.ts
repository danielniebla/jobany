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
  }
}
