import * as React from 'react';
import { RouteComponentProps } from 'react-router';
//import ApiUrlRepository = require("./ApiUrlMiddle/ApiUrlRepository");
import { ApiUrlRepository } from './ApiUrlMiddle/ApiUrlRepository';
//import ApiUrlRepository1 = ApiUrlRepository.ApiUrlRepository;
import axios from 'axios';

interface ChatState {
    id: number;
    loadID: boolean;
    msg: ChatI[];
    loadMsg: boolean;
    msgMostrados: ChatI[];
    chat: number;
    grupo : number;
    texto: string;
    notas: Nota[];
    loadingNota: boolean;
    titulo: string;
    textoNota: string;
    asistentes: Usuario[];
    loadingAsistentes: boolean;
    nombreGrupo: string;
    descGrupo: string;
    activeGrup: number;
    grupos: grupoId[];
    loadingGrupos: boolean;
    tableros: Tablero[];
    loadTableros: boolean;
    displayFormGrupos: boolean;
    friends: User[];
    loadFriends: boolean;
    amigo: number;
    relacion: Relacion[];
    loadRelacion: boolean;
    showMiembros : boolean;
}

export class Chat extends React.Component<RouteComponentProps<{}>, ChatState> {
    constructor() {
        super();
        this.state = {
            id: 0,
            loadID: true,
            msg: [],
            msgMostrados: [],
            loadMsg: true,
            chat: 1,
            grupo: 1,
            texto: "",
            notas: [],
            loadingNota: true,
            titulo: "",
            textoNota: "",
            asistentes: [],
            loadingAsistentes: true,
            nombreGrupo: "",
            descGrupo: "",
            activeGrup: -1,
            grupos: [],
            loadingGrupos: true,
            tableros: [],
            loadTableros: true,
            displayFormGrupos: false,
            friends: [],
            loadFriends: true,
            amigo: 0,
            relacion: [],
            loadRelacion: true,
            showMiembros : false,
    };

        this.loadId();
        this.loadChat();
        this.loadNota();
        this.loadAsistentes();
        //this.listaRelaciones();
        this.loadRelacion();
        

        //this.loadNota();
    }

