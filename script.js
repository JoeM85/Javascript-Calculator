var model = {
    equationInputs: [],
    stringEquation: '',
}

var view = {
    //Assigning elements to variables and attaching click events
    init: function () {
        this.numberBtns = document.querySelectorAll('.calculator-btns');
        this.display = document.querySelector('.input-display');
        this.display.addEventListener('input', controller.displayInputLimit)
        this.equalsBtn = document.querySelector('#equals');
        this.clearBtn = document.querySelector('#clear');
        this.clearBtn.addEventListener('click', function () {
            controller.clearDisplay();
        });
        for (var i = 0; i < this.numberBtns.length; i++) {
            this.numberBtns[i].addEventListener('click', function (e) {
                var clickedElem = e.target || e.srcElement;
                var clickedElemHTML = clickedElem.innerHTML;
                model.equationInputs.push(clickedElemHTML);
                controller.displayInputLimit();
                controller.checkForOperator(clickedElem, clickedElemHTML);
                controller.removeClickedOperatorElem(clickedElemHTML);
                controller.arrayToString();
                controller.checkRepeatOperator();
                controller.displayInputLimit();
            })
        }
        this.equalsBtn.addEventListener('click', function () {
            controller.equalsBtn();
        });
    }
}

var controller = {
    //Initializing functionality to the app
    initCalculator: function () {
        view.init();
    },
    //Looks for repeated operators and remove the repeats
    checkRepeatOperator: function () {
        var inputs = model.equationInputs;
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i] === '+' && inputs[i + 1] === '+' ||
                inputs[i] === '-' && inputs[i + 1] === '-' ||
                inputs[i] === '*' && inputs[i + 1] === '*') {
                inputs.splice(i + 1, 1)
            }
        }
    },
    //Removes non operators from the input array and/or replaces them
    removeClickedOperatorElem: function (elem) {
        if (elem === '=') {
            model.equationInputs.pop();
        }
        if (elem === 'x') {
            model.equationInputs.pop();
            model.equationInputs.push('*');
        }
        if (elem === '÷') {
            model.equationInputs.pop();
            model.equationInputs.push('/');
        }
    },
    //Checks for operators and hides them from the display
    checkForOperator: function (elem, elemHtml) {
        if (!elem.classList.contains('operator')) {
            view.display.value += elemHtml;
        } else if (elem.classList.contains('operator')) {
            view.display.value = '';
        }
    },
    //Limits the max displayed numbers to 12
    displayInputLimit: function () {
        if (view.display.value.length > 12) {
            view.display.value = view.display.value.slice(0, 12);
        }
    },
    //Changes the input array to string
    arrayToString: function () {
        model.stringEquation = model.equationInputs.join('');
    },
    //Clears input value and the input array
    clearDisplay: function () {
        model.equationInputs = [];
        view.display.value = '';
    },
    //Display answer from equation
    equalsBtn: function () {
        if (view.display.value === '=') {
            this.clearDisplay();
        } else {
            view.display.value = eval(model.stringEquation);
        }
    }
}
controller.initCalculator();
