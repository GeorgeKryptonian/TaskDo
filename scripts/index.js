let letsStartIntroBlock = document.querySelector('.letsStartIntroBlock');
let letsStartIntroButton = document.querySelector('.letsStartIntroButton');
let letsStartNameBlock = document.querySelector('.letsStartNameBlock');

anime({
    targets: '.letsStartIntroBlock',
    translateY: (window.innerHeight - letsStartIntroBlock.clientHeight) / 2,
    opacity: '1',
    easing: 'easeInOutQuad',
});

letsStartIntroButton.addEventListener('click', () => {
    anime({
        targets: '.letsStartIntroBlock',
        translateY: window.innerHeight - letsStartIntroBlock.clientHeight,
        opacity: '0',
        easing: 'easeInOutQuad',
    });
    setTimeout(() => {
        letsStartIntroBlock.classList.add('hidden');
        letsStartNameBlock.classList.remove('hidden');
        anime({
            targets: '.letsStartNameBlock',
            translateY: (window.innerHeight - letsStartNameBlock.clientHeight) / 2,
            opacity: '1',
            easing: 'easeInOutQuad',
        });
    }, 1000);
})
