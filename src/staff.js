import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import treble from './treble.png';

const note_map = {
    'C4':0,'C#4':0,'D4':1,'Eb4':2,'E4':2,'F4':3, 'F#4':3, 'G4':4, 'Ab4':5, 'A4':5, 'Bb4':6, 'B4':6,
    'C5':7,'C#5':7,'D5':8,'Eb5':9,'E5':9,'F5':10,'F#5':10,'G5':11,'Ab5':12,'A5':12,'Bb5':13,'B5':13,
    'C6':14
};

class note {
    name;  // note name
    index; // computed
    sfn;   // #, b, n, 0
    staff; // #, b, 0
    align; // positive or negative number

    // defaults, just do note('C4',0,'#',0) to overwrite
    constructor(name, sfn=0, staff=0, align=0, index=0) {
        this.name = name;
        this.index = (index === 0) ? note_map[name] : index;
        this.sfn = sfn;
        this.staff = staff;
        this.align = align;
    }
}

const major = [
    new note('C4'),
    new note('D4'),
    new note('E4'),
    new note('F4'),
    new note('G4'),
    new note('A4'),
    new note('B4'),
    new note('C5'),
    new note('D5'),
    new note('E5'),
    new note('F5'),
    new note('G5'),
    new note('A5'),
    new note('B5'),
    new note('C6')
];
const minor = [
    new note('C4'),
    new note('D4'),
    new note('Eb4'),
    new note('F4'),
    new note('G4'),
    new note('Ab4', 0, 'b', 2),
    new note('Bb4', 0, 'b', 0),
    new note('B4', 'n'),
    new note('C5'),
    new note('D5'),
    new note('Eb5', 0, 'b', 1),
    new note('F5'),
    new note('G5'),
    new note('A5'),
    new note('Bb5'),
    new note('B5', 'n'),
    new note('C6')
];
const blues = [
    new note('C4'),
    new note('Eb4'),// 0, 'b'),
    new note('F4', 'n'),
    new note('F#4', '#'),
    new note('G4'),
    new note('Bb4', 0, 'b', 0),
    // new note('B4', 'n'),
    new note('C5'),
    new note('Eb5', 0, 'b', 1),
    new note('F5', 'n'),
    new note('F#5', '#'),
    new note('G5'),
    new note('Bb5'),
    // new note('B5', 'n'),
    new note('C6'),
    // extra at the end
    new note(0, 0, 'b', 2, 5),
];
const pentatonic = [
    new note('C4'),
    new note('D4'),
    new note('E4'),
    new note('G4'),
    new note('A4'),
    new note('C5'),
    new note('D5'),
    new note('E5'),
    new note('G5'),
    new note('A5'),
    new note('C6')
];
const chromatic = [
    new note('C4', 'n'),
    new note('C#4', '#'),
    new note('D4'),
    new note('Eb4', 'b'),
    new note('E4', 'n'),
    new note('F4', 'n'),
    new note('F#4', '#'),
    new note('G4'),
    new note('Ab4', 'b'),
    new note('A4', 'n'),
    new note('Bb4', 'b'),
    new note('B4', 'n'),
    new note('C5', 'n'),
    new note('C#5', '#'),
    new note('D5'),
    new note('E5', 'n'),
    new note('Eb5', 'b'),
    new note('F5', 'n'),
    new note('F#5', '#'),
    new note('G5'),
    new note('Ab5', 'b'),
    new note('A5', 'n'),
    new note('Bb5', 'b'),
    new note('B5', 'n'),
    new note('C6', 'n')
    // new note('C#6', '#'),
];

function Note(props) {
    return (
        <div
            className="note"
            content={props.name}
            style={{top:props.top, bottom:props.bottom, left:props.left}}
            onClick={(e) => props.onNoteClick(props.name)}
            onMouseOver={(e) => {
                props.onHover(props.name)}
            }
        />
    );
}

function Notes(props) {
    // this is purely to get the clickable bits - the coloring will be done
    // by the canvas
    var i = 0;
    // to get the indexing right, we're actually going to use the note map
    // console.log(props.notes);
    return (
    <div>
        {props.notes.map((value, index) => {
            i = value.index;
            return (
            <Note 
                key={value.name} 
                name={value.name} 
                bottom={32 + 15*i}
                left={145 + 35*index}
                onNoteClick={props.onNoteClick}
                onHover={props.setNote}
            />
            )
        })}
    </div>
    );
}

