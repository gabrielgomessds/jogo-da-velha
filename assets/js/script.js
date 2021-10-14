//selecionar todos os elementos requeridos

const selectBox = document.querySelector(".select-box"),
      selectXbtn = selectBox.querySelector(".playerX"),
      selectObtn = selectBox.querySelector(".playerO"),
      playBoard = document.querySelector(".play-board"),
      allBox = document.querySelectorAll("section span"),
      players = document.querySelector(".players"),
      resultBox = document.querySelector(".result-box"),
      wonText = resultBox.querySelector(".won-text"),
      replayBtn = resultBox.querySelector("button");



window.onload = ()=>{ //uma vez que a janela é carregada

    for(let i = 0; i < allBox.length; i++ ){
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }

    selectXbtn.onclick = ()=>{
        selectBox.classList.add("hide");//esconda a caixa de seleção no botão playerX clicado
        playBoard.classList.add("show");//Mostrar o tabuleiro de jogo quando clicar no botão
    }

    selectObtn.onclick = ()=>{
        selectBox.classList.add("hide");//esconda a caixa de seleção no botão playerX clicado
        playBoard.classList.add("show");//Mostrar o tabuleiro de jogo quando clicar no botão
        players.setAttribute("class","players active player")
    }
}

let playerXicon = "bi bi-x-lg"; //icone para o X
let playerOicon = "bi bi-circle"; //icone para o O
let playerSign = "X"; //suponha que o jogador será x
let runBot = true;

//colocar o icone no quadrado
function clickedBox(element){
    /* console.log(element); */
    if(players.classList.contains("player")){
        element.innerHTML = `<i class="${playerOicon}"></i>`; //adicionando icone O
        players.classList.add("active");
        playerSign = "O";
        element.setAttribute("id", playerSign);
    }else{
        element.innerHTML = `<i class="${playerXicon}"></i>`;//adicionando icone X
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }
    selectWinner();
    playBoard.style.pointerEvents = "none";
    element.style.pointerEvents = "none";//uma vez que o usuário seleciona qualquer caixa, então essa caixa não pode ser selecionada novamente
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed(); //gerando retardo de tempo aleatório para que o bot atrase aleatoriamente para selecionar a caixa
    setTimeout(()=>{
        bot(runBot); //ligando a função 
    }, randomDelayTime)
}

function bot(runBot){ //função de clique de bot
   if(runBot){
        playerSign = "O";
        let array = []; //criando uma matriz vazia ... vamos armazenar o índice da caixa não selecionada nesta matriz
        for(let i = 0; i < allBox.length; i++){
            if(allBox[i].childElementCount == 0){ //se span não tem nenhum elemento filho
                array.push(i);
            /*  console.log(i + " " + "não tem filhos"); */
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)];
        
        if(array.length > 0){
            if(players.classList.contains("player")){
                allBox[randomBox].innerHTML = `<i class="${playerXicon}"></i>`; //adicionando icone O
                players.classList.remove("active");
                playerSign = "x";
                allBox[randomBox].setAttribute("id", playerSign)
            }else{
                allBox[randomBox].innerHTML = `<i class="${playerOicon}"></i>`;//adicionando icone X
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }

            selectWinner();
        }
        allBox[randomBox].style.pointerEvents = "none";
        playBoard.style.pointerEvents = "auto";
        playerSign = "X";
   }
}


function getClass(idname){
    return document.querySelector(".box" + idname).id;
}

function checkClasse(val1, val2, val3, sign){
    if(getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign){
        return true;

    }
}

function selectWinner(){
    if(checkClasse(1,2,3, playerSign) || checkClasse(4,5,6, playerSign) || checkClasse(6,7,8, playerSign) || checkClasse(1,4,7, playerSign) || checkClasse(2,5,8, playerSign) || checkClasse(3,6,9, playerSign) || checkClasse(1,5,9, playerSign) || checkClasse(3,5,7, playerSign)){
        console.log(playerSign + " " + "é o vencedor");
        runBot = false;
        bot(runBot);

        setTimeout(()=>{
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700);

        wonText.innerHTML = `O <p>${playerSign}</p> ganhou o jogo!`;

    }else{
        if(getClass(1) != "" && (2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != "" && getClass(7) != "" && getClass(8) != "" && getClass(9) != ""){
            runBot = false;
            bot(runBot);

            setTimeout(()=>{
                playBoard.classList.remove("show");
                resultBox.classList.add("show");
            }, 700);

            wonText.textContent = `Partida empatada!`;
        
        }



    }
}



replayBtn.onclick = ()=>{
    window.location.reload();
}