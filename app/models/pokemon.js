const TYPE = require("./enum").TYPE;
const RARITY = require("./enum").RARITY;
const COST = require("./enum").COST;
const schema = require("@colyseus/schema");
const Schema = schema.Schema;
const uniqid = require("uniqid");
const ArraySchema = schema.ArraySchema;

class Pokemon extends Schema {
  constructor(name, types, rarity, index, evolution, hp, atk, def, range, attackSprite) {
    super();
    this.id = uniqid();
    this.name = name;
    this.types = new ArraySchema();
    if(types){
      types.forEach(type => {
        this.types.push(type);
      });
    }
    this.rarity = rarity;
    this.index = index;
    this.evolution = evolution;
    this.positionX = -1;
    this.positionY = -1;
    this.cost = COST[rarity];
    this.hp = hp;
    this.atk = atk;
    this.def = def;
    this.range = range;
    this.attackSprite = attackSprite;
  }

  toString() {
    return `Pokemon (Name: ${this.name}, (x: ${this.positionX}, y: ${this.positionY}))`
  }
}

class Riolu extends Pokemon {
  constructor() {
    super("riolu", [TYPE.FIGHTING, TYPE.HUMAN], RARITY.LEGENDARY, 447, "lucario", 50, 5, 1, 3, "FIGHTING/range");
  }
}

class Lucario extends Pokemon {
  constructor() {
    super("lucario", [TYPE.FIGHTING, TYPE.HUMAN], RARITY.LEGENDARY, 448, "", 60, 6, 1, 3, "FIGHTING/range");
  }
}

class Scyther extends Pokemon {
  constructor() {
    super("scyther", [TYPE.BUG, TYPE.NORMAL], RARITY.LEGENDARY, 123, "scizor", 50, 5, 1, 1, "NORMAL/melee");
  }
}

class Scizor extends Pokemon {
  constructor() {
    super("scizor", [TYPE.BUG, TYPE.METAL], RARITY.LEGENDARY, 212, "", 60, 6, 1, 1, "NORMAL/melee");
  }
}

class Onix extends Pokemon {
  constructor() {
    super("onix", [TYPE.MINERAL, TYPE.GROUND], RARITY.LEGENDARY, 95, "steelix", 50, 5, 1, 1, "ROCK/melee");
  }
}

class Steelix extends Pokemon {
  constructor() {
    super("steelix", [TYPE.MINERAL, TYPE.GROUND, TYPE.METAL], RARITY.LEGENDARY, 208, "", 60, 6, 1, 1, "ROCK/melee");
  }
}

class Growlithe extends Pokemon {
  constructor() {
    super("growlithe", [TYPE.FIRE, TYPE.FIELD], RARITY.LEGENDARY, 58, "arcanine", 50, 5, 1, 1, "FIRE/melee");
  }
}

class Arcanine  extends Pokemon {
  constructor() {
    super("arcanine", [TYPE.FIRE, TYPE.FIELD], RARITY.LEGENDARY, 59, "", 60, 6, 1, 1, "FIRE/melee");
  }
}

class Munchlax  extends Pokemon {
  constructor() {
    super("munchlax", [TYPE.NORMAL, TYPE.HUMAN], RARITY.LEGENDARY, 446, "snorlax", 50, 5, 1, 1, "NORMAL/melee");
  }
}

class Snorlax  extends Pokemon {
  constructor() {
    super("snorlax", [TYPE.NORMAL, TYPE.HUMAN], RARITY.LEGENDARY, 143, "", 60, 6, 1, 1, "NORMAL/melee");
  }
}

class Magby extends Pokemon {
  constructor() {
    super("magby", [TYPE.FIRE, TYPE.HUMAN], RARITY.EPIC, 240, "magmar", 30, 3, 1, 3, "FIRE/range");
  }
}

class Magmar extends Pokemon {
  constructor() {
    super("magmar", [TYPE.FIRE, TYPE.HUMAN], RARITY.EPIC, 126, "magmortar", 40, 4, 1, 3, "FIRE/range");
  }
}

class Magmortar extends Pokemon {
  constructor() {
    super("magmortar", [TYPE.FIRE, TYPE.HUMAN], RARITY.EPIC, 467, "", 50, 5, 1, 3, "FIRE/range");
  }
}

class Elekid  extends Pokemon {
  constructor() {
    super("elekid", [TYPE.ELECTRIC, TYPE.HUMAN], RARITY.EPIC, 239, "electabuzz", 30, 3, 1, 1, "ELECTRIC/melee");
  }
}

class Electabuzz  extends Pokemon {
  constructor() {
    super("electabuzz", [TYPE.ELECTRIC, TYPE.HUMAN], RARITY.EPIC, 125, "electivire", 40, 4, 1, 1, "ELECTRIC/melee");
  }
}

class Electivire   extends Pokemon {
  constructor() {
    super("electivire", [TYPE.ELECTRIC, TYPE.HUMAN], RARITY.EPIC, 466, "", 50, 5, 1, 1, "ELECTRIC/melee");
  }
}

class Gible extends Pokemon {
  constructor() {
    super("gible", [TYPE.DRAGON, TYPE.GROUND, TYPE.MONSTER], RARITY.EPIC, 443, "gabite", 30, 3, 1, 1, "DRAGON/melee");
  }
}

class Gabite extends Pokemon {
  constructor() {
    super("gabite", [TYPE.DRAGON, TYPE.GROUND, TYPE.MONSTER], RARITY.EPIC, 444, "garchomp", 40, 4, 1, 1, "DRAGON/melee");
  }
}

class Garchomp  extends Pokemon {
  constructor() {
    super("garchomp", [TYPE.DRAGON, TYPE.GROUND, TYPE.MONSTER], RARITY.EPIC, 445, "", 50, 5, 1, 1, "DRAGON/melee");
  }
}

class Beldum  extends Pokemon {
  constructor() {
    super("beldum", [TYPE.PSYCHIC, TYPE.METAL, TYPE.MINERAL], RARITY.EPIC, 374, "metang", 30, 3, 1, 1, "DRAGON/melee");
  }
}

