$(document).ready(function() {

	var question;		
	var correctAns;	
	var wrongAns;	
	var answered; 		
	var unanswered;		
	var secs;		
	var time;			
	var chosen;		

	var response = {
		correct: "Correct!",
		incorrect: "WRONG.",
		timedOut: "Zarkon and Haggar would strike you down quicker than that!",
		done: "END",
	};

	var trivia = [
		{	
			question: "Out of the main six Paladins, which two have appeared in every episode except one, 'The Journey'?",
			choices: ["Allura and Lance", "Shiro and Pidge", "Lance and Pidge", "Keith and Shiro", "Hunk and Pidge"],
			correct: 2,
			image: "assets/images/crewSplosion.gif",
			answerText: "Only Shiro and Keith appear in 'The Journey, though the other four Paladins do appear in silent flashbacks.",
		},

		{
			question: "The voice of Pidge is played by Bex Taylor-Klaus, a native of what US City?",
			choices: ["New York", "Atlanta", "Spokane", "Los Angeles", "Oklahoma City"],
			correct: 1,
			image: "assets/images/redPunch.gif",
			answerText: "A native Atl-ien, Bex moved to LA and had their breakout role in AMC's The Killing.",
		},

		{
			question: "In which episode do none of the paladins appear?",
			choices: ["Shadows", "The Journey Within", "Heart of the Lion", "Black Site", "The Ark of Taujeer"],
			correct: 0,
			image: "assets/images/voltronShip.gif",
			answerText: "'Shadows' is an Honerva-focused flashback episode from Season 8.",
		},

		{
			question: "Which of Japanese Animes are the basis for Voltron?",
			choices: ["Mirai Robo Daltanias & Gundam", "Gundam & Robotech", "Beast King GoLion & Robotech", "Beast King GoLion & Armored Fleet Dairugger XV", "Armored Fleet Dairugger XV & Evangelion"],
			correct: 3,
			image: "assets/images/voltron.gif",
			answerText: "Season one of Voltron consists of re-edited GoLion footage, while season two is repurposed Armored Fleet content.",
		},
		{
			question: "Which source material was SUPPOSED to be the oirignal Voltorn's basis?",
			choices: ["Beast King GoLion", "Armored Fleet Dairugger XV", "Transformers", "Robotech", "Mirai Robo Daltanias"],
			correct: 4,
			image: "assets/images/lionRunJump.gif",
			answerText: 'The Japanese team accidentally sent the American team Beast King GoLion instead of Mirai Robo Daltanias.',
		},
		{
			question: "Voltron has an ascendant meme based on Shiro known as:?",
			choices: ["Space Lion Jockey", "Clones-on-clones", "Space Dad", "Space Man", "Stick-up-the-butt-Shiro"],
			correct: 2,
			image: "assets/images/crewDiv.gif",
			answerText: 'Yep, hippos can be run pretty fast, and they\'re quite deadly too - well not THIS one. The name hippopotamus means "river horse."'
		},
		{
			question: "What Natioanlist are Shiro, Pidge, Lance, & Hunk, respectively?",
			choices: ["Japanese, Italian, Cuban, Samoan", "American, Italian, Cuban, Samoan", "Japanese, American, Galra, Cuban", "British, Japanese, Italian, Japanese", "American, American, Cuban, Samoan"],
			correct: 0,
			image: "assets/images/crewSplosion.gif",
			answerText: "Meanwhile, Keith is part Glara and unknown Earth nationality."
		},
	];

	// Hidden fields on start-up
	$("#gameDiv").hide();

	// Start Button trigger for calling newGame
	$("#startBtn").on("click", function(){
		$("#startGame").hide();
		newGame();
	});

	// Reset Button trigger for calling newGame
	$("#resetBtn").on("click", function(){
		$("#result").hide();
		newGame();
	});

	// Sets up New Game
	function newGame() {
		$("#gameDiv").show();
		$("#answer").hide();
		$("#result").hide();		
		correctAns = 0;
		wrongAns = 0;
		unanswered = 0;
		question = 0;
		questions();
	}
	
	// Question Chooser
	function questions() {
		$("#answer").hide();
		$("#quest").show();
		answered = true;
		// Prints Question from Array
		$(".question").html(trivia[question].question);

		for (var i = 0; i <= 5; i++) {
			var list = $("<div>");
			list.text(trivia[question].choices[i]);
			list.attr({"data-index": i });
			list.addClass("choice");
			$(".choices").append(list);
		}

		tickTock();

		// On Click, run display() which hides divs.
		$(".choice").on("click",function(){
			chosen = $(this).data("index");
			clearInterval(time);
			display();
		});
	}

	// Countdown timer
	function tickTock() {
		secs = 20;
		$("#tickTock").html("00:" + secs);
		answered = true;
		time = setInterval(countdown, 1000);
	}

	// Displays timer on the page
	function countdown() {
		secs --;
		if(secs < 10) {
			$("#tickTock").html("00:0" + secs);
			$("#tickTock").css({"color": "red"});
		} else {
			$("#tickTock").html("00:" + secs);
			$("#tickTock").css({"color": "#def"});
		}

		if (secs < 1) {
			clearInterval(time);
			answered = false;
			display();
		}
	}
	
	// Hides/Displays Q&A, GIF, factoid, Responses.
	function display() {
		$("#quest").hide();
		$("#result").hide();
		$("#answer").show();
		$(".choice").empty();

		var correctAnsText = trivia[question].choices[trivia[question].correct];
		var correctAnsInd = trivia[question].correct;
		// console.log(correctAnsText);
		// console.log(correctAnsInd);

		var gif = trivia[question].image;
		var gifTag = $("<img>");
		gifTag.attr("Src", gif);
		gifTag.addClass("giphy");
		$("#gif").html(gifTag);

		
		var gifText = trivia[question].answerText; // creates/sets gifText = to the correct factoid from trivia question array.
			factoid = $("<div>"); // Creating a new factoid div
			factoid.html(gifText);
			factoid.addClass("factoid");
			$("#gifText").html(factoid);


		// Incrementing counters and rendering them on the page.
		if ((chosen === correctAnsInd) && (answered === true)) {
			correctAns++;
			$("#text").html(response.correct);
			$("#correctAns").hide();
		} else if ((chosen !== correctAnsInd) && (answered === true)) {
			wrongAns++;
			$("#text").html(response.incorrect);
			$("#correctAns").show().html("The correct answer is: " + correctAnsText);
		} else {
			unanswered++;
			$("#text").html(response.timedOut);
			$("#correctAns").html("The correct answer is: " + correctAnsText);
			answered = true;
		}

		// Timer for length of time between questions.
		if (question === (trivia.length-1)) {
			setTimeout(results, 7000);
		} else {
			question++;
			setTimeout(questions, 7000);
		}

	}

	function results() {
		$("#answer").hide();
		$("#quest").hide();
		$("#result").show();
		$("#resultText").html(response.done);
		$("#correctAnswers").html("Correct Answers: " + correctAns);
		$("#wrongAnswers").html("Wrong Answers: " + wrongAns);
		$("#unanswered").html("Didn't Answer: " + unanswered);
		$("#resetBtn").show();
        $("#resetBtn").html("PLAY AGAIN");

	}

	
});