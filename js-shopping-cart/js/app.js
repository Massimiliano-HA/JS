//-------------- Afficher le panier depuis le local storage ---------------//
(function displayCart() {
    // Récupérer le contenu du local storage
    
    let cart            = getCart();

    // Afficher dans un console log chaque variable d'un element du Panier
    
    if(cart !==null){                                   //Condition qui s'applique s'il y a des éléments dans le locale storage
        for(let j       = 0; j < cart.length; j++){
        let search      = searchCourse(cart[j])
            if (search == undefined){
                 return
            }
                AfficherTabCart(searchCourse(cart[j]));
        }
    }
    // Remplacer les consoles log par la construction d'une variable html qui contient les lignes du tableaux
})(); 

//------------------------------Affiche les diponibilites rapport au local storage----------//
for (let i = 0; i < COURSES.length; i++)
{

  if (localStorage.getItem("cart")) {  //donnés dans le localstorage

    for (let j = 0; j < localStorage.getItem("cart").length; j++) {    //pour tous les éléments de mon local-storage
      if (JSON.parse(localStorage.getItem("cart"))[j] - 1 === i) {   // si j correspond a une valeur de cours 
        COURSES[i].stock = COURSES[i].stock - 1;   //récupère dans courses.js  la valeur de stock.
      }
    }
}
}

//------------------------course.js charge dans la page html------------------// 
for (i=0; i<COURSES.length; i++){
    document.querySelector('#courses-container').innerHTML+=`
    <div class="course__item">
        <figure class="course_img">
            <img src="img/courses/${COURSES[i].img}">
        </figure>

    <div class="info__card">
      <h4>${COURSES[i].title}</h4>

      <figure class="mark m_${COURSES[i].mark}">
        <img src="img/rates.png"/>
      </figure>

      <p>
        <span class="price">${COURSES[i].initial_price} €</span>
        <span class="discount">${COURSES[i].price} €</span>
      </p>

      <p>
        Disponible: <span id="dispo-${COURSES[i].id}" class="stock">${COURSES[i].stock}</span>
      </p>

        <a href="#" class="add-to-cart" data-id="${COURSES[i].id}"><i class="fa fa-cart-plus"></i>Ajouter au panier</a>

    </div>
    `
    ;
     }


let coursesContainer = document.getElementById( 'courses-container' );

        // Fonction qui fait apparaitre un evenement lors qu'il y a un clique//

coursesContainer.addEventListener('click', function (e) {
    let btn = e.target;                         //vise seulement le bouton//
    var id  = btn.getAttribute( 'data-id' );

        //-----------------Boucle pour afficher dans le corps du cart------------------------//

    if( btn.classList.contains( 'add-to-cart') ) {

        if (COURSES[id - 1].stock > 0)   // on veut vérifier la condition par rapport au stock
        {
            COURSES[id - 1].stock--;     // on baisse le stock si on ajoute au panier
            
            //console.log( COURSES[id] );

            let table = document.getElementById( 'cart-table' );  // on va dans l'élément cart table 
            let course = searchCourse( id );  // on va dans le tableau chercher le bon élément 
            let tbody = table.getElementsByTagName( 'tbody' )[0];     // [0] pour selectionner le premier element du tableau
            showNotification( `${course.title} a été ajouté au panier !`);  // notif affichant le message 
    
            document.getElementById('dispo-' + id).innerHTML = COURSES[id - 1].stock;  //




            // Rechercher dans le tableau de COURSES le bon element à partir de l'ID grace a la fonction searchCourse

            let row = document.createElement( 'tr' );
            row.innerHTML = `
                <td><img src="img/courses/${course.img}"></td>
                <td>${course.title}</td>
                <td>${course.price}</td>
                <td>1</td>
                <td><button class="Supp-Element" data-id="${course.id}">X</button></td>`;
    
            tbody.appendChild( row );           //Permet de mettre en ligne les informations dans le tbody

        //---info dans le local storage---//
            let cart = getCart();
            cart.push( course.id);
            saveCart(cart);
        }

        else
        { if (COURSES[id - 1].stock == 0)  // quand = 0 ---> on affiche le message 
            showNotification( `le cours ${COURSES[id - 1].title} n'est plus disponible !`);   
        }

    }
});

