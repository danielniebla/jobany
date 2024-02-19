import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admincruds',
  templateUrl: './admincruds.component.html',
  styleUrls: ['./admincruds.component.css']
})
export class AdmincrudsComponent {
  constructor(private router: Router) { }
  tf= false;
  tz=false;
  tc=false;
  tu=false;
  facultades(){
    this.tf=!this.tf;
  }
  zonas(){
    this.tz=!this.tz;
  }
  carreras(){
    this.tc=!this.tc;
  }
  user(){
    this.tu=!this.tu;
  }
  fichasTecnicas() {
    this.router.navigate(['/Evaluaciones/FichaTecnica']);
  }
  recomendacion() {
    this.router.navigate(['/Evaluaciones']);
  }
  cruds(){
    this.router.navigate(['/Evaluaciones/Admin']);
  }
}
