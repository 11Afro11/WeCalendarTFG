import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import axios from 'axios';
import { ApiUrlRepository } from './ApiUrlMiddle/ApiUrlRepository';

interface DaySet {
    daySet: number,
    users: User[],
    loadingUser: boolean,
    events: Evento[],
    loadingEvent: boolean,
    invitaciones: Evento[],
    loadingInvitaciones: boolean,
    diasEventos: number[],
    nombreEvento: string;
    descripcion: string;
    direccion: string;
    fecha: Date;
    horaInicio: Date;
    horaFin: Date;
    prioridad: number;
    visibilidad: boolean;
    showForm: boolean;
}


export class Home extends React.Component<RouteComponentProps<{}>, DaySet> {


    mes = "Julio";
    anio = 2018;
    eventos = [1, 4, 12];
    usuario = 1;

    //daySet = 25;


    constructor() {
        super();
        this.state = {
            daySet: new Date().getDate(),
            users: [],
            loadingUser: true,
            events: [],
            loadingEvent: true,
            invitaciones: [],
            loadingInvitaciones: true,
            diasEventos: [],
            nombreEvento: '',
            descripcion: '',
            direccion: '',
            fecha: new Date,
            horaInicio: new Date,
            horaFin: new Date,
            prioridad: 0,
            visibilidad: false,
            showForm : false,
        };
        sessionStorage.setItem("token", "weeeeee");

        this.loadUsers();

        this.loadEvents();
        
        this.loadInvitaciones();

        (this.state.loadingEvent && this.state.loadingInvitaciones)
            ? <p><em>Loading...</em></p>
            : this.listaDias();

        

    }
    

    listaDias() {
        this.state.events.map(evento => {
            this.state.diasEventos.push(evento.fecha.getDate());
            console.log(evento.fecha.getDate());
        });
        this.state.invitaciones.map(evento => {
            this.state.diasEventos.push(evento.fecha.getDate());
        });
    }


