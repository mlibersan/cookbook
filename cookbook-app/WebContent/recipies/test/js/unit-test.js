// Configuration
var selecteurPGLM = new SelecteurPGLM();
var xmlDoc = null;

QUnit.testStart(function() {
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET","../data/questions.xml",false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML;
});

QUnit.testDone(function() {

});

function assertNombreDeQuestions(questionNodes){
    ok( questionNodes.length  == 5, "Le nombre de questions devrais etre " + 4);
}


test("Lire les libelles d'une question", function() {
    var questionsNode = xmlDoc.getElementsByTagName("questions")[0];
    var questionNodes = questionsNode.getElementsByTagName("question");
    assertNombreDeQuestions(questionNodes);
    for (var i=0;i<questionNodes.length;i++) {
        var questionNode = questionNodes[i];
        var libelles = selecteurPGLM.questionsXMLParser.parseQuestionNodeLibelles(questionNode);

        var testData = new Object();
        testData.questionId = questionNode.getAttribute("id");
        testData.expected = 2;
        testData.result = libelles.length;
        console.log(testData);
        ok( testData.result  == testData.expected, "Le nombre de libelles de la question "+testData.questionId +" devrais etre " + testData.expected);
    }


});

test("Lire les reponses d'une question", function() {
    var questionsNode = xmlDoc.getElementsByTagName("questions")[0];
    var questionNodes = questionsNode.getElementsByTagName("question");
    assertNombreDeQuestions(questionNodes);

    var questionNode = questionNodes[0];

    var reponses = selecteurPGLM.questionsXMLParser.parseQuestionNodeReponses(questionNode);

    var testData = new Object();
    testData.questionId = questionNode.getAttribute("id");
    testData.expected = 3;
    testData.result = reponses.length;
    console.log(testData);
    ok( testData.result  == testData.expected, "Le nombre de reponses devrais etre " + testData.expected);

    var reponse = reponses[0];
    var expectedValeur = "RETRAITE";
    ok( reponse.valeur  == expectedValeur, "Le valeur de la premiere reponse devrais etre " + expectedValeur);


});

test("Lire une reponse avec valeur", function() {
    var questionsNode = xmlDoc.getElementsByTagName("questions")[0];
    var questionNodes = questionsNode.getElementsByTagName("question");
    assertNombreDeQuestions(questionNodes);

    var questionNode = questionNodes[0];
    var reponses = selecteurPGLM.questionsXMLParser.parseQuestionNodeReponses(questionNode);
    var reponse = reponses[0];

    var testData = new Object();
    testData.questionId = questionNode.getAttribute("id");
    testData.expected = "RETRAITE";
    testData.result = reponse.valeur;
    console.log(testData);
    ok( testData.expected  == testData.result, "Le valeur de la premiere reponse a la question "+testData.questionId +" devrais etre " + testData.expected);
});


test("Lire une reponse avec predicat", function() {
    var questionsNode = xmlDoc.getElementsByTagName("questions")[0];
    var questionNodes = questionsNode.getElementsByTagName("question");
    assertNombreDeQuestions(questionNodes);

    var questionNode = questionNodes[1];
    var reponses = selecteurPGLM.questionsXMLParser.parseQuestionNodeReponses(questionNode);
    var reponse = reponses[0];

    var testData = new Object();
    testData.questionId = questionNode.getAttribute("id");
    testData.expected = "{0} >= 50000";
    testData.result = reponse.predicat;
    console.log(testData);
    ok(testData.result.indexOf(testData.expected) != -1, "Le predicat de la premiere reponse a la question "+testData.questionId +" devrais etre " + testData.expected);
});

test("Lire la question suivate d'une reponse", function() {
    var questionsNode = xmlDoc.getElementsByTagName("questions")[0];
    var questionNodes = questionsNode.getElementsByTagName("question");
    assertNombreDeQuestions(questionNodes);

    var questionNode = questionNodes[1];
    var reponses = selecteurPGLM.questionsXMLParser.parseQuestionNodeReponses(questionNode);
    var reponse = reponses[0];

    var testData = new Object();
    testData.questionId = questionNode.getAttribute("id");
    testData.expected = "Q3";
    testData.result = reponse.questionSuivanteId;
    console.log(testData);
    ok( testData.expected  == testData.result, "La question suivante  de la premiere reponse a la question "+testData.questionId +" devrais etre " + testData.expected);
});



