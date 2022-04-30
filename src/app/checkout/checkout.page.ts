import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  openMap(){
    this.navCtrl.navigateForward('/map')
  }

}
