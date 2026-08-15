let horas = 0;
let minutos = 0;
let segundos = 0;
let milisegundos = 0;
let temposSalvo = [];
let intervalo;

function start() {
    if (!intervalo){
         intervalo = setInterval(contador, 10);
    }
}

function contador (){
    milisegundos +=1;
    
    if (milisegundos === 100){
        milisegundos = 0;
        segundos++;
        if (segundos === 60){
        segundos = 0;
        minutos++;
            if (minutos === 60){
            minutos = 0;
            horas++;
            }
        }
    }
   
    document.getElementById('counter').innerText =`${formatar(horas)}:${formatar(minutos)}:${formatar(segundos)}:${formatarMilisegundos(milisegundos)}`;
}

function pause() {
	clearInterval(intervalo);
    intervalo = null;
}

function stop() {
	clearInterval(intervalo);
    intervalo = null;
    salvar();
    horas = 0;
    minutos = 0;
    segundos = 0;
    milisegundos = 0;

    document.getElementById('counter').innerText = "00:00:00:000";

    
}

function salvar(){
    if (horas === 0 && minutos === 0 && segundos === 0 && milisegundos === 0) return;
    let tempoFormatado = `${formatar(horas)}:${formatar(minutos)}:${formatar(segundos)}:${formatarMilisegundos(milisegundos)}`;
    let tempoTotalMs = (horas * 3600000) + (minutos * 60000) + (segundos * 1000) + milisegundos;
    temposSalvo.push({ texto: tempoFormatado, ms: tempoTotalMs });
    temposSalvo.sort((a, b)=> a.ms - b.ms);
    atualizarTelaHistorico();
}

function atualizarTelaHistorico() {
    let listaHTML = document.getElementById('lista-tempos');
    listaHTML.innerHTML = "";

    temposSalvo.forEach((item, index)=>{
        let li =document.createElement('li');
        li.innerText = `${index + 1}º - ${item.texto}`;
        listaHTML.appendChild(li);
    });
}

function formatar(unidade) {
        return String(unidade).padStart(2, '0');
    }

    function formatarMilisegundos(unidade) {
    return String(unidade).padStart(3, '0');
}
