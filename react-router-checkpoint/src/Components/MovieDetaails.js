import React from 'react'
import { useParams } from 'react-router-dom'
import { Carousel } from 'react-bootstrap'
import { MoviesApi } from '../Data/MovieApi'


function MovieDetails() {

  const {id} = useParams()
const movie = MoviesApi.find(movie=> movie.id === id)
console.log(movie);
  return (
    <div>
      <img text="First slide" src={movie.imgUrl}  alt='movie'/>
          <h3>{movie.title}</h3>
          <p>{movie.description}</p>

      

    </div>
  )
}

export default MovieDetails

