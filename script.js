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
  const table = document.querySelector("table");
  for (const book of myLibrary) {
    const row = document.createElement("tr");
    for (const key of ["title", "author", "pages"]) {
      let data = document.createElement("td");
      data.textContent = book[key];
      row.appendChild(data);
    }
    const readData = document.createElement("td");
    readData.textContent = book.read ? "READ" : "NOT READ";
    row.appendChild(readData);
    table.appendChild(row);
  }
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 298, false);
addBookToLibrary("test", "test", 1, true);
displayLibrary()