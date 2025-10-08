# Projet Docker – Application Web React

Langage : React (JavaScript + Vite)

Créer le projet React : 
`npm create vite@latest my-react-app -- --template react && cd my-react-app && npm install && npm run build`

Créer un fichier Dockerfile à la racine du projet.

Transférer le projet sur la VM à l'aide de winscp

Installer Docker sur la VM : 
`apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin`

Vérifier que docker tourne :
`docker run hello-world`

Aller dans le projet :
`cd my-react-app `

Construire l’image Docker : 
`cd my-react-app && docker build -t react-app .`

Lancer le conteneur : 
` docker run -d -p 3000:80 react-app`

Tester dans la VM : 
`lynx http://localhost:3000`

Configurer le port forwarding dans VirtualBox : Paramètres VM → Réseau → Avancé → Redirection de ports  
Nom : React, Protocole : TCP, Port hôte : 3000, Port invité : 3000

Accéder au site depuis la machine locale : ouvrir le navigateur sur `http://localhost:3000`
