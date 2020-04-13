import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import treble from './treble.png';

const note_map = {
    'C4':0,'C#4':0,'D4':1,'Eb4':2,'E4':2,'F4':3, 'F#4':3, 'G4':4, 'Ab4':5, 'A4':5, 'Bb4':6, 'B4':6,
    'C5':7,'C#5':7,'D5':8,'Eb5':9,'E5':9,'F5':10,'F#5':10,'G5':11,'Ab5':12,'A5':12,'Bb5':13,'B5':13,
    'C6':14
};

const major = {
    scale : ['C4','D4','E4','F4','G4','A4','B4','C5','D5','E5','F5','G5','A5','B5','C6'],
    sfn :   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    staff : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
}
const minor = {
    scale : ['C4','D4','Eb4','F4','G4','Ab4','Bb4','B4','C5','D5','Eb5','F5','G5','Ab5','Bb5','B5','C6'],
    sfn : [0,   0,    0,   0,   0,0,'\u266D','\u266E',0,   0,   0,   0,   0,0,'\u266D','\u266E',0],
    staff : [   0,   0,    0,   0,   0,  'b',   'b',   0,  0,   0,  'b',   0,   0,    0,    0,   0,   0]
}
const blues = {
    scale : ['C4','Eb4','F4','F#4','G4','Bb4','C5','Eb5','F5','F#5','G5','Bb5','C6'],
    sfn : [0,0,'\u266E','\u266F',0,0,0,0,'\u266E','\u266F',0,0,0],
    staff : [0,     'b',   0,    0,   0,  'b',   0,    0,   0,    0,   0,    0,   0]
}
const pentatonic = {
    scale : ['C4','D4','E4','G4','A4','C5','D5','E5','G5','A5','C6'],
    sfn :   [0,0,0,0,0,0,0,0,0,0],
    staff : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
}
const chromatic = {
    scale : ['C4','C#4','D4','Eb4','E4','F4','F#4','G4','Ab4','A4','Bb4','B4',
'C5', 'C#5', 'D5', 'Eb5', 'E5', 'F5', 'F#5', 'G5', 'Ab5', 'A5', 'Bb5', 'B5','C6'],
    sfn : ['\u266E','\u266F',0,'\u266D','\u266E','\u266E','\u266F',0,'\u266D','\u266E','\u266D','\u266E',
'\u266E','\u266F',0,'\u266D','\u266E','\u266E','\u266F',0,'\u266D','\u266E','\u266D','\u266E',0],
    staff : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
}

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
    return (
    <div>
        {props.notes.map((name, index) => {
            i = note_map[name];
            return (
            <Note 
                key={name} 
                name={name} 
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

        var y_ind = 0, x, y, nx = 15, ny=10;
        // draw the notes
        for (i in props.notes) {
            y_ind = note_map[props.notes[i]]

            // note location
            x = 140 + (2*nx+5)*i;
            y = props.height - (props.gap/2)*(y_ind+1)

            // draw the note
            ctx.beginPath();
            ctx.ellipse(x, y, nx, ny, 0, 0, Math.PI*2);
            ctx.fill();

            // add the label (if needed)
            if (props.sfn[i]) {
                ctx.fillStyle = '#000';
                ctx.fillText(props.sfn[i], x-5, y+6);
                ctx.fillStyle = '#FFF';
            }

            // top ledger bars
            if (y_ind >= 12) { // draw a ledger bar at 12, 13 (actually at 12), and 14
                y_ind = (y_ind === 13) ? 12 : y_ind;
                var adjusted_index = (y_ind === 13) ? i-1 : i;
                // need to recompute in case y_ind changed
                x = 140 + (2*nx+5)*adjusted_index - 2*nx + 6; 
                y = props.height - (props.gap/2)*(y_ind+1)
                // draw the bar
                ctx.fillRect(x, y, 50, props.fill);
            }
        }

        // time to loop through the scale and find sharps and flats
        ctx.font = "35px Georgia";
        y = false;
        var prev = false;
        start = props.height - props.gap/2
        for (var j in props.staff) {
            console.log(j)
            if (props.staff[j]) {
                i = note_map[props.scale[j]]; // index from the note map
                y = (i % 2 === 1)
                x = (prev) ? 20 : 0;
                if (props.scale[j][1] === '#') {
                    // draw a #
                    y = (y) ? 10 : 9
                    ctx.fillText('\u266F', 80 + x, start + y - i*(props.gap/2));
                    prev = !prev;
                    continue;
                }
                else if (props.scale[j][1] === 'b') {
                    // draw a b
                    y = (y) ? 10 : 7
                    ctx.fillText('\u266D', 80 + x, start + y - i*(props.gap/2));
                    prev = !prev;
                    continue;
                }
            }
            else {
                prev = false;
            }
        }

    }, [props.scale, props.fill, props.gap, props.height, props.width, props.notes, props.sfn, props.staff]); // only do this once

    return (
    <div>
        <canvas className="lines" ref={canvas} width={props.width} height={props.height} />
        <img src={treble} alt={"A treble clef"} style={{position:'absolute',top:50,left:20,width:70,height:210,z_index:4}}/>
    </div>
    )
}

function Staff(props) {
    // immutable
    const [mode] = useState(() => {
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
            <Lines height={235} gap={30} fill={1} 
                scale={mode.scale} sfn={mode.sfn} staff={mode.staff}
                notes={(props.range === 1) 
                    ? mode.scale.slice(0, Math.ceil(mode.length / 2))
                    : mode.scale
                }
                width={
                (props.range === 2) 
                    ? ((props.mode === "chromatic") ? 1100
                        : (props.mode === "minor") ? 730 
                            : (props.mode === "major") ? 700 : 600)
                    : ((props.mode === "chromatic") ? 70
                        : (props.mode === "minor") ? 630 
                            : (props.mode === "major") ? 600 : 500)
                }
            />
            <Notes onNoteClick={props.onNoteClick} setNote={setNote} sfn={mode.sfn} 
                notes={(props.range === 1) 
                    ? mode.scale.slice(0, Math.ceil(mode.length / 2))
                    : mode.scale
                } 
            />
            {/* canvas == lines */}
        </div>
        {note}
        </div>
    );
}
export default Staff;