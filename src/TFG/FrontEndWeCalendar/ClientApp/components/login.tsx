import * as React from 'react';
import { RouteComponentProps } from 'react-router';
//import ApiUrlRepository = require("./ApiUrlMiddle/ApiUrlRepository");
import { ApiUrlRepository } from './ApiUrlMiddle/ApiUrlRepository';
//import ApiUrlRepository1 = ApiUrlRepository.ApiUrlRepository;
import axios from 'axios';

interface loginState {
    
}

export class login extends React.Component<RouteComponentProps<{}>, loginState> {
    constructor() {
        super();
        this.state = {
           
        };
    }



    public render() {
        return <h1></h1>;
    }
    
}
