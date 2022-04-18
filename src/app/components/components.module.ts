import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSliderCategoriesComponent } from './products-slider-categories/products-slider-categories/products-slider-categories.component';
import { IonicModule } from '@ionic/angular';
import { FooterBarComponent } from './footer-bar/footer-bar.component';
import { FeesComponent } from './fees/fees.component';

@NgModule({
 
  imports:[CommonModule, IonicModule],
  exports: [FeesComponent, ProductsSliderCategoriesComponent,FooterBarComponent
     
    ],
    declarations: [ FeesComponent, ProductsSliderCategoriesComponent, FooterBarComponent]
})
export class ComponentsModule { }
