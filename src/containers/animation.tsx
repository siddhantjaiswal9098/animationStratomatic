
import * as React from 'react';
import * as THREE from 'three';

/**
 * Copyright (c) 2013 Ben Lesh
 * Pong ThreeJS demo
 */

console.clear();

const App = (props: any) => {
  let div = document.createElement('div');
  React.useEffect(() => {
    // "constants"... 
    var WIDTH: any = 700,
      HEIGHT: any = 500,
      VIEW_ANGLE: any = 45,
      ASPECT = WIDTH / HEIGHT,
      NEAR: any = 0.1,
      FAR: any = 10000,
      FIELD_WIDTH: any = 2500,
      FIELD_LENGTH: any = 3000,
      BALL_RADIUS: any = 20,
      PADDLE_WIDTH: any = 50,
      PADDLE_HEIGHT: any = 30,
      BALL_SPEED: any = 20,
      //get the scoreboard element.
      scoreBoard: any = document.body.appendChild(div),

      //declare members.
      renderer: any, camera: any, mainLight: any,
      scene: any, ball: any, paddle1: any, paddle2: any, field: any, running: any,
      score = {
        player1: 0,
        player2: 0
      };


    function startBallMovement() {
      var num = Math.floor(Math.random() * 18) + 1;
      num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
      var direction = -1;
      console.log('direction', num)
      ball.$velocity = {
        x: num,
        z: direction * BALL_SPEED
      };
      ball.$stopped = false;
    }

    function processCpuPaddle() {
      var ballPos = ball.position,
        cpuPos = paddle2.position;

      if (cpuPos.x - 100 > ballPos.x) {
        cpuPos.x -= Math.min(cpuPos.x - ballPos.x, 60);
      } else if (cpuPos.x - 100 < ballPos.x) {
        cpuPos.x += Math.min(ballPos.x - cpuPos.x, 60);
      }
    }

    function processBallMovement() {
      if (!ball.$velocity) {
        startBallMovement();
      }

      if (ball.$stopped) {
        return;
      }

      updateBallPosition();

      if (isSideCollision()) {
        // ball.$velocity.x *= -1;

        ball.$velocity.x = 0;
        ball.$velocity.z *= 0;
        scoreBy('player1');
      }

      if (isPaddle1Collision()) {
        // hitBallBack(paddle1);
        scoreBy('player1');
      }

      if (isPaddle2Collision()) {
        // hitBallBack(paddle2);
        scoreBy('player1');
      }

      if (isPastPaddle1()) {
        scoreBy('player2');
      }

      if (isPastPaddle2()) {
        scoreBy('player1');
      }
    }

    function isPastPaddle1() {
      return ball.position.z > paddle1.position.z + 100;
    }

    function isPastPaddle2() {
      return ball.position.z < paddle2.position.z - 100;
    }

    function updateBallPosition() {
      var ballPos = ball.position;

      //update the ball's position.
      ballPos.x += ball.$velocity.x;
      ballPos.z += ball.$velocity.z;

      // add an arc to the ball's flight. Comment this out for boring, flat pong.
      console.log('ballPos.z', ballPos.z, ballPos.x)
      ballPos.y = -((ballPos.z - 1) * (ballPos.z - 1) / 5000) + 435;
    }

    function isSideCollision() {
      return false;
      var ballX = ball.position.x,
        halfFieldWidth = FIELD_WIDTH / 2;
      return ballX - BALL_RADIUS < -halfFieldWidth || ballX + BALL_RADIUS > halfFieldWidth;
    }

    // function hitBallBack(paddle: any) {
    //   ball.$velocity.x = (ball.position.x - paddle.position.x) / 5;
    //   ball.$velocity.z *= -1;
    // }

    function isPaddle2Collision() {

      var num = Math.floor(Math.random() * 0) + 1;
      num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
      return ball.position.z - BALL_RADIUS - num <= paddle2.position.z &&
        isBallAlignedWithPaddle(paddle2);
    }

    function isPaddle1Collision() {
      return ball.position.z + BALL_RADIUS >= paddle1.position.z &&
        isBallAlignedWithPaddle(paddle1);
    }

    function isBallAlignedWithPaddle(paddle: any) {
      var halfPaddleWidth = PADDLE_WIDTH / 2,
        paddleX = paddle.position.x,
        ballX = ball.position.x;
      return ballX > paddleX - halfPaddleWidth &&
        ballX < paddleX + halfPaddleWidth;
    }

    function scoreBy(playerName: any) {
      addPoint(playerName);
      updateScoreBoard();
      stopBall();
      setTimeout(reset, 3000);
    }

    function updateScoreBoard() {
      scoreBoard.innerHTML = 'Balls Pitched: ' + score.player1;
    }

    function stopBall() {
      ball.$stopped = true;
    }

    function addPoint(playerName: any) {
      score[playerName]++;
      console.log(score);
    }

    function startRender() {
      running = true;
      render();
    }

    // function stopRender() {
    //   running = false;
    // }

    function render() {
      if (running) {
        requestAnimationFrame(render);

        processBallMovement();
        processCpuPaddle();

        renderer.render(scene, camera);
      }
    }

    function reset() {
      ball.position.set(0, 0, 1400);
      ball.$velocity = null;
    }

    function init() {
      // container = document.getElementById('root');

      renderer = new THREE.WebGLRenderer();
      renderer.setSize(WIDTH, HEIGHT);
      // renderer.setClearColor(0x9999BB, 1);
      // container.appendChild(renderer.domElement);
      document.body.appendChild(renderer.domElement);


      camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
      camera.position.set(0, 1000, FIELD_LENGTH / 2 + 1500);

      scene = new THREE.Scene();
      scene.add(camera);



      let loader = new THREE.TextureLoader();

      loader.load('images/pitchImage.jpg', function (texture: any) {
        scene.background = texture;
      });

      var fieldGeometry = new THREE.BoxGeometry(FIELD_WIDTH, 20, FIELD_LENGTH, 1, 1, 1),
        fieldMaterial = new THREE.MeshLambertMaterial({ color: 0x003300 });
      field = new THREE.Mesh(fieldGeometry, fieldMaterial);
      field.position.set(0, -50, 0);

      // scene.add(field);
      paddle1 = addPaddle();
      paddle1.position.z = FIELD_LENGTH / 2;
      paddle2 = addPaddle();
      paddle2.position.z = -FIELD_LENGTH / 2;

      var ballGeometry = new THREE.SphereGeometry(BALL_RADIUS, 26, 26),
        ballMaterial = new THREE.MeshLambertMaterial({ color: 0xCC0000 });
      ball = new THREE.Mesh(ballGeometry, ballMaterial);
      ball.position.set(0, 0, 1400);
      scene.add(ball);



      mainLight = new THREE.HemisphereLight(0xFFFFFF, 0x003300);
      mainLight.castShadow = true;
      scene.add(mainLight);


      camera.lookAt(field.position);

      updateScoreBoard();
      startRender();

      // renderer.domElement.addEventListener('mousemove', containerMouseMove);
      renderer.domElement.style.cursor = 'none';
    }

    function addPaddle() {
      var paddleGeometry = new THREE.BoxGeometry(PADDLE_WIDTH, PADDLE_HEIGHT, 10, 1, 1, 1),
        paddleMaterial = new THREE.MeshLambertMaterial({ color: 0xCCCCCC }),
        paddle = new THREE.Mesh(paddleGeometry, paddleMaterial);
      scene.add(paddle);
      return paddle;
    }

    // function containerMouseMove(e: any) {
    //   var mouseX = e.clientX;
    //   camera.position.x = paddle1.position.x = -((WIDTH - mouseX) / WIDTH * FIELD_WIDTH) + (FIELD_WIDTH / 2);
    // }

    init();
  }, [])
  return (
    <div />
  )
}


export default App;