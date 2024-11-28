import { compare } from 'bcrypt';
import passport from 'passport';
import { Strategy } from 'passport-local';
import { getUserByID, getUserByEmail } from './model/utilisateur.js';


const config = {
    usernameField: 'courriel', 
    passwordField: 'mot_de_passe' 
};

passport.use(new Strategy(config, async(courriel, mot_de_passe, done) =>{
    try{
        const user = await getUserByEmail(courriel);

        if(!user){
            return done(null, false, {erreur: 'mauvais_courriel'});
        }

        const password = await compare(mot_de_passe, user.mot_de_passe)
        if(!password){
            return done(null, false,{erreur:'mauvais_motdepasse'});
        }

        return done(null, user);
    }
    catch(erreur){
        return done(erreur);
    };

}));

passport.serializeUser((utilisateur,done)=>{
    return done(null, utilisateur.id_utilisateur);
});

passport.deserializeUser(async(idutilisateur, done)=>{
    try{
    const user = await getUserByID(idutilisateur);
    return done(null, user);
}
catch(erreur){
    return done (erreur);
}
});

