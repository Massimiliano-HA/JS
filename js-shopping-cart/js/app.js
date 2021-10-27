let coursesContainer = document.getElementById( 'courses-container' );

        // Fonction qui fait apparaitre un evenement lors qu'il y a un clique//

coursesContainer.addEventListener('click', function (e) {
    let btn = e.target;                         //vise seulement le bouton//
    let id  = btn.getAttribute( 'data-id' );

        //----------Boucle pour afficher dans le corps du cart------------//

    if( btn.classList.contains( 'add-to-cart') ) {
        console.log( COURSES[id] );
        let table = document.getElementById( 'cart-table' );
        let course = searchCourse( id );
        let tbody = table.getElementsByTagName( 'tbody' )[0];     // [0] pour selectionner le premier element du tableau
        showNotification( `${course.title} a été ajouté au panier !`);
        displayCart ();


        // Rechercher dans le tableau de COURSES le bon element à partir de l'ID grace a la fonction searchCourse

        let row = document.createElement( 'tr' );
        row.innerHTML = `
            <td><img src="img/courses/${course.img}"></td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>1</td>
            <td><button class="Supp-Element" data-id="${course.id}">X</button></td>`;

        tbody.appendChild( row );           //Permet de mettre en ligne les informations dans le tbody
        console.log (tbody );


    //--------------------local-storage-------------------//
        let cart = getCart();
        cart.push( course.id);
        saveCart( cart );
    }
});

//-----------------------VIDER PANIER-------------------//
    // Vider le panier
        const clearPanier = document.getElementById('empty-cart');
        console.log(clearPanier);
    
    //Supression de la key du LocalStorage
        clearPanier.addEventListener("click", (e) => {
        e.preventDefault;
    
    //clear le cart du local storage
        clearCart ( cart );
        
    //rechargement de la page
        window.location.href="index.html";
    });

//--------------------Boutton supprimer -----------------------//
document.addEventListener( 'click', function( event ) {
    event.preventDefault();
    
    if( event.target.classList.contains( 'Supp-Element') ) {
        let courseId    = event.target.getAttribute( 'data-id' );   //permet d'afficher le titre dans la notif//
        let course      = searchCourse( courseId );                 //***************************************//

        event.target.parentNode.parentNode.remove();                //permet de supprimer l'element selectionné au click//

        showNotification(`${course.title} a été supprimé du panier`);
    }
});

//----------------qui permet la recherche d'element dans le tableau "courses.id"--------------//
function searchCourse( id ) {
    var course;

    // On parcourt chacun des éléments du tableau

    COURSES.forEach(element => {

    // Si l'id de l'élément courant est égal à l'id en paramètre. On attribut l'élément à la variable course

        if( element.id == id ) course = element;
    });

    return course;
}

//-------------- Afficher le panier depuis le local storage ---------------//
 function displayCart() {

//     // Récupérer le contenu du local storage
    
     let cart      = getCart();

//     // Boucler le contenu du panier avec un foreach
//         // Afficher dans un console log chaque variable d'un element du Panier
    for(let j     = 0; j < cart.length; j++)
    {
        for(let i = 0; i < COURSES.length; i++)
        {
            if(cart[j] === COURSES[i].id)
            {
            console.log(`${cart[j]} correspond a ${COURSES[i].title}`);
            }
        }
    }
} 
//     cart.forEach(() => {
//         console.log(COURSES[i]);
//     if (COURSES[i] === "deux") {
//     mots.shift();
//   }
// });
//     // Remplacer les consoles log par la construction d'une variable html qui contient les lignes du tableaux
//     innerHTML 


//---------------localeStorage---------------//
function saveCart (cart) {
    localStorage['cart'] = JSON.stringify(cart);
}

function clearCart (cart) {
    localStorage.removeItem ('cart');
}

function getCart () {
    let cart = localStorage.getItem('cart')
    if (cart == null || cart.length == 0) return [];
    else return JSON.parse( cart );
}

//----------------------------------NOTIF-------------------------------------//

const notification = document.querySelector('notification_container'); // -----constante notif qui renvoie à notif container

let showNotification = (message) => { //-------fonction associée à notif container qui renvoie le message lors du click

    //innerHTML += va permettre un changement dans le HTML pour la fonction//
    document.querySelector("#notification_container").innerHTML += ` 
        <div class="content"> 
            <img src="img/cart.png">
            <p>${message}</p>
        </div>
    `
//  innerHTML += c'est l'affichage des notifs une à une 

    setTimeout(() => {
        document.querySelector("#notification_container .content").remove(); // notif qui s'enlève au bout de 3 secondes
    }, 3000);

};


//let disponibilite = document.querySelectorAll('stock');
//stock[s].addEventListener('click', ()=> {
//    stockNumber();


// $(function(){
    
   // $('.decrease').click(function(){
     //   var self = $(this);
       // var current_num = parseInt(self.siblings('input').val());
        // if(current_num > 1){
           // current_num -= 1;
           // self.siblings('input').val(current_num);
            // update_item(self.siblings('input').data('item-id'));
        //}
    //})
//})

//})