'use-strict'

const STORAGE_KEY = 'books'
var gBooks = loadFromStorage('books')
var gCurrBook = loadFromStorage('currBook')

var gDisplay = { sort: loadFromStorage('sortBy'), filter: '' }

_createBooks()

function _createBooks() {
  var books = loadFromStorage(STORAGE_KEY)

  if (!books || !books.length) {
    var books = [
      {
        id: 'b101',
        name: 'Harry Potter',
        price: 20,
        imgUrl:
          'http://prodimage.images-bn.com/pimages/9780545139700_p0_v5_s1200x630.jpg',
        rating: 4,
      },
      {
        id: 'b102',
        name: 'The Hunger Games',
        price: 15,
        imgUrl:
          'https://cdn.shoplightspeed.com/shops/611345/files/5304791/the-hunger-games-03-mockingjay.jpg',
        rating: 3,
      },
      {
        id: 'b103',
        name: 'Alice in Wonderland',
        price: 10,
        imgUrl:
          'https://d28hgpri8am2if.cloudfront.net/book_images/cvr9780689847431_9780689847431_hr.jpg',
        rating: 5,
      },
    ]
  }

  gBooks = books
  _saveBooksToStorage()
}

function _saveBooksToStorage() {
  saveToStorage('books', gBooks)
}

function removeBook(id) {
  var bookIdx = gBooks.findIndex((book) => book.id === id)
  gBooks.splice(bookIdx, 1)
  _saveBooksToStorage()
}

function addBook(name, price) {
  var book = {
    id: makeId(),
    name: name,
    price: price,
    imgUrl:
      'https://www.lse.ac.uk/International-History/Images/Books/NoBookCover.png',
    rating: 0,
  }

  gBooks.push(book)
  _saveBooksToStorage()
}

function updateBook(id, price) {
  var bookIdx = gBooks.findIndex((book) => book.id === id)
  gBooks[bookIdx].price = price
  _saveBooksToStorage()
}

function getBook(id) {
  var bookIdx = gBooks.findIndex((book) => book.id === id)
  return gBooks[bookIdx]
}

function changeRating(id, increment) {
  var bookIdx = gBooks.findIndex((book) => book.id === id)
  var currRating = gBooks[bookIdx].rating
  var newRating = (gBooks[bookIdx].rating += increment)
  if (newRating < 0 || newRating > 5) gBooks[bookIdx].rating = currRating
  else gBooks[bookIdx].rating = newRating

  _saveBooksToStorage()
  return gBooks[bookIdx].rating
}

function setFilter(txt) {
  gDisplay.filter = txt
}

function setSort(sort) {
  gDisplay.sort = sort
  saveToStorage('sortBy', sort)
}

function getBooksForDisplay() {
  if (gDisplay.sort === 'alphabet') {
    gBooks.sort((book1, book2) => {
      if (book1.name.toLowerCase() < book2.name.toLowerCase()) return -1
    })
  } else if (gDisplay.sort === 'min-price') {
    gBooks.sort((book1, book2) => {
      if (book1.price < book2.price) return -1
    })
  } else if (gDisplay.sort === 'max-rate') {
    gBooks.sort((book1, book2) => {
      if (book1.rating > book2.rating) return -1
    })
  }

  _saveBooksToStorage()

  var books = gBooks

  if (gDisplay.filter) {
    books = filterByText()
  }

  return books
}

function filterByText() {
  var books = gBooks.filter((book) =>
    book.name.toLowerCase().includes(gDisplay.filter)
  )
  return books
}

function updateCurrBook(id) {
  gCurrBook = getBook(id)
  saveToStorage('currBook', gCurrBook)
}

function closeRead() {
  gCurrBook = null
  saveToStorage('currBook', gCurrBook)
}

function updateDisplayMode(mode) {
  saveToStorage('displayMode', mode)
}

function getDisplayMode() {
  var mode = loadFromStorage('displayMode')

  if (!mode) mode = 'table'

  return mode
}

function getSort() {
  var sort = loadFromStorage('sortBy')
  if (!sort) {
    gDisplay.sort = 'alphabet'
    saveToStorage('sortBy', gDisplay.sort)
  } else gDisplay.sort = loadFromStorage('sortBy')
}
