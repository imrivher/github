(function(){
    'use strict';
    console.log('reading js...');

    const input = document.querySelector('#input');
    const output = document.querySelector('#output');
    const myForm = document.querySelector('form');
    const inputs = document.querySelectorAll('form div');
    let currentInput = 0;
    const userInputs = [];
    const formData = document.querySelectorAll('input[type=text]');
    const madlib = document.querySelector('#output article p');
    let anCheck1;
    let anCheck2;


    myForm.addEventListener('submit', function(e){
        e.preventDefault();

        if(formData[currentInput].value == '' || formData[currentInput].value == NaN){
            alert('please fill out the form!')
            formData[currentInput].focus();
        }else if(currentInput==inputs.length-1){
            input.className = 'hidden';
            output.className = ''
            processFormData(formData);
        }else{
            inputs[currentInput].className = 'hidden';
            inputs[currentInput+1].className = '';
            formData[currentInput+1].focus();

            currentInput++;
        }
    });

    document.querySelector('#back').addEventListener('click', function(){
        if(currentInput==0){
            alert('this is the first input')
            formData[currentInput].focus();
            console.log('1')
        }else{
            inputs[currentInput].className = 'hidden';
            inputs[currentInput-1].className = '';
            formData[currentInput-1].focus();

            currentInput--;
            console.log('2')
        }
    });

    function processFormData(formData){
        for(let eachInput of formData){
            if(eachInput.value){
                userInputs.push(eachInput.value);
                eachInput.value = '';
            } else {
                emptyfields.push(counter);
            }
        }

        const charCheck1 = userInputs[0][0];
        const charCheck2 = userInputs[2][0];

        if(charCheck1 === 'A' || charCheck1 === 'E' || charCheck1 === 'I' || charCheck1 === 'O' || charCheck1 === 'U' || charCheck1 === 'a' || charCheck1 === 'e' || charCheck1 === 'i' || charCheck1 === 'o' || charCheck1 === 'u'){
            anCheck1 = 'An';
        }else{
            anCheck1 = 'A';
        }

        if(charCheck2 === 'A' || charCheck2 === 'E' || charCheck2 === 'I' || charCheck2 === 'O' || charCheck2 === 'U' || charCheck2 === 'a' || charCheck2 === 'e' || charCheck2 === 'i' || charCheck2 === 'o' || charCheck2 === 'u'){
            anCheck2 = 'an';
        }else{
            anCheck2 = 'a';
        }

        makeMadlib(userInputs);
    }

    function makeMadlib(userInputs){
        const myText = `Breaking news! ${anCheck1} <strong>${userInputs[0]}</strong> has escaped from the <strong>${userInputs[1]}</strong> Center and is currently loose on UC Davis campus! This morning, ${anCheck2} <strong>${userInputs[2]}</strong> fell onto one of the enclosure’s fences, aiding in the escape. The first report was from <strong>${userInputs[3]}</strong> who stated “There’s some sort of <strong>${userInputs[4]}</strong> beast roaming around <strong>${userInputs[5]}</strong>! Somebody do something before it <strong>${userInputs[6]}</strong>s!” <strong>${userInputs[7]}</strong>s on the scene have been unable to corral the ${userInputs[0]}, as each time they approach, it  <strong>${userInputs[0]}</strong>s <strong>${userInputs[9]}</strong>. Students are advised to <strong>${userInputs[10]}</strong> at <strong>${userInputs[11]}</strong> until the <strong>${userInputs[0]}</strong> can be <strong>${userInputs[12]}</strong>. If you cannot make your way there, then evacuate to <strong>${userInputs[13]}</strong>.`
        madlib.innerHTML = myText;
    }

    document.querySelector('#againbutton').addEventListener('submit', function(){
        input.className = '';
        output.className = 'hidden'
    });
}());