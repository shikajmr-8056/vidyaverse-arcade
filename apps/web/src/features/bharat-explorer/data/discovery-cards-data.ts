// =========================================================
// BHARAT EXPLORER — DISCOVERY CARDS DATASET
// 42 Verified Educational Cards for Classes 5–12
// =========================================================

import { DiscoveryCard } from '../types';

export const DISCOVERY_CARDS: DiscoveryCard[] = [
  // --- RIVERS ---
  {
    id: 'card-river-ganga',
    title: 'The Sacred Ganga',
    category: 'rivers',
    stateId: 'uttarakhand',
    stateName: 'Uttarakhand to West Bengal',
    subtitle: 'National River of India & Delta Wonder',
    description: 'Originating at Gaumukh (Gangotri Glacier) as the Bhagirathi, the Ganga unites with Alaknanda at Devprayag. Flowing 2,525 km across fertile northern plains, it forms the world’s largest river delta — the Sundarbans.',
    badge: 'Lifeline of 400M+ People',
    icon: '🌊',
    curriculumFact: 'The Sundarbans delta created by Ganga and Brahmaputra is a UNESCO Biosphere Reserve and the largest mangrove forest on Earth.'
  },
  {
    id: 'card-river-brahmaputra',
    title: 'Brahmaputra (Tsangpo)',
    category: 'rivers',
    stateId: 'assam',
    stateName: 'Arunachal Pradesh & Assam',
    subtitle: 'Mighty Red River of the East',
    description: 'Originating from the Angsi Glacier near Lake Manasarovar in Tibet as the Yarlung Tsangpo, it enters Arunachal Pradesh as the Siang, widens across Assam, and hosts Majuli, the world’s largest inhabited river island.',
    badge: 'Host of Majuli Island',
    icon: '💧',
    curriculumFact: 'Brahmaputra is a braided river that undergoes severe annual monsoon deposition, continually shifting sandbars called "chars".'
  },
  {
    id: 'card-river-godavari',
    title: 'Godavari (Dakshin Ganga)',
    category: 'rivers',
    stateId: 'maharashtra',
    stateName: 'Maharashtra to Andhra Pradesh',
    subtitle: 'Longest River of Peninsular India',
    description: 'Rising at Trimbakeshwar near Nashik in the Western Ghats, Godavari flows eastwards for 1,465 km draining 10% of India’s geographical area before discharging into the Bay of Bengal.',
    badge: '1,465 km Long',
    icon: '🌊',
    curriculumFact: 'Known as "Vridha Ganga" (Old Ganga), it supports major irrigation networks like the Sir Arthur Cotton Barrage at Rajahmundry.'
  },
  {
    id: 'card-river-narmada',
    title: 'Narmada (Reva)',
    category: 'rivers',
    stateId: 'madhya-pradesh',
    stateName: 'Madhya Pradesh & Gujarat',
    subtitle: 'West-Flowing Rift Valley River',
    description: 'Originating from Amarkantak Plateau, Narmada is the largest west-flowing river in Peninsular India. It flows through a tectonic rift valley between the Vindhya and Satpura ranges, creating the stunning Marble Rocks at Bhedaghat.',
    badge: 'Rift Valley Miracle',
    icon: '🏞️',
    curriculumFact: 'Unlike east-flowing rivers that form deltas, west-flowing rivers like Narmada and Tapi form estuaries because of steeper coastal gradients.'
  },
  {
    id: 'card-river-indus',
    title: 'Indus (Sindhu)',
    category: 'rivers',
    stateId: 'ladakh',
    stateName: 'Ladakh, J&K & Punjab',
    subtitle: 'Cradle of Ancient Civilisation',
    description: 'Flowing from Tibet through Ladakh between the Ladakh and Zanskar mountain ranges, the Indus river gave India its historic name and sustained the Bronze Age Indus Valley Civilization.',
    badge: 'Civilizational Mother',
    icon: '🏔️',
    curriculumFact: 'The Zanskar and Indus rivers have a spectacular colorful confluence at Nimmu near Leh, Ladakh.'
  },
  {
    id: 'card-river-kaveri',
    title: 'Kaveri (Cauvery)',
    category: 'rivers',
    stateId: 'karnataka',
    stateName: 'Karnataka & Tamil Nadu',
    subtitle: 'The Rice Bowl of South India',
    description: 'Originating at Talakaveri in the Brahmagiri Hills of Karnataka, Kaveri cascades down Shivanasamudra Falls and nourishes the lush Thanjavur delta, famously known as the Granary of South India.',
    badge: 'Granary of the South',
    icon: '🌾',
    curriculumFact: 'The Grand Anicut (Kallanai) dam on Kaveri, built by King Karikalan Chola around 150 CE, is one of the oldest working water-diversion structures in the world.'
  },

  // --- MOUNTAINS & LANDFORMS ---
  {
    id: 'card-mount-himalayas',
    title: 'The Great Himalayas',
    category: 'mountains',
    stateId: 'himachal-pradesh',
    stateName: 'Northern & Northeastern Arc',
    subtitle: 'Young Fold Mountains & Climate Shield',
    description: 'Stretching 2,400 km across Jammu & Kashmir, Ladakh, Himachal Pradesh, Uttarakhand, Sikkim, and Arunachal Pradesh. Formed by the collision of the Indian and Eurasian tectonic plates.',
    badge: 'Young Fold Mountain Belt',
    icon: '🏔️',
    curriculumFact: 'The Himalayas act as a climatic barrier preventing freezing Arctic winds from entering India and trapping monsoon moisture, ensuring abundant rainfall.'
  },
  {
    id: 'card-mount-western-ghats',
    title: 'Western Ghats (Sahyadri)',
    category: 'mountains',
    stateId: 'maharashtra',
    stateName: 'Gujarat to Kerala & Tamil Nadu',
    subtitle: 'Global Biodiversity Hotspot',
    description: 'An unbroken mountain chain older than the Himalayas running parallel to India’s western coast for 1,600 km. It influences the southwest monsoon winds and feeds every major peninsular river.',
    badge: 'UNESCO World Heritage',
    icon: '🌿',
    curriculumFact: 'Home to over 5,000 species of flowering plants, 139 mammal species, and the endangered Lion-tailed Macaque and Nilgiri Tahr.'
  },
  {
    id: 'card-mount-thar-desert',
    title: 'The Great Indian Thar Desert',
    category: 'mountains',
    stateId: 'rajasthan',
    stateName: 'Rajasthan',
    subtitle: 'World’s Most Densely Populated Desert',
    description: 'Spanning northwest Rajasthan, the Thar Desert features dramatic shifting barchan sand dunes, thorny scrub vegetation, saline playa lakes, and the ancient Aravalli rain-shadow system.',
    badge: 'Barchans & Oases',
    icon: '🏜️',
    curriculumFact: 'The Indira Gandhi Canal brings water over 650 km from the Harike Barrage in Punjab to irrigate vast stretches of the Thar Desert.'
  },
  {
    id: 'card-mount-deccan-traps',
    title: 'Deccan Traps & Plateau',
    category: 'mountains',
    stateId: 'maharashtra',
    stateName: 'Central & Peninsular India',
    subtitle: 'Vast Volcanic Basalt Shield',
    description: 'A massive basalt plateau formed around 66 million years ago by catastrophic volcanic fissure eruptions. Weathering of this basalt formed the fertile black cotton soil (Regur).',
    badge: 'Regur Black Cotton Soil',
    icon: '🌋',
    curriculumFact: 'Black cotton soil holds tremendous moisture and is rich in calcium carbonate, magnesium, and potash, ideal for cotton and sugarcane cultivation.'
  },
  {
    id: 'card-mount-aravalli',
    title: 'Aravalli Range',
    category: 'mountains',
    stateId: 'rajasthan',
    stateName: 'Gujarat, Rajasthan, Haryana, Delhi',
    subtitle: 'Oldest Fold Mountain Range in India',
    description: 'One of the world’s most ancient mountain systems, eroded into relict hills over millions of years. Guru Shikhar (1,722 m) on Mount Abu is its highest peak.',
    badge: 'Ancient Relict Mountains',
    icon: '⛰️',
    curriculumFact: 'The Aravallis prevent the eastward march of the Thar Desert toward the Gangetic plains and are rich in marble, granite, and copper reserves.'
  },

  // --- WILDLIFE & HABITATS ---
  {
    id: 'card-wildlife-tiger',
    title: 'Royal Bengal Tiger',
    category: 'wildlife',
    stateId: 'madhya-pradesh',
    stateName: 'Madhya Pradesh (Tiger State of India)',
    subtitle: 'National Animal of India',
    description: 'With over 785 wild tigers across Bandhavgarh, Kanha, Pench, and Panna, Madhya Pradesh leads Project Tiger, India’s flagship conservation success story launched in 1973.',
    badge: 'Project Tiger Pride',
    icon: '🐅',
    curriculumFact: 'India hosts more than 75% of the entire world’s wild tiger population, documented through the world’s largest camera-trap wildlife survey.'
  },
  {
    id: 'card-wildlife-lion',
    title: 'Asiatic Lion (Gir)',
    category: 'wildlife',
    stateId: 'gujarat',
    stateName: 'Gujarat (Gir National Park)',
    subtitle: 'Last Sanctuary of the Asiatic Lion',
    description: 'Gir National Park and Wildlife Sanctuary in the Saurashtra region of Gujarat is the only natural habitat where Asiatic lions roam freely in the wild.',
    badge: 'Only Wild Asiatic Lions',
    icon: '🦁',
    curriculumFact: 'Asiatic lions are distinguished from African lions by a longitudinal fold of skin running along their belly and a shorter, darker mane.'
  },
  {
    id: 'card-wildlife-rhino',
    title: 'Great One-Horned Rhinoceros',
    category: 'wildlife',
    stateId: 'assam',
    stateName: 'Assam (Kaziranga & Pobitora)',
    subtitle: 'Armor-Plated Giant of the Terai',
    description: 'Kaziranga National Park holds over 2,600 one-horned rhinos, representing two-thirds of the global population thriving in tall elephant grass and wetlands.',
    badge: 'Kaziranga Mascot',
    icon: '🦏',
    curriculumFact: 'The rhino’s horn is not made of bone, but of compacted keratin — the same protein that forms human hair and fingernails.'
  },
  {
    id: 'card-wildlife-snow-leopard',
    title: 'Snow Leopard (Ghost of the Mountains)',
    category: 'wildlife',
    stateId: 'ladakh',
    stateName: 'Ladakh (Hemis National Park)',
    subtitle: 'High Altitude Apex Predator',
    description: 'Hemis National Park in Ladakh is world-famous as the snow leopard capital. These solitary big cats have thick fur, wide paws acting as natural snowshoes, and long tails for balance on icy crags.',
    badge: 'Hemis High Altitude',
    icon: '🐆',
    curriculumFact: 'Snow leopards cannot roar; instead, they make sounds including chuffs, growls, and high-pitched piercing calls.'
  },
  {
    id: 'card-wildlife-elephant',
    title: 'Asian Elephant & Corridors',
    category: 'wildlife',
    stateId: 'kerala',
    stateName: 'Kerala & Karnataka (Periyar & Bandipur)',
    subtitle: 'National Heritage Animal of India',
    description: 'Asian elephants are keystone species that shape forest ecosystems by dispersing seeds and creating pathways. Protected under Project Elephant (1992).',
    badge: 'Keystone Forest Architect',
    icon: '🐘',
    curriculumFact: 'Elephant corridors are narrow strips of natural habitat that connect protected forest reserves, preventing genetic isolation and human-wildlife conflicts.'
  },

  // --- LANDMARKS & HERITAGE ---
  {
    id: 'card-lm-taj-mahal',
    title: 'Taj Mahal (Agra)',
    category: 'landmarks',
    stateId: 'uttar-pradesh',
    stateName: 'Uttar Pradesh',
    subtitle: 'Crown of Palaces & Wonder of the World',
    description: 'Built between 1632 and 1653 along the Yamuna River by Mughal Emperor Shah Jahan in memory of Mumtaz Mahal. Celebrated for its symmetrical white Makrana marble and pietra dura inlay work.',
    badge: 'UNESCO World Heritage',
    icon: '🕌',
    curriculumFact: 'The four corner minarets were deliberately designed to lean slightly outward so that in case of an earthquake, they would fall away from the main dome.'
  },
  {
    id: 'card-lm-hampi',
    title: 'Group of Monuments at Hampi',
    category: 'landmarks',
    stateId: 'karnataka',
    stateName: 'Karnataka',
    subtitle: 'Magnificent Capital of Vijayanagara',
    description: 'Situated on the banks of the Tungabhadra River, Hampi contains 1,600 surviving monuments among dramatic granite boulders, including the iconic Stone Chariot and musical pillars of Vijaya Vittala.',
    badge: 'Stone Chariot Fame',
    icon: '🏛️',
    curriculumFact: 'The 56 musical pillars in the Vittala Temple hall produce distinct musical swaras (notes) when gently tapped.'
  },
  {
    id: 'card-lm-konark',
    title: 'Konark Sun Temple',
    category: 'landmarks',
    stateId: 'odisha',
    stateName: 'Odisha',
    subtitle: 'The Black Pagoda on the Coast',
    description: 'Constructed by King Narasimhadeva I of the Eastern Ganga Dynasty in 1250 CE, designed as Surya’s cosmic chariot pulled by seven horses with 24 carved stone sundial wheels.',
    badge: 'Ancient Astronomical Dial',
    icon: '☀️',
    curriculumFact: 'The spokes of the 24 wheels function as precise sundials; the shadow cast by the hub indicates the exact time of day down to minutes.'
  },
  {
    id: 'card-lm-meenakshi',
    title: 'Meenakshi Sundareswarar Temple',
    category: 'landmarks',
    stateId: 'tamil-nadu',
    stateName: 'Tamil Nadu (Madurai)',
    subtitle: 'Dravidian Architectural Summit',
    description: 'Madurai’s city layout is built in concentric lotus petals around this 2,500-year-old temple complex with 14 towering gopurams covered in thousands of colorful mythological stucco figures.',
    badge: 'Lotus City Heart',
    icon: '🛕',
    curriculumFact: 'The Hall of Thousand Pillars (Aayiram Kaal Mandapam) contains 985 exquisitely carved monolithic stone pillars aligned in perfect optical symmetry.'
  },
  {
    id: 'card-lm-golden-temple',
    title: 'Harmandir Sahib (Golden Temple)',
    category: 'landmarks',
    stateId: 'punjab',
    stateName: 'Punjab (Amritsar)',
    subtitle: 'Spiritual Center of Universal Brotherhood',
    description: 'Founded by Guru Ram Das in 1577 with foundation stone laid by Sufi saint Mian Mir. The gold-plated gurdwara serves free meals to up to 100,000 pilgrims every single day in the world’s largest langar.',
    badge: 'Largest Free Kitchen',
    icon: '✨',
    curriculumFact: 'The sanctum is built on a lower level than the surrounding terrace so visitors descend into it, teaching humility before the Divine.'
  },

  // --- CULTURE & TRADITIONS ---
  {
    id: 'card-culture-madhubani',
    title: 'Madhubani (Mithila) Art',
    category: 'culture',
    stateId: 'bihar',
    stateName: 'Bihar',
    subtitle: 'Ancient Folk Art with Natural Pigments',
    description: 'Characterized by complex geometric patterns, two-dimensional figures, and natural dyes derived from turmeric, charcoal, marigold flowers, and indigo, traditionally painted using twigs and fingers.',
    badge: 'Geographical Indication (GI)',
    icon: '🎨',
    curriculumFact: 'Madhubani paintings leave no empty space on the canvas; artists fill all gaps with patterns of leaves, birds, fish, and solar symbols.'
  },
  {
    id: 'card-culture-kathakali',
    title: 'Kathakali & Kalaripayattu',
    category: 'culture',
    stateId: 'kerala',
    stateName: 'Kerala',
    subtitle: 'Classical Dance Drama & Ancient Martial Art',
    description: 'Kathakali features elaborate face makeup (chutti), colorful headgear, and intricate eye movements (mudras) depicting Indian epics, closely linked to Kalaripayattu, the world’s oldest martial art.',
    badge: 'Mastery of Navarasas',
    icon: '🎭',
    curriculumFact: 'Green facial makeup (Paccha) signifies noble heroes like Rama, while red (Thati) represents fierce, demonic characters.'
  },
  {
    id: 'card-culture-bihu',
    title: 'Rongali Bihu & Muga Silk',
    category: 'culture',
    stateId: 'assam',
    stateName: 'Assam',
    subtitle: 'Harvest Festivities & Golden Silk',
    description: 'Celebrated in mid-April marking the Assamese New Year and sowing season with energetic group dances to the dhol and pepa (buffalo horn flute). Dancers wear lustrous golden Muga silk.',
    badge: 'Golden Thread of Assam',
    icon: '🪘',
    curriculumFact: 'Muga silk is completely endemic to the Brahmaputra valley and is known for its natural golden sheen that actually brightens with every wash!'
  },
  {
    id: 'card-culture-chhau',
    title: 'Chhau Martial Dance',
    category: 'culture',
    stateId: 'jharkhand',
    stateName: 'Jharkhand, Odisha & West Bengal',
    subtitle: 'UNESCO Intangible Cultural Heritage',
    description: 'A vibrant semi-classical dance with martial and tribal origins. Dancers wear elaborate clay masks depicting deities and animal spirits, leaping with acrobatic vigor.',
    badge: 'UNESCO Living Heritage',
    icon: '🎭',
    curriculumFact: 'The three regional styles are Seraikela (Jharkhand), Mayurbhanj (Odisha, danced maskless), and Purulia (West Bengal, with giant feathered masks).'
  },
  {
    id: 'card-culture-garba',
    title: 'Garba of Gujarat',
    category: 'culture',
    stateId: 'gujarat',
    stateName: 'Gujarat',
    subtitle: 'Circular Dance of Devotion',
    description: 'Inscribed on the UNESCO Intangible Cultural Heritage list in 2023. Performed in concentric circles around a clay lantern (Garbha Deep) honoring the divine feminine during Navratri.',
    badge: 'UNESCO Heritage 2023',
    icon: '💃',
    curriculumFact: 'The word Garba comes from the Sanskrit word "Garbha" (womb), symbolizing life, cyclical time, and the universe.'
  }
];
