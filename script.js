const myLiberary = [];
let idCounter = 1;
const container = document.getElementById("container");

const openModal = document.getElementById("openModal"),
  addBookModal = document.getElementById("addBookModal"),
  closeModal = document.getElementById("closeModal"),
  bookForm = document.getElementById("bookForm");

const nameInp = document.getElementById("name"),
  authorInp = document.getElementById("author"),
  pagesInp = document.getElementById("pages"),
  readStatusInp = document.getElementById("readStatus");

myLiberary.push(new Book("Hamlet", "some english guy", 6969, false));
myLiberary.push(new Book("The Avengers", "Marvel", 7, true));
displayBooks();

//modal handeling
openModal.addEventListener("click", () => {
  addBookModal.showModal();
});
closeModal.addEventListener("click", () => {
  addBookModal.close();
  resetModal();
});
addBookModal.addEventListener("click", (e) => {
  const dialogDimensions = addBookModal.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    addBookModal.close();
    resetModal();
  }
});

//submitting the form, no need for prevent-default as we submit and dialog method closes the dialog
bookForm.addEventListener("submit", addBookToLib);

//resets the modal inputs
function resetModal() {
  nameInp.value = "";
  authorInp.value = "";
  pagesInp.value = "";
  readStatusInp.checked = false;
}

//constructor function
function Book(name, author, pages, readStatus) {
  this.id = "id-" + idCounter++ + Math.random().toString(36).substring(2, 5);
  this.name = name;
  this.author = author;
  this.pages = Number(pages);
  this.readStatus = Boolean(readStatus);
}

//adds a book to the array and refreshes the page
function addBookToLib() {
  const name = nameInp.value || "opps: title not available",
    author = authorInp.value || "opps: author not available",
    pages = pagesInp.value,
    readStatus = readStatusInp.checked;
  //push, reset, and display
  myLiberary.push(new Book(name, author, pages, readStatus));
  resetModal();
  displayBooks();
}

//modifies the books grid with the newest version of the array
function displayBooks() {
  container.innerHTML = "";
  myLiberary.forEach((book) => {
    const card = document.createElement("div"),
      nameDisplay = document.createElement("h3"),
      authorDisplay = document.createElement("p"),
      pagesDisplay = document.createElement("p"),
      readBtn = document.createElement("button"),
      dltBtn = document.createElement("button");
    //text contnent changes
    nameDisplay.textContent = book.name;
    authorDisplay.textContent = `by: ${book.author}`;
    pagesDisplay.textContent = `${book.pages} pages`;
    dltBtn.textContent = "Delete";
    //adding classes
    card.classList.add("book-card");
    nameDisplay.classList.add("book-title");
    authorDisplay.classList.add("book-author");
    pagesDisplay.classList.add("book-pages");
    readBtn.classList.add("read-status-btn");
    dltBtn.classList.add("delete-btn");
    readStatusCheck(book, card, readBtn);
    //intializes event listeners
    changeStatus(book, card, readBtn);
    deleteBook(dltBtn, book.id);
    //adding html
    card.appendChild(nameDisplay);
    card.appendChild(authorDisplay);
    card.appendChild(pagesDisplay);
    card.appendChild(readBtn);
    card.appendChild(dltBtn);
    container.appendChild(card);
  });
}

//checks if the book was read or not and modifies appearances of the button and the card
function readStatusCheck(book, card, readBtn) {
  if (book.readStatus) {
    card.classList.remove("card-not-read");
    card.classList.add("card-read");
    readBtn.textContent = "Read";
    readBtn.classList.remove("btn-not-read");
    readBtn.classList.add("btn-read");
  } else {
    card.classList.remove("card-read");
    card.classList.add("card-not-read");
    readBtn.textContent = "Not read yet";
    readBtn.classList.remove("btn-read");
    readBtn.classList.add("btn-not-read");
  }
}

//adds event listener that changes the read status when clicked
function changeStatus(book, card, readBtn) {
  readBtn.addEventListener("click", () => {
    book.readStatus ? (book.readStatus = false) : (book.readStatus = true);
    readStatusCheck(book, card, readBtn);
  });
}

//adds an event listener to the delete button to delete a book id from the array and update the page
function deleteBook(btn, id) {
  btn.addEventListener("click", () => {
    myLiberary.forEach((book, index) => {
      if (book.id === id) {
        myLiberary.splice(index, 1);
        displayBooks();
      }
    });
  });
}
