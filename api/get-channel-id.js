export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ ok: false, error: "Method not allowed" });

  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return res.status(500).json({ ok: false, error: "TELEGRAM_BOT_TOKEN is not configured" });

  try {
    const response = await fetch(
      "https://api.telegram.org/bot" + token + "/getChat?chat_id=" + encodeURIComponent("@itsJackpotKing")
    );
    const data = await response.json();

    if (!response.ok || !data.ok) {
      return res.status(502).json({
        ok: false,
        error: data.description || "Telegram getChat failed"
      });
    }

    return res.status(200).json({
      ok: true,
      channel_id: data.result.id,
      username: data.result.username || "itsJackpotKing",
      title: data.result.title || null
    });
  } catch (error) {
    console.error("Get channel ID error:", error);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
}