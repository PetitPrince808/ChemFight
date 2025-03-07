import { Start } from './scenes/Start.js';
import { MainMenu } from './scenes/home/MainMenu.js';
import { CharacterSelect } from './scenes/home/CharacterSelect.js';
import { BattleScene } from './scenes/home/BattleScene.js';

const config = {
    type: Phaser.AUTO,
    title: 'ChemFight',
    description: '',
    parent: 'game-container',
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [
        MainMenu, 
        CharacterSelect, 
        BattleScene,
        Start
    ],
        physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}

new Phaser.Game(config);
            