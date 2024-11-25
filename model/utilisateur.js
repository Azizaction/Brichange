import { connexion } from '../DB/db.js'
import { hash } from 'bcrypt';

export async function getUtilisateurById(idUtilisateur) {
    const utilisateur = await connexion.get(
        `SELECT * FROM utilisateur WHERE id_utilisateur = ?;`,
        [idUtilisateur]
    );

    return utilisateur;
}

export async function getUtilisateurByCourriel(courriel) {
    const utilisateur = await connexion.get(
        'SELECT * FROM utilisateur WHERE courriel = ?',
        [courriel]
    );

    return utilisateur;
}

