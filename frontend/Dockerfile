# Étape 1 : Utiliser une image Node pour construire le projet React
FROM node:20 AS build

# Crée un répertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers package.json et package-lock.json (si existant)
# Cela permet d'installer les dépendances avant de copier tout le code
COPY package*.json ./

# Installe toutes les dépendances du projet (React, Vite, TypeScript, etc.)
RUN npm install

# Copie tout le code source dans le conteneur
COPY . .

# Compile le projet (génère un dossier "dist" prêt à être servi)
RUN npm run build

# Étape 2 : Utiliser Nginx pour servir les fichiers statiques
FROM nginx:latest

# Copie les fichiers construits depuis l'étape précédente
COPY --from=build /app/dist /usr/share/nginx/html

# Expose le port 80 (HTTP)
EXPOSE 80

# Lance Nginx en mode premier plan
CMD ["nginx", "-g", "daemon off;"]
