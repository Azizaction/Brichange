import 'dotenv/config'

import express, {json} from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import { engine } from 'express-handlebars';
import { getDetail, getExchanges, getBriques, addEchange ,deleteEchange} from './instruction.js';
import { validateNomEchange, validateQuantitesEchange} from './validation.js';

const server = express();

server.engine('handlebars', engine());
server.set('view engine', 'handlebars');


// On ajoute de middleware
server.use(helmet());
server.use(cors());
server.use(compression());
server.use(json());
server.use(express.static('Logiciel'));

// On ajoute une route pour visualiser tout les échanges



server.get('/', async (request, response) => {
    const échanges = await getExchanges();

    response.render('echanges', {
        titre: 'Les échanges',
        styles: ['/CSS/style.css'],
        scripts: ['/JS/echange.js'],
        échanges: échanges
    })
});

server.get('/echange', async (request, response) => {
    const id = request.query.id;  
    const echange = await getDetail(id);  
    response.render('echange', {
        titre: `Détail de l'échange`,
        styles: ['/CSS/style.css'],
        scripts: ['/JS/echange.js'],
        echange: echange  
    });
});

server.get('/creation', async (request, response) => {
    const briques = await getBriques();

    response.render('briques', {
        titre: `Créer un échange`,
        styles: ['/CSS/style.css'],
        scripts: ['/JS/echange.js'],
        échanges: briques
    })
});

server.get('/profil', async (request, response) => {
    const profil = await getExchanges();

    response.render('profil', {
        titre: `Supprimer un échange`,
        styles: ['/CSS/style.css'],
        scripts: ['/JS/echange.js'],
        profil: profil
    })
});

server.get('/api/echanges', async (request, response) => {
    const exchange = await getExchanges();
    response.status(200).json(exchange);
});

//On ajoute une pour pouvoir avoir accès au brique
server.get('/api/brique', async (request, response) =>{
const brique = await getBriques();
response.status(200).json(brique);
});

// On ajoute une route pour avoir les détails de l'échange
server.get('/api/detail/:id', async(request,response) =>{
    const detail = await getDetail(request.params.id);
    response.status(200).json(detail);
});

// On ajoute une route pour ajouter un échange
server.post('/api/exchange', async (request, response) => {
    if(validateNomEchange(request.body.nom_echange)){
        const id = await addEchange(request.body.nom_echange, request.body.briques);

        response.status(201).json({ id: id });
    }
    else {
        response.status(400).end();
    }
});

//on ajoute une route pour supprimer un echange 
server.delete('/api/suppression/:id', async (request,response)=>{
    const result = await deleteEchange(request.params.id);
    response.status(200).end();
});

// Pour démarer le serveur
console.log('Serveur ON:');
console.log('http://localhost:' + process.env.PORT);
server.listen(process.env.PORT);