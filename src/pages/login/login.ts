import { Component ,OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController   } from 'ionic-angular';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
// import { AngularFirestore ,AngularFirestoreDocument,AngularFirestoreCollection} from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

import { RegisterPage } from '../register/register'



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
     spinload = false
     loginForm: FormGroup;
     constructor(public alertCtrl: AlertController,public fb: FormBuilder,public navCtrl: NavController,public afAuth: AngularFireAuth, public navParams: NavParams) {
          this.createForm()
     }
     createForm() {
          this.loginForm = this.fb.group({
               'user': ['',Validators.compose([Validators.required]),],
               'pass': ['', Validators.compose([Validators.required])],
          });
     }
     showAlert() {
          const alert = this.alertCtrl.create({
                    title: 'Something wrong',
               subTitle: 'Wrong email or password',
               buttons: ['OK']
          });
          alert.present();
     }

     logout()
     {
          this.afAuth.auth.signOut();
     }
     login()
     {
          this.spinload = true
          if(this.loginForm.valid)
          {

               var username = this.loginForm.get('user').value
               var password = this.loginForm.get('pass').value
               this.afAuth.auth.signInWithEmailAndPassword(username,password).then((user)=>{
                    console.log(this.afAuth.auth.currentUser)
               }).catch((err)=>{
                    console.log(err)
                    this.showAlert()
                    this.spinload = false
               })
          }
     }
     register()
     {
          this.navCtrl.push(RegisterPage,{},{ animate: true, direction: 'forward' })
     }


     ionViewDidLoad()
     {
          // this.createForm()
     }

}
