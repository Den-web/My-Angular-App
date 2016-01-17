(function(app){
 
    var profileCtrl = function( ){
        console.log( 'profileCtrl' );
    };
 
    // Регистрируем контроллер чрез сохраненную функцию, иначе не сработает
    app.lazyRegisterController('profileCtrl',[profileCtrl]);
 
})(lazyloadapp);