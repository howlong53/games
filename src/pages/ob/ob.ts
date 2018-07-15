import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable,BehaviorSubject,Subject} from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { LoginPage } from '../login/login'
/**
 * Generated class for the ObPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ob',
  templateUrl: 'ob.html',
})
export class ObPage {
     num = 1
     public loginStatus = new BehaviorSubject<any>('first');
     constructor(public navCtrl: NavController, public navParams: NavParams) {
          this.loginStatus.subscribe( data => {
                    if(data != 'first')
                    {

                         this.navCtrl.push(LoginPage)
                         console.log(data)
                    }
               }
          )
     }
     plus()
     {
          this.loginStatus.next(Date.now());
     }

     ionViewDidLoad()
     {

     }

}
