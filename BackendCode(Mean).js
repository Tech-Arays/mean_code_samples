var book = require('./models/book');
module.exports = function(app) {
    /*Route Section*/
    app.get('/get', function ( req, res ){
      book.
        find().
        sort( '-updated_at' ).
        exec( function ( err, books ){
            res.json(books);
        });
    });
    
    app.post( '/create', function ( req, res ){
      new book({
        title    : req.body.title,
        author    : req.body.author,
        updated_at : Date.now()
      }).save( function( err, book, count ){
            if (err) res.send(err);

            res.json({ code:'200',message: 'Success' });
      });
    });
    
    app.get( '/destroy/:id', function ( req, res ){
      book.findById( req.params.id, function ( err, book ){
        book.remove( function ( err, book ){
            if (err) res.send(err);

            res.json({ code:'200',message: 'Success' });
       });
      });
    });
};