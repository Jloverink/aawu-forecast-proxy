const fetch = (...a) => import('node-fetch').then(m => m.default(...a));

const FAA_BASE = 'https://weathercams.faa.gov/api/';
const CACHE = new Map();
const CACHE_TTL = 5 * 60000; // 5 minutes

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const siteId = req.query.siteId;
  if (!siteId) return res.status(400).json({ error: 'missing siteId' });

  // check cache
  const cacheKey = String(siteId);
  const cached = CACHE.get(cacheKey);
  if (cached && (Date.now() - cached.t) < CACHE_TTL) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, max-age=120');
    res.setHeader('X-Cache', 'HIT');
    return res.status(200).send(cached.body);
  }

  const url = FAA_BASE + 'summary?siteId=' + encodeURIComponent(siteId);

  try {
    const upstream = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Origin': 'https://weathercams.faa.gov',
        'Referer': 'https://weathercams.faa.gov/',
        'Accept': 'application/json, text/plain, */*',
      },
      timeout: 12000,
    });

    if (!upstream.ok) {
      return res.status(upstream.status).json({
        error: 'upstream ' + upstream.status,
      });
    }

    const body = await upstream.text();

    // cache successful response
    CACHE.set(cacheKey, { t: Date.now(), body });

    // trim cache if it gets large
    if (CACHE.size > 200) {
      const cutoff = Date.now() - CACHE_TTL;
      for (const [k, v] of CACHE) {
        if (v.t < cutoff) CACHE.delete(k);
      }
    }

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, max-age=120');
    res.setHeader('X-Cache', 'MISS');
    res.status(200).send(body);
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
};