test("Lire le type  des reponse d'une question", function() {
    var questionsNode = xmlDoc.getElementsByTagName("questions")[0];
    var questionNodes = questionsNode.getElementsByTagName("question");
    assertNombreDeQuestions(questionNodes);

    var questionNode = questionNodes[1];
    var question = selecteurPGLM.questionsXMLParser.parseQuestionNode(questionNode);


    var testData = new Object();
    testData.questionId = questionNode.getAttribute("id");
    testData.expected = "numerique";
    testData.result = question.typeReponses;
    console.log(testData);
    ok( testData.expected  == testData.result, "Le type de reponses pour pour la question "+testData.questionId +" devrais etre " + testData.expected);
});


test("Lire les libelles d'une reponse", function() {
    var questionsNode = xmlDoc.getElementsByTagName("questions")[0];
    var questionNodes = questionsNode.getElementsByTagName("question");
    assertNombreDeQuestions(questionNodes);


    var questionNode = questionNodes[0];

    var testData = new Object();
    testData.questionId = questionNode.getAttribute("id");

    var reponsesNode = questionNode.getElementsByTagName("reponses")[0];
    var reponseNodes = reponsesNode.getElementsByTagName("reponse");
    ok( reponseNodes.length  == 3, "Le nombre de reponses pour la question "+testData.questionId+" devrais etre " + 3);

    var reponseNode = reponseNodes[0];
    var libelles = selecteurPGLM.questionsXMLParser.parseReponseNodeLibelles(reponseNode);

    testData.expected = 2;
    testData.result = libelles.length;
    console.log(testData);
    ok( testData.result  == testData.expected, "Le nombre de libelles de la premiere reponse  de la question "+testData.questionId +" devrais etre " + testData.expected);
});

test("Lire les caracteristiques d'une reponse", function() {
    var questionsNode = xmlDoc.getElementsByTagName("questions")[0];
    var questionNodes = questionsNode.getElementsByTagName("question");
    assertNombreDeQuestions(questionNodes);


    var questionNode = questionNodes[0];

    var testData = new Object();
    testData.questionId = questionNode.getAttribute("id");

    var reponsesNode = questionNode.getElementsByTagName("reponses")[0];
    var reponseNodes = reponsesNode.getElementsByTagName("reponse");
    ok( reponseNodes.length  == 3, "Le nombre de reponses pour la question "+testData.questionId+" devrais etre " + 3);

    var reponseNode = reponseNodes[0];
    var caracteristiques = selecteurPGLM.questionsXMLParser.parseReponseNodeCaracteristiques(reponseNode);

    testData.expected = 1;
    testData.result = caracteristiques.length;
    console.log(testData);
    ok( testData.result  == testData.expected, "Le nombre de caracteristiques de la premiere reponse  de la question "+testData.questionId +" devrais etre " + testData.expected);

    var testData2 = new Object();
    testData2.questionId = questionNode.getAttribute("id");
    testData2.expected = 1;
    testData2.result = caracteristiques[0].valeurs.length;
    console.log(testData2);
    ok( testData2.result  == testData2.expected, "Le nombre de valeurs de la premeriere caracteristique de la premiere reponse  de la question "+testData2.questionId +" devrais etre " + testData2.expected);


    var testData3 = new Object();
    testData3.questionId = questionNode.getAttribute("id");
    testData3.expected = "REER_CONV";
    testData3.result = caracteristiques[0].valeurs[0];
    console.log(testData3);
    ok( testData3.result  == testData3.expected, "La premiere valeurs de la premeriere caracteristique de la premiere reponse  de la question "+testData3.questionId +" devrais etre " + testData3.expected);

});



test("Lire les questions", function() {
    selecteurPGLM.parseXml(xmlDoc);
    console.log(selecteurPGLM);
    assertNombreDeQuestions(selecteurPGLM.questions);
});

