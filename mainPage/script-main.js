//The animation for a landing of main page

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementsByClassName("chat-input")[0]; //input element

  const header = document.getElementsByClassName("header")[0]; //header element
  const logo = header.querySelector("img"); //img element inside the header
  const text = header.querySelector("h1"); //the text element inside the header
  const content = document.getElementById("content"); //<div> element for messages secion
  const content_answer = content.querySelectorAll("section"); // for all the <section> inside content div
  const page = document.querySelector(".page")  //for bulp in the background
  const prompt = document.getElementById('prompt-suggestion');
  const prompt_boxes = document.getElementById('prompt-suggestion-boxes');
  const prompt_txt = document.getElementById('prompt-suggestion-txt');
  //Adds Function when pressed does animation wihtout manipulating with classnames and etc.

  input.addEventListener("focus", () => {
    header.style.height = "0vh";
    logo.style.opacity = "0";
    text.style.opacity = "0";
    content.style.height = "100%";
    content_answer.forEach((element) => {
      // Does the effect for each element, a.k.a <section> in the <div>
      element.style.opacity = "1";
    });
    // page_bulp.style.backgroundImage = "radial-gradient(circle at center,rgba(255, 255, 255, 0.3),var(--black-color-2) 50%);";
    page.style.setProperty('--bg-size', '0%');
    page.style.setProperty('--bg-opacity', '0');
    prompt_txt.style.opacity = "1";
  });

  prompt_boxes.addEventListener("click", () => {
    prompt.style.height = "30px";
    prompt_boxes.style.opacity = "0";
  });

  prompt_txt.addEventListener("click", () => {
    prompt_boxes.style.opacity = "1";
    prompt.style.height = "117px";
  });

  content.addEventListener("click", () => {
    prompt.style.height = "30px";
    prompt_boxes.style.opacity = "0";
  }); 
  //This for the repeated, aka when <input> is not focused phase

  //   input.addEventListener('blur', () => {
  //     content.style.height = '0%';
  //     content_answer.forEach(element => {
  //         element.style.opacity = '0';
  //     });;
});

//API_KEY
const API_KEY =
  "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";

const sendButton = document.getElementById("sendButton");
const chatInput = document.getElementById("chatInput");
const button = document.getElementsByClassName('prompt-box')[0];

let isAnswerLoading = false;
let answerSectionId = 0;

function handleSendMessage(messageText = null) {
  // Use messageText if provided, otherwise use what's typed in the input box
  if (messageText) {
    question = messageText.trim();
  }else {
    question = chatInput.value.trim();
  }

  if (question === '' || isAnswerLoading) {
    return;
  }

  // Disable UI send button
  sendButton.classList.add('send-button-nonactive');

  // Send the message (however your addQuestonSection handles it)
  addQuestonSection(question);

  // Clear input field if the message was typed manually
  if (!messageText) {
    chatInput.value = '';
  }
}

document.querySelectorAll('.prompt-box').forEach(button => {
  button.addEventListener("click", () => handleSendMessage(button.textContent));
});

sendButton.addEventListener("click", () => handleSendMessage(chatInput));
  chatInput.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        handleSendMessage();
    }
})

function getAnswer(question) {
    const fetchData = fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "meta-llama/llama-3.3-8b-instruct:free",
          "messages": [
            {
              role: "user",
              content: question
            },
            {
                role: "system",
                content: "You are MindX AI, an advanced, helpful, and engaging AI designed to assist students in their academic studies. Your primary goal is to support users by providing accurate, detailed, and easy-to-understand explanations, resources, and guidance on a wide variety of subjects, including mathematics, science, literature, history, and more. Whenever a user asks a question, respond in a way that feels like a personalized tutor or mentor, helping them to not only understand the material but also build a genuine interest in learning."
            }
          ],
        })
      });

    fetchData.then(response => response.json())
        .then(data => {
            const resultData = data.choices[0].message.content;
            isAnswerLoading = false;
            addAnswerSection(resultData);
        }).finally(() => {
            scrollToButtom();
            sendButton.classList.remove('send-button-nonactive');
        });
    
}


function addQuestonSection(message) {
    isAnswerLoading = true;
    const sectionElement = document.createElement('section');
    sectionElement.className = 'question-section';
    sectionElement.textContent = message;
    sectionElement.style.opacity = '1';

    content.appendChild(sectionElement);
    addAnswerSection(message)
    scrollToButtom();
}

function addAnswerSection(message) {
    if (isAnswerLoading) {
        answerSectionId++;
        const sectionElement = document.createElement('section');
        sectionElement.className = 'answer-section';
        sectionElement.innerHTML = getLoadingSvg();
        sectionElement.id = answerSectionId;
        sectionElement.style.opacity = '1';

        content.appendChild(sectionElement);
        getAnswer(message);
    }else {
        const answerSectionElement = document.getElementById(answerSectionId);
        // answerSectionElement.textContent = message;
        answerSectionElement.innerHTML = formatAIResponse(message);
    }
}

function getLoadingSvg() {
    return '<svg style = "height: 25px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#4F6BFE" stroke="#4F6BFE" stroke-width="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#4F6BFE" stroke="#4F6BFE" stroke-width="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#4F6BFE" stroke="#4F6BFE" stroke-width="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>';
}

function scrollToButtom() {
    content.scrollTo({
        top: content.scrollHeight,
        behavior: "smooth"
    });
}

function formatAIResponse(text) {
    // Escape HTML tags
    text = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Bold (**text**)
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Italics (*text*)
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Replace newlines with <br> to preserve formatting
    text = text.replace(/\n{2,}/g, '</p><p>')  // double newlines = paragraph
               .replace(/\n/g, '<br>');         // single newline = line break

    // Replace numbered lists
    text = text.replace(/(\d+\.\s.*?)(?=<br>|\n|$)/g, '<li>$1</li>');
    text = text.replace(/(<li>.*<\/li>)/g, '<ol>$1</ol>');

    // Wrap final result in <p>
    return `<p>${text}</p>`;
}
