// model
var model = {
  randomColors: [],
  correctColor: "",
  numOfQuestions: 0,
  rightQuestions: 0,
  trials: 5,
  mode: "easy",
};
// controller
var controller = {
  init: function () {
    this.generateRandomColors();
    this.setCorrectColor();
    headerView.init();
    answerView.init();
    conrolsView.init();
  },
  generateRandomColors: function () {
    let randomColors = [];
    for (let i = 0; i <= 6; i++) {
      let color = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(
        Math.random() * 255
      )},${Math.floor(Math.random() * 255)})`;
      randomColors.push(color);
    }
    model.randomColors = randomColors;
  },
  setCorrectColor: function () {
    model.correctColor = model.randomColors[Math.floor(Math.random() * 6)];
  },
  getRandomColors: function () {
    return model.randomColors;
  },
  getCorrectColor: function () {
    return model.correctColor;
  },
  generateNewClrQuestion: function () {
    this.generateRandomColors();
    this.setCorrectColor();
    headerView.init();
    answerView.init();
  },
  setNumOfQuestions: function (num) {
    model.numOfQuestions = num;
  },
  increaseNumOfQuestions: function () {
    model.numOfQuestions += 1;
  },
  getNumOfQuestions: function () {
    return model.numOfQuestions;
  },
  getTrials: function () {
    return model.trials;
  },
  setTrials: function (num) {
    model.trials = num;
  },
  resetTrial: function () {
    if (model.mode === "easy") {
      model.trials = 5;
    } else {
      model.trials = 3;
    }
  },
  getRightQuestions: function () {
    return model.rightQuestions;
  },
  setRightQuestions: function (num) {
    model.rightQuestions = num;
  },
  increaseRightQuestions: function () {
    model.rightQuestions += 1;
  },

  getMode: function () {
    return model.mode;
  },
  setMode: function (type) {
    model.mode = type;
  },
};
// view
var headerView = {
  init: function () {
    this.questionClrText = document.querySelector(".question-clr");
    this.render();
  },
  render: function () {
    this.questionClrText.textContent = controller.getCorrectColor();
  },
};

var answerView = {
  init: function () {
    this.answersSquares = document.querySelectorAll(".answer");
    this.attachListeners();
    this.render();
  },
  handleClick: function (e) {
    e.preventDefault();
    e.stopPropagation();
    // hide alert messages
    document.querySelector(".alert-success").style.display = "none";
    document.querySelector(".alert-fail").style.display = "none";

    // debugger;
    // remove one try and render it
    controller.setTrials(controller.getTrials() - 1);
    conrolsView.render();

    let answer = e.target.style.background.replace(/\s/g, "");
    console.log(answer);

    if (controller.getTrials() > 0) {
      // check right answer
      if (answer === controller.getCorrectColor()) {
        console.log(true);
        // show success msg
        document.querySelector(".alert-success").style.display = "flex";
        // generate new question
        controller.generateNewClrQuestion();
        // rest trials
        controller.resetTrial();
        // increase total and right questions
        controller.increaseNumOfQuestions();
        controller.increaseRightQuestions();
        // render results
        conrolsView.render();
      }
      // wrong answer
      else {
        // show success msg
        document.querySelector(".alert-fail").style.display = "flex";
        // render results
        conrolsView.render();
      }
    } else {
      /**no more trials */
      console.log(false);
      // generate new question
      controller.generateNewClrQuestion();
      // rest trials
      controller.resetTrial();
      // increase total questions
      controller.increaseNumOfQuestions();
      // render results
      conrolsView.render();
    }
  },
  attachListeners: function () {
    [...this.answersSquares].forEach((square, index) => {
      square.addEventListener("click", this.handleClick);
    });
  },
  render: function () {
    let colors = controller.getRandomColors();
    [...this.answersSquares].forEach((square, index) => {
      square.style.background = colors[index];
    });
  },
};

// controls view
var conrolsView = {
  init: function () {
    this.newClr = document.querySelector("#new-clr");
    this.hardQuestion = document.querySelector("#hard-question");
    this.easyQuestion = document.querySelector("#easy-question");
    this.trials = document.querySelector(".count-trial");
    this.totalQuestions = document.querySelector(".total-questions");
    this.correctQuestions = document.querySelector(".correct-questions");

    this.newClr.addEventListener("click", function () {
      controller.generateNewClrQuestion();
      // hide alert messages
      document.querySelector(".alert-success").style.display = "none";
      document.querySelector(".alert-fail").style.display = "none";
      // reset trials
      controller.resetTrial();
      conrolsView.render();
    });

    this.hardQuestion.addEventListener("click", function () {
      conrolsView.hardQuestion.classList.add("active");
      conrolsView.easyQuestion.classList.remove("active");
      controller.setMode("hard");
      controller.resetTrial();
      conrolsView.render();
    });

    this.easyQuestion.addEventListener("click", function () {
      conrolsView.hardQuestion.classList.remove("active");
      conrolsView.easyQuestion.classList.add("active");
      controller.setMode("easy");
      controller.resetTrial();
      conrolsView.render();
    });
    this.render();
  },
  render: function () {
    this.trials.textContent = controller.getTrials();
    this.totalQuestions.textContent = controller.getNumOfQuestions();
    this.correctQuestions.textContent = controller.getRightQuestions();
  },
};
// initiate appliation
controller.init();
