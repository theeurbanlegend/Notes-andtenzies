import React from "react"
import Sidebar from "./Sidebar"
import Editor from "./Editor"
import Split from "react-split"
import {nanoid} from "nanoid"
import { addDoc, onSnapshot } from "firebase/firestore"
import { notesCollection } from "./firebase"
function App() {
    const [notes, setNotes] = React.useState([])
    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )
    React.useEffect(()=>{
        const detach=onSnapshot(notesCollection,(snapshot)=>{
            const notesArr=snapshot.docs.map(doc=>({
                ...doc.data(),
                id:doc.id
            }))
            setNotes(notesArr)
        })
        return detach
    },[])

    async function createNewNote() {
        const newNote = {
            body: "# Type your markdown note's title here"
        }
        const newNoteRef =await addDoc(notesCollection,newNote)
        setCurrentNoteId(newNote.id)
    }
    
    function updateNote(text) {
        setNotes(oldNotes => {
           const newArray=[]
           for(let i=0;i<oldNotes.length;i++){
            if(oldNotes[i].id===currentNoteId){
                newArray.unshift({
                    ...oldNotes[i],
                    body:text
                })
            }else{
                newArray.push(oldNotes[i])
            }
        }
            return newArray
           
        })
    }
    function deleteNote(event, noteId) {
        event.stopPropagation()
        setNotes(oldNotes=>oldNotes.filter(note=>note.id!==noteId))
        // One can also add the for loop creating a new array, iterating through the array, and remove the object with prop of NOTEId(This is instead of using .filter method)
    }
    
    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }
    
    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    handleClick={deleteNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}
export default App