test("Lire le libelle d'une question dans la bonne locale", function() {
    var questionsNode = xmlDoc.getElementsByTagName("questions")[0];
    var questionNodes = questionsNode.getElementsByTagName("question");
    assertNombreDeQuestions(questionNodes);

    var questionNode = questionNodes[1];
    var question = selecteurPGLM.questionsXMLParser.parseQuestionNode(questionNode);


    var testData = new Object();
    testData.questionId = questionNode.getAttribute("id");
    testData.expected = "Choisir le montant à investir en $";
    testData.result = question.description(Locale.FR);
    console.log(testData);
    ok( testData.expected  == testData.result, "Le libelle de la question "+testData.questionId +" en "+Locale.FR+" devrais etre '" + testData.expected+"'");


    var testData2 = new Object();
    testData2.questionId = questionNode.getAttribute("id");
    testData2.expected = "Choisir le montant à investir en $ [EN]";
    testData2.result = question.description(Locale.EN);
    console.log(testData2);
    ok( testData2.expected  == testData2.result, "Le libelle de la question "+testData2.questionId +" en "+Locale.EN+" devrais etre '" + testData2.expected+"'");

});


test("Lire le libelle d'une reponse à une question question dans la bonne locale", function() {
    var questionsNode = xmlDoc.getElementsByTagName("questions")[0];
    var questionNodes = questionsNode.getElementsByTagName("question");
    assertNombreDeQuestions(questionNodes);

    var questionNode = questionNodes[0];
    var question = selecteurPGLM.questionsXMLParser.parseQuestionNode(questionNode);


    var testData = new Object();
    testData.questionId = questionNode.getAttribute("id");
    testData.expected = "D’épargner pour les études de vos enfants";
    testData.result = question.reponses[1].description(Locale.FR);
    console.log(testData);
    ok( testData.expected  == testData.result, "Le libelle de la deuxieme réponse à la question "+testData.questionId +" en "+Locale.FR+" devrais etre '" + testData.expected+"'");


    var testData2 = new Object();
    testData2.questionId = questionNode.getAttribute("id");
    testData2.expected = "D’épargner pour les études de vos enfants [EN]";
    testData2.result = question.reponses[1].description(Locale.EN);
    console.log(testData2);
    ok( testData2.expected  == testData2.result, "Le libelle de la question "+testData2.questionId +" en "+Locale.EN+" devrais etre '" + testData2.expected+"'");

});

test("Obtenir une question à partir d'un id", function() {

    var question = selecteurPGLM.parseXml(xmlDoc);
    var question = selecteurPGLM.getQuestion("Q3");


    var testData = new Object();
    testData.expected = "Q3";
    testData.result = question.id;
    console.log(testData);
    ok( testData.expected  == testData.result, "La question obtenue devrais etre '" + testData.expected+"'");
});

test("Obtenir réponse à une question à partir de sa valeur", function() {

    var question = selecteurPGLM.parseXml(xmlDoc);
    var question = selecteurPGLM.getQuestion("Q3");
    var reponse = selecteurPGLM.getReponse(question,"DE_1_A_3_ANS");


    var testData = new Object();
    testData.expected = "DE_1_A_3_ANS";
    testData.result = reponse.valeur;
    console.log(testData);
    ok( testData.expected  == testData.result, "La reponse à la question devrais etre '" + testData.expected+"'");
});

test("Initier le  formulaire de selection PGLM", function() {

    selecteurPGLM.parseXml(xmlDoc);
    selecteurPGLM.process();
    var questions = selecteurPGLM.formulaire.questions;
    var caracteristiques = selecteurPGLM.formulaire.caracteristiques;

    var testData = new Object();
    testData.expected = 1;
    testData.result = selecteurPGLM.formulaire.questions.length;
    console.log(testData);
    ok( testData.expected  == testData.result, "Le nombre de questions dans le formulaire devrais etre '" + testData.expected+"'");

    var testData2 = new Object();
    testData2.expected = "Q1";
    testData2.result = selecteurPGLM.formulaire.questions[0].id;
    console.log(testData2);
    ok( testData2.expected  == testData2.result, "La premiere questions du formulaire devrais etre '" + testData2.expected+"'");

    var testData3 = new Object();
    testData3.formulaire = selecteurPGLM.formulaire;
    testData3.expected = 0;
    testData3.result = caracteristiques.length;
    console.log(testData3);
    ok( testData3.expected  == testData3.result, "Le nombre de caracteristiques dans le formulaire devrais etre '" + testData3.expected+"'");

});

