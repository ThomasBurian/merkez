import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AddressService } from '../services/address.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  constructor(private navCtrl: NavController,
    private addressService: AddressService) { }

  ngOnInit() {
  }

}
