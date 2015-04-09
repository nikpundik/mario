$(function() {

	var shooting = false;

	var goals = 0;
	var goalTop = 77;
	var shootSpeed = 300;
	var fallSpeed = 50;

	var game = $("#game");
	var goal = $("#goal");
	var ball = $("#ball");
	var result = $("#mario-result");

	var ballPosition = ball.position();
	var ballWidth = ball.width();

	marquee();

	goal.click(function(e) {

		if (shooting) return;
		shooting = true;

        var posX = game.offset().left,
            posY = game.offset().top;

        var ballX = e.pageX - posX - ballWidth*0.5;
        var ballY = e.pageY - posY - ballWidth*0.5;
	    
	    ballShoot(function() {
	    	scoreGoal();
	    });

	    function ballShoot(callback) {
	    	ball.animate({
		        left: ballX + "px",
		        top: ballY + "px"
		    }, shootSpeed, "swing", callback);
	    }

	    function ballGoal(callback) {
	    	ball.animate({
		        top: goalTop + "px"
		    }, fallSpeed, "swing", callback);
	    }

	    function ballReset() {
			ball.css({
		        left: ballPosition.left + "px",
		        top: ballPosition.top + "px"
		    });
    		shooting = false;
	    }

	    function scoreGoal() {
	    	goals++;
	    	result.text(goals);
	    	ballGoal(function() {
	    		setTimeout(ballReset, 2000);
	    	});
	    }

	});

	function marquee() {
		var marqueeDiv = $("#marquee > div");
		var marqueeWidth = "-" + marqueeDiv.css("width");
		var parentMarqueeWidth = $("#marquee").css("width");

		marqueeDiv.css("margin-left", parentMarqueeWidth);
		animateMarquee();

	    function animateMarquee() {
	    	marqueeDiv.animate({
		        "margin-left": marqueeWidth
		    }, 10000, "linear", function(){
		    	marqueeDiv.css("margin-left", parentMarqueeWidth);
		    	animateMarquee()
		    });
	    }
	}

});