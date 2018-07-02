import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import axios from 'axios';
import { ApiUrlRepository } from './ApiUrlMiddle/ApiUrlRepository';

//import { Form, Text } from 'react-form';

interface DatosFetchData {
    users: User[];
    loading: boolean;
    nombreEvento: string;
    descripcion: string;
    direccion: string;
    fecha: Date;
    horaInicio: Date;
    horaFin: Date;
    prioridad: number;
    visibilidad: boolean;
}

export class FetchData extends React.Component<RouteComponentProps<{}>, DatosFetchData> {
    constructor() {
        super();
        this.state = {
            users: [],
            loading: true,
            nombreEvento: '',
            descripcion: '',
            direccion: '',
            fecha: new Date,
            horaInicio: new Date,
            horaFin: new Date,
            prioridad: 0,
            visibilidad: false,

        };
        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.getSpecificUser);
        fetch(dir + '/Afro')
            .then(response => response.json() as Promise<User[]>)
            .then(data => {
                this.setState({ users: data, loading: false });
            }).catch(error => console.log(error));

        /*axios.get('http://wcbackend.azurewebsites.net/api/users/Afro')
            .then(res =>{
                const users = res.data as User[];
                const loading = false;
                this.setState({ users, loading });
            });*/


    }


    handleNombreChange = (event: any) => {
        this.setState({ nombreEvento: event.target.value });
    }

    handleDescriptionChange = (event: any) => {
        this.setState({ descripcion: event.target.value });
    }
    handleDirChange = (event: any) => {
        this.setState({ direccion: event.target.value });
    }
    handleDateChange = (event: any) => {
        this.setState({ fecha: event.target.value });
    }
    handleInicioChange = (event: any) => {
        this.setState({ horaInicio: event.target.value });
    }
    handleFinChange = (event: any) => {
        this.setState({ horaFin: event.target.value });
    }
    handlePrioridadChange = (event: any) => {
        this.setState({ prioridad: event.target.value });
    }
    handleVisibilidadChange = (event: any) => {
        this.setState({ visibilidad: event.target.value });
    }


    handleSubmmit = (event: any) => {
        event.preventDefault();

        const user = {
            nombreEvento: this.state.nombreEvento,
            descripcion: this.state.descripcion,
            direccion: this.state.direccion,
            fecha: this.state.fecha,
            horaInicio: this.state.horaInicio,
            horaFin: this.state.horaFin,
            prioridad: this.state.prioridad,
            visibilidad: this.state.visibilidad,
        };

        const parametro = {
            nombre: user.nombreEvento,
            desc: user.descripcion,
            direccion: user.direccion,
            horaInicio: user.horaInicio,
            horafin: user.horaFin,
            fecha: user.fecha,
            prioridad: user.prioridad,
            visibilidad: user.visibilidad,
            idUsuarioDuenio: 1,
        };

        interface eventJson {
            nombre: string,
            desc: string,
            direccion: string,
            horaInicio: Date,
            horafin: Date,
            fecha: Date,
            prioridad: number,
            visibilidad: boolean,
            idUsuarioDuenio: number,
        };

        var eventojson: eventJson = {
            nombre: '',
            desc: '',
            direccion: '',
            horaInicio: new Date,
            horafin: new Date,
            fecha: new Date,
            prioridad: 0,
            visibilidad: false,
            idUsuarioDuenio: 1
        }

        eventojson.nombre = parametro.nombre;
        eventojson.desc = parametro.desc;
        eventojson.direccion = parametro.direccion;
        eventojson.horaInicio = parametro.horaInicio;
        eventojson.horafin = parametro.horafin;
        eventojson.fecha = parametro.fecha;
        eventojson.prioridad = parametro.prioridad;
        eventojson.visibilidad = parametro.visibilidad;
        eventojson.idUsuarioDuenio = parametro.idUsuarioDuenio;


        var direccion = ApiUrlRepository.getApiUrl(ApiUrlRepository.setSpecificEvent);
        var subida = JSON.stringify(eventojson);

        axios.post('http://localhost:55555/api/events', subida,
            {
                headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" }
            }).then(res => {
                console.log(res);
                console.log(res.data);
            })

        /*fetch('http://localhost:55555/api/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventojson)
        }).catch(error => console.log(error));*/

        console.log(JSON.stringify(eventojson));

    }


    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : <h1>{this.state.users[0].nombreUsuario}</h1>;

        return <div>
            <h1>Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
            {sessionStorage.getItem("token")}
            <form onSubmit={this.handleSubmmit}>
                <label>
                    Nombre del Evento
                    <input id="name" type="text" ref="un texto" onChange={this.handleNombreChange} />
                </label>
                <label>
                    Descripcion
                    <input id="desc" type="text" ref="un texto" onChange={this.handleDescriptionChange} />
                </label>
                <label>
                    Lugar
                    <input id="lugar" type="text" ref="un texto" onChange={this.handleDirChange} />
                </label>
                <label>
                    Fecha
                    <input id="date" type="date" onChange={this.handleDateChange} />
                </label>
                <label>
                    Hora de inicio
                    <input id="horaInicio" type="time" name="hora" max="22:30:00" min="10:00:00" step="1" onChange={this.handleInicioChange} />
                </label>
                <label>
                    Hora de fin
                    <input id="horaInicio" type="time" name="hora" max="22:30:00" min="10:00:00" step="1" onChange={this.handleFinChange} />
                </label>
                <label>
                    Prioridad
                    <input type="number" id="prio" min="0" max="1" onChange={this.handlePrioridadChange} />
                </label>
                <label>
                    Visibilidad
                    <input id="visibilidad" type="checkbox" name="vehicle" value="Visible" onChange={this.handleVisibilidadChange} />
                </label>
                <button type="submit">Add</button>
            </form>

        </div>;
    }


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

interface eventJson {
    nombre: string;
    desc: string;
    direccion: string;
    horaInicio: Date;
    horafin: Date;
    fecha: Date;
    prioridad: number;
    visibilidad: boolean;
    idUsuarioDuenio: number;
};
