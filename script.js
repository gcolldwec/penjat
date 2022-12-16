	
//variables
let paraula = '';
let paraula1 = '';
let diccionari = ["futbol", "tenis", "ping-pong", "badminton", "escacs", "rugby", "basquet", "polo", "waterpolo"];
let encerts = '';
let errors = [];
let historial = [];
let comptador = 0;
let paraulaAEndivinar = [];
let lletraMinuscula = '';
let elCrono;
let elCronoEnrere;
let laMevaData = new Date();
let laMevaData1 = new Date();
let segons = 0;
let minuts = 0;
let countdown1 = 10;
let oportunitats = 6;
 
//elements
const paraulaSecreta = document.getElementById('paraulaSecreta');
const errorsMostrar = document.getElementById('errors');
const historialMostrar = document.getElementById('historial');
const lletraJugada = document.getElementById('lletra');
const display = document.getElementById('display');
const displayEnrere = document.getElementById('countdown');
const oportunitat = document.getElementById('oportunitats');
const record = document.getElementById('record');
const forca = document.getElementById('horca');
const resultat = document.getElementById('resultat');
const inputText =   document.getElementById('lletra');

/*funció cercar paraula random amb metode Math.random
li passem dos parametres, un min i un max, en aquest cas li donem
com a màxim el length de l'array on tenim les possibles paraules i el min és zero*/
function paraulaRandom(max,min){
    let aleatori = Math.floor (Math.random() * (max-min)+ min); 
    //paraula és la variable on guardem la paraula random
    paraula = diccionari[aleatori];
    console.log(aleatori);
    console.log(paraula);
    console.log(paraula.length);
    paraula.split('');
    /*Aquí pintem el nombre de barres que són el nombre de lletres que té la paraula random
    ho feim a través d'un for, si la paraula tingués un guió entra en la primera condició si no
    en la segona on pinta una barra baixa. A la vegada creem un array que és paraulaAEndivinar 
    que ens servirà per les pròximes funcions*/
    for(let i = 0; i < paraula.length; i++) {
        if(paraula.charAt(i) == '-'){
            paraulaAEndivinar.push('-');
        }else{
            paraulaAEndivinar.push('_');;
        }
    }
    //Dibuixem les barres baixes a endivinar
    dibuixar();
}

//funció dibuixar       
function dibuixar() {
    //per a que les barres no ens surtin amb les comes de l'array emprem el metode join(' ')
    paraulaSecreta.innerHTML = paraulaAEndivinar.join(' ');
    //lletras errades mostrades amb un innerHTML
    errorsMostrar.innerHTML = errors.join(' ');
    // historial de lletres emprades mostrades amb un innerHTML
    historialMostrar.innerHTML = historial.join(' ');
    //oportunitats que ens queden ho mostram amb un innerHTML
    oportunitat.innerHTML = oportunitats;
    /*Feim un switch case amb el case que són les oportunitats que ens queden,
    segons quantes oportunitats queden entra en un case concret i ens pinta la seva imatge */
    switch(oportunitats){
        case 5:
            forca.innerHTML = "<img src='./imatges/cap.png' alt='forca'>";
            break;
        case 4:
            forca.innerHTML = "<img src='./imatges/cos.png' alt='forca'>";
            break;
        case 3:
            forca.innerHTML = "<img src='./imatges/braç_esq.png' alt='forca'>";
            break;
        case 2:
            forca.innerHTML = "<img src='./imatges/braç_dreta.png' alt='forca'>";
            break;
        case 1:
            forca.innerHTML = "<img src='./imatges/cama_esq.png' alt='forca'>";
            break;
        case 0:
            forca.innerHTML = "<img src='./imatges/cama_dreta.png' alt='forca'>";
            break;
    }
}
    
