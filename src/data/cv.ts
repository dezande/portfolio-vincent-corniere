/**
 * Contenu du portfolio — extrait du CV de Vincent Cornière.
 * Tout est éditable ici : aucun composant à modifier pour changer le texte.
 */

/** Préfixe un fichier de public/ avec la base du site (sous-dossier sur GitHub Pages). */
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export const profile = {
  firstName: "Vincent",
  lastName: "Cornière",
  fullName: "Vincent Cornière",
  role: "Développeur Ruby on Rails",
  roleLong: "Développeur web back-end",
  intro:
    "Depuis 2015, je conçois des applications SaaS et je les accompagne jusqu'en production : architecture, données, intégrations SSO et infrastructure AWS.",
  photo: asset("img/portrait.svg"),
  email: "vincent.corniere@gmail.com",
  location: "Paris",
  availability: "Non disponible",
};

export const socials = [
  { label: "GitHub", icon: "github", url: "https://github.com" },
  { label: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com" },
];

export const about = {
  title: "Qui suis-je",
  lead:
    "Développeur web back-end spécialisé Ruby on Rails, j'interviens de l'étude des besoins jusqu'à la mise en production.",
  paragraphs: [
    "Depuis 2015, je développe des applications SaaS en Ruby on Rails pour des éditeurs et des agences : plateformes de paris en ligne, portails e-learning, outils métier, back-offices et places de marché. J'aime autant la conception d'un modèle de données propre que la chasse au bug en production.",
  ],
  facts: [
    { k: "Nom", v: "Vincent Cornière" },
    { k: "Poste", v: "Développeur back-end" },
    { k: "Ville", v: "Paris", icon: "pin" },
    { k: "Email", v: "vincent.corniere@gmail.com" },
    { k: "Disponibilité", v: "Non disponible" },
  ],
  counters: [
    { num: 10, suffix: "+", lbl: "Ans d'expérience" },
    { num: 100, suffix: "+", lbl: "SSO intégrés" },
    { num: 20, suffix: "+", lbl: "Projets livrés" },
    { num: 3, suffix: "", lbl: "Entreprises" },
  ],
};

/** Domaines d'intervention (page 1 du CV, formulations corrigées). */
export const expertise = [
  {
    icon: "target",
    title: "Conception & cadrage",
    items: [
      "Étude des besoins et chiffrage",
      "Planification et estimation de charge",
      "Conception et modélisation des données",
      "Audit technique et refonte d'architecture",
    ],
  },
  {
    icon: "code",
    title: "Développement",
    items: [
      "Développement back-end et front-end Ruby on Rails",
      "Intégration de protocoles SSO",
      "Rédaction de jeux de tests et recette",
      "Maintenance applicative et évolutive",
    ],
  },
  {
    icon: "server",
    title: "Infrastructure & production",
    items: [
      "Intégration, déploiement et migrations",
      "Mise en place des serveurs AWS",
      "Migration de Linode vers les services AWS",
      "Mise en production et supervision",
    ],
  },
  {
    icon: "book",
    title: "Documentation & veille",
    items: [
      "Rédaction de documentation technique",
      "Vulgarisation technique pour les équipes métier",
      "Veille sur les technologies open source et web",
      "Méthodologies agiles : Scrum, Kanban",
    ],
  },
];

export const skillGroups = [
  { k: "Langages", v: "Ruby, JavaScript, PHP orienté objet, HTML, CSS, Elixir, SQL, Go" },
  { k: "Back-end", v: "Ruby on Rails (3 à 5), Sinatra, Symfony 2" },
  { k: "Front-end", v: "Bootstrap, Angular, React, Vue.js" },
  { k: "Protocoles SSO", v: "SAML, Shibboleth, CAS, OAuth2" },
  { k: "Bases de données", v: "MySQL, PostgreSQL, MongoDB, Redis" },
  { k: "API tierces", v: "Facebook, Google, Acapture, Twilio" },
  { k: "Infrastructure", v: "AWS, Linode, OVH, Docker" },
  { k: "Serveurs web", v: "NGINX, Apache, Unicorn" },
  { k: "Outils", v: "Git, GitLab CE, Jira, Bugsnag, Kibana, Prometheus, Grafana" },
  { k: "Méthodes", v: "Scrum, Kanban" },
];

export const skillBars = [
  { name: "Ruby on Rails", value: 95 },
  { name: "SSO (SAML, CAS, OAuth2)", value: 92 },
  { name: "SQL & modélisation", value: 88 },
  { name: "AWS & administration serveur", value: 82 },
  { name: "JavaScript / front-end", value: 75 },
  { name: "Docker & déploiement", value: 78 },
];

export const experience = [
  {
    period: "Depuis avril 2018",
    role: "Développeur back-end SSO",
    org: "JobTeaser",
    text: "Référent single sign-on : intégration des fournisseurs d'identité, supervision des connexions et mise en place du protocole OAuth2 dans la codebase.",
    bullets: [
      "Intégration de plus de 100 SSO (SAML, Shibboleth, CAS, OAuth2) dans la codebase",
      "Publication des métadonnées JobTeaser dans les fédérations RENATER, DFN-AAI, SURFconext et eduGAIN",
      "Mise en place d'une surveillance des SSO et des web services (générateur JSON, cron, Prometheus, Grafana)",
      "Intégration d'OAuth2 avec OmniAuth et rédaction des documentations pour les DSI",
      "Monitoring et détection des incidents avec Bugsnag et Kibana",
    ],
    stack: "Ruby on Rails 4, MySQL, Jira, Bugsnag, Kibana, SSO",
  },
  {
    period: "Janvier 2016 — Avril 2018",
    role: "Développeur full-stack Ruby on Rails",
    org: "Prium Solutions",
    text: "Développement d'applications SaaS pour des clients grands comptes : paris en ligne, portails métier, e-learning et outils de gestion.",
    bullets: [
      "Eurochance : application de paris en ligne développée from scratch (site, espace client, back-office à trois rôles)",
      "Prium City et Prium One : interfaces web et mobile de suivi d'activité pour les salariés portés",
      "VTC Solutions : plateforme e-learning de préparation aux examens (abonnements, statistiques, moteur de recherche)",
      "Argus : estimation de reprise de véhicule et back-office Lead Auto avec API BMW et Mercedes",
      "Chanel : algorithme d'optimisation des speed-meetings de mobilité interne",
    ],
    stack: "Ruby on Rails (3 à 5), MySQL, MongoDB, Angular, jQuery, API REST, AWS, NGINX, Unicorn",
  },
  {
    period: "Mars 2015 — Décembre 2015",
    role: "Développeur full-stack Ruby on Rails",
    org: "CBM Web",
    text: "Développement d'applications SaaS et de boutiques en ligne pour les clients de l'agence.",
    bullets: [
      "Travel in Med : refonte responsive d'un réseau social professionnel, chat interne et paiement Merc@net (BNP Paribas)",
      "Parfaite & Satisfaite : comparateur de prestations beauté avec agenda et prise de rendez-vous en ligne",
      "Cooking City : plateforme de cours de cuisine avec inscriptions et paiement PayPal",
      "CBM Store, Sirum, O-Style, L'Univers du 2 roues : boutiques en ligne (Spree Commerce, paiements Webaffaire et PayPal)",
    ],
    stack: "Ruby on Rails 4, MySQL, MongoDB, GitLab CE, jQuery, Bootstrap, Sass",
  },
];

export const education = [
  {
    period: "2014",
    role: "Développeur intégrateur web, option PHP orienté objet",
    org: "IFOCOP — Paris 11e",
    text: "Formation professionnalisante au développement web.",
  },
  {
    period: "2010",
    role: "Génie électrique",
    org: "Université de technologie de Belfort-Montbéliard (UTBM)",
    text: "Formation d'ingénieur, spécialité génie électrique.",
  },
  {
    period: "2008",
    role: "Classe préparatoire TSI",
    org: "Lycée Le Corbusier — Aubervilliers",
    text: "Classe préparatoire technique et sciences de l'ingénieur.",
  },
];

export type Project = {
  id: number;
  title: string;
  cat: string;
  client: string;
  year: string;
  img: string;
  desc: string;
  bullets: string[];
  stack: string[];
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Intégration SSO à grande échelle",
    cat: "Back-end",
    client: "JobTeaser",
    year: "2018 — aujourd'hui",
    img: asset("img/work-1.svg"),
    desc: "Plus de cent fournisseurs d'identité branchés sur la plateforme, plus la supervision qui va avec.",
    bullets: [
      "Intégration et mise à jour des SSO SAML, Shibboleth, CAS et OAuth2",
      "Publication des métadonnées dans RENATER, DFN-AAI, SURFconext et eduGAIN",
      "Schéma de vulgarisation du processus d'intégration pour le service client",
      "Surveillance des SSO et des web services via Prometheus et Grafana",
    ],
    stack: ["Ruby on Rails", "OmniAuth", "MySQL", "Prometheus", "Grafana"],
  },
  {
    id: 2,
    title: "Eurochance — paris en ligne",
    cat: "SaaS",
    client: "Prium Solutions",
    year: "2016 — 2018",
    img: asset("img/work-2.svg"),
    desc: "Application de paris en ligne développée en binôme, de la page blanche à la mise en production.",
    bullets: [
      "Site public, espace client et back-office à trois rôles (admin, superviseur, télévendeur)",
      "Connexion aux services de paiement Payvision",
      "Traitements asynchrones avec Sidekiq, emailing et envoi de SMS",
      "Blog intégré pour personnaliser le site public",
    ],
    stack: ["Ruby on Rails", "Sidekiq", "MySQL", "Payvision"],
  },
  {
    id: 3,
    title: "VTC Solutions — e-learning",
    cat: "SaaS",
    client: "Prium Solutions",
    year: "2016 — 2018",
    img: asset("img/work-3.svg"),
    desc: "Plateforme de préparation aux examens pour les chauffeurs VTC.",
    bullets: [
      "Gestion des utilisateurs et des abonnements",
      "Import de fichiers Excel et tableaux de statistiques",
      "Moteur de recherche et design responsive",
      "Tests de montée en charge",
    ],
    stack: ["Ruby on Rails", "MySQL", "Bootstrap"],
  },
  {
    id: 4,
    title: "Argus — estimation & Lead Auto",
    cat: "Web",
    client: "Prium Solutions",
    year: "2016 — 2018",
    img: asset("img/work-4.svg"),
    desc: "Site grand public d'estimation de véhicule et back-office de distribution des leads aux concessionnaires.",
    bullets: [
      "Intégration du formulaire Argus en iframe et gestion des promotions",
      "Envoi asynchrone des leads aux partenaires",
      "API avec BMW et Mercedes, génération XML conforme au XSD fourni",
      "Google Analytics, Kameleoon et design responsive",
    ],
    stack: ["Ruby on Rails", "API REST", "XML/XSD", "Ajax"],
  },
  {
    id: 5,
    title: "Chanel — speed-meetings",
    cat: "Outil métier",
    client: "Prium Solutions",
    year: "2017",
    img: asset("img/work-5.svg"),
    desc: "Outil de planification des speed-meetings dans le cadre de la mobilité interne.",
    bullets: [
      "Algorithme d'optimisation des participants, des places et des déplacements",
      "Gestion des sessions de recrutement et des candidats",
    ],
    stack: ["Ruby on Rails", "Algorithmique"],
  },
  {
    id: 6,
    title: "ENVIE — collecte des déchets",
    cat: "Outil métier",
    client: "Prium Solutions",
    year: "2016 — 2018",
    img: asset("img/work-6.svg"),
    desc: "Suivi des demandes de collecte de déchets pour Éco-systèmes, jusqu'à la facturation.",
    bullets: [
      "Récupération et suivi des demandes de collecte",
      "Gestion des bordereaux et étiquettes pour la facturation",
      "Connexion aux systèmes de pesée et aux imprimantes",
    ],
    stack: ["Ruby on Rails", "MySQL"],
  },
  {
    id: 7,
    title: "Travel in Med",
    cat: "Web",
    client: "CBM Web",
    year: "2015",
    img: asset("img/work-7.svg"),
    desc: "Réseau social pour les professionnels du tourisme, refondu en responsive.",
    bullets: [
      "Chat interne entre les agences et notifications par email",
      "Formulaire d'inscription dynamique et retouche des photos de profil",
      "Export CSV des listes d'agences et gestion de la publicité",
      "Abonnements et paiement en ligne Merc@net (BNP Paribas)",
    ],
    stack: ["Ruby on Rails", "jQuery", "Bootstrap", "Sass"],
  },
  {
    id: 8,
    title: "Parfaite & Satisfaite",
    cat: "Web",
    client: "CBM Web",
    year: "2015",
    img: asset("img/work-8.svg"),
    desc: "Comparateur dédié aux prestations beauté et bien-être.",
    bullets: [
      "Agenda des instituts et prise de rendez-vous en ligne",
      "Comparateur de prix et gestion des commentaires",
      "Notifications pour le professionnel et l'administrateur",
      "Bilan mensuel envoyé par email",
    ],
    stack: ["Ruby on Rails", "MySQL"],
  },
  {
    id: 9,
    title: "Boutiques en ligne",
    cat: "E-commerce",
    client: "CBM Web",
    year: "2015",
    img: asset("img/work-9.svg"),
    desc: "CBM Store, Sirum, O-Style et L'Univers du 2 roues : quatre boutiques, du template au paiement.",
    bullets: [
      "Intégration de templates dans Spree Commerce",
      "Développement des tunnels de commande et de paiement",
      "Paiements PayPal et Webaffaire (Crédit du Nord)",
      "Gestion des promotions et des packs",
    ],
    stack: ["Ruby on Rails", "Spree Commerce", "PayPal"],
  },
];

