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

let header = document.querySelector('header');
let menuBurgerBlock = document.querySelector('.menuBurgerBlock');
let burgerIcon = document.querySelector('.burgerIcon');
let renameBlock = document.querySelector('.renameBlock');
let renameImg = document.querySelector('.renameBlock img');
let renameDots = document.querySelector('.renameDots');
let deleteAllCompletedBlock = document.querySelector('.deleteAllCompletedBlock');
let deleteAllCompletedImg = document.querySelector('.deleteAllCompletedBlock img');
let deleteAllCompletedDots = document.querySelector('.deleteAllCompletedDots');
let main = document.querySelector('main');
let taskListParent = document.querySelector('.taskList');
let temporaryArray;
let temporaryObjIndex;


function generateTask(spanData, classParameters) {
    taskListParent.appendChild(document.createElement('div'));
    taskListParent.lastElementChild.classList.add('task', 'flex', 'w-full', 'mb-[22px]');
    taskListParent.lastElementChild.innerHTML = `
        <div class="flex justify-between items-center shrink-0 w-[68px] h-[25px] mr-[21px] select-none">
            <img class="basketIcon w-[22px] h-[23px] cursor-pointer" src="img/basket.svg" alt="basket">
            <div class="checkbox flex items-center justify-center w-[25px] h-[25px] border-2 border-[#1E9CEA] rounded-[5px] cursor-pointer transition-[background-color]${classParameters.checkboxBgColor}">
                <img class="pointer-events-none" src="img/checkMark.svg" alt="checkMark">
            </div>
        </div>
        <span class="${classParameters.spanClass}">${spanData}</span>
    `;
}

const getTaskList = () => JSON.parse(localStorage.getItem('taskList'));

const setTaskList = (setItemValue) => localStorage.setItem('taskList', JSON.stringify(setItemValue));

function centeringIntroBlock() {
    anime({
        targets: '.letsStartIntroBlock',
        translateY: (window.innerHeight - letsStartIntroBlock.clientHeight) / 2,
        opacity: '1',
        easing: 'easeInOutQuad',
    });
}

function centeringInputBlock() {
    anime({
        targets: '.letsStartInputBlock',
        translateY: (window.innerHeight - (letsStartInputBlock.clientHeight + 15 + 35)) / 2,
        opacity: '1',
        easing: 'easeInOutQuad',
    });
}

function displayInputBlock() {
    letsStartInputBlock.classList.remove('hidden');
    centeringInputBlock();
}


