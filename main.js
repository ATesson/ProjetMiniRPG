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


// Code exécuté

attack.addEventListener("click", function() {
    damageToEnnemy(Math.floor(Math.random() * 9) + 4);

    addToChat("J'attaque l'ennemi pour " +  + " points de dégâts.");
  
        if (ennemiHealth <= 0) {
            document.getElementById('victory-message').textContent = 'Victoire ! Vous avez gagné !';
            document.getElementById('victory-modal').style.display = 'block';
        }
});

fireball.addEventListener("click", function() {
    damageToEnnemy(Math.floor(Math.random() * 21) + 10);

    addToChat("Je lance une boule de feu sur l'ennemi pour " + damageToEnnemy + " points de dégâts.");
    persoManaSpend(10)

        if (ennemiHealth <= 0) {
            document.getElementById('victory-message').textContent = 'Victoire ! Vous avez gagné !';
            document.getElementById('victory-modal').style.display = 'block';
        }
});

heal.addEventListener("click", function() {
    healToUser(Math.floor(Math.random() * 11) + 10);

    addToChat('Vous utilisez un sort de soin pour restaurer ' + healToUser + ' points de vie.');
    persoManaSpend(5)

    if (persoHealth <= 0) {
        document.getElementById('victory-message').textContent = 'Défaite ! Vous avez perdu !';
        document.getElementById('victory-modal').style.display = 'block';
    }
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