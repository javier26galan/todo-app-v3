import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PixelaRoutingModule } from './pixela-routing.module';
import { PixelaComponent } from './pixela.component';


@NgModule({
  declarations: [
    PixelaComponent
  ],
  imports: [
    CommonModule,
    PixelaRoutingModule
  ]
})
export class PixelaModule { }
