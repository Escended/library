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

const book1 = new Book("Harry Potter and the Philosopher's Stone", 'J.K Rowling', '400', 'not read yet');
const book2 = new Book('D', 'E', 'F', 'not read yet');
book1.info();
book2.info();
library.push(book1);
library.push(book2);




const container = document.getElementById("container");

function displayBooks() {   
    container.innerHTML = "";
    library.forEach((book) => {
        let b = document.createElement('div');
        b.innerHTML = book.info();
        container.appendChild(b).className = "book";
    });
    console.table(library);
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
    document.querySelector(".open-button").style.display = "none";

}
function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.querySelector(".open-button").style.display = "block";
    let form = document.getElementById("myForm");
    console.log(typeof form);
    resetForm(form);
}

function resetForm(form) {
    var inputs = form.getElementsByTagName('input');
    for (var i = 0; i<inputs.length; i++) {
        switch (inputs[i].type) {
            // case 'hidden':
            case 'text':
                inputs[i].value = '';
                break;
            case 'radio':
            case 'checkbox':
                inputs[i].checked = false;   
        }
    }
}

function submitForm() {
    
    let formData = new FormData(document.querySelector('form'))

    for(let pair of formData.entries()) {
        console.log(pair);
    }
    console.log(formData['author']);
    let b = createBook(formData);
    console.log(typeof formData.get('book'))
    if (formData.get('book') !== ''){
        addBook(b);
    }
    //closeForm();
}

function createBook(book) {
    return new Book(book.get('book'), book.get('author'), book.get('pages'), book.get('status'));
}

function addBook(newBook) {
    library.push(newBook);
    // let b = document.createElement('div');
    //     b.innerHTML = newBook.info();
    //     container.appendChild(b).className = "book";
    displayBooks();
}

displayBooks();