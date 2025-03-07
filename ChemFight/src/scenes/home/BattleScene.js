export class BattleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BattleScene' });
    }

    preload() {
        this.load.image('backgroundBS', 'assets/backgrounds/Desert/background_desert1/Preview1.png');
        this.load.spritesheet('character1', 'assets/Characters/Knight/knight1/Knight_1_Idle.png', { frameWidth: 86, frameHeight: 86 });
        this.load.spritesheet('character2', 'assets/Characters/Minotaur/minotaur1/Minotaur_1_Idle.png', { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('character3', 'assets/Characters/Ninja/Kunoichi/Kunoichi_Idle.png', { frameWidth: 128, frameHeight: 128 });
        this.load.image('hud_bg', 'assets/GUI/HUD/bg_status/spr_player_status_version1.png');
        this.load.image('health_bar', 'assets/GUI/HUD/fullbar/spr_player_status_healthbar_bk.png');
        this.load.image('stamina_bar', 'assets/GUI/HUD/fullbar/spr_player_status_staminahbar_bk.png');
    }

    create() {
        let centerX = this.game.config.width / 2;
        let centerY = this.game.config.height / 2;

        let background = this.add.image(centerX, centerY, 'backgroundBS');
        background.setDisplaySize(this.game.config.width, this.game.config.height);

        let player1 = this.registry.get('player1');
        let player2 = this.registry.get('player2');
        let selectedCharacters = this.registry.get('selectedCharacters');

        this.player1Sprite = this.physics.add.sprite(200, centerY, selectedCharacters[0]);
        this.player2Sprite = this.physics.add.sprite(this.game.config.width - 200, centerY, selectedCharacters[1]);

        this.add.text(100, 50, player1, { fontSize: '20px', fill: '#fff' });
        this.add.text(this.game.config.width - 200, 50, player2, { fontSize: '20px', fill: '#fff' });

        let hudBg1 = this.add.image(150, 100, 'hud_bg').setOrigin(0);
        let hudBg2 = this.add.image(this.game.config.width - 300, 100, 'hud_bg').setOrigin(0);

        hudBg1.setScale(1.5); // Augmente la taille du HUD
        hudBg2.setScale(1.5);

        let healthBar1 = this.add.image(150, 130, 'health_bar').setOrigin(0);
        let staminaBar1 = this.add.image(150, 160, 'stamina_bar').setOrigin(0);
        healthBar1.setScale(1.5, 1);
        staminaBar1.setScale(1.5, 1);

        let healthBar2 = this.add.image(this.game.config.width - 300, 130, 'health_bar').setOrigin(0);
        let staminaBar2 = this.add.image(this.game.config.width - 300, 160, 'stamina_bar').setOrigin(0);
        healthBar2.setScale(1.5, 1);
        staminaBar2.setScale(1.5, 1);

        this.player1Sprite.setCollideWorldBounds(true);
        this.player2Sprite.setCollideWorldBounds(true);

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers(selectedCharacters[0], { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle2',
            frames: this.anims.generateFrameNumbers(selectedCharacters[1], { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.player1Sprite.play('idle');
        this.player2Sprite.play('idle2');

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.Z,
            left: Phaser.Input.Keyboard.KeyCodes.Q,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
            crouch: Phaser.Input.Keyboard.KeyCodes.CTRL
        });
    }

    update() {
        if (this.keys.left.isDown) {
            this.player1Sprite.setVelocityX(-160);
        } else if (this.keys.right.isDown) {
            this.player1Sprite.setVelocityX(160);
        } else {
            this.player1Sprite.setVelocityX(0);
        }

        if (this.keys.up.isDown && this.player1Sprite.body.touching.down) {
            this.player1Sprite.setVelocityY(-330);
        }

        if (this.keys.down.isDown) {
            this.player1Sprite.setVelocityY(160);
        }

        if (this.cursors.left.isDown) {
            this.player2Sprite.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player2Sprite.setVelocityX(160);
        } else {
            this.player2Sprite.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.player2Sprite.body.touching.down) {
            this.player2Sprite.setVelocityY(-330);
        }

        if (this.cursors.down.isDown) {
            this.player2Sprite.setVelocityY(160);
        }
    }
}
