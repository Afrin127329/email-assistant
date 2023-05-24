const { Configuration, OpenAIApi } = require('openai');

let openaiClient;

// Initialize OpenAI client with API key from .env file
const configuration = new Configuration({
  apiKey: "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",
});
openaiClient = new OpenAIApi(configuration);

setInterval(() => {
  const gmailForms = document.querySelectorAll('div[g_editable]');
  for (const form of gmailForms) {
    if (form.parentNode && form.parentNode.querySelector('#email-assistant-button') === null) {
      attachAssistantButton(form);
    }
  }
}, 1000);

function attachAssistantButton(node) {
  node.insertAdjacentHTML(
    "beforebegin",
    `<div id="email-assistant-button" class="assistant-btn">
      <svg xmlns="http://www.w3.org/2000/svg" class="assitant-btn-inner" viewBox="0 0 24 24"><title>creation</title><path fill="#232323" d="M19,1L17.74,3.75L15,5L17.74,6.26L19,9L20.25,6.26L23,5L20.25,3.75M9,4L6.5,9.5L1,12L6.5,14.5L9,20L11.5,14.5L17,12L11.5,9.5M19,15L17.74,17.74L15,19L17.74,20.25L19,23L20.25,20.25L23,19L20.25,17.74" /></svg> 
    </div>`
  );
  // add click event listener to assistant button
  node.parentNode.querySelector('#email-assistant-button').addEventListener('click', async function () {
    if (!openaiClient) return;
    const completion = await openaiClient.createCompletion({
      model: 'text-davinci-003',
      prompt: 'Continue writing the following email:\n"' + node.textContent + '"',
      temperature: 0.6
    })
    node.textContent += ' ' + completion.data.choices[0].text;
  })
}
