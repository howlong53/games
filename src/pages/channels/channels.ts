import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,AlertController  } from 'ionic-angular';


import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { trigger, state,style,transition, useAnimation,animate} from '@angular/animations';
// import { bounce,slideInDown,fadeInDown} from 'ng-animate';
import * as $ from 'jquery';

import { AngularFireAuth } from 'angularfire2/auth';

import { RoominfoPage } from '../roominfo/roominfo'

@IonicPage()
@Component({
  selector: 'page-channels',
  templateUrl: 'channels.html',
})
export class ChannelsPage {

     private userEmail = this.afAuth.auth.currentUser.email
     private roomsCollection:AngularFirestoreCollection = this.afs.collection('rooms',ref => ref.orderBy("roomname","asc"))
     private membersCollections:AngularFirestoreCollection = this.afs.collection('Members',ref => ref.where('userid','==',this.afAuth.auth.currentUser.uid))
     rooms:Observable<any>
     cashUser
     constructor(
          public modalCtrl: ModalController,public alert:AlertController,
          public afs: AngularFirestore,public navCtrl: NavController,public navParams: NavParams,public afAuth: AngularFireAuth)
     {
          this.rooms = this.roomsCollection.snapshotChanges()
               .pipe(map(actions => actions.map(a =>
                    {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data };
               })
          ));
          this.cashUser = this.membersCollections.valueChanges()

     }
     showAlert(title,content) {
          const alert = this.alert.create({
                    title: title,
               subTitle: content,
               buttons: ['OK']
          });
          alert.present();
     }
     joinRoom(roomid)
     {
          let room_collection = this.afs.doc('rooms/'+roomid)
          let check_email = room_collection.valueChanges().subscribe(data => {
               if(data['users'].includes(this.userEmail))
               {
                    this.showAlert('!!!','You Are Already Registered')
               }
               else
               {
                    let arr = [this.userEmail]
                    let room_collection:any = this.afs.doc('rooms/'+roomid)
                    let unsub_room = room_collection.valueChanges().subscribe(data => {
                         data.users.forEach((datas)=>{
                              arr.push(datas)
                         })
                         let update_data = this.afs.doc('rooms/'+roomid)
                         update_data.update({
                              users:arr
                         })
                         unsub_room.unsubscribe()
                         this.showAlert('Successful','Have funnn')
                    })
               }
               check_email.unsubscribe()
          })

     }

     infoGame(id)
     {
          let profileModal = this.modalCtrl.create(RoominfoPage, { roomID: id });
          profileModal.present();

     }

     logout()
     {
          this.afAuth.auth.signOut();
     }

     more_detail(event)
     {
          var parent = $(event.target).parent()
          var li = parent.find('li')
          var title = parent.find('.title-room')
          if($(event.target).hasClass('click-toggle-slide'))
          {
               li.css({
                    'width':'0%'
               })
               title.css({
                    'width':'0%'
               })
               parent.find('.more-content').css('height','0')
               parent.find('.corner-ribbon').fadeIn()
               $(event.target).removeClass('click-toggle-slide')
          }
          else
          {
               li.css({
                    'width':'100%'
               })
               title.css({
                    'width':'100%'
               })
               parent.find('.more-content').css('height','185px')
               parent.find('.corner-ribbon').fadeOut()
               $(event.target).addClass('click-toggle-slide')
          }
     }



     ionViewDidLoad() {
          console.log('ionViewDidLoad ChannelsPage');
     }

}
