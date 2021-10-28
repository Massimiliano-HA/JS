//----------------------Barre de recherche----------------------//

document.getElementById( 'search_bar' ).addEventListener( 'keyup', function( event ) {

    let input         = this.value.toLowerCase();

    //Contient l'évènement "event" qui représente la barre de recherche

    let no_result     = document.getElementById('no_course')

    //Représente la classe hidden qui s'active quand il n'y a pas de résultat correspondant

    let titles        = document.getElementById( 'courses-container' ).getElementsByTagName( 'h4' );

    //Contient tous les h4  //on va chercher les titres en h4 dans la div courses-container

    let count_results = 0;

    //Permet de comptabiliser le nombre de résultats affichés

    for (i = 0; i < titles.length; i++) {
        let container = titles[i].parentNode.parentNode;


        if( titles[i].innerText.toLowerCase().includes(input.toLowerCase()) ) {
            container.style.display = 'block';
            count_results++;

    //Vérifie si il y a du contenu dans les h4
    // affiche le block en question ou non.

        } else container.style.display = 'none';
    }

    // Afficher ou cacher le message de résultat

    if( count_results > 0 ) no_result.classList.add( 'hidden' );

    //En fonction du nombre de bloc, elle ajoute ou supprime la classe "hidden"

        else no_result.classList.remove( 'hidden' );
})