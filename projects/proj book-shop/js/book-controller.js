'use strict'

var gQueryStringParams

function onInit() {
  gDisplay.sort = 'alphabet'
  gDisplay.filter = ''

  renderFilterByQueryStringParams()
  renderSort()
  renderBooks()
  renderBrowseButtons()
  renderBook()
}

function renderBooks() {
  var mode = getDisplayMode()

  if (mode === 'table') {
    renderTable()
    return
  }

  if (mode === 'cards') {
    renderCards()
  }
}

function renderBook() {
  var book = gCurrBook
  var elCard = document.querySelector('.card')
  if (book) {
    renderOverlay()
    elCard.classList.add('open')
    var elBook = document.querySelector('.book')
    elBook.innerHTML = `<div class="img-container">
    <img class="read-img" src='${book.imgUrl}'/>
    </div>
    <div class="rating">Rate: 
      <button onclick="onChangeRating('${book.id}', -1)">-</button><span>${book.rating}</span><button onclick="onChangeRating('${book.id}', 1)">+</button></div>
      <ul class="book-info"><li class= "title">${book.name}</li><li class="price"><span>Price: </span>$${book.price}</li></ul>
  `
  }
}

function onRemoveBook(id) {
  removeBook(id)
  renderBooks()
}

function onAddBook() {
  var name = prompt('Name of the book:')
  var price = prompt('Price:')
  addBook(name, price)
  renderBooks()
}

function onUpdateBook(id) {
  var newPrice = prompt('new price:')
  updateBook(id, newPrice)
  renderBooks()
}

function onCloseRead() {
  var bookCard = document.querySelector('.card')
  var elOverlay = document.querySelector('.overlay')
  bookCard.classList.remove('open')
  elOverlay.hidden = true
  closeRead()
  renderBooks()
}

function onChangeRating(id, increment) {
  var rating = changeRating(id, increment)
  var ratingHTML = document.querySelector('.rating span')
  ratingHTML.innerText = rating
}

function onSetFilter(event) {
  event.preventDefault()
  var search = document.querySelector('.book-search').value.toLowerCase()
  setFilter(search)
  renderBooks()
  setUrl()
}

function onSetSort(sort) {
  setSort(sort)
  renderBooks()
}

function onRead(id) {
  updateCurrBook(id)
  var elCard = document.querySelector('.card')
  elCard.classList.add('open')
  var elOverlay = document.querySelector('.overlay')
  elOverlay.hidden = false
  renderBook()
}

function setUrl() {
  const queryStringParams = gDisplay.filter ? `?q=${gDisplay.filter}` : ''
  const newUrl =
    window.location.protocol +
    '//' +
    window.location.host +
    window.location.pathname +
    queryStringParams
  window.history.pushState({ path: newUrl }, '', newUrl)
}

function renderFilterByQueryStringParams() {
  const queryStringParams = new URLSearchParams(window.location.search)
  const filterBy = queryStringParams.get('q') || ''
  document.querySelector('.book-search').value = filterBy

  if (!filterBy) return

  setFilter(filterBy)
}

function onNext() {
  var currBookIdx = gBooks.indexOf(gCurrBook)
  currBookIdx++

  updateCurrBook(gBooks[currBookIdx].id)
  renderBrowseButtons()
  renderBook()
}

function onPrev() {
  var currBookIdx = gBooks.indexOf(gCurrBook)
  currBookIdx--

  updateCurrBook(gBooks[currBookIdx].id)
  renderBrowseButtons()
  renderBook()
}

function onCardMode(elButton) {
  var elTableMode = document.querySelector('.display-mode-grid')
  elButton.classList.add('on')
  elTableMode.classList.remove('on')
  updateDisplayMode('cards')
  renderCards()
}

function renderCards() {
  var books = getBooksForDisplay()
  var elContainer = document.querySelector('.books-container')

  var strHTML = `<div class= "cards-display">`

  var booksHTML = books.map(
    (book) =>
      `<div class='card-display' onclick="onRead('${book.id}')">
    <div class="img-wrapper">
      <img class="card-image" src='${book.imgUrl}' />
    </div>
    <ul class="info"><li>${book.name}</li><li>${renderStars(
        book.rating
      )}</li><li>$${book.price}</li></ul>
  </div>`
  )

  strHTML += booksHTML.join('') + '</div>'
  elContainer.innerHTML = strHTML
}

function onTableMode(elButton) {
  var elCardMode = document.querySelector('.display-mode-cards')
  elButton.classList.add('on')
  elCardMode.classList.remove('on')
  updateDisplayMode('table')
  renderTable()
}

function renderTable() {
  var books = getBooksForDisplay()
  var elContainer = document.querySelector('.books-container')
  var strHTML = `<table class="table-display"><tbody><tr>
    <th class="id-col">ID</th>
    <th>Title</th>
    <th class="price-col">Price</th>
    <th>Actions</th>
  </tr>`

  var booksHTML = books.map(
    (book) =>
      `<tr>
      <td class="id-col">${book.id}</td><td>${book.name}</td>
      <td class="price-col">$${book.price}</td>
      <td class="actions-col">
        <button class="action" onclick="onRead('${book.id}')">Read</button>
        <button class="action" onclick="onUpdateBook('${book.id}')">Update</button>
        <button class="action" onclick="onRemoveBook('${book.id}')">Delete</button></td>
      </tr>`
  )

  strHTML += booksHTML.join('') + '</tbody></table>'

  elContainer.innerHTML = strHTML
}

function renderStars(rating) {
  var strHTML = ''

  for (var i = 0; i < rating; i++) {
    strHTML += '⭐'
  }

  return strHTML
}

function renderOverlay() {
  var overlay = document.querySelector('.overlay')
  overlay.hidden = false
}

function renderSort() {
  var elSelection = document.querySelector('select')
  getSort()
  elSelection.value = gDisplay.sort
}

function renderBrowseButtons() {
  var currBookIdx = gBooks.indexOf(gCurrBook)
  console.log(currBookIdx)
  var elNextButton = document.querySelector('.next')
  var elPrevButton = document.querySelector('.prev')

  elNextButton.disabled = currBookIdx < gBooks.length - 1 ? false : true

  elPrevButton.disabled = currBookIdx >= 1 ? false : true
}
