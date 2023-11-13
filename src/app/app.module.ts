import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from "@clr/angular";
import { FormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { CrudRecomendacionComponent } from './crud-recomendacion/crud-recomendacion.component';
import { CrudAccionesComponent } from './crud-acciones/crud-acciones.component';
import { ClickAwayDirective } from './click-away.directive';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    CrudRecomendacionComponent,
    CrudAccionesComponent,
    ClickAwayDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
