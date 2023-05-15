

// eslint-disable-next-line react/prop-types
const ListaPeliculas = ({ peliculas }) => {
  return (
    <ul className="peliculas">
      {
        // eslint-disable-next-line react/prop-types
        peliculas.map(peli => (
          <li className='pelicula' key={peli.id}>
            <h3>{peli.title}</h3>
            <p>{peli.year}</p>
            <img src={peli.poster} alt={peli.title}/>
          </li>
    
        ))
      }
      </ul>
  )
}


const SinPelicula = () => {
    return (
        <p style={{textAlign: "center"}}>no se encontraron peliculas</p>
    )
}

// eslint-disable-next-line react/prop-types
export default function Peliculas ({peliculas}){
    // eslint-disable-next-line react/prop-types
    const hayPeliculas= peliculas?.length > 0
    return (
        hayPeliculas? <ListaPeliculas peliculas={peliculas}/> : <SinPelicula/>
    )
}

