const cnv = document.getElementById('cnv')
const ctx = cnv.getContext('2d')

const buttons = document.getElementById('container-buttons')



let sprite_player = new Image()
sprite_player.src = "img/sprite.png"


/* =============== OBJETOS =============== */

// OBJETO ÁREA DO GAME
let page = {
    larg: 600,
    alt: 600
}

// OBJETO PLAYER
let player = {
    posX: 50,
    posY: 100,
    srcX: 0,
    srcY: 0,
    srcLarg: 48,
    srcAlt: 48,
    larg: 96,
    alt: 96,
    speed: 5,
    contAnim: 0,
    speedAnim: 10, // Inversamente proporcional
    mvUp: false,
    mvDown: false,
    mvRight: false,
    mvLeft: false,
}

/* =============== EVENTOS =============== */

buttons.addEventListener('touchstart', move)
buttons.addEventListener('touchend', stop)
document.addEventListener('keydown', move)
document.addEventListener('keyup', stop)

function move(e){
    e.preventDefault

    id = (e.target.id != '') ? e.target.id : e.key

    switch (id) {
        case 'w':
            player.mvUp = true
            break;
        case 's':
            player.mvDown = true
            break;
        case 'd':
            player.mvRight = true
            break;
        case 'a':
            player.mvLeft = true
            break;
        default:
            break;
    }
}
function stop(e){
    e.preventDefault

    id = (e.target.id != '') ? e.target.id : e.key

    switch (id) {
        case 'w':
            player.mvUp = false
            break;
        case 's':
            player.mvDown = false
            break;
        case 'd':
            player.mvRight = false
            break;
        case 'a':
            player.mvLeft = false
            break;
        default:
            break;
    }
}

/* =============== FUNÇÕES =============== */

// RENDERIZA NA PÁGINA OS SPRITES E DESENHOS
function desenhar() { 
    ctx.clearRect(0, 0, page.larg, page.alt)

    // ctx.fillRect(player.posX, player.posY, player.larg, player.alt)
    ctx.drawImage(
        sprite_player,
        player.srcY, player.srcX, player.srcLarg, player.srcAlt,
        player.posX, player.posY, player.larg, player.alt
    )
}

// MOVIMENTAÇÃO DO PERSONAGEM
function atualizar() {
    if (player.mvUp && !player.mvDown) {
        player.posY -= player.speed
        player.srcY = 96
    } else if (!player.mvUp && player.mvDown) {
        player.posY += player.speed
        player.srcY = 0
    }
    if (player.mvRight && !player.mvLeft) {
        player.posX += player.speed
        player.srcY = 144
    } else if (!player.mvRight && player.mvLeft) {
        player.posX -= player.speed
        player.srcY = 48
    }

    if (player.mvUp || player.mvDown || player.mvRight || player.mvLeft) {
        player.contAnim++
        if (player.contAnim >= (4 * player.speedAnim)) {
            player.contAnim = 0
        }
        player.srcX = Math.floor(player.contAnim / player.speedAnim) * player.srcLarg;
    } else {
        player.srcX = 0
    }

}

// VERIFICA SE O PERSONAGEM ESTÁ COLIDINDO COM A PAREDE
function verificaColisao() {
    if(player.posX < 0){
        player.posX = 0
    }else if((player.posX + player.larg) > page.larg){
        player.posX = page.larg - player.larg
    }

    if(player.posY < 0){
        player.posY = 0
    }else if((player.posY + player.alt) > page.alt){
        player.posY = page.alt - player.alt
    }
}

/* =============== LOOP =============== */

// REALIZA O LOOP
function loop() {
    atualizar()
    verificaColisao()
    desenhar()
    
    window.requestAnimationFrame(loop, cnv)
}

loop()