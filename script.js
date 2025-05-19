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

function displayLibrary() {
  tableBody.innerHTML = "";
  for (const book of myLibrary) {
    const row = document.createElement("tr");

    for (const key of ["title", "author"]) {
      const data = document.createElement("td");
      data.textContent = book[key];
      row.appendChild(data);
    }

    const pagesData = document.createElement("td");
    pagesData.textContent = Number.isInteger(book.pages) ? book.pages : "-";
    row.appendChild(pagesData);

    const readData = document.createElement("td");
    readData.textContent = book.read ? "READ" : "NOT READ";
    row.appendChild(readData);

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
  }
});

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 298, false);
addBookToLibrary("test", "test", 1, true);
displayLibrary()