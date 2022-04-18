import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BasketServiceService } from '../services/basket-service.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.page.html',
  styleUrls: ['./basket.page.scss'],
})
export class BasketPage implements OnInit {

  productsBought
  
  constructor(private basketService: BasketServiceService,
    private navCtrl: NavController) { }

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
  
  addProduct(product, e){
    this.basketService.addProductToStorage(product);
  }
 
  removeProduct(product, e){
     this.basketService.removeProduct(product)
  }

  clearBasket(){
    this.basketService.clearBasket();
  }

  gotoCheckout(){
    this.navCtrl.navigateForward('checkout')
  }
}
