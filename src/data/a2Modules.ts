/**
 * Données des modules A2 - Les six cas russes
 * Ce fichier contient le contenu pédagogique pour les modules de niveau A2
 */
import type { QuizQuestion, FlashcardData, MatchingPair, FillBlankQuestion } from "@/components/exercises";

interface LessonContent {
    title: string;
    content: string[];
    vocabulary?: { word: string; transliteration: string; translation: string }[];
}

export interface ModuleData {
    title: string;
    description: string;
    lessons: LessonContent[];
    quiz?: QuizQuestion[];
    flashcards?: FlashcardData[];
    matching?: MatchingPair[];
    fillBlank?: FillBlankQuestion[];
}

export const a2Modules: Record<string, ModuleData> = {
    // ============================================================================
    // MODULE 2-1 : Cas accusatif
    // ============================================================================
    "2-1": {
        title: "Cas accusatif",
        description: "Maîtrisez le complément d'objet direct (COD) en russe",
        lessons: [
            {
                title: "Introduction à l'accusatif",
                content: [
                    "L'accusatif est le cas du complément d'objet direct (COD). Il répond aux questions Кого? (Qui ?) et Что? (Quoi ?).",
                    "Exemple : Я читаю книгу. (Je lis un livre.) - « книгу » est à l'accusatif.",
                    "L'accusatif est essentiel car il apparaît très fréquemment dans la vie quotidienne.",
                    "Bonne nouvelle : pour les noms masculins inanimés et neutres, l'accusatif est identique au nominatif !",
                ],
            },
            {
                title: "Accusatif des noms masculins",
                content: [
                    "Noms masculins INANIMÉS (objets) : accusatif = nominatif. Я вижу стол. (Je vois la table.)",
                    "Noms masculins ANIMÉS (personnes, animaux) : accusatif = génitif. Я вижу брата. (Je vois mon frère.)",
                    "Cette distinction animé/inanimé est cruciale en russe !",
                    "Terminaisons animés : consonne → +а, -ь → +я. Exemples : студент → студента, учитель → учителя",
                ],
                vocabulary: [
                    { word: "брата", transliteration: "brata", translation: "frère (acc.)" },
                    { word: "студента", transliteration: "studenta", translation: "étudiant (acc.)" },
                    { word: "друга", transliteration: "druga", translation: "ami (acc.)" },
                    { word: "врача", transliteration: "vracha", translation: "médecin (acc.)" },
                ],
            },
            {
                title: "Accusatif des noms féminins",
                content: [
                    "Noms en -а → -у : книга → книгу, сестра → сестру, мама → маму",
                    "Noms en -я → -ю : семья → семью, Россия → Россию",
                    "Noms en -ь → pas de changement : ночь → ночь, жизнь → жизнь",
                    "L'accusatif féminin est le même pour les animés et inanimés !",
                ],
                vocabulary: [
                    { word: "книгу", transliteration: "knigu", translation: "livre (acc.)" },
                    { word: "сестру", transliteration: "sestru", translation: "sœur (acc.)" },
                    { word: "воду", transliteration: "vodu", translation: "eau (acc.)" },
                    { word: "музыку", transliteration: "muzyku", translation: "musique (acc.)" },
                ],
            },
            {
                title: "Accusatif des noms neutres",
                content: [
                    "Les noms neutres ne changent PAS à l'accusatif : окно → окно, море → море.",
                    "C'est une simplification bienvenue ! Les neutres sont toujours inanimés (sauf exceptions rares).",
                    "Exemples : Я вижу окно. (Je vois la fenêtre.) Я люблю море. (J'aime la mer.)",
                ],
                vocabulary: [
                    { word: "окно", transliteration: "okno", translation: "fenêtre (acc.)" },
                    { word: "море", transliteration: "more", translation: "mer (acc.)" },
                    { word: "письмо", transliteration: "pis'mo", translation: "lettre (acc.)" },
                ],
            },
            {
                title: "Verbes + accusatif",
                content: [
                    "De nombreux verbes transitifs exigent l'accusatif :",
                    "видеть (voir) : Я вижу машину. любить (aimer) : Она любит музыку.",
                    "читать (lire) : Он читает газету. знать (connaître) : Ты знаешь этого человека?",
                    "смотреть (regarder) : Мы смотрим фильм. слушать (écouter) : Я слушаю радио.",
                ],
                vocabulary: [
                    { word: "машину", transliteration: "mashinu", translation: "voiture (acc.)" },
                    { word: "газету", transliteration: "gazetu", translation: "journal (acc.)" },
                    { word: "фильм", transliteration: "fil'm", translation: "film (acc.)" },
                    { word: "радио", transliteration: "radio", translation: "radio (acc.)" },
                ],
            },
            {
                title: "Prépositions + accusatif",
                content: [
                    "Certaines prépositions régissent l'accusatif :",
                    "в + accusatif = mouvement vers (dans) : Я иду в школу. (Je vais à l'école.)",
                    "на + accusatif = mouvement vers (sur) : Он едет на работу. (Il va au travail.)",
                    "через + accusatif = à travers : Мы идём через парк. (Nous traversons le parc.)",
                    "за + accusatif = pour, derrière (mouvement) : Спасибо за помощь! (Merci pour l'aide !)",
                ],
                vocabulary: [
                    { word: "в школу", transliteration: "v shkolu", translation: "à l'école (mouvement)" },
                    { word: "на работу", transliteration: "na rabotu", translation: "au travail (mouvement)" },
                    { word: "через парк", transliteration: "cherez park", translation: "à travers le parc" },
                ],
            },
        ],
        quiz: [
            {
                question: "Quel est l'accusatif de « книга » ?",
                options: ["книга", "книгу", "книги"],
                correctIndex: 1,
                explanation: "Les noms féminins en -а prennent -у à l'accusatif : книга → книгу.",
            },
            {
                question: "« Я вижу ___. » (Je vois mon frère) - Quel est l'accusatif de « брат » ?",
                options: ["брат", "брата", "брату"],
                correctIndex: 1,
                explanation: "« Брат » est masculin animé, donc accusatif = génitif : брата.",
            },
            {
                question: "Quel est l'accusatif de « окно » ?",
                options: ["окно", "окна", "окну"],
                correctIndex: 0,
                explanation: "Les noms neutres ne changent pas à l'accusatif : окно.",
            },
            {
                question: "« Я иду в ___. » (Je vais à l'école) - Comment dit-on « école » à l'accusatif ?",
                options: ["школа", "школу", "школе"],
                correctIndex: 1,
                explanation: "Avec в + mouvement, on utilise l'accusatif : школа → школу.",
            },
        ],
        flashcards: [
            { front: "книгу", back: "livre (accusatif)", transliteration: "knigu" },
            { front: "брата", back: "frère (accusatif)", transliteration: "brata" },
            { front: "сестру", back: "sœur (accusatif)", transliteration: "sestru" },
            { front: "воду", back: "eau (accusatif)", transliteration: "vodu" },
            { front: "музыку", back: "musique (accusatif)", transliteration: "muzyku" },
            { front: "в школу", back: "à l'école", transliteration: "v shkolu" },
            { front: "на работу", back: "au travail", transliteration: "na rabotu" },
        ],
        fillBlank: [
            {
                sentence: "Я читаю ___ (книга).",
                answer: "книгу",
                hint: "Accusatif féminin en -а → -у",
            },
            {
                sentence: "Она любит ___. (музыка)",
                answer: "музыку",
                hint: "COD féminin : -а → -у",
            },
            {
                sentence: "Я вижу ___ (брат).",
                answer: "брата",
                hint: "Masculin animé : accusatif = génitif",
            },
        ],
        matching: [
            { left: "книгу", right: "livre (acc.)" },
            { left: "брата", right: "frère (acc.)" },
            { left: "сестру", right: "sœur (acc.)" },
            { left: "воду", right: "eau (acc.)" },
            { left: "в школу", right: "à l'école" },
            { left: "на работу", right: "au travail" },
        ],
    },

    // ============================================================================
    // MODULE 2-2 : Cas génitif
    // ============================================================================
    "2-2": {
        title: "Cas génitif",
        description: "Exprimez la possession, l'absence et les quantités",
        lessons: [
            {
                title: "Introduction au génitif",
                content: [
                    "Le génitif est le cas de la possession, de l'origine et de l'absence. Il répond à Кого? Чего? (De qui ? De quoi ?).",
                    "C'est le cas le plus utilisé en russe après le nominatif et l'accusatif !",
                    "Exemples : книга брата (le livre du frère), стакан воды (un verre d'eau).",
                    "Le génitif est aussi utilisé après les nombres 2-4 (génitif singulier) et 5+ (génitif pluriel).",
                ],
            },
            {
                title: "Génitif des noms masculins",
                content: [
                    "Consonnes → +а : стол → стола, дом → дома, брат → брата",
                    "-й → +я : музей → музея, трамвай → трамвая",
                    "-ь → +я : день → дня, учитель → учителя",
                    "Exemples : Это дом брата. (C'est la maison du frère.) У меня нет брата. (Je n'ai pas de frère.)",
                ],
                vocabulary: [
                    { word: "брата", transliteration: "brata", translation: "du frère (gén.)" },
                    { word: "дома", transliteration: "doma", translation: "de la maison (gén.)" },
                    { word: "города", transliteration: "goroda", translation: "de la ville (gén.)" },
                    { word: "учителя", transliteration: "uchitelya", translation: "du professeur (gén.)" },
                ],
            },
            {
                title: "Génitif des noms féminins",
                content: [
                    "-а → -ы : книга → книги, сестра → сестры, вода → воды",
                    "-я → -и : семья → семьи, Россия → России",
                    "-ь → -и : ночь → ночи, жизнь → жизни",
                    "Attention aux règles orthographiques : après г, к, х, ж, ч, ш, щ → -и (pas -ы)",
                ],
                vocabulary: [
                    { word: "книги", transliteration: "knigi", translation: "du livre (gén.)" },
                    { word: "воды", transliteration: "vody", translation: "de l'eau (gén.)" },
                    { word: "сестры", transliteration: "sestry", translation: "de la sœur (gén.)" },
                    { word: "России", transliteration: "Rossii", translation: "de la Russie (gén.)" },
                ],
            },
            {
                title: "Génitif des noms neutres",
                content: [
                    "-о → -а : окно → окна, письмо → письма, молоко → молока",
                    "-е → -я : море → моря, здание → здания",
                    "Exemples : стакан молока (un verre de lait), берег моря (le rivage de la mer).",
                ],
                vocabulary: [
                    { word: "окна", transliteration: "okna", translation: "de la fenêtre (gén.)" },
                    { word: "молока", transliteration: "moloka", translation: "du lait (gén.)" },
                    { word: "моря", transliteration: "morya", translation: "de la mer (gén.)" },
                ],
            },
            {
                title: "Absence : нет + génitif",
                content: [
                    "Pour exprimer l'absence, on utilise нет + génitif : У меня нет машины. (Je n'ai pas de voiture.)",
                    "Здесь нет воды. (Il n'y a pas d'eau ici.) В комнате нет окна. (Il n'y a pas de fenêtre dans la chambre.)",
                    "Le génitif sert aussi pour la négation existentielle au passé et au futur :",
                    "Не было (il n'y avait pas) : Вчера не было дождя. Не будет (il n'y aura pas) : Завтра не будет солнца.",
                ],
                vocabulary: [
                    { word: "нет", transliteration: "net", translation: "il n'y a pas" },
                    { word: "не было", transliteration: "ne bylo", translation: "il n'y avait pas" },
                    { word: "не будет", transliteration: "ne budet", translation: "il n'y aura pas" },
                ],
            },
            {
                title: "Prépositions + génitif",
                content: [
                    "Nombreuses prépositions régissent le génitif :",
                    "из (de, hors de) : Он из России. (Il est de Russie.)",
                    "от (de la part de, depuis) : письмо от мамы (une lettre de maman)",
                    "до (jusqu'à) : от дома до школы (de la maison à l'école)",
                    "без (sans) : кофе без сахара (café sans sucre)",
                    "для (pour) : подарок для сестры (un cadeau pour la sœur)",
                ],
                vocabulary: [
                    { word: "из России", transliteration: "iz Rossii", translation: "de Russie" },
                    { word: "от мамы", transliteration: "ot mamy", translation: "de maman" },
                    { word: "без сахара", transliteration: "bez sakhara", translation: "sans sucre" },
                    { word: "для сестры", transliteration: "dlya sestry", translation: "pour la sœur" },
                ],
            },
            {
                title: "Quantités et génitif",
                content: [
                    "Après les nombres, le cas du nom dépend du chiffre :",
                    "1 → nominatif singulier : один стол, одна книга",
                    "2, 3, 4 → génitif singulier : два стола, три книги, четыре окна",
                    "5-20 → génitif pluriel : пять столов, шесть книг, десять окон",
                    "много (beaucoup), мало (peu), сколько (combien) → génitif pluriel",
                ],
            },
        ],
        quiz: [
            {
                question: "Comment dit-on « de la maison » (génitif de « дом ») ?",
                options: ["дом", "дома", "дому"],
                correctIndex: 1,
                explanation: "Masculin en consonne : +а au génitif → дома.",
            },
            {
                question: "« У меня нет ___. » (Je n'ai pas de sœur) - Génitif de « сестра » ?",
                options: ["сестра", "сестру", "сестры"],
                correctIndex: 2,
                explanation: "Féminin en -а → -ы au génitif : сестры.",
            },
            {
                question: "Comment dit-on « de l'eau » ?",
                options: ["вода", "воду", "воды"],
                correctIndex: 2,
                explanation: "Féminin en -а → -ы au génitif : воды.",
            },
            {
                question: "Après « два » (deux), quel cas utilise-t-on ?",
                options: ["Nominatif", "Accusatif", "Génitif singulier"],
                correctIndex: 2,
                explanation: "Après 2, 3, 4, on utilise le génitif singulier : два стола.",
            },
        ],
        flashcards: [
            { front: "брата", back: "du frère (gén.)", transliteration: "brata" },
            { front: "сестры", back: "de la sœur (gén.)", transliteration: "sestry" },
            { front: "воды", back: "de l'eau (gén.)", transliteration: "vody" },
            { front: "молока", back: "du lait (gén.)", transliteration: "moloka" },
            { front: "без сахара", back: "sans sucre", transliteration: "bez sakhara" },
            { front: "из России", back: "de Russie", transliteration: "iz Rossii" },
            { front: "нет", back: "il n'y a pas", transliteration: "net" },
        ],
        fillBlank: [
            {
                sentence: "У меня нет ___ (машина).",
                answer: "машины",
                hint: "Génitif féminin : -а → -ы",
            },
            {
                sentence: "Кофе без ___ (сахар).",
                answer: "сахара",
                hint: "Génitif masculin : consonne + а",
            },
            {
                sentence: "Это книга ___ (брат).",
                answer: "брата",
                hint: "Possession = génitif",
            },
        ],
        matching: [
            { left: "брата", right: "du frère" },
            { left: "сестры", right: "de la sœur" },
            { left: "воды", right: "de l'eau" },
            { left: "без сахара", right: "sans sucre" },
            { left: "из России", right: "de Russie" },
            { left: "для мамы", right: "pour maman" },
        ],
    },

    // ============================================================================
    // MODULE 2-3 : Cas datif
    // ============================================================================
    "2-3": {
        title: "Cas datif",
        description: "Exprimez le destinataire, les sentiments et les âges",
        lessons: [
            {
                title: "Introduction au datif",
                content: [
                    "Le datif est le cas du destinataire, du bénéficiaire. Il répond à Кому? Чему? (À qui ? À quoi ?).",
                    "Exemple : Я даю книгу брату. (Je donne le livre à mon frère.) « брату » est au datif.",
                    "Le datif exprime aussi le ressenti, l'âge et certaines constructions impersonnelles.",
                ],
            },
            {
                title: "Datif des noms masculins",
                content: [
                    "Consonnes → +у : брат → брату, студент → студенту, друг → другу",
                    "-й → +ю : музей → музею, трамвай → трамваю",
                    "-ь → +ю : учитель → учителю, день → дню",
                    "Exemples : Я звоню другу. (J'appelle mon ami.) Он помогает студенту. (Il aide l'étudiant.)",
                ],
                vocabulary: [
                    { word: "брату", transliteration: "bratu", translation: "au frère (dat.)" },
                    { word: "другу", transliteration: "drugu", translation: "à l'ami (dat.)" },
                    { word: "студенту", transliteration: "studentu", translation: "à l'étudiant (dat.)" },
                    { word: "учителю", transliteration: "uchitelyu", translation: "au professeur (dat.)" },
                ],
            },
            {
                title: "Datif des noms féminins",
                content: [
                    "-а → -е : сестра → сестре, мама → маме, школа → школе",
                    "-я → -е : семья → семье, Россия → России (attention !)",
                    "-ь → -и : ночь → ночи, мать → матери (irrégulier)",
                    "Exemples : Я пишу сестре. (J'écris à ma sœur.) Он звонит маме. (Il appelle sa mère.)",
                ],
                vocabulary: [
                    { word: "сестре", transliteration: "sestre", translation: "à la sœur (dat.)" },
                    { word: "маме", transliteration: "mame", translation: "à maman (dat.)" },
                    { word: "подруге", transliteration: "podruge", translation: "à l'amie (dat.)" },
                    { word: "жене", transliteration: "zhene", translation: "à la femme/épouse (dat.)" },
                ],
            },
            {
                title: "Datif des noms neutres",
                content: [
                    "-о → -у : окно → окну, письмо → письму",
                    "-е → -ю : море → морю, здание → зданию",
                    "Le datif neutre est relativement rare car les neutres sont souvent inanimés.",
                ],
            },
            {
                title: "Verbes + datif",
                content: [
                    "Plusieurs verbes importants régissent le datif :",
                    "давать/дать (donner) : Я даю книгу брату.",
                    "помогать/помочь (aider) : Она помогает маме.",
                    "звонить/позвонить (téléphoner) : Я звоню другу.",
                    "говорить/сказать (dire) : Он говорит студентам.",
                    "нравиться/понравиться (plaire) : Мне нравится музыка. (J'aime la musique.)",
                ],
                vocabulary: [
                    { word: "давать", transliteration: "davat'", translation: "donner" },
                    { word: "помогать", transliteration: "pomogat'", translation: "aider" },
                    { word: "звонить", transliteration: "zvonit'", translation: "téléphoner" },
                    { word: "нравиться", transliteration: "nravit'sya", translation: "plaire" },
                ],
            },
            {
                title: "Constructions impersonnelles",
                content: [
                    "Le datif s'utilise dans de nombreuses constructions impersonnelles :",
                    "Мне холодно. (J'ai froid.) - littéralement « À moi il fait froid »",
                    "Ему скучно. (Il s'ennuie.) Ей интересно. (C'est intéressant pour elle.)",
                    "Нам нужно работать. (Nous devons travailler.) - « нужно » + datif",
                    "Мне 20 лет. (J'ai 20 ans.) - l'âge s'exprime au datif !",
                ],
                vocabulary: [
                    { word: "мне", transliteration: "mne", translation: "à moi (dat.)" },
                    { word: "тебе", transliteration: "tebe", translation: "à toi (dat.)" },
                    { word: "ему", transliteration: "yemu", translation: "à lui (dat.)" },
                    { word: "ей", transliteration: "yey", translation: "à elle (dat.)" },
                    { word: "нам", transliteration: "nam", translation: "à nous (dat.)" },
                ],
            },
        ],
        quiz: [
            {
                question: "Comment dit-on « à mon frère » (datif de « брат ») ?",
                options: ["брат", "брата", "брату"],
                correctIndex: 2,
                explanation: "Masculin en consonne : +у au datif → брату.",
            },
            {
                question: "« Я звоню ___. » (J'appelle ma mère) - Datif de « мама » ?",
                options: ["мама", "маму", "маме"],
                correctIndex: 2,
                explanation: "Féminin en -а → -е au datif : маме.",
            },
            {
                question: "Comment dit-on « J'ai 25 ans » ?",
                options: ["Я 25 лет", "Мне 25 лет", "Меня 25 лет"],
                correctIndex: 1,
                explanation: "L'âge s'exprime avec le datif : Мне (à moi) + nombre + лет.",
            },
            {
                question: "« ___ холодно. » (J'ai froid) - Quel pronom au datif ?",
                options: ["Я", "Меня", "Мне"],
                correctIndex: 2,
                explanation: "Les sensations s'expriment avec le datif : Мне холодно.",
            },
        ],
        flashcards: [
            { front: "брату", back: "au frère (dat.)", transliteration: "bratu" },
            { front: "сестре", back: "à la sœur (dat.)", transliteration: "sestre" },
            { front: "маме", back: "à maman (dat.)", transliteration: "mame" },
            { front: "мне", back: "à moi (dat.)", transliteration: "mne" },
            { front: "тебе", back: "à toi (dat.)", transliteration: "tebe" },
            { front: "нравиться", back: "plaire", transliteration: "nravit'sya" },
            { front: "помогать", back: "aider", transliteration: "pomogat'" },
        ],
        fillBlank: [
            {
                sentence: "Я даю книгу ___ (сестра).",
                answer: "сестре",
                hint: "Datif féminin : -а → -е",
            },
            {
                sentence: "___ холодно. (J'ai froid)",
                answer: "Мне",
                hint: "Pronom « je » au datif",
            },
            {
                sentence: "Он помогает ___ (друг).",
                answer: "другу",
                hint: "Datif masculin : consonne + у",
            },
        ],
        matching: [
            { left: "брату", right: "au frère" },
            { left: "сестре", right: "à la sœur" },
            { left: "мне", right: "à moi" },
            { left: "ему", right: "à lui" },
            { left: "помогать", right: "aider" },
            { left: "звонить", right: "téléphoner" },
        ],
    },

    // ============================================================================
    // MODULE 2-4 : Cas instrumental
    // ============================================================================
    "2-4": {
        title: "Cas instrumental",
        description: "Exprimez le moyen, l'accompagnement et les professions",
        lessons: [
            {
                title: "Introduction à l'instrumental",
                content: [
                    "L'instrumental est le cas du moyen et de l'accompagnement. Il répond à Кем? Чем? (Par qui ? Avec quoi ?).",
                    "Exemple : Я пишу ручкой. (J'écris avec un stylo.) « ручкой » est à l'instrumental.",
                    "L'instrumental s'utilise aussi avec « с » (avec) et pour les professions avec « быть ».",
                ],
            },
            {
                title: "Instrumental des noms masculins",
                content: [
                    "Consonnes → +ом : брат → братом, стол → столом, студент → студентом",
                    "-й → +ем : музей → музеем, трамвай → трамваем",
                    "-ь → +ем : учитель → учителем, день → днём",
                    "Attention : après ж, ч, ш, щ, ц → -ем (non accentué) ou -ём (accentué)",
                ],
                vocabulary: [
                    { word: "братом", transliteration: "bratom", translation: "avec le frère (instr.)" },
                    { word: "столом", transliteration: "stolom", translation: "avec la table (instr.)" },
                    { word: "врачом", transliteration: "vrachom", translation: "médecin (instr.)" },
                    { word: "учителем", transliteration: "uchitelem", translation: "professeur (instr.)" },
                ],
            },
            {
                title: "Instrumental des noms féminins",
                content: [
                    "-а → -ой/-ою : книга → книгой, сестра → сестрой, вода → водой",
                    "-я → -ей/-ею : семья → семьёй, Россия → Россией",
                    "-ь → -ью : ночь → ночью, мать → матерью",
                    "La forme longue en -ою/-ею est plus littéraire, -ой/-ей est plus courant.",
                ],
                vocabulary: [
                    { word: "сестрой", transliteration: "sestroy", translation: "avec la sœur (instr.)" },
                    { word: "ручкой", transliteration: "ruchkoy", translation: "avec le stylo (instr.)" },
                    { word: "водой", transliteration: "vodoy", translation: "avec l'eau (instr.)" },
                    { word: "ночью", transliteration: "noch'yu", translation: "la nuit (instr.)" },
                ],
            },
            {
                title: "Instrumental des noms neutres",
                content: [
                    "-о → -ом : окно → окном, письмо → письмом, молоко → молоком",
                    "-е → -ем : море → морем, здание → зданием",
                    "Les terminaisons sont similaires au masculin.",
                ],
                vocabulary: [
                    { word: "окном", transliteration: "oknom", translation: "avec la fenêtre (instr.)" },
                    { word: "морем", transliteration: "morem", translation: "par la mer (instr.)" },
                ],
            },
            {
                title: "Préposition « с » + instrumental",
                content: [
                    "La préposition « с » (avec) régit l'instrumental pour l'accompagnement :",
                    "Я иду с братом. (Je vais avec mon frère.) Она говорит с мамой. (Elle parle avec sa mère.)",
                    "Кофе с молоком. (Café au lait.) Хлеб с маслом. (Pain au beurre.)",
                    "« С » peut aussi signifier « depuis » avec certaines expressions temporelles.",
                ],
                vocabulary: [
                    { word: "с братом", transliteration: "s bratom", translation: "avec le frère" },
                    { word: "с сестрой", transliteration: "s sestroy", translation: "avec la sœur" },
                    { word: "с молоком", transliteration: "s molokom", translation: "avec du lait" },
                    { word: "с маслом", transliteration: "s maslom", translation: "avec du beurre" },
                ],
            },
            {
                title: "Professions et instrumental",
                content: [
                    "Avec le verbe быть (être) au passé/futur, la profession est à l'instrumental :",
                    "Он был врачом. (Il était médecin.) Она будет учительницей. (Elle sera professeure.)",
                    "Я хочу быть инженером. (Je veux être ingénieur.)",
                    "Au présent (verbe omis), on utilise le nominatif : Он врач. (Il est médecin.)",
                ],
                vocabulary: [
                    { word: "врачом", transliteration: "vrachom", translation: "médecin (instr.)" },
                    { word: "учителем", transliteration: "uchitelem", translation: "professeur (instr.)" },
                    { word: "инженером", transliteration: "inzhenerom", translation: "ingénieur (instr.)" },
                    { word: "студентом", transliteration: "studentom", translation: "étudiant (instr.)" },
                ],
            },
        ],
        quiz: [
            {
                question: "Comment dit-on « avec un stylo » (ручка) ?",
                options: ["ручка", "ручку", "ручкой"],
                correctIndex: 2,
                explanation: "Instrumental féminin : -а → -ой : ручкой.",
            },
            {
                question: "« Я иду с ___. » (Je vais avec mon frère) - Instrumental de « брат » ?",
                options: ["брат", "брата", "братом"],
                correctIndex: 2,
                explanation: "Instrumental masculin : consonne + ом → братом.",
            },
            {
                question: "« Он был ___. » (Il était médecin) - Comment mettre « врач » ?",
                options: ["врач", "врача", "врачом"],
                correctIndex: 2,
                explanation: "Avec быть au passé, la profession est à l'instrumental : врачом.",
            },
        ],
        flashcards: [
            { front: "братом", back: "avec le frère (instr.)", transliteration: "bratom" },
            { front: "сестрой", back: "avec la sœur (instr.)", transliteration: "sestroy" },
            { front: "ручкой", back: "avec le stylo", transliteration: "ruchkoy" },
            { front: "с молоком", back: "avec du lait", transliteration: "s molokom" },
            { front: "врачом", back: "médecin (instr.)", transliteration: "vrachom" },
            { front: "ночью", back: "la nuit", transliteration: "noch'yu" },
        ],
        fillBlank: [
            {
                sentence: "Я пишу ___ (ручка).",
                answer: "ручкой",
                hint: "Instrumental féminin : -а → -ой",
            },
            {
                sentence: "Кофе с ___ (молоко).",
                answer: "молоком",
                hint: "Instrumental neutre : -о → -ом",
            },
            {
                sentence: "Он был ___ (учитель).",
                answer: "учителем",
                hint: "Profession avec быть = instrumental",
            },
        ],
        matching: [
            { left: "братом", right: "avec le frère" },
            { left: "ручкой", right: "avec le stylo" },
            { left: "с молоком", right: "avec du lait" },
            { left: "врачом", right: "médecin (instr.)" },
            { left: "ночью", right: "la nuit" },
            { left: "с сестрой", right: "avec la sœur" },
        ],
    },

    // ============================================================================
    // MODULE 2-5 : Cas prépositionnel
    // ============================================================================
    "2-5": {
        title: "Cas prépositionnel",
        description: "Localisez et parlez de sujets avec le prépositionnel",
        lessons: [
            {
                title: "Introduction au prépositionnel",
                content: [
                    "Le prépositionnel est le seul cas qui s'utilise TOUJOURS avec une préposition. Il répond à О ком? О чём? (De qui ? De quoi ?) et Где? (Où ?).",
                    "C'est le cas le plus simple car il a des terminaisons très régulières !",
                    "Deux usages principaux : localisation (в/на + prép.) et sujet de conversation (о/об + prép.).",
                ],
            },
            {
                title: "Prépositionnel des noms masculins",
                content: [
                    "La plupart des masculins : +е : город → в городе, дом → в доме, стол → на столе",
                    "-й → +е : музей → в музее, трамвай → в трамвае",
                    "-ь → +е : учитель → об учителе, день → о дне",
                    "Exceptions : certains masculins prennent -у après в/на : в лесу (dans la forêt), на полу (sur le sol)",
                ],
                vocabulary: [
                    { word: "в городе", transliteration: "v gorode", translation: "dans la ville" },
                    { word: "в доме", transliteration: "v dome", translation: "dans la maison" },
                    { word: "на столе", transliteration: "na stole", translation: "sur la table" },
                    { word: "в лесу", transliteration: "v lesu", translation: "dans la forêt" },
                ],
            },
            {
                title: "Prépositionnel des noms féminins",
                content: [
                    "-а → -е : школа → в школе, книга → о книге, сестра → о сестре",
                    "-я → -е : семья → о семье, Россия → в России",
                    "-ь → -и : ночь → о ночи, жизнь → о жизни",
                    "Exemples : Я учусь в школе. (J'étudie à l'école.) Мы говорим о книге. (Nous parlons du livre.)",
                ],
                vocabulary: [
                    { word: "в школе", transliteration: "v shkole", translation: "à l'école" },
                    { word: "о книге", transliteration: "o knige", translation: "au sujet du livre" },
                    { word: "в России", transliteration: "v Rossii", translation: "en Russie" },
                    { word: "о жизни", transliteration: "o zhizni", translation: "au sujet de la vie" },
                ],
            },
            {
                title: "Prépositionnel des noms neutres",
                content: [
                    "-о → -е : окно → на окне, письмо → о письме, молоко → о молоке",
                    "-е → -е/-и : море → о море, здание → в здании",
                    "Les noms en -ие prennent -ии : здание → в здании, собрание → на собрании",
                ],
                vocabulary: [
                    { word: "на окне", transliteration: "na okne", translation: "sur la fenêtre" },
                    { word: "о море", transliteration: "o more", translation: "au sujet de la mer" },
                    { word: "в здании", transliteration: "v zdanii", translation: "dans le bâtiment" },
                ],
            },
            {
                title: "Localisation : в/на + prépositionnel",
                content: [
                    "в + prépositionnel = « dans » (lieu fermé) : в доме, в школе, в магазине, в городе",
                    "на + prépositionnel = « sur » ou lieu ouvert/événement : на столе, на работе, на концерте",
                    "Comparez : Я иду в школу (accusatif - mouvement) vs Я в школе (prépositionnel - position).",
                    "Certains lieux utilisent toujours « на » : на почте (à la poste), на вокзале (à la gare), на улице (dans la rue).",
                ],
                vocabulary: [
                    { word: "в магазине", transliteration: "v magazine", translation: "dans le magasin" },
                    { word: "на работе", transliteration: "na rabote", translation: "au travail" },
                    { word: "на концерте", transliteration: "na kontserte", translation: "au concert" },
                    { word: "на почте", transliteration: "na pochte", translation: "à la poste" },
                ],
            },
            {
                title: "Parler de : о/об + prépositionnel",
                content: [
                    "о + prépositionnel = « au sujet de, concernant » (devant consonnes) : о книге, о России, о работе",
                    "об + prépositionnel = même sens (devant voyelles) : об этом (à ce sujet), об учителе",
                    "Verbes courants : говорить о (parler de), думать о (penser à), мечтать о (rêver de)",
                    "Exemples : Мы говорим о России. (Nous parlons de la Russie.) Я думаю о тебе. (Je pense à toi.)",
                ],
                vocabulary: [
                    { word: "о России", transliteration: "o Rossii", translation: "au sujet de la Russie" },
                    { word: "об этом", transliteration: "ob etom", translation: "à ce sujet" },
                    { word: "думать о", transliteration: "dumat' o", translation: "penser à" },
                    { word: "мечтать о", transliteration: "mechtat' o", translation: "rêver de" },
                ],
            },
        ],
        quiz: [
            {
                question: "Comment dit-on « dans la ville » (город) ?",
                options: ["в город", "в города", "в городе"],
                correctIndex: 2,
                explanation: "Prépositionnel masculin : consonne + е → в городе.",
            },
            {
                question: "« Я работаю ___. » (Je travaille au travail) - Prépositionnel de « работа » ?",
                options: ["на работа", "на работу", "на работе"],
                correctIndex: 2,
                explanation: "Prépositionnel féminin : -а → -е : на работе.",
            },
            {
                question: "Comment dit-on « à l'école » (position) ?",
                options: ["в школу", "в школе", "в школа"],
                correctIndex: 1,
                explanation: "Localisation = prépositionnel : в школе.",
            },
            {
                question: "Quelle préposition utilise-t-on devant une voyelle pour « au sujet de » ?",
                options: ["о", "об", "в"],
                correctIndex: 1,
                explanation: "Devant une voyelle, on utilise « об » : об этом.",
            },
        ],
        flashcards: [
            { front: "в городе", back: "dans la ville", transliteration: "v gorode" },
            { front: "в школе", back: "à l'école", transliteration: "v shkole" },
            { front: "на работе", back: "au travail", transliteration: "na rabote" },
            { front: "о книге", back: "au sujet du livre", transliteration: "o knige" },
            { front: "в России", back: "en Russie", transliteration: "v Rossii" },
            { front: "думать о", back: "penser à", transliteration: "dumat' o" },
        ],
        fillBlank: [
            {
                sentence: "Я живу в ___ (Россия).",
                answer: "России",
                hint: "Prépositionnel féminin en -ия → -ии",
            },
            {
                sentence: "Книга на ___ (стол).",
                answer: "столе",
                hint: "Prépositionnel masculin : +е",
            },
            {
                sentence: "Мы говорим о ___ (работа).",
                answer: "работе",
                hint: "Prépositionnel féminin : -а → -е",
            },
        ],
        matching: [
            { left: "в городе", right: "dans la ville" },
            { left: "в школе", right: "à l'école" },
            { left: "на работе", right: "au travail" },
            { left: "о книге", right: "au sujet du livre" },
            { left: "в России", right: "en Russie" },
            { left: "на столе", right: "sur la table" },
        ],
    },

    // ============================================================================
    // MODULE 2-6 : Synthèse des cas
    // ============================================================================
    "2-6": {
        title: "Synthèse des cas",
        description: "Révisez tous les cas avec des exercices combinés",
        lessons: [
            {
                title: "Tableau récapitulatif des cas",
                content: [
                    "Voici un résumé des 6 cas russes :",
                    "NOMINATIF (Кто? Что?) : Sujet - forme de base du dictionnaire",
                    "ACCUSATIF (Кого? Что?) : COD, mouvement vers (в/на + acc.)",
                    "GÉNITIF (Кого? Чего?) : Possession, absence (нет), quantité, из/от/до/без/для",
                    "DATIF (Кому? Чему?) : Destinataire, âge, sentiments (к + dat.)",
                    "INSTRUMENTAL (Кем? Чем?) : Moyen, accompagnement (с + instr.), professions",
                    "PRÉPOSITIONNEL (О ком? О чём? Где?) : Localisation (в/на), sujet (о/об)",
                ],
            },
            {
                title: "Terminaisons masculines",
                content: [
                    "Résumé des terminaisons masculines (consonnes dures) :",
                    "Nominatif : ∅ (стол) | Accusatif : = nom. (inanimé) ou = gén. (animé)",
                    "Génitif : -а (стола) | Datif : -у (столу)",
                    "Instrumental : -ом (столом) | Prépositionnel : -е (столе)",
                    "Pour les noms en -ь ou -й, les terminaisons sont en -я, -ю, -ем, -е.",
                ],
            },
            {
                title: "Terminaisons féminines",
                content: [
                    "Résumé des terminaisons féminines (-а/-я) :",
                    "Nominatif : -а/-я (книга) | Accusatif : -у/-ю (книгу)",
                    "Génitif : -ы/-и (книги) | Datif : -е (книге)",
                    "Instrumental : -ой/-ей (книгой) | Prépositionnel : -е (книге)",
                    "Les noms en -ь ont des terminaisons en -и, -и, -ью, -и.",
                ],
            },
            {
                title: "Terminaisons neutres",
                content: [
                    "Résumé des terminaisons neutres (-о/-е) :",
                    "Nominatif : -о/-е (окно) | Accusatif : = nominatif (окно)",
                    "Génitif : -а/-я (окна) | Datif : -у/-ю (окну)",
                    "Instrumental : -ом/-ем (окном) | Prépositionnel : -е (окне)",
                    "Les neutres ne changent pas à l'accusatif - c'est une simplification !",
                ],
            },
            {
                title: "Stratégies de mémorisation",
                content: [
                    "Conseils pour maîtriser les déclinaisons :",
                    "1. Apprenez les mots avec leur genre dès le début.",
                    "2. Pratiquez les cas dans des phrases complètes, pas isolément.",
                    "3. Concentrez-vous d'abord sur le singulier avant le pluriel.",
                    "4. Utilisez des mnémotechniques : Imaginé le parcours d'une lettre : elle EST sur la table (nom), je LA prends (acc.), elle vient DE Moscou (gén.), je l'écris À maman (dat.), je l'écris AVEC un stylo (instr.), je parle DE la lettre (prép.).",
                ],
            },
        ],
        quiz: [
            {
                question: "Quel cas utilise-t-on après « без » (sans) ?",
                options: ["Accusatif", "Génitif", "Datif"],
                correctIndex: 1,
                explanation: "« Без » régit toujours le génitif : без сахара.",
            },
            {
                question: "« Я иду ___ школу » utilise quel cas pour « école » ?",
                options: ["Nominatif", "Accusatif", "Prépositionnel"],
                correctIndex: 1,
                explanation: "Mouvement vers = accusatif : в школу.",
            },
            {
                question: "« Он был врачом » - Quel cas est « врачом » ?",
                options: ["Génitif", "Datif", "Instrumental"],
                correctIndex: 2,
                explanation: "Avec быть au passé, la profession est à l'instrumental.",
            },
            {
                question: "« Мне 25 лет » - « Мне » est à quel cas ?",
                options: ["Accusatif", "Datif", "Prépositionnel"],
                correctIndex: 1,
                explanation: "L'âge s'exprime avec le datif : Мне = à moi.",
            },
            {
                question: "Quel cas utilise-t-on pour dire « dans la ville » (position) ?",
                options: ["Accusatif", "Instrumental", "Prépositionnel"],
                correctIndex: 2,
                explanation: "Position statique = prépositionnel : в городе.",
            },
        ],
        flashcards: [
            { front: "Кто? Что?", back: "Nominatif (sujet)", transliteration: "Kto? Chto?" },
            { front: "Кого? Что?", back: "Accusatif (COD)", transliteration: "Kogo? Chto?" },
            { front: "Кого? Чего?", back: "Génitif (possession)", transliteration: "Kogo? Chego?" },
            { front: "Кому? Чему?", back: "Datif (destinataire)", transliteration: "Komu? Chemu?" },
            { front: "Кем? Чем?", back: "Instrumental (moyen)", transliteration: "Kem? Chem?" },
            { front: "О ком? О чём?", back: "Prépositionnel (lieu/sujet)", transliteration: "O kom? O chyom?" },
        ],
        matching: [
            { left: "без + ...", right: "Génitif" },
            { left: "в + mouvement", right: "Accusatif" },
            { left: "с + ...", right: "Instrumental" },
            { left: "в + position", right: "Prépositionnel" },
            { left: "к + ...", right: "Datif" },
            { left: "из + ...", right: "Génitif" },
        ],
    },
};

export default a2Modules;
