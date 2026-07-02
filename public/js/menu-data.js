const MENU = {
  starters: {
    name: "Starters",
    icon: "img/icons/starter.svg",
    items: [
      { id: "s1", name: "Vegetable Spring Roll", desc: "2 pieces", price: 25 },
      { id: "s2", name: "Chicken Spring Roll", desc: "2 pieces", price: 30 },
      { id: "s3", name: "Prawn Spring Roll", desc: "2 pieces", price: 38 },
      { id: "s4", name: "Prawn & Cheese Spring Roll", desc: "2 pieces", price: 46 },
      { id: "s5", name: "Crab & Cheese Spring Roll", desc: "2 pieces", price: 30 },
      { id: "s6", name: "Tempura Prawns", desc: "3 pieces", price: 49 },
      { id: "s7", name: "Crystal Prawns Dumplings", desc: "4 pieces", price: 76 },
      { id: "s8a", name: "Dumplings - Chicken", desc: "Steamed or pan fried, 6 pieces", price: 69 },
      { id: "s8b", name: "Dumplings - Beef", desc: "Steamed or pan fried, 6 pieces", price: 89 },
      { id: "s8c", name: "Dumplings - Pork", desc: "Steamed or pan fried, 6 pieces", price: 79 },
      { id: "s9a", name: "Steamed Juicy Dumplings - Chicken", desc: "10 pieces", price: 108 },
      { id: "s9b", name: "Steamed Juicy Dumplings - Beef", desc: "10 pieces", price: 128 },
      { id: "s9c", name: "Steamed Juicy Dumplings - Pork", desc: "10 pieces", price: 118 },
      { id: "s10a", name: "Steamed Buns - Pork", desc: "2 pieces", price: 58 },
      { id: "s10b", name: "Steamed Buns - Vegetable", desc: "2 pieces", price: 46 },
      { id: "s10c", name: "Steamed Buns - Custard", desc: "2 pieces", price: 46 },
      { id: "s11", name: "Wonton Soup", desc: "Pork, 8 pieces", price: 79 }
    ]
  },
  soup: {
    name: "Soup",
    items: [
      { id: "sp1", name: "Chicken Sweet Corn Soup", desc: "", price: 56 },
      { id: "sp2", name: "Hot Sour Soup", desc: "", price: 56 }
    ]
  },
  beef: {
    name: "Beef",
    note: "Served with rice or noodles",
    items: [
      { id: "b1", name: "Beef Chop Suey", desc: "Served with rice or noodles", price: 105 },
      { id: "b2", name: "Beef in Oyster Sauce", desc: "Served with rice or noodles", price: 105 },
      { id: "b3", name: "Crispy Beef", desc: "Served with rice or noodles", price: 116 },
      { id: "b4", name: "Black Bean Beef", desc: "Served with rice or noodles", price: 116 },
      { id: "b5", name: "Shanghai Steak", desc: "Served with rice or noodles", price: 116 }
    ]
  },
  chicken: {
    name: "Chicken",
    note: "Served with rice or noodles",
    items: [
      { id: "c1", name: "Kong-Bao Chicken", desc: "Peanut & chilli, served with rice or noodles", price: 89 },
      { id: "c2", name: "Chicken Chop Suey", desc: "Served with rice or noodles", price: 87 },
      { id: "c3", name: "Sweet-Sour Chicken", desc: "Served with rice or noodles", price: 89 },
      { id: "c4", name: "Cashew Nuts Chicken", desc: "Served with rice or noodles", price: 96 },
      { id: "c5", name: "Lemon Chicken", desc: "Served with rice or noodles", price: 96 },
      { id: "c6", name: "Sesame Seeds Chicken", desc: "Served with rice or noodles", price: 96 }
    ]
  },
  pork: {
    name: "Pork",
    note: "Served with rice or noodles",
    items: [
      { id: "p1", name: "Pork Chop Suey", desc: "Served with rice or noodles", price: 105 },
      { id: "p2", name: "Sweet-Sour Pork", desc: "Served with rice or noodles", price: 105 },
      { id: "p3", name: "Sweet-Sour Pork Ribs", desc: "Served with rice or noodles", price: 105 },
      { id: "p4", name: "Crispy Pork", desc: "Served with rice or noodles", price: 105 }
    ]
  },
  seafood: {
    name: "Seafood",
    note: "Served with rice or noodles",
    items: [
      { id: "sf1", name: "Sweet-Sour Prawn", desc: "10 pieces, served with rice or noodles", price: 130 },
      { id: "sf2", name: "Garlic Prawn", desc: "10 pieces, served with rice or noodles", price: 130 },
      { id: "sf3", name: "Prawn Chop Suey", desc: "10 pieces, served with rice or noodles", price: 130 },
      { id: "sf4", name: "Cashew Nuts Prawn", desc: "10 pieces, served with rice or noodles", price: 136 },
      { id: "sf5", name: "Garlic Calamari", desc: "Served with rice or noodles", price: 115 },
      { id: "sf6", name: "Calamari Chop Suey", desc: "Served with rice or noodles", price: 115 }
    ]
  },
  vegetarian: {
    name: "Vegetarian",
    items: [
      { id: "v1", name: "Vegetable Chop Suey", desc: "Served with rice or noodles", price: 79 }
    ]
  },
  noodlesRice: {
    name: "Noodles & Rice",
    note: "Chow mein & chow fan",
    items: [
      { id: "nr1", name: "Chicken Noodles / Rice", desc: "Chow mein or chow fan", price: 88 },
      { id: "nr2", name: "Pork Noodles / Rice", desc: "Chow mein or chow fan", price: 105 },
      { id: "nr3", name: "Beef Noodles / Rice", desc: "Chow mein or chow fan", price: 105 },
      { id: "nr4", name: "Seafood Noodles / Rice", desc: "Chow mein or chow fan", price: 126 },
      { id: "nr5", name: "Prawn Noodles / Rice", desc: "Chow mein or chow fan", price: 130 },
      { id: "nr6", name: "Calamari Noodles / Rice", desc: "Chow mein or chow fan", price: 115 },
      { id: "nr7", name: "Vegetable Noodles / Rice", desc: "Chow mein or chow fan", price: 75 },
      { id: "nr8", name: "Singapore Rice Noodles", desc: "", price: 126 }
    ]
  },
  sideOrders: {
    name: "Side Orders",
    items: [
      { id: "so1", name: "Steamed Rice", desc: "Small", price: 33 },
      { id: "so2", name: "Egg Fried Rice", desc: "Small", price: 39 },
      { id: "so3", name: "Fried Noodles", desc: "Small", price: 39 },
      { id: "so4", name: "Sweet Sour Sauce", desc: "", price: 16 }
    ]
  },
  thaiDishes: {
    name: "Thai Dishes",
    items: [
      { id: "t1", name: "Prawn Tom Yum Soup", desc: "Prawn, mushroom, tomato in spice tom yum soup", price: 79 },
      { id: "t2", name: "Angry Beef", desc: "Thai herbs, chilli & garlic with crisp vegetables", price: 135 },
      { id: "t3a", name: "Green Curry - Chicken", desc: "Carrot, cauliflower, broccoli, mushroom, bamboo shoot in green curry sauce", price: 109 },
      { id: "t3b", name: "Green Curry - Beef", desc: "Carrot, cauliflower, broccoli, mushroom, bamboo shoot in green curry sauce", price: 129 },
      { id: "t3c", name: "Green Curry - Prawn", desc: "Carrot, cauliflower, broccoli, mushroom, bamboo shoot in green curry sauce", price: 138 },
      { id: "t3d", name: "Green Curry - Vegetable", desc: "Carrot, cauliflower, broccoli, mushroom, bamboo shoot in green curry sauce", price: 89 },
      { id: "t4a", name: "Red Curry - Chicken", desc: "Carrot, cauliflower, broccoli, mushroom, bamboo shoot in red curry sauce", price: 109 },
      { id: "t4b", name: "Red Curry - Beef", desc: "Carrot, cauliflower, broccoli, mushroom, bamboo shoot in red curry sauce", price: 129 },
      { id: "t4c", name: "Red Curry - Prawn", desc: "Carrot, cauliflower, broccoli, mushroom, bamboo shoot in red curry sauce", price: 138 },
      { id: "t4d", name: "Red Curry - Vegetable", desc: "Carrot, cauliflower, broccoli, mushroom, bamboo shoot in red curry sauce", price: 89 },
      { id: "t5a", name: "Pad Thai Noodles - Chicken", desc: "Rice noodles stir-fry with bean sprouts, tofu, egg, served with peanuts", price: 119 },
      { id: "t5b", name: "Pad Thai Noodles - Prawn", desc: "Rice noodles stir-fry with bean sprouts, tofu, egg, served with peanuts", price: 138 }
    ]
  },
  sashimi: {
    name: "Sashimi",
    note: "4 pieces",
    items: [
      { id: "sa1", name: "Salmon Sashimi", desc: "4 pieces", price: 70 },
      { id: "sa2", name: "Seared Salmon Sashimi", desc: "Spicy, 4 pieces", price: 73 }
    ]
  },
  nigiri: {
    name: "Nigiri",
    note: "2 pieces",
    items: [
      { id: "ni1", name: "Salmon / Prawn Nigiri", desc: "2 pieces", price: 39 },
      { id: "ni2", name: "Bean Curd Nigiri", desc: "Sweet tofu, 2 pieces", price: 38 },
      { id: "ni3", name: "Spicy Prawn Bean Curd", desc: "2 pieces", price: 49 }
    ]
  },
  maki: {
    name: "Maki",
    note: "6 pieces",
    items: [
      { id: "mk1", name: "Salmon / Prawn Maki", desc: "6 pieces", price: 45 },
      { id: "mk2", name: "Crab Maki", desc: "6 pieces", price: 38 },
      { id: "mk3", name: "Avo Maki", desc: "6 pieces", price: 30 },
      { id: "mk4", name: "Cucumber Maki", desc: "6 pieces", price: 30 }
    ]
  },
  californiaRoll: {
    name: "California Roll",
    note: "4 pieces",
    items: [
      { id: "cr1", name: "Salmon / Spicy Salmon California Roll", desc: "4 pieces", price: 54 },
      { id: "cr2", name: "Prawn California Roll", desc: "4 pieces", price: 49 },
      { id: "cr3", name: "Crabstick California Roll", desc: "4 pieces", price: 39 },
      { id: "cr4", name: "Vegetarian California Roll", desc: "4 pieces", price: 34 },
      { id: "cr5", name: "Tempura Prawn Roll", desc: "4 pieces", price: 52 }
    ]
  },
  fashionSandwich: {
    name: "Fashion Sandwich",
    note: "6 pieces",
    items: [
      { id: "fs1", name: "Salmon / Prawn Fashion Sandwich", desc: "6 pieces", price: 54 },
      { id: "fs2", name: "Crabstick Fashion Sandwich", desc: "6 pieces", price: 40 },
      { id: "fs3", name: "Vegetarian Fashion Sandwich", desc: "6 pieces", price: 34 }
    ]
  },
  handRoll: {
    name: "Hand Roll - Temaki",
    items: [
      { id: "hr1", name: "Salmon / Spicy Salmon Temaki", desc: "", price: 49 },
      { id: "hr2", name: "Prawn Temaki", desc: "", price: 45 },
      { id: "hr3", name: "Crabstick Temaki", desc: "", price: 36 },
      { id: "hr4", name: "Vegetarian Temaki", desc: "", price: 32 },
      { id: "hr5", name: "Tempura Prawn Temaki", desc: "", price: 52 }
    ]
  },
  salad: {
    name: "Salad",
    items: [
      { id: "sl1", name: "Prawn & Avo Salad", desc: "With Japanese mayo", price: 76 },
      { id: "sl2", name: "Tempura Prawn & Avo Salad", desc: "", price: 76 },
      { id: "sl3", name: "Crabstick & Cucumber Salad", desc: "With Japanese mayo", price: 50 },
      { id: "sl4", name: "Sashimi Salad", desc: "Salmon, crabstick, avo, cucumber with 7 spicy teriyaki sauce", price: 109 }
    ]
  },
  pokeBowl: {
    name: "Poke Bowl",
    items: [
      { id: "pb1", name: "Salmon Poke Bowl", desc: "", price: 119 }
    ]
  },
  extras: {
    name: "Extras",
    items: [
      { id: "ex1", name: "Ginger, Wasabi, Soya Sauce, Mayo", desc: "", price: 16 }
    ]
  },
  sushiSpecials: {
    name: "Sushi Specials",
    items: [
      { id: "ss1", name: "Wasabi Parcel", desc: "4 pieces", price: 55 },
      { id: "ss2", name: "Crunch Roll", desc: "5 pieces", price: 55 },
      { id: "ss3", name: "Philadelphia Roll", desc: "5 pieces", price: 60 },
      { id: "ss4", name: "Samurai Roll", desc: "4 pieces", price: 60 },
      { id: "ss5", name: "Salmon Roses", desc: "4 pieces", price: 66 },
      { id: "ss6", name: "Prawn Roses", desc: "4 pieces", price: 62 },
      { id: "ss7", name: "Rainbow Roll", desc: "4 pieces", price: 60 },
      { id: "ss8", name: "Dragon Flower", desc: "4 pieces", price: 68 },
      { id: "ss9", name: "Bamboo Roll", desc: "4 pieces", price: 60 },
      { id: "ss10", name: "Salmon Grenades", desc: "4 pieces", price: 89 },
      { id: "ss11", name: "Cairns Roll", desc: "4 pieces", price: 60 },
      { id: "ss12", name: "Creamy Prawn Roses", desc: "4 pieces", price: 78 },
      { id: "ss13", name: "Rock Prawn Roll", desc: "4 pieces", price: 60 },
      { id: "ss14", name: "Jalapeno Salmon", desc: "4 pieces", price: 62 }
    ]
  },
  comboPlatters: {
    name: "Combo & Platters",
    items: [
      { id: "cp1", name: "Combo No.1", desc: "12 pieces", price: 115 },
      { id: "cp2", name: "Combo No.2", desc: "14 pieces", price: 145 },
      { id: "cp3", name: "Combo No.3", desc: "16 pieces", price: 182 },
      { id: "cp4", name: "Combo No.4", desc: "14 pieces", price: 189 },
      { id: "cp5", name: "Combo No.5", desc: "26 pieces", price: 206 },
      { id: "cp6", name: "Combo No.6", desc: "24 pieces", price: 236 },
      { id: "cp7", name: "Combo No.7", desc: "28 pieces", price: 252 },
      { id: "cp8", name: "Combo No.8", desc: "32 pieces", price: 242 },
      { id: "cp9", name: "Vegetable Platter", desc: "16 pieces", price: 115 },
      { id: "cp10", name: "Salmon Platter", desc: "28 pieces", price: 289 },
      { id: "cp11", name: "Prawn Platter", desc: "26 pieces", price: 265 },
      { id: "cp12", name: "Family Platter", desc: "42 pieces", price: 399 }
    ]
  }
};

