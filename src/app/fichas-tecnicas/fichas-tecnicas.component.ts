import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fichas-tecnicas',
  templateUrl: './fichas-tecnicas.component.html',
  styleUrls: ['./fichas-tecnicas.component.css']
})
export class FichasTecnicasComponent {
  constructor(private router: Router) { }  

  fichasTecnicas() {
    this.router.navigate(['/Sursumversus/Fichas-Tecnicas']);
  }
  recomendacion() {
    this.router.navigate(['/Sursumversus']);
  }
  cruds(){
    this.router.navigate(['/Sursumversus/Admin']);
  }
}
