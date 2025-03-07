export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('background', 'assets/space.png');
        this.load.image('logo', 'assets/phaser.png');

        //  The ship sprite is CC0 from https://ansimuz.itch.io - check out his other work!
        this.load.spritesheet('ship', 'assets/Characters/Knight/knight1/Knight_1_Attack1.png', { frameWidth: 86, frameHeight: 86 });
    }

    create() {
        this.background = this.add.tileSprite(640, 360, 1280, 720, 'background');

        const logo = this.add.image(640, 200, 'logo');

        const ship = this.add.sprite(640, 360, 'ship');

        ship.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('ship', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });

        ship.play('fly');

        this.tweens.add({
            targets: logo,
            y: 400,
            duration: 1500,
            ease: 'Sine.inOut',
            yoyo: true,
            loop: -1
        });
    }

    update() {
        this.keys = this.input.keyboard.addKeys({ 'up': Phaser.Input.Keyboard.KeyCodes.W, 'left': Phaser.Input.Keyboard.KeyCodes.A, 'down': Phaser.Input.Keyboard.KeyCodes.S, 'right': Phaser.Input.Keyboard.KeyCodes.D });
        this.background.tilePositionX += 2;

        this.cursors = this.input.keyboard.createCursorKeys();

        if (this.cursors.left.isDown) {
            player1.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            player1.setVelocityX(160);
        }

        if (this.keys.left.isDown) {
            player2.setVelocityX(-160);
        } else if (this.keys.right.isDown) {
            player2.setVelocityX(160);
        }
    }
    
}
