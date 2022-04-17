import { Component, OnInit } from '@angular/core';
import { BasketServiceService } from '../services/basket-service.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.page.html',
  styleUrls: ['./basket.page.scss'],
})
export class BasketPage implements OnInit {

  productsBought
  
  constructor(private basketService: BasketServiceService) { }

  ngOnInit() {
    this.initBasket()
  }
  initBasket(){

    this.basketService.getObservableProductsNumb().subscribe(productNumber =>{
      this.basketService.getProductsFromStorage().then(data => {
        if(data != undefined)
          this.productsBought = JSON.parse(data)
      })
    })
  }

  clearBasket(){
    this.basketService.clearBasket();
  }
}
