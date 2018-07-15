import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {App} from "ionic-angular";
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../../pages/login/login'
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/interval'
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
     loginStatus:any
     constructor(public http: HttpClient,public app: App,public afAuth:AngularFireAuth) {
          // this.a.subscribe(user => {
          //      if(user)
          //      {
          //           console.log('login')
          //      }
          //      else
          //      {
          //           console.log('not login')
          //      }
          // })
     }
     a = Observable.create(obs => this.afAuth.auth.onAuthStateChanged(
          user => obs.next(user),
          err => obs.error(err),
          () => obs.complete()
     ))
}
