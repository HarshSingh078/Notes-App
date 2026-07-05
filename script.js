const notesContainer = document.querySelector(".notes-container");
const addNote = document.querySelector("#add_note");
const modal = document.querySelector(".modal");
const cancelBtn = document.querySelector("#cancel");
const saveBtn = document.querySelector("#save");
const titleInput = document.querySelector("#title");
const contentInput = document.querySelector("#content");
const searchInput = document.querySelector("#search") ;

searchInput.addEventListener("input",function(){
  const allNotes = document.querySelectorAll(".note") ;
  const searchText = searchInput.value.toLowerCase() ;
  allNotes.forEach(function(note) {
    const title = note.querySelector("h3").textContent.toLowerCase() ;
    const content = note.querySelector("p").textContent.toLowerCase() ;

    if(title.includes(searchText) || content.includes(searchText)) {
        note.style.display = "" ; 
    }
    else {
      note.style.display = "none" ;
    }
  })
})

 
let currentNote = null;

let notes = JSON.parse(localStorage.getItem("notes")) || [];

notes.forEach(function (note) {
  createNote(note.id, note.title, note.content);
});

function createNote(id, title, content) {
  const note = document.createElement("article");
  note.dataset.id = id;
  const titleName = document.createElement("h3");
  const paragraph = document.createElement("p");
  const edit = document.createElement("button");
  const del = document.createElement("button");
  const copy = document.createElement("button");
  edit.textContent = "Edit";
  del.textContent = "Delete";
  copy.textContent = "Copy";

  copy.addEventListener("click", function () {
    let data = `${titleName.textContent}\n${paragraph.textContent}`;
    navigator.clipboard.writeText(data);
  });

  titleName.textContent = title;
  paragraph.textContent = content;
  const container = document.createElement("div");
  container.appendChild(edit);
  container.appendChild(del);
  container.appendChild(copy);
  note.appendChild(titleName);
  note.appendChild(paragraph);
  note.classList.add("note");
  container.classList.add("actions");
  note.appendChild(container);
  notesContainer.appendChild(note);

  del.addEventListener("click", function () {
    const index = notes.findIndex(function (noteObject) {
      return noteObject.id === id;
    });
    if(index !== -1){
    notes.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notes));
    note.remove();
}
  });

  edit.addEventListener("click", function () {
    currentNote = id;
    modal.classList.remove("hidden");
    titleInput.value = titleName.textContent;
    contentInput.value = paragraph.textContent;
  });
}

addNote.addEventListener("click", function () {
  titleInput.value = "";
  contentInput.value = "";
  currentNote = null;
  modal.classList.remove("hidden");
});

saveBtn.addEventListener("click", function () {
  if (titleInput.value.trim() === "" || contentInput.value.trim() === "") {
    return;
  }

  if (currentNote != null) {
    const index = notes.findIndex(function (noteObject) {
      return noteObject.id === currentNote;
    });
    if(index !== -1){
   notes[index].title = titleInput.value.trim();
    notes[index].content = contentInput.value.trim();

    localStorage.setItem("notes", JSON.stringify(notes));
}

   const noteElement = document.querySelector(
    `[data-id="${currentNote}"]`
);

    const currentTitle = noteElement.querySelector("h3") ;
    const currentParagraph = noteElement.querySelector("p") ;

    currentTitle.textContent = titleInput.value.trim();
    currentParagraph.textContent = contentInput.value.trim();

    currentNote = null;
    modal.classList.add("hidden");
    titleInput.value = "";
    contentInput.value = "";
    return;
  } else {
    const newNote = {
      id: Date.now(),
      title: titleInput.value.trim(),
      content: contentInput.value.trim(),
    };
    notes.push(newNote);

    localStorage.setItem("notes", JSON.stringify(notes));
    createNote(newNote.id, newNote.title, newNote.content);

    titleInput.value = "";
    contentInput.value = "";

    modal.classList.add("hidden");
  }
});
cancelBtn.addEventListener("click", function () {
  titleInput.value = "";
  contentInput.value = "";
  currentNote = null;
  modal.classList.add("hidden");
});
