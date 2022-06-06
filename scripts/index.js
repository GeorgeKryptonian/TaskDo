let letsStartIntroBlock = document.querySelector('.letsStartIntroBlock');
let letsStartIntroButton = document.querySelector('.letsStartIntroButton');

let letsStartInputBlock = document.querySelector('.letsStartInputBlock');
let letsStartInputName = document.querySelector('.letsStartInputName');
let letsStartInputButton = document.querySelector('.letsStartInputButton');


let newTaskButton = document.querySelector('.newTaskButton');
let confirmButton = document.querySelector('.confirmButton');
let plusIcon = document.querySelector('.newTaskButton .plusCircle img');
let taskButtonText = document.querySelector('.newTaskButton span');
let topDots = document.querySelector('.topDots');
let bottomDots = document.querySelector('.bottomDots');
let taskValue = document.querySelector('.taskValue');
let newTaskButtonCondition = true;

let taskListParent = document.querySelector('.taskList');
let temporaryArray;


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
        localStorage.setItem('taskList', '[]');

        //TODO • Consider using "location.reload();".
    })
} else {
    document.title = `TaskDo | ${localStorage.getItem('name')}`;
    document.querySelector('.hiName span').textContent = localStorage.getItem('name');

    //TODO • Implement animation of the appearance of elements (header, main).

    newTaskButton.addEventListener('click', () => {
        if (newTaskButtonCondition) {
            plusIcon.classList.remove('rotate-0');
            plusIcon.classList.add('rotate-45');
            taskButtonText.textContent = 'Cancel';
            topDots.classList.remove('h-0', 'opacity-0');
            topDots.classList.add('h-[24px]', 'opacity-100', 'my-[13px]');
            taskValue.classList.remove('opacity-0');
            taskValue.classList.add('opacity-100');
            taskValue.disabled = false;
            taskValue.value = '';
            newTaskButtonCondition = false;
        } else {
            plusIcon.classList.remove('rotate-45');
            plusIcon.classList.add('rotate-0');
            taskButtonText.textContent = 'Add New Task';
            topDots.classList.remove('h-[24px]', 'opacity-100', 'my-[13px]');
            topDots.classList.add('h-0', 'opacity-0');
            taskValue.classList.remove('opacity-100');
            taskValue.classList.add('opacity-0');
            taskValue.disabled = true;
            bottomDots.classList.remove('h-[24px]', 'opacity-100', 'my-[13px]');
            bottomDots.classList.add('h-0', 'opacity-0');
            confirmButton.classList.remove('opacity-100');
            confirmButton.classList.add('opacity-0');
            confirmButton.disabled = true;
            newTaskButtonCondition = true;
        }
    })

    taskValue.addEventListener('input', (event) => {
        if (event.target.value[0] !== ' ' && event.target.value[0] !== '\n' && event.target.value.length !== 0) {
            bottomDots.classList.remove('h-0', 'opacity-0');
            bottomDots.classList.add('h-[24px]', 'opacity-100', 'my-[13px]');
            confirmButton.classList.remove('opacity-0');
            confirmButton.classList.add('opacity-100');
            confirmButton.disabled = false;
        } else {
            bottomDots.classList.remove('h-[24px]', 'opacity-100', 'my-[13px]');
            bottomDots.classList.add('h-0', 'opacity-0');
            confirmButton.classList.remove('opacity-100');
            confirmButton.classList.add('opacity-0');
            confirmButton.disabled = true;
        }
    })

    confirmButton.addEventListener('click', () => {
        bottomDots.classList.remove('h-[24px]', 'opacity-100', 'my-[13px]');
        bottomDots.classList.add('h-0', 'opacity-0');
        confirmButton.classList.remove('opacity-100');
        confirmButton.classList.add('opacity-0');
        confirmButton.disabled = true;

        taskListParent.appendChild(document.createElement('div'));
        taskListParent.lastElementChild.classList.add('task', 'flex', 'w-full', 'mb-[22px]');
        taskListParent.lastElementChild.innerHTML = `
            <div class="flex justify-between items-center max-w-[68px] w-full h-[25px] mr-[21px]">
                <img class="basketIcon w-[22px] h-[23px] cursor-pointer" src="img/basket.svg" alt="basket">
                <div class="checkbox w-[25px] h-[25px] border-2 border-[#1E9CEA] rounded-[5px] cursor-pointer"></div>
            </div>
            <span class="">${taskValue.value}</span>
        `;
        temporaryArray = JSON.parse(localStorage.getItem('taskList'));
        temporaryArray.push(
            {
                data: taskValue.value,
                completed: false
            }
        );
        localStorage.setItem('taskList', JSON.stringify(temporaryArray));
        temporaryArray = undefined;
        taskValue.value = '';
        document.querySelector('.amountOfTasks').textContent = String(taskListParent.children.length);
    })

    document.querySelector('.taskList').addEventListener('click', (event) => {
        if (event.target.classList.contains('basketIcon')) {
            temporaryArray = JSON.parse(localStorage.getItem('taskList'));
            temporaryArray.splice([...taskListParent.children].indexOf(event.target.parentNode.parentNode), 1);
            localStorage.setItem('taskList', JSON.stringify(temporaryArray));
            temporaryArray = undefined;
            event.target.parentNode.parentNode.remove();
        }
        if (event.target.classList.contains('checkbox')) {
            //TODO • Implement (crossing out and changing the icon) of the completed task. To do with "basketIcon" as an example.
        }
    })

}