class Metang  extends Pokemon {
  constructor() {
    super("metang", [TYPE.PSYCHIC, TYPE.METAL, TYPE.MINERAL], RARITY.EPIC, 375, "metagross", 40, 4, 1, 1, "DRAGON/melee");
  }
}

class Metagross  extends Pokemon {
  constructor() {
    super("metagross", [TYPE.PSYCHIC, TYPE.METAL, TYPE.MINERAL], RARITY.EPIC, 376, "", 50, 5, 1, 1, "DRAGON/melee");
  }
}

class Bagon extends Pokemon {
  constructor() {
    super("bagon", [TYPE.DRAGON, TYPE.MONSTER], RARITY.EPIC, 371, "shelgon", 30, 3, 1, 3, "FIRE/range");
  }
}

class Shelgon extends Pokemon {
  constructor() {
    super("shelgon", [TYPE.DRAGON, TYPE.MONSTER], RARITY.EPIC, 372, "salamence", 40, 4, 1, 3, "FIRE/range");
  }
}

class Salamence extends Pokemon {
  constructor() {
    super("salamence", [TYPE.DRAGON, TYPE.MONSTER], RARITY.EPIC, 373, "", 50, 5, 1, 3, "FIRE/range");
  }
}

class Ralts  extends Pokemon {
  constructor() {
    super("ralts", [TYPE.PSYCHIC, TYPE.AMORPH], RARITY.EPIC, 280, "kirlia", 30, 3, 1, 3, "PSYCHIC/range");
  }
}

class Kirlia  extends Pokemon {
  constructor() {
    super("kirlia", [TYPE.PSYCHIC, TYPE.AMORPH], RARITY.EPIC, 281, "gardevoir", 40, 4, 1, 3, "PSYCHIC/range");
  }
}

class Gardevoir  extends Pokemon {
  constructor() {
    super("gardevoir", [TYPE.PSYCHIC, TYPE.AMORPH], RARITY.EPIC, 282, "", 50, 5, 1, 3, "PSYCHIC/range");
  }
}

class Slakoth extends Pokemon {
  constructor() {
    super("slakoth", [TYPE.NORMAL, TYPE.HUMAN], RARITY.EPIC, 287, "vigoroth", 30, 3, 1, 1, "NORMAL/melee");
  }
}

class Vigoroth extends Pokemon {
  constructor() {
    super("vigoroth", [TYPE.NORMAL, TYPE.HUMAN], RARITY.EPIC, 288, "slaking", 40, 4, 1, 1, "NORMAL/melee");
  }
}

class Slaking extends Pokemon {
  constructor() {
    super("slaking", [TYPE.NORMAL, TYPE.HUMAN], RARITY.EPIC, 289, "", 50, 5, 1, 1, "NORMAL/melee");
  }
}

class Larvitar extends Pokemon {
  constructor() {
    super("larvitar", [TYPE.DARK, TYPE.MONSTER], RARITY.EPIC, 246, "pupitar", 30, 3, 1, 1, "ROCK/melee");
  }
}

class Pupitar extends Pokemon {
  constructor() {
    super("pupitar", [TYPE.DARK, TYPE.MONSTER], RARITY.EPIC, 247, "tyranitar", 40, 4, 1, 1, "ROCK/melee");
  }
}

class Tyranitar extends Pokemon {
  constructor() {
    super("tyranitar", [TYPE.DARK, TYPE.MONSTER], RARITY.EPIC, 248, "", 50, 5, 1, 1, "ROCK/melee");
  }
}

class Dratini extends Pokemon {
  constructor() {
    super("dratini", [TYPE.DRAGON, TYPE.AQUATIC], RARITY.EPIC, 147, "dragonair", 30, 3, 1, 1, "DRAGON/melee");
  }
}

class Dragonair  extends Pokemon {
  constructor() {
    super("dragonair", [TYPE.DRAGON, TYPE.AQUATIC], RARITY.EPIC, 148, "dragonite", 40, 4, 1, 1, "DRAGON/melee");
  }
}

class Dragonite  extends Pokemon {
  constructor() {
    super("dragonite", [TYPE.DRAGON, TYPE.AQUATIC], RARITY.EPIC, 149, "", 50, 5, 1, 1, "DRAGON/melee");
  }
}

class Gastly  extends Pokemon {
  constructor() {
    super("gastly", [TYPE.DARK, TYPE.POISON, TYPE.AMORPH], RARITY.EPIC, 92, "haunter", 30, 3, 1, 3, "GHOST/range");
  }
}

class Haunter extends Pokemon {
  constructor() {
    super("haunter", [TYPE.DARK, TYPE.POISON, TYPE.AMORPH], RARITY.EPIC, 93, "gengar", 40, 4, 1, 3, "GHOST/range");
  }
}

class Gengar extends Pokemon {
  constructor() {
    super("gengar", [TYPE.DARK, TYPE.POISON, TYPE.AMORPH], RARITY.EPIC, 94, "", 50, 5, 1, 3, "GHOST/range");
  }
}

class Abra  extends Pokemon {
  constructor() {
    super("abra", [TYPE.PSYCHIC, TYPE.HUMAN], RARITY.EPIC, 63, "kadabra", 30, 3, 1, 4, "PSYCHIC/range");
  }
}

class Kadabra extends Pokemon {
  constructor() {
    super("kadabra", [TYPE.PSYCHIC, TYPE.HUMAN], RARITY.EPIC, 64, "alakazam", 40, 4, 1, 4, "PSYCHIC/range");
  }
}

class Alakazam extends Pokemon {
  constructor() {
    super("alakazam", [TYPE.PSYCHIC, TYPE.HUMAN], RARITY.EPIC, 65, "", 50, 5, 1, 4, "PSYCHIC/range");
  }
}

class Poliwag extends Pokemon {
  constructor() {
    super("poliwag", [TYPE.WATER], RARITY.RARE, 60, "poliwhirl", 20, 2, 1, 3, "WATER/range");
  }
}

class Poliwhirl extends Pokemon {
  constructor() {
    super("poliwhirl", [TYPE.WATER, TYPE.FIGHTING], RARITY.RARE, 61, "politoed", 30, 3, 1, 3, "WATER/range");
  }
}

