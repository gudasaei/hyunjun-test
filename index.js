const btn = document.getElementById("submitQuiz");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("modal-close-btn");
const modalText = document.getElementById("modal-text");
const modalForm = document.getElementById("modal-form");

closeBtn.onclick = function () {
  modal.style.display = "none";
};

// 점수 애니메이션 함수
function counter(counterEl, max) {
  let now = 0;
  const handle = setInterval(() => {
    const step = Math.ceil((max - now) / 10);
    now += step;
    if (now >= max) {
      counterEl.innerHTML = `${max}점!`;
      clearInterval(handle);
    } else {
      counterEl.innerHTML = `${now}점!`;
    }
  }, 50);
}

btn.addEventListener("click", function (event) {
  event.preventDefault();

  let score = 0;
  const questions = document.querySelectorAll("#quizForm .question");

  questions.forEach((question) => {
    const checked = question.querySelector("input[type='radio']:checked");
    if (checked) {
      score += parseInt(checked.value);
    }
  });

  modal.style.display = "block";
  modalText.innerHTML = `
    <div class="modal-inner-loading">
      <p id="upload-text">0점!</p>
    </div>`;

  const uploadText = document.getElementById("upload-text");
  counter(uploadText, score);
});

modalForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const phoneInput = modalForm.querySelector('[name="tel"]');
  const phoneNumber = phoneInput.value;

  if (!phoneNumber.startsWith("010") || phoneNumber.length !== 11) {
    alert("전화번호는 010으로 시작해야 하며, 11자리여야 합니다.");
    return;
  }

  modalForm.innerHTML = `
    <h2>응모가 완료되었습니다!</h2>
    <div class="idiot-gif">
      <img src="images/안마의자.png">
      <p>감사합니다.</p>
    </div>`;
});
