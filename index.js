
const chatbotConversation = document.getElementById('chatbot-conversation')

const conversationArr = [{
    role: 'system',
    content: 'You are a highly knowledgeable assistant that is always happy to help.'
}] 
 
async function GetMessages() {
   
    try {

        const userinput = document.getElementById("user-input").value
        const newSpeech = document.createElement('div')
        newSpeech.classList.add('speech', 'speech-human')
        chatbotConversation.appendChild(newSpeech)
        newSpeech.textContent = userinput
        conversationArr.push({
            role: 'user',
            content:userinput
        })
        document.getElementById("user-input").value = ""
        

        chatbotConversation.scrollTop = chatbotConversation.scrollHeight

        const options = {
            method: "POST",
            body: JSON.stringify({
                message: conversationArr
            }),
            headers: {
                "Content-type": "application/json"
            }
        }

        const response = await fetch("http://localhost:8000/completions", options)
        const data = await response.json()
        conversationArr.push(data.choices[0].message)
        const reply = data.choices[0].message.content
        renderTypewriterText(reply)
        //console.log(message);
        
    } catch (error) {
        
        console.log(error)
    }
}

function renderTypewriterText(text) {
    const newSpeech = document.createElement('div')
    newSpeech.classList.add("speech", "speech-ai", "blinking-cursor")
    chatbotConversation.appendChild(newSpeech)

    let i = 0
    
    const interval = setInterval(() => {
        newSpeech.textContent += text.slice(i - 1, i)
        
        if (text.length === i)
        {
            clearInterval(interval)
            newSpeech.classList.remove("blinking-cursor")
        }
        i++

        chatbotConversation.scrollTop = chatbotConversation.scrollHeight
    },50)
}