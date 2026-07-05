const notesContainer = document.querySelector(".notes-container");
const addNote = document.querySelector("#add_note");
const modal = document.querySelector(".modal");
const cancelBtn = document.querySelector("#cancel");
const saveBtn = document.querySelector("#save");
const titleInput = document.querySelector("#title");
const contentInput = document.querySelector("#content");

let currentNote = null;

addNote.addEventListener("click", function () {
  modal.classList.remove("hidden");
});

saveBtn.addEventListener("click", function () {
      if (titleInput.value.trim() === "" || contentInput.value.trim() === "") {
    return;
  }

  if (currentNote != null) {
    const currentTitle = currentNote.querySelector("h3");
    const currentParagraph = currentNote.querySelector("p");

    currentTitle.textContent = titleInput.value.trim();
    currentParagraph.textContent = contentInput.value.trim();

    currentNote = null;
    modal.classList.add("hidden");
    titleInput.value = "";
    contentInput.value = "";
    return;
  } else {
  const note = document.createElement("article");
  const title = document.createElement("h3");
  const paragraph = document.createElement("p");
  const edit = document.createElement("button");
  const del = document.createElement("button");
  const copy = document.createElement("button");
  
  
  edit.textContent = "Edit";
  del.textContent = "Delete";
  copy.textContent = "Copy";
  copy.addEventListener("click",function() {
    let data = `${title.textContent}\n${paragraph.textContent}`
    navigator.clipboard.writeText(data) ;
  })
  title.textContent = titleInput.value.trim();
  paragraph.textContent = contentInput.value.trim();
  const container = document.createElement("div");
  container.appendChild(edit);
  container.appendChild(del);
  container.appendChild(copy);
  note.appendChild(title);
  note.appendChild(paragraph);
  note.classList.add("note");
  container.classList.add("actions");
  note.appendChild(container);
  notesContainer.appendChild(note);
  titleInput.value = "";
  contentInput.value = "";
  
  del.addEventListener("click", function () {
    note.remove();
  });

  edit.addEventListener("click", function () {
    currentNote = note;
    const currentTitle = currentNote.querySelector("h3");
    const currentParagraph = currentNote.querySelector("p");
    modal.classList.remove("hidden");
    titleInput.value = currentTitle.textContent;
    contentInput.value = currentParagraph.textContent;
  });

  modal.classList.add("hidden");
  }
});
cancelBtn.addEventListener("click", function () {
  titleInput.value = "";
  contentInput.value = "";
  currentNote = null ;
  modal.classList.add("hidden");
});

