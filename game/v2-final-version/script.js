(function(){
    'use strict';
    console.log('reading js...');

    // setting vars
        // general vars
    const cl = console.log;

        // document content
    const players = document.querySelectorAll('#players h1');
    const counter1Imgs = document.querySelectorAll('#counter1 img');
    const counter2Imgs = document.querySelectorAll('#counter2 img');
    const numberLights = document.querySelectorAll('#numberlights p');
    const hoursLight = document.querySelector('#hourslight');
    const minutesLight = document.querySelector('#minuteslight');
    

        // buttons
    const btns = document.querySelectorAll('#controls button');

        // functionality vars
    const playerData = {
        activePlayer: 1,
        scores: {
            p1: {
                hour: 0,
                minute: 0
            },
            p2: {
                hour: 0,
                minute: 0
            }
        }
    };
    let isSpinning = false;
    let spinLoops = 0;
    let activeScore;

    //random number generator
    function randomInt(min, max){
        return Math.floor((max - min + 1) * Math.random()) + min;
    }

    // detecting button presses
    for(const eachBtn of btns){
        eachBtn.addEventListener('click', function(){
            if(eachBtn.id === 'spin'){
                isSpinning = true;
                spin();
            }else if(eachBtn.id === 'stop' || isSpinning === true){
                isSpinning = false

                setTimeout(function(){
                    const numberLight = document.querySelector('.numberlit').innerHTML;
                    const amountLight = document.querySelector('.amountlit');

                    updateScore(numberLight, amountLight);
                }, 150);
            }
        });
    }

    // spinning the spinner
    function spin(){
        if(isSpinning===true){
            setTimeout(function(){
                if(spinLoops > 0){document.querySelector('.numberlit').removeAttribute('class');}
                if(spinLoops > 0){document.querySelector('.amountlit').removeAttribute('class');}

                const litNumber = randomInt(0,5);
                numberLights[litNumber].className = 'numberlit';

                const litAmount = randomInt(1,2);
                if(litAmount === 1){
                    document.querySelector('#minuteslight').className = 'amountlit';
                }else{
                    document.querySelector('#hourslight').className = 'amountlit';
                }
                spinLoops++;
                spin();
            }, 100);
        }
    }

    // updating the score yay
    function updateScore(numberLight, amountLight){
        // checks active player
        if(playerData.activePlayer === 1){
            activeScore = playerData.scores.p1;
        }else{
            activeScore = playerData.scores.p2;
        }

        cl(activeScore);

        // updates the score & checks win condition
        if(amountLight === hoursLight && activeScore.hour + +numberLight > 23){
            cl(activeScore);
            endGame();
        }else if(amountLight === minutesLight && activeScore.minute + +numberLight > 60){
            activeScore.hour++;
            activeScore.minute += +numberLight;
            activeScore.minute -= 60;

            cl(activeScore);
        }else if(amountLight === hoursLight){
            activeScore.hour += +numberLight;

            cl(activeScore);
        }else if(amountLight === minutesLight){
            activeScore.minute += +numberLight;

            cl(activeScore);
        }

        // updates counter
        document.querySelector(`#counter${playerData.activePlayer}`).innerHTML = `
            <img src="images/${activeScore.hour[0]}.png" alt="the tens hours spot on a digital clock" width="125" height="250">
            <img src="images/${activeScore.hour[1]}.png" alt="the ones hours spot on a digital clock" width="125" height="250">
            <img src="images/colon-white.png" alt="the colon seperator on a digital clock" width="125" height="250">
            <img src="images/${activeScore.minute[0]}.png" alt="the tens minutes spot on a digital clock" width="125" height="250">
            <img src="images/${activeScore.minute[1]}.png" alt="the ones minutes spot on a digital clock" width="125" height="250">
        `;

        // switches players
        if(playerData.activePlayer === 1){
            playerData.activePlayer = 2;
        }else{
            playerData.activePlayer = 1;
        }
    }

    // end of game events
    function endGame(){
        // hides controls
        for(const eachBtn of btns){
            eachBtn.className = 'hidden';
        }

        document.querySelector('#again').removeAttribute('class');
    }

}());