
var drawPrueba= (function(){
    function enter( user){
        fetch("http://localhost:8080/lobby.html?name="+user)
            .then(response => response.json())
            .then(function(data){
                console.log(data)
            })
    }

    return {
       enter:enter
    }

})();