class Politoed extends Pokemon {
  constructor() {
    super("politoed", [TYPE.WATER], RARITY.RARE, 186, "", 40, 4, 1, 3, "WATER/range");
  }
}

class Shinx  extends Pokemon {
  constructor() {
    super("shinx", [TYPE.ELECTRIC, TYPE.FIELD], RARITY.RARE, 403, "luxio", 20, 2, 1, 1, "ELECTRIC/melee");
  }
}

class Luxio  extends Pokemon {
  constructor() {
    super("luxio", [TYPE.ELECTRIC, TYPE.FIELD], RARITY.RARE, 404, "luxray", 30, 3, 1, 1, "ELECTRIC/melee");
  }
}

class Luxray  extends Pokemon {
  constructor() {
    super("luxray", [TYPE.ELECTRIC, TYPE.FIELD], RARITY.RARE, 405, "", 40, 4, 1, 1, "ELECTRIC/melee");
  }
}

class Lotad extends Pokemon {
  constructor() {
    super("lotad", [TYPE.GRASS, TYPE.WATER, TYPE.AQUATIC], RARITY.RARE, 270, "lombre", 20, 2, 1, 3, "GRASS/range");
  }
}

class Lombre extends Pokemon {
  constructor() {
    super("lombre", [TYPE.GRASS, TYPE.WATER, TYPE.AQUATIC], RARITY.RARE, 271, "ludicolo", 30, 3, 1, 3, "GRASS/range");
  }
}

class Ludicolo extends Pokemon {
  constructor() {
    super("ludicolo", [TYPE.GRASS, TYPE.WATER, TYPE.AQUATIC], RARITY.RARE, 272, "", 40, 4, 1, 3, "GRASS/range");
  }
}

class Duskull  extends Pokemon {
  constructor() {
    super("duskull", [TYPE.DARK, TYPE.AMORPH], RARITY.RARE, 355, "dusclops", 20, 2, 1, 3, "GHOST/range");
  }
}

class Dusclops  extends Pokemon {
  constructor() {
    super("dusclops", [TYPE.DARK, TYPE.AMORPH], RARITY.RARE, 356, "dusknoir", 30, 3, 1, 3, "GHOST/range");
  }
}

class Dusknoir  extends Pokemon {
  constructor() {
    super("dusknoir", [TYPE.DARK, TYPE.AMORPH], RARITY.RARE, 477, "", 40, 4, 1, 3, "GHOST/range");
  }
}

class Togepi extends Pokemon {
  constructor() {
    super("togepi", [TYPE.NORMAL, TYPE.FAIRY], RARITY.RARE, 175, "togetic", 20, 2, 1, 3, "FLYING/range");
  }
}

class Togetic extends Pokemon {
  constructor() {
    super("togetic", [TYPE.NORMAL, TYPE.FAIRY], RARITY.RARE, 176, "togekiss", 30, 3, 1, 3, "FLYING/range");
  }
}

class Togekiss extends Pokemon {
  constructor() {
    super("togekiss", [TYPE.NORMAL, TYPE.FAIRY], RARITY.RARE, 468, "", 40, 4, 1, 3, "FLYING/range");
  }
}

class Rhyhorn  extends Pokemon {
  constructor() {
    super("rhyhorn", [TYPE.GROUND, TYPE.MONSTER], RARITY.RARE, 111, "rhydon", 20, 2, 1, 1, "ROCK/melee");
  }
}

class Rhydon  extends Pokemon {
  constructor() {
    super("rhydon", [TYPE.GROUND, TYPE.MONSTER], RARITY.RARE, 112, "rhyperior", 30, 3, 1, 1, "ROCK/melee");
  }
}

class Rhyperior  extends Pokemon {
  constructor() {
    super("rhyperior", [TYPE.GROUND, TYPE.MONSTER], RARITY.RARE, 464, "", 40, 4, 1, 1, "ROCK/melee");
  }
}

class Magnemite extends Pokemon {
  constructor() {
    super("magnemite", [TYPE.ELECTRIC, TYPE.METAL, TYPE.MINERAL], RARITY.RARE, 81, "magneton", 20, 2, 1, 3, "ELECTRIC/range");
  }
}

class Magneton extends Pokemon {
  constructor() {
    super("magneton", [TYPE.ELECTRIC, TYPE.METAL, TYPE.MINERAL], RARITY.RARE, 82, "magnezone", 30, 3, 1, 3, "ELECTRIC/range");
  }
}

class Magnezone extends Pokemon {
  constructor() {
    super("magnezone", [TYPE.ELECTRIC, TYPE.METAL, TYPE.MINERAL], RARITY.RARE, 462, "", 40, 4, 1, 3, "ELECTRIC/range");
  }
}

class Aron extends Pokemon {
  constructor() {
    super("aron", [TYPE.METAL, TYPE.MONSTER], RARITY.RARE, 304, "lairon", 20, 2, 1, 1, "ROCK/melee");
  }
}

class Lairon extends Pokemon {
  constructor() {
    super("lairon", [TYPE.METAL, TYPE.MONSTER], RARITY.RARE, 305, "aggron", 30, 3, 1, 1, "ROCK/melee");
  }
}

class Aggron extends Pokemon {
  constructor() {
    super("aggron", [TYPE.METAL, TYPE.MONSTER], RARITY.RARE, 306, "", 40, 4, 1, 1, "ROCK/melee");
  }
}

class Spheal  extends Pokemon {
  constructor() {
    super("spheal", [TYPE.WATER, TYPE.FIELD], RARITY.RARE, 363, "sealeo", 20, 2, 1, 1, "ICE/melee");
  }
}

class Sealeo  extends Pokemon {
  constructor() {
    super("sealeo", [TYPE.WATER, TYPE.FIELD], RARITY.RARE, 364, "walrein", 30, 3, 1, 1, "ICE/melee");
  }
}

class Walrein  extends Pokemon {
  constructor() {
    super("walrein", [TYPE.WATER, TYPE.FIELD], RARITY.RARE, 365, "", 40, 4, 1, 1, "ICE/melee");
  }
}

