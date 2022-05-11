
var paint =(function () {

    let stompClient = null
    var lastPt = null;
    let color = 'black';
    let pruebaID = null;

    let pointsx =[]
    let pointsy=[]
    let info = JSON.parse(localStorage.getItem("id"));


    function init() {

        $('#hola').html("Bienvenido al juego : "+info.name + " Tu id es: " + info.id)
        let suID = info.id
        let canvas = document.getElementById("myCanvas");
        if (JSON.parse(localStorage.getItem("chat") != null)){
            $('#chatbox').html(JSON.parse(localStorage.getItem("chat")))
        }

        let a =JSON.parse(localStorage.getItem("pointsX"));
        let b = JSON.parse(localStorage.getItem("pointsY"));
        if(a != null) {
            drawCache(a, b);
        }



        paint.connectAndSubscribe();
        if (window.PointerEvent) {
            if (window.PointerEvent) {
                canvas.addEventListener("pointerdown", function () {
                        canvas.addEventListener("pointermove", draw, false);
                    }
                    , false);
                canvas.addEventListener("pointerup", endPointer2, false);
            }
        }

    }
    let publishWord = (word) => {
        $('#palabraDibujar').html("la palabra a dibujar es: " + word);
    }

    let publishMessage = (message)=>{
        let contenido = $('#chatbox').val();
        $('#chatbox').html(contenido+"\n"+message);
        localStorage.setItem("chat", JSON.stringify(contenido+"\n"+message));
    }

    function connectAndSubscribe() {
        let socket = new SockJS('/stompendpoint');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/draw', function (eventbody) {

                drawio(JSON.parse(eventbody.body))
            })
            stompClient.subscribe('/topic/stopDraw', function (eventbody) {
                endPointer()
            })
            stompClient.subscribe('/topic/color', function (eventobody) {
                mandarColor(eventobody.body)
            })
            stompClient.subscribe('/topic/clearCanva',function (eventbody){
                clearCanva()
            })
            stompClient.subscribe('/topic/message', function (eventbody) {
                let message = eventbody.body;
                publishMessage(message);
            })
            stompClient.subscribe('/topic/word', function (eventbody){
                publishWord(eventbody.body);
            })
        })
    }



    function message(msg){
        const mesg = app.secureText(msg);
        stompClient.send('/app/message', {},info.name+ ": "+ mesg);
        $('#usermsg').val("");
    }

    function getOffset(obj) {
        let offsetLeft = 0;
        let offsetTop = 0;
        do {
            if (!isNaN(obj.offsetLeft)) {
                offsetLeft += obj.offsetLeft;
            }
            if (!isNaN(obj.offsetTop)) {
                offsetTop += obj.offsetTop;
            }
        } while (obj = obj.offsetParent);
        return {left: offsetLeft, top: offsetTop};
    }

    function draw(e) {
        stompClient.send('/app/draw', {}, JSON.stringify({x: e.pageX, y: e.pageY}))
    }

    function drawio(e) {
        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d");

        pointsx.push(e.x)
        pointsy.push(e.y)

        localStorage.setItem("pointsX", JSON.stringify(pointsx))
        localStorage.setItem("pointsY", JSON.stringify(pointsy))

        if (lastPt != null) {
            ctx.beginPath();
            ctx.moveTo(lastPt.x, lastPt.y);
            ctx.lineTo(e.x, e.y);
            ctx.strokeStyle = color
            ctx.stroke();
        }
        lastPt = e;
    }

    function endPointer2() {
        stompClient.send("/topic/stopDraw")
    }

    function endPointer() {
        let canvas = document.getElementById("myCanvas");
        canvas.removeEventListener("pointermove", draw, false);
        canvas.removeEventListener("mousemove", draw, false);
        lastPt = null;
    }

    function selectColor(colorSeleccionado) {
        stompClient.send('/app/color', {}, colorSeleccionado)
    }
    function mandarColor(colorSeleccionado){
        console.log(colorSeleccionado)
        color = colorSeleccionado;
    }

    function clearCanvaSend(){
        stompClient.send('/topic/clearCanva');
    }
    function clearCanva(){
        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.beginPath();
    }
    function selectID( pruebaid){
        pruebaID = pruebaid;
        $('#pruebaID').html("Su ID es: " +pruebaID)
    }

    function sendword(){
        let word = "nitWord"
        stompClient.send('/app/word',{} , word);
    }

    function recibeWord(word){
        let recibe = word;
        $('#palabraDibujar').html("Palabra a dibujar"+ word)
    }

    function drawCache(pointsx, pointsy){

        let canvas = document.getElementById("myCanvas");
        let canvasd = canvas.getContext("2d");
        console.log(pointsy[1])
        for (let i =1 ; i< pointsy.length;i++){

            canvasd.moveTo(pointsx[i-1],pointsy[i-1]);
            canvasd.lineTo(pointsx[i],pointsy[i]);
            canvasd.stroke();
        }

    }

    return{
        init:init,
        getOffset: getOffset,
        connectAndSubscribe: connectAndSubscribe,
        endPointer:endPointer,
        draw:draw,
        drawio:drawio,
        endPointer2:endPointer2,
        selectColor:selectColor,
        mandarColor: mandarColor,
        clearCanvaSend: clearCanvaSend,
        clearCanva:clearCanva,
        selectID:selectID,
        message:message,
        sendword:sendword

    }

})();