import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google: any;
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;

  map: any;
  center: any;
  location: string;
  coords: string;

  constructor(public geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp);
      this.initMap(resp.coords);
     }).catch((error) => {
       console.log('Error getting location', error);
       this.addMarker();
     });
    
  }

  initMap(coords){
    let latitude = coords.latitude;
    let longitude = coords.longitude;
    this.center = {
      lat: latitude,
      lng: longitude
    };
    this.coords = latitude + ',' + longitude;
    let latlng = new google.maps.LatLng(latitude, longitude);
    
    let mapOptions = {
      center: latlng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker();
  }

  addMarker(){
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    })

    let content = '<strong>Your current location</strong>';

    let infoWindow = new google.maps.InfoWindow({
      content: content
    })

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });     
  }

  setCenter(){
    this.map.panTo(this.center);
  }

  getDirection(){
    let directionService = new google.maps.DirectionsService;
    let directionDisplay = new google.maps.DirectionsRenderer;

    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 15,
      center: this.map.getCenter(),
      disableDefaultUI: true
    });

    directionDisplay.setMap(this.map);

    directionService.route({
      origin: this.coords,
      destination: this.location,
      travelMode: 'DRIVING'
    }, function (response, status){
       if(status === 'OK'){
          directionDisplay.setDirections(response);
       } else {
         alert('Directions failed: ' + status);
         //this.addMarker();
       }
    })

  }

}
