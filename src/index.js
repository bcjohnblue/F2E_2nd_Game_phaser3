import Phaser from 'phaser';
import gameStart from './gameStart';
// import logoImg from "./assets/logo.png";

const width = document.body.offsetWidth;
const height = '100vh';

const config = {
  type: Phaser.AUTO,
  // parent: 'app',
  width,
  height,
  scene: [gameStart]
};

const game = new Phaser.Game(config);

function preload() {
  // this.load.image('logo', bg1);
}

function create() {
  // const logo = this.add.image(400, 150, "logo");
  // this.tweens.add({
  //   targets: logo,
  //   y: 450,
  //   duration: 2000,
  //   ease: "Power2",
  //   yoyo: true,
  //   loop: -1
  // });
}