test("Répondre RETRAITE à la premirère question du formulaire de selection PGLM", function() {

    selecteurPGLM.parseXml(xmlDoc);
    selecteurPGLM.formulaire.reponses.push("RETRAITE");
    selecteurPGLM.process();
    var questions = selecteurPGLM.formulaire.questions;
    var caracteristiques = selecteurPGLM.formulaire.caracteristiques;


    var testData = new Object();
    testData.formulaire = selecteurPGLM.formulaire;
    testData.expected = 2;
    testData.result = questions.length;
    console.log(testData);
    ok( testData.expected  == testData.result, "Le nombre de questions dans le formulaire devrais etre '" + testData.expected+"'");

    var testData2 = new Object();
    testData2.formulaire = selecteurPGLM.formulaire;
    testData2.expected = "Q2";
    testData2.result = questions[1].id;
    console.log(testData2);
    ok( testData2.expected  == testData2.result, "La deuxième questions du formulaire devrais etre '" + testData2.expected+"'");

    var testData3 = new Object();
    testData3.formulaire = selecteurPGLM.formulaire;
    testData3.expected = 1;
    testData3.result = caracteristiques.length;
    console.log(testData3);
    ok( testData3.expected  == testData3.result, "Le nombre de caracteristiques dans le formulaire devrais etre '" + testData3.expected+"'");

    var testData4 = new Object();
    testData4.formulaire = selecteurPGLM.formulaire;
    testData4.expected = "Produit.Regime";
    testData4.result = caracteristiques[0].nom;
    console.log(testData4);
    ok( testData4.expected  == testData4.result, "Le nom de la première caracteristique du formulaire devrais etre '" + testData4.expected+"'");

    var testData5 = new Object();
    testData5.formulaire = selecteurPGLM.formulaire;
    testData5.expected = 1;
    testData5.result = caracteristiques[0].valeurs.length;
    console.log(testData5);
    ok( testData5.expected  == testData5.result, "Le nombre de valeur de la première caracteristique du formulaire devrais etre '" + testData5.expected+"'");

    var testData6 = new Object();
    testData6.formulaire = selecteurPGLM.formulaire;
    testData6.expected = "REER_CONV";
    testData6.result = caracteristiques[0].valeurs[0];
    console.log(testData6);
    ok( testData6.expected  == testData6.result, "La valeur de la première caracteristique du formulaire devrais etre '" + testData6.expected+"'");
});

test("Répondre ETUDES à la premirère question du formulaire de selection PGLM", function() {

    selecteurPGLM.parseXml(xmlDoc);
    selecteurPGLM.formulaire.reponses.push("ETUDES");
    selecteurPGLM.process();
    var questions = selecteurPGLM.formulaire.questions;
    var caracteristiques = selecteurPGLM.formulaire.caracteristiques;


    var testData = new Object();
    testData.expected = 2;
    testData.result = questions.length;
    console.log(testData);
    ok( testData.expected  == testData.result, "Le nombre de questions dans le formulaire devrais etre '" + testData.expected+"'");

    var testData2 = new Object();
    testData2.expected = "Q3";
    testData2.result = questions[1].id;
    console.log(testData2);
    ok( testData2.expected  == testData2.result, "La deuxième questions du formulaire devrais etre '" + testData2.expected+"'");

    var testData3 = new Object();
    testData3.formulaire = selecteurPGLM.formulaire;
    testData3.expected = 1;
    testData3.result = caracteristiques.length;
    console.log(testData3);
    ok( testData3.expected  == testData3.result, "Le nombre de caracteristiques dans le formulaire devrais etre '" + testData3.expected+"'");

    var testData4 = new Object();
    testData4.formulaire = selecteurPGLM.formulaire;
    testData4.expected = "Produit.Regime";
    testData4.result = caracteristiques[0].nom;
    console.log(testData4);
    ok( testData4.expected  == testData4.result, "Le nom de la première caracteristique du formulaire devrais etre '" + testData4.expected+"'");

    var testData5 = new Object();
    testData5.formulaire = selecteurPGLM.formulaire;
    testData5.expected = 1;
    testData5.result = caracteristiques[0].valeurs.length;
    console.log(testData5);
    ok( testData5.expected  == testData5.result, "Le nombre de valeur de la première caracteristique du formulaire devrais etre '" + testData5.expected+"'");

    var testData6 = new Object();
    testData6.formulaire = selecteurPGLM.formulaire;
    testData6.expected = "REEE";
    testData6.result = caracteristiques[0].valeurs[0];
    console.log(testData6);
    ok( testData6.expected  == testData6.result, "La valeur de la première caracteristique du formulaire devrais etre '" + testData6.expected+"'");
});

