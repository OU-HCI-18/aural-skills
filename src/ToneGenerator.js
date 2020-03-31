import { Synth, Sequence } from 'tone';

var note_arr = ['C4', 'C#4', 'D4', 'Eb4','E4','F4', 'F#4','G4', 'Ab4', 'A4', 'Bb4', 'B4',
                'C5', 'C#5', 'D5', 'Eb5','E5','F5', 'F#5','G5', 'Ab5', 'A5', 'Bb5', 'B5'];

/*
This is a stateless, non-rendering tone generate. It does one thing: plays notes 
*/
class ToneGen {

  constructor() {
    this.synth = new Synth().toMaster();

    this.random_note = this.random_note.bind(this);
    this.play_note = this.play_note.bind(this);
    this.play_rand_note = this.play_rand_note.bind(this);
  }

  random_note() {
    return note_arr[Math.floor(Math.random() * note_arr.length)];
  }

  play_note(note) {
    //play the note for the duration of an quarter note
    this.synth.triggerAttackRelease(note, '4n');
  }

  play_rand_note() {
    var note = this.random_note();
    this.play_note(note);
  
    return note;
  }

  play_seq(num_notes) {
    new Sequence(function(time, note){
      console.log(note);
    //straight quater notes
    }, ["C4", "E4", "G4", "A4"], "4n");   
 
  }
}

export default ToneGen;