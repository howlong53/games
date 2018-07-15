import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';




import { HomePage } from '../home/home'
import { LoginPage } from '../login/login'

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

     spinload = false

     regisForm: FormGroup;
     pattern = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9-.]+\.[a-zA-Z]{2,6}$" //email
     patternPass ="^[a-zA-Z0-9_-]+"

     constructor(public afs: AngularFirestore,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,public fb: FormBuilder,public afAuth: AngularFireAuth) {
          this.createForm()
     }


     createDataMember(email)
     {
          var date = new Date()
          this.afs.collection('Members').doc(email).set({
               'userid':this.afAuth.auth.currentUser.uid,
               'email':email,
               'date':date.getTime(),
               'price':0
          })
     }

     createForm() {
          this.regisForm = this.fb.group({
               'email': ['', Validators.compose([Validators.required,Validators.minLength(8),Validators.pattern(this.pattern)])], // <--- the FormControl called "name"
               'pass':['',Validators.compose([Validators.required,Validators.minLength(8),Validators.pattern(this.patternPass)])],
          });
     }



     createAcc()
     {
          this.spinload = true
          var email = this.regisForm.get('email').value
          var password = this.regisForm.get('pass').value
          this.afAuth.auth.createUserWithEmailAndPassword(email,password).then((succ)=>{
               this.spinload = false
               this.createDataMember(email)
               this.navCtrl.push(LoginPage)
          }).catch((err)=>{
               const alert = this.alertCtrl.create({
                         title: 'พบข้อผิดพลาด',
                    subTitle: 'อีเมลถูกใช้งานแล้ว',
                    buttons: ['OK']
               });
               alert.present();
               this.spinload = false
          })
     }
     login()
     {
          this.navCtrl.push(LoginPage)
     }


}
