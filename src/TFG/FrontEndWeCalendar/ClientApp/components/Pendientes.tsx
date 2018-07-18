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
    pendientes: Evento[],
    loadingPendientes: boolean,
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
    eventoEditandose: number;
    showEdicion: boolean;
}


export class Pendientes extends React.Component<RouteComponentProps<{}>, DaySet> {


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
            pendientes: [],
            loadingPendientes: true,
            diasEventos: [],
            nombreEvento: '',
            descripcion: '',
            direccion: '',
            fecha: new Date,
            horaInicio: new Date,
            horaFin: new Date,
            prioridad: 0,
            visibilidad: false,
            showForm: false,
            eventoEditandose: 0,
            showEdicion: false,
        };
        sessionStorage.setItem("token", "weeeeee");

        this.loadUsers();

        this.loadEvents();
        
        this.loadInvitaciones();

        this.loadPendientes();

        /*(this.state.loadingEvent && this.state.loadingInvitaciones)
            ? <p><em>Loading...</em></p>
            : this.listaDias();*/

        

    }
    /*
    componentDidUpdate() {
        this.loadEvents();
        this.loadInvitaciones();
    }*/
    

    listaDias() {
        this.state.pendientes.map(evento => {
            this.state.diasEventos.push(evento.fecha.getDate());
            console.log(evento.fecha.getDate());
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

    loadPendientes() {
        fetch('http://localhost:55555/api/events/pendientes/1')
            .then(response => response.json() as Promise<Evento[]>)
            .then(data => {
                this.setState({ pendientes: data, loadingPendientes: false });
            });
    }


    //M�todo que crea el calendario de manera dn�mica
    /*
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
    }*/


    renderCalendario(pendientes : Evento[]) {
        var listaDias = Array<number>();
        pendientes.map(dias => {
            listaDias.push(new Date(dias.fecha.toString()).getDate());
        });
        //listaDias.push(3);
        let day = [];
        /*if (pendientes.length <= 0) {
            return <h1>No se carga el evento pendiente</h1>;
        }*/
        //else {
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
                        day.push((<li><button className="pendiente" onClick={() => { this.setDay(i) }}>0{i}</button></li>) as any);
                    else
                        day.push((<li><button className="pendiente" onClick={() => { this.setDay(i) }}>{i}</button></li>) as any);
                }
                else {
                    if (i < 10)
                        day.push((<li><button onClick={() => { this.setDay(i) }}>0{i}</button></li>) as any);
                    else
                        day.push((<li><button onClick={() => { this.setDay(i) }}>{i}</button></li>) as any);
                }

            }
            return day;
        //}
        
    }

    //funcion que elimina un determinado evento
    eliminar(id: number) {
        axios.delete('http://localhost:55555/api/events/' + id)
            .then(res => {
                console.log(res);
                console.log(res.data);
            });
        var Lista: Evento[] = [];
        this.state.events.map(evento => {
            Lista.push(evento);
        });

        var borrar: Evento = this.state.events[0];
        Lista.map(evento => {
            if (evento.id == id)
                borrar = evento;
        });
        var indice = Lista.indexOf(borrar);
        Lista.splice(indice);
        this.setState({ events: Lista });
    }

    mostrarEdicion(id: number, _fecha : Date, _horaInicio : Date, _horaFin : Date) {
        if (this.state.showEdicion) {
            this.setState({ showEdicion: false });
        }
        else {
            this.setState({ fecha: _fecha });
            this.setState({ horaInicio: _horaInicio });
            this.setState({ horaFin: _horaFin });
            this.setState({ eventoEditandose: id });
            this.setState({ showEdicion: true });
        }
    }

    handleEdit = (event: any) => {

        event.preventDefault();
        event.stopPropagation();

        interface eventJson {
            fecha: Date,
            horaInicio: Date,
            horafin: Date,
        };

        var eventojson: eventJson = {
            fecha: new Date,
            horaInicio: new Date,
            horafin: new Date,
        }

        eventojson.horaInicio = this.state.horaInicio;
        eventojson.horafin = this.state.horaFin;
        eventojson.fecha = this.state.fecha;



        var subida = JSON.stringify(eventojson);

        axios.put('http://localhost:55555/api/events/' + this.state.eventoEditandose, subida,
            {
                headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" }
            }).then(res => {
                console.log(res);
                console.log(res.data);
            });

        var fecha = new Date();
        fecha.setDate(this.state.daySet);
        fecha.setMonth(7);
        fecha.setFullYear(2018);
        var hora = parseInt(this.state.horaInicio.toString().substring(0, 2));
        var minutos = parseInt(this.state.horaInicio.toString().substring(3, 5));

        var horaFinn = parseInt(this.state.horaFin.toString().substring(0, 2));
        var minutosFin = parseInt(this.state.horaFin.toString().substring(3, 5));
        //console.log(nuevaHora);
        var horaInicio = new Date();
        horaInicio.setHours(hora);
        horaInicio.setMinutes(minutos);
        var horaFin = new Date();
        horaFin.setHours(horaFinn);
        horaFin.setMinutes(minutosFin);


        var edicion = this.state.events[0];
        var Lista: Evento[] = [];
        this.state.events.map(evento => {
            Lista.push(evento);
            if (evento.id == this.state.eventoEditandose)
                edicion = evento;
        });
        var indice = Lista.indexOf(edicion);
        Lista[indice].horaInicio = horaInicio;
        Lista[indice].horaFin = horaFin;
        Lista[indice].fecha = fecha;
        this.setState({ events: Lista });
    }

    formularioEdicion() {
        var texto = "2018-07-02";
        var fecha = new Date(this.state.fecha.toString());
        var year = fecha.getFullYear();
        //console.log(year);
        var mes = fecha.getUTCMonth();
        //console.log(mes);
        var day = fecha.getUTCDate();
        var datedevolucion = "";
        datedevolucion = datedevolucion + year + "-";
        if (mes < 10)
            datedevolucion = datedevolucion + 0;
        datedevolucion += mes + "-";
        if (day < 10)
            datedevolucion += 0;
        datedevolucion += day;

        var horaInicio = new Date(this.state.horaInicio.toString());
        var horainiciodevolucion = "";
        var hora = horaInicio.getHours();
        var minutos = horaInicio.getMinutes();
        if (hora < 10)
            horainiciodevolucion += 0;
        horainiciodevolucion += hora + ":";
        if (minutos < 10)
            horainiciodevolucion += 0;
        horainiciodevolucion += minutos;

        var horaFin = new Date(this.state.horaFin.toString());
        var horafindevolucion = "";
        var hora = horaFin.getHours();
        var minutos = horaFin.getMinutes();
        if (hora < 10)
            horafindevolucion += 0;
        horafindevolucion += hora + ":";
        if (minutos < 10)
            horafindevolucion += 0;
        horafindevolucion += minutos;

        console.log(datedevolucion);
        console.log(this.state.horaInicio.toString());
        //console.log(day);
        //console.log(fecha);
        //console.log(fecha.toLocaleDateString())
        return <form onSubmit={this.handleEdit}>
            <label>
                Fecha
                    <input id="date" type="date" /*value={datedevolucion}*/ onChange={this.handleDateChange} />
            </label>
            <label>
                Hora de inicio
                    <input id="horaInicio" /*value={horainiciodevolucion}*/ type="time" name="hora" max="23:59:00" min="00:00:00" onChange={this.handleInicioChange} />
            </label>
            <label>
                Hora de fin
                    <input id="horaInicio" /*value={horafindevolucion}*/ type="time" name="hora" max="23:59:00" min="00:00:00" onChange={this.handleFinChange} />
            </label>
            <button type="submit">Editar</button>
        </form>;
    }

    comprobarEvento(evento: Evento, eventosPropios: Array<Evento>) {
        var devolucion = true;
        console.log(eventosPropios.length);
        eventosPropios.map(eventoPorDia => {
            var horaInicioComprobar = new Date(evento.horaInicio.toString()).getHours();
            var horaFinComprobar = new Date(evento.horaFin.toString()).getHours();
            var horaInicio = new Date(eventoPorDia.horaInicio.toString()).getHours();
            var horaFin = new Date(eventoPorDia.horaFin.toString()).getHours();
            console.log(horaInicioComprobar);
            console.log(horaFinComprobar);
            console.log(horaInicio);
            console.log(horaFin);

            if (horaInicioComprobar >= horaInicio && horaInicioComprobar <= horaFin) {
                devolucion = false;
                console.log("no se puede insertar");
            }
            if (horaFinComprobar >= horaInicio && horaFinComprobar <= horaFin) {
                devolucion = false;
                console.log("Entra en el segundo if no se puede");
            }

        });
        return devolucion;
    }

    //Metodo que se encargara de hacer el horario en funcu�n del d�a 
    renderTabla(usuarios: Evento[], invitacion: Evento[], pendientes: Evento[], dia: number) {

        var eventoPorDia = new Array<Evento>();
        var eventosValidos = new Array<number>();
        var eventosNoValidos = new Array<number>();
        //añadimos los eventos que tiene nuestro usuario
        usuarios.map(evento => {
            var day = new Date(evento.fecha.toString()).getDate();
            if (dia == day) {
                eventoPorDia.push(evento);
            }
        });

        //Añadimos los eventos a los cuales nos han invitado y vamos a asistir
        invitacion.map(evento => {
            var day = new Date(evento.fecha.toString()).getDate();
            if (dia == day) {
                eventoPorDia.push(evento);
            }
        });

        pendientes.map(evento => {
            if (this.comprobarEvento(evento, eventoPorDia))
                eventosValidos.push(evento.id);
            else
                eventosNoValidos.push(evento.id);
        });

        //Añadimos los eventos a los que hemos sido invitados
        pendientes.map(evento => {
            var day = new Date(evento.fecha.toString()).getDate();
            if (dia == day) {
                eventoPorDia.push(evento);
            }
        });


        /*
        let devolucion = [];
        if (eventoPorDia.length > 0) {
            devolucion.push((<tbody>) as any);
                for(let i : number = 0; i < eventoPorDia.length; i++){

                } 
            devolucion.push((</tbody>) as any);

        }*/
        eventoPorDia.sort(function (a, b) {
            if (a.horaInicio > b.horaInicio) return 0;
            else return 1;
        });
        let devolucion = [];

        if (eventoPorDia.length > 0) {
            for (let i: number = 0; i < eventoPorDia.length; i++) {
                devolucion.push((<tr>
                    {(eventosValidos.indexOf(eventoPorDia[i].id) != -1) ?
                        <th scope="row" className="pendiente">{new Date(eventoPorDia[i].horaInicio.toString()).getHours()}:
                        {new Date(eventoPorDia[i].horaInicio.toString()).getMinutes()}-
                        {new Date(eventoPorDia[i].horaFin.toString()).getHours()}:
                        {new Date(eventoPorDia[i].horaFin.toString()).getMinutes()}</th> : null}

                    {(eventosNoValidos.indexOf(eventoPorDia[i].id) != -1) ?
                        <th scope="row" className="Error">{new Date(eventoPorDia[i].horaInicio.toString()).getHours()}:
                        {new Date(eventoPorDia[i].horaInicio.toString()).getMinutes()}-
                        {new Date(eventoPorDia[i].horaFin.toString()).getHours()}:
                        {new Date(eventoPorDia[i].horaFin.toString()).getMinutes()}</th> : null}      
                    
                    {(eventosNoValidos.indexOf(eventoPorDia[i].id) == -1 && eventosValidos.indexOf(eventoPorDia[i].id) == -1) ?
                        <th scope="row">{new Date(eventoPorDia[i].horaInicio.toString()).getHours()}:
                        {new Date(eventoPorDia[i].horaInicio.toString()).getMinutes()}-
                        {new Date(eventoPorDia[i].horaFin.toString()).getHours()}:
                        {new Date(eventoPorDia[i].horaFin.toString()).getMinutes()}</th> : null}
                    <td>{eventoPorDia[i].nombre}</td>
                    <td>{eventoPorDia[i].descripcion}</td>
                    <td>{eventoPorDia[i].direccion}</td>
                    {(eventoPorDia[i].usuarioId == 1) ? <td> <button className="active" onClick={() => { this.eliminar(eventoPorDia[i].id) }}>Borrar</button></td> : null}
                    {(eventoPorDia[i].usuarioId == 1) ? <td> <button className="active" onClick={() => { this.mostrarEdicion(eventoPorDia[i].id, eventoPorDia[i].fecha, eventoPorDia[i].horaInicio, eventoPorDia[i].horaFin) }}>Editar</button></td> : null}
                    {(this.state.invitaciones.indexOf(eventoPorDia[i]) != -1) ? <td> <button className="active" onClick={() => { this.cancelarAsistencia(1, eventoPorDia[i].id) }}>Borrar</button></td> : null}
                    {(eventosValidos.indexOf(eventoPorDia[i].id) != -1) ? <td> <button className="active" onClick={() => { this.eliminarInvitacion(1, eventoPorDia[i].id) }}>Ignorar</button></td> : null}
                    {(eventosValidos.indexOf(eventoPorDia[i].id) != -1) ? <td> <button className="active" onClick={() => { this.aceptarInvitacion(1, eventoPorDia[i].id) }}>Aceptar</button></td> : null}
                    {(eventosNoValidos.indexOf(eventoPorDia[i].id) != -1) ? <td> <button className="active" onClick={() => { this.eliminarInvitacion(1, eventoPorDia[i].id) }}>Ignorar</button></td> : null}

                </tr>) as any)
                //devolucion.push((this.formularioEdicion()) as any)
            }
            //devolucion.push((<tr></tr>)as any)
            return devolucion;
        }

        /*if (eventoPorDia.length > 0) {
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
                        {(users.usuarioId == 1) ? < td > <button className="active" onClick={() => { Home.eliminar(users.id) }}>Borrar</button></td> : null}
                    </tr>
                    
                )}
                {this.formularioEdicion()}
            </tbody>;
        }*/ else {
            return <tbody>
                <tr>No hay eventos hoy</tr>
            </tbody>;
        }
    }

    eliminarInvitacion(idUsuario: number, idEvento: number) {
        axios.delete('http://localhost:55555/api/events/anularInvitacion/' + idUsuario +'/'+idEvento)
            .then(res => {
                console.log(res);
                console.log(res.data);
            });
        //window.location.reload();
        var Lista: Evento[] = [];
        this.state.pendientes.map(evento => {
            Lista.push(evento);
        });

        var borrar: Evento = this.state.events[0];
        Lista.map(evento => {
            if (evento.id == idEvento)
                borrar = evento;
        });
        var indice = Lista.indexOf(borrar);
        Lista.splice(indice);
        this.setState({ pendientes: Lista });
        if (this.state.pendientes.length <= 0) {
            
        }
    }

    cancelarAsistencia(idUsuario: number, idEvento: number) {
        axios.delete('http://localhost:55555/api/events/cancelarEvento/' + idUsuario + '/' + idEvento)
            .then(res => {
                console.log(res);
                console.log(res.data);
            });
        var Lista: Evento[] = [];
        this.state.invitaciones.map(evento => {
            Lista.push(evento);
        });

        var borrar: Evento = this.state.events[0];
        Lista.map(evento => {
            if (evento.id == idEvento)
                borrar = evento;
        });
        var indice = Lista.indexOf(borrar);
        Lista.splice(indice);
        this.setState({ invitaciones: Lista });
        //window.location.reload();
    }

    aceptarInvitacion(idUsuario: number, idEvento: number) {
        axios.put('http://localhost:55555/api/events/aceptarInvitacion/' + idUsuario + '/' + idEvento)
            .then(res => {
                console.log(res);
                console.log(res.data);
            });

        var eventoMuestra = this.state.events[0];
        this.state.pendientes.map(evento => {
            if (evento.id == idEvento)
                eventoMuestra = evento;
        });

        var Lista: Evento[] = [];
        this.state.pendientes.map(evento => {
            Lista.push(evento);
        });

        var borrar: Evento = this.state.events[0];
        Lista.map(evento => {
            if (evento.id == idEvento)
                borrar = evento;
        });
        var indice = Lista.indexOf(borrar);
        Lista.splice(indice);
        this.setState({ pendientes: Lista });

        var Lista: Evento[] = [];
        this.state.invitaciones.map(evento => {
            Lista.push(evento);
        });
        Lista.push(eventoMuestra);
        this.setState({ invitaciones: Lista });
        if (this.state.pendientes.length <= 0) {
            window.location.reload();
        }
        //this.cancelForm();
        //window.location.reload();
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

        //if (this.validarHoras) {
            axios.post('http://localhost:55555/api/events', subida,
                {
                    headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" }
                }).then(res => {
                    console.log(res);
                    console.log(res.data);
                })

            console.log(JSON.stringify(eventojson));
        //}
        //else {
            //console.log("no se han podido insertar las horas");
        //}
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
            : this.renderTabla(this.state.events, this.state.invitaciones, this.state.pendientes, this.state.daySet);

        let calendar = (this.state.loadingEvent && this.state.loadingInvitaciones)
            ? <p><em>Loading...</em></p>
            : this.renderCalendario(this.state.pendientes);

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
                {this.state.showEdicion ? this.formularioEdicion() : null}

                

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

