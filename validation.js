export const validateNomEchange = (texte)=>
    typeof texte === 'string' &&
    texte.trim() !== '' &&
    texte.length >= 5 &&
    texte.length <= 100;

export const validateQuantitesEchange = (quantiteInputs)=>{
    return Array.from(quantiteInputs).some(input => parseInt(input.value, 10) >= 1);
}
