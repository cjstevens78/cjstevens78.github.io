export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { event, details } = req.body;

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
        return res.status(500).json({ error: "Webhook URL not set" });
    }

    const payload = {
        content: `📢 **Event:** ${event}\n📝 **Details:** ${details}`,
    };

    try {
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Discord Webhook Error: ${response.statusText}`);
        }

        res.status(200).json({ message: "Webhook sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to send webhook" });
    }
}
