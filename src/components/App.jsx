import { useEffect, useRef } from "react";
import { Button } from "react-bootstrap";

import Artes from "./Artes"; //Sendo usado no .map
import ArtesForm from "./ArtesForm";
import api from "../services/api";
import { useArte } from "../contexts/FoodContext";

import "bootstrap/dist/css/bootstrap.css";

function App() {
  const buttonEl = useRef(null);

  const { artes, setArtes, toggleArteForm } = useArte();

  const handleClick = (event) => {
    toggleArteForm();

    event.currentTarget.blur();
  };

  useEffect(() => {
    const loadArtes = async () => {
      const data = await api.readAll();

      setArtes([...artes, ...data]);
    };

    loadArtes();
  }, []);

  return (
    <body>
      <header>
        <h1 className="heading">Aluno: Gabriel Xavier Cabral</h1>
      </header>

      
      <main>
        <section className="leading">
          <p className="leading-bigtext">AnimeX</p>
          <p className="leading-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae semper quam. Praesent lobortis tellus quis erat condimentum, a bibendum tortor volutpat.</p>
        </section>

        <Button id="tt" 
          className="btn btn-secondary" 
          type="button" 
          data-bs-toggle="offcanvas" 
          data-bs-target="#offcanvasRight" 
          aria-controls="offcanvasRight"
          onClick={handleClick}
          ref={buttonEl}>
          <i class="bi bi-cart-check"></i>
          </Button>


        <section id="cards">
          {artes.map((arte) => (
            <Artes arte={arte} key={arte.id} />
          ))}
        </section>
        <ArtesForm />
      </main>
    </body>
  );
}

export default App;