function Lines(props) {
    const canvas = useRef(null);
    
    // this hook creates a warning about missing dependencies 
    // I'm intentionally not including them, so this warning is wrong
    useEffect(() => {
        var ctx = canvas.current.getContext('2d');
        ctx.fillStyle = "#FFF";
        ctx.font = "20px Georgia";
        // go from the bottom up
        // (makes it easier to align the C D E)
        // leave space at the bottom
        var start = props.height - props.gap - props.gap/2;
        for (var i = 0; i < 5; ++i) {
            // draw the lines
            ctx.fillRect(
                0, 
                start - i*props.gap, // bottom up
                props.width, 
                props.fill);
        }

        // draw the notes, labels, and ledger bars
        // bottom marker
        ctx.fillRect(115, props.height - props.gap/2, 50, props.fill);

        var x, y, nx = 15, ny=10, j, index = 0;
        start = props.height - props.gap/2
        // draw the notes
        var length = (props.range === 2) ? props.notes.length : props.notes.length / 2;
        for (i = 0; i < length; ++i) {
            j = props.notes[i].index;
            if (props.notes[i].name !== 0) {
                // note location
                x = 140 + (2*nx+5)*index;
                y = props.height - (props.gap/2)*(j+1)

                // draw the note
                ctx.beginPath();
                ctx.ellipse(x, y, nx, ny, 0, 0, Math.PI*2);
                ctx.fill();


                // top ledger bars (optional)
                if (j >= 12) { // draw a ledger bar at 12, 13 (actually at 12), and 14
                    var j_adj = (j === 13) ? 12 : j;
                    // var adjusted_index = (j === 13) ? index-1 : index;
                    // need to recompute in case j changed
                    x = 140 + (2*nx+5)*index - 2*nx + 6; 
                    y = props.height - (props.gap/2)*(j_adj+1)
                    // draw the bar
                    ctx.fillRect(x, y, 50, props.fill);

                    // reset x, y
                    x = 140 + (2*nx+5)*index;
                    y = props.height - (props.gap/2)*(j+1)
                }

                // add the label (if needed)
                if (props.notes[i].sfn) {
                    ctx.font = "20px Georgia";
                    ctx.fillStyle = '#000';
                    if (props.notes[i].sfn === "#")
                        ctx.fillText('\u266F', x-5, y+6);
                    else if (props.notes[i].sfn === "b") 
                        ctx.fillText('\u266D', x-5, y+6);
                    else 
                        ctx.fillText('\u266E', x-5, y+6);
                    ctx.fillStyle = '#FFF';
                }

                ++index;
            }
        }
        // time to loop through the scale and find sharps and flats
        for (i in props.notes) {
            if (props.notes[i].staff) {
                j = props.notes[i].index;
                ctx.font = "35px Georgia";
                y = false;
                y = (j % 2 === 1);
                x = props.notes[i].align*15;
                if (props.notes[i].staff === '#') {
                    // draw a #
                    y = (y) ? 10 : 9
                    ctx.fillText('\u266F', 80 + x, start + y - j*(props.gap/2));
                    continue;
                } else {
                    // draw a b
                    y = (y) ? 10 : 7
                    ctx.fillText('\u266D', 80 + x, start + y - j*(props.gap/2));
                    continue;
                }
            }
        }



    }, [props.fill, props.gap, props.width, props.height, props.notes, props.range]); // only do this once

    return (
    <div>
        <canvas className="lines" ref={canvas} width={props.width} height={props.height} />
        <img src={treble} alt={"A treble clef"} style={{position:'absolute',top:50,left:20,width:70,height:210,z_index:4}}/>
    </div>
    )
}

function Staff(props) {
    // immutable
    const [notes] = useState(() => {
        switch(props.mode) {
            default :
            case "major" :
                return major;
            case "minor" : 
                return minor;
            case "blues" : 
                return blues;
            case "pentatonic" : 
                return pentatonic;
            case "chromatic" :
                return chromatic;
        }
    });
    const [note, setNote] = useState('.');

    return (
    <div>
        <div className="staff" height={200}>
            <Lines height={235} gap={30} fill={1} range={props.range} notes={notes}
                width={
                (props.range === 2) 
                    ? ((props.mode === "chromatic") ? 1100
                        : (props.mode === "minor") ? 730 
                        : (props.mode === "major" || props.mode === "blues") ? 700 
                        : 550)
                    : ((props.mode === "chromatic") ? 650
                        : (props.mode === "minor") ? 500 
                        : (props.mode === "major" || props.mode === "blues") ? 450 
                        : 350)
                }
            />
            <Notes onNoteClick={props.onNoteClick} setNote={setNote}
                notes={(props.range === 1) 
                    ? notes.slice(0, Math.ceil(notes.length / 2))
                    : notes
                } 
            />
            {/* canvas == lines */}
        </div>
        {note}
        </div>
    );
}
export default Staff;