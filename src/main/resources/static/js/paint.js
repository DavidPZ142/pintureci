
var paint =(function (){

    let stompClient = null
    var lastPt = null;



    function init(){
        let canvas = document.getElementById("myCanvas");
        paint.connectAndSubscribe();
        if(window.PointerEvent){
            if(window.PointerEvent) {
                canvas.addEventListener("pointerdown", function() {
                        canvas.addEventListener("pointermove", draw, false);
                    }
                    , false);
                canvas.addEventListener("pointerup", endPointer2, false);
            }
        }
    }

    function connectAndSubscribe(){
        let socket = new SockJS('/stompendpoint');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, function (frame){
            console.log('Connected: '+ frame);
            stompClient.subscribe('/topic/draw', function (eventbody){
                console.log('eventbody: ' + eventbody.body)
                drawio(JSON.parse(eventbody.body))
            })
            stompClient.subscribe('/topic/stopDraw',function (eventbody){
                endPointer()
            })
        })
    }
    function getOffset(obj){
        let offsetLeft = 0;
        let offsetTop = 0;
        do {
            if (!isNaN(obj.offsetLeft)) {
                offsetLeft += obj.offsetLeft;
            }
            if (!isNaN(obj.offsetTop)) {
                offsetTop += obj.offsetTop;
            }
        } while(obj = obj.offsetParent );
        return {left: offsetLeft, top: offsetTop};
    }

    function draw(e) {
        stompClient.send('/topic/draw',{},JSON.stringify( {x:e.pageX, y:e.pageY}))
    }

    function drawio(e){
        console.log("En drawio:  " + e.x)
        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d");
        if(lastPt!=null) {
            ctx.beginPath();
            ctx.moveTo(lastPt.x, lastPt.y);
            ctx.lineTo(e.x, e.y);
            ctx.stroke();
        }
        lastPt = e;
    }
    function endPointer2(){
        console.log("endPointer2")
        stompClient.send("/topic/stopDraw")
    }
    function endPointer() {
        let canvas = document.getElementById("myCanvas");
        canvas.removeEventListener("pointermove", draw, false);
        canvas.removeEventListener("mousemove", draw, false);
        lastPt = null;
    }

    return{
        init:init,
        getOffset: getOffset,
        connectAndSubscribe: connectAndSubscribe,
        endPointer:endPointer,
        draw:draw,
        drawio:drawio,
        endPointer2:endPointer2

    }

})();