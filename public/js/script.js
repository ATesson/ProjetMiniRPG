function startCombat() {
    const selectedCategory = document.querySelector('input[name="fighterCategory"]:checked');
    const selectedDifficulty = document.getElementById('difficulty');

    console.log('script')
    if (selectedCategory && selectedDifficulty) {
        // Rediriger vers la page d'accueil (index.html) en fonction des sélections
        window.location.href = `../index.html`;
    } else {
        alert("Veuillez sélectionner un combattant et un niveau de difficulté.");
    }
}