class Trapinch extends Pokemon {
  constructor() {
    super("trapinch", [TYPE.GROUND, TYPE.BUG], RARITY.RARE, 328, "vibrava", 20, 2, 1, 1, "DRAGON/melee");
  }
}

class Vibrava extends Pokemon {
  constructor() {
    super("vibrava", [TYPE.GROUND, TYPE.DRAGON, TYPE.BUG], RARITY.RARE, 329, "flygon", 30, 3, 1, 1, "DRAGON/melee");
  }
}

class Flygon extends Pokemon {
  constructor() {
    super("flygon", [TYPE.GROUND, TYPE.DRAGON, TYPE.BUG], RARITY.RARE, 330, "", 40, 4, 1, 1, "DRAGON/melee");
  }
}

class Horsea  extends Pokemon {
  constructor() {
    super("horsea", [TYPE.WATER, TYPE.AQUATIC], RARITY.RARE, 116, "seadra", 20, 2, 1, 3, "WATER/range");
  }
}

class Seadra extends Pokemon {
  constructor() {
    super("seadra", [TYPE.WATER, TYPE.DRAGON, TYPE.AQUATIC], RARITY.RARE, 117, "kingdra", 30, 3, 1, 3, "WATER/range");
  }
}

class Kingdra  extends Pokemon {
  constructor() {
    super("kingdra", [TYPE.WATER, TYPE.DRAGON, TYPE.AQUATIC], RARITY.RARE, 230, "", 40, 4, 1, 3, "WATER/range");
  }
}

class Machop extends Pokemon {
  constructor() {
    super("machop", [TYPE.FIGHTING, TYPE.HUMAN], RARITY.RARE, 66, "machoke", 20, 2, 1, 1, "FIGHTING/melee");
  }
}

class Machoke   extends Pokemon {
  constructor() {
    super("machoke", [TYPE.FIGHTING, TYPE.HUMAN], RARITY.RARE, 67, "machamp", 30, 3, 1, 1, "FIGHTING/melee");
  }
}

class Machamp   extends Pokemon {
  constructor() {
    super("machamp", [TYPE.FIGHTING, TYPE.HUMAN], RARITY.RARE, 68, "", 40, 4, 1, 1, "FIGHTING/melee");
  }
}

class Pichu extends Pokemon {
  constructor() {
    super("pichu", [TYPE.ELECTRIC, TYPE.FAIRY], RARITY.RARE, 172, "pikachu", 20, 2, 1, 3, "ELECTRIC/range");
  }
}

class Pikachu  extends Pokemon {
  constructor() {
    super("pikachu", [TYPE.ELECTRIC, TYPE.FAIRY], RARITY.RARE, 25, "raichu", 30, 3, 1, 3, "ELECTRIC/range");
  }
}

class Raichu  extends Pokemon {
  constructor() {
    super("raichu", [TYPE.ELECTRIC, TYPE.FAIRY], RARITY.RARE, 26, "", 40, 4, 1, 3, "ELECTRIC/range");
  }
}

class Bulbasaur extends Pokemon {
  constructor() {
    super("bulbasaur", [TYPE.GRASS, TYPE.POISON, TYPE.FLORA], RARITY.UNCOMMON, 1, "ivysaur", 15, 1.5, 1, 3, "GRASS/range");
  }
}

class Ivysaur extends Pokemon {
  constructor() {
    super("ivysaur", [TYPE.GRASS, TYPE.POISON, TYPE.FLORA], RARITY.UNCOMMON, 2, "venusaur", 25, 2.5, 1, 3, "GRASS/range");
  }
}

class Venusaur extends Pokemon {
  constructor() {
    super("venusaur", [TYPE.GRASS, TYPE.POISON, TYPE.FLORA], RARITY.UNCOMMON, 3, "", 35, 3.5, 1, 3, "GRASS/range");
  }
}

class Chikorita extends Pokemon {
  constructor() {
    super("chikorita", [TYPE.GRASS, TYPE.FLORA], RARITY.UNCOMMON, 152, "bayleef", 15, 1.5, 1, 3, "GRASS/range");
  }
}

class Bayleef extends Pokemon {
  constructor() {
    super("bayleef", [TYPE.GRASS, TYPE.FLORA], RARITY.UNCOMMON, 153, "meganium", 25, 2.5, 1, 3, "GRASS/range");
  }
}

class Meganium extends Pokemon {
  constructor() {
    super("meganium", [TYPE.GRASS, TYPE.FLORA], RARITY.UNCOMMON, 154, "", 35, 3.5, 1, 3, "GRASS/range");
  }
}

class NidoranF extends Pokemon {
  constructor() {
    super("nidoranF", [TYPE.POISON, TYPE.FIELD], RARITY.UNCOMMON, 29, "nidorina", 15, 1.5, 1, 1, "POISON/melee");
  }
}

class Nidorina extends Pokemon {
  constructor() {
    super("nidorina", [TYPE.POISON, TYPE.FIELD], RARITY.UNCOMMON, 30, "nidoqueen", 25, 2.5, 1, 1, "POISON/melee");
  }
}

class Nidoqueen extends Pokemon {
  constructor() {
    super("nidoqueen", [TYPE.POISON, TYPE.FIELD], RARITY.UNCOMMON, 31, "", 35, 3.5, 1, 1, "POISON/melee");
  }
}

class NidoranM extends Pokemon {
  constructor() {
    super("nidoranM", [TYPE.POISON, TYPE.FIELD], RARITY.UNCOMMON, 32, "nidorino", 15, 1.5, 1, 1, "POISON/melee");
  }
}

class Nidorino extends Pokemon {
  constructor() {
    super("nidorino", [TYPE.POISON, TYPE.FIELD], RARITY.UNCOMMON, 33, "nidoking", 25, 2.5, 1, 1, "POISON/melee");
  }
}

class Nidoking extends Pokemon {
  constructor() {
    super("nidoking", [TYPE.POISON, TYPE.FIELD], RARITY.UNCOMMON, 34, "", 35, 3.5, 1, 1, "POISON/melee");
  }
}

class Piplup extends Pokemon {
  constructor() {
    super("piplup", [TYPE.WATER, TYPE.FLYING], RARITY.UNCOMMON, 393, "prinplup", 15, 1.5, 1, 1, "WATER/melee");
  }
}

