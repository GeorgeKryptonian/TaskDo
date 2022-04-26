let letsStartIntroBlock = document.querySelector('.letsStartIntroBlock');
let letsStartIntroButton = document.querySelector('.letsStartIntroButton');
let letsStartInputBlock = document.querySelector('.letsStartInputBlock');
let letsStartInputName = document.querySelector('.letsStartInputName');
let hr = document.querySelector('hr');

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
            translateY: (window.innerHeight - letsStartInputBlock.clientHeight) / 2,
            opacity: '1',
            easing: 'easeInOutQuad',
        });
    }, 1000);
})

letsStartInputName.addEventListener('input', (event) => {
    if (event.target.value.length >= event.target.minLength && !event.target.value.slice(0, 2).includes(' ')) {
        anime({
            targets: hr,
            borderColor: '#78B159',
            width: '100%',
            easing: 'easeInOutQuad',
        })
    } else {
        anime({
            targets: hr,
            borderColor: '#FFFFFF',
            width: 0,
            easing: 'easeInOutQuad',
        })
    }
})

