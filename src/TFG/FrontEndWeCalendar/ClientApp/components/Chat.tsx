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
    texto : string;
}

export class Chat extends React.Component<RouteComponentProps<{}>, ChatState> {
    constructor() {
        super();
        this.state = {
            id: 0,
            loadID: true,
            msg: [],
            loadMsg: true,
            chat: 0,
            grupo : 0,
            texto : "",
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


    public render() {

        let mensajes = (this.state.loadID && this.state.loadMsg)
            ? <p>No se han cargado</p>
            : this.printMsg();

        return <div>
            <div className="chatBox">
            <p>nuevo msg</p>
                {mensajes}
                
            </div>
            <div className="container darker">
                <input className="msg" type="text" ref="un texto" />
                <input className="msgsub" type="submit" value="Send" />
            </div>
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