if (localStorage.length === 0 || localStorage.getItem('name') === null) {
    document.title = `TaskDo | ${(localStorage.length === 0) ? 'Lets Start' : 'Rename'}`;
    if (localStorage.length === 0) {
        letsStartInputName.value = '';
        letsStartIntroBlock.classList.remove('hidden');

        centeringIntroBlock();

        letsStartIntroButton.addEventListener('click', () => {

            //TODO • Replace with Promise (code below and similar).

            anime({
                targets: '.letsStartIntroBlock',
                translateY: window.innerHeight - letsStartIntroBlock.clientHeight,
                opacity: '0',
                easing: 'easeInOutQuad',
            });
            setTimeout(() => {
                letsStartIntroBlock.classList.add('hidden');
                displayInputBlock();
            }, 1000);
        })
    } else displayInputBlock();

    window.addEventListener('resize', () => !letsStartIntroBlock.classList.contains('hidden') ? centeringIntroBlock() : centeringInputBlock());

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
        if (localStorage.length === 0) setTaskList([]);
        localStorage.setItem('name', letsStartInputName.value);
        location.reload();
    })
} else {
    letsStartInputName.value = '';
    document.title = `TaskDo | ${localStorage.getItem('name')}`;
    document.querySelector('.hiName span').textContent = localStorage.getItem('name');

    header.classList.remove('hidden');
    main.classList.remove('hidden');

    //TODO • Implement animation of the appearance of elements (header, main and taskList).

    getTaskList().forEach((obj) => {
        generateTask(
            obj.data,
            (() => (obj.completed === true) ? (
                {
                    checkboxBgColor: ' bg-[#1E9CEA]',
                    spanClass: 'line-through'
                }
            ) : (
                {
                    checkboxBgColor: '',
                    spanClass: ''
                }
            )
            )()
        );
    })

    document.querySelector('.amountOfTasks').textContent = String(taskListParent.children.length);

    burgerIcon.addEventListener('click', () => {
        if (!menuBurgerBlock.classList.contains('burgerOpen')) {
            menuBurgerBlock.classList.add('burgerOpen');
            burgerIcon.setAttribute('src', 'img/menuIconX.svg');

            renameBlock.classList.remove('left-[-34px]', 'lg:opacity-0');
            renameBlock.classList.add('left-[-84px]');
            renameImg.classList.remove('lg:cursor-default');
            renameDots.classList.remove('w-0', 'mx-0');
            renameDots.classList.add('w-[24px]', 'mx-[13px]');

            deleteAllCompletedBlock.classList.remove('bottom-[-34px]', 'lg:opacity-0');
            deleteAllCompletedBlock.classList.add('bottom-[-84px]');
            deleteAllCompletedImg.classList.remove('lg:cursor-default');
            deleteAllCompletedDots.classList.remove('h-0', 'my-0');
            deleteAllCompletedDots.classList.add('h-[24px]', 'my-[13px]');
        } else {
            menuBurgerBlock.classList.remove('burgerOpen');
            burgerIcon.setAttribute('src', 'img/menuIconBurger.svg');

            renameBlock.classList.remove('left-[-84px]');
            renameBlock.classList.add('left-[-34px]', 'lg:opacity-0');
            renameImg.classList.add('lg:cursor-default');
            renameDots.classList.remove('w-[24px]', 'mx-[13px]');
            renameDots.classList.add('w-0', 'mx-0');

            deleteAllCompletedBlock.classList.remove('bottom-[-84px]');
            deleteAllCompletedBlock.classList.add('bottom-[-34px]', 'lg:opacity-0');
            deleteAllCompletedImg.classList.add('lg:cursor-default');
            deleteAllCompletedDots.classList.remove('h-[24px]', 'my-[13px]');
            deleteAllCompletedDots.classList.add('h-0', 'my-0');
        }
    })

    deleteAllCompletedImg.addEventListener('click', () => {
        if (!deleteAllCompletedImg.classList.contains('lg:cursor-default') || window.innerWidth < 1024) {
            if (getTaskList().some((obj) => obj.completed)) {
                setTaskList(getTaskList().filter((obj) => !obj.completed));
                location.reload();
            }
        }
    })

    renameImg.addEventListener('click', () => {
        if (!renameImg.classList.contains('lg:cursor-default') || window.innerWidth < 1024) {
            localStorage.removeItem('name');
            location.reload();
        }
    })

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
            autosize.destroy(taskValue);
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

    taskValue.addEventListener('input', () => autosize(taskValue));

    confirmButton.addEventListener('click', () => {

        bottomDots.classList.remove('h-[24px]', 'opacity-100', 'my-[13px]');
        bottomDots.classList.add('h-0', 'opacity-0');
        confirmButton.classList.remove('opacity-100');
        confirmButton.classList.add('opacity-0');
        confirmButton.disabled = true;
        generateTask(
            taskValue.value,
            {
                checkboxBgColor: '',
                spanClass: ''
            }
        );
        temporaryArray = getTaskList();
        temporaryArray.push(
            {
                data: taskValue.value,
                completed: false
            }
        );
        setTaskList(temporaryArray);
        temporaryArray = undefined;
        taskValue.value = '';
        autosize.destroy(taskValue);
        document.querySelector('.amountOfTasks').textContent = String(taskListParent.children.length);
    })

    document.querySelector('.taskList').addEventListener('click', (event) => {
        temporaryArray = getTaskList();
        temporaryObjIndex = [...taskListParent.children].indexOf(event.target.closest('.task'));

        if (event.target.classList.contains('basketIcon')) { //? remove task
            temporaryArray.splice(temporaryObjIndex, 1);
            setTaskList(temporaryArray);
            event.target.closest('.task').remove();
            document.querySelector('.amountOfTasks').textContent = String(taskListParent.children.length);
        }
        if (event.target.classList.contains('checkbox')) { //? completed task
            if (temporaryArray[temporaryObjIndex].completed === false) {
                temporaryArray[temporaryObjIndex].completed = true;
                event.target.parentNode.nextElementSibling.classList.add('line-through');
                event.target.classList.add('bg-[#1E9CEA]');
            } else {
                temporaryArray[temporaryObjIndex].completed = false;
                event.target.parentNode.nextElementSibling.classList.remove('line-through');
                event.target.classList.remove('bg-[#1E9CEA]');
            }
            setTaskList(temporaryArray);
        }
        temporaryArray = undefined;
        temporaryObjIndex = undefined;
    })
}


//TODO • Implement two functions that will take 1 value(topDots/bottomDots). This significantly code the animation of the dots by half.

//TODO • Do not give out or remove opacity-100 classes.

//TODO • Allocate parts of the code to files.