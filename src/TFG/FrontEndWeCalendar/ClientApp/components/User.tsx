import * as React from 'react';
import { RouteComponentProps } from 'react-router';
//import ApiUrlRepository = require("./ApiUrlMiddle/ApiUrlRepository");
import { ApiUrlRepository } from './ApiUrlMiddle/ApiUrlRepository';
//import ApiUrlRepository1 = ApiUrlRepository.ApiUrlRepository;
import axios from 'axios';

interface userState {
    usuario: Usuario[];
    friends: Usuario[];
    loadingFriend: boolean;
    id: number;
    loadingId: boolean;
    loadingUser: boolean;
    nombreAmigo: string;
    displayFriends: boolean
}

export class User extends React.Component<RouteComponentProps<{}>, userState> {
    constructor() {
        super();
        this.state = {
            usuario: [],
            friends: [],
            loadingFriend: true,
            id: 0,
            loadingId: true,
            loadingUser: true,
            nombreAmigo: "",
            displayFriends: true,
    };
        this.loadId();
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
                this.loadUser();
                this.loadFriends();
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

    loadFriends() {
        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.getFriends);
        fetch(dir + '/' + this.state.id.toString())
            .then(response => response.json() as Promise<Usuario[]>)
            .then(data => {
                this.setState({ friends: data, loadingFriend: false });
            }).catch(error => console.log(error));

    }

    OnOFNotif() {
        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.setNotif);
        fetch(dir + '/' + this.state.id)
            .then(response => response.json())
            .then(data => {
            }).catch(error => console.log(error));
        var user: Usuario = {
            id: this.state.usuario[0].id,
            nombreUsuario: this.state.usuario[0].nombreUsuario,
            correo: this.state.usuario[0].correo,
            password: this.state.usuario[0].password,
            notificacion: this.state.usuario[0].notificacion,
            foto: this.state.usuario[0].foto,
            createDate: this.state.usuario[0].createDate,
            token: this.state.usuario[0].token,
        }


        if (this.state.usuario[0].notificacion == "YES")
            user.notificacion = "NO";
        else
            user.notificacion = "YES";

        var Lista: Usuario[] = [];
        Lista.push(user);
        this.setState({usuario : Lista});
    }

    amigos() {
        let friends = [];
        for (let i: number = 0; i < this.state.friends.length; i++) {
            friends.push((<p>{this.state.friends[i].nombreUsuario}</p>)as any);
        }
        return friends;
    }

    handleNombreChange = (event: any) => {
        this.setState({ nombreAmigo: event.target.value });
    }


    user() {
        let dev = [];
        let friends = (this.state.loadingFriend) ? null : this.amigos();
        dev.push((<div className="card">
                          <img src={require('./IMG/user.png')} alt="John"/>
            <h1>{this.state.usuario[0].nombreUsuario}</h1>
            <p className="title">{this.state.usuario[0].correo}</p>
            <p>Notificaciones: <button onClick={() => { this.OnOFNotif(); }}>{this.state.usuario[0].notificacion}</button> </p>
            <h3>Amigos</h3>
            <form onSubmit={this.handleSubmmit}>
                <input type="text" value={this.state.nombreAmigo} ref="un texto" onChange={this.handleNombreChange} />
                <input className="msgsub" type="submit" value="Send" />
            </form>
            {friends}
        </div>) as any);



        return dev;
    }


    handleSubmmit = (event: any) => {

        event.preventDefault();
        event.stopPropagation();
        var subida = JSON.stringify(this.state.nombreAmigo);
        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.AddFriend);
        axios.put(dir+"/"+this.state.id,
            subida,
            {
                headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" }
            }).then(res => {
            console.log(res);
            console.log(res.data);
            });

        var user: Usuario = {
            id: 0,
            nombreUsuario: this.state.nombreAmigo,
            correo: "",
            password: "",
            notificacion: "",
            foto: "",
            createDate: new Date,
            token: "",

        }

        var Lista: Usuario[] = [];
        this.state.friends.map(evento => {
            Lista.push(evento);
        });
        Lista.push(user);
        this.setState({ friends: Lista , nombreAmigo : ""});

    }

    public render() {

        var user = (this.state.loadingId || this.state.loadingUser) ? <p>no se encuentra el usuario</p> : this.user();

        return <div className="contenedorUsuario">
             <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

            {user}
            
        </div>;
    }
    
}

interface Usuario {
    id: number;
    nombreUsuario: string;
    correo: string;
    password: string;
    notificacion: string;
    foto: string;
    createDate: Date;
    token: string;

}
