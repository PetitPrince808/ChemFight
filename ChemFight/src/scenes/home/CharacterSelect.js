export class CharacterSelect extends Phaser.Scene {
    constructor() {
        super({ key: 'CharacterSelect' });
    }

    preload() {
        this.load.image('backgroundCS', 'assets/backgrounds/Nature/NaturePack3/nature_4/orig.png');
        this.load.spritesheet('character1', 'assets/Characters/Knight/knight1/Knight_1_Attack1.png', { frameWidth: 86, frameHeight: 86 });
        this.load.spritesheet('character2', 'assets/Characters/Minotaur/minotaur1/Minotaur_1_Idle.png', { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('character3', 'assets/Characters/Ninja/Kunoichi/Kunoichi_Idle.png', { frameWidth: 128, frameHeight: 128 });
    }

    create() {
        let centerX = this.game.config.width / 2;
        let centerY = this.game.config.height / 2;

        let background = this.add.image(centerX, centerY, 'backgroundCS');
        background.setDisplaySize(this.game.config.width, this.game.config.height);

        let characters = ['character1', 'character2', 'character3'];
        let characterSprites = [];
        for (let i = 0; i < characters.length; i++) {
            let character = this.add.sprite(centerX - 200 + i * 200, 200, characters[i]);
            character.setInteractive();
            characterSprites.push(character);
        }

        let inputContainer = document.createElement('div');
        inputContainer.style.position = 'absolute';
        inputContainer.style.width = '100%';
        inputContainer.style.display = 'flex';
        inputContainer.style.justifyContent = 'space-around';
        inputContainer.style.top = `${centerY + 50}px`;
        inputContainer.innerHTML = `
            <input id="player1" type="text" name="player1" placeholder="Pseudo Joueur 1">
            <input id="player2" type="text" name="player2" placeholder="Pseudo Joueur 2">
        `;
        document.body.appendChild(inputContainer);

        this.createButton('Prêt', centerX, 500, 'BattleScene', inputContainer, characterSprites);
    }

    createButton(text, x, y, scene, inputContainer, characterSprites) {
        let button = this.add.image(x, y, 'button').setInteractive();
        button.setScale(8, 3.5);

        let buttonText = this.add.text(x, y, text, { fontSize: '20px', fill: '#fff' }).setOrigin(0.5);

        button.on('pointerdown', () => {
            let player1 = document.getElementById('player1').value;
            let player2 = document.getElementById('player2').value;
            let selectedCharacters = characterSprites.filter(char => char.selected);
            if (selectedCharacters.length === 2 && player1 && player2) {
                this.registry.set('player1', player1);
                this.registry.set('player2', player2);
                this.registry.set('selectedCharacters', selectedCharacters.map(char => char.texture.key));
                
                this.scene.start(scene);
                inputContainer.remove();
            } else {
                alert("Veuillez sélectionner exactement 2 personnages et entrer les noms des joueurs.");
            }
        });

        button.on('pointerover', () => {
            button.setTint(0xff0000);
        });

        button.on('pointerout', () => {
            button.clearTint();
        });

        characterSprites.forEach((character, index) => {
            character.on('pointerdown', () => {
                if (!character.selected && characterSprites.filter(char => char.selected).length >= 2) {
                    return;
                }
                character.selected = !character.selected;
                let selectedCount = characterSprites.filter(char => char.selected).length;
                if (character.selected) {
                    if (selectedCount === 1) {
                        character.setTint(0xff5733);
                    } else if (selectedCount === 2) {
                        character.setTint(0x33f0ff);
                    }
                } else {
                    character.setTint(0xffffff); 
                }
            });
        });
    }

    update() {

    }
}
