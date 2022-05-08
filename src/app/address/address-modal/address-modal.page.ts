import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Address } from 'src/app/models/address.model';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-address-modal',
  templateUrl: './address-modal.page.html',
  styleUrls: ['./address-modal.page.scss'],
})
export class AddressModalPage implements OnInit {

  constructor(private modalController: ModalController, 
    private navParams: NavParams,
    private addressService: AddressService) { }

  address : Address = new Address()

  ngOnInit() {
    this.address.lat = this.navParams.data.lat;
    this.address.lng = this.navParams.data.lng;
    console.log(this.address.lng)
  }
  
  async closeModal() {
    await this.modalController.dismiss();
  }

  saveAddress(){
    console.log(this.address.name)
    this.addressService.addAddress(this.address)
  }

}
