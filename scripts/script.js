    // src: http://3nhanced.com/examples/randomContent/
        function getRandom(contentArray){
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
	
	$.fn.randomContent = function(contentArray){
        var rc = this;
        
        rc.each(function(){
            $(this).html(getRandom(contentArray));
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
            $.getJSON("http://itsdaisyday.tumblr.com/api/read/json?callback=?&num=50", function(data){
            
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
				console.log(titleArray);
				titleArrayStore = titleArray.join('|');
                $.cookie("lastPostStored", latestPostId, {
                    expires: 1000
                });
                $.cookie("titleArrayStore", titleArrayStore, {
                    expires: 1000
                });
				console.log(titleArray);
				$('.button').show();
            });
        }

        $('html').click(function(){
            randomize(titleArray);
            return false;
        });
		
		
		
	
		function spectrum(titleArraySelection){
			$("#message a").html('');
			$("#message a").typed({
				strings: titleArraySelection,
				typeSpeed: 5,
				backDelay: 1500,
				loop: false,
				contentType: 'html', // or text
				// defaults to false for infinite loop
				loopCount: false,
				callback: function(){ foo(); },
				resetCallback: function() { newTyped(); }
			});

			$(".reset").click(function(){
				$("#typed").typed('reset');
			});

		};

		function newTyped(){ /* A new typed object */ }

		function foo(){ console.log("Callback"); }
		
		$('.button').click(function(){
			$('.button').hide();
            $('#hour-glass').fadeIn(300);
			var titleArraySelection =[];
			titleArraySelection.push(getRandom(titleArray));
			titleArraySelection.push(getRandom(titleArray));
			//$('#hour-glass').hide();
			setTimeout(function() {
				$('#hour-glass').fadeOut( "slow", function() {
					spectrum(titleArraySelection);
					$('#message').show();
				});
			}, 700);
			
            return false;
        });
    });
    