    loadUsers() {
        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.getSpecificUser);
        fetch(dir + '/Afro')
            .then(response => response.json() as Promise<User[]>)
            .then(data => {
                this.setState({ users: data, loadingUser: false });
            }).catch(error => console.log(error));
    }

    loadEvents() {
        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.getSpecificEvent);
        fetch(dir + '/1')
            .then(response => response.json() as Promise<Evento[]>)
            .then(data => {
                this.setState({ events: data, loadingEvent: false });
            });
    }
    loadInvitaciones() {
        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.getEventoInvitado);
        fetch(dir + '/1')
            .then(response => response.json() as Promise<Evento[]>)
            .then(data => {
                this.setState({ invitaciones: data, loadingInvitaciones: false });
            });
    }


    //M�todo que crea el calendario de manera dn�mica

    createCalendar = () => {
        let day = [];
        var today = new Date();
        var DayToday = today.getDate();
        for (let i: number = 1; i <= 30; i++) {
            if (i == DayToday) {
                if (i < 10)
                    day.push((<li><button className="active" onClick={() => { this.setDay(i) }}>0{i}</button></li>) as any);
                else
                    day.push((<li><button className="active" onClick={() => { this.setDay(i) }}>{i}</button></li>) as any);
            }
            else if (this.state.diasEventos.indexOf(i) != -1) {
                if (i < 10)
                    day.push((<li><button className="event" onClick={() => { this.setDay(i) }}>0{i}</button></li>) as any);
                else
                    day.push((<li><button className="event" onClick={() => { this.setDay(i) }}>{i}</button></li>) as any);
            }
            else {
                if (i < 10)
                    day.push((<li><button onClick={() => { this.setDay(i) }}>0{i}</button></li>) as any);
                else
                    day.push((<li><button onClick={() => { this.setDay(i) }}>{i}</button></li>) as any);
            }

        }
        return day;
    }


    renderCalendario(usuarios: Evento[], invitation : Evento[]) {
        var listaDias = Array<number>();
        usuarios.map(dias => {
            listaDias.push(new Date(dias.fecha.toString()).getDate());
        });
        invitation.map(dias => {
            listaDias.push(new Date(dias.fecha.toString()).getDate());
        });
        let day = [];
        var today = new Date();
        var DayToday = today.getDate();
        for (let i: number = 1; i <= 31; i++) {
            if (i == DayToday) {
                if (i < 10)
                    day.push((<li><button className="active" onClick={() => { this.setDay(i) }}>0{i}</button></li>) as any);
                else
                    day.push((<li><button className="active" onClick={() => { this.setDay(i) }}>{i}</button></li>) as any);
            }
            else if (listaDias.indexOf(i) != -1) {
                if (i < 10)
                    day.push((<li><button className="event" onClick={() => { this.setDay(i) }}>0{i}</button></li>) as any);
                else
                    day.push((<li><button className="event" onClick={() => { this.setDay(i) }}>{i}</button></li>) as any);
            }
            else {
                if (i < 10)
                    day.push((<li><button onClick={() => { this.setDay(i) }}>0{i}</button></li>) as any);
                else
                    day.push((<li><button onClick={() => { this.setDay(i) }}>{i}</button></li>) as any);
            }

        }
        return day;
    }

    //funcion que elimina un determinado evento
    public static eliminar(id: number): void {
        axios.delete('http://localhost:55555/api/events/' + id)
            .then(res => {
                console.log(res);
                console.log(res.data);
            });
        window.location.reload()
    }

    //Metodo que se encargara de hacer el horario en funcu�n del d�a 
    private static renderTabla(usuarios: Evento[], invitacion: Evento[], dia: number) {

        var eventoPorDia = new Array<Evento>();
        usuarios.map(evento => {
            var day = new Date(evento.fecha.toString()).getDate();
            if (dia == day) {
                eventoPorDia.push(evento);
            }
        });

        invitacion.map(evento => {
            var day = new Date(evento.fecha.toString()).getDate();
            if (dia == day) {
                eventoPorDia.push(evento);
            }
        });/*
        let devolucion = [];
        if (eventoPorDia.length > 0) {
            devolucion.push((<tbody>) as any);
                for(let i : number = 0; i < eventoPorDia.length; i++){

                } 
            devolucion.push((</tbody>) as any);

        }*/
        eventoPorDia.sort(function (a, b) {
            if (a.horaInicio < b.horaInicio) return 0;
            else return 1;
        });

        if (eventoPorDia.length > 0) {
            return <tbody>
                {eventoPorDia.map(users =>
                    <tr>
                        <th scope="row">{new Date(users.horaInicio.toString()).getHours()}:{new Date(
                            users.horaInicio.toString()).getMinutes()} -
                               {new Date(users.horaFin.toString()).getHours()}:{
                                new Date(users.horaFin.toString()).getMinutes()}</th>
                        <td>{users.nombre}</td>
                        <td>{users.descripcion}</td>
                        <td>{users.direccion}</td>
                        {(users.usuarioId == 1) ? < td > <button className="active" onClick={() => { Home.eliminar(users.id); }}>Borrar</button></td> : null}
                    </tr>
                )}
            </tbody>;
        } else {
            return <tbody>
                <tr>No hay eventos hoy</tr>
            </tbody>;
        }
    }

    /*Seccion de control de cambios dentro del formulario*/

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

    validarHoras() {
        var inicioAntesquefin = false;
        var puedeInsertarse = true;
        if (this.state.horaInicio > this.state.horaFin) {
            inicioAntesquefin = true;
        }
        else {
            puedeInsertarse = false;
        }
        if (inicioAntesquefin) {
            var eventoPorDia = new Array<Evento>();
            this.state.events.map(evento => {
                var day = new Date(evento.fecha.toString()).getDate();
                if (this.state.daySet == day) {
                    eventoPorDia.push(evento);
                }
            });
            this.state.invitaciones.map(evento => {
                var day = new Date(evento.fecha.toString()).getDate();
                if (this.state.daySet == day) {
                    eventoPorDia.push(evento);
                }
            });
            puedeInsertarse = true;
            eventoPorDia.map(evento => {
                if (this.state.horaInicio >= evento.horaInicio && this.state.horaInicio <= evento.horaFin) {
                    puedeInsertarse = false;
                }
                if (this.state.horaFin >= evento.horaInicio && this.state.horaFin <= evento.horaFin) {
                    puedeInsertarse = false;
                }
            });
        }
        return puedeInsertarse;
    }

    /*Control de la subida e insercion del evento*/
    handleSubmmit = (event: any) => {
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

        var fecha = new Date();
        fecha.setDate(this.state.daySet);
        fecha.setMonth(7);
        fecha.setFullYear(2018);

        eventojson.nombre = this.state.nombreEvento;
        eventojson.desc = this.state.descripcion;
        eventojson.direccion = this.state.direccion;
        eventojson.fecha = fecha;
        eventojson.horaInicio = this.state.horaInicio;
        eventojson.horafin = this.state.horaFin;
        eventojson.prioridad = this.state.prioridad;
        eventojson.visibilidad = this.state.visibilidad;

        var subida = JSON.stringify(eventojson);

        if (this.validarHoras) {
            axios.post('http://localhost:55555/api/events', subida,
                {
                    headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" }
                }).then(res => {
                    console.log(res);
                    console.log(res.data);
                })

            console.log(JSON.stringify(eventojson));
        }
        else {
            console.log("no se han podido insertar las horas");
        }
    }

    /*Creación del formulario*/
    formularioInsertarEvento() {
        return <div className="form-style-6">
            <h1>Nuevo Evento</h1>
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
                <input type="submit" value="Send" />
                </form>
            </div>;
    }


    public render() {

        
        let eventos = (this.state.loadingEvent && this.state.loadingInvitaciones)
            ? <p><em>Loading...</em></p>
            : Home.renderTabla(this.state.events, this.state.invitaciones, this.state.daySet);

        let calendar = (this.state.loadingEvent && this.state.loadingInvitaciones)
            ? <p><em>Loading...</em></p>
            : this.renderCalendario(this.state.events, this.state.invitaciones);

        return <div>
            <div className="Calendario">
                <div className="month">
                    <ul>
                        <li className="prev">&#10094;</li>
                        <li className="next">&#10095;</li>
                        <li>{this.mes}  {this.anio}</li>
                    </ul>
                </div>

                <ul className="weekdays">
                    <li>Mo</li>
                    <li>Tu</li>
                    <li>We</li>
                    <li>Th</li>
                    <li>Fr</li>
                    <li>Sa</li>
                    <li>Su</li>
                </ul>
                <ul className="days">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    {calendar}


                </ul>

            </div>

            <div className="Dia" id="Dia">
                <strong>Dia {this.state.daySet} de {this.mes} de {this.anio}</strong>

                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Hora</th>
                            <th scope="col">Titulo</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Lugar</th>
                        </tr>
                    </thead>
                    {eventos}
                </table>
                <button className="active" onClick={() => { this.muestraUOcultaForm(); }}>Agregar Evento</button>
                {this.state.showForm ? this.formularioInsertarEvento() : null}

            </div>

        </div>;
    }

    muestraUOcultaForm() {
        if (this.state.showForm) {
            this.setState({ showForm: false })
        }
        else {
            this.setState({ showForm: true })
        }
    }

    setDay(numero: number) {
        this.setState({
            daySet: numero
        });
        //this.daySet = numero;
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

