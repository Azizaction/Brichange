import { connexion } from "../DB/db.js";


/**
 * @returns retourne l'emsenble des échanges
 */

export async function getExchanges() {
    const exchange = await connexion.all(`
        SELECT echange.*, utilisateur.nom, utilisateur.prenom
        FROM echange
        JOIN utilisateur ON echange.id_utilisateur = utilisateur.id_utilisateur`);

    return exchange;

}


/**
 * @returns les détails de l'échange selectionner
 */

export async function getDetail(id) {
    const detail = await connexion.all(
        `SELECT echange.id_echange AS id, echange.*, utilisateur.nom, utilisateur.prenom, 
                echange_brique.quantite, brique.valeur, brique.image, brique.nom AS nom_brique
        FROM echange
        JOIN utilisateur ON echange.id_utilisateur = utilisateur.id_utilisateur
        JOIN echange_brique ON echange_brique.id_echange = echange.id_echange
        JOIN brique ON echange_brique.id_brique = brique.id_brique
        WHERE echange.id_echange = ?;`, 
        [id]
    );
    return detail;
}

// retourne les echanges d un utilisateur specifique 

export async function getEchangeById(idUtilisateur){
    const echangeId = await connexion.all(
        `SELECT echange.id_echange, echange.nom_echange,
            utilisateur.id_utilisateur,utilisateur.nom,
            utilisateur.prenom,echange.id_proposition
            FROM echange 
            INNER JOIN utilisateur ON echange.id_utilisateur = utilisateur.id_utilisateur
            WHERE utilisateur.id_utilisateur = ? AND echange.id_proposition_accepte IS ?`,
            [idUtilisateur]
    );
    return echangeId;
}

/**
 * Ajoute un échange a la base de donnés.
 * @param {string} nom_echange Le nom de l`echange à ajouter.
 * @returns L'identifiant de léchange ajouté.
 */
export async function addEchange(nom_echange,idUtilisateur, briques){
const ajout_echange = await connexion.run('INSERT INTO echange (nom_echange, id_utilisateur) Values(?, ?);',
[nom_echange, idUtilisateur]);

const lastID = ajout_echange.lastID;
for(const brique of briques){
    await connexion.run('INSERT INTO echange_brique (id_echange, id_brique, quantite) Values(?,?,?);',
[lastID, brique.id_brique, brique.quantite]);


}

return lastID;
}


//fonction pour supprimer un échange par id
export async function deleteEchange(id) {
    const del = await connexion.run('DELETE FROM echange WHERE id_echange = ?', [id]);

    if (del.changes > 0) {
        return true;  
    } else {
        return false; 
    }
}