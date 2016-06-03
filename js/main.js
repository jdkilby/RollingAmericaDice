// taken from the MDN page on Math.random
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
Math.randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(document).ready(init);

function init() {
	var i, tempIndex1, tempIndex2, tempValue, dice = $(".die"), dieRows = $(".dieRow");
	var colors = ["crimson", "orange", "royalblue", "darkorchid", "green", "yellow", "white"];
	function COLOR_SHUFFLE_ATTEMPTS() { return 100; }
	function DICE_REVEAL_SPEED() { return 1500; }

	var resetDice = function() {

		$(dieRows).each(function() {
			$(this).hide();
		});

		for ( i = 0; i < COLOR_SHUFFLE_ATTEMPTS(); i ++ ) {
			tempIndex1 = Math.randomInt(0, colors.length - 1);
			tempIndex2 = Math.randomInt(0, colors.length - 1);
			tempValue = colors[tempIndex1];
			colors[tempIndex1] = colors[tempIndex2];
			colors[tempIndex2] = tempValue;
		}
		
		for ( i = 0; i < dice.length; i++ ) {
			// assigns generated unicode die character (1 = 0x26800, 6 = 0x26805)
			// assigns value to raw DOM element
			$(dice[i]).get(0).childNodes[0].nodeValue = String.fromCharCode(0x2680 + Math.randomInt(0, 5));
			$(dice[i]).children().first().css("backgroundColor", colors[i]);
		}

		$("#buttonContinue").text("Start Round");
	}

	$("#buttonContinue").click(function() {
		$("#buttonContinue").attr("disabled", "disabled");

		if ( $(dieRows[0]).is(":hidden") ) {
			$(dieRows[0]).slideDown(DICE_REVEAL_SPEED(), function() {
				$("#buttonContinue").text("Roll Next Two Dice");
				$("#buttonContinue").removeAttr("disabled");
			});	
			return;
		}

		if ( $(dieRows[1]).is(":hidden") ) {
			$(dieRows[1]).slideDown(DICE_REVEAL_SPEED(), function() {
				$("#buttonContinue").removeAttr("disabled");
			});	
			return;
		}

		if ( $(dieRows[2]).is(":hidden") ) {
			$(dieRows[2]).slideDown(DICE_REVEAL_SPEED(), function() {
				$("#buttonContinue").text("Reset Dice");
				$("#buttonContinue").removeAttr("disabled");
			});	
			return;
		}


		$("#dice").slideUp(DICE_REVEAL_SPEED(), function() {
			$(dieRows).each(function() {
				$(this).hide();
				
			});
			$("#dice").show();
			resetDice();
			$("#buttonContinue").removeAttr("disabled");
		});
	});

	// now that initialization function is defined, call it
	resetDice();
}