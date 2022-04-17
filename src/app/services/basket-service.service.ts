import { JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class BasketServiceService {

  products = [];
  observableProductsamount = new BehaviorSubject(0);

  constructor(private storage: StorageService) {
    
  }
  
  async addProductToStorage(product: any) {
    this.storage.get('products')
    .then(data => {
        if(data != null)
          this.products = JSON.parse(data);
        else
          this.products = []
        
        if(this.products.length != 0){
          //check if product already exist in list, if yes then update productNoChosen
          if (this.products.some(e => e.productID === product.productID)){
             const oneProduct = this.products.find(obj => {
                            return obj.productID === product.productID
                            })
                    oneProduct.productNoChosen ++
          }
          //if not then add product to list
          else
            this.products.push(product);
        }
        else
          this.products.push(product);
        
        product.productNoChosen ++
        const productsJSON = JSON.stringify(this.products);
        this.storage.set('products', productsJSON).then(()=> this.setProductsNumber())
      })
  }

  removeProduct(product){
    if(product.productNoChosen == 0)
      return
    product.productNoChosen --
    //check if product is in storage
    this.storage.get('products')
    .then(data => {
        this.products = JSON.parse(data);
        //check if product already exist in list, if yes then update productNoChosen
        if (this.products.some(e => e.productID === product.productID)){
             const oneProduct = this.products.find(obj => {
                            return obj.productID === product.productID
                            })
            if(oneProduct.productNoChosen > 0)
              oneProduct.productNoChosen --
            
            //remove product from list
            if(oneProduct.productNoChosen == 0) {
              var index = this.products.map(x => {
                return x.productID;
              }).indexOf(product.productID);
              
              this.products.splice(index, 1);
              
            } 

        const productsJSON = JSON.stringify(this.products);
        this.storage.set('products', productsJSON).then(()=>this.setProductsNumber())
        }
      })
  
  }

  //returns the number of a certain product
  getProductCount(product){
    product.productNoChosen
  }

  //returns all products
  getProductsFromStorage() {
    return this.storage.get('products')
    /** retrieve it like this
     *  this.basketService.getProductsFromStorage().then(data => {
      
          this.localstorageProducts = JSON.parse(data);

        })
     */
  }

  //counts the products and result.length is the number of the unique products
  setProductsNumber(){
    this.storage.get('products')
      .then(data => {
           this.products = JSON.parse(data);
          //result has only unique products
          if(this.products != null)
            this.observableProductsamount.next(this.products.length);
          else 
            this.observableProductsamount.next(0);
      })
  }

  getObservableProductsNumb(){
    return this.observableProductsamount
  }
  
  async clearBasket(){
    this.products = [];
    await this.storage.set('products', JSON.stringify(this.products)).then(()=> this.setProductsNumber())
  }

  //we have to show number of items if the product is already in the basket
  async checkIfAlreadyInsideBasket(product){
      this.getProductsFromStorage().then(data => {
      
        this.products = JSON.parse(data);

        if(this.products != null){
          //check if product already exist in list, if yes then update productNoChosen
          if (this.products.some(e => e.productID === product.productID)){
             const oneProduct = this.products.find(obj => {
                            return obj.productID === product.productID
                            })
                    product.productNoChosen = oneProduct.productNoChosen
                    product.btnHidden = false
          }
          else{
            product.productNoChosen = 0
            product.btnHidden = true
          }
        }
        else{
          product.productNoChosen = 0
          product.btnHidden = true
        }        
      })
  }

  async checkIfProductsInsideBasket(products){
    this.getProductsFromStorage().then(data => {
      this.products = JSON.parse(data);
      if(this.products != null){
        products.forEach(product =>{
          //check if product already exist in list, if yes then update productNoChosen
          if (this.products.some(e => e.productID === product.productID)){
            const oneProduct = this.products.find(obj => {
                            return obj.productID === product.productID
                            })
                    product.productNoChosen = oneProduct.productNoChosen
                    product.btnHidden = false
          }
          else{
            product.productNoChosen = 0
            product.btnHidden = true
          }
        })
      }
      else{
        products.forEach(product =>{
            product.productNoChosen = 0
            product.btnHidden = true
        })
      }

    })
}

  async addBulkPreviousOrderToStorage(bulkProducts: any) {
    this.storage.get('products')
    .then(data => {
        if(data != null)
          this.products = JSON.parse(data);
        else
          this.products = []
        
        bulkProducts.forEach(product=>{
            if(this.products.length != 0){
              //check if product already exist in list, if yes then update productNoChosen
              if (this.products.some(e => e.productID === product.productID)){
                const oneProduct = this.products.find(obj => {
                                return obj.productID === product.productID
                                })
                        oneProduct.productNoChosen = oneProduct.productNoChosen + product.productNoChosen
              }
              //if not then add product to list
              else
                this.products.push(product);
            }
            else
              this.products.push(product);
            
        })
        const productsJSON = JSON.stringify(this.products);
        this.storage.set('products', productsJSON).then(()=> this.setProductsNumber())
      })
  }

  async addBulkCampaignsToStorage(bulkProducts: any) {
    this.storage.get('products')
    .then(data => {
        if(data != null)
          this.products = JSON.parse(data);
        else
          this.products = []
        
        bulkProducts.forEach(product=>{
            if(this.products.length != 0){
              //check if product already exist in list, if yes then update productNoChosen
              if (this.products.some(e => e.productID === product.productID)){
                const oneProduct = this.products.find(obj => {
                                return obj.productID === product.productID
                                })
                        oneProduct.productNoChosen = oneProduct.productNoChosen + product.productNoChosen
              }
              //if not then add product to list
              else{
                product.productNoChosen ++
                this.products.push(product);
              }
            }
            else{
              product.productNoChosen ++
              this.products.push(product);
            }         
        })
        const productsJSON = JSON.stringify(this.products);
        this.storage.set('products', productsJSON).then(()=> this.setProductsNumber())
      })
  }
}
