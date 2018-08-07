import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface FetchDataExampleState {
    forecasts: User[];
    loading: boolean;
}

export class FetchData extends React.Component<RouteComponentProps<{}>, FetchDataExampleState> {
    constructor() {
        super();
        this.state = { forecasts: [], loading: true };

        fetch('http://localhost:11111/api/Users/all')
            .then(response => response.json() as Promise<User[]>)
            .then(data => {
                this.setState({ forecasts: data, loading: false });
            });
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchData.renderForecastsTable(this.state.forecasts);

        return <div>
            <h1>Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            { contents }
        </div>;
    }

    private static renderForecastsTable(forecasts: User[]) {
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
