import * as React from 'react';
import { RouteComponentProps } from 'react-router';
//import ApiUrlRepository = require("./ApiUrlMiddle/ApiUrlRepository");
import { ApiUrlRepository } from './ApiUrlMiddle/ApiUrlRepository';
//import ApiUrlRepository1 = ApiUrlRepository.ApiUrlRepository;
import axios from 'axios';

interface NotasState {
    id: number;
    loadingId:boolean;
    currentCount: number;
    notas: Nota[];
    loadingNota: boolean;
    titulo: string;
    texto: string;
    fecha : Date;
}

export class Notas extends React.Component<RouteComponentProps<{}>, NotasState> {
    constructor() {
        super();
        this.state = {
            id: 0,
            loadingId: true,
            currentCount: 0,
            notas: [],
            loadingNota: true,
            titulo: "",
            texto: "",
            fecha: new Date,
    };
        this.loadId();
        //this.loadNota();
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
                this.loadNota();
            }).catch(error => console.log(error));
    }

    loadNota() {
        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.getSpecificNotes);
        fetch(dir + '/'+this.state.id.toString())
            .then(response => response.json() as Promise<Nota[]>)
            .then(data => {
                this.setState({ notas: data, loadingNota: false });
            }).catch(error => console.log(error));
    }

    showNotas() {
        let devolucion = [];
        for (let i: number = 0; i < this.state.notas.length; i++) {
            (this.state.notas[i].tableroId == null || this.state.notas[i].tableroId == -1) ?
            devolucion.push((
                 <li className="note yellow">
                    <cite className="author">{this.state.notas[i].titulo} <button className="glyphicon glyphicon-trash" onClick={() => { this.eliminar(this.state.notas[i].id) }}></button> </cite>
                    
                    {this.state.notas[i].texto}
                    

                    </li>) as any)
            : devolucion.push((
                <li className="note shared">
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
        this.setState({
            notas: this.state.notas.filter(function (person) {
                return person.id !== borrar.id;
            })
        });
        //this.setState({ notas: Lista });
    }



    handletitle = (event: any) => {
        this.setState({ titulo: event.target.value });
    }

    handletexto = (event: any) => {
        this.setState({ texto: event.target.value });
    }

    /*Control de la subida e insercion del evento*/
    handleSubmmit = (event: any) => {

        event.preventDefault();
        event.stopPropagation();

        interface notaJson {
            titulo: string;
            texto: string;
            fechaTope: Date;
            createDate: Date;
            usuarioId: number;
        };

        var notajson: notaJson = {
            titulo: "",
            texto: "",
            fechaTope: this.state.fecha,
            createDate: new Date,
            usuarioId: this.state.id,
        }
        



        var notaMuestra: Nota = {
            id: 0,
            titulo: this.state.titulo,
            texto: this.state.texto,
            fechaTope: new Date,
            createDate: new Date,
            usuarioId: this.state.id,
            tableroId: -1,
        }

        notajson.titulo = this.state.titulo;
        notajson.texto = this.state.texto;

        var subida = JSON.stringify(notajson);

        //if (this.validarHoras) {

        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.nuevaNota);
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
        this.setState({titulo : "", texto : ""});
        //this.state.events.push(eventoMuestra);

        //console.log(JSON.stringify(eventojson));
    }

    fechaChange = (event: any) => {
        this.setState({fecha : event.target.value});
    }

    FormNotas() {
        let devolucion = [];
            devolucion.push((
                <form onSubmit={this.handleSubmmit}>
                <li className="note yellow">
                        <cite className="author"> <input id="name" value={this.state.titulo} type="text" ref="un texto" onChange={this.handletitle} /> </cite>
                        <input id="name" type="text" ref="un texto" value={this.state.texto} onChange={this.handletexto} />
                    <input type="submit" value="Send" />


                </li> </form>) as any);
        return devolucion;
    }

    sort() {
        var lista: Nota[] = [];
        this.state.notas.map(nota => {
            lista.push(nota);
        });
        lista.sort((a, b) => b.fechaTope.getDate() - a.fechaTope.getDate());
        this.setState({notas : lista});
    }

    public render() {
        let notas = (this.state.loadingNota && this.state.loadingId)
            ? <p><em>Loading...</em></p>
            : this.showNotas()
        return <ul className="quote-container">
            
            
            <br />
            {notas}
            {this.FormNotas()}
               </ul>;

    }
    
}

interface Nota {
    id: number,
    titulo: string,
    texto: string,
    fechaTope : Date,
    createDate: Date,
    usuarioId: number,
    tableroId: number,
}
