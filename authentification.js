import { compare } from 'bcrypt';
import passport from 'passport';
import { Strategy } from 'passport-local';
import { getUtilisateurById, getUtilisateurByCourriel } from './model/utilisateur.js';

const config = {
    usernameField: 'courriel',
    passwordField: 'motdepasse'
}

passport.use(new Strategy(config, async (courriel, motdepasse, done) => {
    try {
        const utilisateur = await getUtilisateurByCourriel(courriel);

        if(!utilisateur) {
            return done(null, false, { erreur: 'mauvais_courriel' });
        }

        const valide = await compare(motdepasse, utilisateur.motdepasse);

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
