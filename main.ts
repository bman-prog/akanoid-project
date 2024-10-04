namespace SpriteKind {
    export const ball = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.ball, assets.tile`myTile`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`transparency16`)
    BounceBall(ball)
    info.changeScoreBy(1)
})
function PowerUp3 () {
    if (Math.percentChance(30)) {
        spawnBall()
        spawnBall()
    }
}
function PowerUp1 () {
    if (Math.percentChance(1)) {
        scene.cameraShake(4, 500)
        info.changeScoreBy(6)
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    ADVANCELEVEL()
    sprites.destroy(ball)
})
function spawnBall () {
    ball = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 1 1 1 1 1 1 . . . . . 
        . . . . . 1 1 1 1 1 1 . . . . . 
        . . . . . 1 1 1 1 1 1 . . . . . 
        . . . . . 1 1 1 1 1 1 . . . . . 
        . . . . . 1 1 1 1 1 1 . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.ball)
    ball.setBounceOnWall(true)
    ball.setVelocity(ballvx, ballvy)
    ball.setPosition(75, 43)
}
function SpawnPlayer () {
    hero = sprites.create(img`
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        `, SpriteKind.Player)
    hero.setPosition(84, 104)
    controller.moveSprite(hero, 300, controller.dx())
}
scene.onOverlapTile(SpriteKind.ball, assets.tile`myTile0`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`myTile2`)
    BounceBall(ball)
    info.changeScoreBy(7)
    PowerUp2()
    PowerUp3()
})
scene.onOverlapTile(SpriteKind.ball, assets.tile`myTile3`, function (sprite, location) {
    game.gameOver(false)
})
function BounceBall (ballSprite: Sprite) {
    ballvx = randint(ballSpeed / 3, ballSpeed)
    ballvy = ballSprite.vy * -1
    if (ballSprite.vx < 0) {
        ballvx = ballvx * -1
    }
    ballSprite.setVelocity(ballvx, ballvy)
}
scene.onOverlapTile(SpriteKind.ball, assets.tile`myTile2`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`myTile`)
    BounceBall(ball)
    info.changeScoreBy(3)
    PowerUp1()
    PowerUp2()
    PowerUp3()
})
scene.onOverlapTile(SpriteKind.ball, assets.tile`myTile1`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`myTile0`)
    BounceBall(ball)
    info.changeScoreBy(10)
    PowerUp2()
    PowerUp3()
})
function ADVANCELEVEL () {
    totalscoreneeded += LevelScoreNeeded[level]
    tiles.setCurrentTilemap(levelMaps[level])
    level += 1
    game.splash("Level " + level)
    spawnBall()
}
function doSomething () {
    tiles.setTileAt(tiles.getTileLocation(0, 0), assets.tile`transparency16`)
}
function PowerUp2 () {
    if (Math.percentChance(30)) {
        ballSpeed = 20000
        effects.starField.startScreenEffect()
        scene.cameraShake(2, 5000)
        hero.startEffect(effects.coolRadial)
        info.changeScoreBy(1000)
    }
    if (info.score() >= 7000) {
        ADVANCELEVEL()
        sprites.destroyAllSpritesOfKind(SpriteKind.ball)
        spawnBall()
        info.setScore(0)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.ball, function (sprite, otherSprite) {
    BounceBall(otherSprite)
    otherSprite.y = sprite.top - 1
})
let hero: Sprite = null
let ball: Sprite = null
let score = 0
let ballSpeed = 0
let ballvx = 0
let ballvy = 0
let level = 0
let LevelScoreNeeded: number[] = []
let levelMaps: tiles.TileMapData[] = []
levelMaps = [tilemap`level2`, tilemap`level9`, tilemap`level12`]
LevelScoreNeeded = [20, 7000, 6000]
let totalscoreneeded = 0
level = 0
ballvy = 100
ballvx = 100
ballSpeed = 200
info.setScore(score)
ADVANCELEVEL()
SpawnPlayer()
game.onUpdate(function () {
    if (info.score() == totalscoreneeded) {
        ADVANCELEVEL()
        sprites.destroy(ball)
        info.setScore(0)
    }
})
