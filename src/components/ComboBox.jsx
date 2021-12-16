import React, { Component } from 'react'
import axios from 'axios';
// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import '../App.css';

 class ComboBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            calle : '',
            ciudad: '',
            CountryId: '',
            RegionData: [],
            ProvinciaData: [],
            CiudadData: []

        }
    }
    componentDidMount() {
        axios.get('http://localhost:8000/api/regiones').then(response => {
            console.log(response.data);
            this.setState({
                RegionData: response.data
            });
        });
    }

  
    
    ChangeProvincia = (e) => {
        this.setState({
            id: e.target.value
        });
        axios.get('http://localhost:8000/api/get_provincia_by_region/' + e.target.value).then(response => {
            console.log(response.data);
            this.setState({
                ProvinciaData: response.data,
            });
        });
    }
    ChangeCiudad = (e) => {
        this.setState({
            id: e.target.value
        });
        axios.get('http://localhost:8000/api/get_ciudad/' + e.target.value).then(response => {
            console.log(response.data);
            this.setState({
                CiudadData: response.data
            });
        });
    }
    render() {

    //     const addCalle = async () => {

    //         const obj = new FormData()
    //         obj.append('calle', calle)
    //         obj.append('ciudad_id', ciudad)
    //         const res = await axios.post('http://localhost:8000/api/calle')
    //         console.log(res)
    //    } 
        return (
            <div className="container">
                <div className="col-6">
                    <div>
                        <h1>Mantenedor de Calles </h1>
                    </div>
                </div>
                <div >
                    <div className="row1">
                    <select className="form-control" name="region" value={this.state.id} onChange={this.ChangeProvincia}   >
                        <option>Select Region</option>
                        {this.state.RegionData.map((e, key) => {
                            return <option key={key} value={e.id}>{e.nombre}</option>;
                        })}
                    </select>
                    </div>

                    <div className="row1">
                    <select className="form-control slct" name="provincia" value={this.state.id} onChange={this.ChangeCiudad}  >
                        <option selected disabled>------------------</option>
                        <label for="company">Provincia</label>
                        
                        {this.state.ProvinciaData.map((e, key) => {
                            return  <option key={key} value={e.id}>{e.nombre}</option>;
                        })}
                    </select>
                    </div>

                    <div className="row1">
                    <select className="form-control slct" name="ciudad" value={this.state.CiudadData}  >
                    <option selected disabled>------------------</option>
                        {this.state.CiudadData.map((e, key) => {
                            return <option key={key} value={e.id}>{e.nombre}</option>;
                        })}
                    </select>
                    </div>  

                    <div className="row1">
                    <input type="text" name="calle" placeholder="Ingrese Calle" value= {this.state.calle} >
                    </input>    
                    </div>
                     
                    <div className="row1">
                    <button type="submit" >Guardar</button>
                    </div> 
                </div>
            </div>
        )
    }
}
export default ComboBox