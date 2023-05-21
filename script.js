let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpTest = document.querySelector("#xpTest");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterNameText");
const monsterHealthText = document.querySelector("#monsterHealthText");

const weapons = [
  {
    name: "stick",
    power: 5
  },
  {
    name: "dagger",
    power: 30
  },
  {
    name: "claw hammer",
    power: 50
  },
  {
    name: "sword",
    power: 100
  },
  {
    name: "sniper rifle",
    power: 200
  }
];
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
]

const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town Sqaure . You see a sign that says \"Store.\" "
  },

  {
    name: "store",
    "button text": ["Buy 10 Health (10 gold)", "Buy Weapon(30 gold)", "Go to Town Square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the Store.  "

  },
  {
    name: "cave",
    "button text": ["Fight Slime", "Fight Beast", "Go to Town Square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the Cave . And , You saw some Beasts.  "

  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a Monster.  "

  },
  {
    name: "kill monster",
    "button text": ["Go to Town Square", "Go to Town Square", "Go to Town Square"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold. '

  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: 'You die. 💀 '

  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: 'You defeat the Dragon 🐉 . YOU WIN THE GAME ! 🎉'

  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to Town Square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: 'You find a secret game . Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers you win!'

  }

]
function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}
function goTown() {
  update(locations[0]);
}

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function goStore() {
  update(locations[1]);
}
function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 50;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You donot have enough gold to buy Health ."
  }
}
function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += "In your inventory you have " + inventory;
    } else {
      text.innerText = "You donot have enough money to buy a Weapon .";
    }
  }
  else {
    text.innerText = "You already have the most powerful weapon : " + weapons[currentWeapon].name + ".";
    button2.innerText = "Sell the Weapon for 15 golds";
    button2.onclick = sellWeapon;

  }
}
function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.pop();
    text.innerText = "You sold a " + currentWeapon + ".\n";
    text.innerText += "In your Inventory you have: " + inventory;

  }
  else {
    text.innerText = "Don't sell Your only Weapon!"
  }
}
function fightSlime() {
  fighting = 0;
  gofight();
}
function fightBeast() {
  fighting = 1;
  gofight();
}
function fightDragon() {
  fighting = 2;
  gofight();
}
function gofight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;

}
function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks .";
  text.innerText += "You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);

  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  } else {
    text.innerText += "You Miss.";
  }


  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose()
  }
  else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }
  if (Math.random() <= .1 && inventory.length() !== 1) {
    text.innerText += "Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
  function getMonsterAttackValue(level) {
    let hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit;
  }

}



function isMonsterHit() {
  return Math.random() > .2 || health <= 20;
}
function dodge() {
  text.innerText = "You dodged the attack from " + monsters[fighting].name + ".";
}
function lose() {
  update(locations[5]);

}
function winGame() {
  update(locations[6]);

}
function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}
function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();

}
function easterEgg() {
  update(locations[7]);
}
function pickTwo() {
  pick(2);
}
function pickEight() {
  pick(8);
}
function pick(guess) {
  let numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11))
  }
  text.innerText = "You picked " + guess + " . Here are the random numbers : \n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.indexOf(guess) !== -1) {
    text.innerText += "Right! You win 20 gold!"
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 Health! "
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}