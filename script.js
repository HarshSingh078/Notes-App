const notesContainer = document.querySelector(".notes-container")
const addNote = document.querySelector("#add_note")
const modal = document.querySelector(".modal")
const cancelBtn = document.querySelector("#cancel") ;
const saveBtn = document.querySelector("#save") ;
const titleInput = document.querySelector("#title")
const contentInput = document.querySelector("#content") ;

addNote.addEventListener('click',function() {
modal.classList.remove("hidden");

})

saveBtn.addEventListener('click',function() {
    if(titleInput.value.trim()==="" || contentInput.value.trim()==="") {
    return ;
}
const note = document.createElement("article")
const title = document.createElement("h3")
const paragraph = document.createElement("p")
const edit = document.createElement("button")
const del = document.createElement("button")
const copy = document.createElement("button") 
edit.textContent = "Edit" ;
del.textContent = "Delete" ;
copy.textContent = "Copy" ;
title.textContent =  titleInput.value.trim() ;
paragraph.textContent = contentInput.value.trim() ;
const container = document.createElement("div") ;
container.appendChild(edit) ;
container.appendChild(del) ;
container.appendChild(copy) ;
note.appendChild(title) ;
note.appendChild(paragraph) ;
note.classList.add('note') ;
container.classList.add('actions') ;
note.appendChild(container) ;
notesContainer.appendChild(note) ;
titleInput.value = "";
contentInput.value = "";


del.addEventListener('click',function() {
    note.remove() ;
})

modal.classList.add("hidden") ;
})
cancelBtn.addEventListener('click',function() {
    titleInput.value = "" ;
    contentInput.value = "" ;
    modal.classList.add('hidden') ;
})

