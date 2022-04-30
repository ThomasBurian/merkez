import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { BasketPageRoutingModule } from './basket-routing.module';
import { BasketPage } from './basket.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,ComponentsModule,
    FormsModule,
    IonicModule,
    BasketPageRoutingModule
  ],
  declarations: [BasketPage]
})
export class BasketPageModule {}
