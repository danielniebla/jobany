import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { CrudAccionesComponent } from './crud-acciones/crud-acciones.component';
import { CrudRecomendacionComponent } from './crud-recomendacion/crud-recomendacion.component';

const routes: Routes = [
  { path: '', redirectTo: '/Sursumversus', pathMatch: 'full' }, // Ruta predeterminada
  {path: 'Sursumversus', component:MainComponent},
  {path: 'login', component:LoginComponent},
  {path: 'Sursumversus/Acciones', component:CrudAccionesComponent},
  {path: 'Sursumversus/Recomendaciones', component:CrudRecomendacionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
