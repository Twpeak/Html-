/*1.��꾭���ֲ�ͼģ�� ,���Ұ�ť��ʾ,�뿪�������Ұ�ť��
2.����Ҳఴťһ��,ͼƬ���󲥷�һ��,�Դ����ƣ���ఴťͬ��
3.ͼƬ���ŵ�ͬʱ������СԲȦģ�����һ�仯��
4.���СԲȦ,���Բ�����ӦͼƬ��
5.��겻�����ֲ�ͼ���ֲ�ͼҲ���Զ�����ͼƬ��
6.��꾭�� ,�ֲ�ͼģ�飬�Զ�����ֹͣ��*/
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
    /*�ٶ�̬����СԲȦ
    �ں���˼·:СԲȦ�ĸ���Ҫ��ͼƬ����һ��
    �����������ȵõ�ul����ͼƬ������(ͼƬ����li���棬���Ծ���li�ĸ���)
    ������ѭ����̬����СԲȦ(���СԲȦҪ����o|����)
    �ݴ����ڵ�createElement('li');
    �޲���ڵ�ol. appendChild(li);*/

    for(var i=0;i<ul.children.length;i++){
        //����һ��li
        var li=document.createElement('li');
        //����li��������������
        li.className='dian';
        //���Զ������Ը���ǰli����������
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
            //���СԲ�㣬�ƶ�ͼƬ���ƶ�����ul
        });
    }


    //���СԲ��ʹ��ͼƬ�ƶ�
    // �ٵ��СԲȦ����ͼƬ
    // �ڴ�ʱ�õ�animate������������js�ļ�����(ע�⣬ ��Ϊindex.js ����animate.js���ԣ�animate.js Ҫд��index.js.����)
    // ��ʹ�ö���������ǰ�ᣬ��Ԫ�ر����ж�λ
    // ��ע����ul�ƶ�������Сi
    // �ݹ���ͼƬ�ĺ����㷨:���ĳ��СԲȦ������ͼƬ����СԲȦ�������ų���ͼƬ�Ŀ����Ϊul�ƶ�����

    var boxWidth=box.offsetWidth;
    for (var i=0;i<dian.length;i++){
        dian[i].addEventListener('mouseover',function () {
            //�����¼��󣬵õ���ǰСԲ���������
            var index=this.getAttribute('index');
            animate(ul,-boxWidth*index);
        });
    }
    /*�޷����ԭ��
    �ٵ���Ҳఴťһ�Σ�����ͼƬ����һ�š�
    ������һ������num�����һ �Σ�����1�� �������������ͼƬ��ȣ�����ul �Ĺ������롣
    ��ͼƬ�޷����ԭ��
    �ܰ�ul��һ��1i����-�ݣ��ŵ�ul�������
    �ݵ�ͼƬ��������¡�����-��ͼƬʱ����ul���ٵġ� �������������������: left Ϊ0
    ��ͬʱnum��ֵΪ0�����Դ��¿�ʼ����ͼƬ��*/
    //��Ϊ�޷������Ҫ�����������һ����ͬ��ͼƬ
    //���ֶ���ӣ����벻����һ���ɶ�һ��СԲ�㣬����ʹ�ÿ�¡,true���¡����¡��Ԫ�أ�
    //��Ϊ��¡������������СԲ�����ģ����Բ�����ɶ�һ��СԲ��
    var first=ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var num=0;
    //�������Ŀ���flag
    //��Ϊ���ڹۿ��������Ұ�ť����������������һ������ͼƬ��һ������Բ�㣬Բ�㴦û��flag�жϣ���������ѿ���Բ��Ĵ���ŵ���һ������������
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

    /*СԲ�����ͼƬ�ƶ�ԭ����򵥵ķ����ǣ�����һ������������Բ��ı仯     */
    var c=0;
    dian[c].style.backgroundColor='white';
    button_r.addEventListener('click',function () {
            if(c===dian.length-1){
                c=0;
            }else {
                c++;
                //��ͼƬ����ŵ���Բ������к�
                num=c;
            }
            //���������СԲ���ѡ����ʽ
            for(var i=0;i<dian.length;i++){
                dian[i].style.backgroundColor='#858585';
            }
            //���µ�ǰԲ����ʽ
            dian[c].style.backgroundColor='white';
    });
    button_l.addEventListener('click',function () {
        if (c===0){
                c=dian.length-1;
        }else{
            c--;
        }
        //��ͼƬ����ŵ���Բ������к�
        num=c;
        for (var i=0;i<dian.length;i++){
            dian[i].style.backgroundColor='#858585';
        }
        dian[c].style.backgroundColor='white';
    });
    //�ٵ�����СԲ�㴥���¼�ʱ���ѵ�ǰ����СԲ������кŸ�cֵ
    for (var i=0;i<dian.length;i++){
        dian[i].addEventListener('mouseenter',function () {
            c=Number(this.getAttribute('index'));
            //��ͼƬ����ŵ���Բ������к�
            num=c;
            for (var i=0;i<dian.length-1;i++){
                dian[i].style.backgroundColor='#858585';
            }
            dian[c].style.backgroundColor='white';
        });
    }
    /*���Զ����Ź���
    �����һ����ʱ��
    ���Զ������ֲ�ͼ��ʵ�ʾ������ڵ�����Ҳఴť
    �ܴ�ʱ����ʹ���ֶ������вఴť����¼�arrow_r.click()*/
        var timer=setInterval(function () {
            //�ֶ����õ���¼�
            button_r.click();
        },2000);

    //�����ͣ��ͼƬ��ʱ����ͣ����
    box.addEventListener('mouseenter',function () {
        clearInterval(timer);
        //�����ʱ������
        timer=null;
    });
    box.addEventListener('mouseleave',function () {
        //�Ѷ�ʱ���ù������У����ü�var
        timer=setInterval(function () {
            //�ֶ����õ���¼�
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
                //�ص�����д�ڶ�ʱ����������
                //�жϵ��ú���ʱ�Ƿ���ʵ�δ����ص�����������������ִ��
                if(back){
                    back();
                }
            }
            obj.style.left=obj.offsetLeft+bcz+'px';
        },15);
    }
});
//˵ʵ�����Ҹо�������Լ򻯣�����c=num����һ�����������¡�����ͷ�Լ�ä��һ���,
// ���ǣ���c�����ޱ�num��1��c�ǵ�����ޣ�num��ͼƬ������

//������
// ��ֹ�ֲ�ͼ��ť���������ɲ��Ź��졣
// ������Ŀ��:����һһ��������������ִ�����,��ȥִ����һ����������,���¼��޷�����������
// ����ʵ��˼·:���ûص�����,���һ������������,��ס�����ͽ���������
// ��ʼ����һ������var flag = true;
// lf(flg) {lag = false; do something}�ر�ˮ��ͷ
// ���ûص���������ִ�����, flag=true��ˮ��ͷ

