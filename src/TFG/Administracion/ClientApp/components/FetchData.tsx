import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import axios from 'axios';
import { ApiUrlRepository } from './ApiUrlMiddle/ApiUrlRepository';

interface FetchDataExampleState {
    forecasts: User[];
    listaBaneados: number[];
    loadingBan : boolean;
    loading: boolean;
}

export class FetchData extends React.Component<RouteComponentProps<{}>, FetchDataExampleState> {
    constructor() {
        super();
        this.state = { forecasts: [],listaBaneados: [], loadingBan: true, loading: true };

        fetch('http://localhost:11111/api/Users/all')
            .then(response => response.json() as Promise<User[]>)
            .then(data => {
                this.setState({ forecasts: data, loading: false });
            });

        fetch('http://localhost:11111/api/Users/listaBaneos')
            .then(response => response.json() as Promise<number[]>)
            .then(data => {
                this.setState({ listaBaneados: data, loadingBan: false });
            });
    }

    banear(id: number) {
        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.eliminarEvento);
        axios.delete("http://localhost:11111/api/Users/baneo/" + id+"/1")
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

    public render() {
        let contents = (this.state.loading && this.state.listaBaneados)
            ? <p><em>Loading...</em></p>
            : this.renderForecastsTable(this.state.forecasts);

        return <div>
            <h1>Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            { contents }
        </div>;
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
                        {(this.state.listaBaneados.indexOf(forecast.id) != -1) ? <td><button className="active" onClick={() => { this.banear(forecast.id) }}>Banear</button></td> : null}
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
