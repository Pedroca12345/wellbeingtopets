const userPrompt = document.getElementById('user-prompt');
const chatMessages = document.getElementById('chat-messages');
const sendPromptButton = document.getElementById('send-prompt-button');

let apiKey;
const endpoint = 'https://api.openai.com/v1/chat/completions';

sendPromptButton.addEventListener('click', async function getOpenAIResponse() {
    try {
        if(userPrompt.value === '') {
            alert('Caixa de texto vazia!!!');
            return;
        }
        setUserBoxMessage();
        
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userPrompt.value }],
                max_tokens: 150,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            setChatBoxMessage({ choices: [{ message: { content: JSON.stringify(errorData, null, 2) } }] });
            return;
        }

        const data = await response.json();
        setChatBoxMessage(data);

    } catch (error) {
        chatMessages.innerHTML += `<div class="chat-message-box">
                                        <span class="chat-message" id="chat-message">${error.message}</span>
                                    </div>
                                    <p class="chat-message-hour"></p>`;
    }
});

function setUserBoxMessage() {
    chatMessages.innerHTML += `<div class="user-view-message" id="user-view-message">
                                    <div class="user-message-box">
                                        <span class="user-message" id="user-message">${userPrompt.value}</span>
                                    </div>
                                    <p class="message-hour"></p>
                                </div>`;
}

function setChatBoxMessage(data) {
    chatMessages.innerHTML += `<div class="chat-view-message" id="chat-view-message">
                                    <div class="chat-message-box">
                                        <span class="chat-message" id="chat-message">${data.choices[0].message.content}</span>
                                    </div>
                                    <p class="chat-message-hour"></p>
                                </div>`;
    userPrompt.value = '';
}
