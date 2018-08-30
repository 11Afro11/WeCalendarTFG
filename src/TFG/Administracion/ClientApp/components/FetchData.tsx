import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import axios from 'axios';
import { ApiUrlRepository } from './ApiUrlMiddle/ApiUrlRepository';

interface FetchDataExampleState {
    forecasts: User[];
    Busqueda : User[];
    listaBaneados: number[];
    loadingBan : boolean;
    loading: boolean;
    texto : string;
}

export class FetchData extends React.Component<RouteComponentProps<{}>, FetchDataExampleState> {
    constructor() {
        super();
        this.state = { forecasts: [], Busqueda:[], listaBaneados: [], loadingBan: true, loading: true, texto : "" };

        fetch('http://localhost:11111/api/Users/all')
            .then(response => response.json() as Promise<User[]>)
            .then(data => {
                this.setState({ forecasts: data, Busqueda : data,  loading: false });
            });

        fetch('http://localhost:11111/api/Users/listaBaneos')
            .then(response => response.json() as Promise<number[]>)
            .then(data => {
                this.setState({ listaBaneados: data, loadingBan: false });
            });
    }

    banear(id: number) {
        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.eliminarEvento);
        axios.put("http://localhost:11111/api/Users/baneo/" + id+"/1")
            .then(res => {
                console.log(res);
                console.log(res.data);
            });
        var Lista: number[] = [];
        this.state.listaBaneados.map(evento => {
            Lista.push(evento);
        });

        Lista.push(id);
        this.setState({ listaBaneados: Lista });
    }

    retirarBaneo(id: number) {
        axios.delete("http://localhost:11111/api/Users/retirarBaneo/" + id)
            .then(res => {
                console.log(res);
                console.log(res.data);
            });
        var Lista: number[] = [];
        this.state.listaBaneados.map(evento => {
            if(evento != id)
                Lista.push(evento);
        });
        
        this.setState({ listaBaneados: Lista });
    }

    public render() {
        let contents = (this.state.loading && this.state.listaBaneados)
            ? <p><em>Loading...</em></p>
            : this.renderForecastsTable(this.state.Busqueda);

        return <div>
            <h1>Lista de usuarios</h1>
            <p>Lista de usuarios registrados en el sistema</p>
                   <form className="container darker">
                       <input className="msg" type="text" value={this.state.texto} ref="un texto" onChange={this.handletexto} />
                   </form>
            { contents }
        </div>;
    }

    handletexto = (event: any) => {
        this.setState({ texto: event.target.value });
        if (this.state.texto != "") {
            var Lista: User[] = [];
            this.state.forecasts.map(evento => {
                if (evento.nombreUsuario.indexOf(event.target.value) != -1) {
                    Lista.push(evento);
                }
            });
            this.setState({ Busqueda: Lista });
        }

    }

    public renderForecastsTable(forecasts: User[]) {
        return <table className='table'>
                   <thead>
                   <tr>
                       <th>Nombre</th>
                       <th>Opciones</th>
                   </tr>
                   </thead>
                   <tbody>
                   {forecasts.map(forecast =>
                    <tr key={forecast.nombreUsuario}>
                        <td>{forecast.nombreUsuario}</td>
                        {(this.state.listaBaneados.indexOf(forecast.id) != -1) ? <td><button className="btn btn-success" onClick={() => { this.retirarBaneo(forecast.id) }}>Retirar Baneo</button></td> : <td><button className="btn btn-danger" onClick={() => { this.banear(forecast.id) }}>Banear</button></td> }
                </tr>
            )}
                   </tbody>
               </table>;
    }
}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
interface ChatI {
    id: number;
    texto: string;
    groupId: number;
    createDate: Date;
    usuarioId: number;
    chatId: number;
}

interface User {
    id: number;
    nombreUsuario: string;
    correo: string;
    password: string;
    notificacion: string;
    foto: string;
    createDate: Date;
    token: string;

}
