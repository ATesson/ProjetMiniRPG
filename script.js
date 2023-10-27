// const {Feu, Terre, Eau} = require('../../Models/Personnage.js')
// import { Feu, Eau, Terre } from "../../Models/Personnage.js";

function startCombat() {
  const selectedCategory = document.querySelector(
    'input[name="fighterCategory"]:checked'
  );
  const selectedDifficulty = document.getElementById("difficulty");

  if (selectedCategory && selectedDifficulty) {
    const character = selectedCategory.value;
    const difficulty = selectedDifficulty.value;
    window.location.href = `public/combat.html?character=${character}&difficulty=${difficulty}`;
  } else {
    alert("Veuillez sélectionner un combattant et un niveau de difficulté.");
  }
}

// const selectedCategory = document.querySelectorAll(
//   'input[name="fighterCategory"]'
// );

// var fighter;

// const fighterChoice = () => {
//   selectedCategory.forEach((category) => {
//     category.addEventListener("click", (event) => {
        
//       if (event.target.value == "feu") {
//         fighter = new Feu("Fire-Mage");
//       }
//       console.log(fighter);
//       return fighter;
//     });
//   });
// };
// fighterChoice();
