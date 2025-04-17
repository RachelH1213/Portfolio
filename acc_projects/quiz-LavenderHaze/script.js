function storeAnswer(questionNumber, answer, nextPage) {
  localStorage.setItem(`q${questionNumber}`, answer);
  window.location.href = nextPage;
}

function showResults() {
  const answers = [];
  for (let i = 1; i <= 8; i++) {
    answers.push(localStorage.getItem(`q${i}`));
  }

  let scores = {
    glitter: 0,
    cozy: 0,
    cabin: 0,
    mystic: 0
  };

  answers.forEach((ans) => {
    switch (ans) {
      case "glitter":
      case "chaos":
      case "playlist":
      case "love":
      case "auntie":
        scores.glitter += 1;
        break;

      case "soft":
      case "bread":
      case "hug":
      case "soup":
      case "dad":
      case "food":
        scores.cozy += 1;
        break;

      case "flannel":
      case "herbs":
      case "advice":
      case "librarian":
      case "talk":
        scores.cabin += 1;
        break;

      case "witch":
      case "vegan":
      case "jokes":
      case "seen":
      case "protect":
        scores.mystic += 1;
        break;
    }
  });

  let resultType = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  let resultText = "";

  switch (resultType) {
    case "glitter":
      resultText = "✨ You’re part of the Glitter Squad! Your chosen family sparkles with joy, drama, and hype energy. You're surrounded by people who hand you rhinestones and call you fabulous every day.";
      break;
    case "cozy":
      resultText = "🧸 You belong in the Cozy Cottage Crew — warm meals, soft blankets, and unconditional support. Your chosen family brings soup, hugs, and chill vibes.";
      break;
    case "cabin":
      resultText = "🌲 You’re in the Queer Cabin Collective — flannel fits, deep convos, and emotional depth. Your chosen family is thoughtful, grounded, and always there for reflection.";
      break;
    case "mystic":
      resultText = "🔮 Welcome to the Mystic Coven — magical, intuitive, and full of protection spells. Your chosen family manifests with you, protects your peace, and passes down queer wisdom.";
      break;
    default:
      resultText = "🌈 You are beautifully unique. Your chosen family can’t be contained by categories.";
  }

  const resultBox = document.getElementById("result-box");
  if (resultBox) {
    resultBox.innerText = resultText;
  }
}

function restartQuiz() {
  localStorage.clear();
  window.location.href = "quiz1.html";
}