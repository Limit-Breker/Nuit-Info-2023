import random
choix = ["casserole", "", "", ""]
solution = random.choice(choix)

tentatives = 7
affichage = ""
lettres_trouvees = ""

for l in solution:
  affichage = affichage + "_ "

print(">> Bienvenue dans le pendu <<")

while tentatives > 0:
  proposition = lettres_trouvees
  while proposition in lettres_trouvees:
    print("\nMot à deviner : ", affichage)
    proposition = input("proposez une lettre : ")
    if proposition in lettres_trouvees:
        print("\n\nvous avez déjà propose cela")


  if proposition in solution:
      lettres_trouvees = lettres_trouvees + proposition
      print("-> Bien vu!")
  else:
    tentatives = tentatives - 1
    print("-> Nope\n")
    if tentatives==0:
        print(" ==========Y= ")
    if tentatives<=1:
        print(" ||/       |  ")
    if tentatives<=2:
        print(" ||        0  ")
    if tentatives<=3:
        print(" ||       /|\ ")
    if tentatives<=4:
        print(" ||       /|  ")
    if tentatives<=5:                    
        print("/||           ")
    if tentatives<=6:
        print("==============\n")

  affichage = ""

  for x in solution:
      if x in lettres_trouvees:
          affichage += x + " "
      else:
          affichage += "_ "

  if "_" not in affichage:
      print(">>> Gagné! <<<")
      break

if tentatives == 0:
    print("Vous avez échoué, le mot était",solution)
print("\n    * Fin de la partie *    ")