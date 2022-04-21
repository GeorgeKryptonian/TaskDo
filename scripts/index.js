let letsStartBlock = document.querySelector('.letsStartBlock');
let letsStartButton = document.querySelector('.letsStartButton');

anime({
    targets: '.letsStartBlock',
    translateY: (window.innerHeight - letsStartBlock.clientHeight) / 2,
    opacity: '1',
    easing: 'easeInOutQuad',
});

letsStartButton.addEventListener('click', () => {
    anime({
        targets: '.letsStartBlock',
        translateY: window.innerHeight - letsStartBlock.clientHeight,
        opacity: '0',
        easing: 'easeInOutQuad',
    });
    setTimeout(() => letsStartBlock.classList.add('hidden'), 1000)
    // setTimeout(() => {
    //     if (letsStartBlock.style.transform.includes(String(window.innerHeight - letsStartBlock.clientHeight))) {
    //         console.log('test')
    //         letsStartBlock.classList.add('hidden');
    //     }
    // }, 3000)
})
// anime({
//     targets: '.letsStartBlock',
//     translateY: (window.innerHeight - document.querySelector('.letsStartBlock').clientHeight),
//     easing: 'easeInOutQuad',
// });

//TODO 1. Add button animation
//TODO 2. Make an input field appear for a name