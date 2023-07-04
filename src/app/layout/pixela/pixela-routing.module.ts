import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PixelaComponent } from './pixela.component';

const routes: Routes = [{ path: '', component: PixelaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PixelaRoutingModule { }