const MENU_IMAGES = {
  // Sushi Specials
  ss1: 'wasabi-parcel', ss2: 'crunch-roll', ss3: 'philadelphia-roll', ss4: 'samurai-roll',
  ss5: 'salmon-roses', ss6: 'prawn-roses', ss7: 'rainbow-roll', ss8: 'dragon-flower',
  ss9: 'bamboo-roll', ss10: 'salmon-grenades', ss11: 'cairns-roll', ss12: 'creamy-prawn-roses',
  ss13: 'rock-prawn-roll', ss14: 'jalapeno-salmon',
  // Sushi categories
  sa1: 'sashimi', sa2: 'sashimi', ni1: 'nigiri', ni2: 'nigiri', ni3: 'nigiri',
  mk1: 'maki', mk2: 'maki', mk3: 'maki', mk4: 'maki',
  cr1: 'california-roll', cr2: 'california-roll', cr3: 'california-roll', cr4: 'california-roll', cr5: 'california-roll',
  fs1: 'fashion-sandwich', fs2: 'fashion-sandwich', fs3: 'fashion-sandwich',
  hr1: 'hand-roll', hr2: 'hand-roll', hr3: 'hand-roll', hr4: 'hand-roll', hr5: 'hand-roll',
  pb1: 'poke-bowl',
  // Combos & Platters
  cp1: 'combo-1', cp2: 'combo-2', cp3: 'combo-3', cp4: 'combo-4',
  cp5: 'combo-5', cp6: 'combo-6', cp7: 'combo-7', cp8: 'combo-8',
  cp9: 'vegetable-platter', cp10: 'salmon-platter', cp11: 'prawn-platter', cp12: 'family-platter',
  // Asian dishes
  s1: 'spring-rolls', s2: 'spring-rolls', s3: 'spring-rolls', s4: 'spring-rolls', s5: 'spring-rolls',
  s7: 'dumplings', s8a: 'dumplings', s8b: 'dumplings', s8c: 'dumplings',
  s9a: 'dumplings', s9b: 'dumplings', s9c: 'dumplings',
  b1: 'beef-dish', b2: 'beef-dish', b3: 'beef-dish', b4: 'beef-dish', b5: 'beef-dish',
  nr2: 'noodles-pork', nr3: 'noodles-beef', nr4: 'noodles-seafood', nr5: 'noodles-prawn',
  t1: 'tom-yum-soup',
  t3a: 'green-curry', t3b: 'green-curry', t3c: 'green-curry', t3d: 'green-curry',
  t4a: 'red-curry', t4b: 'red-curry', t4c: 'red-curry', t4d: 'red-curry',
  t5a: 'pad-thai', t5b: 'pad-thai',
};

