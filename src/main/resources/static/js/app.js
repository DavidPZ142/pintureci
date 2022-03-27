
var app= (function (){
    function saveUser(name, id){
        let User = {
            name: name,
            id: id
             }
        apiClient.saveUser(User)
            .then(function (){
                localStorage.setItem("id", JSON.stringify(User))
                location.href= "sala.html"
            })
    }
    return{
        saveUser: saveUser
    }



})();
