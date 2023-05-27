import { Route, Routes } from "react-router-dom";
import BooksList from "../Components/BooksList";

export const MainRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<BooksList />} />
			<Route path="*" element={<h3>Page Not Found</h3>} />
		</Routes>
	);
};