    loadId() {
        console.log("He entrado en el primero");
        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.token);
        console.log(sessionStorage.getItem("token"));
        fetch(dir + '/' + sessionStorage.getItem("token"))
            .then(response => response.json())
            .then(data => {
                console.log("se ha hecho la llamada");
                this.setState({ id: data, loadID: false });
                console.log("el id es: "+this.state.id);
                console.log("El valor es :");
                console.log(data);
                //this.loadRelacion();
                this.loadChat();
                this.loadGrupos();
                this.loadTableros();
                this.loadFriends();
                
                
            }).catch(error => console.log(error));
    }

    loadFriends() {
        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.getFriends);
        fetch(dir + '/' + this.state.id.toString())
            .then(response => response.json() as Promise<User[]>)
            .then(data => {
                this.setState({ friends: data, loadFriends: false });
            }).catch(error => console.log(error));

    }

    loadChat() {
        console.log("he entrado");
        var dir = ApiUrlRepository.getApiUrl((ApiUrlRepository.getMensajes));
        fetch(dir + '/' + 1)
            .then(response => response.json() as Promise<ChatI[]>)
            .then(data => {
                this.setState({ msg: data,  loadMsg: false });
                console.log("El valor es :");
                console.log(data);
            }).catch(error => console.log(error));
    }

    loadNota() {
        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.allNotas);
        fetch(dir)
            .then(response => response.json() as Promise<Nota[]>)
            .then(data => {
                this.setState({ notas: data, loadingNota: false });
            }).catch(error => console.log(error));
    }

    loadAsistentes() {
        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.getParticipantes);
        fetch(dir + '/' + 1)
            .then(response => response.json() as Promise<Usuario[]>)
            .then(data => {
                this.setState({ asistentes: data, loadingAsistentes: false });
            }).catch(error => console.log(error));
        console.log(this.state.asistentes);
    }
    loadGrupos() {
        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.listaGrupos);
        fetch(dir + '/' + this.state.id)
            .then(response => response.json() as Promise<grupoId[]>)
            .then(data => {
                this.setState({ grupos: data, loadingGrupos: false });
            }).catch(error => console.log(error));
        console.log(this.state.asistentes);
    }

    loadTableros() {
        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.getTablero);
        fetch(dir)
            .then(response => response.json() as Promise<Tablero[]>)
            .then(data => {
                this.setState({ tableros: data, loadTableros: false});
            }).catch(error => console.log(error));
        console.log(this.state.asistentes);
    }
    loadRelacion() {
        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.relacionGrupo);
        fetch(dir)
            .then(response => response.json() as Promise<Relacion[]>)
            .then(data => {
                this.setState({ relacion: data, loadRelacion: false });
            }).catch(error => console.log(error));
        console.log("la relacion");
        console.log(this.state.relacion);
    }

    listaRelaciones() {
        var listarelaciones: Relacion[] = [];
        var rel: Relacion = {
            id: 0,
            createDate: new Date,
            usuarioId: 2,
            grupoId: 1,

        }
        listarelaciones.push(rel);
        this.setState({relacion : listarelaciones, loadRelacion : false});
    }

    getNombre(id: number) {
        var dev = "";
        console.log("Aqui mostramos lo demas");
        this.state.asistentes.map(asist => {
            if (asist.id == id)
                dev = asist.nombre;
            
            console.log(asist.nombre);
        });
        return dev;
    }

    printMsg() {
        let dev: any = [];
        var mens: ChatI[] = [];
        console.log("El grupo es");
        console.log(this.state.activeGrup);
        //mens.push(this.state.msg[0]);
        for (let i: number = 0; i < this.state.msg.length && this.state.grupos.length > 0; i++) {
            if (this.state.msg[i].chatId == this.state.activeGrup) {
                mens.push(this.state.msg[i]);
                
            }
            console.log("l id es");
            console.log(this.state.msg[i].groupId); 
        }
        
        mens.map(mensaje => {
            
            var hora = parseInt(mensaje.createDate.toString().substring(11, 13));
            var minutos = parseInt(mensaje.createDate.toString().substring(15, 17));
            //var hora = new Date(mensaje.createDate.getHours.toString());
            dev.push((<div className="container">
                          <p>{this.getNombre(mensaje.usuarioId)}</p>
                          <p>{mensaje.texto}</p>
                <span className="time-right">{hora + ":"+minutos}</span>
                      </div>) as any);
        });
        return dev;
    }

    showNotas() {
        let devolucion : any= [];
        var idTablero: number = 0;
        this.state.tableros.map(tab => {
            if (tab.grupoId == this.state.activeGrup)
                idTablero = tab.id;
        });

        let listataNotas: Nota[] = [];
        this.state.notas.map(nota => {
            if (nota.tableroId == idTablero)
                listataNotas.push(nota);
        });

        listataNotas.map(nota => {
            devolucion.push((
                <li className="note yellow">
                    <cite className="author">{nota.titulo} <button className="glyphicon glyphicon-trash" onClick={() => { this.eliminar(nota.id) }}></button> </cite>

                    {nota.texto}


                </li>) as any);
        });
        /*
        for (let i: number = 0; i < this.state.notas.length; i++) {
            devolucion.push((
                <li className="note yellow">
                    <cite className="author">{this.state.notas[i].titulo} <button className="glyphicon glyphicon-trash" onClick={() => { this.eliminar(this.state.notas[i].id) }}></button> </cite>

                    {this.state.notas[i].texto}


                </li>) as any);
        }*/
        return devolucion;
    }

    eliminar(id: number) {
        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.deleteNota);
        axios.delete(dir + id)
            .then(res => {
                console.log(res);
                console.log(res.data);
            });
        var Lista: Nota[] = [];
        this.state.notas.map(evento => {
            Lista.push(evento);
        });

        var borrar: Nota = this.state.notas[0];
        Lista.map(evento => {
            if (evento.id == id)
                borrar = evento;
        });
        var indice = Lista.indexOf(borrar);
        this.setState({
            notas: this.state.notas.filter(function (person) {
                return person.id !== borrar.id;
            })
        });
    }

    handletexto = (event: any) => {
        this.setState({ texto: event.target.value });
    }

    handleSubmmit = (event: any) => {

        event.preventDefault();
        event.stopPropagation();

        interface chatSubida {
            texto : string;
            grupoId : number;
            createDate : Date;
            usuarioId : number;
            chatId : number;
        }

        var msgjson: chatSubida = {
            texto: this.state.texto,
            grupoId: this.state.activeGrup,
            createDate: new Date,
            usuarioId: this.state.id,
            chatId : this.state.activeGrup,
    }

        var auxiliar: ChatI = {
            id: 0,
            texto: this.state.texto,
            groupId: this.state.activeGrup,
            createDate: new Date,
            usuarioId: this.state.id,
            chatId: this.state.activeGrup,
        }

        var subida = JSON.stringify(msgjson);

        //if (this.validarHoras) {

        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.sendMsg);
        axios.post(dir,
            subida,
            {
                headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" }
            }).then(res => {
                console.log(res);
                console.log(res.data);
            });

        var Lista: ChatI[] = [];
        this.state.msg.map(evento => {
            Lista.push(evento);
        });
        Lista.push(auxiliar);
        this.setState({ msg: Lista });
        this.setState({texto : ""});
        //this.state.events.push(eventoMuestra);

        //console.log(JSON.stringify(eventojson));
    }


    handletitle = (event: any) => {
        this.setState({ titulo: event.target.value });
    }

    handletextoNota = (event: any) => {
        this.setState({ textoNota: event.target.value });
    }

    getTablero() {
        var tab: number = 0;
        console.log("Prueba de grupos");
        this.state.tableros.map(tabl => {
            console.log(tabl.grupoId);
            if (tabl.grupoId == this.state.activeGrup)
                tab = tabl.id;
        });
        return tab;
    }

    /*Control de la subida e insercion del evento*/
    handleSubmmitNota = (event: any) => {

        event.preventDefault();
        event.stopPropagation();

        interface notaJson {
            titulo: string;
            texto: string;
            fechaTope: Date;
            createDate: Date;
            usuarioId: number;
            tableroId: number;
        };

        var notajson: notaJson = {
            titulo: "",
            texto: "",
            fechaTope: new Date,
            createDate: new Date,
            usuarioId: this.state.id,
            tableroId: this.getTablero(),
        }




        var notaMuestra: Nota = {
            id: 0,
            titulo: this.state.titulo,
            texto: this.state.textoNota,
            fechaTope: new Date,
            createDate: new Date,
            usuarioId: this.state.id,
            tableroId: this.getTablero(),
        }

        notajson.titulo = this.state.titulo;
        notajson.texto = this.state.textoNota;

        var subida = JSON.stringify(notajson);

        //if (this.validarHoras) {

        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.nuevaNotaTablero);
        axios.post(dir,
            subida,
            {
                headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" }
            }).then(res => {
                console.log(res);
                console.log(res.data);
            });

        var Lista: Nota[] = [];
        this.state.notas.map(evento => {
            Lista.push(evento);
        });
        Lista.push(notaMuestra);
        this.setState({ notas: Lista });
        this.setState({ titulo: "", textoNota: "" });
        //this.state.events.push(eventoMuestra);

        //console.log(JSON.stringify(eventojson));
    }


    handleNombreGrupo = (event: any) => {
        this.setState({nombreGrupo : event.target.value});
    }

    handleGrupoSubmit = (event: any) => {
        event.preventDefault();
        event.stopPropagation();

        interface grupoJson {
            nombre: string;
            descripcion: string;
            id: number;
        }

        var grupo: grupoJson = {
            nombre : this.state.nombreGrupo,
            descripcion : "",
            id : this.state.id,
        }

        var subida = JSON.stringify(grupo);

        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.newGrup);
        axios.post(dir,
            subida,
            {
                headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" }
            }).then(res => {
            console.log(res);
            console.log(res.data);
            });

        var ListaGrupos: grupoId[] = [];

        var added: grupoId = {
            id: 0,
            nombre: this.state.nombreGrupo,
            descripcion: "",
            imagen: "",
            createDate: Date(),
            usuarioId: this.state.id,
            chatId: 0,
        }

        this.state.grupos.map(grup => {
            ListaGrupos.push(grup);
        });
        ListaGrupos.push(added);
        this.setState({ grupos: ListaGrupos });
    }

    formGrupo() {
        let devolucion = [];
        devolucion.push((<form onSubmit={this.handleGrupoSubmit}>
            <input id="name" type="text" ref="un texto" value={this.state.nombreGrupo} onChange={this.handleNombreGrupo} />
                                 <input type="submit" value="Send" />

        </form>) as any);
        return devolucion;
    }

    eliminarGrupo(id: number) {
        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.deleteGrupo);
        axios.delete(dir + "/"+ id)
            .then(res => {
                console.log(res);
                console.log(res.data);
            });
        var Lista: grupoId[] = [];
        this.state.grupos.map(evento => {
            Lista.push(evento);
        });

        var borrar: grupoId = this.state.grupos[0];
        Lista.map(evento => {
            if (evento.id == id)
                borrar = evento;
        });
        var indice = Lista.indexOf(borrar);
        this.setState({
            grupos: this.state.grupos.filter(function (person) {
                return person.id !== borrar.id;
            })
        });
    }


    FormNotas() {
        let devolucion = [];
        devolucion.push((
            <form onSubmit={this.handleSubmmitNota}>
                <li className="note yellow">
                    <cite className="author"> <input id="name" value={this.state.titulo} type="text" ref="un texto" onChange={this.handletitle} /> </cite>
                    <input id="name" type="text" ref="un texto" value={this.state.textoNota} onChange={this.handletextoNota} />
                    <input type="submit" value="Send" />


                </li> </form>) as any);
        return devolucion;
    }

    setActiveGrup(id: number) {
        this.setState({ activeGrup : id});
    }

    listaGrupos() {
        let devoluciones = [];

        for (let i: number = 0; i < this.state.grupos.length; i++) {
            devoluciones.push((
                <button onClick={() => { this.setActiveGrup(this.state.grupos[i].id); }}><div className="chip">
                    <img src={require('./IMG/group.png')} width="96" height="96" />
                    {this.state.grupos[i].nombre}<button className="glyphicon glyphicon-trash" onClick={() => { this.eliminarGrupo(this.state.grupos[i].id) }}></button>
                </div></button>
                ) as any);
        }
        return devoluciones;
    }
    

    nombreGrupo(id: number) {
        var dev: string = "Grupo";
        this.state.grupos.map(gr => {
            if (gr.id == id)
                dev = gr.nombre;
        });
        return dev;
    }

    hideGrup() {
        if (this.state.displayFormGrupos) {
            this.setState({ displayFormGrupos: false });
        } else {
            this.setState({ displayFormGrupos: true });
        }
    }

    formularioInvitacion() {
        return <form onSubmit={this.handlenewUserGrup}>
                   <select onChange={this.handleFriendChange}>
                       {this.invitacion()}
                   </select>
                   <button type="submit">invitar</button>
               </form>;
    }


    handlenewUserGrup = (event: any) => {
        event.preventDefault();
        event.stopPropagation();

        

        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.aniadirUsuarioGrupo);
        axios.put(dir+"/"+this.state.amigo + "/"+this.state.activeGrup,
            {
                headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" }
            }).then(res => {
            console.log(res);
            console.log(res.data);
        });
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

    handleFriendChange = (event: any) => {
        this.setState({ amigo: event.target.value });
    }

    listaAsistentes() {
        let devolucion: any = [];

        var ListaGrupos: number[] = [];
        console.log("los usuarios que estan en el gupo activo")
        this.state.relacion.map(rel => {
            if (rel.grupoId == this.state.activeGrup) {
                ListaGrupos.push(rel.usuarioId);
                console.log(rel.usuarioId);
            }
        });
        this.state.asistentes.map(persona => {
            if(ListaGrupos.indexOf(persona.id)!= -1)
                devolucion.push((<p>{persona.nombre}</p>) as any);
        });
        return devolucion;
    }

    muestraAsistentes() {
        if (this.state.showMiembros) {
            this.setState({ showMiembros: false });
        } else {
            this.setState({showMiembros : true});
        }
    }

    public render() {

        let mensajes = (this.state.loadID && this.state.loadMsg && this.state.loadingAsistentes)
            ? <p>No se han cargado</p>
            : this.printMsg();
        let notas = (this.state.loadingNota)
            ? <p>No hay notas</p>
            : this.showNotas();

        return <div>
                   <table className='table'>
                   <thead>
                   <tr>
                        <th width="80%">{(this.state.loadingGrupos) ? "nombre de grupo" : this.nombreGrupo(this.state.activeGrup)} </th>
                        <th width="20%">Contactos</th>
                    </tr>
                    <tr>
                        <td>
                        <div className="chatBox">

                            {mensajes}
                            </div>
                        </td>
                        <td>
                            <div className="grupos">
                                {this.listaGrupos()}
                                <div className="chip"><h4>Asistentes<button className="glyphicon glyphicon-plus" onClick={() => { this.muestraAsistentes(); }}></button></h4></div>
                                {(!this.state.loadFriends && this.state.showMiembros) ? this.formularioInvitacion() : null}
                                {(this.state.showMiembros)  ? this.listaAsistentes()  : null}
                                <div className="chip"><h4>Grupo<button className="glyphicon glyphicon-plus" onClick={() => { this.hideGrup(); }}></button></h4></div>
                                {(this.state.displayFormGrupos) ? this.formGrupo() :null}
                            </div>
                        </td>

                    </tr>


                </thead>
                </table>
            
            <form className="container darker" onSubmit={this.handleSubmmit}>
                <input className="msg" type="text" value={this.state.texto} ref="un texto" onChange={this.handletexto}/>
                <input className="msgsub" type="submit" value="Send" />
            </form>
                   <ul className="quote-container">
                       {notas}
                       {this.FormNotas()}
                   </ul>
        </div>;

    }
    
}

interface ChatI {
    id: number;
    texto: string;
    groupId: number;
    createDate: Date;
    usuarioId: number;
    chatId: number;
}

interface grupoId {
    id: number,
    nombre: string,
    descripcion: string,
    imagen: string,
    createDate: string,
    usuarioId: number,
    chatId: number,
}

interface Nota {
    id: number,
    titulo: string,
    texto: string,
    fechaTope: Date,
    createDate: Date,
    usuarioId: number,
    tableroId: number,
}

interface Tablero {
    id: number,
    createDate: Date,
    grupoId: number,
}

interface Usuario {
    id: number;
    nombre: string;
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

interface Relacion {
    id: number;
    createDate : Date;
    usuarioId : number;
    grupoId : number;
}