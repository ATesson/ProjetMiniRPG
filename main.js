document.addEventListener('DOMContentLoaded', function() {
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
            // Niveau de difficulté 1 : l'ordinateur choisit des actions aléatoires simples
            randomAction = Math.floor(Math.random() * 3);
        } else if (computerDifficulty === 2) {
            // Niveau de difficulté 2 : l'ordinateur inflige plus de dégâts
            randomAction = Math.floor(Math.random() * 2); // Éliminez une des options
        } else {
            // Niveau de difficulté 3 : l'ordinateur est plus stratégique
            if (persoHealth < 50) {
                // Si le joueur a moins de 50 points de vie, l'ordinateur utilise un sort de soin
                randomAction = 2;
            } else {
                // Sinon, il inflige plus de dégâts
                randomAction = Math.floor(Math.random() * 2); // Éliminez une des options
            }
        }

        if (randomAction === 0) {
            persoHealth -= 10;
            ennemiMana += 5;
            addToChat("L'ennemi vous attaque pour 10 points de dégâts.");
        } else if (randomAction === 1) {
            persoHealth -= 20;
            ennemiMana += 10;
            persoMana -= 10;
            addToChat("L'ennemi lance une boule de feu sur vous pour 20 points de dégâts.");
        } else {
            ennemiHealth += 15;
            ennemiMana -= 10;
            addToChat("L'ennemi utilise un sort de soin pour restaurer 15 points de vie.");
        }

        updatePersoHealth(persoHealth);
        updateEnnemiMana(ennemiMana);
        updatePersoMana(persoMana);
        updateEnnemiHealth(ennemiHealth);

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
            damage = getRandomInt(5, 15); // Génère des dégâts aléatoires entre 5 et 14
            ennemiHealth -= damage;
            persoMana += getRandomInt(2, 8); // Génère de la mana aléatoire entre 2 et 7
            addToChat(`J'attaque l'ennemi pour ${damage} points de dégâts.`);
        } else if (action === 'fireball') {
            damage = getRandomInt(10, 25); // Génère des dégâts aléatoires entre 10 et 24
            ennemiHealth -= damage;
            persoMana += getRandomInt(5, 15); // Génère de la mana aléatoire entre 5 et 14
            addToChat(`Je lance une boule de feu sur l'ennemi pour ${damage} points de dégâts.`);
        } else if (action === 'heal') {
            heal = getRandomInt(10, 25); // Génère des points de soin aléatoires entre 10 et 24
            persoHealth += heal;
            persoMana -= getRandomInt(5, 15); // Génère de la mana aléatoire entre 5 et 14
            addToChat(`Vous utilisez un sort de soin pour restaurer ${heal} points de vie.`);
        }

        updatePersoHealth(persoHealth);
        updateEnnemiHealth(ennemiHealth);
        updatePersoMana(persoMana);
        checkResult();
        playerTurn = false; 
        setTimeout(computerTurn, 2000);
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
        // Fonction utilitaire pour obtenir un entier aléatoire entre min (inclus) et max (exclus)
        return Math.floor(Math.random() * (max - min)) + min;
    }

    addToChat("Le combat commence. C'est à votre tour.");
});
