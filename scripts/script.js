let library = [];

function Book(title, author, pages) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.completed = false;
    // this.info = () => {
    //     return `${title} by ${author}, ${pages} pages ${status}`
    // }
};

const book1 = new Book("Harry Potter and the Philosopher's Stone", 'J.K Rowling', '400');
library.push(book1);




const container = document.getElementById("container");

function generateTableHead(table, data) {
    let tHead = table.createTHead();
    let row = tHead.insertRow();

    for (let key of data) {
        if (key === "info"){
            continue;
        }
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, data) {
    let objCount = 0;
    
    for (let element of data) {
        console.log(objCount);
        let row = table.insertRow();
        // Ignore running the info column.
        let i = 0;
         
        for (key in element) {
            //console.log(key);
            //console.log(i);
            if (i === 4) {
                i = 0;
                continue;
            }
            let cell = row.insertCell();
            if (i === 3) {
                //console.log(key);
                let checkbox = document.createElement("INPUT");
                checkbox.setAttribute("type", "checkbox");
                checkbox.classList.add("readCheckbox");
                cell.appendChild(checkbox);
                checkbox.addEventListener('change', () => {
                    //console.log(checkbox);
                    if (!library[key]){
                        library[key] = true;
                    } else {
                        library[key] = false;
                    }
                    //console.log(library[key])
                })
            } else {
                let text = document.createTextNode(element[key]);
                cell.appendChild(text);
                if(key === "pages"){
                    console.log(key);
                    cell.classList.add("pages");
                }
            }
            i++;
        }
        // Delete button for each row
        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "X";
        deleteButton.classList.add("deleteButton");
        deleteButton.setAttribute('data-index', objCount);
        row.appendChild(deleteButton);
        deleteButton.addEventListener('click', (e) =>{
            console.log(e);
            // console.log(deleteButton.dataset.index);
            console.table(library);
            library.splice(deleteButton.dataset.index, 1);
            console.table(library);
            displayBooks();
        });
        objCount++;
    }
}

// let checkbox = document.querySelector(".readCheckbox");
// console.log(checkbox);


let table = document.querySelector("table");
let data = Object.keys(library[0]);
generateTableHead(table, data);
// generateTable(table, library);


function displayBooks() {   
    //container.innerHTML = "";
    table.innerHTML = "";
    // library.forEach((book) => {
    //     let b = document.createElement('div');
    //     b.innerHTML = book.info();
    //     container.appendChild(b).className = "book";
    // });
    generateTable(table, library);
    generateTableHead(table, data);
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
    closeForm();
}

function createBook(book) {
    return new Book(book.get('book'), book.get('author'), book.get('pages'));
}

function addBook(newBook) {
    library.push(newBook);
    displayBooks();
}

displayBooks();