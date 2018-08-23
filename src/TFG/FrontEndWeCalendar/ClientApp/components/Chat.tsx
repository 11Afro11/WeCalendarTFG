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
    displayFormGrupos : boolean;
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
            activeGrup: 1,
            grupos: [],
            loadingGrupos: true,
            tableros: [],
            loadTableros: true,
            displayFormGrupos: false,
    };

        this.loadId();
        this.loadChat();
        this.loadNota();
        this.loadAsistentes();

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
                this.loadChat();
                this.loadGrupos();
                this.loadTableros();
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
        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.getNotaChat);
        fetch(dir + '/' + 1)
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
        for (let i: number = 0; i < this.state.msg.length; i++) {
            if (this.state.msg[i].chatId == this.state.activeGrup) {
                mens.push(this.state.msg[i]);
                
            }
            console.log("l id es");
            console.log(this.state.msg[i].groupId); 
        }
        
        mens.map(mensaje => {
            dev.push((<div className="container">
                          <p>{this.getNombre(mensaje.usuarioId)}</p>
                          <p>{mensaje.texto}</p>
                          <span className="time-right">11:00</span>
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
        Lista.splice(indice);
        this.setState({ notas: Lista });
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
            grupoId: this.state.grupo,
            createDate: new Date,
            usuarioId: this.state.id,
            chatId : this.state.chat,
    }

        var auxiliar: ChatI = {
            id: 0,
            texto: this.state.texto,
            groupId: 1,
            createDate: new Date,
            usuarioId: this.state.id,
            chatId: 1,
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
            tableroId: this.state.grupo,
        }




        var notaMuestra: Nota = {
            id: 0,
            titulo: this.state.titulo,
            texto: this.state.textoNota,
            fechaTope: new Date,
            createDate: new Date,
            usuarioId: this.state.id,
            tableroId: this.state.grupo,
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


    formGrupo() {
        let devolucion = [];
        devolucion.push((<form>
            <input id="name" type="text" ref="un texto" value={this.state.nombreGrupo} onChange={this.handletextoNota} />
                             <input id="name" type="text" ref="un texto" value={this.state.descGrupo} onChange={this.handletextoNota} />
                                 <input type="submit" value="Send" />

        </form>) as any);
        return devolucion;
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
                    {this.state.grupos[i].nombre}
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
                        <th width="80%">{(this.state.loadingGrupos) ? "nombre de grupo" : this.nombreGrupo(this.state.activeGrup)}</th>
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
                                <h3><button onClick={() => { this.hideGrup(); }}>ListaGrupos</button></h3>
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