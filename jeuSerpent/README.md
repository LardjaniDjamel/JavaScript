## Jeu du Snake en javascript


# Description du projet
-----------------------

Dans ce projet on réalise un jeu de snake en Javascript.

C'est un jeu dans lequel il faut piloter un serpent qui avance tout seul entre 4 murs.

Pour changer sa direction on utilise les touches fléchées du clavier.

Le but du jeu est de faire manger au serpent un maximum de bonbons. Mais attention ! chaque fois qu'il mange une sucrerie, le serpent s'allonge. Si par malheur il touche le mur ou touche son propre corps la partie est perdue.


# Réalisation :
---------------

Le dessin du jeu se fait sur un élément canvas : c'est une zone de dessin bitmap sur laquelle il est possible de dessiner par programmation.

Le corps du serpent est constitué de plusieurs carrés (5 au départ) dont les positions sont conservées dans un tableau, le premier élément du tableau représentant la tête du serpent.

Pour réaliser l'animation du jeu la fonction boucleJeu est exécutée toutes les 100 millisecondes, à chaque fois la nouvelle position du snake est calculée et le jeu est entièrement redessiné sur le canvas ce qui donne l'illusion du mouvement.

Un gestionnaire d'événements qui réagit à l'appui sur les touches fléchées du clavier permet de modifier les paramètres de déplacement du serpent. 


#Réalisé par Djamel LARDJANI ©2019
