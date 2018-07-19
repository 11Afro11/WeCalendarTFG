import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

interface Show {
    pendientes: Evento[],
    loadingPendientes: boolean,
    usuario: User[],
    loadingUser : boolean,

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
            loadingUser : true,
        };
        fetch('http://localhost:11111/api/events/pendientes/1')
            .then(response => response.json() as Promise<Evento[]>)
            .then(data => {
                this.setState({ pendientes: data, loadingPendientes: false });
            });
        fetch('http://localhost:11111/api/Users/Afro')
            .then(response => response.json() as Promise<User[]>)
            .then(data => {
                this.setState({ usuario: data, loadingUser: false });
            });
        //sessionStorage.setItem("contadorPendiente" , this.state.pendientes.length.toString());
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
                <NavLink to={'#'} activeClassName='active'>
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
                            <NavLink to={ '/counter' } activeClassName='active'>
                                <span className='glyphicon glyphicon-education'></span> Counter
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/fetchdata' } activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Fetch data
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}