test("Répondre PROJET à la premirère question du formulaire de selection PGLM", function() {

    selecteurPGLM.parseXml(xmlDoc);
    selecteurPGLM.formulaire.reponses.push("PROJET");
    selecteurPGLM.process();
    var questions = selecteurPGLM.formulaire.questions;
    var caracteristiques = selecteurPGLM.formulaire.caracteristiques;


    var testData = new Object();
    testData.expected = 2;
    testData.result = questions.length;
    console.log(testData);
    ok( testData.expected  == testData.result, "Le nombre de questions dans le formulaire devrais etre '" + testData.expected+"'");

    var testData2 = new Object();
    testData2.expected = "Q4";
    testData2.result = questions[1].id;
    console.log(testData2);
    ok( testData2.expected  == testData2.result, "La deuxième questions du formulaire devrais etre '" + testData2.expected+"'");

    var testData3 = new Object();
    testData3.formulaire = selecteurPGLM.formulaire;
    testData3.expected = 1;
    testData3.result = caracteristiques.length;
    console.log(testData3);
    ok( testData3.expected  == testData3.result, "Le nombre de caracteristiques dans le formulaire devrais etre '" + testData3.expected+"'");

    var testData4 = new Object();
    testData4.formulaire = selecteurPGLM.formulaire;
    testData4.expected = "Produit.Regime";
    testData4.result = caracteristiques[0].nom;
    console.log(testData4);
    ok( testData4.expected  == testData4.result, "Le nom de la première caracteristique du formulaire devrais etre '" + testData4.expected+"'");

    var testData5 = new Object();
    testData5.formulaire = selecteurPGLM.formulaire;
    testData5.expected = 2;
    testData5.result = caracteristiques[0].valeurs.length;
    console.log(testData5);
    ok( testData5.expected  == testData5.result, "Le nombre de valeur de la première caracteristique du formulaire devrais etre '" + testData5.expected+"'");

    var testData6 = new Object();
    testData6.formulaire = selecteurPGLM.formulaire;
    testData6.expected = "NON_ENREGISTRE";
    testData6.result = caracteristiques[0].valeurs[0];
    console.log(testData6);
    ok( testData6.expected  == testData6.result, "La premiere valeur de la première caracteristique du formulaire devrais etre '" + testData6.expected+"'");

    var testData7 = new Object();
    testData7.formulaire = selecteurPGLM.formulaire;
    testData7.expected = "CELI";
    testData7.result = caracteristiques[0].valeurs[1];
    console.log(testData7);
    ok( testData7.expected  == testData7.result, "La deuxieme valeur de la première caracteristique du formulaire devrais etre '" + testData7.expected+"'");

});

test("Répondre RETRAITE à la premirère question et 49000 a la deuxieme question du formulaire de selection PGLM", function() {

    selecteurPGLM.parseXml(xmlDoc);
    selecteurPGLM.formulaire.reponses.push("RETRAITE");
    selecteurPGLM.formulaire.reponses.push("49000");
    selecteurPGLM.process();
    var questions = selecteurPGLM.formulaire.questions;
    var caracteristiques = selecteurPGLM.formulaire.caracteristiques;


    var testData = new Object();
    testData.formulaire = selecteurPGLM.formulaire;
    testData.expected = 3;
    testData.result = questions.length;
    console.log(testData);
    ok( testData.expected  == testData.result, "Le nombre de questions dans le formulaire devrais etre '" + testData.expected+"'");

    var testData2 = new Object();
    testData2.formulaire = selecteurPGLM.formulaire;
    testData2.expected = "Q4";
    testData2.result = questions[2].id;
    console.log(testData2);
    ok( testData2.expected  == testData2.result, "La troisième questions du formulaire devrais etre '" + testData2.expected+"'");

    var testData3 = new Object();
    testData3.formulaire = selecteurPGLM.formulaire;
    testData3.expected = 2;
    testData3.result = caracteristiques.length;
    console.log(testData3);
    ok( testData3.expected  == testData3.result, "Le nombre de caracteristiques dans le formulaire devrais etre '" + testData3.expected+"'");

    var testData4 = new Object();
    testData4.formulaire = selecteurPGLM.formulaire;
    testData4.expected = "Produit.Montant.Minimum";
    testData4.result = caracteristiques[1].nom;
    console.log(testData4);
    ok( testData4.expected  == testData4.result, "Le nom de la deuxieme caracteristique du formulaire devrais etre '" + testData4.expected+"'");

    var testData5 = new Object();
    testData5.formulaire = selecteurPGLM.formulaire;
    testData5.expected = 1;
    testData5.result = caracteristiques[1].valeurs.length;
    console.log(testData5);
    ok( testData5.expected  == testData5.result, "Le nombre de valeurs de la deuxieme caracteristique du formulaire devrais etre '" + testData5.expected+"'");

    var testData6 = new Object();
    testData6.formulaire = selecteurPGLM.formulaire;
    testData6.expected = "0";
    testData6.result = caracteristiques[1].valeurs[0];
    console.log(testData6);
    ok( testData6.expected  == testData6.result, "La valeur de la deuxieme caracteristique du formulaire devrais etre '" + testData6.expected+"'");
});

