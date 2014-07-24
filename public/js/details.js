require([
    'pro','index'
],function(){
    $("#detail_changeNum1").on("tap",function(){
        console.log($("#detail_num").text());
        var n = parseInt($("#detail_num").text());

        $("#detail_num").text(n+1);
    });
    $("#detail_changeNum0").on("tap",function(){
        var n = parseInt($("#detail_num").text());
        if(n>1){
            $("#detail_num").text(n-1);
        }            
    });  
    function addToCart(){
        var _cart = localStorage.cart || '{}' ;
        var cart = JSON.parse(_cart);
        $("#topbar-cart-reddot").show();
        cart[code] = {
            num : parseInt($("#detail_num").text()) ,
            price : price
        };
        localStorage.cart = JSON.stringify(cart);        
    }
    $("#detail_add_cart").on("tap",addToCart); 
    $("#detail_shop_now").on("tap",function(){
        addToCart();
        location.href = "/?r=shopcart";        
    });
});