
const article2_fr = `# Aperçu rapide de notre logiciel

### Page d'accueil - '/'

#### Vue d'ensemble :
La page d'accueil sert de centre principal de l'application, offrant un aperçu de vos transactions financières et un accès rapide à diverses fonctionnalités du système. Après s'être connecté, l'utilisateur est dirigé vers ce tableau de bord où il peut visualiser des résumés de ses données financières, naviguer vers des sections spécifiques et effectuer diverses tâches.

#### Fonctionnalités principales :
- **Vue d'ensemble du tableau de bord** : Obtenez un aperçu rapide de votre situation financière globale, y compris les résumés de solde, les transactions récentes et les notifications.
- **Navigation rapide** : Accédez aux différentes sections de l'application, telles que les livres de transactions, les analyses et le blog, via le panneau de navigation.
- **Personnalisation** : Personnalisez la disposition et l'affichage des éléments de votre tableau de bord selon vos préférences.
- **Notifications et mises à jour** : Consultez les mises à jour récentes ou les notifications liées à votre compte et à vos transactions.

#### Scénarios utilisateur :
- **Scénario 1 : Révision de la vue d'ensemble du tableau de bord**
  - En accédant à la page d'accueil, l'utilisateur voit un résumé de ses données financières, y compris les soldes, les transactions récentes et les indicateurs clés.
  - L'utilisateur peut cliquer sur l'un de ces indicateurs pour accéder à une vue plus détaillée de ces données.

- **Scénario 2 : Navigation vers d'autres sections**
  - Depuis la page d'accueil, l'utilisateur peut utiliser le panneau de navigation pour accéder aux livres de transactions, aux analyses, au blog et à d'autres fonctionnalités.

- **Scénario 3 : Personnalisation du tableau de bord**
  - L'utilisateur décide de réorganiser ou de personnaliser les widgets sur le tableau de bord pour mieux répondre à ses besoins. Il peut glisser et déposer des éléments, ajouter de nouveaux widgets ou supprimer ceux existants.

---

### Livres de transactions - '/books'

#### Vue d'ensemble :
La page des livres de transactions est l'endroit où les utilisateurs gèrent leurs enregistrements financiers. Cette section permet aux utilisateurs de créer, visualiser et gérer plusieurs livres de transactions, chacun contenant des enregistrements détaillés de transactions classées par nature, telles que les revenus et les dépenses.

#### Fonctionnalités principales :
- **Voir les livres de transactions** : Accédez à une liste de tous vos livres de transactions. Chaque livre contient des enregistrements de transactions détaillés.
- **Ajouter un nouveau livre de transactions** : Créez de nouveaux livres de transactions pour mieux organiser vos données financières.
- **Modifier les transactions** : Modifiez les enregistrements de transactions existants pour garantir leur exactitude.
- **Générer des transactions aléatoires** : Remplissez les livres de transactions avec des données aléatoires à des fins de test ou d'exploration.
- **Vue détaillée** : Plongez dans des livres de transactions spécifiques pour consulter ou gérer des transactions individuelles.
- **Ajouter des transactions** : Ajoutez de nouvelles transactions à l'un de vos livres en spécifiant des détails tels que le type de transaction, le montant et les mois applicables.

#### Scénarios utilisateur :
- **Scénario 1 : Visualisation et gestion des livres de transactions**
  - L'utilisateur se rend sur la page des livres de transactions et visualise tous ses livres de transactions listés.
  - Il clique sur un livre spécifique pour voir toutes les transactions qu'il contient.

- **Scénario 2 : Création d'un nouveau livre de transactions**
  - L'utilisateur clique sur le bouton "Ajouter un nouveau livre de transactions", nomme le livre et commence à le remplir de transactions.

- **Scénario 3 : Modification des transactions existantes**
  - L'utilisateur sélectionne une transaction pour mettre à jour ses détails, comme corriger un montant ou changer la nature de la transaction.

- **Scénario 4 : Ajout de nouvelles transactions**
  - L'utilisateur ajoute une nouvelle transaction en sélectionnant le livre, en entrant des détails comme le type de transaction (revenu ou dépense), le montant et les mois concernés.

- **Scénario 5 : Génération de transactions aléatoires**
  - L'utilisateur choisit de générer des transactions aléatoires pour un livre sélectionné, lui permettant de le remplir rapidement de données pour l'analyse ou les tests.

---

### Analyses - '/comparatives'

#### Vue d'ensemble :
La page des analyses fournit une analyse comparative détaillée de vos données financières à travers différents livres de transactions. Les utilisateurs peuvent visualiser des tendances, comparer des budgets et générer des rapports approfondis basés sur leur historique de transactions.

#### Fonctionnalités principales :
- **Analyse comparative** : Comparez les données financières de différents livres de transactions, y compris les soldes initiaux, les revenus totaux, les dépenses totales et les montants de trésorerie finaux.
- **Aperçus graphiques** : Visualisez et interagissez avec des graphiques qui illustrent vos données financières, y compris des graphiques à barres, des courbes, des graphiques circulaires et des cartes thermiques.
- **Vues personnalisables** : Sélectionnez les livres de transactions et les mois que vous souhaitez inclure dans l'analyse.
- **Exportation de données** : Exportez les données analysées et les visualisations pour une utilisation externe, comme dans des présentations ou des rapports.

#### Scénarios utilisateur :
- **Scénario 1 : Visualisation de l'analyse comparative**
  - L'utilisateur sélectionne plusieurs livres de transactions à comparer. Le système affiche un résumé comparatif des indicateurs clés comme le solde initial, les revenus totaux et la trésorerie finale.

- **Scénario 2 : Personnalisation des affichages de graphiques**
  - L'utilisateur sélectionne des mois ou des livres spécifiques à inclure dans l'analyse, affinant les données affichées dans les graphiques.

- **Scénario 3 : Exploration de différents graphiques**
  - L'utilisateur passe d'un type de graphique à l'autre—barres, lignes, circulaires et cartes thermiques—pour explorer différents aspects de ses données financières.

- **Scénario 4 : Exportation des données analytiques**
  - L'utilisateur exporte les résultats de l'analyse sous forme de fichier tableur ou d'image pour une utilisation ultérieure dans des outils externes ou des présentations.

---

### Détails des transactions - '/details'

#### Vue d'ensemble :
La page des détails des transactions permet aux utilisateurs d'approfondir les spécificités des transactions individuelles. Cette page offre une analyse détaillée des transactions, y compris les éléments individuels, les unités de travail et autres sous-composants.

#### Fonctionnalités principales :
- **Décomposition détaillée des transactions** : Visualisez une analyse détaillée d'une transaction sélectionnée, y compris les unités de produit, les unités de travail et d'autres détails financiers.
- **Modifier les détails de la transaction** : Modifiez les composants d'une transaction, comme changer la quantité d'articles ou ajuster les tarifs pour les unités de travail.
- **Voir les graphiques et les tendances** : Visualisez les données transactionnelles détaillées sous différents formats de graphiques pour identifier des modèles ou des tendances.

#### Scénarios utilisateur :
- **Scénario 1 : Révision des informations détaillées sur la transaction**
  - L'utilisateur sélectionne une transaction pour consulter sa décomposition détaillée, y compris les éléments individuels et les unités de travail.

- **Scénario 2 : Modification d'une transaction**
  - L'utilisateur modifie un composant spécifique de la transaction, comme mettre à jour le prix d'un produit ou changer les heures de travail.

- **Scénario 3 : Visualisation des tendances et modèles**
  - L'utilisateur consulte des graphiques qui affichent les tendances et les modèles dans les données transactionnelles, comme les variations de coûts au fil du temps ou la rentabilité des produits.`;

export default article2_fr;
