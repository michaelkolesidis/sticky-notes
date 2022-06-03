"use strict";

const YELLOW = `rgb(255, 255, 204)`;
const GREEN = `rgb(204,255,204)`;
const PURPLE = `rgb(204,204,255)`;
const PINK = `rgb(255,204,204)`;

const input = <HTMLInputElement>document.getElementById("input");

const addButton = document.getElementById("add-button");
const notesBoard = document.getElementById("notes-board");
let removeButtons;

const stickyNotes = [];

const createNote = function () {
  const text = input.value;

  const note = {
    text: text,
    checked: false,
    id: Date.now(),
    color: "",
    rotation: "",
  };

  let num = Math.floor(Math.random() * 4);
  switch (num) {
    case 0:
      note.color = YELLOW;
      break;
    case 1:
      note.color = PURPLE;
      break;
    case 2:
      note.color = GREEN;
      break;
    case 3:
      note.color = PINK;
      break;
  }

  let rotation = Math.floor(Math.random() * 13) - 6;
  note.rotation = `${rotation}`;

  stickyNotes.push(note);
};

const render = function () {
  for (let i = 0; i < stickyNotes.length; i++) {
    const element = document.createElement("li");
    element.setAttribute("id", stickyNotes[i].id);
    element.classList.add("note");
    element.style.backgroundColor = stickyNotes[i].color;
    element.style.transform = `rotate(${stickyNotes[i].rotation}deg)`;

    const removeButton = document.createElement("button");
    removeButton.textContent = "x";
    removeButton.classList.add("remove-button");
    removeButton.setAttribute("id", stickyNotes[i].id);
    removeButton.style.backgroundColor = `rgba(0, 0, 0, 0)`;
    element.appendChild(removeButton);

    const elementText = document.createElement("p");
    elementText.innerText = stickyNotes[i].text;
    elementText.setAttribute("contenteditable", "true");
    element.appendChild(elementText);

    notesBoard.appendChild(element);

    removeButtons = document.querySelectorAll(".remove-button");
    removeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        let noteId = event.target.id;
        for (let i = 0; i < stickyNotes.length; i++) {
          if (stickyNotes[i].id == noteId) {
            stickyNotes.splice(i, 1);
            notesBoard.innerHTML = ``;
            render();
          }
        }
      });
    });
  }
};

addButton.addEventListener("click", () => {
  createNote();
  notesBoard.innerHTML = ``;
  render();
  input.value = ``;
});
