/*1.鼠标经过轮播图模块 ,左右按钮显示,离开隐藏左右按钮。
2.点击右侧按钮一次,图片往左播放一张,以此类推，左侧按钮同理。
3.图片播放的同时，下面小圆圈模块跟随一变化。
4.点击小圆圈,可以播放相应图片。
5.鼠标不经过轮播图，轮播图也会自动播放图片。
6.鼠标经过 ,轮播图模块，自动播放停止。*/
window.addEventListener('load',function () {
    var button_l=document.querySelector('.button_left');
    var button_r=document.querySelector('.button_right');
    var button=document.querySelectorAll('.button');
    var dian_box=document.querySelector('.dian_box');
    var box=document.querySelector('.box');
    var ul=document.querySelector('ul');
    box.addEventListener('mouseenter',function () {
       button_l.style.display='block';
       button_r.style.display='block';
    });
    box.addEventListener('mouseleave',function () {
       button_l.style.display='none';
       button_r.style.display='none';
    });
    /*①动态生成小圆圈
    ②核心思路:小圆圈的个数要跟图片张数一致
    ③所以首先先得到ul里面图片的张数(图片放入li里面，所以就是li的个数)
    ④利用循环动态生成小圆圈(这个小圆圈要放入o|里面)
    ⑤创建节点createElement('li');
    ⑥插入节点ol. appendChild(li);*/

    for(var i=0;i<ul.children.length;i++){
        //创建一个li
        var li=document.createElement('li');
        //插入li，并且生成类名
        li.className='dian';
        //用自定义属性给当前li创建索引号
        li.setAttribute('index',i);
        dian_box.appendChild(li);

    }
    var dian=document.querySelectorAll('.dian');
    for(var j=0;j<dian.length;j++){
        dian[j].addEventListener('mouseover',function () {
            for(var i=0;i<dian.length;i++){
                dian[i].style.backgroundColor='#858585';
            }
            this.style.backgroundColor='white';
            //点击小圆点，移动图片，移动的是ul
        });
    }


    //点击小圆点使得图片移动
    // ①点击小圆圈滚动图片
    // ②此时用到animate动画函数，将js文件引入(注意， 因为index.js 依赖animate.js所以，animate.js 要写到index.js.上面)
    // ③使用动画函数的前提，该元素必须有定位
    // ④注意是ul移动而不是小i
    // ⑤滚动图片的核心算法:点击某个小圆圈，就让图片滚动小圆圈的索引号乘以图片的宽度做为ul移动距离

    var boxWidth=box.offsetWidth;
    for (var i=0;i<dian.length;i++){
        dian[i].addEventListener('mouseover',function () {
            //触发事件后，得到当前小圆点的索引号
            var index=this.getAttribute('index');
            animate(ul,-boxWidth*index);
        });
    }
    /*无缝滚动原理
    ①点击右侧按钮一次，就让图片滚动一张。
    ②声明一个变量num，点击一 次，自增1， 让这个变量乘以图片宽度，就是ul 的滚动距离。
    ③图片无缝滚动原理
    ④把ul第一个1i复制-份，放到ul的最后面
    ⑤当图片滚动到克隆的最后-张图片时，让ul快速的、 不做动画的跳到最左侧: left 为0
    ⑥同时num赋值为0，可以从新开始滚动图片了*/
    //因为无缝滚动需要在最后添加与第一张相同的图片
    //而手动添加，代码不灵活且会造成多一个小圆点，所以使用克隆,true深克隆（克隆子元素）
    //因为克隆代码是在生成小圆点后面的，所以不会造成多一个小圆点
    var first=ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var num=0;
    //节流阀的开关flag
    //因为便于观看，给左右按钮设置了两个监听，一个控制图片，一个控制圆点，圆点处没有flag判断，解决方法把控制圆点的代码放到第一个监听就行了
    var flag=true;
    button_r.addEventListener('click',function () {
            flag=false;
            if (num===ul.children.length-1){
                ul.style.left=0;
                num=0;
            }
            num++;
            animate(ul,-num*boxWidth,function () {
                flag=true;
            });
    });
    button_l.addEventListener('click',function () {
            flag=false;
            if (num===0){
                ul.style.left=-(ul.children.length-1)*boxWidth+'px';
                num=ul.children.length-1;
            }
            num--;
            animate(ul,-num*boxWidth,function () {
                flag=true;
            });
    });

    /*小圆点跟随图片移动原理，最简单的方法是，创建一个变量来控制圆点的变化     */
    var c=0;
    dian[c].style.backgroundColor='white';
    button_r.addEventListener('click',function () {
            if(c===dian.length-1){
                c=0;
            }else {
                c++;
                //让图片的序号等于圆点的序列号
                num=c;
            }
            //先清除其他小圆点的选中样式
            for(var i=0;i<dian.length;i++){
                dian[i].style.backgroundColor='#858585';
            }
            //留下当前圆点样式
            dian[c].style.backgroundColor='white';
    });
    button_l.addEventListener('click',function () {
        if (c===0){
                c=dian.length-1;
        }else{
            c--;
        }
        //让图片的序号等于圆点的序列号
        num=c;
        for (var i=0;i<dian.length;i++){
            dian[i].style.backgroundColor='#858585';
        }
        dian[c].style.backgroundColor='white';
    });
    //再调整对小圆点触发事件时，把当前触发小圆点的序列号给c值
    for (var i=0;i<dian.length;i++){
        dian[i].addEventListener('mouseenter',function () {
            c=Number(this.getAttribute('index'));
            //让图片的序号等于圆点的序列号
            num=c;
            for (var i=0;i<dian.length-1;i++){
                dian[i].style.backgroundColor='#858585';
            }
            dian[c].style.backgroundColor='white';
        });
    }
    /*①自动播放功能
    ②添加一个定时器
    ③自动播放轮播图，实际就类似于点击了右侧按钮
    ④此时我们使用手动调用有侧按钮点击事件arrow_r.click()*/
        var timer=setInterval(function () {
            //手动调用点击事件
            button_r.click();
        },2000);

    //鼠标悬停在图片上时，暂停动画
    box.addEventListener('mouseenter',function () {
        clearInterval(timer);
        //清除定时器变量
        timer=null;
    });
    box.addEventListener('mouseleave',function () {
        //把定时器拿过来就行，不用加var
        timer=setInterval(function () {
            //手动调用点击事件
            button_r.click();
        },2000);
    })



    function animate(obj,target,back) {
        clearInterval(obj.timer);
        obj.timer=setInterval(function () {
            var bcz=(target-obj.offsetLeft)/10;
            bcz=bcz>0?  Math.ceil(bcz):Math.floor(bcz);
            if (obj.offsetLeft === target){
                clearInterval(obj.timer);
                //回调函数写在定时器结束里面
                //判断调用函数时是否有实参传进回调函数参数，若有则执行
                if(back){
                    back();
                }
            }
            obj.style.left=obj.offsetLeft+bcz+'px';
        },15);
    }
});
//说实话，我感觉代码可以简化，反正c=num创造一个变量公用呗。。回头自己盲打一遍吧,
// 但是，，c的上限比num少1，c是点的上限，num是图片的上限

//节流阀
// 防止轮播图按钮连续点击造成播放过快。
// 节流阀目的:当上一一个函数动画内容执行完毕,再去执行下一个函数动画,让事件无法连续触发。
// 核心实现思路:利用回调函数,添加一个变量来控制,锁住函数和解锁函数。
// 开始设置一个变量var flag = true;
// lf(flg) {lag = false; do something}关闭水龙头
// 利用回调函数动画执行完毕, flag=true打开水龙头

