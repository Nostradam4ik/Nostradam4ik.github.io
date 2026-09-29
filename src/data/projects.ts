import type { Project } from '@/lib/types'

/**
 * Every figure below was read off the repository or the live product, never
 * off a README. Claims a repo does not substantiate are absent on purpose —
 * the point of the page is that a reader can check it.
 */
export const projects: Project[] = [
  {
    slug: 'leakia',
    name: 'Leakia',
    category: 'ai-llm',
    status: 'professional',
    featured: true,
    stack: [
      'Mistral AI',
      'RAG (Qdrant)',
      'spaCy',
      'Python',
      'FastAPI',
      'React',
      'TypeScript',
      'Playwright',
    ],
    fr: {
      tagline:
        "Agent IA de pré-diagnostic de fuite d'eau pour assureurs, où le modèle ne décide rien",
      problem:
        "Quand un assuré déclare un dégât des eaux, l'assureur doit trancher vite : quelle gravité, quelle origine, faut-il envoyer un plombier ou un expert. Ce tri se fait au téléphone, prend du temps et dépend de qui décroche. Leakia mène l'entretien à la place de l'humain et rend un rapport exploitable.",
      highlights: [
        "L'architecture tient en une phrase : le modèle ne décide rien. Le protocole métier de 85 questions et le scoring de gravité et d'origine sont exécutés par du code déterministe ; le LLM sert à comprendre une réponse en langage naturel et à rédiger le rapport final.",
        "Pipeline RAG sur Qdrant nourri de rapports d'intervention réels, anonymisés au préalable avec spaCy pour tenir la conformité RGPD, plus l'analyse des photos du sinistre par un modèle de vision.",
        "Plus de 5 000 tests automatisés et une suite Playwright de bout en bout rejouée à chaque livraison, dont la vérification une par une des 286 réponses possibles du protocole.",
      ],
      metrics: [
        { label: 'Questions du protocole métier', value: '85' },
        { label: 'Réponses vérifiées une par une', value: '286' },
        { label: 'Tests automatisés', value: '5 000+' },
        { label: 'Mené en solo, de la conception au rapport PDF', value: '4 mois' },
      ],
      provenance:
        "Mission en entreprise chez Assurance Zen Dépannage, juin à septembre 2026. Code propriétaire : je peux le détailler en entretien mais pas le publier.",
    },
    en: {
      tagline: 'An AI water-leak triage agent for insurers, where the model decides nothing',
      problem:
        'When a policyholder reports water damage, the insurer has to judge quickly: how severe, what origin, plumber or loss adjuster. That triage happens by phone, takes time and depends on who picks up. Leakia runs the interview instead and returns a usable report.',
      highlights: [
        'The architecture fits in one sentence: the model decides nothing. The 85-question business protocol and the severity/origin scoring run as deterministic code; the LLM is there to understand a free-text answer and to write the final report.',
        'A RAG pipeline on Qdrant fed with real intervention reports, anonymised up front with spaCy to stay GDPR-compliant, plus vision-model analysis of the claim photos.',
        'Over 5,000 automated tests and an end-to-end Playwright suite replayed on every release, including one-by-one verification of all 286 possible protocol answers.',
      ],
      metrics: [
        { label: 'Business-protocol questions', value: '85' },
        { label: 'Answers verified one by one', value: '286' },
        { label: 'Automated tests', value: '5,000+' },
        { label: 'Built solo, from design to PDF report', value: '4 months' },
      ],
      provenance:
        'Commercial work at Assurance Zen Dépannage, June to September 2026. Proprietary code: I can walk through it in an interview but cannot publish it.',
    },
  },
  {
    slug: 'ai-review-responder',
    name: 'AI Review Responder',
    category: 'ai-llm',
    status: 'production',
    featured: true,
    liveUrl: 'https://aireviewresponder.dev',
    stack: [
      'FastAPI',
      'React',
      'PostgreSQL',
      'Stripe',
      'Google Business Profile API',
      'Groq — llama-3.3-70b',
      'Nginx / Hetzner',
      'Docker',
    ],
    fr: {
      tagline:
        "SaaS B2B en production : l'IA rédige et publie les réponses aux avis Google, en 6 langues",
      problem:
        "Un commerçant perd une demi-heure par jour à répondre à ses avis Google, et ne pas répondre fait baisser sa note comme sa visibilité locale. Le produit connecte la fiche Google Business Profile, génère une réponse dans la langue de l'avis et la publie, après validation ou automatiquement.",
      highlights: [
        "Facturation pilotée par l'état serveur : trois formules Stripe, essai de 14 jours sans carte, checkout, portail client et statut d'abonnement qui fait autorité côté back-end plutôt que dans l'interface.",
        "Client HTTP durci, visible dans le bundle public : rafraîchissement de jeton « single-flight » sur cookie httpOnly avec garde anti-boucle, rejeu de la requête après 401, lecture de Retry-After sur 429.",
        "Internationalisation réelle et vérifiable : 728 clés traduites par langue, exactement à parité sur les six locales, cyrillique compris.",
        "Auto-hébergé et administré par moi : Nginx et FastAPI sur un serveur Hetzner en Allemagne, CSP à nonce par requête, HSTS, documentation d'API coupée en production.",
      ],
      metrics: [
        { label: "Langues de l'interface", value: '6' },
        { label: 'Clés traduites par langue', value: '728' },
        { label: 'Routes API consommées par le front', value: '43' },
        { label: 'Formules Stripe en ligne', value: '3' },
      ],
      provenance:
        'Produit personnel en ligne, code fermé. Les chiffres ci-dessus sont relevés sur la surface publique en production.',
    },
    en: {
      tagline: 'Live B2B SaaS: AI drafts and publishes Google review replies in six languages',
      problem:
        'A local business loses half an hour a day answering Google reviews, and not answering drags down both the rating and local visibility. The product connects the Google Business Profile listing, generates a reply in the language of the review and publishes it, either after approval or automatically.',
      highlights: [
        'Billing driven by server state: three Stripe plans, a 14-day trial with no card, checkout, customer portal, and a subscription status that is authoritative on the back end rather than in the UI.',
        'Hardened HTTP client, visible in the public bundle: single-flight token refresh over an httpOnly cookie with a loop guard, request replay after a 401, and Retry-After handling on a 429.',
        'Real, checkable internationalisation: 728 translated keys per language, at exact parity across all six locales, Cyrillic included.',
        'Self-hosted and administered by me: Nginx and FastAPI on a Hetzner server in Germany, per-request nonce CSP, HSTS, API docs disabled in production.',
      ],
      metrics: [
        { label: 'Interface languages', value: '6' },
        { label: 'Translated keys per language', value: '728' },
        { label: 'API routes consumed by the front end', value: '43' },
        { label: 'Live Stripe plans', value: '3' },
      ],
      provenance:
        'Personal product, live, closed source. The figures above are read off the public production surface.',
    },
  },
  {
    slug: 'iam-gateway',
    name: 'IAM Gateway',
    category: 'infra',
    status: 'academic',
    repoUrl: 'https://github.com/Nostradam4ik/IAM-Gateway',
    stack: ['Python', 'FastAPI', 'Docker Compose', 'MidPoint', 'LDAP', 'PostgreSQL', 'React'],
    fr: {
      tagline: "Provisionnement d'identités multi-cibles piloté par règles, sur 14 conteneurs",
      problem:
        "Créer les comptes d'un nouvel arrivant impose de ressaisir les mêmes informations dans l'annuaire LDAP, l'ERP, la base applicative et le SSO, avec des conventions de nommage différentes partout. La passerelle centralise la source de vérité et pousse les comptes vers chaque cible à partir de règles déclaratives.",
      highlights: [
        "Un docker-compose de 14 conteneurs monte un environnement IAM complet : MidPoint, OpenLDAP, Keycloak, Odoo et quatre bases PostgreSQL séparées.",
        "41 objets MidPoint versionnés en XML — ressources, rôles métier, templates utilisateur, tâches de synchronisation : l'infrastructure d'identité est elle-même du code relu en revue.",
        "Moteur de règles Jinja2 en environnement sandboxé, quatre types de règles exécutées par priorité, chaque règle réinjectant son résultat dans le contexte de la suivante.",
        "Durcissement livré en pull requests dédiées : garde anti-injection sur les identifiants SQL, limitation de débit Redis à l'authentification, vérification TLS et retry sur les appels MidPoint.",
      ],
      metrics: [
        { label: 'Services orchestrés', value: '14' },
        { label: 'Connecteurs de provisionnement', value: '4' },
        { label: 'Objets MidPoint versionnés', value: '41' },
        { label: "Modules d'API REST", value: '14' },
      ],
      provenance:
        'Projet universitaire (SAÉ, UPEC), réalisé dans le cadre de la mission Nexus IA & Atos. Données 100 % synthétiques, aucune donnée client.',
    },
    en: {
      tagline: 'Rule-driven multi-target identity provisioning across a 14-container stack',
      problem:
        'Onboarding one employee means retyping the same details into the LDAP directory, the ERP, the application database and the SSO, each with its own naming convention. The gateway centralises the source of truth and pushes accounts to every target from declarative rules.',
      highlights: [
        'A 14-container docker-compose brings up a complete IAM environment: MidPoint, OpenLDAP, Keycloak, Odoo and four separate PostgreSQL databases.',
        '41 MidPoint objects versioned as XML — resources, business roles, user templates, sync tasks: the identity infrastructure is itself reviewable code.',
        'A sandboxed Jinja2 rules engine with four rule types executed by priority, each rule feeding its result into the next one’s context.',
        'Hardening shipped as dedicated pull requests: SQL identifier injection guards, Redis rate limiting on authentication, TLS verification and retries on MidPoint calls.',
      ],
      metrics: [
        { label: 'Orchestrated services', value: '14' },
        { label: 'Provisioning connectors', value: '4' },
        { label: 'Versioned MidPoint objects', value: '41' },
        { label: 'REST API modules', value: '14' },
      ],
      provenance:
        'University project (SAÉ, UPEC), carried out alongside the Nexus IA & Atos assignment. Fully synthetic data, no customer data.',
    },
  },
  {
    slug: 'devmetrics',
    name: 'DevMetrics',
    category: 'fullstack',
    status: 'personal',
    repoUrl: 'https://github.com/Nostradam4ik/devmetrics',
    stack: ['Python', 'FastAPI', 'Next.js', 'PostgreSQL', 'Celery / Redis', 'Docker', 'CI/CD'],
    fr: {
      tagline: "Analytics d'équipe de développement : 4 microservices, 195 tests automatisés",
      problem:
        "Pour savoir si la vélocité d'une équipe baisse, où s'accumule le temps de cycle des pull requests ou qui porte seul la charge de revue, il faut croiser les données GitHub à la main. DevMetrics les ingère en continu et les restitue en tendances, anomalies et rapports exportables.",
      highlights: [
        "Quatre services FastAPI indépendants — authentification, ingestion, analyse, IA — partagent PostgreSQL et Redis, orchestrés avec Celery et Nginx dans un compose de 10 conteneurs.",
        "195 tests automatisés vérifiés dans le dépôt : 160 fonctions pytest réparties sur les quatre services et 35 tests Vitest côté interface.",
        "Le module d'analyse est écrit sans aucune dépendance : régression par moindres carrés, z-score, bornes IQR, prédiction de vélocité — le tout couvert par 58 tests unitaires incluant les cas dégénérés.",
      ],
      metrics: [
        { label: 'Microservices', value: '4' },
        { label: 'Tests automatisés', value: '195' },
        { label: 'Conteneurs orchestrés', value: '10' },
        { label: 'Workflows CI/CD', value: '3' },
      ],
      provenance: 'Projet personnel. Déployable et documenté, mais pas hébergé en ligne.',
    },
    en: {
      tagline: 'Dev-team analytics: 4 microservices, 195 automated tests',
      problem:
        'Working out whether a team’s velocity is dropping, where pull-request cycle time accumulates, or who is carrying review load alone, means cross-referencing GitHub data by hand. DevMetrics ingests it continuously and returns trends, anomalies and exportable reports.',
      highlights: [
        'Four independent FastAPI services — auth, ingestion, analytics, AI — share PostgreSQL and Redis, orchestrated with Celery and Nginx in a 10-container compose file.',
        '195 automated tests verified in the repository: 160 pytest functions across the four services and 35 Vitest tests on the front end.',
        'The analytics module is written with zero dependencies: least-squares regression, z-scores, IQR bounds, velocity prediction — all covered by 58 unit tests including degenerate cases.',
      ],
      metrics: [
        { label: 'Microservices', value: '4' },
        { label: 'Automated tests', value: '195' },
        { label: 'Orchestrated containers', value: '10' },
        { label: 'CI/CD workflows', value: '3' },
      ],
      provenance: 'Personal project. Deployable and documented, but not hosted online.',
    },
  },
  {
    slug: 'fraud-detection',
    name: 'Fraud Detection Platform',
    category: 'fullstack',
    status: 'personal',
    repoUrl: 'https://github.com/Nostradam4ik/fraud-detection-ml-orignial',
    stack: ['FastAPI', 'scikit-learn', 'React', 'Terraform', 'Docker', 'PostgreSQL'],
    fr: {
      tagline: 'Détection de fraude bancaire : API de scoring, PWA React, chaîne de sécurité CI',
      problem:
        "Sur un flux de transactions par carte où moins de 0,2 % sont frauduleuses, tout l'enjeu est d'arbitrer entre attraper la fraude et noyer les analystes sous les faux positifs. L'accuracy n'y veut rien dire : un modèle qui répond toujours « non » atteint déjà 99,8 %.",
      highlights: [
        "Pipeline d'entraînement propre : découpage stratifié, normalisation ajustée sur le seul jeu d'entraînement et SMOTE appliqué après le découpage — donc sans fuite de données vers l'évaluation.",
        "Un workflow de sécurité planifié à 7 jobs : ZAP, Semgrep, Trivy, CodeQL et détection de secrets, en plus du pipeline CI à 4 jobs. C'est la partie dont je suis le plus satisfait.",
        "Sécurité applicative réellement implémentée et pas seulement listée : JWT avec rotation du refresh token, 2FA TOTP, RBAC à trois rôles, limitation de débit et journal d'audit.",
      ],
      metrics: [
        { label: 'Tests pytest', value: '44' },
        { label: 'Jobs CI et sécurité', value: '11' },
        { label: "Modules de routes d'API", value: '18' },
        { label: 'Modules Terraform', value: '8' },
      ],
      provenance:
        "Projet personnel sur le jeu de données public Kaggle. Le Terraform est écrit et relu, jamais appliqué sur un compte cloud réel.",
    },
    en: {
      tagline: 'Card fraud detection: scoring API, React PWA, security scanning in CI',
      problem:
        'On a card transaction stream where under 0.2% are fraudulent, the whole problem is trading off catching fraud against drowning analysts in false positives. Accuracy is meaningless here: a model that always answers "no" already scores 99.8%.',
      highlights: [
        'A clean training pipeline: stratified split, scaler fitted on the training set only, and SMOTE applied after the split — so no leakage into evaluation.',
        'A scheduled 7-job security workflow: ZAP, Semgrep, Trivy, CodeQL and secret detection, on top of the 4-job CI pipeline. This is the part I am happiest with.',
        'Application security actually implemented rather than merely listed: JWT with refresh-token rotation, TOTP 2FA, three-role RBAC, rate limiting and an audit log.',
      ],
      metrics: [
        { label: 'pytest tests', value: '44' },
        { label: 'CI and security jobs', value: '11' },
        { label: 'API route modules', value: '18' },
        { label: 'Terraform modules', value: '8' },
      ],
      provenance:
        'Personal project on the public Kaggle dataset. The Terraform is written and reviewed, never applied to a real cloud account.',
    },
  },
  {
    slug: 'photo-damage-analyzer',
    name: 'Photo Damage Analyzer',
    category: 'ai-llm',
    status: 'takehome',
    repoUrl: 'https://github.com/Nostradam4ik/photo-damage-analyzer',
    stack: ['Python', 'FastAPI', 'Pydantic', 'React Native / Expo', 'TypeScript', 'Docker'],
    fr: {
      tagline: 'Analyse de dommages sur photo : un contrat JSON, trois fournisseurs interchangeables',
      problem:
        "Faire décrire des dégâts par un modèle de vision est facile ; obtenir une réponse exploitable par un programme ne l'est pas. Le projet transforme une à trois photos en un objet JSON stable que le mobile peut afficher sans jamais deviner.",
      highlights: [
        "Un seul schéma Pydantic sert de contrat entre la réponse du modèle et la réponse HTTP, et le frontend le reflète dans ses types — une divergence de champ casse la compilation TypeScript avant d'atteindre l'utilisateur.",
        "Trois fournisseurs derrière une seule variable d'environnement : Groq réutilise le client compatible OpenAI, Anthropic passe par un forçage d'outil pour obtenir un JSON valide.",
        "Le drapeau « il me faut plus de photos » renvoyé par le modèle est systématiquement écrasé par la comparaison au seuil de confiance : la règle métier fait autorité, pas l'avis du modèle.",
      ],
      metrics: [
        { label: 'Fournisseurs LLM interchangeables', value: '3' },
        { label: 'Champs du contrat JSON validés', value: '8' },
        { label: 'Seuil de confiance appliqué côté serveur', value: '0,65' },
      ],
      provenance:
        "Exercice technique d'entretien réalisé en deux jours. Aucun test automatisé, ni authentification, ni persistance — le README le dit, et je ne le présente pas autrement.",
    },
    en: {
      tagline: 'Photo damage analysis: one JSON contract, three swappable providers',
      problem:
        'Getting a vision model to describe damage is easy; getting an answer a program can act on is not. The project turns one to three photos into a stable JSON object the mobile app can render without ever guessing.',
      highlights: [
        'A single Pydantic schema is the contract between the model output and the HTTP response, mirrored in the front-end types — a field mismatch breaks the TypeScript build before it can reach a user.',
        'Three providers behind one environment variable: Groq reuses the OpenAI-compatible client, Anthropic goes through forced tool use to guarantee valid JSON.',
        'The model’s own "I need more photos" flag is always overridden by the confidence-threshold comparison: the business rule is authoritative, not the model’s opinion.',
      ],
      metrics: [
        { label: 'Swappable LLM providers', value: '3' },
        { label: 'Validated JSON contract fields', value: '8' },
        { label: 'Server-side confidence threshold', value: '0.65' },
      ],
      provenance:
        'Interview take-home built in two days. No automated tests, no auth, no persistence — the README says so, and I do not present it otherwise.',
    },
  },
  {
    slug: 'skypredict',
    name: 'SkyPredict',
    category: 'ml',
    status: 'personal',
    repoUrl: 'https://github.com/Nostradam4ik/skypredict',
    stack: ['FastAPI', 'XGBoost', 'SHAP', 'scikit-learn', 'React', 'Docker'],
    fr: {
      tagline: 'Pipeline ML de prédiction de retards aériens, classification puis régression',
      problem:
        "Deux heures avant le départ, ni le passager ni l'opérateur ne savent si un vol partira en retard ni de combien. Le pipeline répond aux deux questions à partir des seules informations réellement disponibles à cet instant.",
      highlights: [
        "40 variables construites à la main : encodage cyclique de l'heure, du jour et du mois, indicateurs météo aux deux aéroports, taux de retard historiques par compagnie et par créneau.",
        "Une seule source de vérité pour la liste des variables, partagée entre l'entraînement et le service d'inférence — la cause la plus fréquente de dérive train/serve est éliminée à la racine.",
        "Chaque prédiction est accompagnée de son explication SHAP, et les variables indisponibles deux heures avant le vol sont exclues du jeu d'entraînement par construction.",
      ],
      metrics: [
        { label: 'Variables en entrée du modèle', value: '40' },
        { label: 'Tests automatisés', value: '18' },
        { label: 'Jobs du pipeline CI', value: '5' },
      ],
      provenance:
        "Projet personnel. Le modèle est validé sur un jeu de données synthétique, pas sur des vols réels : c'est l'architecture du pipeline qui est l'objet du projet, pas la performance.",
    },
    en: {
      tagline: 'A flight-delay ML pipeline: staged classifier, then regressor',
      problem:
        'Two hours before departure, neither the passenger nor the operator knows whether a flight will be late, or by how much. The pipeline answers both questions using only what is genuinely available at that moment.',
      highlights: [
        '40 hand-built features: cyclical encoding of hour, day and month, weather severity indicators at both airports, historical delay rates by carrier and by slot.',
        'One single source of truth for the feature list, shared between training and the inference service — the most common cause of train/serve skew is removed at the root.',
        'Every prediction ships with its SHAP explanation, and features unavailable two hours before departure are excluded from the training set by construction.',
      ],
      metrics: [
        { label: 'Model input features', value: '40' },
        { label: 'Automated tests', value: '18' },
        { label: 'CI pipeline jobs', value: '5' },
      ],
      provenance:
        'Personal project. The model is validated on a synthetic dataset, not on real flights: the pipeline architecture is the point here, not the score.',
    },
  },
  {
    slug: 'smartspend',
    name: 'SmartSpend',
    category: 'mobile',
    status: 'personal',
    repoUrl: 'https://github.com/Nostradam4ik/MobApp',
    stack: ['Flutter', 'Dart', 'Supabase', 'PostgreSQL', 'SQLite', 'Google ML Kit'],
    fr: {
      tagline: 'Suivi de dépenses Flutter : assistant NLP embarqué, OCR de tickets, 10 langues',
      problem:
        "Les applications de budget supposent un salaire fixe et deviennent inutilisables dès que les revenus varient. SmartSpend recalcule un budget quotidien à partir des revenus réellement encaissés, reporte le non-dépensé au lendemain, et continue de fonctionner hors ligne.",
      highlights: [
        "L'assistant conversationnel tourne entièrement sur l'appareil : moteur NLP et base de connaissances écrits en Dart, donc aucun appel réseau, aucun coût d'API et aucune donnée financière transmise à un tiers. C'est un moteur à base de règles, pas un LLM, et c'était le bon choix ici.",
        "Chiffrement AES-256-GCM avec vecteur d'initialisation aléatoire à chaque message et clé rangée dans le stockage sécurisé du système, complété par l'authentification biométrique.",
        "Interface traduite en 10 langues, 161 fichiers Dart et 51 fichiers de tests dans le dépôt.",
      ],
      metrics: [
        { label: "Langues de l'interface", value: '10' },
        { label: 'Fichiers de tests', value: '51' },
        { label: 'Écrans', value: '49' },
      ],
      provenance:
        "Projet personnel. Monétisation intégrée techniquement, jamais publiée sur un store.",
    },
    en: {
      tagline: 'Flutter expense tracker: on-device NLP assistant, receipt OCR, 10 languages',
      problem:
        'Budget apps assume a fixed salary and fall apart as soon as income varies. SmartSpend recomputes a daily budget from income actually received, rolls unspent money into the next day, and keeps working offline.',
      highlights: [
        'The conversational assistant runs entirely on device: the NLP engine and knowledge base are written in Dart, so there is no network call, no API cost and no financial data leaving the phone. It is a rules engine, not an LLM, and that was the right call here.',
        'AES-256-GCM encryption with a fresh initialisation vector per message and the key held in system secure storage, alongside biometric authentication.',
        'Interface translated into 10 languages, 161 Dart files and 51 test files in the repository.',
      ],
      metrics: [
        { label: 'Interface languages', value: '10' },
        { label: 'Test files', value: '51' },
        { label: 'Screens', value: '49' },
      ],
      provenance: 'Personal project. Monetisation wired up technically, never shipped to a store.',
    },
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const indexProjects = projects.filter((p) => !p.featured)
