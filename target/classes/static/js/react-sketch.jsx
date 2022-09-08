class Dibujo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            status: []
        };
    }
    
    componentDidMount() {

        this.timerID = setInterval(
                () => this.checkStatusCircles(),               
                1000
                );
        this.timerID = setInterval(
                () => this.addCircle(),               
                1000
                );
         
    
    }

    addCircle() {

        const data = new FormData();
        data.append('lista', circles());
        fetch('/add-circulos', {
            method: 'POST',
            body: data
        })
                .then(function (response) {
                    if (response.ok) {
                        return response.text();
                    } else {
                        console.log("no paso", data);
                        throw "Error en la llamada Ajax";
                    }

                });

    }

    checkStatusCircles() {
        fetch('/circulos')
                .then(response => response.json())
                .then(status => this.setState({status}));

        circlesSet(this.state.status);
        showCircles();
    }
    

    reiniciar(){
        fetch('/reiniciar', {
              method: 'POST'               
          })
                  .then(function (response) {                        
                      if (response.ok) {   
                            vaciar();
                          //return response.text();
                      } else {                          
                          throw "Error en la llamada Ajax";
                      }

                  });
        vaciar();       
        //reload storage client
        window.location.reload(false);

    }
    
  
    render() {
        const {error, isLoaded, status} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else {
            return (
                    <div> 
                        <h1>The list movements global is:</h1>
                        <p>                             
                            {status.length}   

                        </p>
                         <button onClick={this.reiniciar}> Reiniciar </button>
                    </div>
                  
                    
                    );
        }
    }
}

ReactDOM.render(
        <Dibujo />,
        document.getElementById('reactFront')
);

