import axios from "axios";
import {
	EDIT_BOOK_SUCCESS,
	GET_BOOKS_FAILURE,
	GET_BOOKS_REQUEST,
	GET_BOOKS_SUCCESS,
	ADD_BOOK_SUCCESS,
} from "../Books/actionTypes";

const getBookRequestAction = () => {
	return {
		type: GET_BOOKS_REQUEST,
	};
};
const getBookSuccessAction = (payload) => {
	return {
		type: GET_BOOKS_SUCCESS,
		payload,
	};
};
const getBookFailureAction = () => {
	return {
		type: GET_BOOKS_FAILURE,
	};
};

const editBookSuccess = () => {
	return { type: EDIT_BOOK_SUCCESS };
};

const addBookSuccessAction = () => {
	return {
		type: ADD_BOOK_SUCCESS,
	};
};

export const addBook = (bookData) => (dispatch) => {
	const baseUrl = "http://68.178.162.203:8080/application-test-v1.1/books";
	try {
		const result = axios.post(baseUrl, bookData);
		console.log(result.data);
		alert("Book successfully added");
		dispatch(addBookSuccessAction());
	} catch (error) {
		console.error(error);
	}
};

export const getBooks =
	(param = {}) =>
	(dispatch) => {
		dispatch(getBookRequestAction());
		axios
			.get("http://68.178.162.203:8080/application-test-v1.1/books", {
				params: param,
			})
			.then((response) => {
				dispatch(getBookSuccessAction(response.data));
				console.log(response.data);
			})
			.catch((error) => {
				dispatch(getBookFailureAction());
				console.log(error);
			});
	};

export const editBook = (id, bookData) => (dispatch) => {
	return axios
		.put(
			`http://68.178.162.203:8080/application-test-v1.1/books/${id}`,
			bookData
		)
		.then(() => {
			dispatch(editBookSuccess());
		});
};
