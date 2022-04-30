import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  @ViewChild(GoogleMap, {static: false}) map: GoogleMap

  zoom = 12
  center: google.maps.LatLngLiteral
  markers = []

  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    
  }
  
  constructor(  ) {  }
  
  ngOnInit(){
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
      
      this.addMarker()
    })
  }

  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()))
    console.log(this.map.getCenter())
    this.addMarker()
  }

  click($event){
    this.markers = []
    console.log($event)

    //this.logCenter()
  }

  addMarker() {

    if(this.markers.length == 0){
      this.markers.push({
        position: {
          lat: this.center.lat ,
          lng: this.center.lng ,
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

}
