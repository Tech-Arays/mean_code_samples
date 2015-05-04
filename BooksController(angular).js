app.controller("BookController",[

	'$scope',
	'BookService',

	function($scope, BookService){
		$scope.BookService 	= BookService;
		$scope.books 		= [];
		/**
			Loader States
			0 = default 
			1 = started loading 
			2 = data filled
			3 = result empty
			4 = some error
		*/
		$scope.loader 					= 0;
		$scope.newbook					= {};
		$scope.currentbook				= {};
		/*
			updateStatus states
			0: Default
			1: Request Sent
			2: Data Updated
			3: Process Failed
		*/
		$scope.updateStatus 			= 0;
		$scope.exception 				= false;
		/**
		* function to get all books
		*/
		$scope.getBooks = function(){
			$scope.loader 				= 1;
			$scope.BookService.getAllBooks()
				.then(function(result){
					if(result.length)
					{
						$scope.exception = false;
						$scope.loader 	= 2;
						$scope.books 	= result;
					} else{
						$scope.loader 	= 3;
					}
				},function(error){
					$scope.loader 		= 4;
				}
			);
		}
		$scope.getBooks();

		/**
		* function to add new book
		*
		*/
		$scope.addNewbook = function(){
			$scope.BookService.getAllBooks()
				.then(function(result){
					if (result.length < 10) {
						$scope.exception = false;
						$scope.BookService.addNewbook($scope.newbook)
							.then(function(result){
								if(result.code==200){
									$scope.getBooks();
									$scope.newbook.title='';
									$scope.newbook.author='';
								} else{
									$scope.loader 		= 4;
								}
							},function(error){
								$scope.loader 		= 4;
							}
						);
					} else{
						$scope.exception 			= true;
						$scope.exception_header 	= "Book Limits Reached ";
						$scope.exception_message	= "Only 10 books allowed to avoid the mess in following grid so please delete some books and try again!";
					}
				},function(error){
					$scope.loader 		= 4;
				}
			);
		}
		/**
		* deleting book by id
		*
		*/
		$scope.deleteBook = function(book_id){
			$scope.loader = 1;
			$scope.BookService.deleteBook(book_id)
				.then(function(result){
					$scope.loader = 2;
					$scope.getBooks();
				},function(error){
					$scope.loader = 4;
				}
			);
		}

		/**
		* edit book by id
		*
		*/
		$scope.findBookById = function(book_id){
			$scope.BookService.findBookById(book_id)
				.then(function(result){
					$scope.currentbook = result;
				}, function(error){

				}
			);
		}

		/**
		* update book data
		*
		*/
		$scope.updateBookData = function(currentbook, currentbook_id){
			$scope.updateStatus = 1;
			$scope.BookService.updateBookById(currentbook, currentbook_id)
				.then(function(result){
					$scope.updateStatus = 2;
					$scope.getBooks();
				},function(error){
					$scope.updateStatus = 3;
				}
			);
		}
	}
]);
