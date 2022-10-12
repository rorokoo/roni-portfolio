$(document).ready(() => {
  renderPortfolio()
  renderProjectModals()
  renderContactForm()
})

function renderPortfolio() {
  var portfolio = getPortfolio()

  var strHTML = portfolio.map(
    (proj) =>
      `<div class="col-md-4 col-sm-6 portfolio-item">
    <a
      class="portfolio-link"
      data-toggle="modal"
      href="#${proj.id}"
    >
      <div class="portfolio-hover">
        <div class="portfolio-hover-content">
          <i class="fa fa-plus fa-3x"></i>
        </div>
      </div>
      <img
        class="img-fluid"
        src="img/portfolio/${proj.id}-thumbnail.jpg"
        alt=""
      />
    </a>
    <div class="portfolio-caption">
      <h4>${proj.name}</h4>
      <p class="text-muted">Web Design</p>
    </div>
  </div>`
  )

  $('.portfolio').html(strHTML)
}

function renderProjectModals() {
  var portfolio = getPortfolio()

  var strHTML = portfolio.map(
    (proj) =>
      `<div
    class="portfolio-modal modal fade"
    id="${proj.id}"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="close-modal" data-dismiss="modal">
          <div class="lr">
            <div class="rl"></div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto">
              <div class="modal-body">
                <!-- Project Details Go Here -->
                <h2>${proj.name}</h2>
                <p class="item-intro text-muted">
                  Lorem ipsum dolor sit amet consectetur.
                </p>
                <img
                  class="img-fluid d-block mx-auto"
                  src="img/portfolio/${proj.id}.jpg"
                  alt=""
                />
                <p>
                  ${proj.desc}
                </p>
                <ul class="list-inline">
                  <li>Date: ${new Date(proj.publishedAt)}</li>
                  <li>Client: Threads</li>
                  <li>Category: Illustration</li>
                </ul>
                <button
                  class="btn btn-primary"
                  data-dismiss="modal"
                  type="button"
                >
                  <i class="fa fa-times"></i>
                  Close Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`
  )

  $('.proj-modal').html(strHTML)
}

function renderContactForm() {
  var strHTML = `<form>
    <div class="mb-3">
      <label for="inputEmail" class="form-label">Your Email</label>
      <input type="email" name="email" class="form-control" id="InputEmail" aria-describedby="emailHelp">
    </div>
    <div class="mb-3">
      <label for="inputSubject" class="form-label">Subject</label>
      <input type="text" name="subject" class="form-control" id="inputSubject">
    </div>
    <div class="mb-3">
    <label for="inputMessage" class="form-label" >Message</label>
    <textarea class="form-control" name="message" id="inputMessage" rows="3"></textarea>
    </div>
    <button class="submit-btn" type="submit" class="btn btn-primary">Submit</button>
  </form>`

  $('.form-container').html(strHTML)

  console.log($('form').on('submit', (event) => openGmail(event)))
}

function openGmail(event) {
  event.preventDefault()
  var email = $('[name="email"]').val()
  var subject = $('[name="subject"]').val()
  var message = $('[name="message"]').val()

  var body = `${email}, ${message}`
  console.log(body)
  var emailLink = `https://mail.google.com/mail/?view=cm&fs=1&to="rorokoo@gmail.name"&su=${subject}&body=${body}`
  window.open(emailLink)
}
