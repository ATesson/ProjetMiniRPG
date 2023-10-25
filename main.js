// Variables

let userTurn = true;

const persoMaxHealth = document.querySelector("#persoTotalHealth").innerText;
const persoMinHealth = 0;

const ennemyMaxHealth = document.querySelector("#ennemiTotalHealth").innerText;
const ennemyMinHealth = 0;

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

const manaSpend = (action) => {
    const persoMana = document.querySelector("#persoMana");
    const persoManaBar = document.querySelector(".persoManaBar");
}


// Code exécuté

attack.addEventListener("click", function() {
    damageToEnnemy(Math.floor(Math.random() * 9) + 4);
});

fireball.addEventListener("click", function() {
    damageToEnnemy(Math.floor(Math.random() * 21) + 10);
});

heal.addEventListener("click", function() {
    healToUser(Math.floor(Math.random() * 11) + 10);
});