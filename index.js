
const chatbotConversation = document.getElementById('chatbot-conversation')

let conversationStr = ""
 
async function GetMessages() {
   
    try {

        const userinput = document.getElementById("user-input").value
        const newSpeech = document.createElement('div')
        newSpeech.classList.add('speech', 'speech-human')
        chatbotConversation.appendChild(newSpeech)
        newSpeech.textContent = userinput
        conversationStr += ` ${userinput} ->`
        document.getElementById("user-input").value = ""
        

        chatbotConversation.scrollTop = chatbotConversation.scrollHeight

        const options = {
            method: "POST",
            body: JSON.stringify({
                message: conversationStr
            }),
            headers: {
                "Content-type": "application/json"
            }
        }

        const response = await fetch("/api/completions", options)
        const data = await response.json()
        conversationStr += ` ${data.choices[0].text} \n`
        const reply = data.choices[0].text
        renderTypewriterText(reply)
        //console.log(conversationStr);
        
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