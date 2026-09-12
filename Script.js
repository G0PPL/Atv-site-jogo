let jogador = document.getElementById("jogador");

let pontos = 0;
let vidas = 3;

let posicaoX = 50;
let posicaoY = 50;

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

    // Impede o jogador de sair da tela
    posicaoX = Math.max(0, Math.min(posicaoX, 740));
    posicaoY = Math.max(0, Math.min(posicaoY, 440));

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
