class Personnage {
    constructor(nom, sante = 200, mana = 200, niveau = 1, competence = "") {
      this.nom = nom;
      this.sante = sante;
      this.mana = mana;
      this.niveau = niveau;
      this.competence = competence;
    }
  
    attaquer() {
      console.log(`${this.nom} effectue une attaque de base.`);
    }
  
    utiliserCompetenceSpeciale() {
      console.log(`${this.nom} utilise sa compétence spéciale : ${this.competence}.`);
    }
  
    prendreDegats(degats) {
      this.sante -= degats;
      console.log(`${this.nom} perd ${degats} points de santé. Santé restante : ${this.sante}`);
    }
  
    boirePotion() {
      this.sante += 50;
      this.mana += 50;
      console.log(`${this.nom} boit une potion de soin et restaure 50 points de santé et de mana.`);
    }
  }
  
  class Feu extends Personnage {
    constructor(nom) {
      super(nom, 180, 220, 1, "Explosion de Feu");
    }
  
    utiliserCompetenceSpeciale() {
      console.log(`${this.nom} déclenche une puissante ${this.competence} infligeant des dégâts de zone.`);
    }
  }
  
  class Eau extends Personnage {
    constructor(nom) {
      super(nom, 220, 180, 1, "Vague Géante");
    }
  
    utiliserCompetenceSpeciale() {
      console.log(`${this.nom} invoque une ${this.competence} pour submerger l'ennemi.`);
    }
  }
  
  class Terre extends Personnage {
    constructor(nom) {
      super(nom, 200, 200, 1, "Mur de Pierres");
    }
  
    utiliserCompetenceSpeciale() {
      console.log(`${this.nom} crée un ${this.competence} pour se protéger des attaques.`);
    }
  }


