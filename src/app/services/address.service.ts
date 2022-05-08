import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  addresses = []
  address

  constructor(private storage: StorageService) { }

  addAddress(address){
    this.getAllAddresses().then(data => {
      this.addresses = JSON.parse(data);
      this.addresses.push(address)
      const productsJSON = JSON.stringify(this.addresses);
      this.storage.set('addresses', productsJSON)
    })
  }

  setCurrentAddress(address){
    this.storage.set('address', address)
  }

  getAllAddresses(){
    return this.storage.get('addresses')
  }

  getCurrentAddress(){
    return this.storage.get('address')
  }

  async clearAddresses(){
    this.addresses = [];
    await this.storage.set('addresses', JSON.stringify(this.addresses))
  }
}
