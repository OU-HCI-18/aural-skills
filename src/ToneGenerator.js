import Tone from 'tone';
                // 0    1       2     3     4     5     6       7     8     9     10      11  
const note_arr = ['C4', 'C#4', 'D4', 'Eb4', 'E4', 'F4', 'F#4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4',
                // 12   13      14    15    16    17    18     19    20     21    22      22
                  'C5', 'C#5', 'D5', 'Eb5', 'E5', 'F5', 'F#5', 'G5', 'Ab5', 'A5', 'Bb5', 'B5',
                // 23
                  'C6'];

function rand(num) {
  return Math.floor(Math.random() * num);
}

// scan through the array the get the notes that are allowed (in the interval)
function allowed_notes(array, prev_val, max_leap) {
  console.log(prev_val, "+-", max_leap);
  var i = 0;
  var x1;
  var x2;
  // this is guaranteed to not go off the end of the array
  while (array[i] < (prev_val - max_leap)) {
    i += 1;
  }
  x1 = i;
  while ((i < array.length) && (array[i] < prev_val + max_leap)) {
    i += 1;
  }
  x2 = i;
  console.log(x1,x2)
  return array.slice(x1,x2+1);
}
function rand_array(array) {
  var i = rand(array.length)
  console.log("selcting from:", array, array[i]);
  return array[i]
}
// return a number in the range
//  [max(min_val, prev_val-max_leap), min(max_val, prev_val+max_leap)]
// (end values inclusive)
function rand_leap_between(array, prev_val, max_leap, max_val, min_val = 0) {
  var n1 = array[prev_val] - max_leap;
  var n2 = array[prev_val] + max_leap

  // return an array with every element +- max_leap distance away from prev_note_index
  // random number between x1 .. x2
  var x1 = Math.max(min_val, prev_val - max_leap);
  var x2 = Math.min(prev_val + max_leap, max_val);
  return x1 + Math.floor(Math.random() * (x2 - x1 + 1));
}
/*
This is a stateless, non-rendering tone generate. It does one thing: plays notes 
*/
class ToneGen {
  
  int_note_arr = [];
  max_leap;
  num_notes;
  prev_note_index = -1;
  prev_note = -1;

  constructor(
      num_notes = 3, 
      max_leap = 4, 
      mode = "major", 
      synth = {
        "oscillator" : {
          "type" : "triangle"
        },
        "envelope" : {
          "attackCurve" : "exponential",
          "attack" : 0.02,
          "decayCurve" : "exponential",
          "decay" : 0.01,
          "sustain" : 0.2,
          "releaseCurve" : "exponential",
          "release" : 0.4,
        },
        "portamento" : 0.0,
        "volume" : -12
      }
    ) 
  {
    this.synth = new Tone.Synth(synth).toMaster();
    // this.synth = new Tone.Synth(new Tone.Oscillator({type: "triangle"}), synth).toMaster();;
    // this.synth.volume.value = -4;

    switch (mode) {
      case "major" : this.int_note_arr = [0,2,4,5,7,9,11,12]; // [C, C#, D, E, F, F#, A, B, C]
        break;
      case "minor" : this.int_note_arr = [1,2,3,5,7,8,10,11,12];
        break;
    }
    this.max_leap = max_leap;
    this.num_notes = num_notes;

    this.random_note = this.random_note.bind(this);
    this.play_note = this.play_note.bind(this);
    this.play_rand_note = this.play_rand_note.bind(this);
  }

  random_note() {
    // sentinel: no previous note exists
    if (this.prev_note === -1) {
      this.prev_note = this.int_note_arr[rand(this.int_note_arr.length)]
      return note_arr[this.prev_note];
    } else {
      // console.log("rand_note: ", this.prev_note_index, this.max_leap, this.int_note_arr.length);
      // this.prev_note_index = rand_leap_between(this.prev_note_index, this.max_leap, this.int_note_arr.length - 1);
      // console.log("note:", this.prev_note_index, note_arr[this.int_note_arr[this.prev_note_index]])
      this.prev_note = rand_array(allowed_notes(this.int_note_arr, this.prev_note, this.max_leap))
      return note_arr[this.prev_note];
    }
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

  play_rand_seq(duration='4n', gap=1) {
    var note_arr = []
    var time = 0.25
    for (let i = 0; i < this.num_notes; ++i) {
      note_arr[i] = this.random_note();
      // console.log(note_arr[i]);
      this.synth.triggerAttackRelease(note_arr[i], duration, "+"+time);
      time += gap;
    }
    return note_arr;
  }
}

export default ToneGen;