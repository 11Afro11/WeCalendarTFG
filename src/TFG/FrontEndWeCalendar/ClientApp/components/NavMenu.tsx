import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { ApiUrlRepository } from './ApiUrlMiddle/ApiUrlRepository';
//import ApiUrlRepository1 = ApiUrlRepository.ApiUrlRepository;
import axios from 'axios';

interface Show {
    pendientes: Evento[],
    loadingPendientes: boolean,
    usuario: User[],
    loadingUser : boolean,
    id: number;
    loadId: boolean;
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

export class NavMenu extends React.Component<{}, Show> {

    constructor() {
        super();
        this.state = {
            pendientes: [],
            loadingPendientes: true,
            usuario: [],
            loadingUser: true,
            id: 0,
            loadId: true,
        };

        fetch('http://localhost:11111/api/events/pendientes/1')
            .then(response => response.json() as Promise<Evento[]>)
            .then(data => {
                this.setState({ pendientes: data, loadingPendientes: false });
            });
        this.loadId();



        //sessionStorage.setItem("contadorPendiente" , this.state.pendientes.length.toString());
    }

    loadId() {
        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.token);
        console.log(sessionStorage.getItem("token"));
        fetch(dir + '/' + sessionStorage.getItem("token"))
            .then(response => response.json())
            .then(data => {
                this.setState({ id: data, loadId: false });
                console.log("El valor es :");
                console.log(data);
                console.log(this.state.id);
                this.loadUser();
                console.log("hola");
            }).catch(error => console.log(error));
    }

    loadUser() {
        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.user);
        fetch(dir + '/' + this.state.id)
            .then(response => response.json())
            .then(data => {
                this.setState({ usuario: data, loadingUser: false });
                console.log("hola");
                console.log(this.state.usuario[0].nombreUsuario);
            }).catch(error => console.log(error));
    }

    enlaceAPendientes() {
        let pendiente = [];
        sessionStorage.setItem("contadorPendiente", this.state.pendientes.length.toString());
        if (this.state.pendientes.length > 0) {
            pendiente.push((
                <li>
                    <NavLink to={'/pendientes'} activeClassName='active'>
                        <span className='glyphicon glyphicon-bell'></span>{sessionStorage.getItem("contadorPendiente")}
                            </NavLink>
                </li>) as any);
            return pendiente;
        }
        else {
            return null;
        }
    }

    userLink() {
        let user = [];
        user.push((
            <li>
                <NavLink to={'/user'} activeClassName='active'>
                    <span className='glyphicon glyphicon-user'></span> {this.state.usuario[0].nombreUsuario}
                </NavLink>
            </li>) as any);
        return user;
    }

    public render() {
        let pendientes = this.state.loadingPendientes
            ? <p><em>Loading...</em></p>
            : this.enlaceAPendientes();
        let usuario = this.state.loadingUser
            ? <p><em>Loading...</em></p>
            : this.userLink();

        return <div className='main-nav'>
                <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={ '/' }>We Calendar</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        {usuario}
                        <li>
                            <NavLink to={ '/' } exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Home
                            </NavLink>
                            <ul>
                                {pendientes}
                            </ul>
                        </li>
                        
                        <li>
                            <NavLink to={ '/notas' } activeClassName='active'>
                                <span className='glyphicon glyphicon-edit'></span> Notas
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/chat' } activeClassName='active'>
                                <span className='glyphicon glyphicon-comment'></span> Chat
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/evento'} activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Eventos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="#" activeClassName='active'>
                                <button className='glyphicon glyphicon-log-out' onClick={() => { this.logout(); }}> Salir</button> 
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }

    logout() {
        sessionStorage.removeItem("token");
        window.location.reload();
    }
}
