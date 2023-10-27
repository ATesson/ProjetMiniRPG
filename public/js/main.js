import { Feu, Eau, Terre } from "../../Models/Personnage.js";

document.addEventListener("DOMContentLoaded", function () {
  // Variables

  const urlParams = new URLSearchParams(window.location.search);
  const character = urlParams.get("character");
  const difficulty = urlParams.get("difficulty");

  const specialAttackButton = document.getElementById("special-attack-button");
  const persoHealthElement = document.querySelector(".persoHealth");
  const persoManaElement = document.querySelector(".persoMana");
  const ennemiHealthElement = document.querySelector(".ennemiHealth");
  const ennemiManaElement = document.querySelector(".ennemiMana");
  const difficultyDisplay = document.querySelector("#selected-difficulty")

  const fireFighter = new Feu("Fire_Fighter");
  const waterWarrior = new Eau ("Water_Warrior");
  const earthDefender = new Terre ("Earth_Defender");

  if (character == "feu") {
    specialAttackButton.textContent = "Explosion de Feu";
    var persoHealth = fireFighter.sante;
    var persoMaxHealth = fireFighter.sante;
    var persoMana = fireFighter.mana;
    var persoMaxMana = fireFighter.mana;
    persoHealthElement.textContent = `${persoHealth} / ${persoMaxHealth}` ;
    persoManaElement.textContent = `${persoMana} / ${persoMaxMana}`;
  } else if (character == "eau") {
    specialAttackButton.textContent = "Tsunami";
    var persoHealth = waterWarrior.sante;
    var persoMaxHealth = waterWarrior.sante;
    var persoMana = waterWarrior.mana;
    var persoMaxMana = waterWarrior.mana;
    persoHealthElement.textContent = `${persoHealth} / ${persoMaxHealth}` ;
    persoManaElement.textContent = `${persoMana} / ${persoMaxMana}`;
  } else if (character == "terre") {
    specialAttackButton.textContent = "Lancé de Pierre";
    var persoHealth = earthDefender.sante;
    var persoMaxHealth = earthDefender.sante;
    var persoMana = earthDefender.mana;
    var persoMaxMana = earthDefender.mana;
    persoHealthElement.textContent = `${persoHealth} / ${persoMaxHealth}` ;
    persoManaElement.textContent = `${persoMana} / ${persoMaxMana}`;
  }

  let init = true;
  let gameStart = true;
  let playerTurn = true;
  let computerDifficulty = 1;
  console.log(difficulty)
  console.log(computerDifficulty)
  

  let ennemiHealth = 0;
  let ennemiMaxHealth = 0;
  let ennemiMana = 0;
  let ennemiMaxMana = 0;
  
  initialization()

  //Fonctions

  function initialization() {

    const stageNumber = document.querySelector("h1");
    stageNumber.textContent = `Stage ${computerDifficulty}`;

    const persoPicture = document.querySelector(".perso img");
    if (character == "feu") {
      persoPicture.src ="../img/perso1.jpg";
    } else if (character == "eau") {
      persoPicture.src ="../img/perso4.jpg";
    } else {
      persoPicture.src ="../img/perso3.jpg";
    }
    
    persoHealth = persoMaxHealth;
    persoMana = persoMaxMana;

    ennemiHealth = 100 + 10 * (computerDifficulty + parseInt(difficulty) - 1);
    ennemiMaxHealth = ennemiHealth;
    ennemiMana = 100 + 10 * (computerDifficulty + parseInt(difficulty) - 1);
    ennemiMaxMana = ennemiMana;
    console.log(difficulty)
    console.log(computerDifficulty)
    updatePersoHealth(persoHealth);
    updatePersoHealthBar(persoMaxHealth);
    updatePersoMana(persoMana);
    updatePersoManaBar(persoMaxMana);
    updateEnnemiHealth(ennemiHealth);
    updateEnnemiHealthBar(ennemiHealth);
    updateEnnemiMana(ennemiMana);
    updateEnnemiManaBar(ennemiMana);

    init = true;
    playerTurn = true;

    if (!gameStart) {
      addToChat("Nouveau combat ! C'est à votre tour.");
    }

    gameStart = false;
  }

  function randomPicture() {
    const ennemiPictures = [
      "../img/dragon1.jpg",
      "../img/dragon2.jpg",
      "../img/goblin1.jpg",
      "../img/goblin2.jpg",
      "../img/monstre1.jpg",
      "../img/monstre2.jpg",
    ];
    const randomIndex = Math.floor(Math.random() * ennemiPictures.length);
    const randomImage = ennemiPictures[randomIndex];

    const ennemiPicture = document.querySelector(".ennemi img");
    ennemiPicture.src = randomImage;
  }

  function updatePersoHealth(health) {
    persoHealthElement.textContent = `${health}/${persoMaxHealth}`;
  }

  function updatePersoHealthBar(health) {
    persoHealthElement.style.width = `${(health / persoMaxHealth) * 100}%`;
  }

  function updatePersoMana(mana) {
    persoManaElement.textContent = `${mana}/${persoMaxMana}`;
  }

  function updatePersoManaBar(mana) {
    persoManaElement.style.width = `${(mana / persoMaxMana) * 100}%`;
  }

  function updateEnnemiHealth(health) {
    ennemiHealthElement.textContent = `${health}/${ennemiMaxHealth}`;
  }

  function updateEnnemiHealthBar(health) {
    ennemiHealthElement.style.width = `${(health / ennemiMaxHealth) * 100}%`;
  }

  function updateEnnemiMana(mana) {
    ennemiManaElement.textContent = `${mana}/${ennemiMaxMana}`;
  }

  function updateEnnemiManaBar(mana) {
    ennemiManaElement.style.width = `${(mana / ennemiMaxMana) * 100}%`;
  }

  function addToChat(message) {
    const chatMessagesElement = document.getElementById("chat-messages");
    const newMessageElement = document.createElement("p");
    newMessageElement.textContent = message;
    if (init) {
      newMessageElement.classList.add("base");
    } else {
      if (playerTurn) {
        newMessageElement.classList.add("player");
      } else {
        newMessageElement.classList.add("computer");
      }
    }
    chatMessagesElement.appendChild(newMessageElement);
    newMessageElement.scrollIntoView();
  }

  function checkResult() {
    const nextModalButton = document.getElementById("next-modal-button");

    if (ennemiHealth <= 0) {
      document.getElementById("victory-message").textContent =
        "Victoire ! Vous avez gagné !";
      document.getElementById("victory-modal").style.display = "block";
      nextModalButton.disabled = false;
      nextModalButton.style.backgroundColor = "#007BFF";
    } else if (persoHealth <= 0) {
      document.getElementById("victory-message").textContent =
        "Défaite ! Vous avez perdu !";
      document.getElementById("victory-modal").style.display = "block";
      nextModalButton.disabled = true;
      nextModalButton.style.backgroundColor = "#A0CFFF";
    }
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function computerTurn() {
    if (ennemiHealth <= 0 || persoHealth <= 0 || playerTurn) {
      return;
    }

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
      ennemiHealth =
        ennemiHealth + 15 > ennemiMaxHealth
          ? ennemiMaxHealth
          : ennemiHealth + 15;
      ennemiMana -= 10;
      addToChat(
        "L'ennemi utilise un sort de soin pour restaurer 15 points de vie."
      );
    } else {
      persoHealth = persoHealth > 20 ? persoHealth - 20 : 0;
      ennemiMana -= 20;
      addToChat(
        "L'ennemi lance une boule de feu sur vous pour 20 points de dégâts."
      );
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

    if (action === "attack") {
      damage = getRandomInt(5, 15);
      ennemiHealth = ennemiHealth > damage ? ennemiHealth - damage : 0;
      addToChat(`J'attaque l'ennemi pour ${damage} points de dégâts.`);
    } else if (action === "specialAttack") {
      if (character == "feu") {
        if (persoMana >= 20) {
          damage = getRandomInt(10, 25);
          ennemiHealth = ennemiHealth > damage ? ennemiHealth - damage : 0;
          persoMana -= 20;
          addToChat(`Je lance une boule de feu sur l'ennemi pour ${damage} points de dégâts.`);
        } else {
          addToChat("Vous n'avez pas suffisamment de mana pour cette action");
          return;
        }
      } else if (character == "eau") {
        if (persoMana >= 20) {
          damage = getRandomInt(10, 25);
          ennemiHealth = ennemiHealth > damage ? ennemiHealth - damage : 0;
          persoMana -= 20;
          addToChat(`Je lance un tsunami sur l'ennemi pour ${damage} points de dégâts.`);
        } else {
          addToChat("Vous n'avez pas suffisamment de mana pour cette action");
          return;
        }
      } else if (character == "terre") {
        if (persoMana >= 20) {
          damage = getRandomInt(10, 25);
          ennemiHealth = ennemiHealth > damage ? ennemiHealth - damage : 0;
          persoMana -= 20;
          addToChat(`Je lance des pierres sur l'ennemi pour ${damage} points de dégâts.`);
        } else {
          addToChat("Vous n'avez pas suffisamment de mana pour cette action");
          return;
        }
      }
    } else if (action === "heal") {
      if (persoMana >= 10) {
        heal = getRandomInt(10, 25);
        persoHealth =
          persoHealth + heal > persoMaxHealth
            ? persoMaxHealth
            : persoHealth + heal;
        persoMana -= 10;
        addToChat(
          `Vous utilisez un sort de soin pour restaurer ${heal} points de vie.`
        );
      } else {
        addToChat("Vous n'avez pas suffisament de mana pour cette action");
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
    setTimeout(computerTurn, 500);
  }


// Code exécuté

  if (difficulty == 0) {
    difficultyDisplay.textContent = "Facile";
  } else if (difficulty == 3) {
    difficultyDisplay.textContent = "Intermédiaire";
  } else {
    difficultyDisplay.textContent = "Difficile";
  }

  document
    .getElementById("attack-button")
    .addEventListener("click", function () {
      playerTurnAction("attack");
    });

  document
    .getElementById("special-attack-button")
    .addEventListener("click", function () {
      playerTurnAction("specialAttack");
    });

  document.getElementById("heal-button").addEventListener("click", function () {
    playerTurnAction("heal");
  });

  document
    .getElementById("next-modal-button")
    .addEventListener("click", function () {
      document.getElementById("victory-modal").style.display = "none";

      randomPicture();

      computerDifficulty++;
      initialization(computerDifficulty);
    });

  document
    .getElementById("replay-modal-button")
    .addEventListener("click", function () {
      document.getElementById("victory-modal").style.display = "none";
      initialization(computerDifficulty);
    });

  addToChat("Le combat commence. C'est à votre tour.");
});