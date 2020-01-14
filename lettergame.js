class Game {
  constructor(main,score,state,life) {
    this.main=main;
    this.num=3;
    this.obj={};
    this.scorele=score;
    this.score=0;
    this.stateele=state;
    this.state=1;
    this.speed=5;
    this.lifeele=life;
    this.life=5;
    this.height=window.innerHeight;
    this.startControl=true;
    this.st=null;
    this.start=false;
  }


_start(){
  for (var i = 0; i < this.num; i++) {
    this._creatLetter();
  }
  this._move();
  this._keydown();
  this._addpoint();
  this.startControl=false;
  this.start=true;
}


_creatLetter(){
  var div=document.createElement('div');
  div.className='letter';
  do {
    var rn=Math.floor(Math.random()*26+65);
    var le=String.fromCharCode(rn);
  } while (this.obj[le]);

  div.style.backgroundImage='url(images/'+le+'.JPG)'

  do {
    var rl=Math.random()*720;
  } while (this._check(rl));
  var rt=-Math.random()*100;
  div.style.left=rl+'px';
  div.style.top=rt+'px';
  this.obj[le]={left:rl,top:rt,el:div,tr:false};
  this.main.appendChild(this.obj[le].el);
}


_check(left){
  for(var i in this.obj){
    if(left>this.obj[i].left-80 && left<this.obj[i].left+80){
      return true;
    }
  }
}

_move(){
  this.st=setInterval(function(){
    for (var i in this.obj) {
      var t=this.obj[i].top;
      t+=this.speed;
      this.obj[i].top=t;
      this.obj[i].el.style.top=t+'px';
      if (t>=this.height) {
        this.life--;
        this.lifeele.innerHTML=this.life;
        this.main.removeChild(this.obj[i].el);
        delete this.obj[i];
        this._creatLetter();
        if(this.life==0){
          this._gameover();
          return;
        }
      }
    }
  }.bind(this),50)
}

_keydown(){
  document.onkeydown=function(e){
    var keycode=e.keyCode;
    var le=String.fromCharCode(keycode);
    if(this.obj[le]){
      this.obj[le].el.style.backgroundImage='url(images/point.JPG)';
      this.obj[le].tr=true;
      this.score++;
      this.scorele.innerHTML=this.score;
      if (this.score%10==0) {
        this._upstate();
      }
      this._creatLetter();
    }
  }.bind(this)
}

_addpoint(){
  setInterval(function(){
        for (var i in this.obj){
          if(this.obj[i].tr==true){
            setTimeout(this.main.removeChild(this.obj[i].el),300);
            delete this.obj[i];
          }
        }
      }.bind(this),1500)
}

_upstate(){
  this.state++;
  this.stateele.innerHTML=this.state;
  if (this.state<=4) {
    this._creatLetter();
  }
  else {
    this.speed++;
  }
}

_gameover(){
  alert('score is '+ this.score);
  this.main.innerHTML='';
  this.obj={};
  this.speed=5;
  this.score=0;
  this.scorele.innerHTML=0;
  this.lifeele=5;
  this.life=5;
  this.stateele=1;
  this.state=1;
  this.startControl=true;
  clearInterval(this.st);
  this.start=false;
}

pause(){
  clearInterval(this.st);
  document.onkeydown=null;
}

play(){
  this._move();
  this._keydown();
}
}
var main=document.querySelector('.main');
var start=document.querySelector('.start');
var score=document.querySelector('.score');
var state=document.querySelector('.state');
var life=document.querySelector('.life');
var pause=document.querySelector('.pause');
var game=new Game(main,score,state,life);

start.onclick=function(){
    if (game.start==false) {game._start();}
};

pause
