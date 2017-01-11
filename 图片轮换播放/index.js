var oPrev = document.getElementById('prev');
var oNext = document.getElementById('next');
var oContainer = document.getElementById('container');
var oBig = document.getElementById('big');
var aBigImgs = oBig.getElementsByTagName('img');
var oInfo = document.getElementById('info');
var oCurrentPage = document.getElementById('current-page');
var oSmall = document.getElementById('small');
var aSmallImgs = oSmall.getElementsByTagName('img');
var zIndex = 9;
var timer;
var iNow = 0;


//���ò㼶 ʹ��һ��ͼƬ��������
for(var i = 0; i < aBigImgs.length; i++){
    aBigImgs[i].style.zIndex = aBigImgs.length - i;
}
aSmallImgs[0].style.opacity = 1;
aSmallImgs[0].style.filter = "alpha(opacity=100)";

//���� ǰ��ť����ʾ
oPrev.onmouseover = oNext.onmouseover = function () {
    animate(this, {
        opacity : 100
    });
};
oPrev.onmouseout = oNext.onmouseout = function () {
    animate(this, {
        opacity : 0
    });
};

//ǰ��ť�����¼�
oPrev.onclick = oNext.onclick = function () {
    if(this == oPrev){
        iNow--;
        if(iNow == -1){
            iNow = aBigImgs.length - 1;
        }
    }else{
        iNow++;
        if(iNow == aBigImgs.length){
            iNow = 0;
        }
    }
    changImg();
};

//СͼƬ�¼���
for(var i = 0; i < aSmallImgs.length; i++){
    aSmallImgs[i].index = i;
    aSmallImgs[i].onclick = function(){
        if(this.index != iNow){
            iNow = this.index;
            changImg();
        }

    };
    aSmallImgs[i].onmouseover = function(){
        this.style.opacity = 1;
        this.style.filter = "alpha(opacity=100)";
    };
    aSmallImgs[i].onmouseout = function(){
        if(iNow != this.index){
            this.style.opacity = 0.5;
            this.style.filter = "alpha(opacity=50)";
        }
    };
}



//�л�ͼƬ
function changImg(){
    aBigImgs[iNow].style.opacity = 0;
    aBigImgs[iNow].style.filter = "alpha(opacity=0)";

    aBigImgs[iNow].style.zIndex = zIndex++;
    oNext.style.zIndex = oPrev.style.zIndex = oInfo.style.zIndex = zIndex++;

    //��ʾ��ǰͼƬ
    animate(aBigImgs[iNow], {
        opacity : 100
    });
    oCurrentPage.innerHTML = iNow + 1;
    //����СͼƬ
    for(var i = 0; i < aSmallImgs.length; i++){
        aSmallImgs[i].style.opacity = 0.5;
        aSmallImgs[i].style.filter = "alpha(opacity=50)";
    }
    aSmallImgs[iNow].style.opacity = 1;
    aSmallImgs[iNow].style.filter = "alpha(opacity=100)";

    //�ı�СͼƬ��λ��
    var left = 0;
    if(iNow == 0 ||iNow == 1){
        left = 0;
    }else if(iNow == 6 ||iNow == 7){
        left = aBigImgs.length / 2;
    }else{
        left = iNow - 1;
    }
    animate(oSmall, {
        left : -left * aSmallImgs[0].offsetWidth
    });
}

timer = setInterval(function(){
    oNext.onclick();
},2000);

oBig.onmouseover = function () {
    clearInterval(timer);
};

oBig.onmouseout = function () {
    timer = setInterval(function(){
        oNext.onclick();
    },2000);
};
oSmall.onmouseover = function () {
    clearInterval(timer);
};

oSmall.onmouseout = function () {
    timer = setInterval(function(){
        oNext.onclick();
    },2000);
};