test("Répondre RETRAITE à la premirère question et 51000 a la deuxieme question du formulaire de selection PGLM", function() {

    selecteurPGLM.parseXml(xmlDoc);
    selecteurPGLM.formulaire.reponses.push("RETRAITE");
    selecteurPGLM.formulaire.reponses.push("51000");
    selecteurPGLM.process();
    var questions = selecteurPGLM.formulaire.questions;
    var caracteristiques = selecteurPGLM.formulaire.caracteristiques;


    var testData = new Object();
    testData.formulaire = selecteurPGLM.formulaire;
    testData.expected = 3;
    testData.result = questions.length;
    console.log(testData);
    ok( testData.expected  == testData.result, "Le nombre de questions dans le formulaire devrais etre '" + testData.expected+"'");

    var testData2 = new Object();
    testData2.formulaire = selecteurPGLM.formulaire;
    testData2.expected = "Q3";
    testData2.result = questions[2].id;
    console.log(testData2);
    ok( testData2.expected  == testData2.result, "La deuxième questions du formulaire devrais etre '" + testData2.expected+"'");

    var testData3 = new Object();
    testData3.formulaire = selecteurPGLM.formulaire;
    testData3.expected = 3;
    testData3.result = caracteristiques.length;
    console.log(testData3);
    ok( testData3.expected  == testData3.result, "Le nombre de caracteristiques dans le formulaire devrais etre '" + testData3.expected+"'");

    var testData4 = new Object();
    testData4.formulaire = selecteurPGLM.formulaire;
    testData4.expected = "Produit.Type";
    testData4.result = caracteristiques[1].nom;
    console.log(testData4);
    ok( testData4.expected  == testData4.result, "Le nom de la deuxieme caracteristique du formulaire devrais etre '" + testData4.expected+"'");

    var testData5 = new Object();
    testData5.formulaire = selecteurPGLM.formulaire;
    testData5.expected = 1;
    testData5.result = caracteristiques[1].valeurs.length;
    console.log(testData5);
    ok( testData5.expected  == testData5.result, "Le nombre de valeurs de la deuxieme caracteristique du formulaire devrais etre '" + testData5.expected+"'");

    var testData6 = new Object();
    testData6.formulaire = selecteurPGLM.formulaire;
    testData6.expected = "ET";
    testData6.result = caracteristiques[1].valeurs[0];
    console.log(testData6);
    ok( testData6.expected  == testData6.result, "La valeur de la deuxieme caracteristique du formulaire devrais etre '" + testData6.expected+"'");

    var testData7 = new Object();
    testData7.formulaire = selecteurPGLM.formulaire;
    testData7.expected = "Produit.Montant.Minimum";
    testData7.result = caracteristiques[2].nom;
    console.log(testData7);
    ok( testData7.expected  == testData7.result, "Le nom de la troisieme caracteristique du formulaire devrais etre '" + testData7.expected+"'");

    var testData8 = new Object();
    testData8.formulaire = selecteurPGLM.formulaire;
    testData8.expected = 1;
    testData8.result = caracteristiques[2].valeurs.length;
    console.log(testData8);
    ok( testData8.expected  == testData8.result, "Le nombre de valeurs de la troisieme caracteristique du formulaire devrais etre '" + testData8.expected+"'");

    var testData9 = new Object();
    testData9.formulaire = selecteurPGLM.formulaire;
    testData9.expected = "25000";
    testData9.result = caracteristiques[2].valeurs[0];
    console.log(testData6);
    ok( testData9.expected  == testData9.result, "La valeur de la troisieme caracteristique du formulaire devrais etre '" + testData9.expected+"'");



});












