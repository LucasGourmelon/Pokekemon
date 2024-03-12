1) Renommer les .json en .js


Différents fichiers JSON : 

pokemon.json : les caractéristiques de base des Pokémons.
● pokemon_type.json : les types de Pokémons.
● pokemon_moves.json : les attaques (qu’on appelle aussi mouvements) que peut
effectuer chaque Pokémon, en fonction de sa forme.
Ces mouvements sont des attaques soit “rapides”, soit "chargées".
● fast_moves.json : le détail des attaques rapides, dont leurs types.
● charged_moves.json : le détail des attaques chargées, dont leurs types.
● type_effectiveness.json : le coefficient multiplicateur appliqué à la force d’une
attaque en fonction de son type et du type du Pokémon qui subit l’attaque.
● cp_multiplier.json : le coefficient multiplicateur appliqué aux caractéristiques
de base d’un Pokémon en fonction de son niveau.
● generation.json : la génération du Pokémon. Jusque fin 2021, il y a eu 8
générations de Pokémons. Chaque génération apporte un ensemble de nouveaux
Pokémons. Annoncée lors du Pokémon Presents du 27 février 2022, la neuvième
génération vient de sortir, mais n’est pas utilisée ici.


Premières consignes : 
Classe "Pokemon"
--> Analyser la structure du pokemon.Json

1. A partir de la description faite plus haut et de votre analyse des structures dans les
fichiers JSON, proposez une classe Pokemon. Prévoyez une méthode toString()
synthétique. Pour simplifier l’indexation, on ne désire modéliser que les Pokémons dont la
forme (attribut form) a pour valeur Normal.
Q2. Concevez une fonction import_pokemon() qui lit la source de données et crée des objets
Pokemon que vous stockerez dans un objet JS dont les clés sont les id des Pokémons.
Cet objet JS sera une variable de classe nommée all_pokemons.


Classe "Type" :
--> Utiliser le fichier pokemon_type.json

À partir des fichiers pokemon_type.json et type_effectiveness.json, proposez une
classe Type. Ce type permettra donc de connaître l’efficacité d’un type d’attaque contre
un type de défenseur. N’oubliez pas la méthode toString(). De même que pour les
Pokémons, on ne gardera que les types des formes dont la valeur est Normal. Une
variable de classes nommée all_types contiendra l’ensemble des types de Pokémons
et sera indexé par le nom du type.
Q2. Complétez la fonction import_pokemon() qui lit la source de données et crée des objets
Type au fur et à mesure que les Pokémons sont importés, si ce type n’est pas déjà dans
all_types. Dans la classe Pokemon, vous devrez faire le lien avec les types.
Q3. Complétez la classe Pokemon avec une méthode getTypes() qui retourne la liste des types
(des objets Type, pas des id ou du JSON !).

Classe "Attaque"
--> Utiliser les fichiers pokemon_moves.json, 


