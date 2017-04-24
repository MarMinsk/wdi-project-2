const express        = require('express');
const router         = express.Router();

// Controllers
// const statics        = require('../controller/statics');
const books          = require('../controllers/books');
const registrations  = require('../controllers/registrations');
const sessions       = require('../controllers/sessions'); // *walkthru notes

function secureRoute(req, res, next) {
  if (!req.session.userId) {
    return req.session.regenerate(() => {
      res.redirect('/login');
    });
  }
  return next();
}

router.get('/', (req, res) => res.render('statics/home'));

router.route('/books')
  .get(books.index)
  .post(secureRoute, books.create);

router.route('/books/new')
  .get(secureRoute, books.new); // 'new' route needs to be above the 'show' route

router.route('/books/:id')
  .get(books.show)
  .put(secureRoute, books.update)
  .delete(secureRoute, books.delete);

router.route('/books/:id/edit')
  .get(secureRoute, books.edit);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

module.exports = router;
