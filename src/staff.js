import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import treble from './treble.png';


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
        >
            {/* <label htmlFor={props.name}></label> */}
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
        // go from the bottom up
        // (makes it easier to align the C D E)
        // bottom marker
        ctx.fillRect(70, props.height - 1, 50, props.fill);
        // leave space at the bottom
        var start = props.height - props.gap;
        for (var i = 0; i < 5; ++i) {
            // draw the lines
            ctx.fillRect(
                0, 
                start - i*props.gap - 1, // bottom up
                props.width, 
                props.fill);
        }
        ctx.fillRect(430, start - i*props.gap - 1, 50, props.fill);
        ++i;
        ctx.fillRect(490, start - i*props.gap- 1, 50, props.fill);
    }, []); // only do this once

    return (
        <div>
        <canvas className="lines" ref={canvas} width={props.width} height={props.height} />
        <img src={treble} alt={"A treble clef"} style={{position:'absolute',top:50,left:20,width:70,height:210,z_index:4}}/>
        </div>
    )
}

const major = ['C4','D4','E4','F4','G4','A4','B4','C5','D5','E5','F5','G5','A5','B5','C6'];
const minor = ['C4','D4','Eb4','F4','G4','Ab4',/*'Bb4',*/'B4','C5','D5','Eb5','F5','G5','Ab5','B5',/*'Bb5',*/'C6'];
const blues = ['C4','Eb4','F4',/*'F#4',*/'G4','Bb4','C5','Eb5','F5',/*'F#55',*/'G5','Bb5','C6'];
const pentatonic = ['C4','D4','E4','G4','A4','C5','D5','E5','G5','A5','C6'];

function Staff(props) {
    // TODO: handle mode better
    // immutable
    const [scale, setScale] = useState(() => {
        switch(props.mode) {
            case "minor" : 
                return minor;
            case "blues" : 
                return blues;
            case "penatonic" : 
                return pentatonic;
            case "major" :
            default :
                return major;
        }
    });
    // mutable
    // <img src="treble.png" alt = "" style = {{positioning: 'relative', top: '500', left: '500', z_index:'4'}}/> 
    const [notes, setNotes] = useState(scale);
    const [note, setNote] = useState('.');
    // TODO: handle range
    useEffect(() => {
        if (props.range === 1) {
            setNotes(scale.slice(0, Math.ceil(scale.length / 2)))
        }
        else {
            setNotes(scale)
        }
    }, [scale, props.range])
    
    
    return (
    <div>
        <div className="staff" height={200}>
            <Lines width={700} height={220} gap={30} fill={1}/>
            {notes.map((name, index) => (
                <Note 
                    key={name} 
                    name={name} 
                    bottom={18 + 15*index}
                    left={100 + 30*index}
                    onNoteClick={props.onNoteClick}
                    onHover={setNote}
                />
                )
            )}
            {/* canvas == lines */}
        </div>
        {note}
        </div>
    );
}
export default Staff;