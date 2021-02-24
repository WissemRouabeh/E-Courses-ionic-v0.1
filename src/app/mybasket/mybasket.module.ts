import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MybasketPageRoutingModule } from './mybasket-routing.module';

import { MybasketPage } from './mybasket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MybasketPageRoutingModule
  ],
  declarations: [MybasketPage]
})
export class MybasketPageModule {}
