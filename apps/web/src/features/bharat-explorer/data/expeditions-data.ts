// =========================================================
// BHARAT EXPLORER — EXPEDITIONS & MISSIONS DATASET
// 7 Interactive Educational Expeditions for NCERT Classes 5–12
// Supporting 7 Reusable Mini-Game Mechanics
// =========================================================

import { ExpeditionMission } from '../types';

export const EXPEDITION_MISSIONS: ExpeditionMission[] = [
  // --------------------------------------------------------------------------
  // EXPEDITION 1: NORTHERN HEIGHTS & HIMALAYAN PASSES
  // --------------------------------------------------------------------------
  {
    id: 'exp-himalayan-heights',
    title: 'Himalayan Heights & Northern Frontiers',
    subtitle: 'From the Crown of Ladakh to the Valleys of Himachal & Kashmir',
    gradeBand: 'Classes 5–7',
    zone: 'North',
    unlockedByDefault: true,
    description: 'Traverse snow-capped young fold mountains, high-altitude desert plateaus, and glacial valleys guarding India’s northern boundary.',
    targetStateIds: ['ladakh', 'jammu-kashmir', 'himachal-pradesh', 'uttarakhand', 'punjab'],
    rewardXP: 150,
    badgeId: 'badge-himalayan-scout',
    badgeName: 'Himalayan Scout',
    badgeIcon: '🏔️',
    stages: [
      {
        id: 'stg-1-1',
        miniGameType: 'state-explorer',
        targetStateId: 'ladakh',
        prompt: 'Which high-altitude Union Territory lies on the eastern side of Jammu & Kashmir and is famously called the "Land of High Mountain Passes"?',
        options: ['Ladakh', 'Himachal Pradesh', 'Uttarakhand', 'Sikkim'],
        correctAnswer: 'Ladakh',
        hints: [
          'Its capital is Leh and it borders Tibet to the east.',
          'Hemis National Park, famous for snow leopards, is located here.',
          'Look at the large purple region at the very northern tip of India!'
        ],
        explanation: 'Ladakh became a separate Union Territory in 2019. It contains the cold desert of the Indus Valley and mountain passes like Khardung La.'
      },
      {
        id: 'stg-1-2',
        miniGameType: 'river-tracker',
        targetStateId: 'uttarakhand',
        prompt: 'The sacred river Ganga originates at the Gangotri Glacier under what name before merging with Alaknanda at Devprayag?',
        options: ['Bhagirathi', 'Yamuna', 'Mandakini', 'Ghaghara'],
        correctAnswer: 'Bhagirathi',
        hints: [
          'It is named after the ancient king Bhagiratha who prayed to bring the river to Earth.',
          'The Tehri Dam, India’s highest dam, is built across this river.',
          'Look at Uttarakhand on the western border of Nepal.'
        ],
        explanation: 'At Devprayag in Uttarakhand, the Bhagirathi and Alaknanda rivers converge to officially form the River Ganga.'
      },
      {
        id: 'stg-1-3',
        miniGameType: 'landmark-detective',
        targetStateId: 'punjab',
        prompt: 'Detective clue: "I am a spiritual sanctuary founded by Guru Ram Das in 1577. My sanctum is plated in gold and floats within the sacred Amrit Sarovar." Where am I?',
        options: [
          'Harmandir Sahib (Golden Temple) in Amritsar, Punjab',
          'Sun Temple in Konark, Odisha',
          'Dilwara Temples in Mount Abu, Rajasthan',
          'Vaishno Devi in Katra, Jammu & Kashmir'
        ],
        correctAnswer: 'Harmandir Sahib (Golden Temple) in Amritsar, Punjab',
        hints: [
          'It is in the state known as the "Land of Five Rivers".',
          'It operates the world’s largest community kitchen (langar).',
          'The city of Amritsar is near the Wagah border with Pakistan.'
        ],
        explanation: 'Harmandir Sahib in Amritsar, Punjab, was built with four doors open to all four directions, symbolizing inclusivity for all castes and creeds.'
      },
      {
        id: 'stg-1-4',
        miniGameType: 'wildlife-explorer',
        targetStateId: 'ladakh',
        prompt: 'Which elusive apex predator, adapted with extra-large paws and a thick bushy tail for sub-zero mountain survival, is protected in Hemis National Park?',
        options: ['Snow Leopard', 'Royal Bengal Tiger', 'Red Panda', 'Clouded Leopard'],
        correctAnswer: 'Snow Leopard',
        hints: [
          'Locals refer to it as the "Shan" or "Ghost of the Mountains".',
          'It cannot roar, but emits piercing chuffs and whistles.',
          'Its thick fur allows it to withstand temperatures down to -40°C in Ladakh.'
        ],
        explanation: 'Hemis National Park in Ladakh is globally celebrated as the Snow Leopard capital of the world.'
      }
    ]
  },

  // --------------------------------------------------------------------------
  // EXPEDITION 2: DESERT SANDS & COASTAL RANN: THE VIBRANT WEST
  // --------------------------------------------------------------------------
  {
    id: 'exp-vibrant-west',
    title: 'Desert Sands & Coastal Rann: The Vibrant West',
    subtitle: 'From the Thar Dunes of Rajasthan to Gujarat’s White Salt Marsh & Maharashtra’s Basalt Coast',
    gradeBand: 'Classes 5–7',
    zone: 'West',
    unlockedByDefault: true,
    description: 'Explore shifting desert dunes, the world’s only wild Asiatic lions, the ancient Aravalli range, and bustling coastal ports.',
    targetStateIds: ['rajasthan', 'gujarat', 'maharashtra', 'goa'],
    rewardXP: 175,
    badgeId: 'badge-desert-mariner',
    badgeName: 'Desert Mariner',
    badgeIcon: '🏜️',
    stages: [
      {
        id: 'stg-2-1',
        miniGameType: 'state-explorer',
        targetStateId: 'rajasthan',
        prompt: 'Which is the largest state in India by land area, home to the Thar Desert and the Pink City of Jaipur?',
        options: ['Rajasthan', 'Madhya Pradesh', 'Maharashtra', 'Uttar Pradesh'],
        correctAnswer: 'Rajasthan',
        hints: [
          'It covers over 342,000 square kilometers (about 10.4% of India’s land area).',
          'Famous for the Mehrangarh Fort, Thar Desert, and Lake Pichola.',
          'Look at the large pink state on the northwestern border of India!'
        ],
        explanation: 'Rajasthan is India’s largest state by area, famous for its historic hill forts, desert dunes, and royal heritage.'
      },
      {
        id: 'stg-2-2',
        miniGameType: 'wildlife-explorer',
        targetStateId: 'gujarat',
        prompt: 'In which protected forest in Gujarat can you find the only surviving wild population of the Asiatic Lion (Panthera leo leo)?',
        options: [
          'Gir National Park',
          'Ranthambore National Park',
          'Jim Corbett National Park',
          'Sundarbans Biosphere Reserve'
        ],
        correctAnswer: 'Gir National Park',
        hints: [
          'It is situated in the Kathiawar peninsula (Saurashtra) of Gujarat.',
          'The state was the birthplace of Mahatma Gandhi.',
          'The Maldhari pastoralist community coexists peacefully with these big cats.'
        ],
        explanation: 'Gir National Park in Gujarat is the sole natural home of the endangered Asiatic Lion, distinguished by a longitudinal belly fold.'
      },
      {
        id: 'stg-2-3',
        miniGameType: 'river-tracker',
        targetStateId: 'gujarat',
        prompt: 'Which major peninsular river flows westward through a rift valley between the Vindhya and Satpura ranges and empties into the Gulf of Khambhat near Bharuch?',
        options: ['Narmada', 'Godavari', 'Krishna', 'Mahanadi'],
        correctAnswer: 'Narmada',
        hints: [
          'The 182-meter tall Statue of Unity is constructed overlooking this river at Kevadia.',
          'It originates from the Amarkantak Plateau in Madhya Pradesh.',
          'Unlike east-flowing rivers, it forms an estuary rather than a delta.'
        ],
        explanation: 'Narmada is the fifth-longest river in India and the largest west-flowing river, celebrated for its marble gorge at Bhedaghat.'
      },
      {
        id: 'stg-2-4',
        miniGameType: 'regional-discovery',
        targetStateId: 'maharashtra',
        prompt: 'What fertile, moisture-retentive volcanic soil type covers the vast Deccan Trap region of Maharashtra, making it ideal for growing cotton?',
        options: [
          'Regur (Black Cotton Soil)',
          'Alluvial Soil',
          'Laterite Soil',
          'Desert Sandy Soil'
        ],
        correctAnswer: 'Regur (Black Cotton Soil)',
        hints: [
          'It is formed by the weathering of ancient basaltic lava flows.',
          'It develops deep cracks during hot dry weather, causing self-ploughing.',
          'Maharashtra and Gujarat lead India’s cotton textile industry because of this soil.'
        ],
        explanation: 'Black soil or Regur soil is clayey and holds water for a long time, providing ideal moisture conditions for cotton cultivation.'
      }
    ]
  },

  // --------------------------------------------------------------------------
  // EXPEDITION 3: DECCAN PLATEAU & TEMPLE TRAILS: THE SOUTHERN PENINSULA
  // --------------------------------------------------------------------------
  {
    id: 'exp-southern-peninsula',
    title: 'Deccan Plateau & Temple Trails: The Resilient South',
    subtitle: 'From the Spice Coast of Kerala to the Coromandel Plains & Nilgiri Hills',
    gradeBand: 'Classes 8–10',
    zone: 'South',
    unlockedByDefault: false,
    description: 'Discover the ancient Western Ghats biodiversity hotspot, backwaters, historic Dravidian architecture, and the delta rice bowls.',
    targetStateIds: ['karnataka', 'kerala', 'tamil-nadu', 'andhra-pradesh', 'telangana'],
    rewardXP: 200,
    badgeId: 'badge-peninsular-pioneer',
    badgeName: 'Peninsular Pioneer',
    badgeIcon: '🌴',
    stages: [
      {
        id: 'stg-3-1',
        miniGameType: 'landmark-detective',
        targetStateId: 'karnataka',
        prompt: 'Detective clue: "I was the imperial capital of the Vijayanagara Empire along the Tungabhadra River, renowned for monolithic stone chariots and musical pillars." What UNESCO site am I?',
        options: [
          'Group of Monuments at Hampi',
          'Ajanta and Ellora Caves',
          'Shore Temple at Mahabalipuram',
          'Golconda Fort'
        ],
        correctAnswer: 'Group of Monuments at Hampi',
        hints: [
          'Located in Karnataka among striking rugged granite boulder hills.',
          'Depicted on the reverse side of the Indian ₹50 banknote.',
          'Founded in 1336 by brothers Harihara I and Bukka Raya I.'
        ],
        explanation: 'Hampi in central Karnataka was a magnificent metropolis in the 14th–16th centuries, celebrated for the Vittala Temple Stone Chariot.'
      },
      {
        id: 'stg-3-2',
        miniGameType: 'river-tracker',
        targetStateId: 'tamil-nadu',
        prompt: 'Which peninsular river, often called "Dakshin Ganga" of the deep south, originates at Talakaveri in Karnataka and creates the fertile Thanjavur delta in Tamil Nadu?',
        options: ['Kaveri', 'Vaigai', 'Periyar', 'Tungabhadra'],
        correctAnswer: 'Kaveri',
        hints: [
          'Famous for Shivanasamudra Falls and Srirangapatna island.',
          'The historic Kallanai (Grand Anicut) dam was built on it by the Chola King Karikalan.',
          'It flows into the Bay of Bengal at Poompuhar.'
        ],
        explanation: 'The Kaveri river is the agricultural lifeline of Tamil Nadu and Karnataka, supporting the fertile rice basin of Thanjavur.'
      },
      {
        id: 'stg-3-3',
        miniGameType: 'wildlife-explorer',
        targetStateId: 'kerala',
        prompt: 'The Nilgiri Tahr, a mountain ungulate adapted to steep grassy precipices, is the state animal of Tamil Nadu. In which high-altitude National Park in Kerala’s Munnar hills does its largest wild population live?',
        options: [
          'Eravikulam National Park',
          'Periyar National Park',
          'Silent Valley National Park',
          'Bandipur Tiger Reserve'
        ],
        correctAnswer: 'Eravikulam National Park',
        hints: [
          'Located near Anamudi (2,695 m), the highest peak in South India.',
          'Famous for the Neelakurinji flower that blooms once every 12 years.',
          'The plateau is a unique mix of rolling grasslands and Shola dwarf cloud-forests.'
        ],
        explanation: 'Eravikulam National Park safeguards over 700 Nilgiri Tahrs along the Anamudi crest in the Western Ghats of Kerala.'
      },
      {
        id: 'stg-3-4',
        miniGameType: 'regional-discovery',
        targetStateId: 'andhra-pradesh',
        prompt: 'Which famous classical dance style originated in the Krishna district of Andhra Pradesh, characterized by quick footwork, dramatic expressions, and dancing on the rim of a brass plate (Tarangam)?',
        options: ['Kuchipudi', 'Kathakali', 'Bharatanatyam', 'Mohiniyattam'],
        correctAnswer: 'Kuchipudi',
        hints: [
          'Named after the village of Kuchelapuram in Andhra Pradesh.',
          'Developed by the 17th-century Vaishnava poet Siddhendra Yogi.',
          'Performers balance an earthen pot of water on their head while executing intricate rhythm.'
        ],
        explanation: 'Kuchipudi is one of the eight major classical dance forms of India, blending music, dialogue, and agile dance movements.'
      }
    ]
  },

  // --------------------------------------------------------------------------
  // EXPEDITION 4: THE SEVEN SISTERS & BRAHMAPUTRA: NORTHEAST FRONTIER
  // --------------------------------------------------------------------------
  {
    id: 'exp-northeast-frontier',
    title: 'The Seven Sisters & Brahmaputra: Northeast Wonders',
    subtitle: 'From the Living Root Bridges of Meghalaya to the Monasteries of Tawang & Tea Hills of Assam',
    gradeBand: 'Classes 8–10',
    zone: 'Northeast',
    unlockedByDefault: false,
    description: 'Explore the wettest place on Earth, living bridges woven from rubber fig trees, floating national parks, and vibrant indigenous traditions.',
    targetStateIds: ['assam', 'meghalaya', 'arunachal-pradesh', 'nagaland', 'manipur', 'mizoram', 'tripura', 'sikkim'],
    rewardXP: 220,
    badgeId: 'badge-northeast-ranger',
    badgeName: 'Northeast Ranger',
    badgeIcon: '🦏',
    stages: [
      {
        id: 'stg-4-1',
        miniGameType: 'state-explorer',
        targetStateId: 'meghalaya',
        prompt: 'Which Northeastern state, whose name translates from Sanskrit as "Abode of Clouds", contains Mawsynram and Cherrapunji — the wettest inhabited places on Earth?',
        options: ['Meghalaya', 'Assam', 'Arunachal Pradesh', 'Mizoram'],
        correctAnswer: 'Meghalaya',
        hints: [
          'Its capital is Shillong, known as the "Scotland of the East".',
          'It sits on an elevated plateau between the Garo, Khasi, and Jaintia Hills.',
          'The funnel effect of the hills forces Bay of Bengal monsoon clouds to release extreme rainfall.'
        ],
        explanation: 'Meghalaya receives an average of over 11,800 mm of annual rainfall in Mawsynram due to orographic uplift of southwest monsoon winds.'
      },
      {
        id: 'stg-4-2',
        miniGameType: 'river-tracker',
        targetStateId: 'assam',
        prompt: 'Majuli, the world’s largest inhabited river island and center of Neo-Vaishnavite Satra culture, is formed by the split and reunification of which great river in Assam?',
        options: ['Brahmaputra', 'Barak', 'Teesta', 'Subansiri'],
        correctAnswer: 'Brahmaputra',
        hints: [
          'In Tibet, this river is known as the Yarlung Tsangpo.',
          'It is joined by the Kherkutia Xuti channel to form Majuli.',
          'It flows into Bangladesh where it is known as the Jamuna.'
        ],
        explanation: 'Majuli is situated in the Brahmaputra River in Assam. It is recognized as a district and the epicenter of Srimanta Sankardeva’s Satra movement.'
      },
      {
        id: 'stg-4-3',
        miniGameType: 'wildlife-explorer',
        targetStateId: 'manipur',
        prompt: 'Keibul Lamjao National Park on Loktak Lake in Manipur is the world’s only floating national park. What critically endangered "Dancing Deer" thrives on its floating phumdis?',
        options: ['Sangai (Eld’s Deer)', 'Hangul (Kashmir Stag)', 'Barasingha (Swamp Deer)', 'Barking Deer'],
        correctAnswer: 'Sangai (Eld’s Deer)',
        hints: [
          'It appears to dance gracefully as it walks across bouncy floating biomass mats (phumdis).',
          'It is the state animal of Manipur and featured in the annual Sangai Festival.',
          'Loktak Lake is the largest freshwater lake in Northeast India.'
        ],
        explanation: 'The Sangai or brow-antlered deer has specialized hooves adapted for walking over buoyant, spongy organic mats called phumdis on Loktak Lake.'
      },
      {
        id: 'stg-4-4',
        miniGameType: 'regional-discovery',
        targetStateId: 'arunachal-pradesh',
        prompt: 'Why is Arunachal Pradesh celebrated across India as the "Land of the Dawn-Lit Mountains"?',
        options: [
          'It receives the first rays of sunrise in India at Dong village in Anjaw district',
          'It has the highest temperature during early mornings',
          'It was founded on the winter solstice day',
          'It is located on the equator'
        ],
        correctAnswer: 'It receives the first rays of sunrise in India at Dong village in Anjaw district',
        hints: [
          'Dong Valley lies at roughly 97° East longitude, the easternmost boundary of India.',
          'Sunrise occurs around 4:30 AM in summer, about two hours before western Gujarat.',
          'India spans roughly 30° of longitudinal difference from east to west.'
        ],
        explanation: 'Dong village in Arunachal Pradesh is India’s easternmost inhabited outpost, witnessing the earliest sunrise in the country.'
      }
    ]
  },

  // --------------------------------------------------------------------------
  // EXPEDITION 5: HEART OF BHARAT & SACRED FORESTS: CENTRAL & EAST
  // --------------------------------------------------------------------------
  {
    id: 'exp-central-heartland',
    title: 'Heart of Bharat & Sacred Forests: Central & East',
    subtitle: 'From the Tiger Sanctuaries of Madhya Pradesh to the Sun Temple of Konark & Delta Mangroves',
    gradeBand: 'Classes 9–10',
    zone: 'Central',
    unlockedByDefault: false,
    description: 'Explore ancient Ashokan edicts, dense sal and teak forests, tribal traditions, and coastal architectural wonders.',
    targetStateIds: ['madhya-pradesh', 'chhattisgarh', 'odisha', 'jharkhand', 'bihar', 'west-bengal'],
    rewardXP: 250,
    badgeId: 'badge-heartland-master',
    badgeName: 'Heartland Master',
    badgeIcon: '🐅',
    stages: [
      {
        id: 'stg-5-1',
        miniGameType: 'landmark-detective',
        targetStateId: 'madhya-pradesh',
        prompt: 'Detective clue: "I am a hemispherical stone dome commissioned by Emperor Ashoka in the 3rd century BCE, enshrining sacred relics of the Buddha with four ornate gateways (Toranas)." Where am I?',
        options: [
          'The Great Stupa at Sanchi, Madhya Pradesh',
          'Dhamek Stupa at Sarnath, Uttar Pradesh',
          'Ajanta Caves, Maharashtra',
          'Mahabodhi Temple at Bodh Gaya, Bihar'
        ],
        correctAnswer: 'The Great Stupa at Sanchi, Madhya Pradesh',
        hints: [
          'Situated near Vidisha and Bhopal in Madhya Pradesh.',
          'Featured prominently on the reverse of the ₹200 currency note.',
          'The carved toranas portray Jataka tales and scenes from the Buddha’s life.'
        ],
        explanation: 'Sanchi Stupa is one of India’s oldest surviving stone structures and a UNESCO World Heritage site exemplifying Mauryan Buddhist art.'
      },
      {
        id: 'stg-5-2',
        miniGameType: 'state-explorer',
        targetStateId: 'chhattisgarh',
        prompt: 'Which mineral-rich central Indian state, carved out of Madhya Pradesh in November 2000, is known as the "Rice Bowl of Central India" and home to the Chitrakote Falls on the Indravati river?',
        options: ['Chhattisgarh', 'Jharkhand', 'Odisha', 'Telangana'],
        correctAnswer: 'Chhattisgarh',
        hints: [
          'Its capital is Raipur and it produces a major portion of India’s steel in Bhilai.',
          'Chitrakote Falls is often called the "Niagara of India".',
          'Bastar region in this state is world-famous for bell metal Dhokra craft.'
        ],
        explanation: 'Chhattisgarh features rich mineral reserves (coal, iron ore, bauxite) and dense sal forests inhabited by diverse tribal communities.'
      },
      {
        id: 'stg-5-3',
        miniGameType: 'wildlife-explorer',
        targetStateId: 'odisha',
        prompt: 'Gahirmatha Marine Sanctuary and the Rushikulya rookery on the Odisha coast host the world’s largest mass nesting ("Arribada") of which marine reptile?',
        options: [
          'Olive Ridley Sea Turtle',
          'Leatherback Turtle',
          'Hawksbill Turtle',
          'Green Sea Turtle'
        ],
        correctAnswer: 'Olive Ridley Sea Turtle',
        hints: [
          'Hundreds of thousands of female turtles swim across the Indian Ocean to lay eggs on the same beach where they were born.',
          'The Spanish term "Arribada" means arrival.',
          'Chilika Lake, Asia’s largest brackish lagoon, lies nearby.'
        ],
        explanation: 'Odisha’s beaches witness the synchronous mass nesting of over 500,000 Olive Ridley turtles every winter.'
      },
      {
        id: 'stg-5-4',
        miniGameType: 'regional-discovery',
        targetStateId: 'west-bengal',
        prompt: 'The Sundarbans, shared between West Bengal and Bangladesh, is the world’s largest mangrove forest. Which salt-tolerant tree with aerial breathing roots (pneumatophores) gave this forest its name?',
        options: ['Sundari tree (Heritiera fomes)', 'Teak (Tectona grandis)', 'Sal (Shorea robusta)', 'Deodar (Cedrus deodara)'],
        correctAnswer: 'Sundari tree (Heritiera fomes)',
        hints: [
          'Pneumatophores grow upward out of the muddy, oxygen-poor tidal water to breathe air.',
          'The ecosystem supports the world’s only swimming Royal Bengal Tigers.',
          'It acts as a natural coastal buffer against Bay of Bengal cyclones.'
        ],
        explanation: 'The Sundari mangrove tree gives the Sundarbans its name and provides critical timber, shoreline stabilization, and biodiversity habitat.'
      }
    ]
  },

  // --------------------------------------------------------------------------
  // EXPEDITION 6: LIFELINES OF INDIA: THE GREAT RIVER SYSTEMS
  // --------------------------------------------------------------------------
  {
    id: 'exp-river-lifelines',
    title: 'Lifelines of India: The Great River Systems',
    subtitle: 'From the Glacial Origins of the North to Peninsular Deltas and Watershed Divides',
    gradeBand: 'Classes 9–10',
    zone: 'Pan-India',
    unlockedByDefault: false,
    description: 'Master the drainage systems of India, drainage basins, Himalayan perennial vs peninsular seasonal rivers, and major river valley projects.',
    targetStateIds: ['uttarakhand', 'uttar-pradesh', 'bihar', 'maharashtra', 'andhra-pradesh'],
    rewardXP: 300,
    badgeId: 'badge-hydro-master',
    badgeName: 'Hydro Geographer',
    badgeIcon: '🌊',
    stages: [
      {
        id: 'stg-6-1',
        miniGameType: 'route-planner',
        targetStateId: 'uttar-pradesh',
        prompt: 'At Prayagraj (formerly Allahabad), the holy Triveni Sangam marks the confluence of the Ganga and its largest right-bank tributary. Which river is this?',
        options: ['Yamuna', 'Son', 'Gomti', 'Gandak'],
        correctAnswer: 'Yamuna',
        hints: [
          'It originates from the Yamunotri Glacier in the Bandarpunch range of Uttarakhand.',
          'It flows through Delhi, Mathura, and Agra past the Taj Mahal before joining the Ganga.',
          'Its tributaries include the Chambal, Betwa, and Ken.'
        ],
        explanation: 'The Yamuna is the longest tributary river in India (1,376 km) and meets the Ganga at Prayagraj’s celebrated Triveni Sangam.'
      },
      {
        id: 'stg-6-2',
        miniGameType: 'river-tracker',
        targetStateId: 'maharashtra',
        prompt: 'What physical geographic feature acts as the main water divide separating the west-flowing Arabian Sea streams from the east-flowing Bay of Bengal rivers across the Indian peninsula?',
        options: [
          'The Western Ghats (Sahyadri)',
          'The Aravalli Range',
          'The Eastern Ghats',
          'The Rajmahal Hills'
        ],
        correctAnswer: 'The Western Ghats (Sahyadri)',
        hints: [
          'It runs parallel to the western coast from Gujarat through Maharashtra, Goa, Karnataka, and Kerala.',
          'Rivers flowing west are short and swift, while rivers flowing east travel hundreds of kilometers across the plateau.',
          'It receives heavy orographic rainfall on its western windward slope.'
        ],
        explanation: 'The Western Ghats form an unbroken water divide; rivers originating on its eastern slopes (Godavari, Krishna, Kaveri) cross the entire subcontinent to enter the Bay of Bengal.'
      },
      {
        id: 'stg-6-3',
        miniGameType: 'expedition-challenge',
        targetStateId: 'odisha',
        prompt: 'Which multipurpose river valley project, built across the Mahanadi River in Sambalpur, Odisha, is one of the world’s longest earthen dams, spanning nearly 26 km?',
        options: ['Hirakud Dam', 'Bhakra Nangal Dam', 'Sardar Sarovar Dam', 'Nagarjuna Sagar Dam'],
        correctAnswer: 'Hirakud Dam',
        hints: [
          'Inaugurated in 1957 by Prime Minister Jawaharlal Nehru.',
          'Built to tame the devastating seasonal floods of the Mahanadi delta.',
          'Creates a massive artificial lake that provides irrigation for over 2.3 lakh hectares.'
        ],
        explanation: 'Hirakud Dam across the Mahanadi controls floodwaters, generates hydroelectricity, and supports extensive paddy farming in Odisha.'
      }
    ]
  },

  // --------------------------------------------------------------------------
  // EXPEDITION 7: CORAL REEFS & MARITIME FRONTIERS: ISLANDS OF BHARAT
  // --------------------------------------------------------------------------
  {
    id: 'exp-islands-maritime',
    title: 'Coral Reefs & Island Frontiers: India’s Maritime Marvels',
    subtitle: 'From the Volcanic Calderas of Andaman to Lakshadweep’s Atolls and the Palk Strait',
    gradeBand: 'Classes 11–12',
    zone: 'Islands',
    unlockedByDefault: false,
    description: 'Explore the 10 Degree Channel, India’s only active volcano on Barren Island, coral atolls, and the southern tip at Indira Point.',
    targetStateIds: ['andaman-nicobar', 'lakshadweep', 'tamil-nadu'],
    rewardXP: 350,
    badgeId: 'badge-oceanic-navigator',
    badgeName: 'Oceanic Navigator',
    badgeIcon: '🧭',
    stages: [
      {
        id: 'stg-7-1',
        miniGameType: 'state-explorer',
        targetStateId: 'andaman-nicobar',
        prompt: 'Which famous water passage at 10° North latitude separates the Andaman Islands from the Nicobar Islands in the Bay of Bengal?',
        options: ['Ten Degree Channel', 'Nine Degree Channel', 'Duncan Passage', 'Palk Strait'],
        correctAnswer: 'Ten Degree Channel',
        hints: [
          'It is approximately 150 km wide and about 7,300 meters deep.',
          'Little Andaman lies to its north and Car Nicobar lies to its south.',
          'Ships navigating the Malacca Strait route frequently transit near this corridor.'
        ],
        explanation: 'The Ten Degree Channel separates the Andaman archipelago from the Nicobar chain along the 10°N latitude parallel.'
      },
      {
        id: 'stg-7-2',
        miniGameType: 'landmark-detective',
        targetStateId: 'andaman-nicobar',
        prompt: 'Detective clue: "I am an uninhabited island in the Andaman Sea that contains the ONLY active volcano in the entire South Asian region." What am I?',
        options: ['Barren Island', 'Narcondam Island', 'Havelock (Swaraj Dweep)', 'Neil (Shaheed Dweep)'],
        correctAnswer: 'Barren Island',
        hints: [
          'Part of the Indian Union Territory of Andaman and Nicobar Islands.',
          'Its first recorded eruption dates back to 1787; it had recent volcanic ash plumes in 2017–2020.',
          'It lies about 138 km northeast of the capital Port Blair.'
        ],
        explanation: 'Barren Island is a submarine volcanic caldera located along the boundary of the Indian and Burmese tectonic plates.'
      },
      {
        id: 'stg-7-3',
        miniGameType: 'state-explorer',
        targetStateId: 'lakshadweep',
        prompt: 'Lakshadweep in the Arabian Sea is India’s smallest Union Territory. Unlike the volcanic Andaman Islands, what biological process created Lakshadweep’s 36 islands and lagoons?',
        options: [
          'Coral polyp secretion forming atolls and fringing reefs',
          'Basaltic volcanic eruptions from continental rifts',
          'River silt deposition from the Western Ghats',
          'Tectonic collision and folding of oceanic crust'
        ],
        correctAnswer: 'Coral polyp secretion forming atolls and fringing reefs',
        hints: [
          'Atolls are ring-shaped coral reefs enclosing a shallow central lagoon.',
          'Built over millions of years by tiny limestone-secreting organisms.',
          'The capital is Kavaratti and coconut palms and tuna fishing dominate the economy.'
        ],
        explanation: 'Lakshadweep is an archipelago of 36 coral atolls built on the submerged Chagos-Laccadive submarine ridge.'
      },
      {
        id: 'stg-7-4',
        miniGameType: 'expedition-challenge',
        targetStateId: 'andaman-nicobar',
        prompt: 'What is the name of the southernmost geographic point of Indian sovereign territory, located on Great Nicobar Island at 6°45′N latitude?',
        options: ['Indira Point (Pygmalion Point)', 'Kanyakumari (Cape Comorin)', 'Kibithu', 'Guhar Moti'],
        correctAnswer: 'Indira Point (Pygmalion Point)',
        hints: [
          'It was submerged by several meters during the catastrophic 2004 Indian Ocean tsunami.',
          'It is closer to Sumatra (Indonesia) than to Chennai or Kolkata.',
          'Named in honor of former Indian Prime Minister Indira Gandhi in 1985.'
        ],
        explanation: 'Indira Point on Great Nicobar Island is India’s southernmost tip at 6°45′N (Kanyakumari is the southernmost point on the mainland at 8°4′N).'
      }
    ]
  }
];
