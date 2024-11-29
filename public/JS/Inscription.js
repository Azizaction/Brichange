
    // Gestion de la validation des règles du mot de passe
    const Password = document.getElementById('password-up-form');
    const Password_confirm = document.getElementById('password-up-confirm-form'); 
    const Status = document.getElementById('status-password');
    const erreur = document.getElementById('erreur-connect');
    const Email = document.getElementById('email-up-form');
    const Nom = document.getElementById('nom-form');
    const Prenom = document.getElementById('prenom-form');
    const Form = document.getElementById('Sign-up-form')


    Password.addEventListener('input', function () {
        const password = this.value;

        // Règles de validation
        const rule1 = password.length >= 8;
        const rule2 = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const rule3 = (password.match(/\d/g) || []).length >= 2;

        // Mise à jour des classes selon les règles
        document.getElementById('rule-1').classList.toggle('valid', rule1);
        document.getElementById('rule-2').classList.toggle('valid', rule2);
        document.getElementById('rule-3').classList.toggle('valid', rule3);
    });

      // Confirmation du mot de passe
      Password_confirm.addEventListener('input', function () {
        if (Password.value === Password_confirm.value && Password.value !== '') {
            Status.innerText = "Les mots de passe correspondent ✅";
            Status.style.color = "green";
        } else if (Password_confirm.value === '') {
            Status.innerText = "Veuillez confirmer votre mot de passe";
            Status.style.color = "orange";
        } else {
            Status.innerText = "Les mots de passe ne correspondent pas ❌";
            Status.style.color = "red";
        }
    });
    
    // Gestion de l'affichage/masquage du mot de passe
    const togglePassword = document.getElementById('opt-affichage');
    togglePassword.addEventListener('click', function () {
        const newType = Password.type === 'password' ? 'text' : 'password';
        Password.type = newType;
        togglePassword.textContent = newType === 'password' ? '👁️' : '🙈';
    });

    // Gestion de l'affichage/masquage de la confirmation de mot de passe
    const togglePasswordConfirm = document.getElementById('opt-affichage-confirm');
    togglePasswordConfirm.addEventListener('click', function () {
        const newType = Password_confirm.type === 'password' ? 'text' : 'password';
        Password_confirm.type = newType;
        togglePasswordConfirm.textContent = newType === 'password' ? '👁️' : '🙈';
    });

    function ValiderChamps(nom, prenom, courriel, mot_de_passe){
        if(!nom.value && !prenom.value && !courriel.value && !mot_de_passe.value){
            erreur.innerText = 'Veuillez remplir les champs';
            return false;
        }
        if(!nom.value){
            erreur.innerText = 'Veuillez entrer un Nom';
            return false;
        }
        if(!prenom.value){
            erreur.innerText ='Veuillez entrer un prenom';
            return false;
        }
        if (!courriel.value) {
            erreur.innerText = 'Veuillez entrer une adresse courriel.';
            return false;
        }

        if (!mot_de_passe.value) {
            erreur.innerText = 'Veuillez entrer un mot de passe.';
            return false;
        }

        return true;



    }

async function inscription(event) {
    event.preventDefault();
    if(!ValiderChamps(Nom, Prenom, Email, Password)){
        return;
    }

    const data = {
        nom: Nom.value,
        prenom: Prenom.value,
        courriel: Email.value,
        mot_de_passe: Password.value
    }

    const response = await fetch('/api/user',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if(response.ok){
        location.href ='/Sign-in';
    }
    else if(response.status === 409) {
        erreur.innerText = 'Un compte avec cette adresse courriel existe déjà.';
    }
};

Form.addEventListener('submit',inscription);




    




