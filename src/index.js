import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap-toggle/css/bootstrap-toggle.min.css';
import 'bootstrap-toggle';

import './assets/styles/index.scss';

import { header } from './components/header';

import { album } from './components/main__album';

import { footer } from './components/footer';

window.addEventListener('DOMContentLoaded', function () {
    document.body.append(header, album, footer);
});
