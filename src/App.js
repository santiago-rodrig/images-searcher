import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import Images from "./components/Images";

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handlePreviousPage = () => {
    const previousePage = page - 1;

    if (previousePage < 1) return;

    setPage(previousePage);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleNextPage = () => {
    const nextPage = page + 1;

    if (nextPage > totalPages) return;

    setPage(nextPage);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (query.trim() !== "") {
      const queryAPI = async () => {
        const imagesPerPage = 30;
        const API_KEY = "15275659-9a92badf071fe45b3a148af55";
        const URL = `https://pixabay.com/api/?q=${query}&per_page=${imagesPerPage}&key=${API_KEY}&page=${page}`;
        const response = await fetch(URL);
        const payload = await response.json();

        setImages(payload.hits);
        setTotalPages(Math.ceil(payload.totalHits / imagesPerPage));
      };

      queryAPI();
    }
  }, [query, page]);

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Form setQuery={setQuery} />
      </div>
      <div className="row justify-content-center">
        <Images images={images} />
        <button
          type="button"
          className={`btn btn-info mr-1 ${
            page - 1 < 1 ? "d-none" : "d-inline-block"
          }`}
          onClick={handlePreviousPage}
        >
          Anterior &laquo;
        </button>
        <button
          type="button"
          className={`btn btn-info ${
            page + 1 > totalPages ? "d-none" : "d-inline-block"
          }`}
          onClick={handleNextPage}
        >
          Siguiente &raquo;
        </button>
      </div>
    </div>
  );
}

export default App;
