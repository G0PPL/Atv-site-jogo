//Pegando o elemento do jogador e atrbuindo a variavel jogador
let jogador = document.getElementById("jogador");

// Variáveis para controlar pontos e vidas
let pontos = 0;
let vidas = 3;

// Variáveis para controlar a posição do jogador medido em px
let posicaoX = 50;
let posicaoY = 50;

// Atualiza a posição inicial do jogador usando um addEveventListener
// O evento "keydown" é disparado quando uma tecla é pressionada
document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowUp") {
        posicaoY -= 20;
    }

    if (event.key === "ArrowDown") {
        posicaoY += 20;
    }

    if (event.key === "ArrowLeft") {
        posicaoX -= 20;
    }

    if (event.key === "ArrowRight") {
        posicaoX += 20;
    }

    // impedir que o jogador saia da tela, limitando a posição do jogador
    posicaoX = Math.max(0, Math.min(posicaoX, 740));
    posicaoY = Math.max(0, Math.min(posicaoY, 440));

    //
    jogador.style.left = posicaoX + "px";
    jogador.style.top = posicaoY + "px";

    verificarColisoes();
});


function verificarColisoes() {

    let lixos = document.querySelectorAll(".lixo");

    lixos.forEach(function(lixo) {

        if (colidiu(jogador, lixo)) {

            lixo.remove();

            pontos += 10;

            document.getElementById("pontos").textContent = pontos;
        }
    });


    let animais = document.querySelectorAll(".animal");

    animais.forEach(function(animal) {

        if (colidiu(jogador, animal)) {

            animal.remove();

            vidas--;

            document.getElementById("vidas").textContent = vidas;

            if (vidas <= 0) {

                alert("😢 Game Over! Os animais precisam da sua ajuda!");
                reiniciarJogo();
            }
        }
    });
}


function colidiu(objeto1, objeto2) {

    let a = objeto1.getBoundingClientRect();
    let b = objeto2.getBoundingClientRect();

    return !(
        a.right < b.left ||
        a.left > b.right ||
        a.bottom < b.top ||
        a.top > b.bottom
    );
}


function reiniciarJogo() {

    location.reload();

}
