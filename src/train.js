import './App.css';

class TrainData {

  note_stack = [];
  guess_stack = [];
  result_stack = [];
  start = false;

  constructor() {
    this.addGuess  = this.addGuess.bind(this);
    this.addNote   = this.addNote.bind(this);
    this.calcScore = this.calcScore.bind(this);
  }

  addNote(note) {
    while (this.guess_stack.length !== this.note_stack.length) {
      this.guess_stack.unshift('-');
    }
    this.note_stack.unshift(note);
  }

  addNoteArr(note_arr) {
    while (this.guess_stack.length !== this.note_stack.length) {
      this.guess_stack.unshift('-');
    }
    for (var i in note_arr) {
      // console.log("note: " + note_arr[i]);
      this.note_stack.unshift(note_arr[i]);
    }
  }

  addGuess(note) {
    if (this.guess_stack.length !== this.note_stack.length) {
      // console.log("guess:" + note + " : " + this.note_stack.length - this.guess_stack.length)
      console.log(this.note_stack)
      this.guess_stack.unshift(note)
      this.result_stack.unshift(
        // note the weird index- this is because we're working with a stack, and we may have
        // added PAST the note we're comparing to, so we need to look at an index in the note stack
        note === this.note_stack[this.note_stack.length - this.guess_stack.length]
      );
    }
    else {
      console.log("wrong length");
    }
    return (this.result_stack[0]);
  }
  
  calcScore() {
    var score = 0;
    for (let i = 0; i < this.note_stack.length; ++i) {
      if (i < this.guess_stack.length)
        if (this.note_stack[i] === this.guess_stack[i])
          ++score;
    }
    if (score === 0)
      return [0,0];
    return [score, Math.round(100 * (score / this.note_stack.length))];
  }
}

export default TrainData;