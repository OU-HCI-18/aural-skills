(this.webpackJsonpeartrain=this.webpackJsonpeartrain||[]).push([[0],{11:function(e,t,n){},24:function(e,t,n){e.exports=n.p+"static/media/treble.211c77af.png"},27:function(e,t,n){e.exports=n(38)},32:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),o=n(19),s=n.n(o),i=(n(32),n(8)),r=n(6),c=n(12),u=n(25),m=n(20),h=n(9),p=n(26),g=n(2),E=n(7),d=(n(11),function(){function e(){Object(r.a)(this,e),this.note_stack=[],this.guess_stack=[],this.result_stack=[],this.start=!1,this.addGuess=this.addGuess.bind(this),this.addNote=this.addNote.bind(this),this.calcScore=this.calcScore.bind(this)}return Object(c.a)(e,[{key:"addNote",value:function(e){for(;this.guess_stack.length!==this.note_stack.length;)this.guess_stack.unshift("-");this.note_stack.unshift(e)}},{key:"addNoteArr",value:function(e){for(;this.guess_stack.length!==this.note_stack.length;)this.guess_stack.unshift("-");for(var t in e)this.note_stack.unshift(e[t])}},{key:"addGuess",value:function(e){return this.guess_stack.length===this.note_stack.length?-1:(this.guess_stack.unshift(e),this.result_stack.unshift(e===this.note_stack[this.note_stack.length-this.guess_stack.length]),this.result_stack[0])}},{key:"calcScore",value:function(){for(var e=0,t=0;t<this.note_stack.length;++t)t<this.guess_stack.length&&this.note_stack[t]===this.guess_stack[t]&&++e;return 0===e?[0,0]:[e,Math.round(e/this.note_stack.length*100)]}}]),e}());function b(e){return l.a.createElement("tr",null,l.a.createElement("th",{className:"Results-table-cell"},e.index,"."),l.a.createElement("th",{className:"Results-table-cell"},e.guess),l.a.createElement("th",{className:"Results-table-cell"},e.note),l.a.createElement("th",{className:"Results-table-cell"},e.result?"\u2713":"X"))}var k=function(e){var t=e.notes.slice(e.notes.length-e.guesses.length,e.notes.length);return l.a.createElement("div",{className:"App App-header"},l.a.createElement("h2",null,"Score: ",e.score[1],"% (",e.score[0]," / ",e.results.length,")"),l.a.createElement("table",{className:"Results-table"},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",{className:"Results-table-cell"}),l.a.createElement("th",{className:"Results-table-cell"},"Guess"),l.a.createElement("th",{className:"Results-table-cell"},"Note"),l.a.createElement("th",{className:"Results-table-cell"},"Result"))),l.a.createElement("tbody",null,e.guesses.map((function(n,a){return[n,t[a],e.results[a]]})).map((function(t,n){return l.a.createElement(b,{key:n,index:e.guesses.length-n,guess:t[0],note:t[1],result:t[2]})})))))};function f(e){return l.a.createElement("input",{className:"Input-Spinner",type:"number",min:"1",max:"20",step:"1",value:e.default,onChange:function(t){return e.setSettings("num_notes",t.target.value)}})}function C(e){return l.a.createElement("select",{defaultValue:e.default,onChange:function(t){return e.setSettings("max_leap",t.target.value)}},l.a.createElement("option",{value:2},"Second"),l.a.createElement("option",{value:4},"Third"),l.a.createElement("option",{value:5},"Fourth"),l.a.createElement("option",{value:7},"Fifth"),l.a.createElement("option",{value:9},"Sixth"),l.a.createElement("option",{value:11},"Seventh"),l.a.createElement("option",{value:12},"Octave"))}function N(e){return l.a.createElement("select",{defaultValue:e.default,onChange:function(t){return e.setSettings("mode",t.target.value)}},l.a.createElement("option",{value:"major"},"Major"),l.a.createElement("option",{value:"minor"},"Minor"),l.a.createElement("option",{value:"blues"},"Blues"),l.a.createElement("option",{value:"pentatonic"},"Pentatonic"),l.a.createElement("option",{value:"chromatic"},"Chromatic"))}function v(e){return l.a.createElement("p",null,l.a.createElement("input",{type:"radio",id:"one",name:"octaves",value:1,checked:1===e.default,onChange:function(t){return e.setSettings("range",1)}}),l.a.createElement("label",{for:"one"},"One Octave"),l.a.createElement("br",null),l.a.createElement("input",{type:"radio",id:"two",name:"octaves",value:2,checked:2===e.default,onChange:function(t){return e.setSettings("range",2)}}),l.a.createElement("label",{for:"two"},"Two Octaves"))}function _(e){return l.a.createElement("select",{defaultValue:e.default,onChange:function(t){return e.setSettings("ui",t.target.value)}},l.a.createElement("option",{value:"staff"},"Staff"),l.a.createElement("option",{value:"piano"},"Piano"))}var w=function(e){return l.a.createElement("div",{className:"App-header"},l.a.createElement("header",{style:{padding:0}},l.a.createElement("h2",null,"Settings"),l.a.createElement("p",null,l.a.createElement(g.c,{to:"/aural-skills"},l.a.createElement("button",{className:"App-buttonXL colorGreen"},"Home")),l.a.createElement(g.c,{to:"/aural-skills/train"},l.a.createElement("button",{className:"App-buttonXL colorCoral"},"Start")))),l.a.createElement("table",{className:"Setting-table"},l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("th",{className:"Settings-table-cell"},"Number of Notes:"),l.a.createElement("th",{className:"Settings-table-cell"},l.a.createElement(f,{setSettings:e.setSettings,default:e.numNotes}))),l.a.createElement("tr",null,l.a.createElement("th",{className:"Settings-table-cell"},"Maximum Leap:"),l.a.createElement("th",null,l.a.createElement(C,{setSettings:e.setSettings,default:e.maxLeap}))),l.a.createElement("tr",null,l.a.createElement("th",{className:"Settings-table-cell"},"Mode:"),l.a.createElement("th",{className:"Settings-table-cell"},l.a.createElement(N,{setSettings:e.setSettings,default:e.mode}))),l.a.createElement("tr",null,l.a.createElement("th",{className:"Settings-table-cell"},"UI:"),l.a.createElement("th",{className:"Settings-table-cell"},l.a.createElement(_,{setSettings:e.setSettings,default:e.ui}))),l.a.createElement("tr",null,l.a.createElement("th",{className:"Settings-table-cell"},"Range:"),l.a.createElement("th",{className:"Settings-table-cell"},l.a.createElement(v,{setSettings:e.setSettings,default:e.range}))))))},y=n(23),S=n.n(y),A=["C4","C#4","D4","Eb4","E4","F4","F#4","G4","Ab4","A4","Bb4","B4","C5","C#5","D5","Eb5","E5","F5","F#5","G5","Ab5","A5","Bb5","B5","C6"];function x(e){return Math.floor(Math.random()*e)}function j(e,t,n){for(var a,l,o=arguments.length>3&&void 0!==arguments[3]&&arguments[3],s=0;e[s]<t-n;)s+=1;for(a=s;s<e.length&&e[s]<t+n;)o&&console.log(s,e[s]<t+n,e[s]," < ",t+n),s+=1;return l=s,o&&(console.log(e),console.log("prev_val was "+t+" and max_leap is "+n),console.log("x1: "+a+", x2: "+l),console.log("Allowable values: "+e.slice(a,l))),e.slice(a,l)}function O(e){return e[x(e.length)]}var F=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{duration:"4n",max_leap:4,mode:"major",num_notes:3,range:2,gap:1,synth:{oscillator:{type:"triangle"},envelope:{attackCurve:"exponential",attack:.01,decayCurve:"exponential",decay:.01,sustain:.1,releaseCurve:"exponential",release:.3},portamento:0,volume:-12}};switch(Object(r.a)(this,e),this.scale=[],this.tonic_triad=[],this.tonic_end=[0,7,12,19,24],this.prev_note=-1,this.duration=t.duration,this.max_leap=Number(t.max_leap),this.num_notes=Number(t.num_notes),this.gap=t.gap,t.mode){case"major":this.scale=[0,2,4,5,7,9,11,12,14,16,17,19,21,23,24],this.tonic_triad=[0,4,7,12,16,19,24];break;case"minor":this.scale=[0,2,3,5,7,8,10,11,12,14,15,17,19,20,22,23,24],this.tonic_triad=[0,3,7,12,15,19,24];break;case"blues":this.scale=[0,3,5,6,7,10,12,15,17,18,19,22,24],this.tonic_triad=[0,3,7,12,15,19,24];break;case"pentatonic":this.scale=[0,2,4,7,9,12,14,16,19,21,24],this.tonic_triad=[0,4,7,12,16,19,24];break;case"chromatic":default:this.scale=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],this.tonic_triad=[0,4,7,12,16,19,24]}if(1===t.range){var n=this.scale.findIndex((function(e){return e>12}));this.scale=this.scale.slice(0,n),n=this.tonic_triad.findIndex((function(e){return e>12})),this.tonic_triad=this.tonic_triad.slice(0,n),this.tonic_end=this.tonic_end.slice(0,3)}this.synth=new S.a.Synth(t.synth).toMaster(),this.random_note=this.random_note.bind(this),this.play_note=this.play_note.bind(this),this.play_rand_note=this.play_rand_note.bind(this)}return Object(c.a)(e,[{key:"random_note",value:function(){return-1===this.prev_note?(this.prev_note=this.scale[x(this.scale.length)],A[this.prev_note]):(this.prev_note=O(j(this.scale,this.prev_note,this.max_leap)),A[this.prev_note])}},{key:"random_note_tonic",value:function(){return-1===this.prev_note?(this.prev_note=this.tonic_triad[x(this.tonic_triad.length)],A[this.prev_note]):(this.prev_note=O(j(this.tonic_triad,this.prev_note,this.max_leap)),A[this.prev_note])}},{key:"play_note",value:function(e){this.synth.triggerAttackRelease(e,this.duration)}},{key:"play_notes",value:function(e){for(var t=.25,n=0;n<e.length;++n)this.synth.triggerAttackRelease(e[n],this.duration,"+"+t),t+=this.gap}},{key:"play_rand_note",value:function(){var e=this.random_note(this.duration);return this.play_note(e),e}},{key:"play_rand_seq",value:function(){var e=[],t=.25;if(this.num_notes<3){for(var n=0;n<this.num_notes;++n)e[n]=this.random_note(),this.synth.triggerAttackRelease(e[n],this.duration,"+"+t),t+=this.gap;return this.prev_note=-1,e}if(3===this.num_notes){e[0]=this.random_note_tonic(),this.synth.triggerAttackRelease(e[0],this.duration,"+"+t),t+=this.gap;for(var a=1;a<this.num_notes;++a)e[a]=this.random_note(),this.synth.triggerAttackRelease(e[a],this.duration,"+"+t),t+=this.gap;return this.prev_note=-1,e}e[0]=this.random_note_tonic(),this.synth.triggerAttackRelease(e[0],this.duration,"+"+t),t+=this.gap;for(var l=1;l<this.num_notes-1;++l)e[l]=this.random_note(),this.synth.triggerAttackRelease(e[l],this.duration,"+"+t),t+=this.gap;return e[this.num_notes-1]=this.random_note_tonic(),this.synth.triggerAttackRelease(e[this.num_notes-1],this.duration,"+"+t),t+=this.gap,this.prev_note=-1,e}}]),e}();function G(e){return l.a.createElement("div",{className:"key",onClick:function(t){return e.onNoteClick(e.name)}})}function R(e){return l.a.createElement("div",{className:"key black",onClick:function(t){return e.onNoteClick(e.name)}})}function B(e){return l.a.createElement("div",{className:"piano phone"},l.a.createElement(G,{name:"C4",onNoteClick:e.onNoteClick}),l.a.createElement(R,{name:"C#4",onNoteClick:e.onNoteClick}),l.a.createElement(G,{name:"D4",onNoteClick:e.onNoteClick}),l.a.createElement(R,{name:"Eb4",onNoteClick:e.onNoteClick}),l.a.createElement(G,{name:"E4",onNoteClick:e.onNoteClick}),l.a.createElement(G,{name:"F4",onNoteClick:e.onNoteClick}),l.a.createElement(R,{name:"F#4",onNoteClick:e.onNoteClick}),l.a.createElement(G,{name:"G4",onNoteClick:e.onNoteClick}),l.a.createElement(R,{name:"Ab4",onNoteClick:e.onNoteClick}),l.a.createElement(G,{name:"A4",onNoteClick:e.onNoteClick}),l.a.createElement(R,{name:"Bb4",onNoteClick:e.onNoteClick}),l.a.createElement(G,{name:"B4",onNoteClick:e.onNoteClick}),l.a.createElement(G,{name:"C5",onNoteClick:e.onNoteClick}))}var D=function(e){return 1===e.range?l.a.createElement(B,{onNoteClick:e.onNoteClick}):l.a.createElement("div",{className:"piano"},l.a.createElement(G,{name:"C4",onNoteClick:e.onNoteClick}),l.a.createElement(R,{name:"C#4",onNoteClick:e.onNoteClick}),l.a.createElement(G,{name:"D4",onNoteClick:e.onNoteClick}),l.a.createElement(R,{name:"Eb4",onNoteClick:e.onNoteClick}),l.a.createElement(G,{name:"E4",onNoteClick:e.onNoteClick}),l.a.createElement(G,{name:"F4",onNoteClick:e.onNoteClick}),l.a.createElement(R,{name:"F#4",onNoteClick:e.onNoteClick}),l.a.createElement(G,{name:"G4",onNoteClick:e.onNoteClick}),l.a.createElement(R,{name:"Ab4",onNoteClick:e.onNoteClick}),l.a.createElement(G,{name:"A4",onNoteClick:e.onNoteClick}),l.a.createElement(R,{name:"Bb4",onNoteClick:e.onNoteClick}),l.a.createElement(G,{name:"B4",onNoteClick:e.onNoteClick}),l.a.createElement(G,{name:"C5",onNoteClick:e.onNoteClick}),l.a.createElement(R,{name:"C#5",onNoteClick:e.onNoteClick}),l.a.createElement(G,{name:"D5",onNoteClick:e.onNoteClick}),l.a.createElement(R,{name:"Eb5",onNoteClick:e.onNoteClick}),l.a.createElement(G,{name:"E5",onNoteClick:e.onNoteClick}),l.a.createElement(G,{name:"F5",onNoteClick:e.onNoteClick}),l.a.createElement(R,{name:"F#5",onNoteClick:e.onNoteClick}),l.a.createElement(G,{name:"G5",onNoteClick:e.onNoteClick}),l.a.createElement(R,{name:"Ab5",onNoteClick:e.onNoteClick}),l.a.createElement(G,{name:"A5",onNoteClick:e.onNoteClick}),l.a.createElement(R,{name:"Bb5",onNoteClick:e.onNoteClick}),l.a.createElement(G,{name:"B5",onNoteClick:e.onNoteClick}),l.a.createElement(G,{name:"C6",onNoteClick:e.onNoteClick}))},I=n(24),M=n.n(I),P={C4:0,"C#4":0,D4:1,Eb4:2,E4:2,F4:3,"F#4":3,G4:4,Ab4:5,A4:5,Bb4:6,B4:6,C5:7,"C#5":7,D5:8,Eb5:9,E5:9,F5:10,"F#5":10,G5:11,Ab5:12,A5:12,Bb5:13,B5:13,C6:14},T=function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,l=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0;Object(r.a)(this,e),this.name=t,this.index=0===o?P[t]:o,this.sfn=n,this.staff=a,this.align=l},U=[new T("C4"),new T("D4"),new T("E4"),new T("F4"),new T("G4"),new T("A4"),new T("B4"),new T("C5"),new T("D5"),new T("E5"),new T("F5"),new T("G5"),new T("A5"),new T("B5"),new T("C6")],L=[new T("C4"),new T("D4"),new T("Eb4"),new T("F4"),new T("G4"),new T("Ab4",0,"b",2),new T("Bb4",0,"b",0),new T("B4","n"),new T("C5"),new T("D5"),new T("Eb5",0,"b",1),new T("F5"),new T("G5"),new T("Ab5"),new T("Bb5"),new T("B5","n"),new T("C6")],Y=[new T("C4"),new T("Eb4"),new T("F4","n"),new T("F#4","#"),new T("G4"),new T("Bb4",0,"b",0),new T("C5"),new T("Eb5",0,"b",1),new T("F5","n"),new T("F#5","#"),new T("G5"),new T("Bb5"),new T("C6"),new T(0,0,"b",2,5)],q=[new T("C4"),new T("D4"),new T("E4"),new T("G4"),new T("A4"),new T("C5"),new T("D5"),new T("E5"),new T("G5"),new T("A5"),new T("C6")],H=[new T("C4","n"),new T("C#4","#"),new T("D4"),new T("Eb4","b"),new T("E4","n"),new T("F4","n"),new T("F#4","#"),new T("G4"),new T("Ab4","b"),new T("A4","n"),new T("Bb4","b"),new T("B4","n"),new T("C5","n"),new T("C#5","#"),new T("D5"),new T("E5","n"),new T("Eb5","b"),new T("F5","n"),new T("F#5","#"),new T("G5"),new T("Ab5","b"),new T("A5","n"),new T("Bb5","b"),new T("B5","n"),new T("C6","n")];function V(e){return l.a.createElement("div",{className:"note",content:e.name,style:{top:e.top,bottom:e.bottom,left:e.left},onClick:function(t){return e.onNoteClick(e.name)},onMouseOver:function(t){e.onHover(e.name)}})}function X(e){var t=0;return l.a.createElement("div",null,e.notes.map((function(n,a){return t=n.index,l.a.createElement(V,{key:n.name,name:n.name,bottom:32+15*t,left:145+35*a,onNoteClick:e.onNoteClick,onHover:e.setNote})})))}function J(e){var t=Object(a.useRef)(null);return Object(a.useEffect)((function(){var n=t.current.getContext("2d");n.fillStyle="#FFF",n.font="20px Georgia";for(var a=e.height-e.gap-e.gap/2,l=0;l<5;++l)n.fillRect(0,a-l*e.gap,e.width,e.fill);n.fillRect(115,e.height-e.gap/2,50,e.fill);var o,s,i,r=0;a=e.height-e.gap/2;var c=2===e.range?e.notes.length:e.notes.length/2;for(l=0;l<c;++l)if(i=e.notes[l].index,0!==e.notes[l].name){if(o=140+35*r,s=e.height-e.gap/2*(i+1),n.beginPath(),n.ellipse(o,s,15,10,0,0,2*Math.PI),n.fill(),i>=12){var u=13===i?12:i;o=140+35*r-30+6,s=e.height-e.gap/2*(u+1),n.fillRect(o,s,50,e.fill),o=140+35*r,s=e.height-e.gap/2*(i+1)}e.notes[l].sfn&&(n.font="20px Georgia",n.fillStyle="#000","#"===e.notes[l].sfn?n.fillText("\u266f",o-5,s+6):"b"===e.notes[l].sfn?n.fillText("\u266d",o-5,s+6):n.fillText("\u266e",o-5,s+6),n.fillStyle="#FFF"),++r}for(l in e.notes)if(e.notes[l].staff){if(i=e.notes[l].index,n.font="35px Georgia",s=!1,s=i%2===1,o=15*e.notes[l].align,"#"===e.notes[l].staff){s=s?10:9,n.fillText("\u266f",80+o,a+s-i*(e.gap/2));continue}s=s?10:7,n.fillText("\u266d",80+o,a+s-i*(e.gap/2))}else;}),[e.fill,e.gap,e.width,e.height,e.notes,e.range]),l.a.createElement("div",null,l.a.createElement("canvas",{className:"lines",ref:t,width:e.width,height:e.height}),l.a.createElement("img",{src:M.a,alt:"A treble clef",style:{position:"absolute",top:50,left:20,width:70,height:210,z_index:4}}))}var W=function(e){var t=Object(a.useState)((function(){switch(e.mode){default:case"major":return U;case"minor":return L;case"blues":return Y;case"pentatonic":return q;case"chromatic":return H}})),n=Object(i.a)(t,1)[0],o=Object(a.useState)("."),s=Object(i.a)(o,2),r=s[0],c=s[1];return l.a.createElement("div",null,l.a.createElement("div",{className:"staff",height:200},l.a.createElement(J,{height:235,gap:30,fill:1,range:e.range,notes:n,width:2===e.range?"chromatic"===e.mode?1100:"minor"===e.mode?730:"major"===e.mode||"blues"===e.mode?700:550:"chromatic"===e.mode?650:"minor"===e.mode?500:"major"===e.mode||"blues"===e.mode?450:350}),l.a.createElement(X,{onNoteClick:e.onNoteClick,setNote:c,notes:1===e.range?n.slice(0,Math.ceil(n.length/2)):n})),r)},z=new d,$=null;function K(e){var t=Object(a.useState)(""),n=Object(i.a)(t,2),o=n[0],s=n[1];return l.a.createElement("div",null,l.a.createElement("p",null,l.a.createElement(g.b,{to:"/aural-skills/train"},l.a.createElement("button",{className:"App-button colorGreen",onClick:e.onStart},"Start")),l.a.createElement(g.b,{to:"/aural-skills/settings"},l.a.createElement("button",{className:"App-button colorCoral"},"Settings")),l.a.createElement(g.b,{to:"/aural-skills/about"},l.a.createElement("button",{className:"App-button colorYellow"},"About"))),l.a.createElement("div",null,l.a.createElement("p",null,"Play a Note:"),l.a.createElement(e.ui,{mode:e.mode,range:e.range,onNoteClick:function(t){console.log(t),null===$&&($=new F(e)),$.play_note(t),s(t)}}),l.a.createElement("p",null,"Note Played:"),l.a.createElement("p",null,o)))}function Q(e){var t=Object(a.useState)(""),n=Object(i.a)(t,2),o=n[0],s=n[1],r=Object(a.useState)(""),c=Object(i.a)(r,2),u=c[0],m=c[1],h=Object(a.useState)(null),p=Object(i.a)(h,2),E=p[0],d=p[1];return Object(a.useEffect)((function(){var t=($=new F(e)).play_rand_seq();s(t),z.addNoteArr(t)}),[]),l.a.createElement("div",null,l.a.createElement("p",null,l.a.createElement(g.b,{to:"/aural-skills"},l.a.createElement("button",{className:"App-button colorGreen"},"Start Over")),l.a.createElement(g.b,{to:"/aural-skills/settings"},l.a.createElement("button",{className:"App-button colorCoral"},"Settings")),l.a.createElement(g.b,{to:"/aural-skills/results"},l.a.createElement("button",{className:"App-button colorYellow"},"Results"))),l.a.createElement(e.ui,{mode:e.mode,range:e.range,onNoteClick:function(e){var t=z.addGuess(e);-1!==t&&(m(e),d(t),$.play_note(e))}}),l.a.createElement("p",null,"You Guessed:"),l.a.createElement("p",null,u,null===E?".":E?" : Correct":" : Incorrect"),l.a.createElement("div",{className:"App"},l.a.createElement("div",null,e.replay&&l.a.createElement("button",{className:"App-button colorYellow",onClick:function(e){null!==$&&(console.log("replay:",o),$.play_notes(o))}},"Replay"),l.a.createElement("button",{className:"App-button colorPurple",onClick:function(t){null===$&&($=new F(e)),$.play_notes(["C4","C5"])}},"Play C"),l.a.createElement("button",{className:"App-button colorGreen",onClick:function(t){null===$&&($=new F(e));var n=$.play_rand_seq();s(n),console.log(n),z.addNoteArr(n)}},"Next Melody"))))}function Z(e){return l.a.createElement("div",null,l.a.createElement("p",null,l.a.createElement(g.b,{to:"/aural-skills"},l.a.createElement("button",{className:"App-button colorGreen"},"Start Over")),l.a.createElement(g.b,{to:"/aural-skills/settings"},l.a.createElement("button",{className:"App-button colorCoral"},"Settings")),l.a.createElement(g.b,{to:"/aural-skills/train"},l.a.createElement("button",{className:"App-button colorYellow"},"Continue"))),l.a.createElement(k,{guesses:z.guess_stack,notes:z.note_stack,results:z.result_stack,score:z.calcScore()}))}var ee=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(u.a)(this,Object(m.a)(t).call(this,e))).state={ui:"piano",replay:!0,max_leap:5,mode:"major",num_notes:4,range:1,gap:1,duration:"4n",synth:{oscillator:{type:"triangle"},envelope:{attackCurve:"exponential",attack:.02,decayCurve:"exponential",decay:.03,sustain:.4,releaseCurve:"exponential",release:.5},portamento:0,volume:-15}},n.onStart=n.onStart.bind(Object(h.a)(n)),n.swapUI=n.swapUI.bind(Object(h.a)(n)),n.swapRange=n.swapRange.bind(Object(h.a)(n)),n.setSettings=n.setSettings.bind(Object(h.a)(n)),n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"onStart",value:function(){console.log("resetting train data"),z=new d,$=new F(this.state)}},{key:"swapUI",value:function(){"piano"===this.state.ui?this.setState({ui:"staff"}):this.setState({ui:"piano"})}},{key:"swapRange",value:function(){1===this.state.range?this.setState({range:2}):2===this.state.range&&this.setState({range:1}),$=new F(this.state)}},{key:"setSettings",value:function(e,t){"num_notes"===e?this.setState({num_notes:t}):"max_leap"===e?this.setState({max_leap:t}):"mode"===e?this.setState({mode:t}):"range"===e?this.setState({range:t}):"ui"===e&&this.setState({ui:t})}},{key:"render",value:function(){var e;return"piano"===this.state.ui?e=D:"staff"===this.state.ui&&(e=W),l.a.createElement("header",{className:"App App-header"},l.a.createElement("h1",null,"Aural Training"),l.a.createElement(g.a,null,l.a.createElement(E.c,null,l.a.createElement(E.a,{path:"/aural-skills/settings"},l.a.createElement(w,{setSettings:this.setSettings,numNotes:this.state.num_notes,maxLeap:this.state.max_leap,mode:this.state.mode,range:this.state.range,ui:this.state.ui})),l.a.createElement(E.a,{path:"/aural-skills/results"},l.a.createElement(Z,{trainData:z})),l.a.createElement(E.a,{path:"/aural-skills/train"},l.a.createElement(Q,{trainData:z,replay:this.state.replay,ui:e,duration:this.state.duration,max_leap:this.state.max_leap,mode:this.state.mode,num_notes:this.state.num_notes,range:this.state.range,gap:this.state.gap,synth:this.state.synth})),l.a.createElement(E.a,{path:"/aural-skills/"},l.a.createElement(K,{swapUI:this.swapUI,swapRange:this.swapRange,onStart:this.onStart,ui:e,duration:this.state.duration,max_leap:this.state.max_leap,mode:this.state.mode,num_notes:this.state.num_notes,range:this.state.range,gap:this.state.gap,synth:this.state.synth})))))}}]),t}(l.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(l.a.createElement(g.a,null,l.a.createElement(ee,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[27,1,2]]]);
//# sourceMappingURL=main.86ced135.chunk.js.map