const MENU_SECTIONS = [
  { key: 'sushiSpecials', label: 'Sushi Specials', group: 'sushi' },
  { key: 'sashimi', label: 'Sashimi', group: 'sushi' },
  { key: 'nigiri', label: 'Nigiri', group: 'sushi' },
  { key: 'maki', label: 'Maki', group: 'sushi' },
  { key: 'californiaRoll', label: 'California Roll', group: 'sushi' },
  { key: 'fashionSandwich', label: 'Fashion Sandwich', group: 'sushi' },
  { key: 'handRoll', label: 'Hand Roll', group: 'sushi' },
  { key: 'salad', label: 'Salad', group: 'sushi' },
  { key: 'pokeBowl', label: 'Poke Bowl', group: 'sushi' },
  { key: 'comboPlatters', label: 'Combos & Platters', group: 'sushi' },
  { key: 'starters', label: 'Starters', group: 'asian' },
  { key: 'soup', label: 'Soup', group: 'asian' },
  { key: 'chicken', label: 'Chicken', group: 'asian' },
  { key: 'beef', label: 'Beef', group: 'asian' },
  { key: 'pork', label: 'Pork', group: 'asian' },
  { key: 'seafood', label: 'Seafood', group: 'asian' },
  { key: 'vegetarian', label: 'Vegetarian', group: 'asian' },
  { key: 'noodlesRice', label: 'Noodles & Rice', group: 'asian' },
  { key: 'thaiDishes', label: 'Thai Dishes', group: 'asian' },
  { key: 'sideOrders', label: 'Side Orders', group: 'asian' },
  { key: 'extras', label: 'Extras', group: 'extras' }
];