export const interests = ["Cuisine", "Magie", "Jeux de plateau"];

export type Company = {
  name: string;
  period: string;
  role: string;
  kind: string;
  desc: string;
  clients: string[];
  stack: string[];
};

/** Les entreprises traversées, et les clients servis depuis chacune. */
export const companies: Company[] = [
  {
    name: "JobTeaser",
    period: "Depuis avril 2018",
    role: "Développeur back-end SSO",
    kind: "Éditeur · Recrutement des jeunes diplômés",
    desc: "Plateforme européenne de recrutement pour les étudiants et les jeunes diplômés, connectée aux systèmes d'information des écoles et des universités. J'y suis le référent single sign-on.",
    clients: ["RENATER", "DFN-AAI", "SURFconext", "eduGAIN"],
    stack: ["Ruby on Rails 4", "MySQL", "SAML", "Shibboleth", "CAS", "OAuth2", "Prometheus", "Grafana"],
  },
  {
    name: "Prium Solutions",
    period: "Janvier 2016 — Avril 2018",
    role: "Développeur full-stack Ruby on Rails",
    kind: "ESN · Applications SaaS sur mesure",
    desc: "Développement d'applications métier pour des grands comptes et pour les filiales du groupe Prium : paris en ligne, portails de suivi d'activité, e-learning, outils logistiques et ERP.",
    clients: [
      "Eurochance",
      "ARTE",
      "Prium City",
      "Prium One",
      "VTC Solutions",
      "L'Argus",
      "BMW",
      "Mercedes",
      "ENVIE",
      "Éco-systèmes",
      "Chanel",
      "Prévoyance FER",
      "Laboratoire Cerba",
      "Biopredix",
    ],
    stack: ["Ruby on Rails 3 à 5", "MySQL", "MongoDB", "Angular", "Sidekiq", "AWS", "NGINX", "Unicorn"],
  },
  {
    name: "CBM Web",
    period: "Mars 2015 — Décembre 2015",
    role: "Développeur full-stack Ruby on Rails",
    kind: "Agence web · SaaS et e-commerce",
    desc: "Développement des projets de l'agence : réseaux sociaux professionnels, plateformes de réservation et boutiques en ligne, du développement initial jusqu'à l'intégration des paiements.",
    clients: [
      "Travel in Med",
      "Parfaite & Satisfaite",
      "Cooking City",
      "CBM Store",
      "Sirum",
      "L'Univers du 2 roues",
      "O-Style",
    ],
    stack: ["Ruby on Rails 4", "Spree Commerce", "MySQL", "MongoDB", "GitLab CE", "jQuery", "Sass"],
  },
];

/** Partenaires de paiement et services tiers rencontrés sur ces projets. */
export const partners = [
  "Payvision",
  "PayPal",
  "Merc@net — BNP Paribas",
  "Webaffaire — Crédit du Nord",
  "Twilio",
  "Google Analytics",
  "Kameleoon",
  "Bugsnag",
  "Kibana",
];
