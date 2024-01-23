import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
require('dotenv').config({ path: __dirname + '/../.env' });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/generate-prompt', async (req, res) => {
  const inputText = req.body.text;
  const apiKey = process.env.OPENAI_API_KEY;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: `Improve the following text with creative writing:\n\n"${inputText}"\n\n`,
        max_tokens: 150,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );
    res.json({ improvedText: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).json({ message: 'Error processing request' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
