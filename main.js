document.addEventListener('DOMContentLoaded', function() {

    let persoHealth = 150;
    let persoMaxHealth = 150;
    let persoMana = 150;
    let persoMaxMana = 200;


    let ennemiHealth = 150;
    let ennemiMaxHealth = 200;
    let ennemiMana = 150;
    let ennemiMaxMana = 200;


    function updatePersoHealth(health) {
        const persoHealthElement = document.querySelector('.persoHealth');
        persoHealthElement.textContent = `${health}/${persoMaxHealth}`;
    }


    function updatePersoMana(mana) {
        const persoManaElement = document.querySelector('.persoMana');
        persoManaElement.textContent = `${mana}/${persoMaxMana}`;
    }


    function updateEnnemiHealth(health) {
        const ennemiHealthElement = document.querySelector('.ennemiHealth');
        ennemiHealthElement.textContent = `${health}/${ennemiMaxHealth}`;
    }

  
    function updateEnnemiMana(mana) {
        const ennemiManaElement = document.querySelector('.ennemiMana');
        ennemiManaElement.textContent = `${mana}/${ennemiMaxMana}`;
    }


    function addToChat(message) {
        const chatMessagesElement = document.getElementById('chat-messages');
        const newMessageElement = document.createElement('p');
        newMessageElement.textContent = message;
        chatMessagesElement.appendChild(newMessageElement);
    }


    document.getElementById('attack-button').addEventListener('click', function() {
        if (ennemiHealth <= 0) {
            return; 
        }
 
        ennemiHealth -= 10;  
        persoMana += 5;     
     
        updatePersoMana(persoMana);
        updateEnnemiHealth(ennemiHealth);
        addToChat("J'attaque l'ennemi pour 10 points de dégâts.");
  
        if (ennemiHealth <= 0) {
            document.getElementById('victory-message').textContent = 'Victoire ! Vous avez gagné !';
            document.getElementById('victory-modal').style.display = 'block';
        }
    });


    document.getElementById('fireball-button').addEventListener('click', function() {
        if (ennemiHealth <= 0) {
            return; 
        }
   
        ennemiHealth -= 20; 
        persoMana += 10;    

        updatePersoMana(persoMana);
        updateEnnemiHealth(ennemiHealth);
        addToChat("Je lance une boule de feu sur l'ennemi pour 20 points de dégâts.");

        if (ennemiHealth <= 0) {
            document.getElementById('victory-message').textContent = 'Victoire ! Vous avez gagné !';
            document.getElementById('victory-modal').style.display = 'block';
        }
    });


    document.getElementById('heal-button').addEventListener('click', function() {
        if (persoHealth <= 0) {
            return; 
        }

        persoHealth += 15; 
        persoMana -= 10;  

        updatePersoHealth(persoHealth);
        updatePersoMana(persoMana);
        addToChat('Vous utilisez un sort de soin pour restaurer 15 points de vie.');

        if (persoHealth <= 0) {
            document.getElementById('victory-message').textContent = 'Défaite ! Vous avez perdu !';
            document.getElementById('victory-modal').style.display = 'block';
        }
    });
    document.getElementById('close-modal-button').addEventListener('click', function() {
        document.getElementById('victory-modal').style.display = 'none';
    });

document.getElementById('ennemi-attack-button').addEventListener('click', function() {
  
    persoHealth -= 10; 
    ennemiMana += 5;  
    updatePersoHealth(persoHealth);
    updateEnnemiMana(ennemiMana);
    addToChat('L\'ennemi vous attaque pour 10 points de dégâts.');
    checkResult();
});


document.getElementById('ennemi-fireball-button').addEventListener('click', function() {
   
    persoHealth -= 20;
    ennemiMana += 10;  
    persoMana -= 10;  
    updatePersoHealth(persoHealth);
    updateEnnemiMana(ennemiMana);
    updatePersoMana(persoMana);
    addToChat("L'ennemi lance une boule de feu sur vous pour 20 points de dégâts.");
    checkResult();
});


document.getElementById('ennemi-heal-button').addEventListener('click', function() {
   
    ennemiHealth += 15; 
    ennemiMana -= 10; 
    updateEnnemiHealth(ennemiHealth);
    updateEnnemiMana(ennemiMana);
    addToChat("L'ennemi utilise un sort de soin pour restaurer 15 points de vie.");
    checkResult();
});

function checkResult() {
    if (ennemiHealth <= 0) {
        document.getElementById('victory-message').textContent = 'Victoire ! Vous avez gagné !';
        document.getElementById('victory-modal').style.display = 'block';
    } else if (persoHealth <= 0) {
        document.getElementById('victory-message').textContent = 'Défaite ! Vous avez perdu !';
        document.getElementById('victory-modal').style.display = 'block';
    }
}

    
});
