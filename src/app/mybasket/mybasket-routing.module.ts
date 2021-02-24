import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MybasketPage } from './mybasket.page';

const routes: Routes = [
  {
    path: '',
    component: MybasketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MybasketPageRoutingModule {}
