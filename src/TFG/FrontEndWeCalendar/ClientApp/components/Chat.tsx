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
            grupo : 1,
            texto: "",
            notas: [],
            loadingNota: true,
            titulo: "",
            textoNota: "",
        };

        this.loadId();
        this.loadChat();

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

    printMsg() {
        let dev = [];
        for(let i : number = 0; i < this.state.msg.length; i++){
            dev.push(( <div className="container">
                <p>{this.state.msg[i].texto}</p>
                <span className="time-right">11:00</span>
            </div>) as any);
        }
        return dev;
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


    public render() {

        let mensajes = (this.state.loadID && this.state.loadMsg)
            ? <p>No se han cargado</p>
            : this.printMsg();

        return <div>
            <p>MENSAJES</p>
            <div className="chatBox">
            
                {mensajes}
                
            </div>
            <form className="container darker" onSubmit={this.handleSubmmit}>
                <input className="msg" type="text" value={this.state.texto} ref="un texto" onChange={this.handletexto}/>
                <input className="msgsub" type="submit" value="Send" />
            </form>
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
}