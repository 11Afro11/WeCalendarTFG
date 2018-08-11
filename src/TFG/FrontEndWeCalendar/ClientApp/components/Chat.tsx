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
    chat: number;
    grupo : number;
    texto: string;
    notas: Nota[];
    loadingNota: boolean;
    titulo: string;
    textoNota: string;
    asistentes: Usuario[];
    loadingAsistentes: boolean;
}

export class Chat extends React.Component<RouteComponentProps<{}>, ChatState> {
    constructor() {
        super();
        this.state = {
            id: 0,
            loadID: true,
            msg: [],
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
            }).catch(error => console.log(error));
    }

    loadChat() {
        console.log("he entrado");
        var dir = ApiUrlRepository.getApiUrl((ApiUrlRepository.getMensajes));
        fetch(dir + '/' + 1)
            .then(response => response.json() as Promise<ChatI[]>)
            .then(data => {
                this.setState({ msg: data, loadMsg: false });
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
        let dev = [];
        for(let i : number = 0; i < this.state.msg.length; i++){
            dev.push((<div className="container">
                <p>{this.getNombre(this.state.msg[i].usuarioId)}</p>
                <p>{this.state.msg[i].texto}</p>
                <span className="time-right">11:00</span>
            </div>) as any);
        }
        return dev;
    }

    showNotas() {
        let devolucion = [];
        for (let i: number = 0; i < this.state.notas.length; i++) {
            devolucion.push((
                <li className="note yellow">
                    <cite className="author">{this.state.notas[i].titulo} <button className="glyphicon glyphicon-trash" onClick={() => { this.eliminar(this.state.notas[i].id) }}></button> </cite>

                    {this.state.notas[i].texto}


                </li>) as any);
        }
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

    public render() {

        let mensajes = (this.state.loadID && this.state.loadMsg && this.state.loadingAsistentes)
            ? <p>No se han cargado</p>
            : this.printMsg();
        let notas = (this.state.loadingNota)
            ? <p>No hay notas</p>
            : this.showNotas();

        return <div>
            <p>MENSAJES</p>
            <div className="chatBox">
            
                {mensajes}
                
            </div>
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

interface Nota {
    id: number,
    titulo: string,
    texto: string,
    fechaTope: Date,
    createDate: Date,
    usuarioId: number,
    tableroId: number,
}

interface Usuario {
    id: number;
    nombre: string;
}