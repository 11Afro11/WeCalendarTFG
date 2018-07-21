import * as React from 'react';
import { RouteComponentProps } from 'react-router';
//import ApiUrlRepository = require("./ApiUrlMiddle/ApiUrlRepository");
import { ApiUrlRepository } from './ApiUrlMiddle/ApiUrlRepository';
//import ApiUrlRepository1 = ApiUrlRepository.ApiUrlRepository;
import axios from 'axios';

interface NotasState {
    currentCount: number;
    notas: Nota[];
    loadingNota : boolean;
}

export class Notas extends React.Component<RouteComponentProps<{}>, NotasState> {
    constructor() {
        super();
        this.state = {
            currentCount: 0,
            notas: [],
            loadingNota: true,
        };
        this.loadNota();
    }

    loadNota() {
        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.getSpecificNotes);
        fetch(dir + '/1')
            .then(response => response.json() as Promise<Nota[]>)
            .then(data => {
                this.setState({ notas: data, loadingNota: false });
            }).catch(error => console.log(error));
    }

    showNotas() {
        let devolucion = [];
        for (let i: number = 0; i < this.state.notas.length; i++) {
            devolucion.push((
                <li className="note yellow">
                    <cite className="author">{this.state.notas[i].titulo} <button className="glyphicon glyphicon-trash" onClick={() => { this.eliminar(this.state.notas[i].id) }}></button> </cite>
                    
                    {this.state.notas[i].texto}
                    

                </li>)as any);
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

    public render() {
        let notas = (this.state.loadingNota)
            ? <p><em>Loading...</em></p>
            : this.showNotas()
        return <ul className="quote-container">
            {notas}
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
}
