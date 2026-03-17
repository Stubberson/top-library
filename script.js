let bookList = document.querySelector('ul')
const newBookButton = document.querySelector('#new-book')
const newBookDialog = document.querySelector('dialog')
const dialogCloseButton = document.querySelector('dialog button')

let myLibrary = []

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("Use the 'new' operator to call the constructor!")
  }

  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.id = crypto.randomUUID()

  this.info = function() {
    return `${title} by ${author}, at page ${pages}, ${read ? 'read' : 'not read'}`
  }
}

function addBookToLibrary(title, author, pages, read) {
  book = new Book(title, author, pages, read)
  myLibrary.push(book)
}

function displayBooks() {
    for (const book of myLibrary) {
        const listItem = document.createElement('li')
        listItem.innerText = book.info()
        bookList.appendChild(listItem)
    }
}

newBookButton.addEventListener('click', () => {
    newBookDialog.showModal()
})

dialogCloseButton.addEventListener('click', () => {
    newBookDialog.close()
})

addBookToLibrary('The Hobbit', 'J.R.R Tolkien', '25', 0)
addBookToLibrary("Tell Me How Long the Train's Been Gone", 'James Baldwin', '75', 0)
displayBooks()