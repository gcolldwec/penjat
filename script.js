	
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


//funció cercar paraula random amb metode Math.random
function paraulaRandom(max,min){
    let aleatori = Math.floor (Math.random() * (max-min)+ min); ;
    paraula = diccionari[aleatori];
    console.log(aleatori);
    console.log(paraula);
    console.log(paraula.length);
    paraula.split('');
    for(let i = 0; i < paraula.length; i++) {
        if(paraula.charAt(i) == '-'){
            paraulaAEndivinar.push('-');
        }else{
            paraulaAEndivinar.push('_');;
        }
    }
   
    dibuixar();
}

//funció dibuixar        
function dibuixar() {
    paraulaSecreta.innerHTML = paraulaAEndivinar.join(' ');
    //lletras errades
    errorsMostrar.innerHTML = errors.join(' ');
    // historial de lletras 
    historialMostrar.innerHTML = historial.join(' ');
    //opotyunitats que ens queden
    oportunitat.innerHTML = oportunitats;
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
    

function jugarLletra() {
    let lletra = lletraJugada.value; 
    lletraMinuscula = lletra.toLowerCase();
    lletraJugada.value = '';
    lletraJugada.focus();
    let esCorrecte = false;
    for(let i = 0; i < paraula.length; i++) {
        if(lletraMinuscula == paraula.charAt(i)){
            esCorrecte = true;
            paraulaAEndivinar[i] = lletraMinuscula;
        } 
    }
    if(!esCorrecte) {
        errors.push(lletraMinuscula);
        oportunitats--;
        if(!historial.includes(lletraMinuscula)){
            historial.push(lletraMinuscula);
        }
    } else{
        if(!historial.includes(lletraMinuscula)){
            historial.push(lletraMinuscula);
            paraulaSecreta.innerHTML = paraulaAEndivinar.join(' ');
        }
    }
    dibuixar();
    comprovarPartida();
}

function comprovarPartida() {
    
    if (!paraulaAEndivinar.includes('_')) {
        dibuixar();
        resultat.innerHTML = 'Enhorabona has guanyat!!!' ;
        aturar();
        let nomParaula = paraulaAEndivinar.join(' ');
        let record = '';
        if(minuts > 0){
            record = "1" + segons;
        } else {
            record = segons;
        }
        guardarLocalStorage(nomParaula, record);
        aturar();
        
    }
    
    if(oportunitats == 0) {
        dibuixar();
        resultat.innerHTML = 'Has Perdut!!! Era: ' + paraula;
        aturar();   
    }
    
}

function partida(){
    forca.innerHTML = "<img src='./imatges/horca.png' alt='forca'>";
    lletraJugada.focus();
    paraulaRandom(diccionari.length, 0);
    resetear();
}

function guardarLocalStorage(nomParaula, recordSegons){
    
   let partidaLocalStorage = {
    esport: nomParaula,
    record: recordSegons
   }
   if(localStorage.getItem(nomParaula)){
        let partidaAntiga = JSON.parse( localStorage.getItem(nomParaula));
        if(partidaAntiga.record > recordSegons){
            localStorage.setItem( nomParaula, JSON.stringify(partidaLocalStorage));
            record.innerHTML = "Has batut el record de temps de la paraula!";
        } else {
            record.innerHTML = "No has batut el record de temps de la paraula.";
        }
        
    } else {
        localStorage.setItem( nomParaula, JSON.stringify(partidaLocalStorage));    
    }
    
}

function crono() {
    
    let hores = laMevaData.getHours();
    minuts = laMevaData.getMinutes();
    segons = laMevaData.getSeconds();

    segons += 1;

    if(segons == 60) {
        segons = 0;
        minuts += 1;
        laMevaData.setMinutes(minuts);
    }

    if(hores < 10) {hores = '0' + hores;}
    if(minuts < 10) {minuts = '0' + minuts;}
    if(segons < 10) {segons = '0' + segons;}

    laMevaData.setSeconds(segons);
    
    display.innerHTML = hores + ':' +
                    minuts + ':' +
                    segons;
    
}

function countdown() {
    
    if(countdown1 == 0){
        oportunitats--;
        oportunitat.innerHTML = oportunitats;
        resetCountdown();
        comprovarPartida();
    }else{
        countdown1 -=1;
        laMevaData1.setSeconds(countdown1);
    }
    displayEnrere.innerHTML = countdown1;
    
}

function iniciar() {
    elCrono = setInterval(crono, 1000);
}

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
        clearTimeout(elCronoEnrere);
        countdown1 = 10;
        elCronoEnrere = setInterval(countdown, 1000);
    }

}

function aturar() {
    clearInterval(elCrono); 
    clearInterval(elCronoEnrere); 
}

function resetear() {
    laMevaData.setHours(0, 0, 0, 0);
    display.innerHTML = "00:00:00";
    
}

function resetCountdown() {
    iniciarCountdown();
    displayEnrere.innerHTML = countdown1;
}

//Events
lletraJugada.addEventListener('keyup', iniciar, {once : true});
lletraJugada.addEventListener('keyup', iniciarCountdown, false);
lletraJugada.addEventListener("keyup", jugarLletra, false);

partida(); 
