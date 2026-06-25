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
