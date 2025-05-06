function nouveauProjetFormulaireVisible() {
    const formTable = document.querySelector(".nouveauProjetFormulaire"); 
    const buttonTable = document.querySelector(".boutonVisible");
    if (formTable.style.display === "none" || formTable.style.display === "") {
        formTable.style.display = "table";
        buttonTable.textContent = "annulé";
    } else {
        formTable.style.display = "none";
        buttonTable.textContent = "Ajouter un projet";

    }
}