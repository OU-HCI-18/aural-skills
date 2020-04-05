import React, { useState, useEffect, useRef } from 'react';
import './App.css';


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
        // leave space at the bottom
        var start = props.height - props.gap;
        for (var i = 0; i < 5; ++i) {
            // draw the lines
            ctx.fillRect(
                0, 
                start - i*props.gap, // bottom up
                props.width, 
                props.fill);
        }
    }, []); // only do this once

    return (
        <canvas className="lines" ref={canvas} width={props.width} height={props.height} />
    )
}
const major = ['C4','D4','E4','F4','G4','A4','B4','C5','D5','E5','F5','G5','A5','B5','C6'];
function Staff(props) {
    // TODO: handle mode
    
    // right now, we'll just do the major scale
    // immutable
    const [scale, setScale] = useState(major);
    // mutable
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
            <Lines width={700} height={200} gap={30} fill={1}/>
            {notes.map((name, index) => (
                <Note 
                    key={name} 
                    name={name} 
                    bottom={15 + 15*index}
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