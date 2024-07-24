// Controls for adding new book to library array
const addBookButton = document.querySelector("#show-book-dialog");
const bookDialog = document.querySelector("#new-book");
const bookForm = document.querySelector("#book-form");

// Show the new book Form
addBookButton.addEventListener("click", () => {
    bookDialog.showModal();
});

// Submit the new Book form, add to the array, print the new book
bookForm.addEventListener("submit", (event) => {
    addBook(
        document.querySelector("#new-book-source").value,
        document.querySelector("#new-book-title").value,
        document.querySelector("#new-book-author").value,
        document.querySelector("#new-book-pages").value,
        document.querySelector('input[name=read]:checked').value === 'true'
    );

    event.preventDefault();
    bookDialog.close();
    printBook(myLibrary.length - 1);
});

// Controls for printing library catalogue
const myLibrary = [];
const libCatTable = document.querySelector("#lib-cat-body");

// Function to add a book row to the table
function addBookToTable(book, index) {
    //New empty table row to add values to
    let newBook = document.createElement("tr");

    //Collect values from array element for table cells
    let image = document.createElement("td");
    image.textContent = book.cover;
    newBook.appendChild(image);

    let title = document.createElement("td");
    title.textContent = book.title;
    newBook.appendChild(title);

    let author = document.createElement("td");
    author.textContent = book.author;
    newBook.appendChild(author);

    let pages = document.createElement("td");
    pages.textContent = book.pages;
    newBook.appendChild(pages);

    let read = document.createElement("td");
    read.textContent = book.read;
    newBook.appendChild(read);

    //Add the toggle read button to the end of the row
    let edit = document.createElement("td");
    let newEditButton = document.createElement("button");
    newEditButton.textContent = "Switch Read Status";
    newEditButton.classList.add('read-button');
    newEditButton.addEventListener('click', () => {
        book.read = !book.read; // Toggle the read status
        read.textContent = book.read; // Update the displayed read status
    });
    edit.appendChild(newEditButton);
    newBook.appendChild(edit);

    //Add the delete button to the end of each row
    let deleteElement = document.createElement('td');
    let newDeleteButton = document.createElement('button');
    newDeleteButton.textContent = 'Delete Book';
    newDeleteButton.classList.add('delete-button');
    
    newDeleteButton.addEventListener('click', () => {
        myLibrary.splice(index, 1);
        libCatTable.removeChild(newBook);
    })
    deleteElement.appendChild(newDeleteButton);
    newBook.appendChild(deleteElement);

    //Add book details to the new table row
    newBook.id = 'book' + index;
    libCatTable.appendChild(newBook);
}

// Print all books in myLibrary array
function printBooks() {
    myLibrary.forEach((book, index) => {
        addBookToTable(book, index);
    });
}

// Print last book in array, called after a new book submitted
function printBook(index) {
    let book = myLibrary[index];
    addBookToTable(book, index);
}

// Define object for storing each book in myLibrary array
function Book(cover, title, author, pages, read) {
    this.cover = cover;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return read ? `${title} by ${author}, ${pages} pages, read.` : `${title} by ${author}, ${pages} pages, not read yet.`;
    };
}

// Add new book to myLibrary array
function addBook(cover, title, author, pages, read) {
    myLibrary.push(new Book(cover, title, author, pages, read));
}

// Demo Data to test printing starting array and then adding new books with form
myLibrary.push(new Book("cover image", "Hobbit", "J.R.R. Tolkien", 400, true));
myLibrary.push(new Book("cover image", "LOTR", "J.R.R. Tolkien", 600, false));

printBooks(); // Initial display of books