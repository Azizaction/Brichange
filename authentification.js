import { compare } from 'bcrypt';
import passport from 'passport';
import { Strategy } from 'passport-local';
import { getUtilisateurById, getUtilisateurByCourriel } from './model/utilisateur.js';

const config = {
    usernameField: 'courriel',
    passwordField: 'mot_de_passe'
}

passport.use(new Strategy(config, async (courriel, mot_de_passe, done) => {
    try {
        const utilisateur = await getUtilisateurByCourriel(courriel);

        if(!utilisateur) {
            return done(null, false, { erreur: 'mauvais_courriel' });
        }

        const valide = await compare(mot_de_passe, utilisateur.mot_de_passe);

        if(!valide) {
            return done(null, false, { erreur: 'mauvais_motdepasse' });
        }

        return done(null, utilisateur);
    }
    catch(erreur) {
        return done(erreur);
    }
}));

passport.serializeUser((utilisateur, done) => {
    done(null, utilisateur.id_utilisateur);
});

passport.deserializeUser(async (idUtilisateur, done) => {
    try{
        const utilisateur = await getUtilisateurById(idUtilisateur);
        done(null, utilisateur);
    }
    catch(erreur) {
        done(erreur);
    }
});
