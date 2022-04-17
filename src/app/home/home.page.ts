import { AfterContentChecked, Component, ViewChild } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';
import { Slider } from '../models/slider.model';
import { SwiperComponent, SwiperModule } from 'swiper/angular';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { AutoplayOptions, SwiperOptions } from 'swiper/types';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { StorageService } from '../services/storage.service';

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

  constructor(private fbService: FirebaseService, 
              private storage: StorageService,
              private navCtrl: NavController) {}

  ngAfterContentChecked(): void {
    if(this.swiper){
      
      this.swiper.updateSwiper({
        
      })
    }
  }

  ngOnInit(){
    this.storage.init()
    
    this.fbService.getCategories().subscribe(data => {
      this.categories = data
    })

    this.fbService.getSlider().subscribe(data => {
      this.slider = data[0]
    })
  }

  showCategory(category) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
          'category': category
      }
    };
    this.navCtrl.navigateForward('/category', navigationExtras);
  }
}
