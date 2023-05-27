import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editBook, getBooks } from "../Redux/Books/action";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Input } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../Styles/BookCard.css";

const BookCard = ({ book }) => {
	const [show, setShow] = useState(false);
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [language, setLanguage] = useState("");
	const [year, setYear] = useState("");
	const [pages, setPages] = useState("");
	const [link, setLink] = useState("");

	const id = book.id;

	const books = useSelector((store) => store.bookReducer.books);
	const dispatch = useDispatch();

	const navigate = useNavigate();

	useEffect(() => {
		const bookData = books.data.find((el) => el.id === +id);
		if (bookData) {
			setTitle(bookData.title);
			setAuthor(bookData.author);
			setLanguage(bookData.language);
			setYear(bookData.year);
			setPages(bookData.pages);
			setLink(bookData.link);
		}
	}, []);

	// Function to Update the Book
	const handleEdit = () => {
		let newData = {
			title,
			author,
			language,
			year,
			pages,
			link,
		};
		dispatch(editBook(id, newData)).then(() => dispatch(getBooks()));
		alert("updated!!!");
		navigate("/");
		console.log(title, author, language, year, pages, link);
	};

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			{/* For big Screen */}
			<div className="container d-none d-md-block">
				<div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
					<div className="row">
						<div className="table-responsive">
							<table className="table table-hover table-bordered">
								<thead>
									<tr>
										<th>#</th>
										<th>Book Name</th>
										<th>Author</th>
										<th>Language</th>
										<th>Year</th>
										<th>Link</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>{book.id}</td>
										<td>{book.title}</td>
										<td>{book.author}</td>
										<td>{book.language}</td>
										<td>{book.year}</td>
										<td>{book.pages}</td>
										<td>
											<a
												href={book.link}
												className="link"
												target="_blank"
												rel="noopener noreferrer">
												{book.link}
											</a>
										</td>
										<td>
											<a
												href="#"
												className="edit"
												title="Edit"
												onClick={handleShow}
												data-toggle="tooltip">
												<i className="material-icons">&#xE254;</i>
											</a>
										</td>
									</tr>
								</tbody>
							</table>
						</div>

						<div className="model_box">
							<Modal
								show={show}
								onHide={handleClose}
								backdrop="static"
								keyboard={false}>
								<Modal.Header closeButton>
									<Modal.Title>Update Book</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<form onSubmit={handleEdit}>
										<p>Id :</p>
										<div className="form-group mt-3">
											<input
												type="number"
												className="form-control"
												placeholder={book.id}
											/>
										</div>
										<div className="form-group mt-3">
											<p>Book Name :</p>
											<input
												type="name"
												value={title}
												className="form-control"
												placeholder={book.title}
												onChange={(e) => setTitle(e.target.value)}
											/>
										</div>
										<div className="form-group mt-3">
											<p>Author :</p>
											<input
												type="name"
												value={author}
												className="form-control"
												placeholder={book.author}
												onChange={(e) => setAuthor(e.target.value)}
											/>
										</div>
										<div className="form-group mt-3">
											<p>Language :</p>

											<input
												type="name"
												value={language}
												placeholder={book.language}
												className="form-control"
												onChange={(e) => setLanguage(e.target.value)}
											/>
										</div>
										<div className="form-group mt-3">
											<p>Year :</p>
											<input
												type="number"
												className="form-control"
												value={year}
												placeholder={book.year}
												onChange={(e) => setYear(e.target.value)}
											/>
										</div>
										<div className="form-group mt-3">
											<p>Pages :</p>
											<input
												type="number"
												value={pages}
												placeholder={book.pages}
												className="form-control"
												onChange={(e) => setPages(e.target.value)}
											/>
										</div>
										<div className="form-group mt-3">
											<p>Link :</p>
											<input
												type="name"
												value={link}
												placeholder={book.link}
												className="form-control"
												onChange={(e) => setLink(e.target.value)}
											/>
										</div>

										<button type="submit" className="btn btn-success mt-4">
											Update
										</button>
									</form>
								</Modal.Body>

								<Modal.Footer>
									<Button variant="secondary" onClick={handleClose}>
										Close
									</Button>
								</Modal.Footer>
							</Modal>
						</div>
					</div>
				</div>
			</div>

			{/* for small screen */}
			<div className="d-block d-md-none">
				<div
					className="card mt-3"
					style={{ width: "19rem", margin: "auto", display: "flex" }}>
					<div className="card-body d-flex justify-content-between">
						<div>
							<h5 className=" card-title text-left">{book.title}</h5>
							<h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
							<p className="card-text">
								{book.year}, {book.language}
							</p>
							<a href={book.link} className="card-link">
								Link
							</a>
						</div>
						<div>
							<button
								className="edit btn btn-outline-info btn-sm"
								title="Edit"
								onClick={handleShow}
								data-toggle="tooltip">
								<i className="material-icons">&#xE254;</i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default BookCard;
