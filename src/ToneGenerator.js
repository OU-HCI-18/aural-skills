import Tone from 'tone';

const note_arr = ['C4', 'C#4', 'D4', 'Eb4','E4','F4', 'F#4','G4', 'Ab4', 'A4', 'Bb4', 'B4',
                'C5', 'C#5', 'D5', 'Eb5','E5','F5', 'F#5','G5', 'Ab5', 'A5', 'Bb5', 'B5'];

var settings = {
  range: 2,
  duration: '4n',
  num: 2,
  gap: 1
}

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

  random_note() {
    if (settings.range === 2) {
      return note_arr[Math.floor(Math.random() * note_arr.length)];
    }
    else {
      return note_arr[Math.floor(Math.random() * note_arr.length / 2)];
    }
  }

  play_note(note) {
    //play the note for the duration of an quarter note
    this.synth.triggerAttackRelease(note, settings.duration);
  }
  
  play_notes(note_arr) {
    var time = 0.25
    for (let i = 0; i < note_arr.length; ++i) {
      this.synth.triggerAttackRelease(note_arr[i], settings.duration, "+"+time);
      time += settings.gap;
    }
  }

  play_rand_note() {
    var note = this.random_note();
    this.play_note(note);
    return note;
  }

  triggerSynth(time) {
    //the time is the sample-accurate time of the event
    this.synth.triggerAttackRelease('C2', '8n', time)
  }

  play_rand_seq() {
    var note_arr = []
    var time = 0.25
    for (let i = 0; i < settings.num; ++i) {
      note_arr[i] = this.random_note();
      console.log(note_arr[i])
      this.synth.triggerAttackRelease(note_arr[i], settings.duration, "+"+time);
      time += settings.gap;
    }
    return note_arr;
  }
}

export default ToneGen;