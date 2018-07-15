import { Component,OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Observable,BehaviorSubject,Subject} from 'rxjs';
import { map, filter, switchMap,debounceTime } from 'rxjs/operators';

import { ChannelsPage } from '../channels/channels'
import { LoginPage } from '../login/login'
import { RegisterPage } from '../register/register'

import { AngularFireAuth } from 'angularfire2/auth';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


     constructor(public afAuth:AngularFireAuth,public navCtrl: NavController) {
          this.afAuth.authState.subscribe(user => {
               if(user)
               {
                    this.navCtrl.push(ChannelsPage)
               }
               else
               {
                    this.navCtrl.push(LoginPage)
               }
          })

     }

     loadLogin()
     {

          this.navCtrl.push(LoginPage)
     }
     loadRegister()
     {
          this.navCtrl.push(RegisterPage)
     }
     loadChanels()
     {
          this.navCtrl.push(ChannelsPage)
     }
     ionViewDidLoad()
     {

     }
}
