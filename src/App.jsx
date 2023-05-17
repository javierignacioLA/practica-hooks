import './App.css'
import Peliculas from './components/Peliculas'
import { usePeliculas } from './hooks/usePeliculas'
import { useCallback, useEffect, useRef, useState } from 'react'
import debounce from 'just-debounce-it'

function useBusqueda(){
  const [pelicula, setPelicula] = useState('')
  const [error, setError] = useState(null)
  const primerInput = useRef(true)
  useEffect(() => {
    if(primerInput.current){
      primerInput.current = pelicula === ''
      return
    }
    if(pelicula===''){
      setError('no se puede buscar una pelicula vacia')
      return
    }
    if (pelicula.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número')
      return
    }
    if (pelicula.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }
    setError(null)
  }, [pelicula]) 
  return {pelicula, setPelicula, error}
}

function App() {

  const [ordenar, setOrdenar] = useState(false)
  //const inputRef = useRef()
  const {pelicula, setPelicula, error} = useBusqueda()
  
  const {mapeoPeliculas, getPeliculas, loading} = usePeliculas({pelicula, ordenar})
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // const inputForm = inputRef.current.value
    // console.log(inputForm)
    console.log(pelicula)
    getPeliculas({pelicula})
  
  }
  const handleChange = (e) => {
    const nuevaPelicula = e.target.value
    //setPelicula(e.target.value)
    setPelicula(nuevaPelicula)
    debouncedGetPeliculas({nuevaPelicula})
  }
  const handleOrdenar = () => {
    setOrdenar(!ordenar)
  }
  const debouncedGetPeliculas = useCallback(
    debounce (pelicula => {
    getPeliculas({pelicula})
  }, 700)
  ,[getPeliculas])


  return (
    <div className='page1'>
     <header>
     <h3>Practica react 4: buscador peliculas</h3>
      <form className='form' onSubmit={handleSubmit}>
        <input  
        style={{
          border: '1px solid transparent',
          borderColor: error ? 'red' : 'transparent'
        }}
        type="text" 
        placeholder='Ingrese pelicula' 
        name='pelicula'
        value={pelicula} 
        onChange={handleChange}
        />
        <input type='checkbox' onChange={handleOrdenar} checked={ordenar}/>
        <button type='submit'>Buscar Pelicula</button>
      </form>
      {
        error && <p style={{backgroundColor: 'red'}}>{error}</p>
      }
     </header>
     <main>
      {
        loading? <p>Cargando peliculas</p>: <Peliculas peliculas={mapeoPeliculas}/>
      }
     </main>
    </div>
  )
}

export default App
