import Tone from 'tone';

const note_arr = ['C4', 'C#4', 'D4', 'Eb4','E4','F4', 'F#4','G4', 'Ab4', 'A4', 'Bb4', 'B4',
                'C5', 'C#5', 'D5', 'Eb5','E5','F5', 'F#5','G5', 'Ab5', 'A5', 'Bb5', 'B5'];
/*
This is a stateless, non-rendering tone generate. It does one thing: plays notes 
*/
class ToneGen {

  constructor() {
    this.synth = new Tone.Synth().toMaster();

    this.random_note = this.random_note.bind(this);
    this.play_note = this.play_note.bind(this);
    this.play_rand_note = this.play_rand_note.bind(this);
  }

  random_note(range=1) {
    return note_arr[Math.floor(Math.random() * note_arr.length * range/2)];
  }

  play_note(note, duration='4n') {
    //play the note for the duration of an quarter note
    this.synth.triggerAttackRelease(note, duration);
  }
  
  play_notes(note_arr, duration='4n', gap=1) {
    var time = 0.25
    for (let i = 0; i < note_arr.length; ++i) {
      this.synth.triggerAttackRelease(note_arr[i], duration, "+"+time);
      time += gap;
    }
  }

  play_rand_note(duration='4n') {
    var note = this.random_note(duration);
    this.play_note(note);
    return note;
  }

  play_rand_seq(num=3, duration='4n', gap=1) {
    var note_arr = []
    var time = 0.25
    for (let i = 0; i < num; ++i) {
      note_arr[i] = this.random_note();
      this.synth.triggerAttackRelease(note_arr[i], duration, "+"+time);
      time += gap;
    }
    return note_arr;
  }
}
;
export default ToneGen;