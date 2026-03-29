# RussoAcadémie – Apprendre le russe pas à pas

Ce dépôt contient le code source du site d’apprentissage du russe **RussoAcadémie**, réalisé avec **React**, **TypeScript**, **Vite**, **shadcn‑ui** et **Tailwind CSS**. Le projet vous permet de découvrir le russe à travers des leçons progressives, l’apprentissage de l’alphabet cyrillique et des articles culturels. Ce site n’est plus rattaché à la plateforme Lovable et est désormais auto‑hébergé.

## Démarrer en local

Pour tester l’application en local sur votre machine :

```sh
# Clonez le dépôt (remplacez par l’URL de votre fork le cas échéant)
git clone <URL_DU_DEPOT>
cd russe-facile-monde
# Installez les dépendances
npm install
# Démarrez le serveur de développement
npm run dev
```

Un serveur de développement Vite s’ouvrira généralement sur `http://localhost:5173/`. Les modifications apportées aux fichiers se rechargent automatiquement.

## Structure du projet

- `src/pages` : contient les pages principales du site (`Home.tsx`, `Courses.tsx`, `Alphabet.tsx`, `Culture.tsx`, `Dashboard.tsx`, etc.).
- `src/components` : regroupe les composants réutilisables comme la barre de navigation (`Navigation.tsx`) et le pied de page (`Footer.tsx`).
- `src/assets` : héberge les images utilisées dans l’interface.
- `public/centralelille-logo.png` : logo de l’École Centrale de Lille utilisé dans la navigation et le pied de page.

## Licence

Ce projet est mis à disposition sous licence libre. Reportez‑vous au fichier `LICENSE` pour plus de détails.