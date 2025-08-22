// my-app/api/health.js  (Vercel — Node)
export default function handler(req, res) {
  res.status(200).json({ ok: true, time: new Date().toISOString() });
}
