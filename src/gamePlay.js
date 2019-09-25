import bg_poor from './assets/背景＿又老又窮.jpg';
import avatar1 from './assets/韓導1.svg';
import life from './assets/生命.svg';
import coin_number from './assets/金幣數.svg';
import rock from './assets/石頭.svg';

function preload() {
  this.load.image('bg_poor', bg_poor);
  this.load.svg('avatar1', avatar1);

  this.load.image('life1', life);
  this.load.image('life2', life);
  this.load.image('life3', life);

  this.load.svg('coin_number', coin_number);
  this.load.svg('rock', rock);

  this.time = 90; // 遊戲時間
  this.coin = 0; // 獲得金幣數
  this.isGameStop = false; // 控制遊戲是否停止
  this.isMoving = false; // 韓總是否移動中
}

function create() {
  const self = this;
  const vw = document.body.offsetWidth;
  const vh = document.body.offsetHeight;

  const position = {
    top: 0.72 * vh,
    middle: 0.85 * vh,
    bottom: 0.98 * vh
  };

  this.bg_poor = this.add.tileSprite(vw / 2, vh / 2, 3835, 1080, 'bg_poor');
  this.bg_poor.setScale(vh / 1080);

  // this.avatar = this.add.sprite(0.2 * vw, 0.68 * vh, 'avatar1');
  // this.avatar.setScale(0.8);

  // 生命
  this.life = [];
  this.life[0] = this.add.image(100, 100, 'life1');
  this.life[1] = this.add.image(180, 100, 'life2');
  this.life[2] = this.add.image(260, 100, 'life3');

  // tslint:disable-next-line:max-line-length
  this.time_text = this.add.text(0.5 * vw - 150, 55, `TIME: ${this.time}s`, {
    fontSize: '82px',
    fontFamily: 'Beirut',
    color: '#000'
  });
  // 設定時間
  setInterval(() => {
    console.log(this.time);

    if (this.isGameStop) return;
    this.time -= 1;
    this.time_text.setText(`TIME: ${this.time}s`);
    // this.time_text.setStyle({
    //   fontSize: '82px',
    //   fontFamily: 'Beirut',
    //   color: '#000'
    // });

    // tslint:disable-next-line: align
  }, 1000);

  // 金幣數
  this.add.image(vw - 300, 100, 'coin_number');
  this.add.text(vw - 250, 80, 'X', { fontSize: '42px', fontFamily: 'Beirut', color: '#000' });
  this.add.text(vw - 200, 80, `${this.coin}`, {
    fontSize: '42px',
    fontFamily: 'Beirut',
    color: '#000'
  });

  // const addPosition = (x, y: Position, scale: number): void => {
  //   this.player = this.physics.add.sprite(x, y, 'avatar1');
  //   this.player.y -= 0.8 * this.player.body.halfHeight;
  // }

  // 障礙物
  // this.add.image(0.95 * vw, 0.68 * vh, 'rock');

  // 加入物理效果
  const addPhysics = gameObject => {
    this.physics.add.existing(gameObject);
    gameObject.body.immovable = true;
    gameObject.body.moves = false;
  };

  // 設定韓總位置及物理效果
  this.player = this.physics.add.sprite(0.2 * vw, position.middle, 'avatar1');
  this.player.y -= 0.8 * this.player.body.halfHeight;
  // this.player.position = 'middle';
  this.player.setScale(0.8);
  addPhysics(this.player);
  // 儲存原物體高度大小
  const sourceHeight = this.player.body.sourceHeight;
  // 設定碰撞 physic 大小
  this.player.body.setSize(this.player.body.width, 100);
  this.player.body.setOffset(0, sourceHeight - 100);
  // z-index
  this.player.depth = 10;

  // 障礙物的座標資訊
  const obstaclePos = [{ name: 'rock', x: vw + 200, y: 320, w: 160, h: 83 }];

  // 產生怪物
  this.rock = this.physics.add.sprite(0.9 * vw, 0.85 * vh, 'rock');
  this.rock.y -= this.rock.body.halfHeight;
  addPhysics(this.rock);

  const hittest = (player, rock) => {
    console.log(self);

    const reduceLife = () => {
      const length = self.life.length;
      for (let index = length - 1; index < length; index--) {
        // console.log(self.life[index].alpha);
        if (self.life[index].alpha !== 0) {
          self.life[index].alpha = 0;
          break;
        }
      }
    };
    this.isGameStop = true;
    this.rock.alpha = 0;
    reduceLife();
    console.log('撞到了');
  };

  this.physics.add.collider(this.player, this.rock, hittest);
}

function update() {
  if (this.isGameStop) return;

  const vw = document.body.offsetWidth;
  const vh = document.body.offsetHeight;

  const position = {
    top: 0.72 * vh,
    middle: 0.85 * vh,
    bottom: 0.98 * vh
  };

  this.rock.x -= 2;

  // this.bg_poor.tilePositionX += 1

  // 啟動鍵盤事件
  const keyboard = this.input.keyboard.createCursorKeys();
  console.log(this.isMoving);

  if (this.isMoving) {
    setTimeout(() => {
      this.isMoving = false;
      // tslint:disable-next-line: align
    }, 200);
  } else {
    if (keyboard.up.isDown) {
      console.log(this.player.y);
      if (this.player.y >= 500) {
        this.player.y -= 0.13 * vh;
        this.isMoving = true;
      }
    } else if (keyboard.down.isDown) {
      console.log(this.player.y);
      if (this.player.y <= 700) {
        this.player.y += 0.13 * vh;
        this.isMoving = true;
      }
    }
  }
}

const gamePlay = {
  key: 'gamePlay',
  preload,
  create,
  update
};

export default gamePlay;
