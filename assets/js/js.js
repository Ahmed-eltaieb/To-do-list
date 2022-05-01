
var booksList = document.querySelector('.app__list');
var container = document.querySelector('.app__content');
var searchInput = document.querySelector('.app__search input');
var bookInput = document.querySelector('.app__add input');



var books;


if (localStorage.data) {
  books = JSON.parse(localStorage.data);
} else {
  books = [
    "ahmedEltaieb",
    "front End devoloper"];

  localStorage.data = JSON.stringify(books);
}


function renderBooks(bookss) {
  booksList.innerHTML = "";
  bookss.forEach((book, index) => {
    booksList.innerHTML += ` <li class="app__book">
    <span>${book}</span>
    <button class="app__delete" onclick="deleteBook(${index})"><img src="./assets/imgs/delete.svg" alt="deleteImage"></button>
</li>`;
  });

  
}

renderBooks(books);


function addBook(e) {
  e.preventDefault();

  if (!bookInput.value.trim()) {
    return;
  }

  books.push(bookInput.value);
  localStorage.data = JSON.stringify(books);
  books = JSON.parse(localStorage.data);
  renderBooks(books);

 
  bookInput.value = "";
}


function deleteBook(index) {
  books.splice(index, 1);
  localStorage.data = JSON.stringify(books);
  books = JSON.parse(localStorage.data);
  renderBooks(books);
}


function searchBooks(searchText) {
  value = searchText.value;

  var lowerChar = value.toLowerCase();
  var matchedBooks = [];

  matchedBooks = books.filter((book) => {
    return book.toLowerCase().includes(lowerChar);
  });

  matchedBooks = matchedBooks.map((book) => {
    return book
      .split("")
      .map((char) => {
        return lowerChar.includes(char.toLowerCase())
          ? `<mark>${char}</mark>`
          : char;
      })
      .join("");
  });

  renderBooks(matchedBooks);
}



