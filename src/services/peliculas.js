

const API_KEY = '814f5cfc'
export const buscarPeliculas = async ({pelicula}) => {
   if (pelicula.trim() === '') {
    return null
   }
   try{
      const res = await fetch (`https://www.omdbapi.com/?apikey=${API_KEY}&s=${pelicula}`)
      const data = await res.json()

      const peliculaEncontrada = data.Search
    
    return peliculaEncontrada?.map(peli => ({
      id: peli.imdbID,
      title: peli.Title,
      year: peli.Year,
      poster: peli.Poster
    }))
    
   }catch(e){
    throw new Error ('error en la busqueda')
   }

   
}