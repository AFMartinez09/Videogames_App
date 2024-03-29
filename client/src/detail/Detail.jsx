import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styles from './Detail.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { detailVideogames } from '../redux/actions/actions';
import SecondaryButton from '../buttons/secondaryButton/SecondaryButton';
import Loading from '../loading/Loading';

const Detail = () => {
  const { id }= useParams();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(detailVideogames(id));
    setLoading(false);
  }, [dispatch, id]);


  const DetailGame = useSelector((state) => state.DetailGame)

  const platforms = DetailGame.platforms;
  const genres = DetailGame.genres;
  

  return (
    <>
    {
        loading ? 
        (<Loading /> 
        ): ( 
          <div className={styles.detailContainer}>
                <div className={styles.detailImage}>
                  <SecondaryButton>
                    <NavLink to="/home">Home</NavLink>
                  </SecondaryButton>
                  <h1>{DetailGame.name}</h1>
                  <img src={DetailGame.image} alt="juego" />
                  <h3>Platforms: </h3>
                  <p>{platforms}</p>
                  <p>Released:  {DetailGame.released}</p>
                  <a href={DetailGame.website}>Website</a>
                </div>

                <div className={styles.detailInfo}>
                  <h3>Description: </h3>
                  <p>{DetailGame.description}</p>
                  <p>Rating: {DetailGame.rating}</p>
                  <p>Genero: {genres}</p>

                </div>
              </div>  
      )   
    }
  </>    
  )   
};

export default Detail;
