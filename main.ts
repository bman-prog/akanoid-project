namespace SpriteKind {
    export const ball = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.ball, assets.tile`myTile`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`transparency16`)
    BounceBall(ball)
    info.changeScoreBy(1)
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
        222222222222222222222222222222
        222222222222222222222222222222
        222222222222222222222222222222
        222222222222222222222222222222
        222222222222222222222222222222
        222222222222222222222222222222
        222222222222222222222222222222
        222222222222222222222222222222
        222222222222222222222222222222
        222222222222222222222222222222
        222222222222222222222222222222
        222222222222222222222222222222
        222222222222222222222222222222
        222222222222222222222222222222
        222222222222222222222222222222
        222222222222222222222222222222
        222222222222222222222222222222
        22222222222222222222222222....
        22222222222222222222222...2222
        222222222222222222222..2222222
        22222222222222222222.222222222
        22222222222222222222.222222222
        22222222222222222222.222222222
        22222222222222222222.222222222
        22222222222222222222.222222222
        222222222222222222222..2222222
        22222222222222222222222..22222
        2222222222222222222222222..222
        222222222222222222222222222.22
        2222222222222222222222222222.2
        `, SpriteKind.Player)
    hero.setPosition(84, 104)
    controller.moveSprite(hero, 300, controller.dx())
}
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
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ball, function (sprite, otherSprite) {
    BounceBall(otherSprite)
    otherSprite.y = sprite.top - 1
})
let hero: Sprite = null
let ball: Sprite = null
let ballSpeed = 0
let ballvx = 0
let ballvy = 0
tiles.setCurrentTilemap(tilemap`level2`)
SpawnPlayer()
ballvy = 100
ballvx = 100
ballSpeed = 100
spawnBall()
