const PORT = 8000

const express = require("express")

require('dotenv').config()
 
const cors = require("cors")

const app = express()

app.use(express.json())

app.use(cors()) 

const API_KEY = process.env.OPENAI_API_KEY

app.post('/completions', async(req, res) => {

    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "davinci:ft-bit-systems-2023-10-26-07-23-37",
            prompt: req.body.message,
            presence_penalty: 0,
            frequency_penalty: 0.3,
            temperature: 0,
            stop:['\n','->'],
            max_tokens: 100            
        })
    }

    try {

        const response = await fetch('https://api.openai.com/v1/completions', options)
        const data = await response.json()

        res.send(data)
        
    } catch (error) {
        console.log(error)
    }
    
})

app.listen(PORT, () => console.log('Your server is running on port '+ PORT))