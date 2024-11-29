// const ExchangeList = document.getElementById('echange-visu');
// const BriqueList = document.getElementById('creation-visu');
// const nom_texte = document.getElementById('form-text');
// const form = document.getElementById('form-echange');
// const ID_btn = document.getElementById('data-id');
// const Profil = document.getElementById('profil-visu');
// const quantites = document.querySelectorAll('#quan-input');
// const erreurEchangeText = document.getElementById('erreur-echange-text')
// const ExchangeDetail = document.getElementById('detail-visu');

// /**
//  * Ajoute tous les echanges sut l'interface graphique
//  * @param {string} nom_echange 
//  * @param {string} nom 
//  * @param {string} prenom 
//  * @param {number} id_echange 
//  */
// function addEchangeToClient(nom_echange, nom, prenom, id_echange) {

//     const li = document.createElement('li');

//     // Ajoute le nom de l'échange
//     const p_e = document.createElement('p');
//     p_e.innerText = nom_echange;
//     li.append(p_e);

//     // Ajoute le nom de l'utilisateur
//     const p_u = document.createElement('p');
//     p_u.innerText = nom + "" + prenom;
//     li.append(p_u);

//     //Ajout d'un bouton pour accerdée
//     const btn_dtl = document.createElement('a');
//     btn_dtl.innerText = "Voir l'échange";
//     btn_dtl.dataset.id = id_echange;  
//     btn_dtl.href = `/echange?id=${id_echange}`;  
//     btn_dtl.onclick = function(event) {
//         event.preventDefault();  
//         window.location.href = `/echange?id=${this.dataset.id}`; 
//     };
//     li.append(btn_dtl);
    

//     // Ajouter dans la liste
//     ExchangeList.append(li);
// }

// /**
//  * Nous donne toute les briques 
//  * @param {string} nom 
//  * @param {string} nom_couleur 
//  * @param {href} image 
//  * @param {number} valeur 
//  * @param {number} id_brique 
//  */
// let briquesQuantite={};
// function addBriqueToClient(image, nom, nom_couleur, valeur, id_brique) {

//     const li = document.createElement('li');

//     //Ajoute l'image de la brique
//     const img_brique = document.createElement('img');
//     img_brique.src = `../assets/assets/${image}`;
//     img_brique.alt = nom;
//     li.append(img_brique);

//     // ajoute le nom de la brique
//     const h1_brique = document.createElement('h1');
//     h1_brique.innerText = nom;
//     li.append(h1_brique);

//     // ajoute la couleur de la brique
//     const p_c_brique = document.createElement('p');
//     p_c_brique.innerText = "couleur: " + nom_couleur;
//     li.append(p_c_brique);


//     // ajoute la valeur de la brique
//     const p_v_brique = document.createElement('p');
//     p_v_brique.innerText = "valeur: " + valeur;
//     li.append(p_v_brique);

//     //Ajoute la quantité quand veut saisir
//     const quan_brique = document.createElement('input');
//     quan_brique.type = "number";
//     quan_brique.step = 1;
//     quan_brique.min = 0;
//     quan_brique.id = "quan-input";
//     quan_brique.dataset.id = id_brique;

//     quan_brique.oninput = function () {
//         briquesQuantite[id_brique] = parseInt(this.value)
//     };


//     li.append(quan_brique);

//     BriqueList.append(li);
// }


// /**
//  * On affiche les details de l'échange 
// * @param{string}nom
// * @param{string}prenom
// * @param{number}quantite
// * @param{number}valeur
// * @param{string}image
// * @param{string}nom_brique
// * @param{string}nom_echange
//  */
// let valeurTotaleEchange = 0;
// function addDetailToClient(nom_echange, nom, prenom, image, nom_brique, quantite, valeur) {

//     const ExchangeDetails = document.querySelector('#ExchangeDetails');

//     //On ajoute le nom de l'échange
//     if (!document.querySelector('#Title_name')) {  
//         const Title_name = document.createElement('h1');
//         Title_name.id = 'Title_name';  
//         Title_name.innerText = nom_echange;
//         ExchangeDetails.append(Title_name);

//         const Title_user = document.createElement('h2');
//         Title_user.id = 'Title_user';  
//         Title_user.innerText = "Poster par: " + nom + " " + prenom;
//         ExchangeDetails.append(Title_user);
//     }

//     const li = document.createElement('li');

//     //Ajoute l'image de la brique
//     const img_brique = document.createElement('img');
//     img_brique.src = `../assets/assets/${image}`;
//     img_brique.alt = nom;
//     li.append(img_brique);

//     // ajoute la valeur de la brique
//     const brique = document.createElement('h1');
//     brique.innerText = nom_brique;
//     li.append(brique);

//     // ajoute la valeur de la brique
//     const p_v_brique = document.createElement('p');
//     p_v_brique.innerText = "valeur: " + valeur;
//     li.append(p_v_brique);

//     // ajoute la valeur de la brique
//     const p_q_brique = document.createElement('p');
//     p_q_brique.innerText = "quantite: " + quantite;
//     li.append(p_q_brique);

//      // Calcule la valeur totale pour cette brique (valeur * quantité)
//      const totalValue = valeur * quantite;
//      const p_total_value = document.createElement('p');
//      p_total_value.innerText = "valeur totale de la brique: " + totalValue;
//      li.append(p_total_value);
//      valeurTotaleEchange += totalValue;
 
