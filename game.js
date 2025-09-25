// --- 1. 初始化設定 ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

const GRAVITY = 0.8;
const GROUND_Y = canvas.height - 50; // 地面高度

// --- 2. 玩家物件 ---
const player1 = {
    x: canvas.width / 2 - 150,
    y: GROUND_Y - 40,
    width: 40,
    height: 40,
    color: '#333333', // 黑色
    dx: 0,
    dy: 0,
    isJumping: true
};

const player2 = {
    x: canvas.width / 2 + 110,
    y: GROUND_Y - 40,
    width: 40,
    height: 40,
    color: '#B92C2C', // 紅色
    dx: 0,
    dy: 0,
    isJumping: true
};

function drawPlayer(player) {
    ctx.fillStyle = player.color;
    // 畫一個簡單的方塊
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// --- 3. 輸入處理 ---
const keys = {
    a: false, d: false, w: false,
    ArrowLeft: false, ArrowRight: false, ArrowUp: false
};

window.addEventListener('keydown', (e) => { if (e.key in keys) keys[e.key] = true; });
window.addEventListener('keyup', (e) => { if (e.key in keys) keys[e.key] = false; });

function handleInput() {
    // 玩家1
    player1.dx = 0;
    if (keys.a) player1.dx = -5;
    if (keys.d) player1.dx = 5;
    if (keys.w && !player1.isJumping) {
        player1.dy = -18;
        player1.isJumping = true;
    }

    // 玩家2
    player2.dx = 0;
    if (keys.ArrowLeft) player2.dx = -5;
    if (keys.ArrowRight) player2.dx = 5;
    if (keys.ArrowUp && !player2.isJumping) {
        player2.dy = -18;
        player2.isJumping = true;
    }
}

// --- 4. 遊戲主循環 ---
function gameLoop() {
    requestAnimationFrame(gameLoop);

    // 清除畫布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 繪製背景和地面
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#888';
    ctx.fillRect(0, GROUND_Y, canvas.width, canvas.height - GROUND_Y);

    // 處理輸入
    handleInput();

    // 更新並繪製玩家
    updatePlayer(player1);
    updatePlayer(player2);
    
    drawPlayer(player1);
    drawPlayer(player2);
}

function updatePlayer(player) {
    // 水平移動 + 邊界檢測
    player.x += player.dx;
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;

    // 垂直移動 (重力)
    player.dy += GRAVITY;
    player.y += player.dy;

    // 地面碰撞檢測
    if (player.y + player.height > GROUND_Y) {
        player.y = GROUND_Y - player.height;
        player.dy = 0;
        player.isJumping = false;
    }
}

// --- 5. 啟動遊戲 ---
gameLoop();
