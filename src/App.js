import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import Images from './components/Images'

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (query.trim() !== "") {
      const queryAPI = async () => {
        const imagesPerPage = 30;
        const API_KEY = "15275659-9a92badf071fe45b3a148af55";
        const URL = `https://pixabay.com/api/?q=${query}&per_page=${imagesPerPage}&key=${API_KEY}`;
        const response = await fetch(URL);
        const payload = await response.json();

        setImages(payload.hits);
      };

      queryAPI();
    }
  }, [query]);

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Form setQuery={setQuery} />
      </div>
      <div className="row justify-content-center">
        <Images images={images} />
      </div>
    </div>
  );
}

export default App;
