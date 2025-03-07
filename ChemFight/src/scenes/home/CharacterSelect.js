export class CharacterSelect extends Phaser.Scene {
    constructor() {
        super({ key: 'CharacterSelect' });
    }

    preload() {
        this.load.spritesheet('character', 'assets/Characters/Knight/knight1/Knight_1_Attack1.png', { frameWidth: 86, frameHeight: 86 });
    }

    create() {
        var character1 = this.add.sprite(200, 300, 'character');
        var character2 = this.add.sprite(600, 300, 'character');

        character1.setInteractive();
        character2.setInteractive();

        character1.on('pointerdown', () => this.selectCharacter(1));
        character2.on('pointerdown', () => this.selectCharacter(2));
    }

    selectCharacter(player) {
        this.scene.start('BattleScene', { player });
    }
}

