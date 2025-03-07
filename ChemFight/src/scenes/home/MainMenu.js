export class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    preload() {
        this.load.image('background', 'assets/backgrounds/home_bg.jpg');
        this.load.image('button', 'assets/GUI/design_elements/spr_dialogue_box_button.png');
    }

    create() {
        let centerX = this.game.config.width / 2;
        let centerY = this.game.config.height / 2;

        this.add.image(centerX, centerY, 'background');

        this.add.text(centerX, 100, 'CHEMFIGHT', { fontSize: '52px', fill: '#fff' }).setOrigin(0.5);

        // Ajout des boutons
        this.createButton('Jouer', centerX, centerY - 100, 'CharacterSelect');
        this.createButton('Touches', centerX, centerY - 50, 'Controls');
        this.createButton('Paramètres', centerX, centerY, 'Settings');
        this.createButton('Crédits', centerX, centerY + 50, 'Credits');
    }

    createButton(text, x, y, scene) {
        let button = this.add.image(x, y, 'button').setInteractive();
        button.setScale(8, 3.5);

        let buttonText = this.add.text(x, y, text, { fontSize: '20px', fill: '#fff' }).setOrigin(0.5);

        button.on('pointerdown', () => this.scene.start(scene));
        
        button.on('pointerover', () => {
            button.setTint(0xff0000);
        });

        button.on('pointerout', () => {
            button.clearTint();
        });
    }

    update() {

    }
}
