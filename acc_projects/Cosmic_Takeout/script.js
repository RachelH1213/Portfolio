
let currentQuestion = "";

const imageMap = {
  bubble_tea: ["bubble_tea1.jpg", "bubble_tea2.jpg", "bubble_tea3.jpg"],
  hotpot: ["hotpot1.jpg", "hotpot2.jpg", "hotpot3.jpg"],
  fried_chicken: ["chicken1.jpg", "chicken2.jpg", "chicken3.jpg"]
};

const messageMap = {
  bubble_tea: {
    funny: "You're sweetly avoiding your responsibilities, but hey—happiness counts.",
    question: "Should you get that sweet bubble tea today?"
  },
  hotpot: {
    funny: "You're emotionally boiling. Maybe it's time for a group vent session.",
    question: "Do you really need that fiery hotpot?"
  },
  fried_chicken: {
    funny: "Self-control? Never heard of it. Indulge and deal with it later.",
    question: "Can you handle the crunch of truth?"
  }
};

function getFortune(choice) {
  // 显示加载提示
  document.getElementById("loading").style.display = "block";
  document.getElementById("result").style.display = "none"; // 暂时隐藏结果区

  setTimeout(() => {
    // 等待1.5秒后显示结果
    document.getElementById("loading").style.display = "none";
    document.getElementById("result").style.display = "block";

    // 原来的内容开始执行
    const images = imageMap[choice];
    const randomIndex = Math.floor(Math.random() * images.length);
    const imgUrl = "images/" + images[randomIndex];
    document.getElementById("foodImg").src = imgUrl;

    const selected = messageMap[choice];
    document.getElementById("funnyMsg").innerText = selected.funny;

    fetch('https://api.adviceslip.com/advice')
      .then(response => response.json())
      .then(data => {
        document.getElementById("adviceMsg").innerText = "✨ Fortune says: " + data.slip.advice;
      });

    if (choice === 'fried_chicken') {
      fetch('https://excuser.herokuapp.com/v1/excuse')
        .then(response => response.json())
        .then(data => {
          document.getElementById("excuseMsg").innerText = "🍗 Your excuse: " + data[0].excuse;
        });
    } else {
      document.getElementById("excuseMsg").innerText = "";
    }

    currentQuestion = selected.question;
    document.getElementById("yesNoQuestion").innerText = "";
    document.getElementById("yesNoAnswer").innerText = "";
    document.getElementById("yesNoImg").src = "";
    document.getElementById("revealBtn").style.display = "inline-block";

  }, 1500); // 1.5秒延迟
}

function revealYesNo() {
  document.getElementById("yesNoQuestion").innerText = "❓ " + currentQuestion;

  fetch('https://yesno.wtf/api')
    .then(response => response.json())
    .then(data => {
      document.getElementById("yesNoAnswer").innerText = data.answer.toUpperCase();
      document.getElementById("yesNoImg").src = data.image;
    });

  document.getElementById("revealBtn").style.display = "none";
}
