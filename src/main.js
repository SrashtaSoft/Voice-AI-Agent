import VoiceWidget from "./voice-widget";

// Initialize the widget
const widget = new VoiceWidget({
  title: "Scott",
  subtitle: "Powered by AI",
  avatarUrl: "/scott.png",
  accessTokenEndpoint: "/api/create-web-call",
  agentId: "agent_5c7f433cedb1d72c085a6b3cc3"
});

document.querySelector('#app').innerHTML = `
  <div style="padding: 40px; text-align: center; font-family: 'Outfit', sans-serif;">
    <h1 style="color: #0ea5e9; font-size: 3rem;">AI Voice Widget</h1>
    <p style="color: #64748b; max-width: 600px; margin: 0 auto; line-height: 1.6;">
      This is a premium, embeddable voice call widget. 
      Click the launcher in the bottom right corner to interact with the AI assistant.
    </p>
    
    <div style="margin-top: 50px; padding: 30px; background: #f0f9ff; border-radius: 24px; text-align: left; border: 1px solid #e0f2fe;">
      <h3 style="color: #0c4a6e;">How to embed this on your site?</h3>
      <p style="color: #334155;">Simply copy the code below and paste it before the closing <code>&lt;/body&gt;</code> tag of your website.</p>
      <pre style="background: #0c4a6e; color: #e0f2fe; padding: 24px; border-radius: 16px; overflow-x: auto; font-size: 14px;">
&lt;script src="https://your-cdn.com/voice-widget.umd.js"&gt;&lt;/script&gt;
&lt;script&gt;
  const scott = new VoiceWidget({
    agentId: "agent_5c7f433cedb1d72c085a6b3cc3",
    accessTokenEndpoint: "https://your-api.com/api/create-web-call"
  });
&lt;/script&gt;</pre>
    </div>
  </div>
`;
