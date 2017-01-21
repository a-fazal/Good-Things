import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class noteService {

  KEY_NOTES = 'st.notes';
  notes;

  constructor(public storage: Storage) {
      
  }

  generateKey(){
    return Object.keys(this.notes).length+1;
  }

  addnote(note) {
      let key = this.generateKey()
      note['key'] = key;
      this.notes[key] = note;
      this.storage.set(this.KEY_NOTES, this.notes);
      return this.getnotesArray();
  }

  updatenote(key, note) {
      this.notes[key] = note;
      this.storage.set(this.KEY_NOTES, this.notes);
      return this.getnotesArray();
  }

  removenote(key) {
      delete this.notes[key];
      this.storage.set(this.KEY_NOTES, this.notes);
      return this.getnotesArray();
  }

  getnotesArray(){
    var values = [];
    for(var key in this.notes) {
        values.push(this.notes[key]);
    }
    return values.slice().reverse();
  }

  getnotes() {
      
      return new Promise((resolve,reject) => {
            this.storage.get(this.KEY_NOTES).then((notes) => {
                if(!notes) {
                    this.notes = {}
                } else {
                    this.notes = notes;
                }
                resolve(this.getnotesArray());
            })
      })
   
  }

}
