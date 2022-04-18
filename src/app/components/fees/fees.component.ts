import { Component, OnInit } from '@angular/core';
import { BasketServiceService } from 'src/app/services/basket-service.service';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.scss'],
})
export class FeesComponent implements OnInit {

  totalFee = 0
  deliveryFee = 0
  chargeAmount = 0
  productsBought 

  constructor(private basketService: BasketServiceService) { }

  ngOnInit() {
    this.basketService.getObservableProductsNumb().subscribe(productNumber =>{
      this.basketService.getProductsFromStorage().then(data => {
        if(data != undefined)
          this.productsBought = JSON.parse(data)
        
        this.productsBought.forEach(product => {

          for(let i=0; i<product.productNoChosen; i++)
              this.totalFee = this.totalFee + Number(product.price.euro)
        });

        this.chargeAmount = this.deliveryFee + this.totalFee
      })
    })
  }

}