//      // Met à jour l'affichage de la valeur totale de l'échange
//      let p_total_echange = document.querySelector('#total-exchange-value');
//      p_total_echange.innerText = "Valeur totale de l'échange : " + valeurTotaleEchange + "$";


     
     

// }

// function addEchangeToProfil(nom_echange, nom, prenom, id_echange) {

//     const li = document.createElement('li');

//     // Ajoute le nom de l'échange
//     const p_e = document.createElement('p');
//     p_e.innerText = nom_echange;
//     li.append(p_e);

//     // Ajoute le nom de l'utilisateur
//     const p_u = document.createElement('p');
//     p_u.innerText = nom + "" + prenom;
//     li.append(p_u);

//     //Ajout d'un bouton pour accerdée
//     const btn_dtl = document.createElement('a');
//     btn_dtl.innerText = "Voir l'échange";
//     btn_dtl.dataset.id = id_echange;  
//     btn_dtl.href = `/echange?id=${id_echange}`;  
//     btn_dtl.onclick = function(event) {
//         event.preventDefault();  
//         window.location.href = `/echange?id=${this.dataset.id}`; 
//     };
//     li.append(btn_dtl)

//     //Ajout d'un bouton pour accerdée
//     const btn_sup = document.createElement('a');
//     btn_sup.innerText = "Supprimer";
//     btn_sup.href ='#'
//     btn_sup.onclick =(event) => {
//         event.preventDefault();
//         deleteEchangeServeur(id_echange, li);
//     };
//     li.append(btn_sup);
    

//     // Ajouter dans la liste
//     Profil.append(li);
// }

// async function getExchangeServer() {
//     const response = await fetch('/api/echanges');
//     if (response.ok) {

//         const echange = await response.json();

//         for (let i = 0; i < echange.length; i++) {
//             addEchangeToClient(echange[i].nom_echange, echange[i].nom, echange[i].prenom, echange[i].id_echange);
//         }

//     }
// }

// async function getProfilServer() {
//     const response = await fetch('/api/echanges');
//     if (response.ok) {

//         const echange = await response.json();

//         for (let i = 0; i < echange.length; i++) {
//             addEchangeToProfil(echange[i].nom_echange, echange[i].nom, echange[i].prenom, echange[i].id_echange);
//         }

//     }
// }

// async function getBriqueServer() {
//     const response = await fetch('/api/brique');
//     if (response.ok) {

//         const brique = await response.json();

//         for (let i = 0; i < brique.length; i++) {
//             addBriqueToClient(brique[i].image, brique[i].nom, brique[i].nom_couleur, brique[i].valeur, brique[i].id_brique);
//         }
//     }

// }

// async function getDetailServer() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const id = urlParams.get('id');  
    
//     const response = await fetch(`/api/detail/${id}`);
//     if (response.ok) {
//         const detail = await response.json();

//         for (let i = 0; i < detail.length; i++) {
//             addDetailToClient(detail[i].nom_echange, detail[i].nom, detail[i].prenom, detail[i].image, detail[i].nom_brique, detail[i].quantite, detail[i].valeur);
//         }
//     }
// }
// // Pour faire l'ajout dans la base de donnée
// async function addEchangeServeur(event) {
//     event.preventDefault();
   
//     if(!form.checkValidity()) {
//         return;
//     }

    
//     const briques = []; 
//     const quantites = Object.keys(briquesQuantite);
    

//     quantites.forEach(id_brique=> {
//         const quantite = briquesQuantite[id_brique] 
//         briques.push({ id_brique, quantite });  
        
//     });
   
//     const data = {
//         nom_echange: nom_texte.value,
//         briques:briques
//     }
//     const response = await fetch('/api/exchange', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data)

//     })

//     if (response.ok) {
//         const result = await response.json();
//         alert("Échange créé avec succès");
//         addEchangeToClient(nom_texte.value, "Christiansen", "Ole Kirk", result.id);
//         getDetailServer(result.id);
//         // Réinitialiser le formulaire
//         window.location.href = '/autre-page';
//         nom_texte.value = '';
//         nom_texte.focus();
//     }

// }



// function validateNomEchange(){
//     if(nom_texte.validity.valid){
//         nom_texte.classList.remove('erreur');
//         erreurEchangeText.innerText='';
//     }
//     else{
//         nom_texte.classList.add('erreur');
//         if(nom_texte.validity.valueMissing){
//             erreurEchangeText.innerText = 'Le champs de texte doit être remplis.';
//         }
//         else if (nom_texte.validity.tooShort){
//             erreurEchangeText.innerText = 'Le champs de texte doit contenir au moins 5 caracteres.';
//         }
//         else if (nom_texte.validity.tooLong){
//             erreurEchangeText.innerText = 'Le champs de texte doit contenir au maximum 100 caracteres.';
//         }

//     }
// }



// getExchangeServer();

// getBriqueServer();

// getDetailServer();

// getProfilServer();



// addEchangeServeur();

// form.addEventListener('submit', validateNomEchange);
// nom_texte.addEventListener('input', validateNomEchange);
// form.addEventListener("submit", addEchangeServeur)

