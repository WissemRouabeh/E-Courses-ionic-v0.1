import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RedirectorPageRoutingModule } from './redirector-routing.module';

import { RedirectorPage } from './redirector.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RedirectorPageRoutingModule
  ],
  declarations: [RedirectorPage]
})
export class RedirectorPageModule {}
