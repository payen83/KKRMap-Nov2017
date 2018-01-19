import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the PoiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google: any;

@Component({
  selector: 'page-poi',
  templateUrl: 'poi.html',
})
export class PoiPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp);
      this.initMap(resp.coords);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  initMap(coords){
    let latitude = coords.latitude;
    let longitude = coords.longitude;

    let latlng = new google.maps.LatLng(latitude, longitude);
    
    let mapOptions = {
      center: latlng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.searchNearby(latlng).then(places => {
      //console.log(JSON.stringify(places));
      for (let place of places) {
        this.addMarker(place, this.map);
      }
    })
  
  }

  addMarker(place: any, map: any){
      let placeLocation = place.geometry.location;
      let marker = new google.maps.Marker({
        map: map,
        position: placeLocation,
        icon: 'assets/imgs/mosque.png'
      });

    let infoWindow = new google.maps.InfoWindow();
      google.maps.event.addListener(marker, 'click', function() {

        let content: string = '<strong>'+place.name+'</strong><br/>';
        content += '<p>'+place.vicinity+'</p>';
        infoWindow.setContent(content);
        infoWindow.open(map, this);

        setTimeout(function(){ infoWindow.close(); }, 3000);

      })
  }

  searchNearby(latlng): Promise<any> {
      return new Promise( (resolve, reject) => {
        let service = new google.maps.places.PlacesService(this.map);

        service.nearbySearch({
          location: latlng,
          radius: 2000,
          type: ['mosque']
        }, (results, status) => {
            if(status === google.maps.places.PlacesServiceStatus.OK){
              resolve(results);
            }
        });

      });
  }

  

}
