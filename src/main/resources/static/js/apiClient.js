var apiClient=(function (){

return{
    saveUser:function (User){
        return $.ajax({
            url:"v1/user/saveUser",
            type:"POST",
            data:JSON.stringify(User),
            contentType:"application/json"
        }).fail(function (){
            alert("No se puede crear User")
        });
    }
}
})();