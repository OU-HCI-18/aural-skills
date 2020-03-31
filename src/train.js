import './App.css';

class TrainData {

  note_stack = [];
  guess_stack = [];
  result_stack = [];
  start = false;
  guessed = true;

  constructor() {
    this.addGuess  = this.addGuess.bind(this);
    this.addNote   = this.addNote.bind(this);
    this.calcScore = this.calcScore.bind(this);
  }

  addNote(note) {
    if (!this.guessed) {
      this.guess_stack.unshift('-');
    }
    this.note_stack.unshift(note);
    this.guessed = false;
  }

  addGuess(note) {
    if (!this.guessed) {
      this.guessed = true;
      this.guess_stack.unshift(note)
      this.result_stack.unshift(note === this.note_stack[0]);
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