import { useState, useRef, useMemo, useCallback } from 'react'
import { buscarPeliculas } from '../services/peliculas'
export function usePeliculas({pelicula, ordenar}){

  const [mapeoPeliculas, setMapeoPeliculas] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const busquedaPrevia = useRef(pelicula)
  
    const getPeliculas = useCallback( async ({pelicula}) => {
        if (pelicula === busquedaPrevia.current) return
        try{
          setLoading(true)
          setError(null)
          busquedaPrevia.current = pelicula
          const nuevaPelicula = await buscarPeliculas({pelicula})
          setMapeoPeliculas(nuevaPelicula)
        }catch(e){
          setError(e.message)
        }finally{
          setLoading(false)
        }
  
      },[])
    
    
   
    const ordenarPeliculas = useMemo(() =>  {
    return ordenar? 
    [...mapeoPeliculas].sort((a,b) => a.title.localeCompare(b.title))
    :(mapeoPeliculas)
    }, [ordenar, mapeoPeliculas])

    //console.log('ordenar', ordenarPeliculas)
  return {mapeoPeliculas: ordenarPeliculas, getPeliculas, loading, error}
}