class Prinplup  extends Pokemon {
  constructor() {
    super("prinplup", [TYPE.WATER, TYPE.FLYING, TYPE.METAL], RARITY.UNCOMMON, 394, "empoleon", 25, 2.5, 1, 1, "WATER/melee");
  }
}

class Empoleon  extends Pokemon {
  constructor() {
    super("empoleon", [TYPE.WATER, TYPE.FLYING, TYPE.METAL], RARITY.UNCOMMON, 395, "", 35, 3.5, 1, 1, "WATER/melee");
  }
}

class Chimchar  extends Pokemon {
  constructor() {
    super("chimchar", [TYPE.FIRE, TYPE.HUMAN], RARITY.UNCOMMON, 390, "monferno", 15, 1.5, 1, 1, "FIRE/melee");
  }
}

class Monferno  extends Pokemon {
  constructor() {
    super("monferno", [TYPE.FIRE, TYPE.HUMAN, TYPE.FIGHTING], RARITY.UNCOMMON, 391, "infernape", 25, 2.5, 1, 1, "FIRE/melee");
  }
}

class Infernape  extends Pokemon {
  constructor() {
    super("infernape", [TYPE.FIRE, TYPE.HUMAN, TYPE.FIGHTING], RARITY.UNCOMMON, 392, "", 35, 3.5, 1, 1, "FIRE/melee");
  }
}

class Turtwig  extends Pokemon {
  constructor() {
    super("turtwig", [TYPE.GRASS, TYPE.GROUND, TYPE.FLORA], RARITY.UNCOMMON, 387, "grotle", 15, 1.5, 1, 1, "GRASS/melee");
  }
}

class Grotle  extends Pokemon {
  constructor() {
    super("grotle", [TYPE.GRASS, TYPE.GROUND, TYPE.FLORA], RARITY.UNCOMMON, 388, "torterra", 25, 2.5, 1, 1, "GRASS/melee");
  }
}

class Torterra  extends Pokemon {
  constructor() {
    super("torterra", [TYPE.GRASS, TYPE.GROUND, TYPE.FLORA], RARITY.UNCOMMON, 389, "", 35, 3.5, 1, 1, "GRASS/melee");
  }
}

class Mudkip extends Pokemon {
  constructor() {
    super("mudkip", [TYPE.WATER, TYPE.GROUND, TYPE.MONSTER], RARITY.UNCOMMON, 258, "marshtomp", 15, 1.5, 1, 1, "WATER/melee");
  }
}

class Marshtomp extends Pokemon {
  constructor() {
    super("marshtomp", [TYPE.WATER, TYPE.GROUND, TYPE.MONSTER], RARITY.UNCOMMON, 259, "swampert", 25, 2.5, 1, 1, "WATER/melee");
  }
}

class Swampert extends Pokemon {
  constructor() {
    super("swampert", [TYPE.WATER, TYPE.GROUND, TYPE.MONSTER], RARITY.UNCOMMON, 260, "", 35, 3.5, 1, 1, "WATER/melee");
  }
}

class Torchic extends Pokemon {
  constructor() {
    super("torchic", [TYPE.FIRE, TYPE.FLYING], RARITY.UNCOMMON, 255, "combusken", 15, 1.5, 1, 1, "FIRE/melee");
  }
}

class Combusken extends Pokemon {
  constructor() {
    super("combusken", [TYPE.FIRE, TYPE.FIGHTING, TYPE.FLYING], RARITY.UNCOMMON, 256, "blaziken", 25, 2.5, 1, 1, "FIRE/melee");
  }
}

class Blaziken extends Pokemon {
  constructor() {
    super("blaziken", [TYPE.FIRE, TYPE.FIGHTING, TYPE.FLYING], RARITY.UNCOMMON, 257, "", 35, 3.5, 1, 1, "FIRE/melee");
  }
}

class Treecko extends Pokemon {
  constructor() {
    super("treecko", [TYPE.GRASS, TYPE.MONSTER], RARITY.UNCOMMON, 252, "grovyle", 15, 1.5, 1, 1, "GRASS/melee");
  }
}

class Grovyle extends Pokemon {
  constructor() {
    super("grovyle", [TYPE.GRASS, TYPE.MONSTER], RARITY.UNCOMMON, 253, "sceptile", 25, 2.5, 1, 1, "GRASS/melee");
  }
}

class Sceptile extends Pokemon {
  constructor() {
    super("sceptile", [TYPE.GRASS, TYPE.MONSTER], RARITY.UNCOMMON, 254, "", 35, 3.5, 1, 1, "GRASS/melee");
  }
}

class Totodile extends Pokemon {
  constructor() {
    super("totodile", [TYPE.WATER, TYPE.AQUATIC], RARITY.UNCOMMON, 158, "croconaw", 15, 1.5, 1, 1, "WATER/melee");
  }
}

class Croconaw extends Pokemon {
  constructor() {
    super("croconaw", [TYPE.WATER, TYPE.AQUATIC], RARITY.UNCOMMON, 159, "feraligatr", 25, 2.5, 1, 1, "WATER/melee");
  }
}

class Feraligatr extends Pokemon {
  constructor() {
    super("feraligatr", [TYPE.WATER, TYPE.AQUATIC], RARITY.UNCOMMON, 160, "", 35, 3.5, 1, 1, "WATER/melee");
  }
}

class Cyndaquil extends Pokemon {
  constructor() {
    super("cyndaquil", [TYPE.FIRE, TYPE.FIELD], RARITY.UNCOMMON, 155, "quilava", 15, 1.5, 1, 3, "FIRE/range");
  }
}

class Quilava extends Pokemon {
  constructor() {
    super("quilava", [TYPE.FIRE, TYPE.FIELD], RARITY.UNCOMMON, 156, "typhlosion", 25, 2.5, 1, 3, "FIRE/range");
  }
}

class Typhlosion extends Pokemon {
  constructor() {
    super("typhlosion", [TYPE.FIRE, TYPE.FIELD], RARITY.UNCOMMON, 157, "", 35, 3.5, 1, 3, "FIRE/range");
  }
}

