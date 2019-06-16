$(function () {
    let poke = [];
    let colorArr = ['s','h','d','c'];
    let flag = {};

    for (let i=0;i<52;i++){
        let index = Math.floor(Math.random()*colorArr.length);
        let color = colorArr[index];
        let number = Math.round(Math.random()*12 + 1);
        
        while (flag[color+'_'+number]){
            index = Math.floor(Math.random()*colorArr.length);
            color = colorArr[index];
            number = Math.round(Math.random()*12+1);
        }
        poke.push({color,number});
        flag[color+'_'+number] = true;
    }

    console.log(poke);

   // 发牌
    let index=-1;
    for (let i=0;i<7;i++){
        for (let j=0;j<=i;j++){
            index++;
            let obj = poke[index];
            let lefts = 350-50*i + 100 *j,tops = 50*i;
            $('<div>').addClass('poke')
                .css({backgroundImage:`url(./imgs/${obj.number}${obj.color}.jpg)`})
                .appendTo('.box')
                .data('number',obj.number)
                .attr('id',i+'_'+j)
                .delay(index*10)
                .animate({left:lefts,top:tops,opacity:1});
        }
    }

    for (;index<52;index++){
        let obj = poke[index];
        $('<div>').addClass('poke')
            .addClass('left')
            .css({backgroundImage:`url(./imgs/${obj.number}${obj.color}.jpg)`})
            .appendTo('.box')
            .delay(index*10)
            .data('number',obj.number)
            .attr('id',-2-2)
            .animate({left:0,top:480,opacity:1});

    }

    let box=$('.box');
    let first=null;
    box.on('click','.poke',function () {
        let _this=$(this);
        let [i,j]=_this.attr('id').split('_');
        let id1=i*1+1+'_'+j, id2=i*1+1+'_'+(j*1+1);
        if ($('#'+id1).length||$('#'+id2).length) {
            return;
        }
        if (_this.hasClass('active')) {
            $(this).removeClass('active').animate({top:'+=30px'})

        }else{
            $(this).addClass('active').animate({top:'-=30px'})
        }
        //判断
        if (!first) {
            first=_this;
        }else {
            let number1=first.data('number'),number2=_this.data('number');
            if (number1+number2===14){
                $('.active').animate({top:0,left:710,opacity:0},function () {
                    $(this).remove();
                })
            }
            else {
                $('.active').animate({top:'+=30px'},function () {
                    $(this).removeClass('active');
                })
            }
            first=null;
        }
    });
    let n=0;
    let rights=$('.rightBtn');
    rights.on('click',function () {
        $('.left:last').css({zIndex:n++}).animate({top:480,left:714,opacity:1},function () {
            $(this).removeClass('left').addClass('right');
        })
    });
    let lefts=$('.leftBtn');
    lefts.on('click',function () {
        $('.right:first').css({zIndex:n++}).animate({top:480,left:0,opacity:1},function () {
            $(this).removeClass('right').addClass('left');
        })
    });



});