import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ObPage } from './ob';

@NgModule({
  declarations: [
    ObPage,
  ],
  imports: [
    IonicPageModule.forChild(ObPage),
  ],
})
export class ObPageModule {}
