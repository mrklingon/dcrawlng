function showRoom (image: Image) {
    svroom = image
    x = 2
    y = 2
    basic.pause(100)
    music.playSoundEffect(music.createSoundEffect(WaveShape.Sine, 200, 600, 255, 0, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    image.showImage(0)
    if (randint(0, 10) < 4) {
        placeGold()
    }
    if (randint(0, 10) > 4) {
        placeMonster()
    }
}
input.onGesture(Gesture.LogoUp, function () {
    if (255 != led.pointBrightness(x, y + 1)) {
        led.unplot(x, y)
        y = y + 1
    }
    if (y == 4) {
        showRoom(Rooms[randint(0, Rooms.length - 1)])
        Rvisit += 1
    }
})
function placeGold () {
    if (5 < randint(0, 10)) {
        led.plotBrightness(1, 3, 70)
    }
    if (5 < randint(0, 10)) {
        led.plotBrightness(1, 1, 70)
    }
    if (5 < randint(0, 10)) {
        led.plotBrightness(3, 3, 70)
    }
}
input.onGesture(Gesture.TiltLeft, function () {
    if (255 != led.pointBrightness(x - 1, y)) {
        led.unplot(x, y)
        x = x - 1
    }
    if (x == 0) {
        showRoom(Rooms[randint(0, Rooms.length - 1)])
        Rvisit += 1
    }
})
function placeMonster () {
    if (5 < randint(0, 10)) {
        led.plotBrightness(1, 3, 185)
    }
    if (5 < randint(0, 10)) {
        led.plotBrightness(1, 1, 185)
    }
    if (5 < randint(0, 10)) {
        led.plotBrightness(3, 3, 185)
    }
}
input.onGesture(Gesture.TiltRight, function () {
    if (255 != led.pointBrightness(x + 1, y)) {
        led.unplot(x, y)
        x = x + 1
    }
    if (x == 4) {
        showRoom(Rooms[randint(0, Rooms.length - 1)])
        Rvisit += 1
    }
})
function Init () {
    Rooms = [
    images.createImage(`
        # . . . #
        # . . . #
        # . . . #
        # . . . #
        # # # # #
        `),
    images.createImage(`
        # # # # #
        . . . . .
        . . . . .
        . . . . .
        # # # # #
        `),
    images.createImage(`
        # # # # #
        # . . . .
        # . . . .
        # . . . .
        # # # # #
        `),
    images.createImage(`
        # # # # #
        # . . . #
        # . . . #
        # . . . #
        # . . . #
        `),
    images.createImage(`
        # # # # #
        . . . . #
        . . . . #
        . . . . #
        # # # # #
        `),
    images.createImage(`
        # . . . #
        # . . . #
        # . . . #
        # . . . #
        # . . . #
        `),
    images.createImage(`
        # # # # #
        . . . . .
        . . . . .
        . . . . .
        # # # # #
        `)
    ]
}
input.onGesture(Gesture.LogoDown, function () {
    if (255 != led.pointBrightness(x, y - 1)) {
        led.unplot(x, y)
        y = y - 1
    }
    if (y == 0) {
        showRoom(Rooms[randint(0, Rooms.length - 1)])
        Rvisit += 1
    }
})
let svroom: Image = null
let Rooms: Image[] = []
let y = 0
let x = 0
images.createBigImage(`
    # # . . . . . . . .
    # . # . . . . . . .
    # # . . # # . . . .
    . . . # . . . . . .
    . . . . # # . . . .
    `).scrollImage(1, 200)
images.createBigImage(`
    . . . . . . . . . .
    . # . . . . . . . .
    # # # . . . . . . .
    . # . . . . . . . .
    # . # . . . . . . .
    `).scrollImage(1, 200)
game.setScore(0)
game.setLife(3)
x = 2
y = 2
Init()
for (let value of Rooms) {
    showRoom(value)
}
let Rvisit = 0
showRoom(Rooms[randint(0, Rooms.length - 1)])
let MaxRooms = 20 + randint(0, 10)
basic.forever(function () {
    if (70 == led.pointBrightness(x, y)) {
        music.playSoundEffect(music.createSoundEffect(WaveShape.Noise, 54, 54, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
        game.addScore(randint(20, 50))
        showRoom(svroom)
    }
    if (185 == led.pointBrightness(x, y)) {
        music.playSoundEffect(music.createSoundEffect(WaveShape.Square, 1600, 1, 255, 0, 300, SoundExpressionEffect.None, InterpolationCurve.Curve), SoundExpressionPlayMode.UntilDone)
        game.removeLife(1)
        showRoom(svroom)
    }
    led.plot(x, y)
    if (Rvisit >= MaxRooms) {
        game.gameOver()
    }
})
