import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import axios from 'axios';
import { ApiUrlRepository } from './ApiUrlMiddle/ApiUrlRepository';

interface DaySet {
    id: number,
    loadingId: boolean,
    daySet: number,
    users: User[],
    loadingUser: boolean,
    friends: User[],
    loadingFriend : boolean,
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
    validHoraInicio: boolean;
    horaFin: Date;
    validHoraFin: boolean;
    prioridad: number;
    visibilidad: boolean;
    validFrom: boolean;
    showForm: boolean;
    eventoEditandose: number;
    showEdicion: boolean;
    showEvent: boolean;
    showInvitacion: boolean;
    amigo: number;
    listaInvitados : String[];
}


export class Home extends React.Component<RouteComponentProps<{}>, DaySet> {


    mes = "Agosto";
    anio = 2018;
    eventos = [1, 4, 12];
    usuario = 1;

    //daySet = 25;


    constructor() {
        super();
        this.state = {
            id: 0,
            loadingId:true,
            daySet: new Date().getDate(),
            users: [],
            loadingUser: true,
            friends: [],
            loadingFriend : true,
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
            validHoraInicio : true,
            horaFin: new Date,
            validHoraFin : true,
            prioridad: 0,
            visibilidad: false,
            validFrom : true,
            showForm: false,
            eventoEditandose: 0,
            showEdicion: false,
            showEvent: false,
            showInvitacion: false,
            amigo: 1,
            listaInvitados: [],
        };

        this.loadId();
        
        //this.loadUsers();
        
        //this.loadEvents();
        
        //this.loadInvitaciones();
        
        //this.loadFriends();

        

        (this.state.loadingEvent && this.state.loadingInvitaciones)
            ? <p><em>Loading...</em></p>
            : this.listaDias();

        

    }
    /*
    componentDidUpdate() {
        this.loadEvents();
        this.loadInvitaciones();
    }*/
    

    listaDias() {
        this.state.events.map(evento => {
            this.state.diasEventos.push(evento.fecha.getDate());
            console.log(evento.fecha.getDate());
        });
        this.state.invitaciones.map(evento => {
            this.state.diasEventos.push(evento.fecha.getDate());
        });
    }

