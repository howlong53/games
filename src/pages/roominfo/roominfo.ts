import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
/**
 * Generated class for the RoominfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-roominfo',
  templateUrl: 'roominfo.html',
})
export class RoominfoPage {
     listEmails:Observable<any>
     roomID = this.navParams.get('roomID')
     Member_join = this.afs.collection('rooms').doc(this.roomID).valueChanges()
     constructor(public afs: AngularFirestore,public navCtrl: NavController, public navParams: NavParams) {
          this.listEmails = this.Member_join
     }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad RoominfoPage');
  }

}
