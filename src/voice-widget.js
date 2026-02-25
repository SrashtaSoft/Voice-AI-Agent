import { RetellWebClient as VoiceClient } from "retell-client-js-sdk";

const WIDGET_CSS = `
:root {
  --voice-primary: #0ea5e9;
  --voice-primary-hover: #0284c7;
  --voice-bg: #f0f9ff;
  --voice-card-bg: #ffffff;
  --voice-text-main: #0c4a6e;
  --voice-text-muted: #334155;
  --voice-border: #e0f2fe;
  --voice-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

.voice-widget-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 10000;
  font-family: 'Outfit', 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

/* Floating Launcher */
.voice-launcher {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.voice-launcher:hover {
  transform: translateY(-5px);
}

.voice-avatar-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #ffffff;
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
  overflow: hidden;
  background: #e0f2fe;
}

.voice-avatar-circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.voice-talk-btn {
  background: var(--voice-primary);
  color: white;
  padding: 10px 24px;
  border-radius: 30px;
  font-weight: 700;
  font-size: 16px;
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.4);
  white-space: nowrap;
}

/* Main Panel */
.voice-widget-panel {
  width: 360px;
  height: 550px;
  background: var(--voice-bg);
  border-radius: 24px;
  box-shadow: var(--voice-shadow);
  display: none;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 16px;
  animation: voicePopIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.voice-widget-panel.open {
  display: flex;
}

@keyframes voicePopIn {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

/* Panel Header */
.voice-header {
  padding: 16px 20px;
  background: #e0f2fe;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.voice-header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.voice-mini-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
}

.voice-mini-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.voice-header-name {
  font-weight: 700;
  color: var(--voice-text-main);
  font-size: 18px;
}

.voice-header-actions {
  display: flex;
  gap: 12px;
  color: var(--voice-text-main);
}

.voice-header-icon {
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.voice-header-icon:hover {
  opacity: 1;
}

/* Panel Content */
.voice-content {
  flex: 1;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  overflow-y: auto;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.voice-content::-webkit-scrollbar {
  display: none;
}

.voice-main-avatar {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  background: #fff;
}

.voice-main-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.voice-status-pill {
  background: var(--voice-primary);
  color: white;
  padding: 12px 28px;
  border-radius: 30px;
  font-weight: 700;
  font-size: 15px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
  letter-spacing: 0.3px;
}

.voice-status-pill:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(14, 165, 233, 0.4);
}

.voice-status-pill.inactive {
  background: #e2e8f0;
  color: #475569;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.voice-status-pill.inactive:hover {
  background: #cbd5e1;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.voice-status-pill.listening {
  background: #10b981;
  animation: voicePulse 1.5s infinite;
}

@keyframes voicePulse {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

.voice-conversation-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 4px;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.voice-conversation-box::-webkit-scrollbar {
  display: none;
}

.voice-label {
  font-weight: 700;
  color: var(--voice-text-main);
  font-size: 14px;
  position: sticky;
  top: 0;
  background: var(--voice-bg);
  padding-bottom: 8px;
  z-index: 1;
}

.voice-message {
  padding: 12px 16px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.5;
  max-width: 85%;
  animation: voiceFadeIn 0.3s ease-out;
  position: relative;
}

@keyframes voiceFadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

.voice-message.agent {
  align-self: flex-start;
  background: white;
  color: var(--voice-text-muted);
  border: 1px solid var(--voice-border);
  border-bottom-left-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.voice-message.user {
  align-self: flex-end;
  background: var(--voice-primary);
  color: white;
  border-bottom-right-radius: 4px;
}

/* Footer / Input Lookalike */
.voice-footer {
  padding: 16px 20px;
  display: flex;
  gap: 10px;
}

.voice-input-mock {
  flex: 1;
  background: white;
  border: 1px solid var(--voice-border);
  padding: 12px 16px;
  border-radius: 12px;
  color: #94a3b8;
  font-size: 14px;
}

.voice-send-btn {
  width: 44px;
  height: 44px;
  background: var(--voice-primary);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
}

.voice-visualizer {
    display: none;
    gap: 3px;
    height: 30px;
    align-items: center;
}

.voice-visualizer.active {
    display: flex;
}

.voice-bar {
    width: 3px;
    height: 10px;
    background: white;
    border-radius: 2px;
    transition: height 0.1s ease;
}
`;

