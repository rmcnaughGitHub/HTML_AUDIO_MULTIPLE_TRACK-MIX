
var currentAudio;//hee hee
var prevAudio;//hee hee

var audioPlayer = {

		currentBttn:0,
		timeInc: 8.7,

		init: function(){

			//LOADER
			$loader = $('#loader');

			//Audio
			$audio1 = $('#audioOne');
			$audio2 = $('#audioTwo');
			$audio3 = $('#audioThree');
			$audio4 = $('#audioFour');

			//Bttns
			$bttn1 = $('#bttn1');
			$bttn2 = $('#bttn2');
			$bttn3 = $('#bttn3');
			$bttn4 = $('#bttn4');
			$bttnPlayPause = $('#bttnPlayPause');
			
			//Images
			$imgHold = $('#imageHold');
			$imgOne = $('.imgOne');
			$imgTwo = $('.imgTwo');
			$imgThree = $('.imgThree');
			$imgFour = $('.imgFour');

			//Arrays
			audioArr = [$audio1,$audio2,$audio3,$audio4];
			bttnArr = [$bttn1,$bttn2,$bttn3,$bttn4];
			imgArr = [$imgOne, $imgTwo, $imgThree, $imgFour];

			for (var i=0; i<imgArr.length; i++){//images opacity 0 except for object 0(first image)
				if(imgArr[i]!=imgArr[0]){
					imgArr[i].css('opacity', '0');
				}

			}

			$(window).load(function(){

				audioPlayer.preload(audioArr);//load audio
				$bttn1.click(audioPlayer.btnClicked);
				$bttn2.click(audioPlayer.btnClicked);
				$bttn3.click(audioPlayer.btnClicked);
				$bttn4.click(audioPlayer.btnClicked);

				$bttnPlayPause.click(function(){
					audioPlayer.playPause();
				});

			});//window load end
		},
		//PRELOAD AUDIO
		preload: function(array){
			var loadedSounds = 0;
			for (var i=0; i<array.length; i++) {
					loadedSounds++;
					//console.log("SOUNDS LOADED "+ loadedSounds);
					if(loadedSounds == array.length){
						$loader.remove();//remove loader
						audioPlayer.loopNormal();//loop audio
						//audioPlayer.getAudioTime();//get time of tracks
					}
			}
			//console.log("PRELOADER FIRED "+ loadedSounds);
		},
		//BUTTON CLICKED
		btnClicked: function(event){


			$bttnPlayPause.css('background-position', '-35px 0px');//play pause button
			btnVal = $(event.target).html() - 1;//evals text from each clicked element ( -1 because array start at 0). Plulls exact html from div
			currentAudio = audioArr[btnVal];//get the audio corresponding to the button
			prevAudio = (prevAudio) ? prevAudio : currentAudio;//if previous does not extist then prevAudio = currentAudio, else nothing

			for (var i=0; i<audioArr.length; i++) {//turns everything off
				bttnArr[i].css('opacity', '0.5');
				imgArr[i].css('opacity', '0');
				audioArr[i].prop('muted',true);//mute all tracks			
			}	

			bttnArr[btnVal].css('opacity', '1');
			imgArr[btnVal].css('opacity', '1');
			audioArr[btnVal].prop('muted',false);//current track unmuted 

			audioArr[btnVal][0].currentTime = prevAudio[0].currentTime;
			audioArr[btnVal][0].play();//play audio

			prevAudio = currentAudio;
			//console.log("Button "+(btnVal+1)+" ; Current time "+audioArr[btnVal][0].currentTime);
		},
		//PLAY ALL
		playAll: function(){
			for(var i = 0; i<audioArr.length;i++){
				audioArr[i][0].play();
				audioArr[i].controls = false;
				$bttnPlayPause.css('background-position', '-35px 0px');
			}
		},
		//PLAY-PAUSE FUNCTION
		playPause: function(){
			for(var i = 0; i<audioArr.length;i++){
				if(audioArr[i][0].paused){
					audioArr[i][0].play();
					$bttnPlayPause.css('background-position', '-35px 0px');
				}else{
					audioArr[i][0].pause();
					$bttnPlayPause.css('background-position', 0);
				}
			}	
		},
		//LOOP AUDIO
		loopFirefox: function(){
			for(var i = 0; i<audioArr.length;i++){
				audioArr[i].on("timeupdate", function(event){
					if(audioArr[0][0].currentTime >= 8.747166){//8.556553
						audioArr[0][0].currentTime = 0;
						audioArr[1][0].currentTime = 0;
						audioArr[2][0].currentTime = 0;
						audioArr[3][0].currentTime = 0;
					}
					//console.log("PLAYING "+ audioArr[0][0].currentTime);
				})
				//console.log(audioArr[i]);
				
			}
		},
		loopNormal: function(){
			for(var i = 0; i<audioArr.length;i++){
				audioArr[i].attr('loop','loop');
			}
		},
		//TIME DURATION
		getAudioTime: function(){
			for(var i = 0; i<audioArr.length;i++){
				/*audioArr[i].get(0).addEventListener('timeupdate', function(){
					var currentPos = audioArr[0][0].currentTime;
					var maxDuration = audioArr[0][0].duration;
					var percentage = 100 * currentPos/maxDuration;
					console.log("Audio Time "+percentage);
				})*/
				audioArr[i].on('timeupdate',function(){
					var currentPos = audioArr[i][0].currentTime;
					var maxDuration = audioArr[i][0].duration;
					var percentage = 100 * currentPos/maxDuration;
					console.log("Audio Time "+percentage);
				});
			}
		}

	
}
audioPlayer.init();/* Run Aniation */
