import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccessoperationPageRoutingModule } from './successoperation-routing.module';

import { SuccessoperationPage } from './successoperation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessoperationPageRoutingModule
  ],
  declarations: [SuccessoperationPage]
})
export class SuccessoperationPageModule {}
