(function(){
    'use strict';
    console.log('reading js...');

    // setting up vars
    const allSticks = document.querySelectorAll('#position-box img');
    const allCloseBtns = document.querySelectorAll('.rating button');
    let prevId;
    let secondsSinceClick = 0;
    let isStickFocused = false;
    let overlayStatus = false;
    const myFooter = document.querySelector('footer');

    // show the text when clicking an image, hides the other images & focuses the image
    for(const eachStick of allSticks){
        eachStick.addEventListener('click', function(e){
            // vars
            const stickNumber = e.target.id;

            // hides other imgs
            for(const aStick of allSticks){
                if(aStick.id != stickNumber){
                    aStick.className = 'hidden'
                }
            }

            // focuses img
            prevId = eachStick.id;
            eachStick.id += 'focus';

            setTimeout(function(){
                // shows text
                document.querySelector(`.${stickNumber}text`).className = `textbox ${stickNumber}text`;
            }, 250);


            secondsSinceClick = 0;
            isStickFocused = true;
            overlayStatus = false;
            myFooter.className = 'hidden';
        });
    }

    // hides the text & unhides images when close button clicked
    for(const eachCloseBtn of allCloseBtns){
        eachCloseBtn.addEventListener('click', function(e){
            // vars
            const btnNumber = e.target.parentElement.parentElement;

            // hides text
            btnNumber.className += ' hidden';

            for(const eachStick of allSticks){
                if(eachStick.className != 'hidden'){
                        eachStick.id = prevId;
                    }
            }

            setTimeout(function(){
                // shows all imgs
                for(const eachStick of allSticks){
                    if(eachStick.className === 'hidden'){
                        eachStick.className = '';
                    }
                }
            }, 250);

            isStickFocused = false;
            secondsCount();
        });
    }

    // afk detection
    function secondsCount(){
        if(overlayStatus === true){
            myFooter.className = '';

            // setTimeout(secondsCount(), 1000);
        }
        else if(isStickFocused === false){
            setTimeout(
                function(){
                    secondsSinceClick++;

                    if(secondsSinceClick >= 60 && isStickFocused === false){
                        overlayStatus = true;
                        console.log('hit')
                    }

                    secondsCount();

                    console.log(secondsSinceClick)
                }, 1000
            );
        }
    }
    secondsCount();

    console.log(secondsSinceClick, isStickFocused, overlayStatus)
}());