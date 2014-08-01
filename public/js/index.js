require([
	'./pro'
], function() {
    alert($(window).height());
	// 作临时全局变量使用
	$.tempStorage = {};
	//CountUp
	$('#countup').countable('start');

	// Spinner
	$('[data-spinner]').each(function() {
		var $this = $(this);
		$this.spinner('show')
	});

	$('#show-body-spinner').on('tap', function() {
		//var $this = $(this);
		//var delay = $this.data('delay') || 6000;

		$('body').spinner('show');
		//setTimeout(function(){
		//    $('body').spinner('hide');
		//}, delay);
	});

	$('#hide-body-spinner').on('tap', function() {
		$('body').spinner('hide');
	});

	function initSearch() {
		var $search = $('#my-search');
		var $input = $('#my-search-input');
		$input.on('focus', function() {
			$search.addClass('js-focus')
		}).on('input', function() {
			if ($input[0].value) {
				$search.addClass('js-input')
			} else {
				$search.removeClass('js-input')
			}
		});

		$('#my-search-reset').on('tap', function() {
			$input[0].value = '';
			$search.removeClass('js-input');
			$input[0].focus();
		});

		$('#my-search-cancel').on('touchstart', function(evt) {
			$input[0].value = '';
			$search.removeClass('js-input');
			$search.removeClass('js-focus');

			document.activeElement.blur();
			$input[0].blur();

			evt.stopPropagation();
			evt.preventDefault();
		});
	}

	initSearch();

	// Tab
	$('[data-toggle="tab"]').on('shown:tab', function(e) {

		var target = e.target // activated tab
		var relatedTarget = e.relatedTarget // previous tab

		var tab = target.innerText.trim().toLowerCase();

		if (target.inited) return;

		if (tab == 'counter') {

			$('[data-countable]').each(function() {
				var $this = $(this);
				$this.countable('start')
			});

		} else if (tab == 'spinner') {


		} else if (tab == 'carousel') {

			$('[data-ride="carousel"]').each(function() {
				var $this = $(this);
				$this.carousel($this.data());
			});
		} else if (tab == 'deleter') {

			$('.my-deletable').deletable();

		} else if (tab == 'lazyload') {
			$('[data-lazy]').lazyload({
				container: $.os.ios > 5 ? $('#page5-container') : window
			});
		}

		target.inited = true;

	});

	//图片自动轮播
	$(document).ready(function(e){
        var target = e.target // activated tab
        $('[data-ride="carousel"]').each(function() {
            var $this = $(this);
            $this.carousel($this.data());
        });
    }) ;

    $(document).on('tap','[data-toggle="mytab"]',function(){
        // e.preventDefault();
        $(this).tab('show');
    });

	//=======================css fix=======================
	function autoResize(){
		var w = $(document).width();
		var r = 100.0/((w/100)>>0) + '%';
		$(".item").css({width:r});
	}
	autoResize();
	$(window).resize(autoResize);
    /**
     * =======================UI-跳转========================
     */
  	// $(".item-wrapper .item").on("tap",function(){
  	// 	var code = $(this).data('code');
  	// 	location.href = "/details?code="+code;
  	// }) ; 
  	// $(".item-wrapper .item").trigger("tap");
  	$(".my-top-bar").on("tap",function(){

  		var $this = $(this);
  		var target = $this.data("target").split("-")[1];
		// alert(target);
		if(target=='page1'){
			location.href = "/?r=home" ;
		}
		if(target=='page2'){
			location.href = "/?r=shopcart" ;
		}		
  	});
  	if(localStorage.cart && localStorage.cart!='{}'){
		$("#topbar-cart-reddot").show();
		$("#bottombar-cart-reddot").show();
  	}
    //=======================错误日志========================
  	$.uploadErrorLog = function(str,d){
  		$.post("/errlog?from="+d,{r:str});
  	};

    //=======================获取商品详情====================
    $.getProductDetail = function(arr,cb){
        // 远程获取购物车中的商品信息
        $.get("/getProduct",{r:arr},function(data,status){
            if(status != "success"){
                // 请求失败  
                return;
            }
            $.uploadErrorLog(data);
            var products = data.list;
            if(arr.length==products.length){
                cb(null,data);
            }else{
            	var err = "商品数量出错";
            	cb(err);
            	$.uploadErrorLog(err);
            }
        });        
    } ;


    //========================购物车======================
    function getCartDetail(cb){
        var cart = localStorage.cart || '{}';
        cart = JSON.parse(cart);
        var cartArr = [];
        for(var i in cart){
            cartArr.push(i);
        }
        if(cartArr.length==0){
        	return $(".order-load-info p").text("购物车中没有商品");
        }
        $.getProductDetail(cartArr,function(err,data){
            if(err){
                alert(err);
            }else{
                var list = data.list; 
                var dir = data.s_dir;
                var $ul = $("#order-list-container ul");
                var $li = $ul.children("li.template");
                list.forEach(function(d){
                	var addli = $li.clone();
                    addli.addClass("jiu-single");
                    addli.removeClass("template");
                	addli.data('code',d.id);
                	addli.find(".jiu-detail").text(d.describe);
                	addli.find(".order-list-price").text(d.wechatPrice);
                	addli.find(".order-list-num").text(cart[d.id]['num']);
                	addli.find("img").attr('src',dir+d.littlePic);
                	$ul.append(addli);
                	addli.show();                	
                });
                $li.hide();
                $(".order-load-info").hide();
                $("#order-list-container").show();
                $("#order-confirm-container").show();
                updateTicket(cart);
                cb();
            }
        });  
    }
    getCartDetail(function(){
        
    	$(".jiu-li .jiu-single").on('tap',function(){
    	    // $("#changeCartActionsheet").();
    	    $.tempStorage.cartListTap = $(this);
    	}); 

    });  
 
    $("#as_cart_change_num").on('tap',function(){
        // 修改数量
        // $target = $("#changeCartNumActionsheet");
        // $target.show() ;
        // $target.show() ;       
    });
    $("#as_cart_move_collect").on('tap',function(){
        // 移至收藏
    });
    $("#as_cart_delete").on('tap',function(){
        // 删除购物车中商品
        var cart = JSON.parse(localStorage.cart);
        $.uploadErrorLog(cart);
        delete cart[$.tempStorage.cartListTap.data('code')];
        localStorage.cart = JSON.stringify(cart);
        $.tempStorage.cartListTap.remove();
        $("#order-confirm-container").hide();
        $("#order-list-container").hide();
        $(".order-load-info p").text("购物车中没有商品");
        $(".order-load-info").show();
    });
    $("#as_cart_view_detail").on('tap',function(){
    	var code = $.tempStorage.cartListTap.data('code');
    	var num = JSON.parse(localStorage.cart)[code].num;
        location.href = "/details?code="+code+"&num="+num ;
    });
    //======================获取券===========================
    function getTicket(cb){
    	$.get("/cash_voucher",function(data,status){
    		if(status!='success'){
    			$.uploadErrorLog('fail to request /getTicket');
    			return cb("fail");
    		}
    		cb(null,data);
    	});
    }
    function updateTicket(cart){
	    getTicket(function(err,data){
	    	if(data){
	    		var $left = $("#cart-ticket-left");
	    		var $use = $("#cart-ticket-use");
	    		var $pay = $("#cart_total_cost");
	    		var total = data.cash;
	    		var cost = 0;
	    		for(var i in cart){
	    			cost += cart[i].num * cart[i].price ;
	    		}
                $.uploadErrorLog({cost:cost},'cost');
	    		if(total>=cost){
	    			$use.text(cost);
	    			$left.text(total-cost);
	    			$pay.text(0);
	    		}else{
	    			$use.text(total);
	    			$left.text(0);
	    			$pay.text(cost-total);
	    		}
	    	}
	    });    	
    }
    //====================加载地址=====================
    function getAddr(cb){
        $.get("/address",function(data,status){
            if(status != 'success'){
                // 加载地址失败
                cb("fail to get address");
                return;
            }
            cb(null,data);
        });
    }
    function updateAddrUI(cb){
        var $li = $(".cart-address-list li.j-address-item");
        var $myli = $(".my-address-list li.j-address-item");
        getAddr(function(err,data){
            $.uploadErrorLog(data,"address");
            if(!data)
                return;
            var r = [];
            localStorage.address = JSON.stringify(data);
            localStorage.defauleAddrIndex = 0;
            for(var i=0;i<data.length;i++){
                var item = data[i];
                var addli = $li.clone();
                addli.data('index',i);
                addli.find('.j-province').text(item.province || "");
                addli.find('.j-shi').text(item.city || "");
                addli.find('.j-qu').text(item.area || "");
                addli.find('.j-lu').text(item.detail || "");
                addli.find('.j-name').text(item.name || "");
                addli.find('.j-tel').text(item.tel || "");
                if(i==0){
                    addli.addClass("j-select");
                }
                addli.show();
                r.push(addli);
            }
            var addr = r.pop();
            while(addr){
                $(".cart-address-list").prepend(addr);
                addr = r.pop();
            }
            $li.remove();
            for(var i=0;i<data.length;i++){
                var item = data[i];
                var addli = $myli.clone();
                addli.data('index',i);
                addli.find('.j-province').text(item.province || "");
                addli.find('.j-shi').text(item.city || "");
                addli.find('.j-qu').text(item.area || "");
                addli.find('.j-lu').text(item.detail || "");
                addli.find('.j-name').text(item.name || "");
                addli.find('.j-tel').text(item.tel || "");
                if(i==0){
                    addli.addClass("j-default");
                }
                addli.show();
                r.push(addli);
            }
            addr = r.pop();
            while(addr){
                $(".my-address-list").prepend(addr);
                addr = r.pop();
            }
            $myli.remove();
            cb && cb();            
        });
    }
    $(document).on('tap','.page4 .j-single',function(){
        $(this).parent().find('.j-single').removeClass('j-select');
        $(this).toggleClass('j-select');
        localStorage.defauleAddrIndex = $(this).data('index');
    });

    $(document).on('tap','.my-address-list li.j-address-item',function(){
        $.tempStorage.tapAddressItem = $(this) ;
    });

    $("#addressActionsheet ul li").on('tap',function(){
        var handle = {
            'setDefault' : function($this){
                $.get("/default_address",{index : $this.data('index')},function(data,status){
                    if(status !== 'success'){
                        $.uploadErrorLog({r:"fail to set default address"},"delete_address");
                        return alert("网络故障，稍后重试");
                    }   
                    localStorage.defauleAddrIndex = $this.data('index');
                    $(".j-address-item.j-default").removeClass("j-default");
                    $this.addClass("j-default");                                     
                });
            },
            'delete':function($this){

                $.post("/delete_address",{index : $this.data('index')},function(data,status){
                    $this.remove();
                });
            }
        };
        handle[$(this).data('action')]($.tempStorage.tapAddressItem);
    });
    updateAddrUI();
    //=======================确认订单=======================
    $(document).on('tap',"#cart_confirm",function(){
        var purchase = {};
        purchase.shopOnce = [];
        var cart = JSON.parse(localStorage.cart);
        for(var i in cart){
            purchase.shopOnce.push({
                id : i,
                number : cart[i]['num']
            });
        }
        purchase.cashUse = parseFloat($("#cart-ticket-use").text());
        purchase.voucherUse = 0;
        purchase.totalPrice = parseFloat($("#cart_total_cost").text());
        localStorage.purchase = JSON.stringify(purchase);
    });

    //=======================货到付款=======================
    $("#complete_cash_pay").on('tap',function(){
        var purchase = JSON.parse(localStorage.purchase);
        var addresses = JSON.parse(localStorage.address);
        var index = parseInt(localStorage.defauleAddrIndex);
        purchase.address = addresses[index];
        purchase.confirmTel = "";
        localStorage.purchase = JSON.stringify(purchase);
        $.post("/purchase",purchase,function(data,status){
            if(status!='success'){
                $.uploadErrorLog("post /purchase error");
                return;
            }
            // 清空购物车
            
            clearCart();
            // 更新购物车
            // 更新我的订单
            updateMyOrder();
            // 跳转页面
            $('.ui-bottom-bar-button[data-target=".page3"]').trigger('tap');
            $('.ui-button[data-target="#page3-tab1"]').trigger('tap');
        });
    });
    function clearCart(){
        localStorage.cart = '{}';
        $(".order-load-info p").text("购物车中没有商品");
        $(".order-load-info").show();
        $("#order-list-container ul .jiu-single").remove();
        $("#order-list-container").hide();
        $("#order-confirm-container").hide();       
    }
    //=======================显示券=========================
    $.get('/cash_voucher',function(data,status){
        if(status !== 'success'){
            $.uploadErrorLog({r:"fail to get cash"},"cash_voucher");
            return alert("网络故障，稍后重试");
        } 
        var cash = data.cash;
        $("#my_cash_num").text(cash);
        $("#my_cash_num").data('to',cash);        
    });

    //=======================我的订单=======================
    function ininMyOrderUI(arr){
        var $process = $(".order-processing.template") ;
        var $complete = $(".order-complete.template") ;
        var $parent = $process.parent();
        var list_process = [];
        var list_complete = [];
        arr.forEach(function(item){
            var $add = $complete.clone();
            if(item.status == 0){
                var $add = $process.clone();
            }
            $add.removeClass("template");
            $add.addClass("my-order-item");
            $add.find(".order-id").text(item.orderID);
            var $li = $add.find("li.jiu-single");
            var $ul = $add.find("ul.jiu-li");
            item.wines.forEach(function(wine){
                var $addli = $li.clone();
                $addli.find(".jiu-detail").text(wine.describe);
                $addli.find(".order-list-price").text(wine.wechatPrice);
                $addli.find(".order-list-num").text(wine.num);
                $addli.find("img").attr('src',wine.littlePic);
                $ul.append($addli);
            });
            $li.remove();
            $add.show();            
            if(item.status == 0){
                list_process.push($add);
            }else{
                list_complete.push($add);
            }

        });
        var a = list_complete.pop();
        while(a){
            $parent.prepend(a);
            a = list_complete.pop();
        }
        a = list_process.pop();
        while(a){
            $parent.prepend(a);
            a = list_process.pop();
        }        
        $process.remove();
        $complete.remove();
    }

    function updateMyOrder(){
        $.post('/getuserorder',function(data,status){
            if(status!='success'){
                alert("fail to getuserorder");
                return;
            }
            ininMyOrderUI(data);
        });        
    }
    updateMyOrder();

    $(document).on('click',"#detail_add_cart",function(){
        $(this).trigger("tap");
    });
})