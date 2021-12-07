import mb from 'mountebank';
import settings from './settings.js';
import service from './service.js';

const mbServerInstance = mb.create({
    port: settings.port,
    pidfile: '../mb.pid',
    logfile: '../mb.log',
    protofile: '../protofile.json',
    ipWhitelist: ['*']
});

mbServerInstance.then(() => {
    service.addService().then(r => r);
});