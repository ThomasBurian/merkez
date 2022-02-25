import { AfterContentChecked, Component, ViewChild } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';
import { Slider } from '../models/slider.model';
import { SwiperComponent, SwiperModule } from 'swiper/angular';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { AutoplayOptions, SwiperOptions } from 'swiper/types';

SwiperCore.use([Autoplay, Pagination])

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterContentChecked{

  @ViewChild ('swiper') swiper : SwiperComponent;

  products : Product[]
  categories : Category[]
  slider : Slider

  config: SwiperOptions = {
    slidesPerView: 1,
    autoplay: {
          delay: 2000,
        },
    pagination: true
  };

  constructor(private fbService: FirebaseService) {}

  ngAfterContentChecked(): void {
    if(this.swiper){
      
      this.swiper.updateSwiper({
        
      })
    }
    
  }

  ngOnInit(){
  
    this.fbService.getCategories().subscribe(data => {
      this.categories = data

    })

    this.fbService.getSlider().subscribe(data => {
      this.slider = data[0]
    })
    
  }

}
