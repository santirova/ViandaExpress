import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.css";
import style from "./Home.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../components/SearchBar/SearchBar";
import {
  getFoods,
  filterFoodByCategory,
  filterFoodByOrder,
} from "../../redux/foodActions.js";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import Paginado from "../../components/Paginado/Paginado";
import axios from "axios";


const Home = () => {
    const [index, setIndex] = useState(0);

    const dispatch = useDispatch();

    const allFoods = useSelector((state) => state.foodsReducer.allFoods);

  /* This implementation will change once we have a deployed DB */
  useEffect(() => {
    if (!allFoods.length) {
      axios.get("http://localhost:3001/api").then(() => dispatch(getFoods()));
    } else {
      dispatch(getFoods());
    }
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const [foodsPerPage, setFoodsPerPage] = useState(8);

  const indexOfLastFood = currentPage * foodsPerPage;
  const indexOfFirstFood = indexOfLastFood - foodsPerPage;
  const currentFoods = allFoods.slice(indexOfFirstFood, indexOfLastFood);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handleFilterByCategory = (event) => {
    dispatch(filterFoodByCategory(event.target.value));
    setCurrentPage(1);
  };

  const handleFilterByOrder = (event) => {
    dispatch(filterFoodByOrder(event.target.value));
    setCurrentPage(1);
  };

  console.log('currentFoods: ', currentFoods);
  return (
    <div className={style.mainContainer}>
      <div className={style.Carousel}>
        <Carousel activeIndex={index} onSelect={handleSelect} interval="9000">

          <Carousel.Item>
            <img src="../src/assets/carousel/variety.jpg" alt="Variadadas" />
            <Carousel.Caption>
              <div className={style.CarouselText}>Viandas para toda la familia</div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>

            <img src="../src/assets/carousel/healthy.jpeg" alt="Saludables" />

            <Carousel.Caption>
              <div className={style.CarouselText}>Saludables y nutritivas</div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>

            <img src="../src/assets/carousel/withLove.jpeg" alt="Caseras" />

            <Carousel.Caption>
              <div className={style.CarouselText}>Caseras y con amor</div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>



      </div>

      <div className={style.buttonsContainer}>
        {/* Comentario TONO: No se puede implementar el reset hasta que se corrija la implementación de los filtros en redux */}
        {/* <button className={style.all} onClick={(e) => handleFilterByCategory(e)} value="Todas">
          Todas
        </button> */}
        {/* Comentatario TONO: los botones se deberían refactorizar: deberían mapear un array de diets para no repetir código. */}
        <button
          className={style.pastas}
          onClick={(e) => handleFilterByCategory(e)}
          value="Pastas"
        >
          {/* Pastas */}
        </button>

        <button
          className={style.meat}
          onClick={(e) => handleFilterByCategory(e)}
          value="Carnes"
        >
          {/* Carnes */}
        </button>

        <button
          className={style.salads}
          onClick={(e) => handleFilterByCategory(e)}
          value="Ensaladas"
        >
          {/* Ensaladas */}
        </button>

      </div>

      <div className={style.filtros}>
        {/* Comentario TONO: El filtro de dieta no está implementado. */}
        <div className={style.filtros2}>
          <select name="" id="">
            <option value="">Dieta</option>
            <option value="">Vegana</option>
            <option value="">Vegetariana</option>
            <option value="">Sin tacc</option>
            <option value="">Sin lactosa</option>
          </select>

          <select onChange={(e) => handleFilterByOrder(e)}>
            <option value="">Ordenar</option>
            <option value="expensive">Costosa</option>
            <option value="cheap">Barata</option>
            <option value="atoz"> A to Z</option>
            <option value="ztoa">Z to A</option>
          </select>
        </div>
      </div>

      <div className={style.asereje}>
        <SearchBar setCurrentPage={setCurrentPage} />

        <Paginado
          foodsPerPage={foodsPerPage}
          foods={allFoods.length}
          paginado={paginado}
          currentPage={currentPage}
        />

        
        {!currentFoods.length 
          ? <p>Cargando comidas...</p>
          : <CardsContainer currentFoods={currentFoods} />
        }
      </div>
    </div>
  );
};

export default Home;

/**
 *option y valores para ordernar por Popularidad 
 *<option value="asc">Más Popular</option>
  <option value="desc">Menos Popular</option>
 */

