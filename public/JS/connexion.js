
const formAuth = document.getElementById('Sign-form');
const Email = document.getElementById('Email');
const Password = document.getElementById('password');
const erreurAuth = document.getElementById('erreur-auth');



    // Gestion de l'affichage/masquage du mot de passe
    const togglePassword = document.getElementById('opt-affichage');
    togglePassword.addEventListener('click', function () {
        const newType = Password.type === 'password' ? 'text' : 'password';
        Password.type = newType;
        togglePassword.textContent = newType === 'password' ? '👁️' : '🙈';
    });



//validation pour s assurer que tous les champs soient remplis 
function validerChamp(courriel, mot_de_passe) {
        if (!courriel.value && !mot_de_passe.value) {
            erreurAuth.innerText = 'Veuillez remplir les champs.';
            return false;
        }

        if (!courriel.value) {
            erreurAuth.innerText = 'Veuillez entrer une adresse courriel.';
            return false;
        }

        if (!mot_de_passe.value) {
            erreurAuth.innerText = 'Veuillez entrer un mot de passe.';
            return false;
        }

        return true;
    }

//validation

async function connexion(event) {
        event.preventDefault();


        if (!validerChamp(Email, Password)) {
            return;
        }

        const data = {
            courriel: Email.value,
            mot_de_passe: Password.value
        };


        const response = await fetch('/api/connexion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            location.replace('/');
        }
        else if (response.status === 401) {
            const message = await response.json();
            if (message.erreur === 'mauvais_courriel') {
                erreurAuth.innerText = 'Un compte avec ce courriel n\'existe pas.';
            }
            else if (message.erreur === 'mauvais_motdepasse') {
                erreurAuth.innerText = 'Le mot de passe entré n\'est pas bon.';
            }
        }
    }

formAuth.addEventListener('submit', connexion)
