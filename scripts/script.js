let library = [];

function Book(title, author, pages, status) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.status = status,
    this.info = () => {
        return `${title} by ${author}, ${pages} pages ${status}`
    }
};

const book1 = new Book('Ace', 'Bee', 'Cees', 'not read yet');
const book2 = new Book('D', 'E', 'F', 'not read yet');
book1.info();
book2.info();
library.push(book1);
library.push(book2);

console.table(library);

const container = document.getElementById("container");

function displayBooks() {    
    library.forEach((book) => {
        let b = document.createElement('div');
        b.innerHTML = book.info();
        container.appendChild(b).className = "book";
    });
}

function addBookButton() {
    
}

displayBooks();