class Charmander extends Pokemon {
  constructor() {
    super("charmander", [TYPE.FIRE, TYPE.MONSTER], RARITY.UNCOMMON, 4, "charmeleon", 15, 1.5, 1, 1, "FIRE/melee");
  }
}

class Charmeleon extends Pokemon {
  constructor() {
    super("charmeleon", [TYPE.FIRE, TYPE.MONSTER], RARITY.UNCOMMON, 5, "charizard", 25, 2.5, 1, 1, "FIRE/melee");
  }
}

class Charizard extends Pokemon {
  constructor() {
    super("charizard", [TYPE.FIRE, TYPE.MONSTER], RARITY.UNCOMMON, 6, "", 35, 3.5, 1, 1, "FIRE/melee");
  }
}

class Squirtle extends Pokemon {
  constructor() {
    super("squirtle", [TYPE.WATER, TYPE.AQUATIC,TYPE.MONSTER], RARITY.UNCOMMON, 7, "wartortle", 15, 1.5, 1, 2, "WATER/range");
  }
}

class Wartortle extends Pokemon {
  constructor() {
    super("charmeleon", [TYPE.WATER, TYPE.AQUATIC,TYPE.MONSTER], RARITY.UNCOMMON, 8, "blastoise", 25 ,2.5, 1, 2, "WATER/range");
  }
}

class Blastoise extends Pokemon {
  constructor() {
    super("charizard", [TYPE.WATER, TYPE.AQUATIC,TYPE.MONSTER], RARITY.UNCOMMON, 9, "", 35, 3.5, 1, 2, "WATER/range");
  }
}

class Geodude extends Pokemon {
  constructor() {
    super("geodude", [TYPE.GROUND, TYPE.MINERAL], RARITY.COMMON, 74, "graveler", 10, 1, 1, 1, "ROCK/melee");
  }
}

class Graveler extends Pokemon {
  constructor() {
    super("graveler", [TYPE.GROUND, TYPE.MINERAL],RARITY.COMMON, 75, "golem", 20 ,2, 1, 1, "ROCK/melee");
  }
}

class Golem extends Pokemon {
  constructor() {
    super("golem", [TYPE.GROUND, TYPE.MINERAL],RARITY.COMMON, 76, "", 30, 3, 1, 1, "ROCK/melee");
  }
}

class Azurill extends Pokemon {
  constructor() {
    super("azurill", [TYPE.WATER, TYPE.FAIRY], RARITY.COMMON, 298, "marill", 10, 1, 1, 2, "WATER/range");
  }
}

class Marill extends Pokemon {
  constructor() {
    super("marill", [TYPE.WATER, TYPE.FAIRY], RARITY.COMMON, 183, "azumarill", 20 ,2, 1, 2, "WATER/range");
  }
}

class Azumarill extends Pokemon {
  constructor() {
    super("azumarill", [TYPE.WATER, TYPE.FAIRY], RARITY.COMMON, 184, "", 30, 3, 1, 2, "WATER/range");
  }
}

class Zubat extends Pokemon {
  constructor() {
    super("zubat", [TYPE.POISON, TYPE.FLYING], RARITY.COMMON, 41, "golbat", 10, 1, 1, 4, "PSYCHIC/range");
  }
}

class Golbat extends Pokemon {
  constructor() {
    super("golbat", [TYPE.POISON, TYPE.FLYING], RARITY.COMMON, 42, "crobat", 20 ,2, 1, 4, "PSYCHIC/range");
  }
}

class Crobat extends Pokemon {
  constructor() {
    super("crobat", [TYPE.POISON, TYPE.FLYING], RARITY.COMMON, 169, "", 30, 3, 1, 4, "PSYCHIC/range");
  }
}

class Mareep extends Pokemon {
  constructor() {
    super("mareep", [TYPE.ELECTRIC, TYPE.FIELD], RARITY.COMMON, 179, "flaffy", 10, 1, 1, 2, "ELECTRIC/range");
  }
}

class Flaffy extends Pokemon {
  constructor() {
    super("flaffy", [TYPE.ELECTRIC, TYPE.FIELD], RARITY.COMMON, 180, "ampharos", 20 ,2, 1, 2, "ELECTRIC/range");
  }
}

class Ampharos extends Pokemon {
  constructor() {
    super("ampharos", [TYPE.ELECTRIC, TYPE.FIELD], RARITY.COMMON, 181, "", 30, 3, 1, 2, "ELECTRIC/range");
  }
}

class Cleffa extends Pokemon {
  constructor() {
    super("cleffa", [TYPE.FAIRY, TYPE.NORMAL], RARITY.COMMON, 173, "clefairy", 10, 1, 1, 1, "FAIRY/melee");
  }
}

class Clefairy extends Pokemon {
  constructor() {
    super("clefairy", [TYPE.FAIRY, TYPE.NORMAL], RARITY.COMMON, 35, "clefable", 20 ,2, 1, 1, "FAIRY/melee");
  }
}

class Clefable extends Pokemon {
  constructor() {
    super("clefable", [TYPE.FAIRY, TYPE.NORMAL], RARITY.COMMON, 36, "", 30, 3, 1, 1, "FAIRY/melee");
  }
}

class Igglybuff extends Pokemon {
  constructor() {
    super("igglybuff", [TYPE.FAIRY, TYPE.NORMAL], RARITY.COMMON, 174, "jigglypuff", 10, 1, 1, 3, "FAIRY/range");
  }
}

class Jigglypuff extends Pokemon {
  constructor() {
    super("jigglypuff", [TYPE.FAIRY, TYPE.NORMAL], RARITY.COMMON, 39, "wigglytuff", 20 ,2, 1, 3, "FAIRY/range");
  }
}

class Wigglytuff extends Pokemon {
  constructor() {
    super("wigglytuff", [TYPE.FAIRY, TYPE.NORMAL], RARITY.COMMON, 40, "", 30, 3, 1, 3, "FAIRY/range");
  }
}

class Caterpie extends Pokemon {
  constructor() {
    super("caterpie", [TYPE.GRASS, TYPE.BUG], RARITY.COMMON, 10, "metapod", 10 ,1, 1, 2, "POISON/range");
  }
}

