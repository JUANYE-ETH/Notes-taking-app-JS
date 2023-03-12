const form = document.querySelector("form");
const titleInput = document.querySelector("#title");
const noteInput = document.querySelector("#note");
const notesList = document.querySelector("#notes");

// Load saved notes from local storage when the page is loaded
window.addEventListener("load", () => {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.forEach((note) => {
    addNoteToList(note);
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the form from submitting

  // Get the values of the title and note inputs
  const title = titleInput.value.trim();
  const note = noteInput.value.trim();

  // If either input is empty, do nothing
  if (!title || !note) {
    return;
  }

  // Create a new note object with a unique ID and the title and note values
  const id = Date.now().toString();
  const newNote = { id, title, note };

  // Add the new note to the array of notes and save to local storage
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.push(newNote);
  localStorage.setItem("notes", JSON.stringify(notes));

  // Clear the form inputs
  titleInput.value = "";
  noteInput.value = "";

  // Add the new note to the list of notes
  addNoteToList(newNote);
});

function addNoteToList(note) {
  const li = document.createElement("li");
  li.innerHTML = `
    <h2>${note.title}</h2>
    <p>${note.note}</p>
    <button class="delete-button" data-id="${note.id}">Delete</button>
  `;
  notesList.appendChild(li);

  // Add a click event listener to the delete button to remove the note from the list and local storage
  const deleteButton = li.querySelector(".delete-button");
  deleteButton.addEventListener("click", (event) => {
    const id = event.target.dataset.id;
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes = notes.filter((note) => note.id !== id);
    localStorage.setItem("notes", JSON.stringify(notes));
    li.remove();
  });
}
