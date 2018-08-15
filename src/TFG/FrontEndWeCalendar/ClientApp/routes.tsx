import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Pendientes } from './components/Pendientes';
import { Notas } from './components/Notas';
import { Chat } from './components/Chat';
import { Eventos } from './components/Eventos';
import { User } from './components/User';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata' component={FetchData} />
    <Route path='/pendientes' component={Pendientes} />
    <Route path='/notas' component={Notas} />
    <Route path='/chat' component={Chat} />
    <Route path='/evento' component={Eventos} />
    <Route path='/user' component={User} />
</Layout>;
