/**
 * The three competencies deepened to level 3 ("Confirmé") in the BUT
 * Informatique parcours "Réalisation d'applications : conception,
 * développement, validation".
 *
 * Each entry is a self-assessment, not a list of achievements: the evidence
 * is there to be checked, and the limit says where the level stops.
 */
export interface Competence {
  id: string
  code: string
  name: { fr: string; en: string }
  /** What the référentiel asks for at level 3, in plain words. */
  expected: { fr: string; en: string }
  /** Checkable evidence, each tied to a real piece of work. */
  evidence: { fr: string[]; en: string[] }
  /** The self-reflective part: what changed in how I work. */
  reflection: { fr: string; en: string }
  /** Where I am not yet at this level, stated plainly. */
  limit: { fr: string; en: string }
}

export const competences: Competence[] = [
  {
    id: 'realiser',
    code: 'C1',
    name: {
      fr: 'Réaliser un développement d’application',
      en: 'Build an application',
    },
    expected: {
      fr: "Au niveau confirmé, il ne s’agit plus d’écrire une application qui fonctionne, mais d’en proposer une dont le comportement est garanti : choisir une architecture, la justifier, et pouvoir démontrer que les règles métier tiennent.",
      en: 'At the confirmed level the point is no longer to write an application that works, but to propose one whose behaviour is guaranteed: to choose an architecture, justify it, and be able to demonstrate that the business rules hold.',
    },
    evidence: {
      fr: [
        "Sur Leakia, j’ai transcrit un protocole métier de 85 questions en catalogue exécutable : 11 étapes, 273 options, un séquenceur déterministe où le même état rend toujours la même question. 94 % des libellés sont ceux du professionnel, mot pour mot, et un test de conformité le vérifie contre le fichier d’origine.",
        "J’ai retiré le verdict au modèle de langage en portant le moteur de score en Python, puis en prouvant l’équivalence par exécution différentielle : le JavaScript d’origine est réellement exécuté sur des états de référence et les deux résultats sont comparés panier par panier.",
        "L’ensemble est tenu par plus de 5 000 contrôles automatisés et une suite Playwright de bout en bout rejouée à chaque livraison, dont la vérification une par une des 286 réponses possibles du protocole.",
        "Hors stage, j’exploite AI Review Responder, un SaaS B2B en production : facturation pilotée par l’état serveur, rafraîchissement de jeton en single-flight, interface à parité exacte sur six langues.",
      ],
      en: [
        'On Leakia I transcribed an 85-question business protocol into an executable catalogue: 11 steps, 273 options, a deterministic sequencer where the same state always returns the same question. 94% of the wordings are the professional’s own, word for word, and a conformance test checks them against the source file.',
        'I took the verdict away from the language model by porting the scoring engine to Python, then proving equivalence through differential execution: the original JavaScript is actually run on reference states and both results are compared bucket by bucket.',
        'The whole thing is held by over 5,000 automated checks and an end-to-end Playwright suite replayed on every release, including one-by-one verification of all 286 possible protocol answers.',
        'Outside the internship I run AI Review Responder, a live B2B SaaS: billing driven by server state, single-flight token refresh, and an interface at exact parity across six languages.',
      ],
    },
    reflection: {
      fr: "Ce que j’ai compris cette année, c’est que la partie difficile d’un développement n’est pas d’écrire la fonctionnalité mais de décider ce qui a le droit de décider. La règle qui a structuré tout Leakia tient en quatre mots : le modèle ne décide rien. Elle m’a coûté du confort, puisque le code déterministe est plus long à écrire qu’un prompt, et elle est la seule raison pour laquelle un assureur peut opposer le résultat. Je choisis maintenant une architecture en cherchant d’abord ce qu’elle rend impossible, pas ce qu’elle rend facile.",
      en: 'What I understood this year is that the hard part of building software is not writing the feature but deciding what is allowed to decide. The rule that shaped all of Leakia fits in four words: the model decides nothing. It cost me comfort, since deterministic code takes longer to write than a prompt, and it is the only reason an insurer can rely on the result. I now choose an architecture by first asking what it makes impossible, not what it makes easy.',
    },
    limit: {
      fr: "Je sais garantir la forme et la reproductibilité d’un résultat. Je n’ai pas encore mesuré la justesse du diagnostic sur des dossiers réels à issue connue : c’est le travail de preuve qui reste, et aucun de mes tests ne s’y substitue.",
      en: 'I know how to guarantee the form and the reproducibility of a result. I have not yet measured diagnostic accuracy on real cases with known outcomes: that is the proof work still owed, and none of my tests replaces it.',
    },
  },
  {
    id: 'optimiser',
    code: 'C2',
    name: {
      fr: 'Optimiser des applications',
      en: 'Optimise applications',
    },
    expected: {
      fr: "Au niveau confirmé, optimiser ne veut pas dire rendre plus rapide : cela veut dire mesurer d’abord, borner les ressources qu’une application peut consommer, et savoir renoncer à une optimisation que la mesure ne soutient pas.",
      en: 'At the confirmed level, optimising does not mean making things faster: it means measuring first, bounding the resources an application may consume, and knowing when to drop an optimisation the measurement does not support.',
    },
    evidence: {
      fr: [
        "Le rapport PDF généré dans le navigateur pesait 47,19 mégaoctets sur une session réelle de cinq photographies, parce que la bibliothèque stockait chaque image en pixels bruts. En embarquant le fichier déjà compressé, il est tombé à 3,63 mégaoctets : treize fois moins, mesuré dans un vrai navigateur et non estimé.",
        "Un audit de mise en production a révélé quatre chemins par lesquels une requête anonyme pouvait immobiliser le service : bombe de décompression, expression régulière quadratique, client de stockage sans délai d’expiration, message d’erreur qui renvoyait l’entrée rejetée. Les quatre sont fermés.",
        "Le plafond de pixels n’est plus un nombre choisi à la main : il est dérivé du budget mémoire du conteneur, et un test lit la limite réelle dans le fichier de déploiement et échoue si quelqu’un modifie l’un des deux sans l’autre.",
        "Sur mon portfolio, j’ai supprimé l’animation d’apparition au défilement après avoir constaté sur une capture que tout le contenu restait invisible pour un moteur d’indexation, une impression ou un aperçu.",
      ],
      en: [
        'The PDF report generated in the browser weighed 47.19 MB on a real five-photo session, because the library stored each image as raw pixels. Embedding the already-compressed file brought it down to 3.63 MB: thirteen times smaller, measured in a real browser rather than estimated.',
        'A production-readiness audit revealed four paths by which an anonymous request could take the service down: a decompression bomb, a quadratic regular expression, a storage client with no timeout, and an error message that echoed the rejected input. All four are closed.',
        'The pixel ceiling is no longer a hand-picked number: it is derived from the container’s memory budget, and a test reads the real limit from the deployment file and fails if anyone changes one without the other.',
        'On my portfolio I removed the scroll-triggered entrance animation after a screenshot showed that all content stayed invisible to an indexer, a print job or a preview.',
      ],
    },
    reflection: {
      fr: "Trois de mes quatre optimisations de performance ont été annulées après mesure, parce que je les avais mesurées sur des entrées que le client ne peut pas produire. C’est la leçon que je retiens le plus : une optimisation sans mesure du chemin nominal n’est pas une optimisation, c’est une hypothèse. J’ai appris aussi qu’un paramètre ne se règle jamais seul — un plafond de pixels et une limite mémoire, chacun raisonnable de son côté, laissaient un fichier de deux kilo-octets tuer le processus. Depuis, je teste la relation entre deux paramètres couplés, pas chaque valeur.",
      en: 'Three of my four performance optimisations were cancelled after measurement, because I had measured them on inputs the client cannot produce. That is the lesson I keep: an optimisation without a nominal-path measurement is not an optimisation, it is a hypothesis. I also learned that a parameter is never tuned alone — a pixel ceiling and a memory limit, each reasonable on its own, let a two-kilobyte file kill the process. Since then I test the relation between two coupled parameters, not each value.',
    },
    limit: {
      fr: "Mes mesures portent sur un poste de développement. Je n’ai jamais observé le comportement du service sous le trafic de plusieurs utilisateurs simultanés, ni sur une infrastructure hébergée : c’est une limite d’exploitation, pas d’analyse.",
      en: 'My measurements come from a development machine. I have never observed the service under the traffic of several simultaneous users, nor on hosted infrastructure: that is a limit of operations, not of analysis.',
    },
  },
  {
    id: 'collaborer',
    code: 'C6',
    name: {
      fr: 'Collaborer au sein d’une équipe informatique',
      en: 'Collaborate within a technical team',
    },
    expected: {
      fr: "Au niveau confirmé, collaborer ne se réduit pas à travailler avec d’autres développeurs : c’est situer son rôle, reconnaître ce qui ne relève pas de soi, et transmettre une question de façon exploitable par quelqu’un dont ce n’est pas le métier.",
      en: 'At the confirmed level, collaborating is not just working with other developers: it is placing your own role, recognising what is not yours to decide, and passing a question on in a form someone outside your field can act on.',
    },
    evidence: {
      fr: [
        "J’étais seul développeur, entouré de trois interlocuteurs non informaticiens : le chef de projet métier auteur du protocole, la représentante du client sur l’usage, et une juriste sur la protection des données. Les questions de la juriste ont modifié l’architecture avant que j’écrive une ligne de code.",
        "Quand la fidélité au questionnaire a révélé quatorze questions sans issue, je ne les ai pas corrigées dans le code. J’ai formulé trois options chiffrées, livré celle qui ne touche pas au protocole, et remonté les deux autres comme décisions métier. Plusieurs restent ouvertes, et c’est la bonne issue.",
        "J’ai traité les décisions des autres comme des livrables : une question par décision, les options, l’option recommandée, le coût, et la conséquence de ne pas trancher.",
        "Deux versions de l’interface conversationnelle ont été rejetées en quelques heures par la représentante du client. J’ai accepté le verdict et reconstruit, au lieu de défendre une architecture qui était techniquement correcte.",
      ],
      en: [
        'I was the only developer, surrounded by three non-technical people: the business lead who wrote the protocol, the client’s representative on usage, and a lawyer on data protection. The lawyer’s questions changed the architecture before I wrote a line of code.',
        'When fidelity to the questionnaire revealed fourteen dead-end questions, I did not fix them in the code. I wrote up three costed options, shipped the one that leaves the protocol untouched, and escalated the other two as business decisions. Several are still open, and that is the right outcome.',
        'I treated other people’s decisions as deliverables: one question per decision, the options, the recommended one, its cost, and the consequence of not deciding.',
        'Two versions of the conversational interface were rejected within hours by the client’s representative. I accepted the verdict and rebuilt, instead of defending an architecture that was technically correct.',
      ],
    },
    reflection: {
      fr: "Ma première réaction, devant une question de l’arbre qui me semblait mal formulée, a été de vouloir la réécrire. C’était une erreur de positionnement : je voyais une formulation, le chef de projet voyait des années de recherche de fuite. La règle que j’ai fini par adopter — un écart entre l’arbre et le code devient une question posée à son auteur, jamais un correctif silencieux — a coûté du temps et des allers-retours, et c’est la seule qui permette de livrer un outil qu’un professionnel accepte de signer. J’ai aussi appris à écrire pour des lecteurs qui ne lisent pas de code : mes 34 documents de conception sont écrits pour la juriste et le client autant que pour un développeur.",
      en: 'My first reaction, faced with a tree question that looked badly worded to me, was to want to rewrite it. That was a positioning error: I saw a wording, the business lead saw years of leak detection. The rule I ended up adopting — a gap between the tree and the code becomes a question asked of its author, never a silent fix — cost time and back-and-forth, and it is the only one that lets you ship a tool a professional will sign off. I also learned to write for readers who do not read code: my 34 design documents are written for the lawyer and the client as much as for a developer.',
    },
    limit: {
      fr: "C’est la compétence où mon expérience est la plus incomplète, et je préfère l’écrire. J’ai collaboré avec des experts d’autres métiers, pas au sein d’une équipe de développeurs : je n’ai jamais fait relire mon code par un pair, ni relu celui de quelqu’un d’autre. J’ai compensé par des audits automatisés dont chaque constat devait survivre à une réfutation, ce qui est utile mais n’est pas une revue par un pair.",
      en: 'This is the competency where my experience is least complete, and I prefer to write that down. I collaborated with experts from other fields, not inside a team of developers: I have never had my code reviewed by a peer, nor reviewed anyone else’s. I compensated with automated audits where every finding had to survive a refutation, which is useful but is not peer review.',
    },
  },
]
