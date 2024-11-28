// Détails d'un échange
const ExchangeDetail = document.getElementById('detail-visu');
let valeurTotaleEchange = 0;

/**
 * Affiche les détails d'un échange
 * @param {string} nom_echange 
 * @param {string} nom 
 * @param {string} prenom 
 * @param {string} image 
 * @param {string} nom_brique 
 * @param {number} quantite 
 * @param {number} valeur 
 */
function addDetailToClient(nom_echange, nom, prenom, image, nom_brique, quantite, valeur) {

    const ExchangeDetails = document.querySelector('#ExchangeDetails');

    //On ajoute le nom de l'échange
    if (!document.querySelector('#Title_name')) {  
        const Title_name = document.createElement('h1');
        Title_name.id = 'Title_name';  
        Title_name.innerText = nom_echange;
        ExchangeDetails.append(Title_name);

        const Title_user = document.createElement('h2');
        Title_user.id = 'Title_user';  
        Title_user.innerText = "Poster par: " + nom + " " + prenom;
        ExchangeDetails.append(Title_user);
    }

    const li = document.createElement('li');

    //Ajoute l'image de la brique
    const img_brique = document.createElement('img');
    img_brique.src = `../assets/assets/${image}`;
    img_brique.alt = nom;
    li.append(img_brique);

    // ajoute la valeur de la brique
    const brique = document.createElement('h1');
    brique.innerText = nom_brique;
    li.append(brique);

    // ajoute la valeur de la brique
    const p_v_brique = document.createElement('p');
    p_v_brique.innerText = "valeur: " + valeur;
    li.append(p_v_brique);

    // ajoute la valeur de la brique
    const p_q_brique = document.createElement('p');
    p_q_brique.innerText = "quantite: " + quantite;
    li.append(p_q_brique);

     // Calcule la valeur totale pour cette brique (valeur * quantité)
     const totalValue = valeur * quantite;
     const p_total_value = document.createElement('p');
     p_total_value.innerText = "valeur totale de la brique: " + totalValue;
     li.append(p_total_value);
     valeurTotaleEchange += totalValue;
 
     // Met à jour l'affichage de la valeur totale de l'échange
     let p_total_echange = document.querySelector('#total-exchange-value');
     p_total_echange.innerText = "Valeur totale de l'échange : " + valeurTotaleEchange + "$";


     
     

}


// Récupérer les détails de l'échange
async function getDetailServer() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');  
    
    const response = await fetch(`/api/detail/${id}`);
    if (response.ok) {
        const detail = await response.json();

        for (let i = 0; i < detail.length; i++) {
            addDetailToClient(detail[i].nom_echange, detail[i].nom, detail[i].prenom, detail[i].image, detail[i].nom_brique, detail[i].quantite, detail[i].valeur);
        }
    }
}

getDetailServer();
