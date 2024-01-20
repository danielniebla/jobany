import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor(private router: Router,) { }
  user= '';
  recomendacion() {
    this.router.navigate(['/Sursumversus']);
  }
  fichasTecnicas() {
    this.router.navigate(['/Sursumversus/FichaTecnica']);
  }
  cruds(){
    this.router.navigate(['/Sursumversus/Admin']);
  }
  ngOnInit(): void {
    this.user = localStorage.getItem('idUsuario') ?? ''; 
    
  }
}
  