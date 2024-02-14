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
    this.router.navigate(['/Sursumversus']);
  }
  fichasTecnicas() {
    this.router.navigate(['/Sursumversus/FichaTecnica']);
  }
  cruds(){
    this.router.navigate(['/Sursumversus/Admin']);
  }
  admin(){
    this.storage.setDataItem('idCarrera','0');
    window.location.href = 'https://yobani.onrender.com/';
    // window.location.reload();

  }
  ngOnInit(): void {
    this.user = this.storage.getDataItem('userTipe') ?? ''; 
  }
}
  