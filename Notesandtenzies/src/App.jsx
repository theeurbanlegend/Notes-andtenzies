import React from "react"
import Sidebar from "./Sidebar"
import Editor from "./Editor"
import Split from "react-split"
import { addDoc, deleteDoc,doc, onSnapshot, setDoc } from "firebase/firestore"
import { Database, notesCollection } from "./firebase"
function App() {
    const [notes, setNotes] = React.useState([])
    const [currentNoteId, setCurrentNoteId] = React.useState("")
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
    React.useEffect(()=>{
        if(!currentNoteId){
            setCurrentNoteId(notes[0]?.id)
        }
    },[notes])
    async function createNewNote() {
        const newNote = {
            body: "# Type your markdown note's title here"
        }
        const newNoteRef =await addDoc(notesCollection,newNote)
        setCurrentNoteId(newNote.id)
    }
    
    function updateNote(text) {
        const docRef=doc(Database,"notes",currentNoteId)
        setDoc(docRef,{
            body:text
        },{merge:true}) 
    }
    async function deleteNote(noteId) {
        const docRef=doc(Database,"notes",noteId)
        await deleteDoc(docRef)
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
                <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                
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
