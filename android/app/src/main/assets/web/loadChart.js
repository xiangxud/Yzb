var interval = setInterval(function () {
    if(document.readyState === "complete"){
        try{
            document.addEventListener('message', function (e) {
                var obj = JSON.parse(e.data);
                setSize();
                var mainEchart = echarts.init(document.getElementById('main'));
                mainEchart.setOption(obj, true);
            });
            window.postMessage("start");
        }catch(e){
        }
        clearInterval(interval);
    }
},500);


var setSize=function () {
    var winHeight = 0;
    if (window.innerHeight){
        winHeight = window.innerHeight;
    }else if ((document.body) && (document.body.clientHeight)){
        winHeight = document.body.clientHeight;
    }
    var main = document.getElementById('main');
    if(document.body.offsetHeight < winHeight){
        main.style.height = winHeight + 'px';
    }else{
        main.style.height = winHeight + 'px';
    }
}