namespace SpriteKind {
    export const ball = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.ball, assets.tile`myTile`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`transparency16`)
    BounceBall(ball)
    info.changeScoreBy(1)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
	
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
})
scene.onOverlapTile(SpriteKind.ball, assets.tile`myTile1`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`myTile0`)
    BounceBall(ball)
    info.changeScoreBy(10)
})
function ADVANCELEVEL () {
    tiles.setCurrentTilemap(level_maps[level])
    level += 1
    spawnBall()
    game.splash("Level " + level)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.ball, function (sprite, otherSprite) {
    BounceBall(otherSprite)
    otherSprite.y = sprite.top - 1
})
let hero: Sprite = null
let ball: Sprite = null
let ballSpeed = 0
let ballvx = 0
let ballvy = 0
let level = 0
let level_maps: tiles.TileMapData[] = []
level_maps = [tilemap`level2`, tilemap`level9`, tilemap`level2`]
let LevelScoreNeeded = [20, 50, 60]
let totalscoreneeded = 0
level = 0
ballvy = 100
ballvx = 100
ballSpeed = 1000
info.setScore(0)
ADVANCELEVEL()
SpawnPlayer()
game.onUpdate(function () {
    if (true) {
    	
    }
})
game.onUpdate(function () {
    totalscoreneeded += LevelScoreNeeded[level]
    if (info.score() == totalscoreneeded) {
        ADVANCELEVEL()
    }
})
