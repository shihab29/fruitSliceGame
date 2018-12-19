var isPlaying = false;
var score;
var trialsLeft;
var fruits = ['apple', 'banana', 'pineapple'];
var step;
var action;

$(function() {
	$('#startReset').click(function() {
		if(isPlaying == true) {
			isPlaying = false;

			$('#startReset').text('Start Game');

			location.reload();
		}
		else {
			isPlaying = true;
			score = 0;
			trialsLeft = 3;

			$('#startReset').text('Reset Game');
			$('#trialsLeft').css('display', 'block');
			$('#scoreValue').text(score);

			addHearts();
			startAction();

		}
	});

	//External JS functions

	function addHearts() {
		$('#trialsLeft').empty();
		for(i=0; i<trialsLeft; i++) {
			$('#trialsLeft').append('<img src="images/heart.png" class="life">');
		}
	}

	$('#fruit1').mouseover(function() {
		score++;
		$('#scoreValue').text(score);
		$('#sliceSound')[0].play(); // keep that in mind that we need to use this as an array

		clearInterval(action);
		$('#fruit1').hide("explode", "500"); //must include the jQuery UI CDN
		setTimeout(startAction, 500);

	});

	function startAction() {
		$('#gameOver').hide();
		$("#fruit1").show();
		chooseFruit();
		$('#fruit1').css({
			'left': Math.round(Math.random() * 550),
			'top': '-50px'
		});

		step = Math.round(Math.random() * 5) + 1;

		action = setInterval(function() {
			$('#fruit1').css('top', $('#fruit1').position().top + step);

			if($('#fruit1').position().top > 400) {
				if(trialsLeft>1){
					$("#fruit1").show();
					chooseFruit();
					$('#fruit1').css({
						'left': Math.round(Math.random() * 550),
						'top': '-50px'
					});

					step = Math.round(Math.random() * 5) + 1;

					trialsLeft--;
					addHearts();
				}
				else {
					isPlaying = false;
					gameOver();
				}
			}
		}, 10);

	}

	function chooseFruit() {
		$('#fruit1').attr({
			'src': 'images/'+ fruits[Math.round(Math.random() * 2)] +'.png'
		});
	}

	function gameOver() {
		$('#trialsLeft').hide();
		$('#gameOver').html('<p>Game Over!</p><p>Your score is: '+ score +'</p>');
		$('#gameOver').show();
		$('#startReset').text('Start Game');
		$('#fruit1').hide();

		clearInterval(action);
	}

});

