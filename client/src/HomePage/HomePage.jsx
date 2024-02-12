import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import SearchBar from '..//searchBar/SearchBar';
import styles from './HomePage.module.css';
import { useEffect, useState } from 'react';
import { getVideogames, orderVideogamesAscDesc, orderVideogamesByRating } from '../redux/actions/actions';
import GenreFilter from '../GenreFilter/GenreFilter';
import Pagination from '../pagination/Pagination';
import Card from '../card/Card';
import PrimaryButton from '../buttons/primaryButton/PrimaryButton';
import { NavLink } from 'react-router-dom';
import ResetFilters from '../resetButtons/ResetFilters';
import Loading from '../loading/Loading';

const HomePage = () => {
  const dispatch = useDispatch();
  const [aux, setAux] = useState(false);

  const allVideogames = useSelector((state) => state.Videogames);
  const numPage = useSelector((state) => state.numPage);

  //estados locales para el paginado
  const [gamesPerPage] = useState(15);

  // get index of the last game
  const indexOfLastGame = numPage * gamesPerPage;

  // get index of the first game 
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;

  //obtener el corte de los games por pagina
  const currentGames = allVideogames.slice(indexOfFirstGame, indexOfLastGame);


  useEffect(() => {
    dispatch(getVideogames())
  }, [dispatch])

// order by A-Z
  const handleOrderAscDesc = (e) => {
    e.preventDefault();
    dispatch(orderVideogamesAscDesc(e.target.value))
    setAux(!aux);
  }
// order by rating
  const handleOrderRating = (e) => {
    e.preventDefault();
    dispatch(orderVideogamesByRating(e.target.value))
    setAux(!aux);
  }

  return (
    <div className={styles.homePageContainer}>

      <div className={styles.orderContainer}>
        
        <SearchBar />

        {/* filter by genre */}
        <GenreFilter />
        {/* alphabetic order */}
        <div className={styles.orderAscDesc}>
          <select onChange={(e)=> handleOrderAscDesc(e)}>
            <option value="default" >Select by order</option>
            <option value="asc" >Ascendent</option>
            <option value="desc">Descendent</option>
          </select>
        </div>

        {/* boton de reseteo de filtros */}
        <div className={styles.orderByRating}>
          <select onChange={(e)=> handleOrderRating(e)}>
            <option value="default" >Select by rating</option>
            <option value="best" >Best</option>
            <option value="worst">Worst</option>
          </select>
        </div>

      {/* order by rating */}
        <ResetFilters />

        <PrimaryButton>
          <NavLink to="/form">Create game</NavLink>
        </PrimaryButton>
        
      </div>

      <div className={styles.paginationContainer}>
        <Pagination 
          gamesPerPage={gamesPerPage} /* games per page */
          allVideogames={allVideogames.length} /* all videogames */
        />
      </div>
      
      <div className={styles.paginationContainerCards}>
        {
          currentGames[0] ? (
            currentGames?.map(game => {
              return (
                <Card
                  key={game.id}
                  id={game.id}
                  name={game.name}
                  image={game.image}
                  genres={game.genres}
                  rating={game.rating}
                />
              )
            })
          ) : (
            <Loading/>
          )
        }
      </div>

      {/* pagination */}
      <div className={styles.paginationContainer}>
        <Pagination 
          gamesPerPage={gamesPerPage} 
          allVideogames={allVideogames.length} 
        />
      </div>
    </div>
  )
};

export default HomePage;