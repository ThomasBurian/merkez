import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { BasketServiceService } from 'src/app/services/basket-service.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-products-slider-categories',
  templateUrl: './products-slider-categories.component.html',
  styleUrls: ['./products-slider-categories.component.scss'],
})
export class ProductsSliderCategoriesComponent implements OnInit {

  category

  @Output() onProductUpdate = new EventEmitter();
  
  @Input() categoryId;
  
  products = []

  subcategory : any;

  constructor(private fbService: FirebaseService,
      private actionSheetController: ActionSheetController,
      private modalController: ModalController,
      private basketService: BasketServiceService
      ) { }

  ngOnInit() {
    this.getAllProducts()

    this.basketService.getObservableProductsNumb().subscribe(productNumber =>{
      this.products.forEach(product =>{
        product.btnHidden = true
        this.basketService.checkIfAlreadyInsideBasket(product)
      })
    })
  }

  getAllProducts(){
    this.fbService.getProductsByCategory(this.categoryId).subscribe(data => {
      this.products = data
      this.products.forEach(product =>{
        product.btnHidden = true
        this.basketService.checkIfAlreadyInsideBasket(product)
      })
    })
  }

  unhideBtns(product){
    product.btnHidden = false
  }

  filterProductsBySubCategory(){

    console.log("filterProductsBy Sub Category called ");
     
  }

  addProduct(product, e){
    this.basketService.addProductToStorage(product);
   }
 
    removeProduct(product, e){
     this.basketService.removeProduct(product)
    }
 
    showProductDetails(product){
     //this.openProductDetails(product)
   }

 
  //  async openProductDetails(product){
  //    const itemModal = await this.modalController.create({
  //      component: ProductDetailsPage,
  //      cssClass: 'select-product-modal'
  //      ,
  //      componentProps: {
  //        // chatID: this.chatID,
  //        // username: this.username
  //        product: product
          
  //      }
  //      });
 
  //      itemModal.onDidDismiss()
  //      .then((data) => {
  //       /* this.username = data.data.username; // Here's your chat data!
  //        this.chatID = data.data.chatid;
  //        this.message = data.data.message;
        
  //        this.openChatRoom();*/
 
  //        this.onProductUpdate.emit();
        
  //    });
 
  //   return await itemModal.present();
   
  //  }
 

}
