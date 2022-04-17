import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSliderCategoriesComponent } from './products-slider-categories/products-slider-categories/products-slider-categories.component';
import { IonicModule } from '@ionic/angular';
import { FooterBarComponent } from './footer-bar/footer-bar.component';

@NgModule({
 
  imports:[CommonModule, IonicModule],
  exports: [ ProductsSliderCategoriesComponent,FooterBarComponent
     
    ],
    declarations: [ ProductsSliderCategoriesComponent, FooterBarComponent]
})
export class ComponentsModule { }
