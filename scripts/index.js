let letsStartIntroBlock = document.querySelector('.letsStartIntroBlock');
let letsStartIntroButton = document.querySelector('.letsStartIntroButton');
let letsStartInputBlock = document.querySelector('.letsStartInputBlock');
let letsStartInputName = document.querySelector('.letsStartInputName');
let hr = document.querySelector('.hr');

anime({
    targets: '.letsStartIntroBlock',
    translateY: (window.innerHeight - letsStartIntroBlock.clientHeight) / 2,
    opacity: '1',
    easing: 'easeInOutQuad',
});

letsStartIntroButton.addEventListener('click', (target) => {
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
            targets: hr,
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
            targets: hr,
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