import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AddressService } from 'src/app/services/address.service';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss'],
})
export class AddressesComponent implements OnInit {

  addresses = []

  constructor(private navCtrl: NavController, 
    private addressService: AddressService) { }

  ngOnInit() {
    this.addressService.getAllAddresses().then(data =>
      {
        this.addresses = JSON.parse(data);
        console.log(this.addresses)
      })
  }

  openMap(){
    this.navCtrl.navigateForward('/map')
  }

  seeOnMap(address){
    let addressStr = JSON.stringify(address);
    let navigationExtras: NavigationExtras = {
      queryParams: {
          'address': addressStr
      }
    };
    this.navCtrl.navigateForward('/map', navigationExtras)
  }
}
