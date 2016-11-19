
//creo las variables para seleccionar los diferentes objetos de la pagina.

var form = document.getElementById("formulario");
var nombres = document.getElementById("nombres");
var numJug = document.getElementById("numJug");
var listNomb = document.getElementsByClassName("caja");
var tapete = document.getElementById("tapete");
var jug1 = document.getElementById("j1_nombre");
var jug2 = document.getElementById("j2_nombre");
var jug3 = document.getElementById("j3_nombre");
var cartas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];
var PosY = 188;
var PosX = 280;
var valorCarta;
var puntJ1;
var puntJ2;
var puntJ3;
var puntBanca;


/*
creo la funcion de generar los cuadros de texto en funcion del numero
de jugadores elegidos.
*/
function numeroJug(){

	//creo las variables para seleccionar los diferentes objetos de la pagina.
	
	//creo la variable para coger el valor de la caja de texto de numero de jugadores.
	var num = parseInt(numJug.value);
	//si el numero introducido esta en el rango permitido (1-3).
	if(num>0 && num<=3){

		//creo una caja de texto en el div "nombres" por cada jugador y un boton para empezar a jugar
		for(var i=0;i<num;i++){
			var label = document.createElement("label");
			label.innerHTML = "Nombre :";
			nombres.appendChild(label);
			var input = document.createElement("input");
			input.type = "text";
			input.name = "caja";
			input.id = i+1;
			input.className = "caja";
			nombres.appendChild(input);
			var salto = document.createElement("br");
			nombres.appendChild(salto);
			var salto = document.createElement("br");
			nombres.appendChild(salto);

		}

		var boton = document.createElement("span");
		boton.innerHTML = '<input type="button" id="empezar" value="Empezar" onclick="empezarJuego()"/>';
		nombres.appendChild(boton);

		document.getElementById("aceptar").disabled = true;


	//si no, saco una alerta para que introduzca un numero permitido de jugadores.
	}else{
		alert("Por favor, elija un numero de jugadores entre 1 y 3");
	}
}

/*
creo la funcion para empezar a jugar. Esta funcion guardará los nombres introducidos en las cajas
de texto recien creadas y activará los botones para empezar a jugar.
*/

function empezarJuego(){

	//creo las variables del los nombres de jugadores introducidos en las nuevas cajas de texto.
	
	var nombJug = new Array();
	for (var i = 0; i < listNomb.length; i++) {
		nombJug[i] = listNomb[i].value;
	}

	//prueba para ver que se ha generado bien el array
	//document.getElementById("nombres").innerHTML = nombJug;

	//genero los divs que mostraran las cartas al sacarlas

	for (var i = 0; i < nombJug.length; i++) {
		var hueco = document.createElement("div");
		hueco.className = "hueco";
		hueco.id = "j"+(i+1);
		tapete.appendChild(hueco);
	}

	//genero el hueco de la banca y lo muevo a su posicion en el tapete

	var huecoBank = document.createElement("div");
	huecoBank.id = "huecoBank";
	tapete.appendChild(huecoBank);
	huecoBank.style.position = "absolute";
	huecoBank.style.left = 695+'px';
	huecoBank.style.top = 628+'px';
	huecoBank.style.borderColor = "red";

	//muevo los divs a la posicion adecuada en el tapete
	//creo el array de los divs

	var jugadores = document.getElementsByClassName("hueco");

	//recorro el array de los div de clase hueco y si existe lo situo en su lugar en el tapete
	for (var i = 1; i <= jugadores.length; i++) {
		var jugador = document.getElementById("j"+i);
		if(jugador !== null && jugador.id == "j1"){
				jugador.style.position = "absolute";
				jugador.style.left = 280+'px';
				jugador.style.top = 188+'px';
				jugador.style.borderColor = "yellow";
				jug1.innerHTML = nombJug[0];
		}else if(jugador !== null && jugador.id == "j2"){
				jugador.style.position = "absolute";
				jugador.style.left = 690+'px';
				jugador.style.top = 134+'px';
				jugador.style.borderColor = "blue";
				jug2.innerHTML = nombJug[1];
		}else if(jugador !== null && jugador.id == "j3"){
				jugador.style.position = "absolute";
				jugador.style.left = 1123+'px';
				jugador.style.top = 188+'px';
				jugador.style.borderColor = "green";
				jug3.innerHTML = nombJug[2];
		}
	}

	//oculto el div inicio y muestro los divs con los botones para jugar y las reglas del juego
	var inicio = document.getElementById("inicio");
	var botonesJuego1 = document.getElementById("botones_juego_j1");
	var reglas = document.getElementById("reglas");
	inicio.style.visibility = "hidden";
	botonesJuego1.style.visibility = "visible";
	reglas.style.visibility = "visible";

}

//funcion para el boton de mostrar las reglas

function mostrarReglas(){
	var texto = document.getElementById("text_reglas");
	if(texto.style.visibility == "visible"){
		texto.style.visibility = "hidden";
	}else{
		texto.style.visibility = "visible";
	}
	
}

//funcion para sacar cartas (seguramente me habre complicado bastante aqui pero no se me ocurria otra manera).

function sacarCarta(){
	
	//var jugador = document.getElementById("tapete");

	if(cartas.length > 1){ //si el array de cartas tiene mas de un elemento		

		//alert(cartas.length);
		//numero aleatorio entre 1 y el numero de cartas en el array
		var cartaSacada = Math.floor((Math.random() * cartas.length));
		//crea una imagen 
		var imgCarta = document.createElement("img"); 
		//la hace hija de el div tapete
		tapete.appendChild(imgCarta); 
		//le da el src de la imagen que le toca y la situa en el tapete
		imgCarta.src = "img/"+(cartas[cartaSacada]-1)+".jpg"; 
		imgCarta.style.position = "absolute"; 
		imgCarta.style.top = PosY+'px';
		imgCarta.style.left = PosX+'px';
		//borra esa carta del array   
		cartas.splice(cartaSacada, 1);
		//alert(cartaSacada+"---"+cartas.length);

	}else if(cartas.length == 1){ //si al array solo le queda una carta

		var imgCarta = document.createElement("img");
		tapete.appendChild(imgCarta);
		imgCarta.src = "img/"+cartas[0]+".jpg";
		imgCarta.style.position = "absolute";
		imgCarta.style.top = PosY+'px';
		imgCarta.style.left = PosX+'px';
		//cartas.splice(0, 1);
		alert("Se han terminado las cartas!!!!");

	}

	//nueva posicion para la siguiente carta
	PosY = PosY+40;

}

//funcion para plantarse

function plantarse(){

}



 
