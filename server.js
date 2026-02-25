import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint to generate access token for web calls
app.post('/api/create-web-call', async (req, res) => {
    try {
        const { agent_id } = req.body;

        if (!agent_id) {
            return res.status(400).json({ error: "agent_id is required" });
        }

        console.log(`Creating voice session for agent: ${agent_id}`);

        // Call the underlying voice provider API
        const response = await fetch("https://api.retellai.com/v2/create-web-call", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.RETELL_API_KEY}`
            },
            body: JSON.stringify({ agent_id })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Voice Service error");
        }

        const data = await response.json();
        res.json({
            access_token: data.access_token,
        });
    } catch (error) {
        console.error("Error creating session:", error);
        res.status(500).json({
            error: "Failed to create voice session",
            details: error.message
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Voice Token Server running on port ${PORT}`);
});
