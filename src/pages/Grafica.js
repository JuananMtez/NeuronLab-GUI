import { useEffect, useState } from 'react'
import { Chart } from '../components/Chart'

function Grafica() {

    const [capturing, setCapturing] = useState(false);
    const [searching, setSearching] = useState(false);
    const [found, setFound] = useState(false);



    useEffect(() => {
      console.log('entro')
    }, [searching]);

    const buscar = () => {
      setSearching(true);

      if (window.lsl.search())
        setFound(true);
      else {
        window.alert('not found lsl streams')
        setFound(false)
      }

      setSearching(false)

    }

    const iniciar = () => {
      setCapturing(true)
      window.lsl.start()

    }

    const parar = () => {
      setCapturing(false)
      setFound(false)
      window.lsl.stop()
    }

    const getStatusLSL = () => {
      if (searching)
        return <p>Searching</p>

      else if (found && capturing)
        return <p>capturing</p>

      else if (!found)
        return <p>Unpair</p>
      
      else if (found && !capturing)
        return <p>pair</p>
    }


    return (
      
      <div className="App">
        <header disabled className="App-header">
          <Chart></Chart>
          <button disabled={found || searching} onClick={buscar}>
            Buscar
          </button>
        	<button disabled={!found || capturing} onClick={iniciar}>
          	Capturar
          </button>
					<button disabled={!found || !capturing} onClick={parar}>
						Parar
					</button>
          {getStatusLSL()}

      	</header>
      </div>
    );
}

export default Grafica;
