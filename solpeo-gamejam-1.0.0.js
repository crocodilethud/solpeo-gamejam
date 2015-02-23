/***********************************************************************
* 
* 1.0.0
* 
***********************************************************************/
!(function(){'use strict';
// Generated by CoffeeScript 1.7.1
var Camera, Device, Input, Keyboard, Mouse, NumberAnimation, ParallelAnimation, Rectangle, Scene, SequentialAnimation, Timer, Viewport;

Viewport = Engine.Viewport, Scene = Engine.Scene, Camera = Engine.Camera, Device = Engine.Device, Rectangle = Engine.Rectangle, Input = Engine.Input, Timer = Engine.Timer, NumberAnimation = Engine.NumberAnimation, SequentialAnimation = Engine.SequentialAnimation, ParallelAnimation = Engine.ParallelAnimation;

Mouse = Input.Mouse, Keyboard = Input.Keyboard;

// Generated by CoffeeScript 1.7.1
var camera, scene, viewport;

scene = new Scene({
  color: 'black'
});

camera = new Camera({
  lookAt: scene
});

viewport = new Viewport({
  id: 'engine',
  cameras: [camera]
});

// Generated by CoffeeScript 1.7.1
var background, createShape;

createShape = function(opts) {
  var onViewportResize, shapes;
  shapes = (function() {
    var i, shape, x, _i, _results;
    x = viewport.width / 2;
    _results = [];
    for (i = _i = 0; _i < 10; i = ++_i) {
      shape = new Rectangle({
        parent: scene,
        x: x,
        width: opts.width,
        height: opts.height,
        image: opts.image
      });
      x -= shape.width;
      _results.push(shape);
    }
    return _results;
  })();
  onViewportResize = function() {
    var shape, _i, _len;
    for (_i = 0, _len = shapes.length; _i < _len; _i++) {
      shape = shapes[_i];
      if (opts.anchor === 'top') {
        shape.y = -viewport.height / 2 + shape.height / 2 + opts.marginTop;
      } else if (opts.anchors === 'bottom') {
        shape.y = viewport.height / 2 - shape.height / 2;
      }
    }
  };
  window.addEventListener('resize', onViewportResize);
  onViewportResize();
  new Timer({
    type: 'vsync',
    autoplay: true,
    duration: Infinity,
    on: {
      step: function() {
        var minX, shape, x, _i, _j, _len, _len1;
        minX = 0;
        for (_i = 0, _len = shapes.length; _i < _len; _i++) {
          shape = shapes[_i];
          x = shape.x + opts.velocity;
          shape.x = x;
          x -= shape.width;
          if (x < minX) {
            minX = x;
          }
        }
        for (_j = 0, _len1 = shapes.length; _j < _len1; _j++) {
          shape = shapes[_j];
          if (shape.x > viewport.width / 2 + shape.width / 2) {
            shape.x = minX;
            minX -= shape.width;
          }
        }
      }
    }
  });
};

background = (function() {
  createShape({
    velocity: 2,
    width: 1280,
    height: 720,
    anchor: 'top',
    marginTop: 0,
    image: 'static/bg1.png'
  });
  createShape({
    velocity: 5,
    width: 1280,
    height: 282,
    anchors: 'bottom',
    marginTop: 0,
    image: 'static/bg3.png'
  });
  createShape({
    velocity: 3,
    width: 1146,
    height: 478,
    anchor: 'top',
    marginTop: 0,
    image: 'static/clouds.png'
  });
  createShape({
    velocity: 10,
    width: 1280,
    height: 72,
    anchors: 'bottom',
    marginTop: 0,
    image: 'static/bg2.png'
  });
  return (function() {
    var border;
    border = new Rectangle({
      parent: scene,
      width: viewport.width,
      height: viewport.height,
      image: 'static/toplevel.png'
    });
    return window.addEventListener('resize', function() {
      border.width = viewport.width;
      return border.height = viewport.height;
    });
  })();
})();

// Generated by CoffeeScript 1.7.1
var PLAYER_HORIZONTAL_VELOCITY, PLAYER_ROTATION_MAX, PLAYER_ROTATION_MIN, PLAYER_ROTATION_VELOCITY, PLAYER_VERTICAL_VELOCITY, player;

PLAYER_HORIZONTAL_VELOCITY = 10;

PLAYER_VERTICAL_VELOCITY = 8;

PLAYER_ROTATION_VELOCITY = 0.01;

PLAYER_ROTATION_MAX = 0.4;

PLAYER_ROTATION_MIN = -0.4;

player = (function() {
  var fly, head, propeller, shape;
  shape = new Rectangle({
    parent: scene,
    width: 349,
    height: 219,
    image: 'static/korwin.png',
    zIndex: 2,
    children: [
      propeller = new Rectangle({
        x: -161,
        y: 16,
        width: 53,
        height: 189,
        image: 'static/fram1.png'
      }), fly = new Rectangle({
        x: -55,
        y: -10,
        width: 25,
        height: 14,
        image: 'static/fly.png'
      }), head = new Rectangle({
        x: -58,
        y: -55,
        width: 72,
        height: 84,
        originY: 25,
        image: 'static/korwin_head.png'
      })
    ]
  });
  new SequentialAnimation({
    autoplay: true,
    loop: true,
    reverse: true,
    animations: [
      new NumberAnimation({
        target: head,
        property: 'rotation',
        from: -Math.PI / 10,
        to: 0,
        duration: 1000
      }), new NumberAnimation({
        target: head,
        property: 'y',
        from: head.y,
        to: head.y + 5,
        duration: 250
      }), new NumberAnimation({
        target: head,
        property: 'y',
        from: head.y + 5,
        to: head.y,
        duration: 250
      }), new NumberAnimation({
        target: head,
        property: 'rotation',
        from: 0,
        to: Math.PI / 10,
        duration: 1000
      })
    ]
  });
  new SequentialAnimation({
    autoplay: true,
    loop: true,
    animations: [
      new NumberAnimation({
        target: fly,
        property: 'scale',
        from: 1.7,
        to: 1
      }), new NumberAnimation({
        target: fly,
        property: 'scale',
        from: 1,
        to: 1.7
      }), new NumberAnimation({
        target: fly,
        property: 'rotation',
        from: 0,
        to: Math.PI * 2,
        duration: 500
      })
    ]
  });
  (function() {
    var PROPELLER_IMAGES, i;
    PROPELLER_IMAGES = ['static/fram1.png', 'static/fram2.png', 'static/fram3.png', 'static/fram4.png'];
    i = 0;
    return new Timer({
      type: 'vsync',
      autoplay: true,
      duration: Infinity,
      on: {
        step: function() {
          i = (i + 1) % PROPELLER_IMAGES.length;
          return propeller.image = PROPELLER_IMAGES[i];
        }
      }
    });
  })();
  (function() {
    var down, left, right, rotation, up;
    up = down = left = right = rotation = 0;
    new Timer({
      type: 'vsync',
      autoplay: true,
      duration: Infinity,
      on: {
        step: function() {
          var oldY;
          oldY = shape.y;
          shape.x = Math.max(-viewport.width / 2, Math.min(viewport.width / 2, shape.x + right - left));
          shape.y = Math.max(-viewport.height / 2, Math.min(viewport.height / 2, shape.y + down - up));
          if (shape.y !== oldY) {
            if (up > 0) {
              rotation += PLAYER_ROTATION_VELOCITY * 2;
            }
            if (down > 0) {
              rotation -= PLAYER_ROTATION_VELOCITY * 2;
            }
            rotation = Math.max(PLAYER_ROTATION_MIN, Math.min(PLAYER_ROTATION_MAX, rotation));
          }
          if (rotation > 0) {
            rotation -= PLAYER_ROTATION_VELOCITY;
          } else if (rotation < 0) {
            rotation += PLAYER_ROTATION_VELOCITY;
          }
          return shape.rotation = -rotation;
        }
      }
    });
    Input.on('keydown', function(e) {
      if (e.key === 'ARROW_UP') {
        return up = PLAYER_VERTICAL_VELOCITY;
      } else if (e.key === 'ARROW_DOWN') {
        return down = PLAYER_VERTICAL_VELOCITY;
      } else if (e.key === 'ARROW_LEFT') {
        return left = PLAYER_HORIZONTAL_VELOCITY;
      } else if (e.key === 'ARROW_RIGHT') {
        return right = PLAYER_HORIZONTAL_VELOCITY;
      }
    });
    return Input.on('keyup', function(e) {
      if (e.key === 'ARROW_UP') {
        return up = 0;
      } else if (e.key === 'ARROW_DOWN') {
        return down = 0;
      } else if (e.key === 'ARROW_LEFT') {
        return left = 0;
      } else if (e.key === 'ARROW_RIGHT') {
        return right = 0;
      }
    });
  })();
  return shape;
})();

// Generated by CoffeeScript 1.7.1
var BULLET_VELOCITY, bullets, createBullet;

BULLET_VELOCITY = 18;

bullets = [];

createBullet = (function() {
  var pool;
  pool = [];
  new Timer({
    type: 'vsync',
    autoplay: true,
    duration: Infinity,
    on: {
      step: function() {
        var bullet, i, n, shape;
        i = 0;
        n = bullets.length;
        while (i < n) {
          bullet = bullets[i];
          shape = bullet.shape;
          shape.x -= BULLET_VELOCITY * Math.cos(shape.rotation);
          shape.y += BULLET_VELOCITY * Math.sin(shape.rotation);
          if (shape.x < -viewport.width / 2) {
            bullet.destroy(i);
            i--;
            n--;
          }
          i++;
        }
      }
    }
  });
  return function(opts) {
    var bullet, shape;
    bullet = pool.pop() || {
      shape: new Rectangle({
        width: 37,
        height: 9,
        zIndex: 1,
        image: 'static/bullet.png'
      }),
      destroy: function(index) {
        if (index == null) {
          index = bullets.indexOf(bullet);
        }
        bullets.splice(index, 1);
        pool.push(bullet);
        return bullet.shape.parent.removeChild(bullet.shape);
      }
    };
    shape = bullet.shape;
    scene.appendChild(shape);
    shape.x = opts.x;
    shape.y = opts.y;
    shape.rotation = opts.rotation;
    bullets.push(bullet);
    return bullet;
  };
})();

// Generated by CoffeeScript 1.7.1
(function() {
  var shoot, timer;
  shoot = function() {
    return createBullet({
      rotation: player.rotation,
      x: player.x - 140,
      y: player.y + 33 + (player.height / 2 + 40) * Math.sin(player.rotation)
    });
  };
  timer = new Timer({
    type: 'vsync',
    duration: Infinity,
    autoplay: false,
    delay: 150,
    on: {
      play: shoot,
      step: shoot
    }
  });
  new Timer({
    autoplay: true,
    type: 'vsync',
    duration: Infinity,
    on: {
      step: function() {
        timer.delay -= 0.05;
        if (timer.delay < 30) {
          return this.stop();
        }
      }
    }
  });
  Input.on('keydown', function(e) {
    if (e.key === 'SPACE') {
      return timer.play();
    }
  });
  return Input.on('keyup', function(e) {
    if (e.key === 'SPACE') {
      return timer.stop();
    }
  });
})();

// Generated by CoffeeScript 1.7.1
var createEnemy;

createEnemy = (function() {
  var TYPES, createPuff, enemies;
  TYPES = {
    tusk: {
      width: 67,
      height: 81,
      images: ['static/tusk2.png', 'static/tusk.png']
    },
    tan: {
      width: 72,
      height: 72,
      images: ['static/tvn.png']
    }
  };
  enemies = [];
  new Timer({
    autoplay: true,
    type: 'vsync',
    duration: Infinity,
    on: {
      step: function() {
        var bullet, bulletBb, enemy, enemyBb, i, j, m, n;
        i = 0;
        n = enemies.length;
        while (i < n) {
          enemy = enemies[i];
          enemyBb = enemy.shape.getGlobalBoundingBox();
          j = 0;
          m = bullets.length;
          while (j < m) {
            if (!enemy) {
              break;
            }
            bullet = bullets[j];
            bulletBb = bullet.shape.getGlobalBoundingBox();
            if (bulletBb.overlap(enemyBb)) {
              bullet.destroy(j);
              j--;
              m--;
              enemy.hit();
              if (!enemy.lifes) {
                enemy.destroy(i);
                enemy = null;
                i--;
                n--;
              }
            }
            bulletBb.destroy();
            j++;
          }
          enemyBb.destroy();
          i++;
        }
      }
    }
  });
  createPuff = function(opts) {
    var shape;
    shape = new Rectangle({
      parent: scene,
      x: opts.x,
      y: opts.y,
      width: 175,
      height: 189,
      image: 'static/puff.png'
    });
    new NumberAnimation({
      autoplay: true,
      target: shape,
      property: 'scale',
      duration: 200,
      to: 0
    });
    return new NumberAnimation({
      autoplay: true,
      target: shape,
      property: 'opacity',
      duration: 200,
      to: 0,
      on: {
        end: function() {
          return shape.parent.removeChild(shape);
        }
      }
    });
  };
  return function(opts) {
    var anim, destroy, enemy, shape, timer, type;
    type = TYPES[opts.type];
    shape = new Rectangle({
      parent: scene,
      x: -viewport.width / 2 - type.width,
      y: Math.randomBetween(-viewport.height / 2 + type.height, viewport.height / 2 - type.height),
      width: type.width,
      height: type.height,
      image: type.images.last()
    });
    timer = new Timer({
      autoplay: true,
      type: 'vsync',
      duration: Infinity,
      on: {
        step: function() {
          shape.x += 8;
          if (shape.x > viewport.width / 2 + shape.width) {
            return destroy();
          }
        }
      }
    });
    anim = ParallelAnimation({
      autoplay: true,
      loop: true,
      reverse: true,
      animations: [
        NumberAnimation({
          target: shape,
          property: 'scale',
          easing: Engine.PropertyAnimation.Easing.outExpo,
          from: 0.8,
          to: 1
        }), NumberAnimation({
          target: shape,
          property: 'y',
          easing: Engine.PropertyAnimation.Easing.inSine,
          from: shape.y - 15,
          to: shape.y + 15
        })
      ]
    });
    destroy = function(index) {
      if (index == null) {
        index = enemies.indexOf(enemy);
      }
      enemies.splice(index, 1);
      shape.parent.removeChild(shape);
      timer.stop();
      anim.stop();
      return createPuff({
        x: shape.x,
        y: shape.y
      });
    };
    enemies.push(enemy = {
      lifes: type.images.length,
      shape: shape,
      destroy: destroy,
      hit: function() {
        this.lifes--;
        return shape.image = type.images[this.lifes - 1];
      }
    });
    return shape;
  };
})();

// Generated by CoffeeScript 1.7.1
(function() {
  return new Timer({
    type: 'vsync',
    autoplay: true,
    delay: 500,
    duration: Infinity,
    on: {
      step: function() {
        if (Math.randomBetween(200, 500) < this.delay) {
          createEnemy({
            type: 'tan'
          });
        } else {
          createEnemy({
            type: 'tusk'
          });
        }
        if (this.delay > 200) {
          return this.delay -= 2;
        }
      }
    }
  });
})();

// Generated by CoffeeScript 1.7.1
var SMOKE_VELOCITY, createSmoke;

SMOKE_VELOCITY = 18;

createSmoke = (function() {
  var opacity, pool, smokes;
  smokes = [];
  pool = [];
  opacity = 0;
  new Timer({
    type: 'vsync',
    autoplay: true,
    duration: Infinity,
    on: {
      step: function() {
        var i, n, smoke;
        i = 0;
        n = smokes.length;
        while (i < n) {
          smoke = smokes[i];
          smoke.x += SMOKE_VELOCITY * Math.cos(smoke.rotation);
          if (smoke.x > viewport.width / 2) {
            smokes.splice(i, 1);
            pool.push(smoke);
            smoke.parent.removeChild(smoke);
            i--;
            n--;
          }
          i++;
        }
      }
    }
  });
  return function(opts) {
    var shape;
    shape = pool.pop() || new Rectangle({
      width: 107,
      height: 41,
      image: 'static/smoke.png'
    });
    scene.appendChild(shape);
    shape.x = opts.x;
    shape.y = opts.y;
    shape.rotation = opts.rotation;
    shape.opacity = opacity = (opacity + 0.1) % 1;
    smokes.push(shape);
    return shape;
  };
})();

new Timer({
  type: 'vsync',
  autoplay: true,
  duration: Infinity,
  delay: 180,
  on: {
    step: function() {
      return createSmoke({
        x: player.x + 150,
        y: player.y + 20 - (player.height / 2 + 20) * Math.sin(player.rotation),
        rotation: 0
      });
    }
  }
});
})();