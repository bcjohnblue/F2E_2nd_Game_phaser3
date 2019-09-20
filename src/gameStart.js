import bg_poor from './assets/背景＿又老又窮.jpg';
import avatar from './assets/韓導1.svg';
// console.log(avatar);
console.log(avatar);

function preload() {
  this.load.image('bg_poor', bg_poor);
  this.load.svg('avatar', avatar);
  // this.load.image('logo', logoImg);
}

function create() {
  // this.add.image(1200, 800, bg1);
  const width = document.body.offsetWidth;
  const height = document.body.offsetHeight;

  this.bg_poor = this.add.tileSprite(
    width / 2,
    height / 2,
    3835,
    1080,
    'bg_poor'
  );
  this.avatar = this.add.image(200, 200, 'avatar');
  // .setScale(0.8);
  // const logo = this.add.image(400, 150, 'logo');
  // this.tweens.add({
  //   targets: logo,
  //   y: 450,
  //   duration: 2000,
  //   ease: 'Power2',
  //   yoyo: true,
  //   loop: -1
  // });
}

const gameStart = {
  key: 'gameStart',
  preload,
  create
};

export default gameStart;
