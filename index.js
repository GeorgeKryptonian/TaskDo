let letsStartIntroBlock = document.querySelector('.letsStartIntroBlock');
let letsStartIntroButton = document.querySelector('.letsStartIntroButton');

let letsStartInputBlock = document.querySelector('.letsStartInputBlock');
let letsStartInputName = document.querySelector('.letsStartInputName');
let letsStartInputButton = document.querySelector('.letsStartInputButton');


let newTaskButton = document.querySelector('.newTaskButton');
let confirmButton = document.querySelector('.confirmButton');
let plusIcon = document.querySelector('.newTaskButton .plusCircle img')
let taskButtonText = document.querySelector('.newTaskButton span')
let topDots = document.querySelector('.topDots');
let bottomDots = document.querySelector('.bottomDots');
let taskValue = document.querySelector('.taskValue');
let newTaskButtonCondition = true;
let confirmButtonCondition = true;

function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
}

if (localStorage.length === 0) {
    document.title = 'TaskDo | Lets Start';
    letsStartInputName.value = '';
    letsStartIntroBlock.classList.remove('hidden');

    anime({
        targets: '.letsStartIntroBlock',
        translateY: (window.innerHeight - letsStartIntroBlock.clientHeight) / 2,
        opacity: '1',
        easing: 'easeInOutQuad',
    });

    letsStartIntroButton.addEventListener('click', () => {

        //TODO • Replace with Promise (code below).

        anime({
            targets: '.letsStartIntroBlock',
            translateY: window.innerHeight - letsStartIntroBlock.clientHeight,
            opacity: '0',
            easing: 'easeInOutQuad',
        });
        setTimeout(() => {
            letsStartIntroBlock.classList.add('hidden');
            letsStartInputBlock.classList.remove('hidden');
            anime({
                targets: '.letsStartInputBlock',
                translateY: (window.innerHeight - (letsStartInputBlock.clientHeight + 15 + 35)) / 2,
                opacity: '1',
                easing: 'easeInOutQuad',
            });
        }, 1000);
    })

    letsStartInputName.addEventListener('input', (event) => {
        if (event.target.value.length >= event.target.minLength && !event.target.value.slice(0, 2).includes(' ')) {
            anime({
                targets: letsStartInputButton,
                keyframes: [
                    {opacity: 1, width: '50%', marginTop: '15px'},
                    {fontSize: '16px', height: '35px'}
                ],
                duration: 1500,
                easing: 'easeOutElastic',
            })
            letsStartInputName.classList.remove('outline-gray-300', 'text-gray-300');
            letsStartInputName.classList.add('outline-green-500', 'text-green-500');
        } else {
            anime({
                targets: letsStartInputButton,
                height: '3px',
                fontSize: 0,
                marginTop: '3px',
                width: 0,
                opacity: 0,
                duration: 1500,
                easing: 'easeOutElastic',
            })
            letsStartInputName.classList.remove('outline-green-500', 'text-green-500');
            letsStartInputName.classList.add('outline-gray-300', 'text-gray-300');
        }
    })

    letsStartInputButton.addEventListener('click', () => {
        localStorage.setItem('name', letsStartInputName.value);
        //! ()
    })
} else {
    document.title = `TaskDo | ${localStorage.getItem('name')}`;
    document.querySelector('.hiName span').textContent = localStorage.getItem('name');

    newTaskButton.addEventListener('click', () => {
        if (newTaskButtonCondition) {
            plusIcon.style.rotate = '45deg';
            taskButtonText.textContent = 'Cancel';
            topDots.style.height = '40px';
            topDots.style.opacity = '1';
            taskValue.style.opacity = '1';
            taskValue.disabled = false;
            taskValue.value = '';
            newTaskButtonCondition = false;
        } else {
            plusIcon.style.rotate = '0deg';
            taskButtonText.textContent = 'Add New Task';
            topDots.style.height = '0px';
            topDots.style.opacity = '0';
            taskValue.style.opacity = '0';
            taskValue.disabled = true;
            bottomDots.style.height = '0px';
            bottomDots.style.opacity = '0';
            confirmButton.style.opacity = '0';
            confirmButton.disabled = true;
            newTaskButtonCondition = true;
        }
    })

    taskValue.addEventListener('input', (event) => {
        if (event.target.value[0] !== ' ' && event.target.value[0] !== '\n' && event.target.value.length !== 0) {
            bottomDots.style.height = '40px';
            bottomDots.style.opacity = '1';
            confirmButton.style.opacity = '1';
            confirmButton.disabled = false;
        } else {
            bottomDots.style.height = '0px';
            bottomDots.style.opacity = '0';
            confirmButton.style.opacity = '0';
            confirmButton.disabled = true;
        }
    })

    // confirmButton.addEventListener('click', () => {
    //
    // })

    //! ()
}

//! () Animation of the appearance of the main content