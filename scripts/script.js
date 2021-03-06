// init bunch of sounds
ion.sound({
    sounds: [
        {name: "blop"}
    ],

    // main config
    path: "https://cdn.rawgit.com/motaheri/IsItDaisyDay/master/sounds/",
    preload: true,
    multiplay: true,
    volume: 0.1
});


/**https://radu.cotescu.com/javascript-diff-function/
* Function which returns the result of the subtraction method applied to
* sets (mathematical concept).
*
* @param a Array one
* @param b Array two
* @return An array containing the result  a-b
*/
function diffArray(a, b) {
	var seen = [], diff = [];
	for ( var i = 0; i < b.length; i++)
	  seen[b[i]] = true;
	for ( var i = 0; i < a.length; i++)
	  if (!seen[a[i]])
		  diff.push(a[i]);
	return diff;
}

// src: http://3nhanced.com/examples/randomContent/
function getRandom(contentArray){
	var num = contentArray.length;
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
	$('#message span').randomContent(titleArray);
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

 var currentMousePos = { x: -1, y: -1 };
 $(document).mousemove(function(event) {
     currentMousePos.x = event.pageX;
     currentMousePos.y = event.pageY;
 });

var photoArray = [];
function randomImage() {


  // play sound
  ion.sound.play("blop");
  var imageSizeH = 500 + Math.floor(Math.random() * 500);
  var imageSizeW = 500 + Math.floor(Math.random() * 500);
  var windowHeight = $(window).height() - imageSizeH;
  var windowHWidth = $(window).width() - imageSizeW;
  //var imagePosY = Math.floor(Math.random() * windowHeight);
  //var imagePosX = Math.floor(Math.random() * windowHWidth);
  
  var imagePosY = currentMousePos.y - (imageSizeH / 2);
  var imagePosX = currentMousePos.x - (imageSizeW / 2);

  console.log(currentMousePos);


  //$('#randImageHolder').css('top',imagePosY).css('left',imagePosX);
  //$('#randImageHolder').css('height',imageSizeH).css('width',imageSizeW);
  //console.log(photoArray);
  var randomPhoto = getRandom(photoArray);
  console.log(randomPhoto);
  //$('#randImageHolder').css('background','url(' + randomPhoto + ')');
  //$('#randImageHolder').fadeIn('fast');
  var appendImgHtml = '<div class="randImageContainer" style="height:' + imageSizeH + 'px; width:' + imageSizeW + 'px; top:' + imagePosY + 'px; left:' + imagePosX + 'px; background: url(' + randomPhoto + ')"/>';
  //$('#popAudio').prop("volume",0.1);
  //$('#popAudio')[0].play();
  $('#randImageHolder').append(appendImgHtml);

};

// tumblr json retrieval written by Mohammad Taheri http://motaheri.com/
$(document).ready(function(){
	var titleArray = [], titleItem, aCount = 0, bCount = 0, titleArrayStore = $.cookie('titleArrayStore'), latestPostId, lastPostStored = $.cookie('lastPostStored');
	
	if (true) {
		// Tell the function where the feed is located
		$.getJSON("http://isitdaisyday.tumblr.com/api/read/json?callback=?&num=50", function(data){
		
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
				}else if(this.type == 'photo'){
					photoUrl = item["photo-url-1280"].replace(/(<.*?>)/ig, "");
					photoArray[bCount] = photoUrl;
					//console.log(photoArray);
					bCount++;
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
			//console.log(titleArray);
			titleArrayStore = titleArray.join('|');
			$.cookie("lastPostStored", latestPostId, {
				expires: 1000
			});
			$.cookie("titleArrayStore", titleArrayStore, {
				expires: 1000
			});
			$('.button').css('display','inline-block');
		});
	}


	function spectrum(titleArraySelection){
		$("#message .message-text").html('');
		$("#message .message-text").typed({
			strings: titleArraySelection,
			typeSpeed: 5,
			backDelay: 1500,
			loop: false,
			contentType: 'html', // or text
			// defaults to false for infinite loop
			loopCount: false,
			callback: function(){ afterType(); }
		});

		$(".reset").click(function(){
			$("#typed").typed('reset');
		});

	};

	function afterType(){ 
		$('html').css('cursor','pointer');
		randomImage();
		//console.log("Callback");
		$("html, body").on("tap",function(){
		  	randomImage();
			return false;
		});
	}
	
	//dynamic stack of posts
	var titleArrayUnique = titleArray;
	
	
	$('.button').click(function(){
		$('.button').hide();
		$('#hour-glass').fadeIn(300);
		var titleArraySelectionPrevious = $.cookie('titleArraySelectionStored');
		if (typeof titleArraySelectionPrevious !== 'undefined') {
			titleArraySelectionPrevious = titleArraySelectionPrevious.split('|');
		}else{
			titleArraySelectionPrevious = [];
		}
		titleArraySelection = [];
		//console.log('titleArraySelection');
		//console.log(titleArraySelection);
		
		//Lets get posts that are unique
		titleArrayUnique = diffArray(titleArrayUnique,titleArraySelectionPrevious);
		// If less than two posts we need to get the single post and then add all the post back in the stack
		if (titleArrayUnique.length < 2){
			//get last remaining post 
			titleArraySelection = titleArrayUnique;
			//remove the last remaining post from the original stack
			titleArrayUnique = diffArray(titleArray,titleArraySelection);
			//get another unique post from the stack
			titleArraySelection.push(getRandom(titleArrayUnique));
			//and remove the second unique post from the stack
			titleArrayUnique = diffArray(titleArrayUnique,titleArraySelection);
		}else{ // if we have more than two posts in stack 
			// get a unique post from stack
			titleArraySelection.push(getRandom(titleArrayUnique));
			// remove that post from the post stack
			titleArrayUnique = diffArray(titleArrayUnique,titleArraySelection);
			// get another unique post
			titleArraySelection.push(getRandom(titleArrayUnique));
			// and remove it from the post stack 
			titleArrayUnique = diffArray(titleArrayUnique,titleArraySelection);
		}
		
		
		$.cookie("titleArraySelectionStored", titleArraySelection.join('|'), {
				expires: 1000
		});



		var todayDate = new Date();
		todayDate = todayDate.toString();

		if(todayDate.indexOf("Apr 12") > 0){                
			titleArraySelection = ["Happy Birthday Daisy!", "You are totally awesome!", "Have a super Daisy day!!!"];
		}else if(todayDate.indexOf("Apr 13") > 0){
			titleArraySelection = ["Hope your Birthday was awesome Daisy!", "Just like you!"];
		}

		
		setTimeout(function() {
			$('#hour-glass').fadeOut( "slow", function() {
				spectrum(titleArraySelection);
				$('#message').show();
			});
		}, 700);
		
		return false;
	});
});

