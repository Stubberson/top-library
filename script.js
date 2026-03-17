let bookList = document.querySelector('ul')

const showDialogButton = document.querySelector('#new-book')

const newBookDialog = document.querySelector('dialog')
const dialogCloseButton = document.querySelector('dialog button')
const dialogForm = document.querySelector('form')
const dialogSubmitButton = document.querySelector('form button')
const bookTitle = document.querySelector('#title')
const bookAuthor = document.querySelector('#author')
const bookPage = document.querySelector('#page')
const bookFinished = document.querySelector('#finished')

let myLibrary = []

function Book(title, author, pages, finished) {
  if (!new.target) {
    throw Error("Use the 'new' operator to call the constructor!")
  }

  this.title = title
  this.author = author
  this.pages = pages
  this.finished = finished
  this.id = crypto.randomUUID()

  this.info = function() {
    return `${title} by ${author}, at page ${pages}, ${finished ? 'finished' : 'not finished'}`
  }
}

function addBookToLibrary(title, author, pages, finished) {
  book = new Book(title, author, pages, finished)
  myLibrary.push(book)
  return book
}

function displayNewBook(book) {
  const listItem = document.createElement('li')
  listItem.innerText = book.info()

  const removeItem = document.createElement('button')
  removeItem.innerText = 'Remove'

  bookList.appendChild(listItem)
  listItem.appendChild(removeItem)

  removeItem.addEventListener('click', () => {
    listItem.remove()  // Remove from DOM
    // Remove from memory
    if (myLibrary.some(savedBook => savedBook.title === book.title)) {
      myLibrary.splice(myLibrary.indexOf(book), 1)
    }
  })
}

// ADD BOOK
showDialogButton.addEventListener('click', () => {
  newBookDialog.showModal()
})

dialogCloseButton.addEventListener('click', () => {
  newBookDialog.close()
})

dialogSubmitButton.addEventListener('click', () => {
  if (!myLibrary.some(book => book.title === bookTitle.value)) {  // Don't allow to add the same book multiple times
    let newBook = addBookToLibrary(bookTitle.value, bookAuthor.value, bookPage.value, bookFinished.checked)
    displayNewBook(newBook)
  }
  
  dialogForm.reset()  // The <dialog> element doesn't reset the form automatically when submitted
})