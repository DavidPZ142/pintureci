
var drawPrueba= (function(){
    function enter( user){
        console.log("entre", user)
        fetch("http://localhost:8080/lobby.html?name="+user)
            .then(response => response.json())
            .then(function(data){
                console.log(data)
                localStorage.setItem("name", JSON.stringify(data))
                location.href = "sala.html"
            })
    }

    return {
       enter:enter
    }

})();