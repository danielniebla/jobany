import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogosComponent } from './logos/logos.component';
import { Navbar1Component } from './navbar1/navbar1.component';
import { Navbar2Component } from './navbar2/navbar2.component';


@NgModule({
  declarations: [
    LogosComponent,
    Navbar1Component,
    Navbar2Component,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LogosComponent ,
    Navbar1Component,
    Navbar2Component,

  ]

})
export class HeaderModule { }
