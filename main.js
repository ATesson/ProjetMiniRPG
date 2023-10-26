document.addEventListener('DOMContentLoaded', function() {
    const persoHealthElement = document.querySelector('.persoHealth');
    const persoManaElement = document.querySelector('.persoMana');
    const ennemiHealthElement = document.querySelector('.ennemiHealth');
    const ennemiManaElement = document.querySelector('.ennemiMana');

    let persoHealth = 150;
    let persoMaxHealth = 150;
    let persoMana = 150;
    let persoMaxMana = 200;

    let ennemiHealth = 150;
    let ennemiMaxHealth = 200;
    let ennemiMana = 150;
    let ennemiMaxMana = 200;

    let playerTurn = true;
    let computerDifficulty = 1;

    function updatePersoHealth(health) {
        persoHealthElement.textContent = `${health}/${persoMaxHealth}`;
    }

    function updatePersoHealthBar(health) {
        persoHealthElement.style.width = `${health / persoMaxHealth * 100}%`;
    }

    function updatePersoMana(mana) {
        persoManaElement.textContent = `${mana}/${persoMaxMana}`;
    }

    function updatePersoManaBar(mana) {
        persoManaElement.style.width = `${mana / persoMaxMana * 100}%`;
    }

    function updateEnnemiHealth(health) {
        ennemiHealthElement.textContent = `${health}/${ennemiMaxHealth}`;
    }

    function updateEnnemiHealthBar(health) {
        ennemiHealthElement.style.width = `${health / ennemiMaxHealth * 100}%`;
    }

    function updateEnnemiMana(mana) {
        ennemiManaElement.textContent = `${mana}/${ennemiMaxMana}`;
    }

    function updateEnnemiManaBar(mana) {
        ennemiManaElement.style.width = `${mana / persoMaxMana * 100}%`;
    }

    function addToChat(message) {
        const chatMessagesElement = document.getElementById('chat-messages');
        const newMessageElement = document.createElement('p');
        newMessageElement.textContent = message;
        chatMessagesElement.appendChild(newMessageElement);
    }

    function checkResult() {
        if (ennemiHealth <= 0) {
            document.getElementById('victory-message').textContent = 'Victoire ! Vous avez gagné !';
            document.getElementById('victory-modal').style.display = 'block';
            computerDifficulty++;
            updateDifficultyLevel(computerDifficulty);
        } else if (persoHealth <= 0) {
            document.getElementById('victory-message').textContent = 'Défaite ! Vous avez perdu !';
            document.getElementById('victory-modal').style.display = 'block';
        }
    }

    function computerTurn() {
        if (ennemiHealth <= 0 || persoHealth <= 0 || playerTurn) {
            return;
        }

        let randomAction;
        if (computerDifficulty === 1) {        
            randomAction = Math.floor(Math.random() * 3);
        } else if (computerDifficulty === 2) {        
            randomAction = Math.floor(Math.random() * 2); 
        } else {      
            if (persoHealth < 50) {          
                randomAction = 2;
            } else {
                randomAction = Math.floor(Math.random() * 2); 
            }
        }

        if (randomAction === 0) {
            persoHealth -= 10;
            addToChat("L'ennemi vous attaque pour 10 points de dégâts.");
        } else if (randomAction === 1) {
            persoHealth -= 20;
            ennemiMana -= 20;
            addToChat("L'ennemi lance une boule de feu sur vous pour 20 points de dégâts.");
        } else {
            ennemiHealth += 15;
            ennemiMana -= 10;
            addToChat("L'ennemi utilise un sort de soin pour restaurer 15 points de vie.");
        }

        updatePersoHealth(persoHealth);
        updatePersoHealthBar(persoHealth);

        updateEnnemiHealth(ennemiHealth);
        updateEnnemiHealthBar(ennemiHealth);

        updateEnnemiMana(ennemiMana);
        updateEnnemiManaBar(ennemiMana);

        // Si un ennemi peut agir sur le mana du perso, sinon à retirer
        updatePersoMana(persoMana); 
        updatePersoManaBar(persoMana);

        checkResult();
        playerTurn = true; 
    }

    function playerTurnAction(action) {
        if (!playerTurn || persoHealth <= 0) {
            return;
        }

        let damage = 0;
        let heal = 0;

        if (action === 'attack') {
            damage = getRandomInt(5, 15); 
            ennemiHealth -= damage;
            addToChat(`J'attaque l'ennemi pour ${damage} points de dégâts.`);
        } else if (action === 'fireball') {
            damage = getRandomInt(10, 25); 
            ennemiHealth -= damage;
            persoMana -= 20; 
            addToChat(`Je lance une boule de feu sur l'ennemi pour ${damage} points de dégâts.`);
        } else if (action === 'heal') {
            heal = getRandomInt(10, 25); 
            persoHealth += heal;
            persoMana -= 10; 
            addToChat(`Vous utilisez un sort de soin pour restaurer ${heal} points de vie.`);
        }

        updatePersoHealth(persoHealth);
        updatePersoHealthBar(persoHealth);

        updatePersoMana(persoMana); 
        updatePersoManaBar(persoMana);

        updateEnnemiHealth(ennemiHealth);
        updateEnnemiHealthBar(ennemiHealth);
        
        // Si un ennemi peut agir sur le mana du perso, sinon à retirer
        updateEnnemiMana(ennemiMana);
        updateEnnemiManaBar(ennemiMana);

        checkResult();
        playerTurn = false; 
        setTimeout(computerTurn, 20);
    }

    document.getElementById('attack-button').addEventListener('click', function() {
        playerTurnAction('attack');
    });

    document.getElementById('fireball-button').addEventListener('click', function() {
        playerTurnAction('fireball');
    });

    document.getElementById('heal-button').addEventListener('click', function() {
        playerTurnAction('heal');
    });

    document.getElementById('close-modal-button').addEventListener('click', function() {
        document.getElementById('victory-modal').style.display = 'none';

        persoHealth = 150;
        persoMana = 150;
        ennemiHealth = 150;
        ennemiMana = 150;
        updatePersoHealth(persoHealth);
        updatePersoMana(persoMana);
        updateEnnemiHealth(ennemiHealth);
        updateEnnemiMana(ennemiMana);
        playerTurn = true;
        addToChat("Nouveau combat ! C'est à votre tour.");
    });

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    addToChat("Le combat commence. C'est à votre tour.");

    // Exemple de création de personnages Feu, Eau et Terre
    const personnageFeu = new Feu("Personnage Feu");
    const personnageEau = new Eau("Personnage Eau");
    const personnageTerre = new Terre("Personnage Terre");

    personnageFeu.utiliserCompetenceSpeciale();
    personnageEau.utiliserCompetenceSpeciale();
    personnageTerre.utiliserCompetenceSpeciale();
    personnageFeu.attaquer();
    personnageEau.prendreDegats(30);
    personnageTerre.boirePotion();
});
