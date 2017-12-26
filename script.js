
var data = {
    equationInputs: [],
    stringEquation: '',
}
var view = {
    //Assigning elements to variables and attaching click events
    init: function () {
        this.numberBtns = document.querySelectorAll('.calculator-btns');
        this.display = document.querySelector('.input-display');
        this.equalsBtn = document.querySelector('#equals');
        this.clearBtn = document.querySelector('#clear');
        this.clearBtn.addEventListener('click', function () {
            controller.clearDisplay();
        });
        for (var i = 0; i < this.numberBtns.length; i++) {
            this.numberBtns[i].addEventListener('click', function (e) {
                var clickedElem = e.target || e.srcElement;
                var clickedElemHTML = clickedElem.innerHTML;
                data.equationInputs.push(clickedElemHTML);
                controller.displayInputLimit();
                controller.checkForOperator(clickedElem, clickedElemHTML);
                controller.removeClickedOperatorElem(clickedElemHTML);
                controller.arrayToString();
                controller.checkRepeatOperator();
            })
        }
        this.equalsBtn.addEventListener('click', function () {
            controller.equalsBtn();
        });
    }
}

var controller = {
    //Starts app
    initCalculator: function () {
        view.init();
    },
    //Looks for repeated operators and remove the repeats
    checkRepeatOperator: function () {
        var input = data.equationInputs;
        for (var i = 0; i < input.length; i++) {
            if (input[i] === "+" && input[i + 1] === "+") {
                input.splice(i + 1, 1)
            } else if (input[i] === "-" && input[i + 1] === "-") {
                input.splice(i + 1, 1)
            } else if (input[i] === "*" && input[i + 1] === "*") {
                input.splice(i + 1, 1)
            }
        }
    },
    //Removes non operators from the input array and/or replaces them
    removeClickedOperatorElem: function (elem) {
        if (elem === "=") {
            data.equationInputs.pop();
        }
        if (elem === "x") {
            data.equationInputs.pop();
            data.equationInputs.push("*");
        }
        if (elem === "÷") {
            data.equationInputs.pop();
            data.equationInputs.push("/");
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
    displayInputLimit: function () {
        if(view.display.value.length > 3) {
            var length = view.display.value;
            var maxString = length.substring(0, 3);
           length = maxString;
        }
    },
    //Changes the input array to string
    arrayToString: function () {
        data.stringEquation = data.equationInputs.join("");
    },
    //Clears input value and the input array
    clearDisplay: function () {
        data.equationInputs = [];
        view.display.value = '';
        console.log(view.display.value)
    },
    //Display answer from equation
    equalsBtn: function () {
        view.display.value = eval(data.stringEquation);
        console.log(view.display.value);
    }
}
controller.initCalculator();
