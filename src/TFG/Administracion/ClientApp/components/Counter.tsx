import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import axios from 'axios';
import { ApiUrlRepository } from './ApiUrlMiddle/ApiUrlRepository';

interface FetchDataExampleState {
    forecasts: Evento[];
    Busqueda: Evento[];
    loading: boolean;
    texto : string;
}

export class Counter extends React.Component<RouteComponentProps<{}>, FetchDataExampleState> {
    constructor() {
        super();
        this.state = { forecasts: [], Busqueda: [], loading: true, texto: "" };

        fetch('http://localhost:11111/api/events/all')
            .then(response => response.json() as Promise<Evento[]>)
            .then(data => {
                this.setState({ forecasts: data, loading: false, Busqueda: data });
            });
    }

    eliminar(id: number) {
        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.eliminarEvento);
        axios.delete("http://localhost:11111/api/events/" + id)
            .then(res => {
                console.log(res);
                console.log(res.data);
            });
        var Lista: Evento[] = [];
        this.state.forecasts.map(evento => {
            Lista.push(evento);
        });

        var borrar: Evento = this.state.forecasts[0];
        Lista.map(evento => {
            if (evento.id == id)
                borrar = evento;
        });
        var indice = Lista.indexOf(borrar);
        Lista.splice(indice);
        this.setState({ forecasts: Lista });
    }

    handletexto = (event: any) => {
        this.setState({ texto: event.target.value });
        if (this.state.texto != "") {
            var Lista: Evento[] = [];
            this.state.forecasts.map(evento => {
                if (evento.nombre.indexOf(event.target.value) != -1) {
                    Lista.push(evento);
                }
            });
            this.setState({ Busqueda: Lista });
        }

    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderForecastsTable(this.state.Busqueda);

        return <div>
            <h1>Lista de los eventos </h1>
            <p>Eventos creados por los usuarios</p>
            <form className="container darker">
                <input className="msg" type="text" value={this.state.texto} ref="un texto" onChange={this.handletexto} />
            </form>
            {contents}
        </div>;
    }

    public renderForecastsTable(forecasts: Evento[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Lugar</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.nombre}>
                        <td>{forecast.nombre}</td>
                        <td>{forecast.descripcion}</td>
                        <td>{forecast.direccion}</td>
                        <td> <button className="btn btn-danger" onClick={() => { this.eliminar(forecast.id) }}>Cancelar</button></td>
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

interface Evento {
    id: number;
    nombre: string;
    descripcion: string;
    direccion: string;
    horaInicio: Date;
    horaFin: Date;
    fecha: Date;
    prioridad: number;
    visibilidad: boolean;
    createDate: Date;
    usuarioId: number;
}
