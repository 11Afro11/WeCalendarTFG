import * as React from 'react';
import { NavMenu } from './NavMenu';
import axios from 'axios';
import { ApiUrlRepository } from './ApiUrlMiddle/ApiUrlRepository';

export interface LayoutProps {
    children?: React.ReactNode;
}

interface formu {
    username: String;
    password: String;
    mail : String;
    registered: boolean;
    baneo : boolean;
}

export class Layout extends React.Component<LayoutProps, formu> {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            mail: "",
            registered: true,
            baneo : false,
    };
    }

    handleUsernameChange = (event: any) => {
        this.setState({ username: event.target.value });
    }

    handleMailChange = (event: any) => {
        this.setState({mail : event.target.value});
    }

    handlePasswdChange = (event: any) => {
        this.setState({password : event.target.value});
    }

    checkBaneo() {
        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.estaBaneado);
        axios.put(dir + "/" + this.state.username,
            {
                headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" }
            }).then(res => {
                this.setState({ baneo: res.data });
                if (!this.state.baneo) {
                    var direccion = ApiUrlRepository.getApiUrl(ApiUrlRepository.login);
                    var token = "";
                    var subida = JSON.stringify(this.state.password);
                    axios.put(direccion + "/" + this.state.username, subida,
                        {
                            headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" }
                        }).then(res => {
                        token = String(res.data);

                        if (token != null)
                            sessionStorage.setItem("token", token);
                        console.log(sessionStorage.getItem("token"));
                        window.location.reload();
                        //console.log(res);
                        //console.log(res.data);
                    });
                }
            //console.log(res);
            //console.log(res.data);
        });
    }

    handleSubmmit = (event: any) => {

        event.preventDefault();
        event.stopPropagation();
        var direccion = ApiUrlRepository.getApiUrl(ApiUrlRepository.login);
        this.checkBaneo();
        /*
        if (!this.state.baneo) {
            var token = "";
            var subida = JSON.stringify(this.state.password);
            axios.put(dir + "/" + this.state.username, subida,
                {
                    headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" }
                }).then(res => {
                token = String(res.data);

                if (token != null)
                    sessionStorage.setItem("token", token);
                console.log(sessionStorage.getItem("token"));
                window.location.reload();
                //console.log(res);
                //console.log(res.data);
            });
        }*/
       
        /*
        console.log(token);
        if(token != null)
            sessionStorage.setItem("token", token);
        console.log(this.state.username);
        console.log(this.state.password);
        //window.location.reload();*/


    }

    handleRegister = (event: any) => {

        event.preventDefault();
        event.stopPropagation();
        var dir = ApiUrlRepository.getApiUrl(ApiUrlRepository.registrar);
        interface reg {
            username: String;
            correo: String;
            passwd: String;
        }

        var regist: reg = {
            username:"",
            correo: "",
            passwd: "",
        }

        regist.username = this.state.username;
        regist.correo = this.state.mail;
        regist.passwd = this.state.password;


        var token = "";
        var subida = JSON.stringify(regist);
        axios.post(dir, subida,
            {
                headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" }
            }).then(res => {
            token = String(res.data);

            if (token != null)
                //sessionStorage.setItem("token", token);
            console.log(sessionStorage.getItem("token"));
            window.location.reload();
            //console.log(res);
            //console.log(res.data);
        });
        /*
        console.log(token);
        if(token != null)
            sessionStorage.setItem("token", token);
        console.log(this.state.username);
        console.log(this.state.password);
        //window.location.reload();*/
        this.setState({registered: true});


    }

    logReg() {
        if (this.state.registered) 
            this.setState({ registered: false });
        else
            this.setState({registered:true});
    }

    loadSesion() {
        //sessionStorage.setItem("token", "weeeeee");
        //sessionStorage.removeItem("token");
        let dev = [];

        if (this.state.baneo) {
            dev.push((<div className="contenedor">
                          <div className='login'>
                              <form onSubmit={this.handleSubmmit}>
                                  <h2>Usuario Baneado</h2>
                              </form>
                          </div></div>) as any);
        } else {
            if (this.state.registered) {
                (sessionStorage.getItem("token") == null)
                    ? dev.push((<div className="contenedor">
                        <div className='login'>
                            <form onSubmit={this.handleSubmmit}>
                                <h2>Log In</h2>
                                <input name='username' placeholder='Username' type='text' onChange={this.handleUsernameChange} />
                                <input id='pw' name='password' placeholder='Password' type='password' onChange={this
                                    .handlePasswdChange} />
                                
                                <input type='submit' value='Sign in' />
                                
                            </form>
                            <button className="active" onClick={() => { this.logReg() }}>Sign up</button>
                        </div></div>) as any)
                    : dev.push((<div className='container-fluid'>

                        <div className='row'>
                            <div className='col-sm-3'>
                                <NavMenu />
                            </div>
                            <div className='col-sm-9'>
                                {this.props.children}
                            </div>
                        </div>
                    </div>) as any);
            } else {
                (sessionStorage.getItem("token") == null)
                    ? dev.push((<div className="contenedor">
                        <div className='register'>
                            <form onSubmit={this.handleRegister}>
                                <h2>Register</h2>
                                <input name='username' placeholder='Username' type='text' onChange={this.handleUsernameChange} />
                                <input name='mail' placeholder='Mail' type='text' onChange={this.handleMailChange} />
                                <input id='pw' name='password' placeholder='Password' type='password' onChange={this.handlePasswdChange} />
                                
                                <input type='submit' value='Sign up' />
                            </form>
                            <button className="active" onClick={() => { this.logReg() }}>Sign in</button>
                        </div></div>) as any)
                    : dev.push((<div className='container-fluid'>

                        <div className='row'>
                            <div className='col-sm-3'>
                                <NavMenu />
                            </div>
                            <div className='col-sm-9'>
                                {this.props.children}
                            </div>
                        </div>
                    </div>) as any);
            }
        }

        
        


        return dev;
    }

    public render() {
        let muestra = this.loadSesion();
        return <div>{muestra}</div>
        /*<div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-3'>
                    <NavMenu />
                </div>
                <div className='col-sm-9'>
                    { this.props.children }
                </div>
            </div>
        </div>;*/
        
    }
}
