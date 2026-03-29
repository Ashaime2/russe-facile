/**
 * Données des modules A1 - Fondations
 * Ce fichier contient le contenu pédagogique pour les modules de niveau A1
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

export const a1Modules: Record<string, ModuleData> = {
    // ============================================================================
    // MODULE 1-2 : Cas nominatif & genre singulier
    // ============================================================================
    "1-2": {
        title: "Cas nominatif & genre singulier",
        description: "Apprenez les trois genres en russe et le cas nominatif",
        lessons: [
            {
                title: "Introduction aux genres",
                content: [
                    "En russe, tous les noms ont un genre : masculin, féminin ou neutre. Contrairement au français qui n'a que deux genres, le russe en possède trois.",
                    "Le genre affecte la terminaison des adjectifs, des pronoms et des verbes au passé. C'est pourquoi il est essentiel de l'apprendre dès le début.",
                    "Bonne nouvelle : le genre est généralement prévisible à partir de la terminaison du mot !",
                ],
            },
            {
                title: "Reconnaître le genre masculin",
                content: [
                    "Les noms masculins se terminent généralement par une consonne : стол (table), дом (maison), брат (frère).",
                    "Certains noms masculins se terminent par -ь (signe mou) : день (jour), учитель (professeur).",
                    "Les noms désignant des hommes sont masculins : папа (papa), дядя (oncle) - même s'ils se terminent par -а.",
                ],
                vocabulary: [
                    { word: "стол", transliteration: "stol", translation: "table" },
                    { word: "дом", transliteration: "dom", translation: "maison" },
                    { word: "брат", transliteration: "brat", translation: "frère" },
                    { word: "день", transliteration: "den'", translation: "jour" },
                    { word: "учитель", transliteration: "uchitel'", translation: "professeur" },
                ],
            },
            {
                title: "Reconnaître le genre féminin",
                content: [
                    "Les noms féminins se terminent généralement par -а ou -я : книга (livre), семья (famille), мама (maman).",
                    "Certains noms féminins se terminent par -ь (signe mou) : ночь (nuit), жизнь (vie).",
                    "Comment distinguer les noms en -ь masculins des féminins ? Par l'usage et le dictionnaire, malheureusement !",
                ],
                vocabulary: [
                    { word: "книга", transliteration: "kniga", translation: "livre" },
                    { word: "семья", transliteration: "sem'ya", translation: "famille" },
                    { word: "школа", transliteration: "shkola", translation: "école" },
                    { word: "ночь", transliteration: "noch'", translation: "nuit" },
                    { word: "жизнь", transliteration: "zhizn'", translation: "vie" },
                ],
            },
            {
                title: "Reconnaître le genre neutre",
                content: [
                    "Les noms neutres se terminent par -о ou -е : окно (fenêtre), море (mer), молоко (lait).",
                    "Le genre neutre n'existe pas en français, mais il est courant en russe.",
                    "Les noms abstraits en -ие et -ение sont neutres : здание (bâtiment), чтение (lecture).",
                ],
                vocabulary: [
                    { word: "окно", transliteration: "okno", translation: "fenêtre" },
                    { word: "море", transliteration: "more", translation: "mer" },
                    { word: "молоко", transliteration: "moloko", translation: "lait" },
                    { word: "письмо", transliteration: "pis'mo", translation: "lettre" },
                    { word: "здание", transliteration: "zdanie", translation: "bâtiment" },
                ],
            },
            {
                title: "Le cas nominatif",
                content: [
                    "Le cas nominatif est le cas du sujet de la phrase. C'est la forme de base du mot, celle que vous trouvez dans le dictionnaire.",
                    "En russe, le verbe 'être' (быть) est généralement omis au présent : Я студент = Je suis étudiant.",
                    "Le nominatif répond aux questions : Кто? (Qui ?) pour les personnes et Что? (Quoi ?) pour les choses.",
                ],
            },
        ],
        quiz: [
            {
                question: "Quel est le genre du mot « книга » (livre) ?",
                options: ["Masculin", "Féminin", "Neutre"],
                correctIndex: 1,
                explanation: "Le mot « книга » se termine par -а, donc il est féminin.",
            },
            {
                question: "Quel est le genre du mot « окно » (fenêtre) ?",
                options: ["Masculin", "Féminin", "Neutre"],
                correctIndex: 2,
                explanation: "Le mot « окно » se termine par -о, donc il est neutre.",
            },
            {
                question: "Quel est le genre du mot « стол » (table) ?",
                options: ["Masculin", "Féminin", "Neutre"],
                correctIndex: 0,
                explanation: "Le mot « стол » se termine par une consonne, donc il est masculin.",
            },
            {
                question: "Quel est le genre du mot « море » (mer) ?",
                options: ["Masculin", "Féminin", "Neutre"],
                correctIndex: 2,
                explanation: "Le mot « море » se termine par -е, donc il est neutre.",
            },
            {
                question: "Quel est le genre du mot « ночь » (nuit) ?",
                options: ["Masculin", "Féminin", "Neutre"],
                correctIndex: 1,
                explanation: "Le mot « ночь » est féminin. Les mots en -ь peuvent être masculins ou féminins.",
            },
        ],
        flashcards: [
            { front: "стол", back: "table", transliteration: "stol" },
            { front: "книга", back: "livre", transliteration: "kniga" },
            { front: "окно", back: "fenêtre", transliteration: "okno" },
            { front: "дом", back: "maison", transliteration: "dom" },
            { front: "школа", back: "école", transliteration: "shkola" },
            { front: "молоко", back: "lait", transliteration: "moloko" },
            { front: "море", back: "mer", transliteration: "more" },
            { front: "ночь", back: "nuit", transliteration: "noch'" },
        ],
        matching: [
            { left: "стол", right: "table" },
            { left: "книга", right: "livre" },
            { left: "окно", right: "fenêtre" },
            { left: "школа", right: "école" },
            { left: "молоко", right: "lait" },
            { left: "море", right: "mer" },
        ],
    },

    // ============================================================================
    // MODULE 1-3 : Pronoms et adjectifs
    // ============================================================================
    "1-3": {
        title: "Pronoms et adjectifs",
        description: "Maîtrisez les pronoms possessifs et les accords d'adjectifs",
        lessons: [
            {
                title: "Pronoms personnels - Révision",
                content: [
                    "Rappel des pronoms personnels : я (je), ты (tu), он (il), она (elle), оно (il/elle neutre), мы (nous), вы (vous), они (ils/elles).",
                    "En russe, on utilise « вы » pour le vouvoiement (politesse) et pour s'adresser à plusieurs personnes.",
                    "Le pronom « оно » s'utilise pour les noms neutres : Окно? Оно большое. (La fenêtre? Elle est grande.)",
                ],
            },
            {
                title: "Pronoms possessifs - мой, твой",
                content: [
                    "Les pronoms possessifs s'accordent en genre avec le nom qu'ils qualifient.",
                    "мой / моя / моё (mon/ma) : мой брат (mon frère), моя сестра (ma sœur), моё окно (ma fenêtre)",
                    "твой / твоя / твоё (ton/ta) : твой дом (ta maison), твоя книга (ton livre), твоё письмо (ta lettre)",
                ],
                vocabulary: [
                    { word: "мой", transliteration: "moy", translation: "mon (masculin)" },
                    { word: "моя", transliteration: "moya", translation: "ma (féminin)" },
                    { word: "моё", transliteration: "moyó", translation: "mon/ma (neutre)" },
                    { word: "твой", transliteration: "tvoy", translation: "ton (masculin)" },
                    { word: "твоя", transliteration: "tvoya", translation: "ta (féminin)" },
                    { word: "твоё", transliteration: "tvoyó", translation: "ton/ta (neutre)" },
                ],
            },
            {
                title: "Pronoms possessifs - его, её, наш, ваш",
                content: [
                    "его (son/sa à lui) et её (son/sa à elle) sont invariables : его книга, её дом.",
                    "наш / наша / наше (notre) : наш город (notre ville), наша семья (notre famille).",
                    "ваш / ваша / ваше (votre) : ваш учитель (votre professeur), ваша машина (votre voiture).",
                ],
                vocabulary: [
                    { word: "его", transliteration: "yevó", translation: "son/sa (à lui)" },
                    { word: "её", transliteration: "yeyó", translation: "son/sa (à elle)" },
                    { word: "наш", transliteration: "nash", translation: "notre (masculin)" },
                    { word: "ваш", transliteration: "vash", translation: "votre (masculin)" },
                ],
            },
            {
                title: "Adjectifs - Accord en genre",
                content: [
                    "Les adjectifs s'accordent en genre avec le nom. Terminaisons au nominatif :",
                    "Masculin : -ый/-ий/-ой → новый дом (nouvelle maison), синий цвет (couleur bleue)",
                    "Féminin : -ая/-яя → новая книга (nouveau livre), синяя машина (voiture bleue)",
                    "Neutre : -ое/-ее → новое окно (nouvelle fenêtre), синее море (mer bleue)",
                ],
                vocabulary: [
                    { word: "новый", transliteration: "novyy", translation: "nouveau (m)" },
                    { word: "новая", transliteration: "novaya", translation: "nouvelle (f)" },
                    { word: "большой", transliteration: "bol'shoy", translation: "grand (m)" },
                    { word: "большая", transliteration: "bol'shaya", translation: "grande (f)" },
                    { word: "красивый", transliteration: "krasivyy", translation: "beau (m)" },
                    { word: "красивая", transliteration: "krasivaya", translation: "belle (f)" },
                ],
            },
            {
                title: "Adjectifs courants",
                content: [
                    "Apprenez ces adjectifs essentiels pour décrire le monde autour de vous :",
                    "хороший/хорошая/хорошее (bon), плохой/плохая/плохое (mauvais)",
                    "старый/старая/старое (vieux), молодой/молодая/молодое (jeune)",
                    "маленький/маленькая/маленькое (petit), большой/большая/большое (grand)",
                ],
            },
        ],
        quiz: [
            {
                question: "Comment dit-on « mon livre » (книга est féminin) ?",
                options: ["мой книга", "моя книга", "моё книга"],
                correctIndex: 1,
                explanation: "« книга » est féminin, donc on utilise « моя ».",
            },
            {
                question: "Comment dit-on « ta fenêtre » (окно est neutre) ?",
                options: ["твой окно", "твоя окно", "твоё окно"],
                correctIndex: 2,
                explanation: "« окно » est neutre, donc on utilise « твоё ».",
            },
            {
                question: "Quelle est la forme féminine de « новый » (nouveau) ?",
                options: ["новое", "новая", "нови"],
                correctIndex: 1,
                explanation: "La terminaison féminine des adjectifs est -ая.",
            },
            {
                question: "Comment dit-on « grande maison » (дом est masculin) ?",
                options: ["большая дом", "большое дом", "большой дом"],
                correctIndex: 2,
                explanation: "« дом » est masculin, donc on utilise l'adjectif masculin « большой ».",
            },
        ],
        flashcards: [
            { front: "мой", back: "mon (masculin)", transliteration: "moy" },
            { front: "моя", back: "ma (féminin)", transliteration: "moya" },
            { front: "твой", back: "ton (masculin)", transliteration: "tvoy" },
            { front: "его", back: "son (à lui)", transliteration: "yevó" },
            { front: "её", back: "son (à elle)", transliteration: "yeyó" },
            { front: "новый", back: "nouveau", transliteration: "novyy" },
            { front: "большой", back: "grand", transliteration: "bol'shoy" },
            { front: "красивый", back: "beau", transliteration: "krasivyy" },
            { front: "хороший", back: "bon", transliteration: "khoroshiy" },
            { front: "маленький", back: "petit", transliteration: "malen'kiy" },
        ],
        matching: [
            { left: "мой", right: "mon (m)" },
            { left: "моя", right: "ma (f)" },
            { left: "новый", right: "nouveau" },
            { left: "большой", right: "grand" },
            { left: "хороший", right: "bon" },
            { left: "маленький", right: "petit" },
        ],
    },

    // ============================================================================
    // MODULE 1-4 : Introduction aux verbes
    // ============================================================================
    "1-4": {
        title: "Introduction aux verbes",
        description: "Apprenez à conjuguer les verbes russes au présent",
        lessons: [
            {
                title: "Le verbe être au présent",
                content: [
                    "En russe, le verbe « être » (быть) est généralement omis au présent !",
                    "Я студент = Je suis étudiant (littéralement : « Je étudiant »)",
                    "Она врач = Elle est médecin. Это книга = C'est un livre.",
                    "On peut parfois utiliser un tiret pour marquer la pause : Москва — столица России (Moscou est la capitale de la Russie).",
                ],
            },
            {
                title: "Les deux conjugaisons",
                content: [
                    "En russe, il existe deux types de conjugaison au présent :",
                    "1ère conjugaison : verbes en -ать, -ять, -еть (la plupart). Terminaisons : -ю, -ешь, -ет, -ем, -ете, -ют",
                    "2ème conjugaison : verbes en -ить (et quelques exceptions). Terminaisons : -ю/-у, -ишь, -ит, -им, -ите, -ят/-ат",
                    "La conjugaison détermine les terminaisons ajoutées au radical du verbe.",
                ],
            },
            {
                title: "1ère conjugaison : читать (lire)",
                content: [
                    "Radical : чита- (on enlève -ть)",
                    "я читаю (je lis) — мы читаем (nous lisons)",
                    "ты читаешь (tu lis) — вы читаете (vous lisez)",
                    "он/она читает (il/elle lit) — они читают (ils/elles lisent)",
                ],
                vocabulary: [
                    { word: "читать", transliteration: "chitat'", translation: "lire" },
                    { word: "я читаю", transliteration: "ya chitayu", translation: "je lis" },
                    { word: "ты читаешь", transliteration: "ty chitayesh'", translation: "tu lis" },
                    { word: "он читает", transliteration: "on chitayet", translation: "il lit" },
                ],
            },
            {
                title: "1ère conjugaison : autres verbes",
                content: [
                    "работать (travailler) : я работаю, ты работаешь, он работает...",
                    "знать (savoir) : я знаю, ты знаешь, он знает...",
                    "понимать (comprendre) : я понимаю, ты понимаешь, он понимает...",
                    "делать (faire) : я делаю, ты делаешь, он делает...",
                ],
                vocabulary: [
                    { word: "работать", transliteration: "rabotat'", translation: "travailler" },
                    { word: "знать", transliteration: "znat'", translation: "savoir" },
                    { word: "понимать", transliteration: "ponimat'", translation: "comprendre" },
                    { word: "делать", transliteration: "delat'", translation: "faire" },
                ],
            },
            {
                title: "2ème conjugaison : говорить (parler)",
                content: [
                    "Radical : говор- (attention aux changements de consonnes possibles)",
                    "я говорю (je parle) — мы говорим (nous parlons)",
                    "ты говоришь (tu parles) — вы говорите (vous parlez)",
                    "он/она говорит (il/elle parle) — они говорят (ils/elles parlent)",
                ],
                vocabulary: [
                    { word: "говорить", transliteration: "govorit'", translation: "parler" },
                    { word: "я говорю", transliteration: "ya govoryu", translation: "je parle" },
                    { word: "ты говоришь", transliteration: "ty govorish'", translation: "tu parles" },
                    { word: "он говорит", transliteration: "on govorit", translation: "il parle" },
                ],
            },
            {
                title: "2ème conjugaison : autres verbes",
                content: [
                    "любить (aimer) : я люблю, ты любишь, он любит... (attention: б→бл à la 1ère personne)",
                    "смотреть (regarder) : я смотрю, ты смотришь, он смотрит...",
                    "учить (apprendre/enseigner) : я учу, ты учишь, он учит...",
                    "видеть (voir) : я вижу, ты видишь, он видит... (д→ж à la 1ère personne)",
                ],
                vocabulary: [
                    { word: "любить", transliteration: "lyubit'", translation: "aimer" },
                    { word: "смотреть", transliteration: "smotret'", translation: "regarder" },
                    { word: "учить", transliteration: "uchit'", translation: "apprendre" },
                    { word: "видеть", transliteration: "videt'", translation: "voir" },
                ],
            },
        ],
        quiz: [
            {
                question: "Comment dit-on « Je lis » en russe ?",
                options: ["Я читать", "Я читаю", "Я читаешь"],
                correctIndex: 1,
                explanation: "La 1ère personne du singulier de « читать » est « читаю ».",
            },
            {
                question: "Quelle est la conjugaison correcte de « говорить » à « ты » ?",
                options: ["ты говорю", "ты говоришь", "ты говорит"],
                correctIndex: 1,
                explanation: "La 2ème personne du singulier de « говорить » prend la terminaison -ишь.",
            },
            {
                question: "Comment dit-on « Il travaille » ?",
                options: ["Он работает", "Он работаю", "Он работать"],
                correctIndex: 0,
                explanation: "La 3ème personne du singulier de « работать » est « работает ».",
            },
            {
                question: "Quel verbe appartient à la 2ème conjugaison ?",
                options: ["читать", "работать", "говорить"],
                correctIndex: 2,
                explanation: "« Говорить » se termine par -ить, c'est donc un verbe de la 2ème conjugaison.",
            },
        ],
        flashcards: [
            { front: "читать", back: "lire", transliteration: "chitat'" },
            { front: "работать", back: "travailler", transliteration: "rabotat'" },
            { front: "говорить", back: "parler", transliteration: "govorit'" },
            { front: "знать", back: "savoir", transliteration: "znat'" },
            { front: "понимать", back: "comprendre", transliteration: "ponimat'" },
            { front: "делать", back: "faire", transliteration: "delat'" },
            { front: "любить", back: "aimer", transliteration: "lyubit'" },
            { front: "смотреть", back: "regarder", transliteration: "smotret'" },
            { front: "учить", back: "apprendre", transliteration: "uchit'" },
            { front: "видеть", back: "voir", transliteration: "videt'" },
        ],
        fillBlank: [
            {
                sentence: "Я ___ книгу.",
                answer: "читаю",
                hint: "Verbe « lire » à la 1ère personne",
            },
            {
                sentence: "Он ___ по-русски.",
                answer: "говорит",
                hint: "Verbe « parler » à la 3ème personne",
            },
            {
                sentence: "Мы ___ в офисе.",
                answer: "работаем",
                hint: "Verbe « travailler » à la 1ère personne du pluriel",
            },
            {
                sentence: "Ты ___ русский язык?",
                answer: "понимаешь",
                hint: "Verbe « comprendre » à la 2ème personne",
            },
        ],
        matching: [
            { left: "читать", right: "lire" },
            { left: "работать", right: "travailler" },
            { left: "говорить", right: "parler" },
            { left: "знать", right: "savoir" },
            { left: "понимать", right: "comprendre" },
            { left: "любить", right: "aimer" },
        ],
    },

    // ============================================================================
    // MODULE 1-5 : Nombres & pluriels débutants
    // ============================================================================
    "1-5": {
        title: "Nombres & pluriels débutants",
        description: "Apprenez à compter et à former le pluriel des noms",
        lessons: [
            {
                title: "Nombres 11-20",
                content: [
                    "Les nombres de 11 à 19 se forment avec le suffixe -надцать :",
                    "11 одиннадцать, 12 двенадцать, 13 тринадцать, 14 четырнадцать, 15 пятнадцать",
                    "16 шестнадцать, 17 семнадцать, 18 восемнадцать, 19 девятнадцать",
                    "20 двадцать - Remarquez la racine « два » (deux) + дцать",
                ],
                vocabulary: [
                    { word: "одиннадцать", transliteration: "odinnadtsat'", translation: "11" },
                    { word: "двенадцать", transliteration: "dvenadtsat'", translation: "12" },
                    { word: "пятнадцать", transliteration: "pyatnadtsat'", translation: "15" },
                    { word: "двадцать", transliteration: "dvadtsat'", translation: "20" },
                ],
            },
            {
                title: "Dizaines (20-100)",
                content: [
                    "20 двадцать, 30 тридцать, 40 сорок (irrégulier !)",
                    "50 пятьдесят, 60 шестьдесят, 70 семьдесят, 80 восемьдесят",
                    "90 девяносто (irrégulier !), 100 сто",
                    "Pour former 21, 35, etc. : двадцать один (21), тридцать пять (35)",
                ],
                vocabulary: [
                    { word: "тридцать", transliteration: "tridtsat'", translation: "30" },
                    { word: "сорок", transliteration: "sorok", translation: "40" },
                    { word: "пятьдесят", transliteration: "pyat'desyat", translation: "50" },
                    { word: "сто", transliteration: "sto", translation: "100" },
                ],
            },
            {
                title: "Formation du pluriel - Masculin",
                content: [
                    "La plupart des noms masculins ajoutent -ы ou -и au nominatif pluriel :",
                    "стол → столы (tables), дом → дома (maisons - irrégulier), брат → братья (frères)",
                    "Règle orthographique : après г, к, х, ж, ч, ш, щ, on écrit -и et non -ы",
                    "Exemples : друг → друзья (amis), учебник → учебники (manuels)",
                ],
                vocabulary: [
                    { word: "столы", transliteration: "stoly", translation: "tables" },
                    { word: "дома", transliteration: "doma", translation: "maisons" },
                    { word: "братья", transliteration: "brat'ya", translation: "frères" },
                    { word: "друзья", transliteration: "druz'ya", translation: "amis" },
                ],
            },
            {
                title: "Formation du pluriel - Féminin",
                content: [
                    "Les noms féminins en -а changent en -ы : книга → книги, сестра → сёстры",
                    "Les noms féminins en -я changent en -и : семья → семьи",
                    "Les noms féminins en -ь ajoutent -и : ночь → ночи",
                    "Règle orthographique : après г, к, х, ж, ч, ш, щ → -и : рука → руки (mains)",
                ],
                vocabulary: [
                    { word: "книги", transliteration: "knigi", translation: "livres" },
                    { word: "сёстры", transliteration: "syostry", translation: "sœurs" },
                    { word: "ночи", transliteration: "nochi", translation: "nuits" },
                    { word: "руки", transliteration: "ruki", translation: "mains" },
                ],
            },
            {
                title: "Formation du pluriel - Neutre",
                content: [
                    "Les noms neutres en -о changent en -а : окно → окна, письмо → письма",
                    "Les noms neutres en -е changent en -я : море → моря",
                    "Exceptions notables : время → времена (temps), имя → имена (prénom)",
                ],
                vocabulary: [
                    { word: "окна", transliteration: "okna", translation: "fenêtres" },
                    { word: "письма", transliteration: "pis'ma", translation: "lettres" },
                    { word: "моря", transliteration: "morya", translation: "mers" },
                ],
            },
            {
                title: "Nombres et cas",
                content: [
                    "Attention ! Après les nombres, le nom change de cas :",
                    "1 (один) + nominatif singulier : один стол (une table)",
                    "2, 3, 4 + génitif singulier : два стола, три книги",
                    "5-20 + génitif pluriel : пять столов, десять книг",
                    "C'est une particularité importante que nous approfondirons au niveau A2.",
                ],
            },
        ],
        quiz: [
            {
                question: "Comment dit-on 15 en russe ?",
                options: ["пятнадцать", "пятьдесят", "пять"],
                correctIndex: 0,
                explanation: "15 = пять + надцать = пятнадцать",
            },
            {
                question: "Quel est le pluriel de « книга » ?",
                options: ["книгы", "книги", "книга"],
                correctIndex: 1,
                explanation: "Après г, on écrit -и et non -ы : книги.",
            },
            {
                question: "Quel est le pluriel de « окно » ?",
                options: ["окны", "окни", "окна"],
                correctIndex: 2,
                explanation: "Les noms neutres en -о forment leur pluriel en -а : окна.",
            },
            {
                question: "Comment dit-on 40 en russe ?",
                options: ["четырнадцать", "четыредесять", "сорок"],
                correctIndex: 2,
                explanation: "40 est irrégulier : сорок (et non четыредесят).",
            },
            {
                question: "Quel est le pluriel de « стол » ?",
                options: ["стола", "столы", "столи"],
                correctIndex: 1,
                explanation: "Les noms masculins en consonne ajoutent généralement -ы : столы.",
            },
        ],
        flashcards: [
            { front: "одиннадцать", back: "11", transliteration: "odinnadtsat'" },
            { front: "двенадцать", back: "12", transliteration: "dvenadtsat'" },
            { front: "двадцать", back: "20", transliteration: "dvadtsat'" },
            { front: "тридцать", back: "30", transliteration: "tridtsat'" },
            { front: "сорок", back: "40", transliteration: "sorok" },
            { front: "сто", back: "100", transliteration: "sto" },
            { front: "книги", back: "livres (pluriel)", transliteration: "knigi" },
            { front: "окна", back: "fenêtres (pluriel)", transliteration: "okna" },
            { front: "столы", back: "tables (pluriel)", transliteration: "stoly" },
        ],
        matching: [
            { left: "пятнадцать", right: "15" },
            { left: "двадцать", right: "20" },
            { left: "сорок", right: "40" },
            { left: "сто", right: "100" },
            { left: "книги", right: "livres" },
            { left: "окна", right: "fenêtres" },
        ],
    },
};

export default a1Modules;
