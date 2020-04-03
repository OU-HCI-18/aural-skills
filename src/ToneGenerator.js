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
  return array.slice(x1,x2+1);
}
function rand_array(array) {
  var i = rand(array.length)
  return array[i]
}
/*
This is a stateful, non-rendering tone generate. It does one thing: plays notes
It's stateful because it keeps track of the previous note played and the settings
(locked at the time of construction)

This is currently NOT a React component. It probably should be? 
  (so that react will auto-rebuild when props changes)
*/
class ToneGen {
  
  scale = []; // built from mode and range
  max_leap;
  num_notes;
  duration;
  gap;
  prev_note = -1;
  

  constructor (props = 
    {
      duration : '4n',
      max_leap : 4, 
      mode : "major", 
      num_notes : 3, 
      range : 2,
      gap : 1,
      synth : {
          "oscillator" : {
            "type" : "triangle"
          },
          "envelope" : {
            "attackCurve" : "exponential",
            "attack" : 0.01,
            "decayCurve" : "exponential",
            "decay" : 0.01,
            "sustain" : 0.1,
            "releaseCurve" : "exponential",
            "release" : 0.3,
          },
          "portamento" : 0.0,
          "volume" : -12
        }
    }
  )
  {
    console.log("building toneGen with props", props);

    // store params
    this.duration = props.duration;
    this.max_leap = props.max_leap;
    this.num_notes = props.num_notes;
    this.gap = props.gap;

    // build scale from props.mode and props.range
    switch (props.mode) {
      case ("major"):
        this.scale = [0,2,4,5,7,9,11,12,14,16,17,19,21,23,24];
        break;
      case ("minor"):
        this.scale = [0,2,3,5,7,8,10,11,12,14,15,17,19,20,22,23,24];
        break;
      case("blues"):
        this.scale = [0,3,5,6,7,10,12,15,17,18,19,22,24];
        break;
      case("pentatonic"):
        this.scale = [0,2,4,7,9,12,14,16,19,21,24];
        break;
      case("chromatic"):
      default:
        this.scale = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
    }
    // range check
    if (props.range === 1) {
      // find first element off the end (= C5 = 12)
      var last = this.scale.findIndex(e => e > 12); // find first element > 12
      this.scale = this.scale.slice(0, last);
    }

    // build synth from props.synth
    this.synth = new Tone.Synth(props.synth).toMaster();

    // js is weird, need to do this for every function that uses `this`
    this.random_note = this.random_note.bind(this);
    this.play_note = this.play_note.bind(this);
    this.play_rand_note = this.play_rand_note.bind(this);
  }

  random_note() {
    // sentinel: no previous note exists
    if (this.prev_note === -1) {
      this.prev_note = this.scale[rand(this.scale.length)];
      return note_arr[this.prev_note];
    } else {
      this.prev_note = rand_array(allowed_notes(this.scale, this.prev_note, this.max_leap));
      return note_arr[this.prev_note];
    }
  }

  play_note(note) {
    //play the note for the duration of an quarter note
    this.synth.triggerAttackRelease(note, this.duration);
  }
  
  play_notes(note_arr) {
    var time = 0.25
    for (let i = 0; i < note_arr.length; ++i) {
      this.synth.triggerAttackRelease(note_arr[i], this.duration, "+"+time);
      time += this.gap;
    }
  }

  play_rand_note() {
    var note = this.random_note(this.duration);
    this.play_note(note);
    return note;
  }

  play_rand_seq() {
    var note_arr = []
    var time = 0.25
    for (let i = 0; i < this.num_notes; ++i) {
      note_arr[i] = this.random_note();
      this.synth.triggerAttackRelease(note_arr[i], this.duration, "+"+time);
      time += this.gap;
    }
    return note_arr;
  }
}

export default ToneGen;