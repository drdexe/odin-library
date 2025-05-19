const newBookBtn = document.querySelector("#newBookBtn");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");
const confirmBtn = document.querySelector("#confirmBtn");
const tableBody = document.querySelector("tbody");

const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

function removeBookFromLibrary(id) {
  myLibrary.splice(myLibrary.findIndex(book => book.id === id), 1);
}

function toggleBookReadStatus(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  myLibrary[index].read = !myLibrary[index].read;
}

function displayLibrary() {
  tableBody.innerHTML = "";
  for (const book of myLibrary) {
    const row = document.createElement("tr");
    row.setAttribute("data-id", book.id);

    for (const key of ["title", "author"]) {
      const cell = document.createElement("td");
      cell.textContent = book[key];
      row.appendChild(cell);
    }

    const pagesCell = document.createElement("td");
    pagesCell.textContent = book.pages && !isNaN(book.pages) ? book.pages : "-";
    row.appendChild(pagesCell);

    const readCell = document.createElement("td");
    const readBtn = document.createElement("button");
    if (book.read) {
      readBtn.textContent = "READ";
      readBtn.style.backgroundColor = "greenyellow";
    } else {
      readBtn.textContent = "NOT READ";
      readBtn.style.backgroundColor = "tomato";
    }
    readBtn.addEventListener("click", () => {
      toggleBookReadStatus(readCell.parentNode.getAttribute("data-id"));
      displayLibrary();
    });
    readCell.appendChild(readBtn);
    row.appendChild(readCell);

    const deleteCell = document.createElement("td");
    const deleteIcon = document.createElement("svg");
    deleteIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" /></svg>`;
    deleteIcon.addEventListener("click", () => {
      removeBookFromLibrary(deleteCell.parentNode.getAttribute("data-id"));
      displayLibrary();
    });
    deleteCell.appendChild(deleteIcon);
    row.appendChild(deleteCell);

    tableBody.appendChild(row);
  }
}

newBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (form.reportValidity()) {
    dialog.close();
    addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
    displayLibrary();
    form.reset();
  }
});

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 298, false);
displayLibrary()