//-----------------------VIDER PANIER-------------------//
    // Vider le panier
        var clearPanier = document.getElementById('empty-cart');
        //console.log(clearPanier);
    
    //Supression de la key du LocalStorage
        clearPanier.addEventListener("click", (e) => {
        e.preventDefault;

        let cart = getCart();

        for (i   = 0; i<cart.length; i++)
        {
            let table       = document.getElementById('content-tbody');
            table.innerHTML = " ";
            
            localStorage.clear();

     //permet de changer les nb de la dispo//

        for (let index = 0; index < COURSES.length; index++) 
            {
            console.log(index);

            COURSES[index].stock = DEFAULT_COURSES[index].stock;

            document.getElementById('dispo-' + (index + 1)).innerHTML = DEFAULT_COURSES[index].stock;
            }
        }
    });

//--------------------Boutton supprimer -----------------------//
document.addEventListener( 'click', function( event ) {
    event.preventDefault();
    
    if( event.target.classList.contains( 'Supp-Element') )
     {
        var courseId    = event.target.getAttribute( 'data-id' );   //permet d'afficher le titre dans la notif//
        let course      = searchCourse( courseId );                 //***************************************//

        event.target.parentNode.parentNode.remove();                //permet de supprimer l'element selectionné au click//

        showNotification(`${course.title} a été supprimé du panier`);

        COURSES[courseId - 1].stock++;
        document.getElementById('dispo-' + courseId).innerHTML = COURSES[courseId - 1].stock;

        var cart = getCart();


    //Permet de changer les infos dans le local storage
        for(var i       = 0; i < cart.length; i++)
        {
            if (cart[i] == COURSES[courseId - 1].id)
            {
                cart.splice(i, 1);

                break;
            }
        }
        saveCart(cart);
    }
});

//----------------fonction qui permet la recherche d'element dans le tableau "courses.id"--------------//
function searchCourse( id ) {
    var course;

    // On parcourt chacun des éléments du tableau

    COURSES.forEach(element => {

    // Si l'id de l'élément courant est égal à l'id en paramètre. On attribut l'élément à la variable course

        if( element.id == id ) course = element;
    });

    return course;
}




//---------------local Storage---------------//
function saveCart (cart) {
    localStorage['cart'] = JSON.stringify(cart);
}
//fonction qui permet de prendre les valeurs du local storage//
function getCart () {
    let cart = localStorage.getItem('cart')
    if (cart == null || cart.length == 0) return [];
    else return JSON.parse( cart );   
}




//----------------------------------NOTIF-------------------------------------//

const notification   = document.querySelector('notification_container'); // -----constante notif qui renvoie à notif container

let showNotification = (message) => { //-------fonction associée à notif container qui renvoie le message lors du click

    //innerHTML += va permettre un changement dans le HTML pour la fonction//
    document.querySelector("#notification_container").innerHTML += ` 
        <div class="content"> 
            <img src="img/cart.png">
            <p>${message}</p>
        </div>
    `
// ----innerHTML += c'est l'affichage des notifs une à une dans ce cas présent

    setTimeout(() => {
        document.querySelector("#notification_container .content").remove(); // notif qui s'enlève au bout de 3 secondes
    }, 3000);

};



//--------fonction qui permet d'afficher le tab au refresh de la page-------//

function AfficherTabCart (course) {
    let table = document.getElementById( 'cart-table' );
    let tbody = table.getElementsByTagName( 'tbody' )[0]; 
    let row   = document.createElement( 'tr' );
    row.innerHTML = `
        <td><img src="img/courses/${course.img}"></td>
        <td>${course.title}</td>
        <td>${course.price}</td>
        <td>1</td>
        <td><button class="Supp-Element" data-id="${course.id}">X</button></td>`;

        tbody.appendChild( row );           //Permet de mettre en ligne les informations dans le tbody

}
 
