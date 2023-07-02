import React from "react"
import Sidebar from "./Sidebar"
import Editor from "./Editor"
import Split from "react-split"
import { addDoc, deleteDoc,doc, onSnapshot, setDoc } from "firebase/firestore"
import { Database, notesCollection } from "./firebase"
function App() {
    const [notes, setNotes] = React.useState([])
    const [tempNoteText,settempNoteText]=React.useState('')
    const [currentNoteId, setCurrentNoteId] = React.useState("")
    const currentNote= notes.find(note => note.id === currentNoteId) || notes[0]
    const sortedNotes=notes.sort((a,b)=>b.updatedAt-a.updatedAt)

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
    React.useEffect(()=>{
        if(currentNote){
        settempNoteText(currentNote.body)
        }
    },[currentNote])
    // Set debouncing logic
    React.useEffect(()=>{
        const timeoutId=setTimeout(()=>{
            if(tempNoteText!==currentNote.body){
            updateNote(tempNoteText)
            }
        },500)
        return ()=>clearTimeout(timeoutId)
    },[tempNoteText])
    async function createNewNote() {
        const newNote = {
            createdAt:Date.now(),
            updatedAt:Date.now(),
            body: "# Type your markdown note's title here"
        }
        const newNoteRef =await addDoc(notesCollection,newNote)
        setCurrentNoteId(newNoteRef.id)
    }

    

    function updateNote(text) {
        const docRef=doc(Database,"notes",currentNoteId)
        setDoc(docRef,{
            updatedAt:Date.now(),
            body:text
        },{merge:true}) 
    }
    async function deleteNote(noteId) {
        const docRef=doc(Database,"notes",noteId)
        await deleteDoc(docRef)
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
                    notes={sortedNotes}
                    currentNote={currentNote}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    handleClick={deleteNote}
                />
                <Editor 
                        tempNoteText={tempNoteText} 
                        settempNoteText={settempNoteText} 
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