/*aquesta funcio en recull el valor de la lletra que hem passat per l'input text */
function jugarLletra() {
    let lletra = lletraJugada.value; 
    //passem el valor a lletra minúscula
    lletraMinuscula = lletra.toLowerCase();
    //borrem el valor de l'input que mostrem per pantalla
    lletraJugada.value = '';
    //utilitzem focus() perque el cursor es fiqui dins l'input
    lletraJugada.focus();
    //creem un booleà que ens fa de semàfor
    let esCorrecte = false;
    /*cream un bucle for i comprovam que la lletra jugada estigui dins la variable paraula
    on està assignat la paraula random*/
    for(let i = 0; i < paraula.length; i++) {
        /**si hi està dins entra al l'if  i el cronometre de 10s de compta enrere es reinicia,
         * també s'assigna la lletra endivinada a l'array[i] corresponent, el que fa que veiem la lletra 
         * encertada per pantalla i desapareixi la barra baixa, també el booleà passa a ser true
        */
        if(lletraMinuscula == paraula.charAt(i)){
            iniciarCountdown();
            esCorrecte = true;
            paraulaAEndivinar[i] = lletraMinuscula;
        } 
    }
    /*si la lletra jugada no és correcte, la fiquem dins un array amb push on mostrem el errors
    li restem una oportunitat i mirem si aquella lletra l'havíem juagat abans, en cas que no, 
    la fiquem dins l'array historial*/
    if(!esCorrecte) {
        errors.push(lletraMinuscula);
        oportunitats--;
        if(!historial.includes(lletraMinuscula)){
            historial.push(lletraMinuscula);
        }
    /**si la lletra era correcta mirem si aquella lletra l'havíem juagat abans, en cas que no, 
    la fiquem dins l'array historial*/
    } else{
        if(!historial.includes(lletraMinuscula)){
            historial.push(lletraMinuscula);
            paraulaSecreta.innerHTML = paraulaAEndivinar.join(' ');
        }
    }
    dibuixar();
    comprovarPartida();
}

/** cream una funció que comprova si hem guanyat o hem perdut la partida*/
function comprovarPartida() {
    /* per a veure si hem guanyat mirem si l'array paraulaAEndivinar té barres baixes
    * amb el mètode includes(), en cas que no en quedi vol dir que hem guanyat 
    i mostrem el missatge per pantalla*/
    if (!paraulaAEndivinar.includes('_')) {
        dibuixar();
        resultat.innerHTML = 'Enhorabona has guanyat!!!' ;
        //aturem el crono i deshabilitem l'input text pera que no puguin escriure més lletres
        aturar();
        inputText.disabled = true;  
        /*cream dues variables que són les qui passarem al localstorage
        una es la paraula que hem endivinat
        i l'altre és els segons que hem tardat a endivinarl-la*/
        let nomParaula = paraulaAEndivinar.join(' ');
        let record = '';
        /*si hem tardat més d'un minut guardarem a la variable record 
        els minuts també mitjançant concatenació*/
        if(minuts > 0){
            record = minuts + segons;
        } else {
            record = segons;
        }
        guardarLocalStorage(nomParaula, record);
        aturar();
        
    }
    /*si les oportunitats arriven a zero vol dir que hem perdut,
    mostrem el dibuix i el missatge de que hem perdut,
    aturem el temps i deshabilitem l'input*/
    if(oportunitats == 0) {
        dibuixar();
        resultat.innerHTML = 'Has Perdut!!! Era: ' + paraula;
        aturar(); 
        inputText.disabled = true;  
    }
    
}

//funció partida on donem inici a la partida
function partida(){
    forca.innerHTML = "<img src='./imatges/horca.png' alt='forca'>";
    lletraJugada.focus();
    paraulaRandom(diccionari.length, 0);
    //donem inici al crono de la partida
    resetear();
}

//aquesta funció ens serveix per a guardar les partides
function guardarLocalStorage(nomParaula, recordSegons){
    //creem un objecte amb dues keys(el nom de la paraula i el temps que tardem a endivinar-la)
   let partidaLocalStorage = {
    esport: nomParaula,
    record: recordSegons
   }
   /**Primer comprovem que la paraula està o no dins el localstorage a través
    * del metode localStorage.getItem("aquí posem la variable que hem creat per a guardar partides")
    */
   if(localStorage.getItem(nomParaula)){
    //si ja està dins l'agafem a través d'un JSON.parse( localStorage.getItem(nomParaula) i l'assignem a una variable
        let partidaAntiga = JSON.parse( localStorage.getItem(nomParaula));
        /**entrem dins ella perque ara és un objecte(una vegada guardada era un string) a través del nom.key,
         * en aquest cas 'partidaAntiga.record' i mirem si el record anterior té més segons que el nou
        */
        if(partidaAntiga.record > recordSegons){
            /*en cas que haguem superat el record, el guardem a través de 
            localStorage.setItem( 'nom de la key', JSON.stringify('objecte'));, és a dir el passem a string.
            en el nostre cas és "localStorage.setItem( nomParaula, JSON.stringify(partidaLocalStorage));"
            */
            localStorage.setItem( nomParaula, JSON.stringify(partidaLocalStorage));
            //mostrem missatge de si ha batut o no el record
            record.innerHTML = "Has batut el record de temps de la paraula!";
        } else {
            record.innerHTML = "No has batut el record de temps de la paraula.";
        }
    /*en cas que no existis al local storage, el guardem amb localStorage.setItem( 'nom de la key', JSON.stringify('objecte')); 
    sense demanar res més*/    
    } else {
        localStorage.setItem( nomParaula, JSON.stringify(partidaLocalStorage));    
    }
    
}

