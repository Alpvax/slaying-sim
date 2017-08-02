function output(text) {
    console.log(text);
    document.getElementById('console').innerHTML += text + "\n";
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getDragonAttack() {
  var attack = 0;
    //getDragonHit = 50% chance
    //getDragonAttackType = 25% breath, 75% maul
  if (Math.random() < 0.75) {
    attack = 0; //No attack
  } else if (Math.random() < 0.25) {
    attack = 1; //Breath
  } else {
    attack = 2; //Maul
  }
  return attack;
}

function getDragonBreathDamage() {
  return getRandomInt(3, 40);
}

function getDragonMaulDamage() {
  return getRandomInt(1, 5);
}

function playerHPBar(playerHP) {
  var hitpointsPercent = Math.round(playerHP);
  var barLength = Math.round(0.6 * hitpointsPercent);
  var emptyLength = 60 - barLength;
  var bar = "";
  for (i = 0; i < barLength; i++) {
    bar += "|"
  }
  for (i = 0; i < emptyLength; i++) {
    bar += " "
  }
  output("[" + bar + "] (" + hitpointsPercent + "%)");
}

function dragonHPBar(dragonHP, dragonTotalHP) {
  var hitpointsPercent = Math.round((dragonHP / dragonTotalHP) * 100);
  var barLength = Math.round(0.6 * hitpointsPercent);
  var emptyLength = 60 - barLength;
  var bar = "";
  for (i = 0; i < barLength; i++) {
    bar += "#"
  }
  for (i = 0; i < emptyLength; i++) {
    bar += " "
  }
  output("[" + bar + "] (" + hitpointsPercent + "%)");
}

function newDragon() {
  var hp = getRandomInt(15000, 50000)
  return { 
    maxHP: hp,
    currentHP: hp,
    isDead: false
  };
}

function attackDragon(dragonObj, damage) {
  dragonObj.currentHP -= damage;
  if (dragonObj.currentHP < 0) {
    dragonObj.isDead = true;
  }
}

function playerReport(playerObj) {
  if (playerObj.currentHP <= 0) {
    output("You have been slain.");
    output("You slayed " + playerObj.numSlain + " dragons.");
  } else {
    output("You have " + playerObj.currentHP + "HP remaining.");
    playerHPBar(playerObj.currentHP);
  }
}

function fightDragon(playerObj, dragonObj) {
  var winner = 0; //0 : no winner, 1: player won, 2: dragon won
  while (winner < 1) {
    // Player attacks
    // Player has 65% chance of hitting.
    if(Math.random() < 0.65) {
        // Player damage is a random int from 1 to 2500
        var damage = getRandomInt(1, 2500);
        if (Math.random() < 0.9) {
          output("You swing your sword and hit the dragon for " + damage + "HP.");
        } else {
          output("You kick the dragon and do " + damage + " damage.");
        }
        attackDragon(dragonObj, damage);
    }
    if (dragonObj.isDead) {
      output("You have slain the mighty dragon.");
      winner = 1;
      playerObj.numSlain++;
    } else { //Dragon is not dead, so can attack
      output("The dragon has " + dragonHP + "HP remaining.");
      dragonHPBar(dragonObj.currentHP, dragonObj.maxHP);
      
      // Dragon attacks
      var dragonAttack = getDragonAttack();
      if(dragonAttack < 1) { // Dragon missed.
        if (Math.random() < 0.25) {
          output("You raise your shield and block the dragon's attack.");
        } else if (Math.random < 0.7) {
          output("You sidestep the dragon's attack.");
        } else {
          output("The dragon misses you.");
        }
      } else if(dragonAttack < 2) { // Dragon breath attack
        var dragonBreathDamage = getDragonBreathDamage();
        output("You raise your shield but the dragon breaths fire, " +
          "hitting you for " + dragonBreathDamage + "HP.");
        playerObj.currentHP -= dragonBreathDamage;
      } else if(dragonAttack < 3) { // Dragon maul attack
        var dragonMaulDamage = getDragonMaulDamage();
        output("The dragon mauls you for " + dragonMaulDamage + "HP.");
        playerObj.currentHP -= dragonMaulDamage;
      }
      if (playerObj.currentHP < 0) {
        winner = 2;
      }
    }
  }
  //Outside while, someone has won.
  return winner;
}

function main(playerHP) {
  var playerObj = {
    currentHP: playerHP,
    numSlain: 0
  };
  var dragonObj; //Doesn't need to be initialised.
  do {
    dragonObj = newDragon();
    fightDragon(playerObj, dragonObj);
    playerReport(playerObj);
  } while (playerObj.currentHP > 0);
}

function runGame() {
  main(100);
}
