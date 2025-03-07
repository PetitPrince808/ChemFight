export class CharacterSelect extends Phaser.Scene {
    constructor() {
        super({ key: 'CharacterSelect' });
    }

    preload() {
        this.load.spritesheet('character', 'assets/Characters/Knight/knight1/Knight_1_Attack1.png', { frameWidth: 86, frameHeight: 86 });
    }

    create() {
        let centerX = this.game.config.width / 2;

        let character1 = this.add.sprite(centerX - 150, 200, 'character');
        let character2 = this.add.sprite(centerX + 150, 200, 'character');

        let input1 = this.add.dom(centerX - 150, 300, 'input', { type: 'text', name: 'player1', placeholder: 'Pseudo Joueur 1' });
        let input2 = this.add.dom(centerX + 150, 300, 'input', { type: 'text', name: 'player2', placeholder: 'Pseudo Joueur 2' });

        this.createButton('Prêt', centerX, 500, 'BattleScene', input1, input2, character1, character2);
    }

    createButton(text, x, y, scene, input1, input2, character1, character2) {
        let button = this.add.image(x, y, 'button').setInteractive();
        button.setScale(8, 3.5);

        let buttonText = this.add.text(x, y, text, { fontSize: '20px', fill: '#fff' }).setOrigin(0.5);

        button.on('pointerdown', () => {
            let player1 = input1.node.value;
            let player2 = input2.node.value;
            this.scene.start(scene, { player1, player2, character1, character2 });
        });
        
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
