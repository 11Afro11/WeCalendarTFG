import * as React from 'react';
import { NavMenu } from './NavMenu';

export interface LayoutProps {
    children?: React.ReactNode;
}



export class Layout extends React.Component<LayoutProps, {}> {
    constructor() {
        super();
        this.state = {
        };
    }

    loadSesion() {
        sessionStorage.setItem("token", "weeeeee");
        let dev = [];
        (sessionStorage.getItem("token") == null) ? dev.push((<div className='login'>
                                                                  <h2>Sign in</h2>
                                                                  <input name='username' placeholder='Username' type='text' />
                                                                  <input id='pw' name='password' placeholder='Password' type='password' />
                                                                  <input type='submit' value='Sign in' />
                                                                  <a className='forgot' href='#'>Forgot your password?</a>
                                                              </div>) as any) : dev.push((<div className='container-fluid'>
            <div className='row'>
                                            <div className='col-sm-3'>
                                                <NavMenu />
                                            </div>
                                            <div className='col-sm-9'>
                                                {this.props.children}
                                            </div>
                                        </div>
            </div>) as any);
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
