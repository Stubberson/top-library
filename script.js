const bookList = document.querySelector('ul')
const showDialogButton = document.querySelector('#new-book')
const newBookDialog = document.querySelector('dialog')
const dialogCloseButton = document.querySelector('dialog button')
const dialogForm = document.querySelector('form')
const bookPage = document.getElementById('page')
const bookFinished = document.getElementById('finished')

class Book {
  static library = []

  constructor(title, author, pages, finished) {
    this.title = title
    this.author = author
    this.pages = pages
    this.finished = finished
    this.id = crypto.randomUUID()

    Book.library.push(this)
  }

  get info() {
    return `${this.title} by ${this.author}, pages ${this.pages}, ${this.finished ? 'finished' : 'unfinished'}`
  }

  displayBook() {
    const listItem = document.createElement('li')
    const finishedCheckbox = document.createElement('input')
    const removeButton = document.createElement('button')
    
    listItem.innerText = this.info

    finishedCheckbox.type = 'checkbox'  // Finished checkbox for the created book
    finishedCheckbox.className = 'checkbox'
    this.finished ? finishedCheckbox.checked = true : finishedCheckbox.checked = false

    removeButton.className = 'remove'

    bookList.appendChild(listItem)
    listItem.appendChild(finishedCheckbox)
    listItem.appendChild(removeButton)

    finishedCheckbox.addEventListener('click', () => {
      finishedCheckbox.checked ? this.finished = true : this.finished = false
      let updatedText = document.createTextNode(this.info)
      listItem.replaceChild(updatedText, listItem.firstChild)  // Update only the text from the listItem
    })

    removeButton.addEventListener('click', () => {
      listItem.remove()  // Remove from DOM
      Book.library.splice(Book.library.indexOf(this), 1)  // Remove from memory
    })
  }
}

// BOOK DIALOG
showDialogButton.addEventListener('click', () => {
  newBookDialog.showModal()
})

dialogCloseButton.addEventListener('click', () => {
  newBookDialog.close()
})

// VALIDATION
dialogForm.addEventListener('submit', (event) => {
  const bookTitle = document.getElementById('title')
  const bookAuthor = document.getElementById('author')
  const error = document.querySelector('.error')
  error.textContent = ''

  if (!Book.library.some(book => book.title === bookTitle.value && book.author === bookAuthor.value)) {
    const newBook = new Book(bookTitle.value, bookAuthor.value, bookPage.value, bookFinished.checked)
    newBook.displayBook()
    dialogForm.reset()  // The <dialog> element doesn't reset the form automatically when submitted
  } else {
    event.preventDefault()
    error.textContent = 'Book already in library.'
  }
})