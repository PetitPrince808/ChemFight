export class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    preload() {
        this.load.image('button', 'assets/button.png');
    }

    create() {
        var playButton = this.add.image(400, 300, 'button').setInteractive();
        playButton.on('pointerdown', () => this.scene.start('CharacterSelect'));
    }
}

