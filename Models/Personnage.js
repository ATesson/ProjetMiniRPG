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
  
  export class Feu extends Personnage {
    constructor(nom) {
      super(nom, 180, 220, 1, "Explosion de Feu");
    }
  
  }
  
  export class Eau extends Personnage {
    constructor(nom) {
      super(nom, 220, 180, 1, "Tsunami");
    }
  
  }
  
  export class Terre extends Personnage {
    constructor(nom) {
      super(nom, 150, 150, 1, "Lancé de Pierres");
    }
  
  }


