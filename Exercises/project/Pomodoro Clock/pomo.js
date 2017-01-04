/**
 * Created by cnre on 2016/11/12.
 */
// 设计思路： 创建一个与想要呈现的状态 对应的对象
//            将这个对象的详细参数，在页面上对应的dom中显示
// 先实现秒钟记时
var pomo={
    target:null,
    controls:null,
    v_break:null,
    v_sess:null,
    v_curr:null,
    timer:null,
    running:0,
    break:5,
    sess:10,
    status:0,// break状态 status=0; Session状态 status=1;
    curr:0,
    raw:null,
    setTarget:function(target,controls,v1,v2,v3,v4){
        // 分别是多个dom obj : clock、控制面板、休息值、工作值、进度值、状态值
        var _this=this;
        var config=[
            {target:'break',arithmetic:'-'},
            {target:'break',arithmetic:'+'},
            {target:'sess',arithmetic:'-'},
            {target:'sess',arithmetic:'+'}
        ];
        //this.raw=config;
        this.target=target;
        this.controls=controls;
        this.v_break=v1;
        this.v_sess=v2;
        this.v_curr=v3;
        this.v_status=v4;
        this.v_curr.onclick=function () {
            /*pomo.timeFlies();*/
            pomo.running==1?pomo.pause():pomo.timeFlies();

        };
        var controlfunc=function(i){
            return function(){
                _this.pause();
                //console.log(config[i]);
                //console.log(config[i].target);
                eval('_this[config[i].target]' + config[i].arithmetic + '=1');
                if(_this[config[i].target]<1){_this[config[i].target]=1}

                _this.curr=-1;
                _this.OperateDom();
            };
        }
        for (var i=0;i<4;i++){
            this.controls[i].onclick=controlfunc(i);
        }
    },
    timeRun:function(){
        /*执行一次，时间走1秒；
        * 不考虑实时秒对齐*/
        this.curr-=1;
        if(this.curr<=0){
            this.status=(this.status==0?1:0); // 切换status的值
            this.curr=60*(this.status==0?this.break:this.sess);
        };
        console.group('时间开始飞逝一秒');
        console.log(this.curr);
        console.log(this.status);
        console.groupEnd();
        // 操作DOM
        this.OperateDom();
    },
    timeFlies:function(){
        console.group('时间开始');
        console.log(this.timer);
        this.running=1;
        this.timeRun();
        if (this.timer){console.log('已经在流逝');console.groupEnd();return};
        var _this = this;
        this.timer=setInterval(function () {
            console.log('计算时间');
            _this.timeRun();
        },100);
        console.groupEnd();
    },
    pause:function(){
        console.group('时间暂停');
        this.running=0;
        clearInterval(this.timer);
        this.timer=null;
        console.groupEnd();
    },
    OperateDom:function () {
        if(!this.target){return;}

        this.v_break.innerHTML=this.break;
        this.v_sess.innerHTML=this.sess;
        this.v_curr.innerHTML=this.curr;
        this.v_status.innerHTML=(this.status==0?'Break':'Session');
    },
    testDom:function () {
        this.v_break.innerHTML=this.break;
        this.v_sess.innerHTML=this.sess;
        this.v_curr.innerHTML=this.curr;
    }
};

window.onload=function () {
  pomo.setTarget(
      document.getElementsByClassName('clock')[0],
      document.getElementsByClassName('clock')[0].getElementsByTagName('span'),
      document.getElementsByClassName('val-break')[0],
      document.getElementsByClassName('val-session')[0],
      document.getElementById('progress'),
      document.getElementById('status')
  );
    pomo.testDom();
    //pomo.timeFlies();
    document.getElementsByTagName('h1')[0].onclick=function () {
        /*pomo.timeFlies();*/
        pomo.running==1?pomo.pause():pomo.timeFlies();

    };
    //var timer = setInterval(function(){pomo.timeFlies()},500);


};