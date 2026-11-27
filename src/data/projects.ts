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
        "Mission en entreprise (secteur assurance et assistance, nom confidentiel), juin à septembre 2026. Code propriétaire : je peux le détailler en entretien mais pas le publier.",
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
        'Commercial work at a company in insurance and assistance (name confidential), June to September 2026. Proprietary code: I can walk through it in an interview but cannot publish it.',
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
      'Next.js / React',
      'PostgreSQL',
      'Stripe',
      'Mistral AI',
      'Nginx / Hetzner',
      'Docker',
    ],
    fr: {
      tagline:
        "SaaS B2B en production : l'IA rédige les réponses aux avis Google, dans la langue du client",
      problem:
        "Un commerçant perd une demi-heure par jour à répondre à ses avis Google, et ne pas répondre fait baisser sa note comme sa visibilité locale. Le commerçant colle un avis, le produit rédige en quelques secondes une réponse dans sa langue et au ton de la maison, puis il la relit et la publie sur Google. La synchronisation directe avec Google Business Profile (import des avis et publication) n'est pas encore ouverte : le code d'intégration existe, mais l'accès à l'API doit être accordé par Google.",
      highlights: [
        "Facturation pilotée par l'état serveur : trois formules Stripe, essai de 14 jours sans carte, checkout, portail client et statut d'abonnement qui fait autorité côté back-end plutôt que dans l'interface.",
        "Client HTTP durci, visible dans le bundle public : rafraîchissement de jeton « single-flight » sur cookie httpOnly avec garde anti-boucle, rejeu de la requête après 401, lecture de Retry-After sur 429.",
        "Internationalisation réelle et vérifiable : 876 clés traduites par langue, exactement à parité sur les six locales, cyrillique compris.",
        "Auto-hébergé et administré par moi : Nginx et FastAPI sur un serveur Hetzner en Allemagne, CSP à nonce par requête, HSTS, documentation d'API coupée en production.",
      ],
      metrics: [
        { label: "Langues de l'interface", value: '6' },
        { label: 'Clés traduites par langue', value: '876' },
        { label: 'Formules Stripe en ligne', value: '3' },
      ],
      provenance:
        'Produit personnel en ligne, code fermé. Les chiffres ci-dessus sont relevés dans le code et sur le produit en ligne.',
    },
    en: {
      tagline: 'Live B2B SaaS: AI drafts replies to Google reviews in the customer’s language',
      problem:
        'A local business loses half an hour a day answering Google reviews, and not answering drags down both the rating and local visibility. The owner pastes a review, the product drafts a reply in its language and in the house tone within seconds, and the owner proofreads and posts it on Google. Direct sync with Google Business Profile (importing reviews and publishing) is not open yet: the integration code exists, but Google still has to grant API access.',
      highlights: [
        'Billing driven by server state: three Stripe plans, a 14-day trial with no card, checkout, customer portal, and a subscription status that is authoritative on the back end rather than in the UI.',
        'Hardened HTTP client, visible in the public bundle: single-flight token refresh over an httpOnly cookie with a loop guard, request replay after a 401, and Retry-After handling on a 429.',
        'Real, checkable internationalisation: 876 translated keys per language, at exact parity across all six locales, Cyrillic included.',
        'Self-hosted and administered by me: Nginx and FastAPI on a Hetzner server in Germany, per-request nonce CSP, HSTS, API docs disabled in production.',
      ],
      metrics: [
        { label: 'Interface languages', value: '6' },
        { label: 'Translated keys per language', value: '876' },
        { label: 'Live Stripe plans', value: '3' },
      ],
      provenance:
        'Personal product, live, closed source. The figures above are read from the code and from the live product.',
    },
  },
  {
    slug: 'drone-watch',
    name: 'Drone Watch',
    category: 'ml',
    status: 'personal',
    featured: true,
    repoUrl: 'https://github.com/Nostradam4ik/drone-watch',
    stack: [
      'Python',
      'FastAPI',
      'NumPy / SciPy',
      'MQTT (TLS)',
      'WebSocket',
      'MapLibre',
      'Qdrant',
      'Mistral AI',
      'Docker',
    ],
    film: {
      video: '/media/film-drone-watch.mp4',
      poster: '/media/film-drone-watch.jpg',
      alt: {
        fr: "Film de 34 secondes : le tableau de bord sur une carte 3D de Paris, des pistes de drones fusionnées à partir de trois capteurs, le dossier d'une cible, le parc de capteurs, puis les alertes",
        en: 'A 34-second film: the dashboard on a 3D map of Paris, drone tracks fused from three sensors, a target dossier, the sensor fleet, then the alerts',
      },
    },
    fr: {
      tagline:
        'Détection de drones multi-capteurs : un tracker de fusion, un service temps réel et un tableau de bord sur carte 3D',
      problem:
        "Un radar, un détecteur radiofréquence et un capteur acoustique ne voient pas la même chose : l'un mesure une distance, les deux autres seulement une direction. Le projet fusionne ces mesures en une piste par drone, la place par rapport aux zones à protéger et prévient l'opérateur sans le noyer sous les fausses alertes.",
      highlights: [
        "Le cœur est un tracker de fusion écrit et testé de bout en bout : filtres de Kalman étendus avec modèles de mouvement multiples (IMM), association par distance de Mahalanobis et algorithme hongrois, triangulation à partir des seuls relèvements.",
        "Un service FastAPI avec tableau de bord en temps réel, courtier MQTT sécurisé (TLS et droits par capteur), authentification, journal d'audit, rejeu des incidents, et un nœud de secours qui reprend la main en six secondes au plus.",
        "Une carte 3D hors ligne : le fichier de carte est servi par l'application elle-même, si bien qu'aucun serveur tiers ne voit quelle zone l'opérateur surveille, et que rien ne casse sans Internet.",
        "Mesuré, pas supposé : avec 300 détections aléatoires par capteur, un scan pouvait durer jusqu'à 27 secondes ; après l'optimisation du gating (jacobien analytique, calculs groupés) et des plafonds explicites, il tient en 0,03 seconde environ.",
      ],
      metrics: [
        { label: 'Tests automatisés, ruff et mypy propres', value: '616' },
        { label: 'Types de capteurs fusionnés', value: '3' },
        { label: 'Scan sous 300 détections aléatoires par capteur', value: '27 s → 0,03 s' },
        { label: 'Bascule sur le nœud de secours', value: '≤ 6 s' },
      ],
      provenance:
        "Projet personnel, code public. Toutes les mesures viennent d'un simulateur de capteurs : l'outil d'évaluation (OSPA, RMSE, fausses pistes) est prêt pour des enregistrements réels, mais le dépôt n'en contient aucun, et je ne présente donc pas de précision sur du matériel réel. Les noms de drones du film sont des profils de simulation.",
    },
    en: {
      tagline:
        'Multi-sensor drone detection: a fusion tracker, a real-time service and a dashboard on a 3D map',
      problem:
        "A radar, a radio-frequency detector and an acoustic sensor do not see the same thing: one measures a range, the other two only a bearing. The project fuses those measurements into one track per drone, places it against the zones to protect and alerts the operator without drowning them in false alarms.",
      highlights: [
        'The core is a fusion tracker written and tested end to end: extended Kalman filters with interacting multiple models (IMM), Mahalanobis-distance association with the Hungarian algorithm, and triangulation from bearings alone.',
        'A FastAPI service with a real-time dashboard, a secured MQTT broker (TLS and per-sensor permissions), authentication, an audit log, incident replay, and a standby node that takes over within six seconds at most.',
        'An offline 3D map: the map file is served by the application itself, so no third-party server sees which area the operator is watching, and nothing breaks without Internet.',
        'Measured, not assumed: with 300 random detections per sensor a scan could take up to 27 seconds; after optimising the gating (analytic Jacobian, batched computations) and adding explicit ceilings, it takes about 0.03 seconds.',
      ],
      metrics: [
        { label: 'Automated tests, ruff and mypy clean', value: '616' },
        { label: 'Sensor types fused', value: '3' },
        { label: 'Scan under 300 random detections per sensor', value: '27 s → 0.03 s' },
        { label: 'Failover to the standby node', value: '≤ 6 s' },
      ],
      provenance:
        'Personal project, public code. Every measurement comes from a sensor simulator: the evaluation tool (OSPA, RMSE, false tracks) is ready for real recordings, but the repository holds none, so I do not claim accuracy on real hardware. The drone names in the film are simulation profiles.',
    },
  },
  {
    slug: 'miniinfer',
    name: 'MiniInfer',
    category: 'ml',
    status: 'personal',
    featured: true,
    repoUrl: 'https://github.com/Nostradam4ik/miniinfer',
    stack: ['C++17', 'CUDA', 'WMMA', 'CUDA Graphs', 'Nsight Systems', 'PyTorch', 'CMake'],
    film: {
      video: '/media/film-miniinfer.mp4',
      poster: '/media/film-miniinfer.jpg',
      alt: {
        fr: "Rejeu d'une exécution dans un terminal : le modèle continue un début d'histoire. Ce n'est pas une capture d'écran et l'attente du démarrage est raccourcie ; à partir du premier texte généré, le rythme est celui de l'enregistrement",
        en: 'A replay of one run in a terminal: the model continues the start of a story. It is not a screen capture and the startup wait is shortened; from the first generated text on, the timing is as recorded',
      },
    },
    fr: {
      tagline: "Un moteur d'inférence LLM écrit en C++/CUDA, avec ses propres kernels",
      problem:
        "Faire tourner un modèle de langage avec une bibliothèque cache l'essentiel : où part le temps à chaque token. Ce projet d'apprentissage exécute SmolLM2-135M sur GPU avec des kernels écrits pour lui, sans cuDNN et sans PyTorch à l'exécution.",
      highlights: [
        'Les kernels du Transformer : multiplication de matrices, attention avec cache KV, RoPE, RMSNorm, couche MLP et versions fusionnées pour le décodage ; poids en fp16 ou bf16.',
        "Décodage 7,7 fois plus rapide que ma propre version de départ (de 17,0 à 2,2 ms par token, RTX 4060 Laptop), après profilage : pool mémoire, kernel matrice-vecteur, fusion de kernels, poids 16 bits et CUDA Graphs.",
        'Pour le prefill, un bloc d’attention par tête KV : 512 tokens passent de 55,5 à 42,4 ms, avec des logits identiques bit à bit. Un mode optionnel sur les tensor cores est plus rapide mais moins exact.',
        "La limite est mesurée et publiée : à 512 tokens, le prefill de llama.cpp en BF16 reste 2,1 fois plus rapide que mon mode par défaut. En décodage avec CUDA Graph, MiniInfer est devant sur ce petit modèle, ce qui ne montre pas que c'est un meilleur moteur.",
      ],
      metrics: [
        { label: 'Décodage, par rapport à ma version de départ', value: '7,7×' },
        { label: 'Tokens par seconde au décodage (RTX 4060 Laptop)', value: '455' },
        { label: 'Tests, dont des comparaisons avec PyTorch', value: '170' },
        { label: 'Couches du modèle exécutées', value: '30' },
      ],
      provenance:
        "Projet personnel d'apprentissage, code public, développé en partie avec une assistance IA (Claude Code). Mesures faites sur un seul GPU de portable et un seul petit modèle ; la CI n'a pas de GPU, les tests GPU sont lancés en local. Le chiffre de 455 tokens par seconde est la médiane de bench_decode ; le film montre une autre exécution, isolée.",
    },
    en: {
      tagline: 'An LLM inference engine written in C++/CUDA, with its own kernels',
      problem:
        'Running a language model through a library hides the main thing: where the time goes for each token. This learning project runs SmolLM2-135M on a GPU with kernels written for it, with no cuDNN and no PyTorch at runtime.',
      highlights: [
        'The Transformer kernels: matrix multiplication, attention with a KV cache, RoPE, RMSNorm, the MLP layer and fused versions for decoding; fp16 or bf16 weights.',
        'Decoding is 7.7 times faster than my own starting version (17.0 to 2.2 ms per token, RTX 4060 Laptop) after profiling: a memory pool, a matrix-vector kernel, kernel fusion, 16-bit weights and CUDA Graphs.',
        'For prefill, one attention block per KV head: 512 tokens went from 55.5 to 42.4 ms with bitwise identical logits. An optional tensor core mode is faster but less exact.',
        'The limit is measured and published: at 512 tokens, llama.cpp BF16 prefill is still 2.1 times faster than my default mode. In decoding with a CUDA Graph MiniInfer is ahead on this small model, which does not show that it is a better engine.',
      ],
      metrics: [
        { label: 'Decode speed against my starting version', value: '7.7×' },
        { label: 'Decode tokens per second (RTX 4060 Laptop)', value: '455' },
        { label: 'Tests, including comparisons with PyTorch', value: '170' },
        { label: 'Model layers executed', value: '30' },
      ],
      provenance:
        'Personal learning project, public code, developed partly with AI assistance (Claude Code). Measured on a single laptop GPU with a single small model; CI has no GPU, so the GPU tests are run locally. The 455 tokens per second figure is a bench_decode median; the film shows a different, single run.',
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
      ci: 'CI verte au 25 nov. 2026 : 195 tests, build du front et image Docker.',
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
      ci: 'CI green as of 25 Nov 2026: 195 tests, front-end build and Docker image.',
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
    repoUrl: 'https://github.com/Nostradam4ik/fraud-detection-platform',
    stack: ['FastAPI', 'scikit-learn', 'React', 'Terraform', 'Docker', 'PostgreSQL'],
    fr: {
      tagline: 'Détection de fraude bancaire : API de scoring, PWA React, chaîne de sécurité CI',
      ci: 'CI verte au 25 nov. 2026 : 44 tests sur SQLite et PostgreSQL, sécurité, images Docker. Couverture : 35 %.',
      problem:
        "Sur un flux de transactions par carte où moins de 0,2 % sont frauduleuses, tout l'enjeu est d'arbitrer entre attraper la fraude et noyer les analystes sous les faux positifs. L'accuracy n'y veut rien dire : un modèle qui répond toujours « non » atteint déjà 99,8 %.",
      highlights: [
        "Pipeline d'entraînement propre : découpage stratifié, normalisation ajustée sur le seul jeu d'entraînement et SMOTE appliqué après le découpage — donc sans fuite de données vers l'évaluation.",
        "Un workflow de sécurité à 7 jobs, lancé à chaque push et chaque semaine : ZAP (analyse de base et complète), Bandit, Safety, Gitleaks et Trivy, en plus du pipeline CI à 9 jobs dont les étapes de déploiement ne font qu'afficher un message. C'est la partie dont je suis le plus satisfait.",
        "Sécurité applicative réellement implémentée et pas seulement listée : JWT avec rotation du refresh token, 2FA TOTP, RBAC à trois rôles, limitation de débit et journal d'audit.",
      ],
      metrics: [
        { label: 'Tests pytest', value: '44' },
        { label: 'Jobs CI et sécurité', value: '16' },
        { label: "Modules de routes d'API", value: '18' },
        { label: 'Modules Terraform', value: '8' },
      ],
      provenance:
        "Projet personnel sur le jeu de données public Kaggle. Le Terraform est écrit et relu, jamais appliqué sur un compte cloud réel.",
    },
    en: {
      tagline: 'Card fraud detection: scoring API, React PWA, security scanning in CI',
      ci: 'CI green as of 25 Nov 2026: 44 tests on SQLite and PostgreSQL, security scans, Docker images. Coverage: 35%.',
      problem:
        'On a card transaction stream where under 0.2% are fraudulent, the whole problem is trading off catching fraud against drowning analysts in false positives. Accuracy is meaningless here: a model that always answers "no" already scores 99.8%.',
      highlights: [
        'A clean training pipeline: stratified split, scaler fitted on the training set only, and SMOTE applied after the split — so no leakage into evaluation.',
        'A 7-job security workflow, run on every push and every week: ZAP (baseline and full scan), Bandit, Safety, Gitleaks and Trivy, on top of the 9-job CI pipeline whose deployment steps only print a message. This is the part I am happiest with.',
        'Application security actually implemented rather than merely listed: JWT with refresh-token rotation, TOTP 2FA, three-role RBAC, rate limiting and an audit log.',
      ],
      metrics: [
        { label: 'pytest tests', value: '44' },
        { label: 'CI and security jobs', value: '16' },
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
      ci: 'CI verte au 25 nov. 2026 : 46 tests, types du front et image Docker.',
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
        { label: 'Tests automatisés du back end', value: '46' },
      ],
      provenance:
        "Exercice technique d'entretien réalisé en deux jours. Les tests et l'intégration continue ont été ajoutés ensuite ; il n'y a toujours ni authentification, ni persistance, ni test de bout en bout contre un vrai modèle — le README le dit, et je ne le présente pas autrement.",
    },
    en: {
      tagline: 'Photo damage analysis: one JSON contract, three swappable providers',
      ci: 'CI green as of 25 Nov 2026: 46 tests, front-end types and Docker image.',
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
        { label: 'Back-end automated tests', value: '46' },
      ],
      provenance:
        'Interview take-home built in two days. The tests and continuous integration were added afterwards; there is still no auth, no persistence and no end-to-end test against a real model — the README says so, and I do not present it otherwise.',
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
      ci: "CI verte au 25 nov. 2026 : lint, 18 tests, image Docker et tests d'intégration.",
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
      ci: 'CI green as of 25 Nov 2026: lint, 18 tests, Docker image and integration tests.',
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
    stack: ['Flutter', 'Dart', 'Supabase', 'PostgreSQL', 'SQLite', 'Google ML Kit'],
    fr: {
      tagline: 'Suivi de dépenses Flutter : assistant NLP embarqué, OCR de tickets, 10 langues',
      problem:
        "Les applications de budget supposent un salaire fixe et deviennent inutilisables dès que les revenus varient. SmartSpend recalcule un budget quotidien à partir des revenus réellement encaissés, reporte le non-dépensé au lendemain, et continue de fonctionner hors ligne.",
      highlights: [
        "L'assistant conversationnel tourne entièrement sur l'appareil : moteur NLP et base de connaissances écrits en Dart, donc aucun appel réseau, aucun coût d'API et aucune donnée financière transmise à un tiers. C'est un moteur à base de règles, pas un LLM, et c'était le bon choix ici.",
        "Chiffrement AES-256-GCM avec vecteur d'initialisation aléatoire à chaque message et clé rangée dans le stockage sécurisé du système, complété par l'authentification biométrique.",
        "Interface traduite en 10 langues, 161 fichiers Dart et 51 fichiers de tests dans le code.",
      ],
      metrics: [
        { label: "Langues de l'interface", value: '10' },
        { label: 'Fichiers de tests', value: '51' },
        { label: 'Écrans', value: '49' },
      ],
      provenance:
        "Projet personnel. Monétisation intégrée techniquement, jamais publiée sur un store. Code privé, accessible sur demande.",
    },
    en: {
      tagline: 'Flutter expense tracker: on-device NLP assistant, receipt OCR, 10 languages',
      problem:
        'Budget apps assume a fixed salary and fall apart as soon as income varies. SmartSpend recomputes a daily budget from income actually received, rolls unspent money into the next day, and keeps working offline.',
      highlights: [
        'The conversational assistant runs entirely on device: the NLP engine and knowledge base are written in Dart, so there is no network call, no API cost and no financial data leaving the phone. It is a rules engine, not an LLM, and that was the right call here.',
        'AES-256-GCM encryption with a fresh initialisation vector per message and the key held in system secure storage, alongside biometric authentication.',
        'Interface translated into 10 languages, 161 Dart files and 51 test files in the code.',
      ],
      metrics: [
        { label: 'Interface languages', value: '10' },
        { label: 'Test files', value: '51' },
        { label: 'Screens', value: '49' },
      ],
      provenance: 'Personal project. Monetisation wired up technically, never shipped to a store. Private code, available on request.',
    },
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const indexProjects = projects.filter((p) => !p.featured)
