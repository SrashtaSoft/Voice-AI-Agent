# Voice Call Widget: Production Embed Guide

This guide explains how to deploy the **Scott AI Voice Assistant** to any website.

## 1. Prepare Your Backend (Token Server)
The widget requires an `access_token` for security. You must host the `server.js` code on a server (e.g., Vercel, Heroku, AWS, or your own VPS).

### Steps:
1.  **Environment Variables**: Set `RETELL_API_KEY` and `PORT` on your server.
2.  **Deployment**: Upload `server.js`, `package.json`, and `.env`.
3.  **Endpoint**: Your backend will now provide an endpoint like `https://your-api.com/create-web-call`.

---

## 2. Host the Widget Files
Upload the production files from the `/dist` folder to your CDN or web server:
*   `voice-widget.umd.js` (The core logic and UI)

---

## 3. Embed on Your Website
Add this code to your HTML, ideally just before the `</body>` tag.

```html
<!-- 1. Load the Voice Widget Bundle -->
<script src="https://your-cdn.com/voice-widget.umd.js"></script>

<!-- 2. Initialize the Widget -->
<script>
  window.onload = function() {
    const scott = new VoiceWidget({
      agentId: "agent_5c7f433cedb1d72c085a6b3cc3",
      accessTokenEndpoint: "https://your-api.com/create-web-call", // Link to your backend
      title: "Scott",
      subtitle: "AI Assistant",
      // Optional: Professional Avatar URL
      avatarUrl: "/scott.png",
      
      // Callbacks
      onCallStarted: () => {
        console.log("Conversation started with Scott");
      },
      onCallEnded: () => {
        console.log("Conversation ended");
      }
    });
  };
</script>
```

---

## 4. Configuration Options

| Option | Required | Description |
| :--- | :--- | :--- |
| `agentId` | **Yes** | Your unique Agent ID. |
| `accessTokenEndpoint`| **Yes** | The URL of your backend that returns the `access_token`. |
| `title` | No | Display name (default: "Scott"). |
| `subtitle` | No | Display subtitle (default: "AI Assistant"). |
| `avatarUrl` | No | URL to a circular avatar image. |
| `onCallStarted` | No | Function to execute when the call goes live. |
| `onCallEnded` | No | Function to execute when the call finishes. |

---

## 5. Local Testing
To test the production build locally:
1.  Run `node server.js` to start the token backend.
2.  Open `index.html` in your browser.
3.  Ensure `accessTokenEndpoint` in your script points to `http://localhost:3000/create-web-call`.
