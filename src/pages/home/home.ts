import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFirestore,AngularFirestoreCollection  } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import { LoginPage } from '../login/login'



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
     private itemsCollection: AngularFirestoreCollection;
     items
     constructor(public navCtrl: NavController,public afs:AngularFirestore) {
          this.itemsCollection = afs.collection('posts');
          this.items = this.itemsCollection.valueChanges();
          console.log(this.items)
     }

     loadLogin()
     {
          this.navCtrl.push(LoginPage)
     }

}
