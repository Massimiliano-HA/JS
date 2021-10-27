document.getElementById( 'search_bar' ).addEventListener( 'keyup', function( event ) {
    let input       = this.value.toLowerCase();
    
    let no_result   = document.getElementById('no_course')
    //Déclare la variable no_result qui représente la classe hidden qui s'active quand il n'y a pas de résultat correspondant
    let titles      = document.getElementById( 'courses-container' ).getElementsByTagName( 'h4' );
       //Déclare la variable titles qui contient tous les h4  //on va chercher les titres en h4 dans la div de l'id courses-container

    let count_results = 0;

    for (i = 0; i < titles.length; i++) {
        let container = titles[i].parentNode.parentNode;
            
        if( titles[i].innerText.toLowerCase().includes(input.toLowerCase()) ) {
            container.style.display = 'block';
            count_results++;
            //vérifie si il y a du contenu dans les h4 et en fonction du résultat, affiche le block en question ou non.
        } else container.style.display = 'none';
    }

    // Afficher ou cacher le message de résultat
    if( count_results > 0 ) no_result.classList.add( 'hidden' );
    else no_result.classList.remove( 'hidden' );
})