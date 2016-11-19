
//creo las variables para seleccionar los diferentes objetos de la pagina.

var form = document.getElementById("formulario");
var nombres = document.getElementById("nombres");
var numJug = document.getElementById("numJug");
var listNomb = document.getElementsByClassName("caja");
var tapete = document.getElementById("tapete");
var inicio = document.getElementById("inicio");
var botonesJuego1 = document.getElementById("botones_juego_j1");
var botonesJuego2 = document.getElementById("botones_juego_j2");
var botonesJuego3 = document.getElementById("botones_juego_j3");
var reglas = document.getElementById("reglas");
var jug1 = document.getElementById("j1_nombre");
var jug2 = document.getElementById("j2_nombre");
var jug3 = document.getElementById("j3_nombre");
var jugador1 = document.getElementById("j1");
var jugador2 = document.getElementById("j2");
var jugador3 = document.getElementById("j3");
var marc1 = document.getElementById("j1_marc");
var marc2 = document.getElementById("j2_marc");
var marc3 = document.getElementById("j3_marc");
var marcB = document.getElementById("b_marc");
var carta1 = document.getElementById("j1_carta");
var carta2 = document.getElementById("j2_carta");
var carta3 = document.getElementById("j3_carta");
var planta1 = document.getElementById("j1_plantarse");
var planta2 = document.getElementById("j2_plantarse");
var planta3 = document.getElementById("j3_plantarse");
var cartas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];
var PosY = 188;
var PosX = 280;
var valorCarta;
var j1_jugando = true;
var j2_jugando = false;
var j3_jugando = false;
var banca_jugando = false;
var puntJ = 0;
var puntJ1 = 0;
var puntJ2 = 0;
var puntJ3 = 0;
var puntBanca = 0;


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
		//guarda en la variable el valor de la carta
		switch(cartas[cartaSacada]){
			case 1:
			case 11:
			case 21:
			case 31: valorCarta = 1; break;
			case 2:
			case 12:
			case 22:
			case 32: valorCarta = 2; break;
			case 3:
			case 13:
			case 23:
			case 33: valorCarta = 3; break;
			case 4:
			case 14:
			case 24:
			case 34: valorCarta = 4; break;
			case 5:
			case 15:
			case 25:
			case 35: valorCarta = 5; break;
			case 6:
			case 16:
			case 26:
			case 36: valorCarta = 6; break;
			case 7:
			case 17:
			case 27:
			case 37: valorCarta = 7; break;
			case 8: 
			case 9: 
			case 10:
			case 18: 
			case 19: 
			case 20: 
			case 28: 
			case 29: 
			case 30: 
			case 38: 
			case 39: 
			case 40: valorCarta = 0.5; break;
		}
		//borra esa carta del array
		alert(cartas[cartaSacada]+"---"+parseFloat(valorCarta));   
		cartas.splice((cartaSacada-1), 1);
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

	//suma el valor de la carta al marcador del jugador
	puntJ = parseFloat(puntJ+valorCarta);	

	//prueba para ver si funciona la suma de valores
	alert(puntJ);

	//nueva posicion para la siguiente carta
	PosY = PosY+40;

	if(puntJ > 7.5){
		alert("Te has pasado!!!");
		siguienteJugador();
	}

}

function siguienteJugador(){
	var jugador2 = document.getElementById("j2");
	var jugador3 = document.getElementById("j3");
	//comprueba que jugador esta jugando, lo pone en false y pasa a true el siguiente jugador si existe o a la banca.
	if(j1_jugando == true && jugador2 != null){
		j1_jugando = false;
		j2_jugando = true;
		puntJ1 = puntJ;
		marc1.innerHTML = puntJ1;
		puntJ = 0;
		PosX = 690;
		PosY = 134;
		document.getElementById("j1_carta").disabled = true;
		document.getElementById("j1_plantarse").disabled = true;
		var botonesJuego2 = document.getElementById("botones_juego_j2");
		botonesJuego2.style.visibility = "visible";		
	}else if(j2_jugando == true && jugador3 != null){
		j2_jugando = false;
		j3_jugando = true;
		puntJ2 = puntJ;
		marc2.innerHTML = puntJ2;
		puntJ = 0;
		PosX = 1123;
		PosY = 188;
		document.getElementById("j2_carta").disabled = true;
		document.getElementById("j2_plantarse").disabled = true;
		var botonesJuego3 = document.getElementById("botones_juego_j3");
		botonesJuego3.style.visibility = "visible";
	}else if(j3_jugando == true){
		j3_jugando = false;
		banca_jugando = true;
		puntJ3 = puntJ;
		marc3.innerHTML = puntJ3;
		puntJ = 0;
		PosX = 695;
		PosY = 628;
		document.getElementById("j3_carta").disabled = true;
		document.getElementById("j3_plantarse").disabled = true;
		var botonesJuego = document.getElementById("botones_juego");
		botonesJuego.style.visibility = "visible";
	}else{
		banca_jugando = false;
		puntBanca = puntJ;
		marcB.innerHTML = puntBanca;		
		document.getElementById("banc_carta").disabled = true;
		document.getElementById("banc_plantarse").disabled = true;
	}
}




 
