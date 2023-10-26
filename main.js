document.addEventListener('DOMContentLoaded', function() {

    const persoHealthElement = document.querySelector('.persoHealth');
    const persoManaElement = document.querySelector('.persoMana');
    const ennemiHealthElement = document.querySelector('.ennemiHealth');
    const ennemiManaElement = document.querySelector('.ennemiMana');

    let persoHealth = 150;
    let persoMaxHealth = 150;
    let persoMana = 200;
    let persoMaxMana = 200;

    let ennemiHealth = 200;
    let ennemiMaxHealth = 200;
    let ennemiMana = 20;
    let ennemiMaxMana = 200;

    let init = true;
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
        if (init) {
            newMessageElement.classList.add("base");
        }
        else {
            if (playerTurn) {
                newMessageElement.classList.add("player");
            }
            else {
                newMessageElement.classList.add("computer");
            }
        }   
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
/*
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
*/
        let randomAction;

        if (ennemiMana >= 20) {
            randomAction = Math.floor(Math.random() * 3);
        } else if (ennemiMana >= 10) {
            randomAction = Math.floor(Math.random() * 2);
        } else {
            randomAction = 0;
        }

        if (randomAction === 0) {
            persoHealth = persoHealth > 10 ? persoHealth - 10 : 0;
            addToChat("L'ennemi vous attaque pour 10 points de dégâts.");
        } else if (randomAction === 1) {
            ennemiHealth = (ennemiHealth + 15) > ennemiMaxHealth ? 200 : ennemiHealth + 15;
            ennemiMana -= 10;
            addToChat("L'ennemi utilise un sort de soin pour restaurer 15 points de vie.");
        } else {
            persoHealth = persoHealth > 20 ? persoHealth - 20 : 0;
            ennemiMana -= 20;
            addToChat("L'ennemi lance une boule de feu sur vous pour 20 points de dégâts.");
        }

        updatePersoHealth(persoHealth);
        updatePersoHealthBar(persoHealth);

        updateEnnemiHealth(ennemiHealth);
        updateEnnemiHealthBar(ennemiHealth);

        updateEnnemiMana(ennemiMana);
        updateEnnemiManaBar(ennemiMana);

        //si un ennemi peut agir sur le mana du perso, sinon à retirer
        updatePersoMana(persoMana); 
        updatePersoManaBar(persoMana);

        checkResult();
        playerTurn = true; 
    }

    function playerTurnAction(action) {
        if (!playerTurn || persoHealth <= 0) {
            return;
        }

        init = false;
        let damage = 0;
        let heal = 0;

        if (action === 'attack') {
            damage = getRandomInt(5, 15); 
            ennemiHealth = ennemiHealth > damage ? ennemiHealth - damage : 0;
            addToChat(`J'attaque l'ennemi pour ${damage} points de dégâts.`);
        } else if (action === 'fireball') {
            if (persoMana >= 20) {
                damage = getRandomInt(10, 25); 
                ennemiHealth = ennemiHealth > damage ? ennemiHealth - damage : 0;
                persoMana -= 20;
                addToChat(`Je lance une boule de feu sur l'ennemi pour ${damage} points de dégâts.`);
            }
            else {
                addToChat("Vous n'avez pas suffisament de mana pour cette action")
                return;
            }
        } else if (action === 'heal') {
            if (persoMana >= 10) {
                heal = getRandomInt(10, 25); 
                persoHealth = (persoHealth + heal) > persoMaxHealth ? 150 : persoHealth + heal;
                persoMana -= 10;
                addToChat(`Vous utilisez un sort de soin pour restaurer ${heal} points de vie.`);
            }
            else {
                addToChat("Vous n'avez pas suffisament de mana pour cette action")
                return;
            }
        }

        updatePersoHealth(persoHealth);
        updatePersoHealthBar(persoHealth);

        updatePersoMana(persoMana); 
        updatePersoManaBar(persoMana);

        updateEnnemiHealth(ennemiHealth);
        updateEnnemiHealthBar(ennemiHealth);
        
        //si un ennemi peut agir sur le mana du perso, sinon à retirer
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
        persoMana = 200;
        ennemiHealth = 200;
        ennemiMana = 200;

        updatePersoHealth(persoHealth);
        updatePersoHealthBar(persoHealth);
        updatePersoMana(persoMana);
        updatePersoManaBar(persoMana);
        updateEnnemiHealth(ennemiHealth);
        updateEnnemiHealthBar(ennemiHealth);
        updateEnnemiMana(ennemiMana);
        updateEnnemiManaBar(ennemiMana);

        init = true;
        playerTurn = true;
        
        addToChat("Nouveau combat ! C'est à votre tour.");
    });

    function getRandomInt(min, max) {
       
        return Math.floor(Math.random() * (max - min)) + min;
    }

    addToChat("Le combat commence. C'est à votre tour.");
});