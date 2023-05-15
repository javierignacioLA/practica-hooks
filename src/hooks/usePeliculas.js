
import noresultados from '../results/no-resultado.json'
import { useState } from 'react'
export function usePeliculas({pelicula}){

  const [resultado, setResultadoPelicula] = useState([])
    //para saber cuando tiene peliculas
    const peliculas = resultado.Search

    const mapeoPeliculas = peliculas?.map(peli => ({
      id: peli.imdbID,
      title: peli.Title,
      year: peli.Year,
      poster: peli.Poster
    }))
    const getPeliculas = async () => {
      if(pelicula){
        // setResultadoPelicula(resultados)
        const res = await fetch (`https://www.omdbapi.com/?apikey=814f5cfc&s=${pelicula}`)
        const data = await res.json()
        setResultadoPelicula(data)
      } else {
        setResultadoPelicula(noresultados)
      }
    }
  return {mapeoPeliculas, getPeliculas}
}

