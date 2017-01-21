import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-note',
  templateUrl: 'note.html'
})
export class notePage {
  note;
  mode;

  constructor(public navCtrl: NavController,
              public params: NavParams,
              public viewCtrl: ViewController) {

      this.note = this.params.get('note');
      this.mode = this.params.get('mode');

  }

  ionViewDidLoad() {
  }

  updatenote(){

      this.viewCtrl.dismiss(this.note);

  }

}
