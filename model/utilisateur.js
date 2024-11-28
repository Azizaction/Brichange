import { connexion } from '../DB/db.js';
import { hash } from 'bcrypt';


/**
 * obtenir un utiliateur quand veut a partir de son id   
 * @param {int} id_utilisateur l'idantifiant de chaque utilisateur  
 * @returns l'utilisateur sélectionner par l'id
 */
export async function getUserByID(id_utilisateur) {
    const User = await connexion.get(`SELECT * FROM utilisteur WHERE id_utilisateur = ? `, [id_utilisateur]);
    return User;
}

/**
 * obtenir un utiliateur quand veut a partir de son courriel 
 * @param {string} courriel l'email de l'utilisateur 
 * @returns l'utilisateur sélectionner par le courriel
 */
export async function getUserByEmail(courriel) {
    const UserCourriel = await connexion.get(`SELECT * FROM utilisateur WHERE courriel = ?`, [courriel]);
    return UserCourriel;
}

/**
 * Ajout d'un utilisateur par son nom, prenom, courriel et mot de passe qui hasher
 * @param {string} nom le nom de l'utilisateur
 * @param {string} prenom le prenom de l'utilisateur
 * @param {string} courriel l'email de l'utilisateur  
 * @param {string} mot_de_passe le mot de passe de l'utiliateur
 * @returns un nouvelle utilisateur avec tous ses attribus
 */
export async function addUser(nom, prenom, courriel, mot_de_passe) {
    const Password = await hash(mot_de_passe, 10);

    const user = await connexion.run(`INSERT INTO utilisateur (courriel, nom, prenom, mot_de_passe,) VALUES(?,?,?,?)`, [courriel, nom, prenom, Password]);
    return user.lastID;

}

































