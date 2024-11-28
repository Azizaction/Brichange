// Création d'un échange
const BriqueList = document.getElementById('creation-visu');
const nom_texte = document.getElementById('form-text');
const form = document.getElementById('form-echange');
const erreurEchangeText = document.getElementById('erreur-echange-text');
let briquesQuantite = {};

/**
 * Ajoute une brique sur l'interface graphique
 * @param {string} image 
 * @param {string} nom 
 * @param {string} nom_couleur 
 * @param {number} valeur 
 * @param {number} id_brique 
 */
function addBriqueToClient(image, nom, nom_couleur, valeur, id_brique) {

    const li = document.createElement('li');

    //Ajoute l'image de la brique
    const img_brique = document.createElement('img');
    img_brique.src = `../assets/assets/${image}`;
    img_brique.alt = nom;
    li.append(img_brique);

    // ajoute le nom de la brique
    const h1_brique = document.createElement('h1');
    h1_brique.innerText = nom;
    li.append(h1_brique);

    // ajoute la couleur de la brique
    const p_c_brique = document.createElement('p');
    p_c_brique.innerText = "couleur: " + nom_couleur;
    li.append(p_c_brique);


    // ajoute la valeur de la brique
    const p_v_brique = document.createElement('p');
    p_v_brique.innerText = "valeur: " + valeur;
    li.append(p_v_brique);

    //Ajoute la quantité quand veut saisir
    const quan_brique = document.createElement('input');
    quan_brique.type = "number";
    quan_brique.step = 1;
    quan_brique.min = 0;
    quan_brique.id = "quan-input";
    quan_brique.dataset.id = id_brique;

    quan_brique.oninput = function () {
        briquesQuantite[id_brique] = parseInt(this.value)
    };


    li.append(quan_brique);

    BriqueList.append(li);
}


// Valider le formulaire
function validateNomEchange(){
    if(nom_texte.validity.valid){
        nom_texte.classList.remove('erreur');
        erreurEchangeText.innerText='';
    }
    else{
        nom_texte.classList.add('erreur');
        if(nom_texte.validity.valueMissing){
            erreurEchangeText.innerText = 'Le champs de texte doit être remplis.';
        }
        else if (nom_texte.validity.tooShort){
            erreurEchangeText.innerText = 'Le champs de texte doit contenir au moins 5 caracteres.';
        }
        else if (nom_texte.validity.tooLong){
            erreurEchangeText.innerText = 'Le champs de texte doit contenir au maximum 100 caracteres.';
        }

    }
}


// Envoyer les données de l'échange
async function addEchangeServeur(event) {
    event.preventDefault();

    const briques = Object.keys(briquesQuantite).map(id => ({
        id_brique: id,
        quantite: briquesQuantite[id]
    }));

    const data = {
        nom_echange: nom_texte.value,
        briques
    };

    const response = await fetch('/api/exchange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        window.location.href = '/';
    }
}


// Récupérer les briques
async function getBriqueServer() {
    const response = await fetch('/api/brique');
    if (response.ok) {

        const brique = await response.json();

        for (let i = 0; i < brique.length; i++) {
            addBriqueToClient(brique[i].image, brique[i].nom, brique[i].nom_couleur, brique[i].valeur, brique[i].id_brique);
        }
    }

}

getBriqueServer();
form.addEventListener('submit', validateNomEchange);
form.addEventListener('submit', addEchangeServeur);
nom_texte.addEventListener('input', validateNomEchange);
