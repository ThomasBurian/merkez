import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Address } from 'src/app/models/address.model';
import { AddressModalPage } from '../address-modal/address-modal.page';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  @ViewChild(GoogleMap, {static: false}) map: GoogleMap

  zoom = 14
  center: google.maps.LatLngLiteral
  markers = []
  lng
  lat
  address : Address

  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap'
  }
  
  constructor( public modalController: ModalController,
    private route: ActivatedRoute,  ) {  }
  
  ngOnInit(){

    let address = this.route.snapshot.queryParamMap.get('address');
    this.address = JSON.parse(address);

    if(this.address == undefined){
        navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        this.lng = position.coords.longitude
        this.lat = position.coords.latitude
        this.addMarker(position.coords.latitude, position.coords.longitude )
      })
    }
    else{
      this.center = {
        lat: this.address.lat as number,
        lng: this.address.lng as number,
      }
      this.addMarker(this.address.lat, this.address.lng )
    }
  }

  click(event){
    this.markers = []
    console.log(event.latLng.lat())
    console.log(event.latLng.lng())
    this.addMarker(event.latLng.lat(), event.latLng.lng())
    this.getAddress(event.latLng.lat(), event.latLng.lng())
  }

  addMarker(lat, lng) {
    if(this.markers.length == 0){
      this.markers.push({
        position: {
          lat: lat ,
          lng: lng ,
        },
        label: {
          color: 'red',
          text: 'Your Address',
        },
        title: 'Marker title ',
        options: { animation: google.maps.Animation.BOUNCE },
      })
    }
  }

  getAddress(lat: number, lng: number) {
    console.log('Finding Address');
    this.lat = lat
    this.lng = lng
    
    if (navigator.geolocation) {
       let geocoder = new google.maps.Geocoder();
       let latlng = new google.maps.LatLng(lat, lng);
       geocoder.geocode({ location: latlng }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
             let result = results[0];
             let rsltAdrComponent = result.address_components;
             let resultLength = rsltAdrComponent.length;
          if (result != null) {
       console.log(rsltAdrComponent[resultLength - 8].short_name)
       // this.address = rsltAdrComponent[resultLength - 8].short_name;
     } else {
       console.log('No address available!');
     }
    }
   });
  }
  }

  addAddressModal(){
    this.openModal();
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: AddressModalPage,
      cssClass: 'small-modal',
      componentProps: {
        "lng": this.lng,
        "lat": this.lat
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      
    });

    return await modal.present();
  }
}
