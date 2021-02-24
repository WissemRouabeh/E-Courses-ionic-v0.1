import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IonicModule } from "@ionic/angular";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { PanelPageRoutingModule } from "./panel-routing.module";

import { PanelPage } from "./panel.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PanelPageRoutingModule,
  ],
  declarations: [PanelPage],
})
export class PanelPageModule {}
