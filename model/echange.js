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

/**
 * Ajoute un échange a la base de donnés.
 * @param {string} nom_echange Le nom de l`echange à ajouter.
 * @returns L'identifiant de léchange ajouté.
 */
export async function addEchange(nom_echange, briques) {
    const idUtilisateur = 1;

    const ajout_echange = await connexion.run(
        'INSERT INTO echange (nom_echange, id_utilisateur) VALUES (?, ?);',
        [nom_echange, idUtilisateur]
    );
    const idEchange = ajout_echange.lastID;

    // Boucle pour insérer chaque brique
    for (const brique of briques) {
        const existingEntry = await connexion.get(
            'SELECT 1 FROM echange_brique WHERE id_echange = ? AND id_brique = ?',
            [idEchange, brique.id_brique]
        );

        // Si la combinaison n'existe pas, insère la nouvelle ligne
        if (!existingEntry) {
            await connexion.run(
                'INSERT INTO echange_brique (id_echange, id_brique, quantite) VALUES (?, ?, ?);',
                [idEchange, brique.id_brique, brique.quantite]
            );
        }
    }

    return idEchange;
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