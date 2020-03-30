import { Synth } from 'tone';

var note_arr = ['C', 'C#','D', 'Eb','E','F', 'F#','G', 'Ab', 'A', 'Bb', 'B', ];

/*
This is a stateless, non-rendering tone generate. It does one thing: plays notes 
*/
class ToneGen {

  constructor() {
    this.synth = new Synth().toMaster();

    this.random_note = this.random_note.bind(this);
    this.play_note = this.play_note.bind(this);
    this.play_note_button = this.play_note_button.bind(this);
    this.play_rand_note = this.play_rand_note.bind(this);
  }

  random_note() {
    // 4 = octave
    // TODO: refactor into a property
    // TODO: make this configurable from settings
    return note_arr[Math.floor(Math.random() * note_arr.length)] + '4';
  }

  play_note(note) {
    //play the note for the duration of an quarter note
    this.synth.triggerAttackRelease(note, '4n');
  }

  play_note_button(note) {
    this.play_note(note+'4')
  }

  play_rand_note() {
    var note = this.random_note();
    this.play_note(note);
    return note;
  }
}

export default ToneGen;