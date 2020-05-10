  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {
        path: '/about/',
        url: 'about.html',
      },

      {
        path: '/index/',
        url: 'index.html',
      },

      {
        path: '/carga_articulo/',
        url: 'carga_articulo.html',
      },
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');


var db;
var id = "1";
var entero = 1;

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {

db=firebase.firestore();

db.collection("ARTICULOS").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        entero = entero + 1;
        console.log("en base de datos hay : "+entero+" documentos");
    });
  });

});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {

})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="about"]', function (e) { 

})

// Option 3. yo por cada pagina manejo sus propios eventos
$$(document).on('page:init', '.page[data-name="carga_articulo"]', function (e) {

  $$("#cargar_articulo").on("click" , cargarArticulo);

})

function cargarArticulo(){
id = entero.toString();
  var registro = {
      id : id,
      articulo : $$("#articulo").val(),
      precio : $$("#precio").val(),
      costo :$$("#costo").val(),
      stock :$$("#stock").val(),
      descripcion :$$("#descripcion").val(),
    }
    db.collection("ARTICULOS").doc(id).set(registro);
    console.log("este documento es el numero : "+id);
    entero = entero + 1;
    id = entero.toString();
    console.log("el proximo documento es el numero : "+id);

}