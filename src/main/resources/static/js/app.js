
var app= (function (){
    function saveUser(name, id){
        name = secureText(name);
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
    secureText = (text)=>{
        const newText = text.replace(/[^a-zA-Z0-9]/g, '');
        //alert(newText);
        return newText;
    }

    return{
        saveUser: saveUser,
        secureText: secureText
    }



})();
