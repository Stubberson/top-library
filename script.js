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
    if (this.finished) {
      return `${this.title} by ${this.author}, finished`
    } else {
      return `${this.title} by ${this.author}, at page ${this.pages}, unfinished`
    }
  }
}

function addBookToLibrary(title, author, pages, finished) {
  book = new Book(title, author, pages, finished)
  myLibrary.push(book)
  return book
}

// DISPLAY LIBRARY ITEM W/ BUTTONS
function displayNewBook(book) {
  const listItem = document.createElement('li')
  listItem.innerText = book.info()

  const finishedCheckbox = document.createElement('input')
  finishedCheckbox.type = 'checkbox'
  finishedCheckbox.className = 'checkbox'
  book.finished ? finishedCheckbox.checked = true : finishedCheckbox.checked = false

  const removeButton = document.createElement('button')
  removeButton.innerText = 'Remove'

  bookList.appendChild(listItem)
  listItem.appendChild(finishedCheckbox)
  listItem.appendChild(removeButton)

  finishedCheckbox.addEventListener('click', () => {
    finishedCheckbox.checked ? book.finished = true : book.finished = false
    let updatedText = document.createTextNode(book.info())
    listItem.replaceChild(updatedText, listItem.firstChild)  // Update only the text from the listItem
  })

  removeButton.addEventListener('click', () => {
    listItem.remove()  // Remove from DOM
    myLibrary.splice(myLibrary.indexOf(book), 1)  // Remove from memory
  })
}

// ADD BOOK DIALOG
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