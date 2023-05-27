import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getBooks, addBook } from "../Redux/Books/action";
import BookCard from "./BookCard";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Pagination } from "react-bootstrap";

const BooksList = () => {
	const [searchInput, setSearchInput] = useState("");
	const [languageFilter, setLanguageFilter] = useState("");
	const [authorFilter, setAuthorFilter] = useState("");
	const [languages, setLanguages] = useState([]);
	const [authors, setAuthors] = useState([]);

	const [show, setShow] = useState(false);
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [language, setLanguage] = useState("");
	const [year, setYear] = useState("");
	const [pages, setPages] = useState("");
	const [link, setLink] = useState("");

	const navigate = useNavigate();

	// Adding Books
	const handleSubmit = () => {
		let bookData = {
			title,
			author,
			language,
			year,
			pages,
			link,
		};
		dispatch(addBook(bookData)).then(() => dispatch(getBooks()));
		alert("Added!!!");
		console.log(title, author, language, year, pages, link);
	};

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const dispatch = useDispatch();
	const books = useSelector((state) => state.bookReducer.books);

	console.log(books);

	const location = useLocation();
	const [searchParams] = useSearchParams();

	// Function to Search
	const handleSearch = () => {
		const newSearchParams = new URLSearchParams();
		newSearchParams.append("search", searchInput);
		newSearchParams.append("language", languageFilter);
		newSearchParams.append("author", authorFilter);
		navigate(`?${newSearchParams.toString()}`);
	};

	useEffect(() => {
		const order = searchParams.get("order");
		let paramObj = {
			params: {
				category: searchParams.getAll("category"),
				_sort: order && "release_year",
				_order: order,
				search: searchParams.get("search"),
				language: searchParams.get("language"),
				author: searchParams.get("author"),
			},
		};
		dispatch(getBooks(paramObj));
	}, [location.search, searchInput, languageFilter, authorFilter]);

	useEffect(() => {
		// Filter unique languages from books
		const uniqueLanguages = books.data
			? [...new Set(books.data.map((book) => book.language))]
			: [];
		setLanguages(uniqueLanguages);

		// Filter unique authors from books
		const uniqueAuthors = books.data
			? [...new Set(books.data.map((book) => book.author))]
			: [];
		setAuthors(uniqueAuthors);
	}, [books]);

	// Filter books based on search input
	const filteredBooks = books.data
		? books.data.filter((book) => {
				const languageMatch =
					!languageFilter ||
					book.language.toLowerCase() === languageFilter.toLowerCase();
				const authorMatch =
					!authorFilter ||
					book.author.toLowerCase() === authorFilter.toLowerCase();
				const searchMatch =
					!searchInput ||
					book.title.toLowerCase().includes(searchInput.toLowerCase()) ||
					book.author.toLowerCase().includes(searchInput.toLowerCase()) ||
					book.language.toLowerCase().includes(searchInput.toLowerCase()) ||
					book.year.includes(searchInput);

				return languageMatch && authorMatch && searchMatch;
		  })
		: [];

	// Pagination logic
	const [currentPage, setCurrentPage] = useState(1);
	const [booksPerPage] = useState(5); // Number of books to display per page

	const indexOfLastBook = currentPage * booksPerPage;
	const indexOfFirstBook = indexOfLastBook - booksPerPage;
	const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<>
			<div className="d-flex align-items-center justify-content-center flex-column flex-sm-row">
				<div className="d-flex align-items-center justify-content-center">
					<input
						className="form-control mr-sm-2"
						type="text"
						placeholder="Search by title, author, language, or year"
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
					/>
					<button className="btn btn-primary m-2" onClick={handleSearch}>
						Search
					</button>
				</div>
				<div className="d-flex align-items-center justify-content-center">
					<select
						className="form-control m-2"
						value={languageFilter}
						onChange={(e) => setLanguageFilter(e.target.value)}>
						<option value="">All Languages</option>
						{languages.map((language) => (
							<option key={language} value={language}>
								{language}
							</option>
						))}
					</select>
					<select
						className="form-control m-2"
						value={authorFilter}
						onChange={(e) => setAuthorFilter(e.target.value)}>
						<option value="">All Authors</option>
						{authors.map((author) => (
							<option key={author} value={author}>
								{author}
							</option>
						))}
					</select>

					<button className="btn btn-primary m-2" onClick={handleSearch}>
						Apply
					</button>
				</div>
				<div className="btn-sm text-gred m-2">
					<Button variant="primary" onClick={handleShow}>
						Add New Book
					</Button>
				</div>
			</div>

			<div className="model_box">
				<Modal
					show={show}
					onHide={handleClose}
					backdrop="static"
					keyboard={false}>
					<Modal.Header closeButton>
						<Modal.Title>Add Book</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<input
									type="name"
									className="form-control"
									placeholder="Book Name"
									onChange={(e) => setTitle(e.target.value)}
								/>
							</div>
							<div className="form-group mt-3">
								<input
									type="name"
									className="form-control"
									placeholder="Author"
									onChange={(e) => setAuthor(e.target.value)}
								/>
							</div>
							<div className="form-group mt-3">
								<input
									type="name"
									className="form-control"
									placeholder="Language"
									onChange={(e) => setLanguage(e.target.value)}
								/>
							</div>
							<div className="form-group mt-3">
								<input
									type="name"
									className="form-control"
									placeholder="Year"
									onChange={(e) => setYear(e.target.value)}
								/>
							</div>
							<div className="form-group mt-3">
								<input
									type="name"
									className="form-control"
									placeholder="Pages"
									onChange={(e) => setPages(e.target.value)}
								/>
							</div>
							<div className="form-group mt-3">
								<input
									type="name"
									className="form-control"
									placeholder="Link"
									onChange={(e) => setLink(e.target.value)}
								/>
							</div>

							<button type="submit" className="btn btn-success mt-4">
								Add Book
							</button>
						</form>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>

				{/* Model Box Finsihs */}
			</div>

			<div className="book">
				{currentBooks.length > 0 ? (
					currentBooks.map((el) => <BookCard key={el.id} book={el} />)
				) : (
					<p>No books found.</p>
				)}
			</div>

			{/* Pagination */}
			<div className="d-flex justify-content-center mt-4">
				<Pagination>
					{Array(Math.ceil(filteredBooks.length / booksPerPage))
						.fill()
						.map((_, index) => (
							<Pagination.Item
								key={index + 1}
								active={index + 1 === currentPage}
								onClick={() => paginate(index + 1)}>
								{index + 1}
							</Pagination.Item>
						))}
				</Pagination>
			</div>
		</>
	);
};

export default BooksList;
