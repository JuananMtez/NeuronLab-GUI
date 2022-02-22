function Grafica() {


    return (
        <div className="App">
            <header className="App-header">
                <button onClick={() => window.lsl.start()}>
                    Iniciar
                </button>

                <button onClick={() => window.lsl.stop()}>
                    Parar
                </button>
            </header>
        </div>
    );
}

export default Grafica;
