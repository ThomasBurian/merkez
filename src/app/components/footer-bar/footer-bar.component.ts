import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-footer-bar',
  templateUrl: './footer-bar.component.html',
  styleUrls: ['./footer-bar.component.scss'],
})
export class FooterBarComponent implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {}

  gotoBasket(){
    this.navCtrl.navigateForward('/basket')
  }
  gotoHome(){
    this.navCtrl.navigateForward('/home')
  }
}
