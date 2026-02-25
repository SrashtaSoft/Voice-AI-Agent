export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { agent_id } = req.body;

        if (!agent_id) {
            return res.status(400).json({ error: "agent_id is required" });
        }

        console.log(`Vercel: Creating voice session for agent: ${agent_id}`);

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
        res.status(200).json({
            access_token: data.access_token,
        });
    } catch (error) {
        console.error("Vercel Error:", error);
        res.status(500).json({
            error: "Failed to create voice session",
            details: error.message
        });
    }
}
