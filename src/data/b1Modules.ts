/**
 * Données des modules B1 - Approfondissement
 * Verbes de mouvement, aspect verbal, temps verbaux, expression des émotions
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

export const b1Modules: Record<string, ModuleData> = {
    // ============================================================================
    // MODULE 3-1 : Verbes de mouvement
    // ============================================================================
    "3-1": {
        title: "Verbes de mouvement",
        description: "Maîtrisez les verbes aller, venir, partir avec et sans préfixes",
        lessons: [
            {
                title: "Introduction aux verbes de mouvement",
                content: [
                    "Le russe possède un système unique de verbes de mouvement. Contrairement au français qui utilise principalement « aller », le russe distingue le mode de déplacement ET la direction.",
                    "Il existe deux catégories fondamentales : les verbes UNIDIRECTIONNELS (mouvement dans une direction précise, en ce moment) et les verbes MULTIDIRECTIONNELS (mouvement habituel, dans plusieurs directions, ou aller-retour).",
                    "Exemple : Я иду в школу (Je vais à l'école – en ce moment, dans cette direction) vs Я хожу в школу (Je vais à l'école – régulièrement).",
                    "Ce système est l'une des particularités les plus importantes de la grammaire russe.",
                ],
            },
            {
                title: "Идти / Ходить — Aller à pied",
                content: [
                    "идти (unidirectionnel) = aller à pied MAINTENANT, dans une direction précise.",
                    "Conjugaison : я иду, ты идёшь, он/она идёт, мы идём, вы идёте, они идут",
                    "ходить (multidirectionnel) = aller à pied HABITUELLEMENT, dans différentes directions, ou aller-retour.",
                    "Conjugaison : я хожу, ты ходишь, он/она ходит, мы ходим, вы ходите, они ходят",
                    "Exemples : Куда ты идёшь? (Où vas-tu en ce moment ?) vs Ты часто ходишь в кино? (Tu vas souvent au cinéma ?)",
                ],
                vocabulary: [
                    { word: "идти", transliteration: "idti", translation: "aller à pied (unidirectionnel)" },
                    { word: "ходить", transliteration: "khodit'", translation: "aller à pied (multidirectionnel)" },
                    { word: "я иду", transliteration: "ya idu", translation: "je vais (maintenant)" },
                    { word: "я хожу", transliteration: "ya khozhu", translation: "je vais (régulièrement)" },
                ],
            },
            {
                title: "Ехать / Ездить — Aller en véhicule",
                content: [
                    "ехать (unidirectionnel) = aller en véhicule MAINTENANT, dans une direction.",
                    "Conjugaison : я еду, ты едешь, он/она едет, мы едем, вы едете, они едут",
                    "ездить (multidirectionnel) = aller en véhicule HABITUELLEMENT ou aller-retour.",
                    "Conjugaison : я езжу, ты ездишь, он/она ездит, мы ездим, вы ездите, они ездят",
                    "Exemples : Мы едем в Москву (Nous allons à Moscou – en route) vs Мы ездим в Москву каждый год (Nous allons à Moscou chaque année).",
                ],
                vocabulary: [
                    { word: "ехать", transliteration: "yekhat'", translation: "aller en véhicule (unidirectionnel)" },
                    { word: "ездить", transliteration: "yezdit'", translation: "aller en véhicule (multidirectionnel)" },
                    { word: "я еду", transliteration: "ya yedu", translation: "je vais en véhicule (maintenant)" },
                    { word: "я езжу", transliteration: "ya yezzhu", translation: "je vais en véhicule (régulièrement)" },
                ],
            },
            {
                title: "Нести / Носить — Porter (à la main)",
                content: [
                    "нести (unidirectionnel) = porter dans une direction, en ce moment.",
                    "Conjugaison : я несу, ты несёшь, он/она несёт, мы несём, вы несёте, они несут",
                    "носить (multidirectionnel) = porter habituellement, dans différentes directions.",
                    "Conjugaison : я ношу, ты носишь, он/она носит, мы носим, вы носите, они носят",
                    "« Носить » s'utilise aussi pour les vêtements : Она носит красное платье. (Elle porte une robe rouge.)",
                ],
                vocabulary: [
                    { word: "нести", transliteration: "nesti", translation: "porter (unidirectionnel)" },
                    { word: "носить", transliteration: "nosit'", translation: "porter (multidirectionnel)" },
                    { word: "везти", transliteration: "vezti", translation: "transporter (unidirectionnel)" },
                    { word: "возить", transliteration: "vozit'", translation: "transporter (multidirectionnel)" },
                ],
            },
            {
                title: "Бежать / Бегать — Courir",
                content: [
                    "бежать (unidirectionnel) = courir dans une direction précise, en ce moment.",
                    "Conjugaison : я бегу, ты бежишь, он/она бежит, мы бежим, вы бежите, они бегут",
                    "бегать (multidirectionnel) = courir habituellement, dans différentes directions.",
                    "Conjugaison : я бегаю, ты бегаешь, он/она бегает, мы бегаем, вы бегаете, они бегают",
                    "Exemples : Ребёнок бежит к маме. (L'enfant court vers sa mère.) vs Я бегаю каждое утро. (Je cours chaque matin.)",
                ],
                vocabulary: [
                    { word: "бежать", transliteration: "bezhat'", translation: "courir (unidirectionnel)" },
                    { word: "бегать", transliteration: "begat'", translation: "courir (multidirectionnel)" },
                    { word: "лететь", transliteration: "letet'", translation: "voler (unidirectionnel)" },
                    { word: "летать", transliteration: "letat'", translation: "voler (multidirectionnel)" },
                ],
            },
            {
                title: "Préfixes de direction (по-, при-, у-)",
                content: [
                    "Les préfixes ajoutent un sens directionnel aux verbes de mouvement :",
                    "по- = début du mouvement : пойти (se mettre en route à pied), поехать (se mettre en route en véhicule). Exemples : Я пошёл домой. (Je suis parti à la maison.)",
                    "при- = arrivée : прийти (arriver à pied), приехать (arriver en véhicule). Exemples : Он приехал из Москвы. (Il est arrivé de Moscou.)",
                    "у- = départ définitif : уйти (partir à pied), уехать (partir en véhicule). Exemples : Она уехала в Петербург. (Elle est partie à Saint-Pétersbourg.)",
                ],
                vocabulary: [
                    { word: "пойти", transliteration: "poyti", translation: "se mettre en route (à pied)" },
                    { word: "поехать", transliteration: "poyekhat'", translation: "se mettre en route (véhicule)" },
                    { word: "прийти", transliteration: "priyti", translation: "arriver (à pied)" },
                    { word: "приехать", transliteration: "priyekhat'", translation: "arriver (véhicule)" },
                    { word: "уйти", transliteration: "uyti", translation: "partir (à pied)" },
                    { word: "уехать", transliteration: "uyekhat'", translation: "partir (véhicule)" },
                ],
            },
            {
                title: "Préfixes (вы-, в-, пере-)",
                content: [
                    "вы- = sortir de : выйти (sortir à pied), выехать (sortir en véhicule). Он вышел из дома. (Il est sorti de la maison.)",
                    "в- / во- = entrer dans : войти (entrer à pied), въехать (entrer en véhicule). Мы вошли в комнату. (Nous sommes entrés dans la pièce.)",
                    "пере- = traverser : перейти (traverser à pied), переехать (traverser en véhicule / déménager). Перейдите улицу. (Traversez la rue.)",
                    "Attention : переехать signifie aussi « déménager » : Мы переехали в новый дом. (Nous avons déménagé dans une nouvelle maison.)",
                ],
                vocabulary: [
                    { word: "выйти", transliteration: "vyyti", translation: "sortir (à pied)" },
                    { word: "войти", transliteration: "voyti", translation: "entrer (à pied)" },
                    { word: "перейти", transliteration: "pereyti", translation: "traverser (à pied)" },
                    { word: "переехать", transliteration: "pereyekhat'", translation: "déménager / traverser" },
                ],
            },
            {
                title: "Récapitulatif et usage au passé",
                content: [
                    "Tableau récapitulatif des paires principales :",
                    "À pied : идти / ходить. En véhicule : ехать / ездить. En courant : бежать / бегать. En volant : лететь / летать. En portant : нести / носить. En transportant : везти / возить.",
                    "Au passé, les verbes préfixés s'utilisent naturellement : Вчера я пришёл домой поздно. (Hier je suis arrivé tard à la maison.)",
                    "Astuce : si vous hésitez entre uni- et multidirectionnel, demandez-vous : « En ce moment, dans une direction ? » → unidirectionnel. « Habituellement, en général ? » → multidirectionnel.",
                ],
            },
        ],
        quiz: [
            {
                question: "Quelle est la différence entre « идти » et « ходить » ?",
                options: [
                    "идти = en véhicule, ходить = à pied",
                    "идти = unidirectionnel, ходить = multidirectionnel",
                    "идти = passé, ходить = présent",
                ],
                correctIndex: 1,
                explanation: "« идти » est unidirectionnel (une direction, maintenant), « ходить » est multidirectionnel (habituellement, plusieurs directions).",
            },
            {
                question: "Comment dit-on « Je vais à Moscou en train (en ce moment) » ?",
                options: ["Я хожу в Москву", "Я еду в Москву", "Я езжу в Москву"],
                correctIndex: 1,
                explanation: "En véhicule + mouvement en cours = ехать (unidirectionnel) : Я еду в Москву.",
            },
            {
                question: "Que signifie le préfixe « при- » ?",
                options: ["Départ", "Arrivée", "Traversée"],
                correctIndex: 1,
                explanation: "Le préfixe при- exprime l'arrivée : прийти (arriver à pied), приехать (arriver en véhicule).",
            },
            {
                question: "« Я ___ в школу каждый день. » (Je vais à l'école chaque jour, à pied)",
                options: ["иду", "хожу", "еду"],
                correctIndex: 1,
                explanation: "Mouvement habituel à pied = ходить : Я хожу в школу каждый день.",
            },
            {
                question: "Que signifie « выйти из дома » ?",
                options: ["Entrer dans la maison", "Sortir de la maison", "Déménager"],
                correctIndex: 1,
                explanation: "вы- = sortir de. выйти из дома = sortir de la maison.",
            },
            {
                question: "Comment dit-on « Elle est arrivée de Paris » ?",
                options: ["Она уехала из Парижа", "Она приехала из Парижа", "Она поехала из Парижа"],
                correctIndex: 1,
                explanation: "при- = arrivée + ехать (véhicule) : Она приехала из Парижа.",
            },
        ],
        flashcards: [
            { front: "идти", back: "aller à pied (unidirectionnel)", transliteration: "idti" },
            { front: "ходить", back: "aller à pied (multidirectionnel)", transliteration: "khodit'" },
            { front: "ехать", back: "aller en véhicule (unidirectionnel)", transliteration: "yekhat'" },
            { front: "ездить", back: "aller en véhicule (multidirectionnel)", transliteration: "yezdit'" },
            { front: "бежать", back: "courir (unidirectionnel)", transliteration: "bezhat'" },
            { front: "бегать", back: "courir (multidirectionnel)", transliteration: "begat'" },
            { front: "пойти", back: "se mettre en route (à pied)", transliteration: "poyti" },
            { front: "приехать", back: "arriver (en véhicule)", transliteration: "priyekhat'" },
            { front: "уехать", back: "partir (en véhicule)", transliteration: "uyekhat'" },
            { front: "выйти", back: "sortir (à pied)", transliteration: "vyyti" },
            { front: "войти", back: "entrer (à pied)", transliteration: "voyti" },
            { front: "перейти", back: "traverser (à pied)", transliteration: "pereyti" },
        ],
        matching: [
            { left: "идти", right: "aller à pied (maintenant)" },
            { left: "ходить", right: "aller à pied (habituellement)" },
            { left: "ехать", right: "aller en véhicule (maintenant)" },
            { left: "ездить", right: "aller en véhicule (habituellement)" },
            { left: "прийти", right: "arriver à pied" },
            { left: "уехать", right: "partir en véhicule" },
        ],
        fillBlank: [
            {
                sentence: "Я ___ в школу каждый день. (aller à pied, habituellement)",
                answer: "хожу",
                hint: "Multidirectionnel, 1ère personne",
            },
            {
                sentence: "Куда ты ___? (aller à pied, maintenant)",
                answer: "идёшь",
                hint: "Unidirectionnel, 2ème personne",
            },
            {
                sentence: "Он ___ из Москвы вчера. (arriver en véhicule)",
                answer: "приехал",
                hint: "Préfixe при- + ехать au passé masculin",
            },
            {
                sentence: "Она ___ из комнаты. (sortir à pied)",
                answer: "вышла",
                hint: "Préfixe вы- + идти au passé féminin",
            },
        ],
    },

    // ============================================================================
    // MODULE 3-2 : Aspect verbal
    // ============================================================================
    "3-2": {
        title: "Aspect verbal",
        description: "Comprenez la différence entre perfectif et imperfectif",
        lessons: [
            {
                title: "Introduction à l'aspect verbal",
                content: [
                    "L'aspect verbal est une notion fondamentale du russe qui n'existe pas en français. Chaque verbe russe existe en deux versions : imperfectif (НСВ) et perfectif (СВ).",
                    "L'imperfectif (НСВ) décrit un processus en cours, une action habituelle, ou une action sans résultat précisé.",
                    "Le perfectif (СВ) décrit une action achevée, avec un résultat concret, ou une action ponctuelle.",
                    "Exemple : читать (imperfectif – lire, être en train de lire) vs прочитать (perfectif – avoir lu, finir de lire).",
                ],
            },
            {
                title: "Quand utiliser l'imperfectif ?",
                content: [
                    "1. Action EN COURS : Я читаю книгу. (Je suis en train de lire un livre.)",
                    "2. Action HABITUELLE : Я читаю каждый день. (Je lis chaque jour.)",
                    "3. Action LONGUE ou RÉPÉTÉE : Вчера я долго читал. (Hier j'ai lu longtemps.)",
                    "4. Avec certains adverbes : всегда (toujours), часто (souvent), иногда (parfois), обычно (habituellement), каждый день (chaque jour).",
                    "L'imperfectif existe à tous les temps : présent, passé, futur (буду + infinitif).",
                ],
                vocabulary: [
                    { word: "читать", transliteration: "chitat'", translation: "lire (imperfectif)" },
                    { word: "писать", transliteration: "pisat'", translation: "écrire (imperfectif)" },
                    { word: "делать", transliteration: "delat'", translation: "faire (imperfectif)" },
                    { word: "учить", transliteration: "uchit'", translation: "apprendre (imperfectif)" },
                    { word: "всегда", transliteration: "vsegda", translation: "toujours" },
                    { word: "часто", transliteration: "chasto", translation: "souvent" },
                ],
            },
            {
                title: "Quand utiliser le perfectif ?",
                content: [
                    "1. Action ACHEVÉE avec RÉSULTAT : Я прочитал книгу. (J'ai lu le livre – en entier, c'est fini.)",
                    "2. Action PONCTUELLE, unique : Он написал письмо. (Il a écrit une lettre – une seule, c'est fait.)",
                    "3. Action FUTURE précise : Завтра я прочитаю эту книгу. (Demain je lirai ce livre – en entier.)",
                    "4. Avec : уже (déjà), наконец (enfin), вдруг (soudain).",
                    "Attention : le perfectif n'a PAS de présent ! Il n'a que le passé et le futur (conjugué directement).",
                ],
                vocabulary: [
                    { word: "прочитать", transliteration: "prochitat'", translation: "lire (perfectif – finir de lire)" },
                    { word: "написать", transliteration: "napisat'", translation: "écrire (perfectif – finir d'écrire)" },
                    { word: "сделать", transliteration: "sdelat'", translation: "faire (perfectif – accomplir)" },
                    { word: "выучить", transliteration: "vyuchit'", translation: "apprendre (perfectif – maîtriser)" },
                    { word: "уже", transliteration: "uzhe", translation: "déjà" },
                    { word: "вдруг", transliteration: "vdrug", translation: "soudain" },
                ],
            },
            {
                title: "Formation des paires d'aspect",
                content: [
                    "Les paires imperfectif / perfectif se forment de plusieurs manières :",
                    "1. Par PRÉFIXE (le plus courant) : читать → прочитать, писать → написать, делать → сделать, учить → выучить",
                    "2. Par SUFFIXE : рассказывать → рассказать (raconter), показывать → показать (montrer)",
                    "3. Par ALTERNANCE de racine : говорить → сказать (dire), брать → взять (prendre), класть → положить (poser)",
                    "4. Verbes à double imperfectif : открывать (impf.) → открыть (pf.) → ouvrir. La « forme longue » en -ывать/-ивать est souvent l'imperfectif dérivé.",
                ],
                vocabulary: [
                    { word: "рассказывать", transliteration: "rasskazyvat'", translation: "raconter (impf.)" },
                    { word: "рассказать", transliteration: "rasskazat'", translation: "raconter (pf.)" },
                    { word: "открывать", transliteration: "otkryvat'", translation: "ouvrir (impf.)" },
                    { word: "открыть", transliteration: "otkryt'", translation: "ouvrir (pf.)" },
                    { word: "брать", transliteration: "brat'", translation: "prendre (impf.)" },
                    { word: "взять", transliteration: "vzyat'", translation: "prendre (pf.)" },
                ],
            },
            {
                title: "Aspect et passé",
                content: [
                    "Au passé, le choix de l'aspect change le sens de la phrase :",
                    "Imperfectif passé = action en cours, habituelle, ou sans résultat spécifié : Я читал книгу. (Je lisais un livre / J'ai lu un livre – sans préciser si j'ai fini.)",
                    "Perfectif passé = action terminée avec résultat : Я прочитал книгу. (J'ai lu le livre en entier.)",
                    "Comparez : Что ты делал вчера? (Qu'est-ce que tu faisais hier ? – processus) vs Что ты сделал? (Qu'est-ce que tu as fait ? – résultat)",
                ],
            },
            {
                title: "Aspect et futur",
                content: [
                    "Le futur se forme différemment selon l'aspect :",
                    "Imperfectif : буду + infinitif imperfectif. Я буду читать. (Je lirai – en général, processus.)",
                    "Perfectif : conjugaison directe. Я прочитаю. (Je lirai – et je finirai.)",
                    "Exemples : Завтра я буду работать. (Demain je travaillerai – processus.) vs Завтра я сделаю домашнее задание. (Demain je ferai mes devoirs – je les finirai.)",
                ],
                vocabulary: [
                    { word: "буду", transliteration: "budu", translation: "je serai / je vais (auxiliaire futur)" },
                    { word: "будем", transliteration: "budem", translation: "nous serons / allons (auxiliaire futur)" },
                    { word: "сделаю", transliteration: "sdelayu", translation: "je ferai (perfectif futur)" },
                    { word: "напишу", transliteration: "napishu", translation: "j'écrirai (perfectif futur)" },
                ],
            },
            {
                title: "Négation et aspect",
                content: [
                    "La négation interagit avec l'aspect de manière importante :",
                    "Imperfectif négatif = l'action n'a pas eu lieu du tout : Я не читал эту книгу. (Je n'ai pas lu ce livre – jamais.)",
                    "Perfectif négatif = l'action n'a pas atteint son résultat : Я не прочитал книгу. (Je n'ai pas fini de lire le livre.)",
                    "À l'impératif négatif, on utilise TOUJOURS l'imperfectif : Не открывай окно! (N'ouvre pas la fenêtre !) – et jamais « Не открой ».",
                    "Astuce : à l'impératif positif, le perfectif est plus courant : Открой окно! (Ouvre la fenêtre !)",
                ],
                vocabulary: [
                    { word: "не читал", transliteration: "ne chital", translation: "n'a pas lu (jamais)" },
                    { word: "не прочитал", transliteration: "ne prochital", translation: "n'a pas fini de lire" },
                    { word: "Открой!", transliteration: "Otkroy!", translation: "Ouvre ! (impératif pf.)" },
                    { word: "Не открывай!", transliteration: "Ne otkryvay!", translation: "N'ouvre pas ! (impératif impf.)" },
                ],
            },
        ],
        quiz: [
            {
                question: "Quelle est la différence entre « читать » et « прочитать » ?",
                options: [
                    "читать = passé, прочитать = présent",
                    "читать = imperfectif (processus), прочитать = perfectif (résultat)",
                    "читать = perfectif, прочитать = imperfectif",
                ],
                correctIndex: 1,
                explanation: "« читать » est l'imperfectif (processus, action en cours), « прочитать » est le perfectif (action achevée, résultat).",
            },
            {
                question: "Comment dit-on « Je lirai ce livre demain » (en entier) ?",
                options: [
                    "Я буду читать эту книгу завтра",
                    "Я прочитаю эту книгу завтра",
                    "Я читаю эту книгу завтра",
                ],
                correctIndex: 1,
                explanation: "Futur perfectif (action achevée) = conjugaison directe : Я прочитаю.",
            },
            {
                question: "Pour dire « N'ouvre pas la fenêtre ! », quel aspect utiliser ?",
                options: ["Perfectif : Не открой!", "Imperfectif : Не открывай!", "Les deux sont possibles"],
                correctIndex: 1,
                explanation: "À l'impératif négatif, on utilise TOUJOURS l'imperfectif : Не открывай!",
            },
            {
                question: "« Я ___ книгу. » (J'ai lu le livre en entier) — Quel verbe choisir ?",
                options: ["читал", "прочитал", "буду читать"],
                correctIndex: 1,
                explanation: "Action achevée avec résultat = perfectif passé : прочитал.",
            },
            {
                question: "Quel est le perfectif de « делать » (faire) ?",
                options: ["поделать", "сделать", "доделать"],
                correctIndex: 1,
                explanation: "La paire standard est : делать (impf.) → сделать (pf.).",
            },
            {
                question: "Comment former le futur imperfectif de « работать » ?",
                options: ["Я поработаю", "Я буду работать", "Я работаю"],
                correctIndex: 1,
                explanation: "Futur imperfectif = буду + infinitif : Я буду работать.",
            },
        ],
        flashcards: [
            { front: "читать / прочитать", back: "lire (impf. / pf.)", transliteration: "chitat' / prochitat'" },
            { front: "писать / написать", back: "écrire (impf. / pf.)", transliteration: "pisat' / napisat'" },
            { front: "делать / сделать", back: "faire (impf. / pf.)", transliteration: "delat' / sdelat'" },
            { front: "учить / выучить", back: "apprendre (impf. / pf.)", transliteration: "uchit' / vyuchit'" },
            { front: "открывать / открыть", back: "ouvrir (impf. / pf.)", transliteration: "otkryvat' / otkryt'" },
            { front: "брать / взять", back: "prendre (impf. / pf.)", transliteration: "brat' / vzyat'" },
            { front: "говорить / сказать", back: "dire (impf. / pf.)", transliteration: "govorit' / skazat'" },
            { front: "рассказывать / рассказать", back: "raconter (impf. / pf.)", transliteration: "rasskazyvat' / rasskazat'" },
            { front: "показывать / показать", back: "montrer (impf. / pf.)", transliteration: "pokazyvat' / pokazat'" },
            { front: "буду + infinitif", back: "futur imperfectif", transliteration: "budu + infinitif" },
        ],
        matching: [
            { left: "читать", right: "lire (imperfectif)" },
            { left: "прочитать", right: "lire (perfectif)" },
            { left: "делать", right: "faire (imperfectif)" },
            { left: "сделать", right: "faire (perfectif)" },
            { left: "брать", right: "prendre (imperfectif)" },
            { left: "взять", right: "prendre (perfectif)" },
        ],
        fillBlank: [
            {
                sentence: "Я ___ книгу вчера. (lire en entier, résultat)",
                answer: "прочитал",
                hint: "Perfectif passé de « читать »",
            },
            {
                sentence: "Завтра я ___ работать. (travailler, futur imperfectif)",
                answer: "буду",
                hint: "Auxiliaire du futur imperfectif",
            },
            {
                sentence: "Не ___ дверь! (ouvrir, impératif négatif)",
                answer: "открывай",
                hint: "Impératif négatif = imperfectif",
            },
            {
                sentence: "___ окно, пожалуйста! (ouvrir, impératif positif)",
                answer: "Открой",
                hint: "Impératif positif = perfectif",
            },
        ],
    },
};

export default b1Modules;
