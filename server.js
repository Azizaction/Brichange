import 'dotenv/config'

import express, {json} from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import session from 'express-session';
import memorystore from 'memorystore';
import passport from 'passport';
import { engine } from 'express-handlebars';
import { getExchanges, getDetail,addEchange,deleteEchange} from './model/echange.js';
import { getBriques } from './model/brique.js';
import './authentification.js';
import { validateNomEchange, validateQuantitesEchange, validateCourriel,validateMotDePasse} from './validation.js';

// Créer le serveur
const server = express();

// Création de la base de données de session
const MemoryStore = memorystore(session);

// Ajout des engins
server.engine('handlebars', engine());
server.set('view engine', 'handlebars');


// On ajoute de middleware
server.use(helmet());
server.use(cors());
server.use(compression());
server.use(json());
server.use(session({
    cookie: { maxAge: 3600000 },
    name: process.env.npm_package_name,
    store: new MemoryStore({ checkPeriod: 3600000 }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET
}));
server.use(passport.initialize());
server.use(passport.session());
server.use(express.static('public'));

// On ajoute une route pour visualiser tout les échanges



server.get('/', async (request, response) => {
    const échanges = await getExchanges();

    response.render('echanges', {
        titre: 'Les échanges',
        styles: ['/CSS/style.css'],
        scripts: ['/JS/echangeList.js'],
        échanges: échanges
    })
});

server.get('/echange', async (request, response) => {
    const id = request.query.id;  
    const echange = await getDetail(id);  
    response.render('echange', {
        titre: `Détail de l'échange`,
        styles: ['/CSS/style.css'],
        scripts: ['/JS/detailsBrique.js'],
        echange: echange  
    });
});

server.get('/creation', async (request, response) => {
    const briques = await getBriques();

    response.render('briques', {
        titre: `Créer un échange`,
        styles: ['/CSS/style.css'],
        scripts: ['/JS/creerEchange.js'],
        échanges: briques
    })
});

// Pour afficher la page de Sign-up
server.get('/Sign-up', (req, res) => {
    if(req.user){
        res.redirect('/');
        return;
    }
    res.render('sign-up'
        , { titre: 'Sign-up',
            layout: 'body', 
            styles: ['/CSS/style.css'],
            scripts: ['/JS/Password.js'],
             });
});

// Pour afficher la page de Sign-in
server.get('/Sign-in', (req, res) => {
    res.render('sign-in'
        , { titre: 'Sign-in',
            layout: 'body', 
            styles: ['/CSS/style.css'],
            scripts: ['/JS/Connexion.js']
             });
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


server.post('/api/connexion', (request, response, next) => {
    if(validateCourriel(request.body.courriel) &&
       validateMotDePasse(request.body.mot_de_passe)) {
        passport.authenticate('local', (erreur, utilisateur, info) => {
            if(erreur) {
                next(erreur);
            }
            else if(!utilisateur) {
                response.status(401).json(info)
            }
            else {
                request.logIn(utilisateur, (erreur) => {
                    if(erreur) {
                        next(erreur);
                    }

                    response.status(200).end();
                });
            }
        })(request, response, next);
    }
    else {
        response.status(400).end();
    }
});

server.post('/api/deconnexion', (request, response, next) => {
    request.logOut((erreur) => {
        if(erreur) {
            next(erreur);
        }

        response.redirect('/');
    });
});

// Pour démarer le serveur
console.log('Serveur ON:');
console.log('http://localhost:' + process.env.PORT);
server.listen(process.env.PORT);