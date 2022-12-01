import random
#variable pour jouer et rejouer
jouer = "oui"

#while jouer = true
while jouer.lower() == "oui" :
    #liste des questions deja pose
    questionPose = []
    while True :
        if len(questionPose) == 0 :
            #random pour trouver la question et la reponse dans des tableaux
            randomQuestion = random.randint(0, 19)
            break
        else :
            c = len(questionPose)
            while c > 0 :
                if questionPose[c] == randomQuestion :
                    randomQuestion = random.randint(0, 19)
                else :
                    c=c+1
            break
    questionPose.append(randomQuestion)

    #liste des questions
    question = ["Dans le monde, combien de personnes vivaient avec le VIH en 2021 ?", "Dans le monde, combien de personnes ont été infectées par le VIH en 2021 ?", 
    "Dans le monde, combien de personnes sont décédées de maladies liées au sida en 2021 ?", "Dans le monde, combien de personnes en 2021 vivaient avec le VIH sans le savoir ?", 
    "Dans le monde, combien de personnes séropositives étaient sos traitement anti-VIH en 2021 ?", "Dans le monde, parmis l'ensemble des personnes infectées quel est le poucentage de femmes et de filles vivant avec le VIH, en 2021 ?", 
    "Dans le monde, parmis toutes les nouvelles infections au VIH, quel est le pourcentage de femmes et de filles, en 2021 ?", "En France, combien de personnes ont découvert leur séropositivité au VIH en 2021?", 
    "En France, combien de cas de sida on été diagnostiqués ?", "En France, combien d'autotests VIH ont été vendus en pharmacie ?",
    "En France, combien de personnes ont réalisé un dépistage à la Chlamydia trachomatis ?", "En France, combien de personnes ont réalisé un dépistage à la gonocoque ?",
    "En France, combien de personnes ont réalisé un dépistage de la syphilis ?", "En France, parmis les personnes qui ont découvert leur séropositivité, quel est le pourcentage d'hommes aillant des rapports avec des hommes (HSH) ?",
    "En France, parmis les personnes infectées par la Chlamydia trachomatis en 2021, quel est le pourcentage de femmes ?", "En France, parmis les personnes infectées par la Syphilis en 2021, quel est le pourcentage d'hommes aillant des rapports avec des hommes (HSH) ?",
    "En France, parmis les personnes infectées par la gonocoque en 2021, quel est le pourcentage d'hommes ?", "En France, quel pourcentage des infections au VIH ont été découvertes à un stade avancé de l’infection ?",
    "Quel est le pourcentage de chance d'être en contact avec une personne infectée par le Papillomavirus si elle est active sexuellement ?", 
    "En France, parmis les personnes infectées par la gonocoque en 2021, quel est le pourcentage d'hommes aillant des rapports avec des hommes (HSH) ?"]
    #liste des reponses
    reponse = [38400000, 2000000, 650000, 6000000, 28700000, 54, 49, 5013, 1062, 65000, 2600000, 2300000, 2400000, 43, 54, 85, 77, 30, 75, 71]
    


    #demande de la reponse de l'utilisateur
    userReponse = int(input(question[randomQuestion]))
    #tant que la reponse de l'utilisateur est different de la reponse
    while userReponse != reponse[randomQuestion] :
        if userReponse < reponse[randomQuestion] :
            print("C'est plus !")
        else :
            print("C'est moins !")
        userReponse = int(input(question[randomQuestion])) #valeur de ce que repond l'utilisateur
    print("C'est la bonne réponse, Bien joué")

    #ajouter la question a la liste des question pose

    jouer = input("Question suivante ?")
    if jouer.lower() != "oui" and jouer.lower() != "non" :
        print("Je n'ai pas compris, je relance")
        jouer = "oui"