class Metapod extends Pokemon {
  constructor() {
    super("metapod", [TYPE.GRASS, TYPE.BUG], RARITY.COMMON, 11, "butterfree", 20, 2, 1, 2, "POISON/range");
  }
}

class Butterfree extends Pokemon {
  constructor() {
    super("butterfree", [TYPE.GRASS, TYPE.BUG], RARITY.COMMON, 12, "", 30, 3, 1, 2, "POISON/range");
  }
}

class Weedle extends Pokemon {
  constructor() {
    super("weedle", [TYPE.POISON, TYPE.BUG], RARITY.COMMON, 13, "kakuna", 10 ,1, 1, 1, "BUG/melee");
  }
}

class Kakuna extends Pokemon {
  constructor() {
    super("kakuna", [TYPE.POISON, TYPE.BUG], RARITY.COMMON, 14, "beedrill", 20, 2, 1, 1, "BUG/melee");
  }
}

class Beedrill extends Pokemon {
  constructor() {
    super("beedrill", [TYPE.POISON, TYPE.BUG], RARITY.COMMON, 15, "", 30, 3, 1, 1, "BUG/melee");
  }
}


class Pidgey extends Pokemon {
  constructor() {
    super("pidgey", [TYPE.NORMAL, TYPE.FLYING], RARITY.COMMON, 16, "pidgeotto", 10 ,1, 1, 3, "FLYING/range");
  }
}

class Pidgeotto extends Pokemon {
  constructor() {
    super("pidgeotto", [TYPE.NORMAL, TYPE.FLYING], RARITY.COMMON, 17, "pidgeot", 20, 2, 1, 3, "FLYING/range");
  }
}

class Pidgeot extends Pokemon {
  constructor() {
    super("pidgeot", [TYPE.NORMAL, TYPE.FLYING], RARITY.COMMON, 18, "", 30, 3, 1, 3, "FLYING/range");
  }
}

class Hoppip extends Pokemon {
  constructor() {
    super("hoppip", [TYPE.GRASS, TYPE.FLYING, TYPE.FLORA], RARITY.COMMON, 187, "skiploom", 10, 1, 1, 3, "FLYING/range");
  }
}

class Skiploom extends Pokemon {
  constructor() {
    super("skiploom", [TYPE.GRASS, TYPE.FLYING, TYPE.FLORA], RARITY.COMMON, 188, "jumpluff", 20, 2, 1, 3, "FLYING/range");
  }
}

class Jumpluff extends Pokemon {
  constructor() {
    super("jumpluff", [TYPE.GRASS, TYPE.FLYING, TYPE.FLORA], RARITY.COMMON, 189, "", 30, 3, 1, 3, "FLYING/range");
  }
}

class Seedot extends Pokemon {
  constructor() {
    super("seedot", [TYPE.GRASS, TYPE.DARK, TYPE.FIELD], RARITY.COMMON, 273, "nuzleaf", 10 ,1, 1, 1, "GRASS/melee");
  }
}

class Nuzleaf extends Pokemon {
  constructor() {
    super("nuzleaf", [TYPE.GRASS, TYPE.DARK, TYPE.FIELD], RARITY.COMMON, 274, "shiftry", 20, 2, 1, 1, "GRASS/melee");
  }
}

class Shiftry extends Pokemon {
  constructor() {
    super("shiftry", [TYPE.GRASS, TYPE.DARK, TYPE.FIELD], RARITY.COMMON, 275, "", 30, 3, 1, 1, "GRASS/melee");
  }
}

class Starly extends Pokemon {
  constructor() {
    super("starly", [TYPE.NORMAL, TYPE.FLYING], RARITY.COMMON, 396, "staravia", 10 ,1, 1, 1, "FLYING/melee");
  }
}

class Staravia extends Pokemon {
  constructor() {
    super("staravia", [TYPE.NORMAL, TYPE.FLYING], RARITY.COMMON, 397, "staraptor", 20, 2, 1, 1, "FLYING/melee");
  }
}

class Staraptor extends Pokemon {
  constructor() {
    super("staraptor", [TYPE.NORMAL, TYPE.FLYING], RARITY.COMMON, 398, "", 30, 3, 1, 1, "FLYING/melee");
  }

}
class Magikarp extends Pokemon {
  constructor() {
    super("magikarp", [], RARITY.COMMON, 129, "", 30, 0, 1, 1, "WATER/melee");
  }
}

class Gyarados extends Pokemon {
  constructor() {
    super("gyarados", [], RARITY.COMMON, 130, "", 50, 5, 1, 1, "WATER/melee");
  }
}

class Rattata extends Pokemon {
  constructor() {
    super("rattata", [], RARITY.COMMON, 19, "", 20, 2, 1, 1, "NORMAL/melee");
  }
}

class Raticate extends Pokemon {
  constructor() {
    super("raticate", [], RARITY.COMMON, 20, "", 20, 2, 1, 1, "NORMAL/melee");
  }
}

class Spearow extends Pokemon {
  constructor() {
    super("spearow", [], RARITY.COMMON, 21, "", 20, 2, 1, 1, "NORMAL/melee");
  }
}

class Fearow extends Pokemon {
  constructor() {
    super("fearow", [], RARITY.COMMON, 22, "", 20, 2, 1, 1, "NORMAL/melee");
  }
}

class Lugia extends Pokemon {
  constructor() {
    super("lugia", [], RARITY.COMMON, 249, "", 100, 10, 1, 4, "FLYING/range");
  }
}

class Giratina extends Pokemon {
  constructor() {
    super("lugia", [], RARITY.COMMON, 487, "", 100, 10, 1, 3, "GHOST/range");
  }
}

class Zapdos extends Pokemon {
  constructor() {
    super("zapdos", [], RARITY.COMMON, 145, "", 100, 10, 1, 3, "ELECTRIC/range");
  }
}

class Moltres extends Pokemon {
  constructor() {
    super("moltres", [], RARITY.COMMON, 146, "", 100, 10, 1, 3, "FIRE/range");
  }
}