    loadId() {
        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.token);
        console.log(sessionStorage.getItem("token"));
        fetch(dir + '/' + sessionStorage.getItem("token"))
            .then(response => response.json())
            .then(data => {
                this.setState({ id: data, loadingId: false });
                console.log("El valor es :");
                console.log(data);
                console.log(this.state.id);
                this.loadEvents();
                this.loadFriends();
                this.loadInvitaciones();
                this.loadUsers();
                console.log("hola");
            }).catch(error => console.log(error));
    }

    loadUsers() {
        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.getSpecificUser);
        fetch(dir + '/Afro')
            .then(response => response.json() as Promise<User[]>)
            .then(data => {
                this.setState({ users: data, loadingUser: false });
            }).catch(error => console.log(error));
    }

    loadFriends() {
        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.getFriends);
        fetch(dir+'/'+this.state.id.toString())
            .then(response => response.json() as Promise<User[]>)
            .then(data => {
                this.setState({ friends: data, loadingFriend: false });
            }).catch(error => console.log(error));

    }

    loadEvents() {
        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.getSpecificEvent);
        console.log(dir + '/' + this.state.id.toString());
        fetch(dir + '/' + this.state.id.toString())
            .then(response => response.json() as Promise<Evento[]>)
            .then(data => {
                this.setState({ events: data, loadingEvent: false });
            });
    }
    loadInvitaciones() {
        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.getEventoInvitado);
        fetch(dir + '/' + this.state.id)
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
                if (i < DayToday) {
                    if (i < 10)
                        day.push((<li><button className="passed" onClick={() => { this.setDay(i) }}>0{i}</button></li>) as any);
                    else
                        day.push((<li><button className="passed" onClick={() => { this.setDay(i) }}>{i}</button></li>) as any);
                }
                else {
                    if (i < 10)
                        day.push((<li><button className="event" onClick={() => { this.setDay(i) }}>0{i}</button></li>) as any);
                    else
                        day.push((<li><button className="event" onClick={() => { this.setDay(i) }}>{i}</button></li>) as any);
                    }
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
    eliminar(id: number) {
        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.eliminarEvento);
        axios.delete(dir + id)
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

        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.editEvent);

        axios.put(dir + this.state.eventoEditandose, subida,
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
        this.setState({events : Lista});
    }

    formularioEdicion() {
        var texto = "2018-07-02";
        var fecha = new Date(this.state.fecha.toString());
        var year = fecha.getFullYear();
        //console.log(year);
        var mes = 8;
        //console.log(mes);
        var day = fecha.getDate();
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
        /*
        var nuevafecha = new Date(datedevolucion);
        var nuevahorainicio = new Date(horafindevolucion);
        var nuevahorafin = new Date(horafindevolucion);
        this.setState({ fecha: nuevafecha });
        this.setState({ horaInicio: nuevahorainicio });
        this.setState({ horaFin: nuevahorafin });
        console.log(this.state.fecha);
        console.log(this.state.horaInicio);
        console.log(this.state.horaFin);
        */
        console.log(datedevolucion);
        console.log(this.state.horaInicio.toString());
        //console.log(day);
        //console.log(fecha);
        //console.log(fecha.toLocaleDateString())
        return <form onSubmit={this.handleEdit}>
            <label>
                Fecha
                    <input id="date" type="date" value={datedevolucion} onChange={this.handleDateChange} />
            </label>
            <label>
                Hora de inicio
                    <input id="horaInicio" /*value={horainiciodevolucion}*/ type="time" name="hora" max="23:59" min="00:00" onChange={this.handleInicioChange} />
            </label>
            <label>
                Hora de fin
                    <input id="horaInicio" /*value={horafindevolucion}*/ type="time" name="hora" max="23:59" min="00:00" onChange={this.handleFinChange} />
            </label>

            <button type="submit">Editar</button>
        </form>;

    }

    

    invitarAmigo = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        interface IPair {
            idEvento: number,
            idUsuario : number,
        };

        var inv: IPair = {
            idEvento: 0,
            idUsuario: 0,
        };

        inv.idEvento = this.state.eventoEditandose;
        inv.idUsuario = this.state.amigo;

        var subida = JSON.stringify(inv);

        console.log(inv.idEvento);
        console.log(inv.idUsuario);

        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.shareEvent);

        axios.post(dir,
            subida,
            {
                headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" }
            }).then(res => {
            console.log(res);
            console.log(res.data);
            });
        this.setState({ showInvitacion : false});
    }


    formularioInvitacion() {
        return <form onSubmit={this.invitarAmigo}>
            <select onChange={this.handleFriendChange}>
                {this.invitacion()}
            </select>
                   <button type="submit">invitar</button>
               </form>;
    }

    //Metodo que se encargara de hacer el horario en funcu�n del d�a 
    renderTabla(usuarios: Evento[], invitacion: Evento[], dia: number) {

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
        let devolucion = [];

        if (eventoPorDia.length > 0) {
            for (let i: number = 0; i < eventoPorDia.length; i++) {
                var horaInicio = new Date(eventoPorDia[i].horaInicio.toString()).getHours();
                var minutosInicio = new Date(eventoPorDia[i].horaInicio.toString()).getMinutes();
                var horafin = new Date(eventoPorDia[i].horaFin.toString()).getHours();
                var minutosfin = new Date(eventoPorDia[i].horaFin.toString()).getMinutes();
                var hora = "";
                if (horaInicio < 10)
                    hora += 0;
                hora += horaInicio+":";
                if (minutosInicio < 10)
                    hora += 0;
                hora += minutosInicio + "-";
                if (horafin < 10)
                    hora += 0;
                hora += horafin + ":";
                if (minutosfin < 10)
                    hora += 0;
                hora += minutosfin;
                devolucion.push((<tr>
                    <th scope="row">{hora}</th>
                    <td>{eventoPorDia[i].nombre}</td>
                    <td>{eventoPorDia[i].descripcion}</td>
                    <td>{eventoPorDia[i].direccion}</td>
                    {(eventoPorDia[i].usuarioId == this.state.id) ? <td> <button className="glyphicon glyphicon-trash" onClick={() => { this.eliminar(eventoPorDia[i].id) }}></button></td> : null}
                    {(eventoPorDia[i].usuarioId == this.state.id) ? <td> <button className="glyphicon glyphicon-eye-open" onClick={() => { this.verEvento(eventoPorDia[i].id) }}></button></td> : null}
                    {(eventoPorDia[i].usuarioId != this.state.id) ? <td> <button className="glyphicon glyphicon-remove" onClick={() => { this.cancelarAsistencia(1, eventoPorDia[i].id) }}></button></td> : null}
                </tr>) as any);
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

    invitacion() {
        let devolucion = [];
        console.log(this.state.friends.length);
        for (let i: number = 0; i < this.state.friends.length; i++) {
            devolucion.push((<option value={this.state.friends[i].id}>{this.state.friends[i].nombreUsuario}</option>) as any);
            console.log(this.state.friends[i].id);
        }
        return devolucion;

    }

    /*Cancelar la asistencia a un evento*/
    cancelarAsistencia(idUsuario: number, idEvento: number) {
        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.cancelarEvento);
        axios.delete(dir + idUsuario + '/' + idEvento)
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
        /*
        if (this.validarHoraInicio())
            this.setState({ validHoraInicio: false });
        else {
            this.setState({ validHoraInicio: true });
        }*/
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
    handleFriendChange = (event: any) => {
        this.setState({ amigo: event.target.value });
    }



    validarHoraInicio() {
        var puedeInsertarse = true;
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
        var hora = new Date(this.state.horaInicio.toString()).getHours();
        eventoPorDia.map(evento => {
            var horaInicio = new Date(evento.horaInicio.toString()).getHours();
            var horaFin = new Date(evento.horaFin.toString()).getHours();
            console.log(hora);
            console.log(horaInicio);
            console.log(horaFin);
            if (hora >= horaInicio && hora <= horaFin) {
                puedeInsertarse = false;
            }
        });
        return puedeInsertarse;
    }

    /*Control de la subida e insercion del evento*/
    handleSubmmit = (event: any) => {

        event.preventDefault();
        event.stopPropagation();

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
            idUsuarioDuenio: this.state.id,
    }

        

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



        var eventoMuestra: Evento = {
            id: 0,
            nombre: this.state.nombreEvento,
            descripcion: this.state.descripcion,
            direccion: this.state.direccion,
            horaInicio: horaInicio,
            horaFin: horaFin,
            fecha: fecha,
            prioridad: this.state.prioridad,
            visibilidad: this.state.visibilidad,
            createDate: new Date(),
            usuarioId: this.state.id,
        }

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

        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.postSpecificEvent);
        axios.post(dir,
            subida,
            {
                headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" }
            }).then(res => {
            console.log(res);
            console.log(res.data);
            });

        var Lista: Evento[] = [];
        this.state.events.map(evento => {
            Lista.push(evento);
        });
        Lista.push(eventoMuestra);
        this.setState({ events: Lista });
        this.cancelForm();
        //this.state.events.push(eventoMuestra);

        //console.log(JSON.stringify(eventojson));
    }

    cancelForm() {
        this.setState({showForm : false});
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
                        {(!this.state.validHoraInicio) ? <p>Hora de inicio no valida</p> : null}
                        <input id="horaInicio" type="time" name="hora" max="23:59" min="00:00" onChange={this.handleInicioChange} />
                </label>
                <label>
                    Hora de fin
                        {(!this.state.validHoraFin) ? <p>Hora de fin no valida</p> : null}
                    <input id="horaInicio" type="time" name="hora" max="23:59" min="00:00" onChange={this.handleFinChange} />
                </label>
                <label>
                    Prioridad
                        <input type="number" id="prio" min="0" max="1" onChange={this.handlePrioridadChange} />
                </label>
                <label>
                    Visibilidad
                        <input id="visibilidad" type="checkbox" name="vehicle" value="true" onChange={this.handleVisibilidadChange} />
                </label>
                <input type="submit" disabled={!this.state.validFrom} value="Send" />
                </form>
            </div>;
    }


    viewPorEvento(idEvento: number) {

        var event: Evento = this.state.events[0];
        this.state.events.map(evento => {
            if (this.state.eventoEditandose == evento.id) {
                event = evento;
            }
        });
        return <div>
            <table className="table">
                <th>
                    <td><button className="active" onClick={() => { this.mostrarInvitacion(); }}>Invitar</button></td>
                    <td><button className="active" onClick={() => { this.mostrarEdicion(event.id, event.fecha, event.horaInicio, event.horaFin) }}>Editar</button></td>
                    <td><button className="active" onClick={() => { this.verEvento(0) }}>Ocultar</button></td>
                </th>
            </table>

            {(!this.state.showEdicion && !this.state.showInvitacion) ? <table className="table">
                
                <tr>
                    <td>{event.nombre}</td>
                </tr>
                <tr>
                    <td>{event.descripcion}</td>
                </tr>
                <tr>
                    <td>{event.direccion}</td>
                </tr>
            </table> : null}
            {(this.state.showEdicion && !this.state.showInvitacion) ? this.formularioEdicion() : null}
            {(this.state.showInvitacion && !this.state.showEdicion) ? this.formularioInvitacion() : null}
            </div>;
    }

    verEvento(id : number) {
        if (this.state.showEvent) {
            this.setState({ showEvent: false });
            this.setState({ showEdicion: false });
            this.setState({ showInvitacion: false });
        }
        else {
            this.setState({ showEvent: true });
            this.setState({ eventoEditandose: id });
        }
    }

    mostrarInvitacion() {
        if (this.state.showInvitacion) {
            this.setState({ showInvitacion: false });
        }
        else {
            this.setState({ showInvitacion: true });
            this.setState({showEdicion : false});
        }
    }

    mostrarEdicion(id: number, _fecha: Date, _horaInicio: Date, _horaFin: Date) {
        if (this.state.showEdicion) {
            this.setState({ showEdicion: false });
        }
        else {
            this.setState({ fecha: _fecha });
            this.setState({ horaInicio: _horaInicio });
            this.setState({ horaFin: _horaFin });
            this.setState({ eventoEditandose: id });
            this.setState({ showEdicion: true });
            this.setState({ showInvitacion: false });
        }
    }


    public render() {

        
        let eventos = (this.state.loadingEvent && this.state.loadingInvitaciones && this.state.loadingFriend && this.state.loadingId)
            ? <p><em>Loading...</em></p>
            : this.renderTabla(this.state.events, this.state.invitaciones, this.state.daySet);

        let calendar = (this.state.loadingEvent && this.state.loadingInvitaciones && this.state.loadingId)
            ? <p><em>Loading...</em></p>
            : this.renderCalendario(this.state.events, this.state.invitaciones);

        
        let cerca = (this.state.loadingEvent)
            ? null
            : this.muestraCercania(this.state.events);
        

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
                    <li>Lunes</li>
                    <li>Martes</li>
                    <li>Miércoles</li>
                    <li>Jueves</li>
                    <li>Viernes</li>
                    <li>Sábado</li>
                    <li>Domingo</li>
                </ul>
                <ul className="days">
                    <li></li>
                    <li></li>
                    {calendar}


                </ul>

            </div>

            <div className="Dia" id="Dia">
                <strong>{this.state.daySet} de {this.mes} de {this.anio}</strong>
                {this.state.showEvent ? this.viewPorEvento(this.state.eventoEditandose) : null}

                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Hora</th>
                            <th scope="col">Título</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Lugar</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    {eventos}
                </table>
                
                

                <button className="active" onClick={() => { this.muestraUOcultaForm(); }}>Agregar Evento</button>
                
                {this.state.showForm ? this.formularioInsertarEvento() : null}


                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th scope="col">Eventos cercanos</th>
                    </tr>
                    </thead>
                </table>

                {cerca}
                

            </div>

        </div>;
    }


    muestraCercania( eventos : Evento[]) {
        var event: Evento = eventos[0];
        var dia: number = 0;
        let devolucion = [];
        this.state.events.map(evento => {
            var day = new Date(evento.fecha.toString()).getDate();
            if (day > this.state.daySet) {
                event = evento;
                dia = day;
            }
        });

        if (dia > this.state.daySet) {
            console.log("la lista de eventos es:");
            console.log(event.nombre);
            
            var horaInicio = new Date(event.horaInicio.toString()).getHours();
            var minutosInicio = new Date(event.horaInicio.toString()).getMinutes();
            var horafin = new Date(event.horaFin.toString()).getHours();
            var minutosfin = new Date(event.horaFin.toString()).getMinutes();
            var hora = "";
            if (horaInicio < 10)
                hora += 0;
            hora += horaInicio + ":";
            if (minutosInicio < 10)
                hora += 0;
            hora += minutosInicio + "-";
            if (horafin < 10)
                hora += 0;
            hora += horafin + ":";
            if (minutosfin < 10)
                hora += 0;
            hora += minutosfin;
            devolucion.push((<tr>
                                 <th scope="row">{dia}</th>
                                 <td>{hora}</td>
                                 <td>{event.nombre}</td>
                                 <td>{event.descripcion}</td>
                                 <td>{event.direccion}</td>
                             </tr>) as any);
        } 

       
        return devolucion;
    }

    muestraUOcultaForm() {
        if (this.state.showForm) {
            this.setState({ showForm: false });
        }
        else {
            this.setState({ showForm: true });
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

