//Pour faire la suppression d'un echange sur le serveur
async function deleteEchangeServeur(id_echange, li) {
    const response = await fetch(`/api/suppression/${id_echange}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        li.remove();
        alert("Échange supprimé avec succès");
    }
}

deleteEchangeServeur();