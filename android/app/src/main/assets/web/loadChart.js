var interval = setInterval(function () {
    if(document.readyState === "complete"){
        try{
            document.addEventListener('message', function (e) {
                alert(e.data);
            });
            window.postMessage("start");
        }catch(e){
        }
        clearInterval(interval);
    }
},500);