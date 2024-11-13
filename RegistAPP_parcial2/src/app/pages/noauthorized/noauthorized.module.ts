import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoauthorizedPageRoutingModule } from './noauthorized-routing.module';

import { NoauthorizedPage } from './noauthorized.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoauthorizedPageRoutingModule
  ],
  declarations: [NoauthorizedPage]
})
export class NoauthorizedPageModule {}
