const notesContainer=document.getElementById("wrapper");
const addNoteButton=notesContainer.querySelector(".add-note");

getNotes().forEach(note=>{
    const noteElement=createNoteElement(note.id,note.content);
    notesContainer.insertBefore(noteElement,addNoteButton); 
});

addNoteButton.addEventListener("click",()=>{
    addnote();
});

function getNotes(){
    return JSON.parse(localStorage.getItem("stickynotes-notes")|| "[]");
}

function saveNotes(notes){
    localStorage.setItem("stickynotes-notes",JSON.stringify(notes));
}


function createNoteElement(id,content){
    const element=document.createElement("textarea");



    element.classList.add("note");
    element.value=content;
    element.placeholder="Write your notes🙂";
    
    element.addEventListener("change",()=>{
        updateNode(id,element.value);
    });

    element.addEventListener("dblclick",()=>{
        const dodelete=confirm("Are you sure you want to delete the sticky notes?");
        if(dodelete){
            deleteNode(id,element);
        }
    });

    return element;
}

function addnote(){
    const notes=getNotes();
    const noteObject={
        id: Math.floor(Math.random()*10000),
        content: ""

    };

    const noteElement=createNoteElement(noteObject.id,noteObject.content);
    notesContainer.insertBefore(noteElement,addNoteButton); 
    
    notes.push(noteObject);
    saveNotes(notes);
}

function updateNode(id,newContent){
    const notes=getNotes();
    const targetNote=notes.filter(notes=> notes.id ==id)[0];

    targetNote.content=newContent;
    saveNotes(notes);
}

function deleteNode(id,element){
    const notes=getNotes().filter(note=> note.id !=id);
    saveNotes(notes);

    notesContainer.removeChild(element);
}