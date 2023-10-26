// Variables

let userTurn = true;

const persoMaxHealth = document.querySelector("#persoTotalHealth").innerText;
const persoMinHealth = 0;

const persoMaxMana = document.querySelector("#persoTotalMana").innerText;
const persoMinMana = 0;

const ennemyMaxHealth = document.querySelector("#ennemiTotalHealth").innerText;
const ennemyMinHealth = 0;

const ennemyMaxMana = document.querySelector("#ennemiTotalMana").innerText;
const ennemyMinMana = 0;

const attack = document.querySelector("#attack");
const fireball = document.querySelector("#fireball");
const heal = document.querySelector("#heal");

let playerTurn = true;
let computerDifficulty = 1;


// Fonctions

const init = () => {
    
}

const damageToEnnemy = (value) => {
    const ennemiHealth = document.querySelector("#ennemiHealth");
    const ennemiHealthBar = document.querySelector(".ennemiHealthBar");

    const newHealth = parseInt(ennemiHealth.innerHTML) - value;
    const newWidth = newHealth <= ennemyMinHealth ? 0 : (newHealth / ennemyMaxHealth) * 100;

    ennemiHealth.textContent = newHealth <= ennemyMinHealth ? 0 : newHealth;
    ennemiHealthBar.style.width = `${newWidth}%`;
};

const healToUser = (value) => {
    const persoHealth = document.querySelector("#persoHealth");
    const persoHealthBar = document.querySelector(".persoHealthBar");
    
    const newHealth = parseInt(persoHealth.innerHTML) + value;
    const newWidth = newHealth >= persoMaxHealth ? 100 : (newHealth / persoMaxHealth) * 100;

    persoHealth.textContent = newHealth >= persoMaxHealth ? persoMaxHealth : newHealth;
    persoHealthBar.style.width = `${newWidth}%`;
}

const persoManaSpend = (manaCost) => {
    const persoMana = document.querySelector("#persoMana");
    const persoManaBar = document.querySelector(".persoManaBar");

    const currentMana = parseInt(persoMana.textContent);

    if (currentMana >= manaCost) {
        const newMana = currentMana - manaCost;
        const newWidth = (newMana / persoMaxMana) * 100;

        persoMana.textContent = newMana;
        persoManaBar.style.width = `${newWidth}%`;
    } 
    else {
        alert("Mana insuffisant");
    }
}

const ennemyManaSpend = (manaCost) => {
    const ennemyMana = document.querySelector("#ennemyMana");
    const ennemyManaBar = document.querySelector(".ennemyManaBar");

    const currentMana = parseInt(ennemyMana.textContent);

    if (currentMana >= manaCost) {
        const newMana = currentMana - manaCost;
        const newWidth = (newMana / ennemyMaxMana) * 100;

        ennemyMana.textContent = newMana;
        ennemyManaBar.style.width = `${newWidth}%`;
    } 
    else {
        alert("Mana insuffisant");
    }
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


// Code exécuté

document.addEventListener('DOMContentLoaded', function() {

attack.addEventListener("click", function() {
    const random = Math.floor(Math.random() * 9) + 4;
    damageToEnnemy(random);
    addToChat("J'attaque l'ennemi pour " + random + " points de dégâts.");

    if (ennemiHealth <= 0) {
        document.getElementById('victory-message').textContent = 'Victoire ! Vous avez gagné !';
        document.getElementById('victory-modal').style.display = 'block';
    }
});

fireball.addEventListener("click", function() {
    const random = Math.floor(Math.random() * 21) + 10;
    damageToEnnemy(random);

    addToChat("Je lance une boule de feu sur l'ennemi pour " + random + " points de dégâts.");
    persoManaSpend(10)

        if (ennemiHealth <= 0) {
            document.getElementById('victory-message').textContent = 'Victoire ! Vous avez gagné !';
            document.getElementById('victory-modal').style.display = 'block';
        }
});

heal.addEventListener("click", function() {
    const random = Math.floor(Math.random() * 11) + 10;
    healToUser(random);

    addToChat('Vous utilisez un sort de soin pour restaurer ' + random + ' points de vie.');
    persoManaSpend(10)

    if (persoHealth <= 0) {
        document.getElementById('victory-message').textContent = 'Défaite ! Vous avez perdu !';
        document.getElementById('victory-modal').style.display = 'block';
    }
});
});