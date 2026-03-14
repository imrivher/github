(function(){
    'use strict';
    console.log('reading js...');

    // setting vars
        // general vars
    const cl = console.log;

        // document content
    const myBody = document.querySelector('body');
    const numberLights = document.querySelectorAll('#numberlights p');
    const hoursLight = document.querySelector('#hourslight');
    const minutesLight = document.querySelector('#minuteslight');
    const gameText = document.querySelector('#gametext p');
    const spinBtn = document.querySelector('#spin');
    const stopBtn = document.querySelector('#stop');
    

        // buttons
    const btns = document.querySelectorAll('#controls button');

        // functionality vars
    const playerData = {
        activePlayer: 1,
        inactivePlayer: 2,
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
    let gameWon = false;

    //random number generator
    function randomInt(min, max){
        return Math.floor((max - min + 1) * Math.random()) + min;
    }

    // hides the start screen
    document.querySelector('#startscreen button').addEventListener('click', function(){
        myBody.removeChild(myBody.children[0]);
    });

    // detecting button presses
    for(const eachBtn of btns){
        eachBtn.addEventListener('click', function(){
            if(eachBtn.id === 'spin'){
                spinBtn.className = 'hidden';
                setTimeout(function(){stopBtn.removeAttribute('class');}, 100);
                isSpinning = true;
                spin();
            }else if(eachBtn.id === 'stop' || isSpinning === true){
                stopBtn.className = 'hidden';
                setTimeout(function(){spinBtn.removeAttribute('class');}, 100);
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

        // updates the score & checks win condition
        if(amountLight === hoursLight && activeScore.hour + +numberLight > 23){
            activeScore.hour = 24;
            activeScore.minute = 0;
            endGame();
        }else if(amountLight === minutesLight && activeScore.minute + +numberLight > 60){
            activeScore.hour++;
            activeScore.minute += +numberLight;
            activeScore.minute -= 60;
        }else if(amountLight === hoursLight){
            activeScore.hour += +numberLight;
        }else if(amountLight === minutesLight){
            activeScore.minute += +numberLight;
        }

        // splits numbers for easier use
        const hourDigits = [];
        const minuteDigits = [];

        const hoursSplit = activeScore.hour.toString().split('');
        const minutesSplit = activeScore.minute.toString().split('');

        if(activeScore.hour<10){
            hourDigits.push('0')
            hourDigits.push(hoursSplit[0]);
        }else{
            hourDigits.push(hoursSplit[0], hoursSplit[1]);
        }
        if(activeScore.minute<10){
            minuteDigits.push('0')
            minuteDigits.push(minutesSplit[0]);
        }else{
            minuteDigits.push(minutesSplit[0], minutesSplit[1]);
        }

        // updates counter
        if(gameWon === true){
            gameText.innerHTML = `player ${playerData.activePlayer} won!! yay!!! good try ${playerData.inactivePlayer}`;
        }else if(amountLight === hoursLight){
            if(numberLight === '1'){gameText.innerHTML = `you got ${numberLight} hour! switching to player ${playerData.inactivePlayer}`;}
            else{gameText.innerHTML = `you got ${numberLight} hours! switching to player ${playerData.inactivePlayer}`;}
        }else if(amountLight === minutesLight){
            if(numberLight === '1'){gameText.innerHTML = `you got ${numberLight} minute! switching to player ${playerData.inactivePlayer}`;}
            else{gameText.innerHTML = `you got ${numberLight} minutes! switching to player ${playerData.inactivePlayer}`;}
        }

        document.querySelector(`#counter${playerData.activePlayer}`).innerHTML = `
            <img src="images/${hourDigits[0]}.png" alt="the tens hours spot on a digital clock" width="125" height="250"></img>
            <img src="images/${hourDigits[1]}.png" alt="the ones hours spot on a digital clock" width="125" height="250">
            <img src="images/colon-white.png" alt="the colon seperator on a digital clock" width="125" height="250">
            <img src="images/${minuteDigits[0]}.png" alt="the tens minutes spot on a digital clock" width="125" height="250">
            <img src="images/${minuteDigits[1]}.png" alt="the ones minutes spot on a digital clock" width="125" height="250">
        `;

        // switches players
        if(playerData.activePlayer === 1){
            playerData.activePlayer = 2;
            playerData.inactivePlayer = 1;
        }else{
            playerData.activePlayer = 1;
            playerData.inactivePlayer = 2;
        }
    }

    // end of game events
    function endGame(){
        // updates counter
        document.querySelector(`#counter${playerData.activePlayer}`).innerHTML = `
            <img src="images/2.png" alt="the tens hours spot on a digital clock" width="125" height="250"></img>
            <img src="images/4.png" alt="the ones hours spot on a digital clock" width="125" height="250">
            <img src="images/colon-white.png" alt="the colon seperator on a digital clock" width="125" height="250">
            <img src="images/0.png" alt="the tens minutes spot on a digital clock" width="125" height="250">
            <img src="images/0.png" alt="the ones minutes spot on a digital clock" width="125" height="250">
        `;

        // hides controls
        for(const eachBtn of btns){
            eachBtn.className = 'hidden';
        }

        setTimeout(function(){document.querySelector('#again').removeAttribute('class');}, 100);
    }

}());