class VoiceWidget {
  constructor(config = {}) {
    this.config = {
      agentId: config.agentId || "",
      apiKey: config.apiKey || "",
      accessTokenEndpoint: config.accessTokenEndpoint || "",
      onCallStarted: config.onCallStarted || (() => { }),
      onCallEnded: config.onCallEnded || (() => { }),
      onError: config.onError || ((err) => console.error("Voice Error:", err)),
      title: config.title || "Scott",
      subtitle: config.subtitle || "AI Assistant",
      avatarUrl: config.avatarUrl || "/scott.png",
      ...config,
    };

    this.client = new VoiceClient();
    this.isCallActive = false;
    this.isPanelOpen = false;
    this.init();
  }

  init() {
    this.injectStyles();
    this.createWidgetElements();
    this.setupEventListeners();
  }

  injectStyles() {
    if (!document.getElementById("voice-widget-styles")) {
      const style = document.createElement("style");
      style.id = "voice-widget-styles";
      style.textContent = WIDGET_CSS;
      document.head.appendChild(style);
    }
  }

  createWidgetElements() {
    const container = document.createElement("div");
    container.className = "voice-widget-container";
    container.id = "voice-widget";

    container.innerHTML = `
      <!-- Panel -->
      <div class="voice-widget-panel" id="voice-panel">
        <div class="voice-header">
          <div class="voice-header-left">
            <div class="voice-mini-avatar">
              <img src="${this.config.avatarUrl}" alt="Avatar">
            </div>
            <div class="voice-header-name">${this.config.title}</div>
          </div>
          <div class="voice-header-actions">
            <svg class="voice-header-icon" id="voice-close-btn" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </div>
        </div>

        <div class="voice-content">
          <div class="voice-main-avatar">
            <img src="${this.config.avatarUrl}" alt="Avatar">
          </div>

          <button class="voice-status-pill inactive" id="voice-action-btn">
             Start Conversation
          </button>

          <div class="voice-conversation-box" id="voice-transcript">
             <div class="voice-label">Conversation</div>
             <div class="voice-message agent">
                Hello! 👋 I'm ${this.config.title}. I'd love to chat about how we can supercharge your business.
             </div>
          </div>
        </div>

        <div class="voice-footer" style="padding: 10px 20px; display: flex; justify-content: center;">
            <div class="voice-visualizer" id="voice-visualizer" style="display: none; gap: 4px; align-items: center; background: var(--voice-primary); padding: 8px 16px; border-radius: 20px;">
                ${Array(6).fill(0).map(() => '<div class="voice-bar" style="width: 3px; height: 10px; background: white; border-radius: 2px;"></div>').join('')}
                <span style="color: white; font-size: 12px; font-weight: 600; margin-left: 8px;">Live Voice</span>
            </div>
        </div>
      </div>

      <!-- Launcher -->
      <div class="voice-launcher" id="voice-launcher">
        <div class="voice-avatar-circle">
          <img src="${this.config.avatarUrl}" alt="Avatar">
        </div>
        <div class="voice-talk-btn">Talk to ${this.config.title}</div>
      </div>
    `;

    document.body.appendChild(container);

    this.elements = {
      panel: document.getElementById("voice-panel"),
      launcher: document.getElementById("voice-launcher"),
      closeBtn: document.getElementById("voice-close-btn"),
      actionBtn: document.getElementById("voice-action-btn"),
      transcript: document.getElementById("voice-transcript"),
      visualizer: document.getElementById("voice-visualizer"),
      bars: document.querySelectorAll(".voice-bar")
    };
  }

