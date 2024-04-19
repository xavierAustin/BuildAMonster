class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;
        this.moveLeft = 0;
        this.moveRight = 0;
        this.fangs = 0;
        this.blink = 0;
        this.breath = 4.7;
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
        this.input.keyboard.on('keydown',(event) => {
            if (event.key == 'a')
                this.moveLeft = 1;
            if (event.key == 'd')
                this.moveRight = 1;
            if (event.key == 's' || event.key == 'f')
                this.fangs = (event.key == 'f');
        });
        this.input.keyboard.on('keyup',(event) => {
            if (this.moveLeft && event.key == 'a')
                this.moveLeft = 0;
            if (this.moveRight && event.key == 'd')
                this.moveRight = 0;
        });
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        my.sprite.body = [];
        my.sprite.body[0] = this.add.sprite(this.bodyX-95, this.bodyY+35, "monsterParts", "arm_whiteE.png");
        my.sprite.body[0].flipX = 1;
        my.sprite.body[0].setAngle(25);
        my.sprite.body[1] = this.add.sprite(this.bodyX+95, this.bodyY+35, "monsterParts", "arm_whiteE.png");
        my.sprite.body[1].setAngle(-25);
        my.sprite.body[2] = this.add.sprite(this.bodyX-42, this.bodyY+90, "monsterParts", "leg_whiteC.png");
        my.sprite.body[2].flipX = 1;
        my.sprite.body[2].setScale(1.2);
        my.sprite.body[3] = this.add.sprite(this.bodyX+42, this.bodyY+90, "monsterParts", "leg_whiteC.png");
        my.sprite.body[3].setScale(1.2);
        my.sprite.body[4] = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_whiteD.png");
        my.sprite.body[5] = this.add.sprite(this.bodyX, this.bodyY-95, "monsterParts", "body_whiteB.png");
        my.sprite.body[5].setScale(0.95);
        my.sprite.body[6] = this.add.sprite(this.bodyX+75, this.bodyY-160, "monsterParts", "detail_white_ear.png");
        my.sprite.body[6].setScale(1.8,1.5);
        my.sprite.body[7] = this.add.sprite(this.bodyX-75, this.bodyY-160, "monsterParts", "detail_white_ear.png");
        my.sprite.body[7].flipX = 1;
        my.sprite.body[7].setScale(1.8,1.5);
        my.sprite.body[8] = this.add.sprite(this.bodyX-30, this.bodyY-140, "monsterParts", "eyebrowB.png");
        my.sprite.body[8].flipX = 1;
        my.sprite.body[8].setScale(0.6,0.75);
        my.sprite.body[9] = this.add.sprite(this.bodyX+30, this.bodyY-140, "monsterParts", "eyebrowB.png");
        my.sprite.body[9].setScale(0.6,0.75);
        my.sprite.body[10] = this.add.sprite(this.bodyX-38, this.bodyY-100, "monsterParts", "eye_red.png");
        my.sprite.body[10].setScale(0.8);
        my.sprite.body[11] = this.add.sprite(this.bodyX+38, this.bodyY-100, "monsterParts", "eye_red.png");
        my.sprite.body[11].setScale(0.8);
        my.sprite.body[12] = this.add.sprite(this.bodyX, this.bodyY+45-100, "monsterParts", "mouthI.png");
        my.sprite.body[13] = this.add.sprite(this.bodyX-38, this.bodyY-100, "monsterParts", "eye_yellow.png");
        my.sprite.body[13].setScale(0.84);
        my.sprite.body[14] = this.add.sprite(this.bodyX+38, this.bodyY-100, "monsterParts", "eye_yellow.png");
        my.sprite.body[14].setScale(0.84);
        my.sprite.body[15] = this.add.sprite(this.bodyX, this.bodyY+45-100, "monsterParts", "mouth_closed_fangs.png");
        my.sprite.body[15].setScale(1.8,-0.5);
        my.sprite.body[16] = this.add.sprite(this.bodyX-38, this.bodyY-100, "monsterParts", "body_whiteB.png");
        my.sprite.body[16].setScale(0.3);
        my.sprite.body[17] = this.add.sprite(this.bodyX+38, this.bodyY-100, "monsterParts", "body_whiteB.png");
        my.sprite.body[17].setScale(0.3);
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability
        //movement
        let moveBy = (this.moveRight-this.moveLeft)*6;
        
        let i = 0
        for (let x of my.sprite.body){
            //movement cont.
            x.x += moveBy;
            //breathing
            if (i < 2)
                x.y += Math.sin(this.breath-0.5)*0.5;
            if (i > 3)
                x.y += Math.sin(this.breath)*0.5;
            //fangs/smile
            if (i > 7)
                x.visible = this.fangs^(i>12);
            //blinking
            if (i > 15)
                x.visible = (this.blink>30);
            i ++;
        }
        
        this.blink++;
        this.breath = (this.breath+0.05)%(2*Math.PI);
        console.log(Math.sin(this.breath))
        if (this.blink > 40)
            this.blink = Math.floor(Math.random() * -120);
    }

}