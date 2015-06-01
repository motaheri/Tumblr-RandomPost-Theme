    
    // src: http://buildinternet.com/2009/09/its-a-rainbow-color-changing-text-and-backgrounds/
    (function(jQuery){
    
        // We override the animation for all of these color styles
        jQuery.each(['backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'color', 'outlineColor'], function(i, attr){
            jQuery.fx.step[attr] = function(fx){
                if (fx.state == 0) {
                    fx.start = getColor(fx.elem, attr);
                    fx.end = getRGB(fx.end);
                }
                
                fx.elem.style[attr] = "rgb(" +
                [Math.max(Math.min(parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0]), 255), 0), Math.max(Math.min(parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1]), 255), 0), Math.max(Math.min(parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2]), 255), 0)].join(",") +
                ")";
            }
        });
        
        // Color Conversion functions from highlightFade
        // By Blair Mitchelmore
        // http://jquery.offput.ca/highlightFade/
        
        // Parse strings looking for color tuples [255,255,255]
        function getRGB(color){
            var result;
            
            // Check if we're already dealing with an array of colors
            if (color && color.constructor == Array && color.length == 3) 
                return color;
            
            // Look for rgb(num,num,num)
            if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color)) 
                return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];
            
            // Look for rgb(num%,num%,num%)
            if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color)) 
                return [parseFloat(result[1]) * 2.55, parseFloat(result[2]) * 2.55, parseFloat(result[3]) * 2.55];
            
            // Look for #a0b1c2
            if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color)) 
                return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
            
            // Look for #fff
            if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color)) 
                return [parseInt(result[1] + result[1], 16), parseInt(result[2] + result[2], 16), parseInt(result[3] + result[3], 16)];
            
            // Otherwise, we're most likely dealing with a named color
            return colors[jQuery.trim(color).toLowerCase()];
        }
        
        function getColor(elem, attr){
            var color;
            
            do {
                color = jQuery.curCSS(elem, attr);
                
                // Keep going until we find an element that has color, or we hit the body
                if (color != '' && color != 'transparent' || jQuery.nodeName(elem, "body")) 
                    break;
                
                attr = "backgroundColor";
            }
            while (elem = elem.parentNode);
            
            return getRGB(color);
        };
        
        // Some named colors to work with
        // From Interface by Stefan Petre
        // http://interface.eyecon.ro/
        
        var colors = {
            aqua: [0, 255, 255],
            azure: [240, 255, 255],
            beige: [245, 245, 220],
            black: [0, 0, 0],
            blue: [0, 0, 255],
            brown: [165, 42, 42],
            cyan: [0, 255, 255],
            darkblue: [0, 0, 139],
            darkcyan: [0, 139, 139],
            darkgrey: [169, 169, 169],
            darkgreen: [0, 100, 0],
            darkkhaki: [189, 183, 107],
            darkmagenta: [139, 0, 139],
            darkolivegreen: [85, 107, 47],
            darkorange: [255, 140, 0],
            darkorchid: [153, 50, 204],
            darkred: [139, 0, 0],
            darksalmon: [233, 150, 122],
            darkviolet: [148, 0, 211],
            fuchsia: [255, 0, 255],
            gold: [255, 215, 0],
            green: [0, 128, 0],
            indigo: [75, 0, 130],
            khaki: [240, 230, 140],
            lightblue: [173, 216, 230],
            lightcyan: [224, 255, 255],
            lightgreen: [144, 238, 144],
            lightgrey: [211, 211, 211],
            lightpink: [255, 182, 193],
            lightyellow: [255, 255, 224],
            lime: [0, 255, 0],
            magenta: [255, 0, 255],
            maroon: [128, 0, 0],
            navy: [0, 0, 128],
            olive: [128, 128, 0],
            orange: [255, 165, 0],
            pink: [255, 192, 203],
            purple: [128, 0, 128],
            violet: [128, 0, 128],
            red: [255, 0, 0],
            silver: [192, 192, 192],
            white: [255, 255, 255],
            yellow: [255, 255, 0]
        };
        
        
    })(jQuery);
    
    
    // src: http://plugins.jquery.com/project/cookie
    jQuery.cookie = function(name, value, options){
        if (typeof value != 'undefined') { // name and value given, set cookie
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                }
                else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
            }
            // CAUTION: Needed to parenthesize options.path and options.domain
            // in the following expressions, otherwise they evaluate to undefined
            // in the packed version for some reason...
            var path = options.path ? '; path=' + (options.path) : '';
            var domain = options.domain ? '; domain=' + (options.domain) : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        }
        else { // only name given, get cookie
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    }
    
    
    
    
    
    // src: http://3nhanced.com/examples/randomContent/
    $.fn.randomContent = function(contentArray){
        var rc = this;
        getRandom = function(){
            var num = contentArray.length
            var randNum = Math.floor(Math.random() * num);
            
            var content = "";
            for (x in contentArray) {
                if (x == randNum) {
                    content = contentArray[x];
                }
            };
            return content;
        }
        
        rc.each(function(){
            $(this).html(getRandom());
        });
        
    };
    
    function randomize(titleArray){
        $('#message a').randomContent(titleArray);
    }
	
	// http://jquery-howto.blogspot.com/2009/09/get-url-parameters-values-with-jquery.html
    function getUrlVars(){
		var url = window.location.href;
		var postInUrl    = url.indexOf('/post/');
    	var hash = url.slice(url.indexOf('#') + 1);
		if (postInUrl != '-1' || hash == 'new'){
			return 'yes';
		}
    }
    
    // tumblr json retrieval written by Mohammad Taheri http://motaheri.com/
    $(document).ready(function(){
        var titleArray = [], titleItem, aCount = 0, titleArrayStore = $.cookie('titleArrayStore'), latestPostId, lastPostStored = $.cookie('lastPostStored');
        
		if (true) {
        	// Tell the function where the feed is located
            $.getJSON("http://omgiloveglitter.tumblr.com/api/read/json?callback=?&num=50", function(data){
            
                // Grab each of the "entries"
                $.each(data.posts, function(i, item){
                    if (this.type == 'regular') {
                        titleItem = item["regular-title"].replace(/(<.*?>)/ig, "");
                        if (titleItem.length) {
                            if (aCount == 0) {
                                latestPostId = item.id
                            }
                            titleArray[aCount] = titleItem;
                            aCount++;
                        }
                    }
                });
                if (latestPostId != lastPostStored && titleArrayStore) {
                    titleArrayStore = titleArrayStore.split('|');
                    titleArray = $.merge(titleArray, titleArrayStore);
                    $.unique(titleArray);
                }
                // photo-url-1280
                // $('#myDiv').css('background', 'url(path/to/image.jpg)');
				
				// To call the latest post with the #new hash remember to set tumblr to only display one post per page
                if (getUrlVars() != 'yes') {
					randomize(titleArray);
				}
				//$('#hour-glass').show();
                titleArrayStore = titleArray.join('|');
                $.cookie("lastPostStored", latestPostId, {
                    expires: 1000
                });
                $.cookie("titleArrayStore", titleArrayStore, {
                    expires: 1000
                });
            });
        }

        $('html').click(function(){
            randomize(titleArray);
            return false;
        });
		
        // make it glitter
        spectrum();
        
        function spectrum(){
            var hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
            $('#message a').animate({
                color: hue
            }, 1000);
            spectrum();
        }
		
    });
    