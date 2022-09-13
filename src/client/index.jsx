import * as React from "react";
import * as ReactDOM from "react-dom";
import * as process from "process";
import {App} from "../App";
import {createContext} from "react";
import UserStore from "../store/UserStore";

const dev = process.env.NODE_ENV == 'development'


const renderMethod = dev ? ReactDOM.render : ReactDOM.hydrate;

    renderMethod(
            <App/>,
        document.getElementById('react-root'));




