import { Component } from '@angular/core';
import { NavController, ModalController} from 'ionic-angular';
import { notePage } from '../note/note';
import { noteService } from '../../providers/note-service';

@Component({
  selector: 'page-list',
  templateUrl: 'home.html',
})


export class HomePage {
  notes;

  constructor(public navCtrl: NavController, 
              public modalCtrl: ModalController,
              public noteService: noteService ) {
      this.noteService.getnotes().then((notes) => {
          this.notes = notes;
      })
  }

  
  ionViewDidLoad() {
  }

  shownote(note) {
      var mode = 'Edit';
      if(!note) {
        note = {title: '', description: '', date: ''};
        mode = 'Add';
      }
	  note.date = new Date().toDateString();
      let noteModal = this.modalCtrl.create(notePage, {note: note, mode: mode});
      noteModal.onDidDismiss((note) => {
          if(mode == 'Add') {
            this.notes = this.noteService.addnote(note);
          } else {
            this.notes = this.noteService.updatenote(note.key, note);
          }
      });
      noteModal.present();
  }

  addnote() {
    this.shownote(null);
  }

  editnote(note) {
    this.shownote(note);
  }

  markDone(note) {
    note['completed'] = true;
    this.notes = this.noteService.updatenote(note.key, note);
  }

  deletenote(note){
    this.notes = this.noteService.removenote(note.key);
  }

}
