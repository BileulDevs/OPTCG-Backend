## Commits — Convention

Le projet suit [Conventional Commits](https://www.conventionalcommits.org/),
validé automatiquement par commitlint via le hook `commit-msg`.

Format : `type(scope?): description`

Exemples : `feat: ajoute le module auth`, `fix(decks): corrige le comptage des cartes`

### Types autorisés

| Type       | Usage                                                              |
| ---------- | ------------------------------------------------------------------ |
| `feat`     | Nouvelle fonctionnalité                                            |
| `fix`      | Correction de bug                                                  |
| `chore`    | Maintenance, tâches diverses (hors code applicatif)                |
| `config`   | Modification de configuration                                      |
| `docs`     | Documentation uniquement                                           |
| `refactor` | Refonte du code sans changement de comportement                    |
| `test`     | Ajout ou correction de tests                                       |
| `ci`       | Intégration continue (pipelines, workflows)                        |
| `perf`     | Amélioration de performance                                        |
| `build`    | Système de build ou dépendances                                    |
| `revert`   | Annulation d'un commit précédent                                   |
| `style`    | Mise en forme sans impact sur le sens du code (formatage, espaces) |

Un commit dont le type n'est pas dans cette liste est **rejeté** par commitlint.

# Stratégie de suppression et de conservation des données

## Principe directeur

Un **match est un fait historique** : il doit rester lisible et exploitable
statistiquement même si les entités qu'il référence (deck, leader) sont
supprimées par la suite. L'historique est la valeur centrale du produit.

## Règles de suppression

### Suppression de compte → purge complète (RGPD)

Supprimer un compte efface **réellement** toutes les données personnelles
associées : decks, tournois, matchs, refresh tokens (via `onDelete: Cascade`).

- Conforme au droit à l'effacement (RGPD).
- **Pas de soft-delete sur `User`** : conserver des données après une demande
  de suppression nécessiterait une justification légale ; par défaut, on purge.

### Suppression de deck / tournoi → historique conservé

- Supprimer un **tournoi** supprime ses matchs (`Cascade`) : un match n'a pas
  de vie hors de son tournoi.
- Supprimer un **deck** ne supprime pas les matchs joués avec : le lien
  (`deckId`) passe à `null` (`SetNull`), le match survit.

### Leader → donnée de référence protégée

Un leader utilisé par un deck ne peut pas être supprimé (`Restrict`). Sert de
clé de regroupement stable pour les statistiques.

## Dénormalisation maîtrisée

Pour qu'un match reste lisible après suppression d'un deck/leader, il **fige à
sa création** une copie texte des libellés :

- `playerDeckName` : nom du deck du joueur,
- `playerLeaderName` : nom du leader du joueur,
- `opponentLeaderName` : nom du leader adverse.

Ces copies coexistent avec les clés étrangères (`deckId`, `opponentLeaderId`) :

- **FK** utilisée pour les requêtes riches tant que la référence existe ;
- **snapshot** garantit lisibilité et stats de longue durée si elle disparaît.

## Note RGPD sur `opponentName`

`opponentName` est un libellé libre saisi par l'utilisateur (nom/pseudo de
l'adversaire). Il est purgé avec le compte de l'utilisateur (Cascade). On ne le
propage pas au-delà de ce qui est utile, par minimisation des données.
