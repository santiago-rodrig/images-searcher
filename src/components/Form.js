import React, { useState } from "react";
import ErrorComponent from "./ErrorComponent";

const Form = () => {
  const [queryTerm, setQueryTerm] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (queryTerm.trim() === "") {
      setError(true);

      return;
    }

    setError(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Busca una imagen, ejemplo: futbol o cafe"
            onChange={(e) => setQueryTerm(e.target.value)}
          />
        </div>
        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            value="Buscar"
          />
        </div>
      </div>
      {error ? (
        <ErrorComponent>
          Por favor introduzca un término de búsqueda
        </ErrorComponent>
      ) : null}
    </form>
  );
};

export default Form;
