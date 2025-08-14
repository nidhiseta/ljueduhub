const fetch = require('node-fetch');

async function exponentialBackoff(fn, maxRetries=5, baseDelay=500){
  let attempt = 0;
  while(attempt <= maxRetries){
    try {
      return await fn();
    } catch (err) {
      attempt++;
      if (attempt > maxRetries) throw err;
      const delay = baseDelay * Math.pow(2, attempt - 1) + Math.floor(Math.random() * 100);
      await new Promise(r => setTimeout(r, delay));
    }
  }
}

// Placeholder callAI: replace internals with real LLM call (OpenAI/Gemini/etc).
async function callAI(prompt, options = {}){
  return exponentialBackoff(async () => {
    // Simulated LLM response
    return { text: `Simulated AI response for prompt: ${prompt.slice(0,200)}` };
  }, 4, 500);
}

module.exports = { callAI, exponentialBackoff };
