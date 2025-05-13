function sauvegardeProjets(projets) {
    localStorage.setItem("projets", JSON.stringify(projets));
}

function chargerProjets() {
    const projets = localStorage.getItem("projets");
    return projets ? JSON.parse(projets) : [];
}

const champs = [
    { label: "Nom", id:"nom"},
    { label: "Stack", id: "stack" },
    { label: "Description", id: "description" },
    { label: "Date de création", id: "dateCreation", type: "date" },
    { label: "Dernière modification", id: "dateModif", type: "date" },
    { label: "Type de projet", id: "type" },
    { label: "Maj à faire", id: "maj" },
    { label: "Statut", id: "statut" },
    { label: "URL", id: "url", type: "url" }
];

let currentStep = 0;
let formData = {};

function nouveauProjetFormulaireVisible() {
   const container = document.getElementById("formulaireContainer");
   const bouton = document.querySelector(".boutonVisible");

   if (container.style.display === "none") {
    container.style.display = "block";
    bouton.textContent = "Annuler";
    currentStep = 0;
    formData = {};
    afficherChampSuivant();
   } else {
    container.style.display = "none";
    bouton.textContent = "Ajouter un projet";
    container.innerHTML = "";
   }
}

function afficherChampSuivant() {
    const container = document.getElementById("formulaireContainer");
    container.innerHTML = ""; //vide le contenu précedent

    if (currentStep >= champs.length){
        ajaouterEtSauvegarderProjet(formData);
        container.innerHTML = "<p>Projet ajouté !</p>"
        console.log("Donnée du projet :", formData);
        return;
    }

    const champ = champs[currentStep];

    const label = document.createElement("label");
    label.textContent = champ.label + " : ";
    label.setAttribute("for", champ.id);

    const input = document.createElement("input");
    input.id = champ.id;
    input.type = champ.type || "text";

    if(formData[champ.id]){
        input.value = formData[champ.id]; // Remet la valeur si on fait retour
    }

    const boutonSuivant = document.createElement("button");
    boutonSuivant.textContent = "Valider";
    boutonSuivant.onclick = () => {
        const valeur = input.value.trim();
        if (!valeur) {
            alert("Veuillez remplir ce champ");
            return;
        }
        formData[champ.id] = valeur;
        currentStep++;
        afficherChampSuivant();
    };


    const boutonRetour = document.createElement("button");
    boutonRetour.textContent = "Retour";
    boutonRetour.onclick = () => {
        if(currentStep > 0) 
            currentStep--;
        afficherChampSuivant();
    }
    container.appendChild(label);
    container.appendChild(input);
    container.appendChild(document.createElement("br"));
    container.appendChild(boutonRetour);
    container.appendChild(boutonSuivant);
}

function ajouterProjetAuTableau(projet) {
    const tableau = document.querySelector("table:nth-of-type(2) tbody");
    const ligne = document.createElement("tr");

    // Ajoute un bouton "Modifier"
    const tdBouton = document.createElement("td");
    const boutonModif = document.createElement("button");
    boutonModif.textContent = "Modifier";
    tdBouton.appendChild(boutonModif);

    // Ajoute chaque champ dans une cellule
    champs.forEach(champ => {
        const td = document.createElement("td");
        td.textContent = projet[champ.id];
        ligne.appendChild(td);
    });
    ligne.appendChild(tdBouton);
    tableau.appendChild(ligne);
}

function ajaouterEtSauvegarderProjet(projet) {
    ajouterProjetAuTableau(projet);
    const projets = chargerProjets();
    projets.push(projet);
    sauvegardeProjets(projets);
}

function resetProjets() {
    localStorage.removeItem("projets");
    location.reload();
}

window.onload = () => {
    const projets = chargerProjets();
    projets.forEach(projet => ajouterProjetAuTableau(projet));
}