import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface FetchDataExampleState {
    forecasts: Evento[];
    loading: boolean;
}

export class Counter extends React.Component<RouteComponentProps<{}>, FetchDataExampleState> {
    constructor() {
        super();
        this.state = { forecasts: [], loading: true };

        fetch('http://localhost:11111/api/events/all')
            .then(response => response.json() as Promise<Evento[]>)
            .then(data => {
                this.setState({ forecasts: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Counter.renderForecastsTable(this.state.forecasts);

        return <div>
            <h1>Lista de los eventos </h1>
            <p>Eventos creados por los usuarios</p>
            {contents}
        </div>;
    }

    private static renderForecastsTable(forecasts: Evento[]) {
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
                        <td>Banear</td>
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
