import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';


/**
 * Generated class for the CameraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {
  imageView: any;

  constructor(public actionSheetCtrl: ActionSheetController, public camera: Camera, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
  }

  btnPicture(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select your source..',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.takePicture('camera')
          }
        },{
          text: 'Photo Album',
          handler: () => {
            this.takePicture('photoAlbum')
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(source: string){
    let cameraSourceType: any;
    if(source === 'camera'){
      cameraSourceType = this.camera.PictureSourceType.CAMERA;
    } else {
      cameraSourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    }

    const options: CameraOptions = {
      quality: 100,
      sourceType: cameraSourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     //let base64Image = 'data:image/jpeg;base64,' + imageData;
     //if image is FILE_URI
      this.imageView = imageData;
    }, (err) => {
     // Handle error
    });

  }

}