  setupEventListeners() {
    this.elements.launcher.addEventListener("click", () => this.togglePanel(true));
    this.elements.closeBtn.addEventListener("click", () => this.togglePanel(false));

    this.elements.actionBtn.addEventListener("click", () => {
      if (this.isCallActive) {
        this.stopCall();
      } else {
        this.startCall();
      }
    });

    this.client.on("call_started", () => {
      this.isCallActive = true;
      this.elements.actionBtn.textContent = "Connected To " + this.config.title;
      this.elements.actionBtn.classList.remove("inactive");
      this.elements.actionBtn.classList.add("listening");
      // Add a small spacer or initial message if needed
      this.elements.visualizer.style.display = "flex";
      this.config.onCallStarted();
    });

    this.client.on("call_ended", () => {
      this.isCallActive = false;
      this.elements.actionBtn.textContent = "Start Conversation";
      this.elements.actionBtn.classList.remove("listening");
      this.elements.actionBtn.classList.add("inactive");
      this.elements.visualizer.style.display = "none";
      this.resetVisualizer();
      this.config.onCallEnded();
    });

    this.client.on("error", (error) => {
      this.config.onError(error);
      this.addMessage("agent", "Error: " + (error.message || "Connection failed"));
      this.isCallActive = false;
    });

    this.client.on("update", (update) => {
      if (update.transcript) {
        this.renderTranscript(update.transcript);
      }
    });

    this.client.on("audio_level", (level) => {
      this.updateVisualizer(level);
    });
  }

  togglePanel(show) {
    this.isPanelOpen = show;
    if (show) {
      this.elements.panel.classList.add("open");
      this.elements.launcher.style.display = "none";
    } else {
      this.elements.panel.classList.remove("open");
      this.elements.launcher.style.display = "flex";
    }
  }

  async startCall() {
    try {
      this.elements.actionBtn.disabled = true;
      this.elements.actionBtn.textContent = "Connecting...";

      let accessToken = "";
      if (this.config.accessToken) {
        accessToken = this.config.accessToken;
      } else if (this.config.apiKey) {
        // Calling Voice Provider API directly from the frontend
        const response = await fetch("https://api.retellai.com/v2/create-web-call", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.config.apiKey}`
          },
          body: JSON.stringify({ agent_id: this.config.agentId })
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || "Failed to create web call");
        }

        const data = await response.json();
        accessToken = data.access_token;
      } else if (this.config.accessTokenEndpoint) {
        const response = await fetch(this.config.accessTokenEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ agent_id: this.config.agentId })
        });
        const data = await response.json();
        accessToken = data.access_token;
      }

      await this.client.startCall({ accessToken });

    } catch (error) {
      this.elements.actionBtn.textContent = "Error Connecting";
      console.error(error);
    } finally {
      this.elements.actionBtn.disabled = false;
    }
  }

  stopCall() {
    this.client.stopCall();
  }

  updateVisualizer(level) {
    this.elements.bars.forEach((bar) => {
      const height = Math.max(5, level * 40 * (Math.random() * 0.5 + 0.5));
      bar.style.height = `${height}px`;
    });
  }

  resetVisualizer() {
    this.elements.bars.forEach((bar) => {
      bar.style.height = `10px`;
    });
  }

  addMessage(role, content) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `voice-message ${role}`;
    msgDiv.textContent = content;
    this.elements.transcript.appendChild(msgDiv);
    this.scrollToBottom();
  }

  renderTranscript(transcript) {
    // Clear current messages except the label
    const label = this.elements.transcript.querySelector('.voice-label');
    this.elements.transcript.innerHTML = '';
    this.elements.transcript.appendChild(label);

    transcript.forEach(utterance => {
      const msgDiv = document.createElement("div");
      msgDiv.className = `voice-message ${utterance.role}`;
      msgDiv.textContent = utterance.content;
      this.elements.transcript.appendChild(msgDiv);
    });

    this.scrollToBottom();
  }

  scrollToBottom() {
    this.elements.transcript.scrollTop = this.elements.transcript.scrollHeight;
  }
}

export default VoiceWidget;

if (typeof window !== "undefined") {
  window.VoiceWidget = VoiceWidget;
}