class Articuno extends Pokemon {
  constructor() {
    super("articuno", [], RARITY.COMMON, 144, "", 100, 10, 1, 3, "FLYING/range");
  }
}

class Dialga extends Pokemon {
  constructor() {
    super("dialga", [], RARITY.COMMON, 483, "", 150, 10, 1, 3, "FIGHTING/range");
  }
}

class Palkia extends Pokemon {
  constructor() {
    super("palkia", [], RARITY.COMMON, 484, "", 150, 10, 1, 1, "DRAGON/melee");
  }
}

class Suicune extends Pokemon {
  constructor() {
    super("suicune", [], RARITY.COMMON, 245, "", 150, 10, 1, 1, "WATER/melee");
  }
}

class Raikou extends Pokemon {
  constructor() {
    super("raikou", [], RARITY.COMMON, 243, "", 150, 10, 1, 1, "ELETRIC/melee");
  }
}

class Entei extends Pokemon {
  constructor() {
    super("entei", [], RARITY.COMMON, 244, "", 150, 10, 1, 1, "FIRE/melee");
  }
}

class Regice extends Pokemon {
  constructor() {
    super("regice", [], RARITY.COMMON, 378, "", 150, 10, 1, 1, "ICE/melee");
  }
}

class Regirock extends Pokemon {
  constructor() {
    super("regirock", [], RARITY.COMMON, 377, "", 150, 10, 1, 1, "ROCK/melee");
  }
}

class Registeel extends Pokemon {
  constructor() {
    super("registeel", [], RARITY.COMMON, 379, "", 150, 10, 1, 1, "DRAGON/melee");
  }
}

class Regigigas extends Pokemon {
  constructor() {
    super("regigigas", [], RARITY.COMMON, 486, "", 200, 10, 1, 1, "DRAGON/melee");
  }
}

class Kyogre extends Pokemon {
  constructor() {
    super("kyogre", [], RARITY.COMMON, 382, "", 200, 10, 1, 4, "WATER/range");
  }
}

class Groudon extends Pokemon {
  constructor() {
    super("groudon", [], RARITY.COMMON, 383, "", 200, 10, 1, 1, "FIRE/melee");
  }
}

class Rayquaza extends Pokemon {
  constructor() {
    super("rayquaza", [], RARITY.COMMON, 384, "", 200, 10, 1, 1, "DRAGON/melee");
  }
}


schema.defineTypes(Pokemon, {
  id: "string",
  name: "string",
  types: ["string"],
  rarity: "string",
  index: "uint16",
  evolution: "string",
  positionX: "uint8",
  positionY: "uint8",
  cost: "uint8",
  attackSprite: "string"
});

module.exports = {
  Pokemon
   , Bulbasaur
   , Ivysaur
   , Venusaur
   , Charmander
   , Charmeleon
   , Charizard
   , Squirtle
   , Wartortle
   , Blastoise
   , Geodude
   , Graveler
   , Golem
   , Azurill
   , Marill
   , Azumarill
   , Zubat
   , Golbat
   , Crobat
   , Mareep
   , Flaffy
   , Ampharos
   , Cleffa
   , Clefairy
   , Clefable
   , Igglybuff
   , Wigglytuff
   , Jigglypuff
   , Caterpie
   , Metapod
   , Butterfree
   , Weedle
   , Kakuna
   , Beedrill
   , Pidgey
   , Pidgeotto
   , Pidgeot
   , Hoppip
   , Skiploom
   , Jumpluff
   , Seedot
   , Nuzleaf
   , Shiftry
   , Starly
   , Staravia
   , Staraptor
   , Chikorita
   , Bayleef
   , Meganium
   , Cyndaquil
   , Quilava
   , Typhlosion
   , Totodile
   , Croconaw
   , Feraligatr
   , Treecko
   , Grovyle
   , Sceptile
   , Torchic
   , Combusken
   , Blaziken
   , Mudkip
   , Marshtomp
   , Swampert
   , Turtwig
   , Grotle
   , Torterra
   , Chimchar
   , Monferno
   , Infernape
   , Piplup
   , Prinplup
   , Empoleon
   , NidoranF
   , Nidorina
   , Nidoqueen
   , NidoranM
   , Nidorino
   , Nidoking
   , Pichu
   , Pikachu
   , Raichu
   , Machop
   , Machoke
   , Machamp
   , Horsea
   , Seadra
   , Kingdra
   , Trapinch
   , Vibrava
   , Flygon
   , Spheal
   , Sealeo
   , Walrein
   , Aron
   , Lairon
   , Aggron
   , Magnemite
   , Magneton
   , Magnezone
   , Rhyhorn
   , Rhydon
   , Rhyperior
   , Togepi
   , Togetic
   , Togekiss
   , Duskull
   , Dusclops
   , Dusknoir
   , Lotad
   , Lombre
   , Ludicolo
   , Shinx
   , Luxio
   , Luxray
   , Poliwag
   , Poliwhirl
   , Politoed
   , Abra
   , Kadabra
   , Alakazam
   , Gastly
   , Haunter
   , Gengar
   , Dratini
   , Dragonair
   , Dragonite
   , Larvitar
   , Pupitar
   , Tyranitar
   , Slakoth
   , Vigoroth
   , Slaking
   , Ralts
   , Kirlia
   , Gardevoir
   , Bagon
   , Shelgon
   , Salamence
   , Beldum
   , Metang
   , Metagross
   , Gible
   , Gabite
   , Garchomp
   , Elekid
   , Electabuzz
   , Electivire
   , Magby
   , Magmar
   , Magmortar
   , Munchlax
   , Snorlax
   , Growlithe
   , Arcanine
   , Onix
   , Steelix
   , Scyther
   , Scizor
   , Riolu
   , Lucario
   , Magikarp
   , Rattata
   , Raticate
   , Spearow
   , Fearow
   , Gyarados
   , Lugia
   , Giratina
   , Zapdos
   , Moltres
   , Articuno
   , Dialga
   , Palkia
   , Suicune
   , Raikou
   , Entei
   , Regice
   , Regirock
   , Registeel
   , Kyogre
   , Groudon
   , Rayquaza
   , Regigigas
   };