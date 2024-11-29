export const validateNomEchange = (texte) =>
    typeof texte === 'string' &&
    texte.trim() !== '' &&
    texte.length >= 5 &&
    texte.length <= 100;

export const validateQuantitesEchange = (quantiteInputs) => {
    return Array.from(quantiteInputs).some(input => parseInt(input.value, 10) >= 1);
}

export const validateCourriel = (courriel) =>
    typeof courriel === 'string' &&
    courriel &&
    courriel.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);

export const validateMotDePasse = (mot_de_passe) =>
    typeof mot_de_passe === 'string' &&
    mot_de_passe &&
    mot_de_passe.length >= 4;

export const validatenom = (nom) =>
    typeof nom === 'string' &&
    nom &&
    nom.length >= 2;


export const validateprenom = (prenom) =>
    typeof prenom === 'string' &&
    prenom &&
    prenom.length >= 2;