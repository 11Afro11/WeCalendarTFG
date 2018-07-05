import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

interface Show {
    pendientes: Evento[],
    loadingPendientes : boolean,
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

export class NavMenu extends React.Component<{}, Show> {

    constructor() {
        super();
        this.state = {
            pendientes: [],
            loadingPendientes : true,
        };
        fetch('http://localhost:55555/api/events/pendientes/1')
            .then(response => response.json() as Promise<Evento[]>)
            .then(data => {
                this.setState({ pendientes: data, loadingPendientes: false });
            });
    }

    enlaceAPendientes() {
        let pendiente = []
        if (this.state.pendientes.length > 0) {
            pendiente.push((
                <li>
                    <NavLink to={'/pendientes'} activeClassName='active'>
                        <span className='glyphicon glyphicon-education'></span> Pendientes {this.state.pendientes.length

                        }
                            </NavLink>
                </li>) as any);
            return pendiente;
        }
        else {
            return null;
        }
        
        
    }

    public render() {
        let pendientes = this.state.loadingPendientes
            ? <p><em>Loading...</em></p>
            : this.enlaceAPendientes();

        return <div className='main-nav'>
                <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={ '/' }>FrontEndWeCalendar</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink to={ '/' } exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Home
                            </NavLink>
                        </li>
                        {pendientes}
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
