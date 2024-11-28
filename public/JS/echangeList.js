// Gestion des échanges (liste)
const ExchangeList = document.getElementById('echange-visu');

/**
 * Ajoute tous les échanges sur l'interface graphique
 * @param {string} nom_echange 
 * @param {string} nom 
 * @param {string} prenom 
 * @param {number} id_echange 
 */
function addEchangeToClient(nom_echange, nom, prenom, id_echange) {

    const li = document.createElement('li');

    // Ajoute le nom de l'échange
    const p_e = document.createElement('p');
    p_e.innerText = nom_echange;
    li.append(p_e);

    // Ajoute le nom de l'utilisateur
    const p_u = document.createElement('p');
    p_u.innerText = nom + "" + prenom;
    li.append(p_u);

    //Ajout d'un bouton pour accerdée
    const btn_dtl = document.createElement('a');
    btn_dtl.innerText = "Voir l'échange";
    btn_dtl.dataset.id = id_echange;  
    btn_dtl.href = `/echange?id=${id_echange}`;  
    btn_dtl.onclick = function(event) {
        event.preventDefault();  
        window.location.href = `/echange?id=${this.dataset.id}`; 
    };
    li.append(btn_dtl);
    

    // Ajouter dans la liste
    ExchangeList.append(li);
}


// Récupérer les échanges depuis le serveur
async function getExchangeServer() {
    const response = await fetch('/api/echanges');
    if (response.ok) {

        const echange = await response.json();

        for (let i = 0; i < echange.length; i++) {
            addEchangeToClient(echange[i].nom_echange, echange[i].nom, echange[i].prenom, echange[i].id_echange);
        }

    }
}
// Lancer la récupération des échanges
getExchangeServer();
