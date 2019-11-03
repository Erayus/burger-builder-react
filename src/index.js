import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
<<<<<<< HEAD

ReactDOM.render(<App />, document.getElementById('root'));
=======
import {BrowserRouter} from 'react-router-dom';

const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
)
ReactDOM.render(app, document.getElementById('root'));
>>>>>>> ef25edd34cddc20ae5a9f9c14718fba9e19f0a3d

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