//funció crono on creem el crono general de la partida
function crono() {
    //declarem variables i li assignem l'objecte Date creat anteriorment
    minuts = laMevaData.getMinutes();
    segons = laMevaData.getSeconds();
    //anem fent que corrin els segon i minuts d'un en un
    segons += 1;

    if(segons == 60) {
        segons = 0;
        minuts += 1;
        laMevaData.setMinutes(minuts);
    }
    //si segons és menor a 10 i concatenem un '0' abans
    if(segons < 10) {segons = '0' + segons;}

    laMevaData.setSeconds(segons);
    //mostrem per pantalla
    display.innerHTML = minuts + ':' + segons;
    
}
//funció countdown on creem la compta enrere  de 10 segons per oportunitat
function countdown() {
    //condició if-else, mirem si ha arrivat a zero i li restem una oportunitat i reiniciem la compta enrere
    if(countdown1 == 0){
        oportunitats--;
        oportunitat.innerHTML = oportunitats;
        resetCountdown();
        comprovarPartida();
    }else{
        //si no és zero anem descomptant un segon
        countdown1 -=1;
        laMevaData1.setSeconds(countdown1);
    }
    displayEnrere.innerHTML = countdown1;
    
}
/*iniciem crono general am el mètode set interval(li passem la variable el crono,
creada anteriorment i el temps d'execució, en el nostre cas 1000milisegons = 1 segon)
*/
function iniciar() {
    elCrono = setInterval(crono, 1000);
}

/*iniciem la compte enrere  preguntem primer si la lletrajugada = lletraminuscula
ha sigut endivinada abans, si ja està endivinada evitem que el countdown torni a 10 segons,
ja que seria una aventatge per al juagdor anar apretant lletres endivinades
    */
function iniciarCountdown() {
    if(paraulaAEndivinar.includes(lletraMinuscula)){
        if(countdown1 == 0){
            clearTimeout(elCronoEnrere);
            countdown1 = 10;
            elCronoEnrere = setInterval(countdown, 1000);
        }else{
            laMevaData1.setSeconds(countdown1);
        }
    } else {
        /*si no amb el mètode set interval(li passem la variable el mètode countdown,
    creat anteriorment i el temps d'execució, en el nostre cas 1000milisegons = 1 segon)
    */
        clearTimeout(elCronoEnrere);
        countdown1 = 10;
        elCronoEnrere = setInterval(countdown, 1000);
    }

}
//funció per a aturar els dos cronos amb el mètode clearInterval()
function aturar() {
    clearInterval(elCrono); 
    clearInterval(elCronoEnrere); 
}
//funció on creem el display del crono general i el mostrem per pantalla
function resetear() {
    laMevaData.setHours(0, 0, 0, 0);
    display.innerHTML = "00:00"; 
}
//funció on creem el display del countdown i el mostrem per pantalla
function resetCountdown() {
    iniciarCountdown();
    displayEnrere.innerHTML = countdown1;
}

/**Events
 * Creem 3 events addEventListener amb 'keyup' 
 * això vol dir que quan introduïm una lletra
 *  al input text s'apliquen les 3 funcions indicades:
 * 
 * La primera és per a iniciar el crono general amb la funció iniciar()
 *  pero li deim que només s'aplqui una vegada amb {once : true}, 
 * ja que el crono només s'ha d'iniciar una vegada.
 * 
 * La segona funció és iniciar el compte enrere cada vegada que introduïm
 *  una lletra i ens torni a 10 segons, abans hem evitat que es reinici 
 * amb repetició de lletres encertades.
 * 
 * La tercera és la de jugar lletra cada vegada que n'introduïm una.
*/
lletraJugada.addEventListener('keyup', iniciar, {once : true});
lletraJugada.addEventListener('keyup', iniciarCountdown, false);
lletraJugada.addEventListener("keyup", jugarLletra, false);

//Apliquem la funció partida per a poder jugar
partida(); 
