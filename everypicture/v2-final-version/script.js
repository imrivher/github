(function(){
    'use strict';
    console.log('reading js...');

    // setting up vars
    const allSticks = document.querySelectorAll('#position-box img');
    const allCloseBtns = document.querySelectorAll('.rating button');
    let prevId;

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

            // shows text
            document.querySelector(`.${stickNumber}text`).className = `textbox ${stickNumber}text`;

            // focuses img
            prevId = eachStick.id;
            eachStick.id += 'focus';
        });
    }

    // hides the text & unhides images when close button clicked
    for(const eachCloseBtn of allCloseBtns){
        eachCloseBtn.addEventListener('click', function(e){
            // vars
            const btnNumber = e.target.parentElement.parentElement;

            // hides text
            btnNumber.className += ' hidden';

            // shows all imgs
            for(const eachStick of allSticks){
                if(eachStick.className === 'hidden'){
                    eachStick.className = '';
                }else{
                    eachStick.id = prevId;
                }
            }
        });
    }
}());