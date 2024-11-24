import { connexion } from "../DB/db.js";

/**
 * @returns toute les brique qui a dans la basse de donnée  
 */

export async function getBriques() {
    const brique = await connexion.all(`SELECT brique.*,couleur.nom AS nom_couleur
        FROM brique
        JOIN couleur ON brique.id_couleur = couleur.id_couleur ;`);
    return brique;
}