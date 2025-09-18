// Année dynamique + ,ini-validation côté client
document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('contact_form');
form.addEventListener('submit', (e) => {
    //empêche l'envoi réel et montre un feedback
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const ok = ['prenom','nom','sujet','message'].every(k => (data[k]||'').trim().length>1);
    if(!ok){
        alert('Merci de remplir tous les champs .');
        return;
    }
    else{alert('Merci, votre message a été envoyé (démo).');}
    form.reset();
})