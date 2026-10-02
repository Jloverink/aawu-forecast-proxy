const fetch = (...a) => import('node-fetch').then(m => m.default(...a));

const ALLOW = [
  'aviationweather.gov',
  'tgftp.nws.noaa.gov',
  'mesonet.agron.iastate.edu',
  'api.synopticdata.com',
  'www.ndbc.noaa.gov',
  'services.faa.gov',
  'tidesandcurrents.noaa.gov',
  'forecast.weather.gov',
  'api.weather.gov',
  'graphical.weather.gov',
  'weather.gov',
  'alerts.weather.gov',
  'nwschat.weather.gov',
  'www.wrh.noaa.gov',
  'aawu.arh.noaa.gov',
  'www.weather.gov',
  'webcams.gi.alaska.edu',
  'mxak.org',
  'mxak.cablecar.dev',
  'worldtimeapi.org',
];

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const target = req.query.url;
  if (!target) return res.status(400).json({ error: 'missing url param' });

  let parsed;
  try { parsed = new URL(target); } catch {
    return res.status(400).json({ error: 'invalid url' });
  }

  if (!ALLOW.some(h => parsed.hostname === h || parsed.hostname.endsWith('.' + h))) {
    return res.status(403).json({ error: 'host not allowed' });
  }

  try {
    const upstream = await fetch(target, {
      headers: { 'User-Agent': 'AKS-WxBrief/1.0' },
      timeout: 15000,
    });
    const ct = upstream.headers.get('content-type') || 'text/plain';
    res.setHeader('Content-Type', ct);
    res.setHeader('Cache-Control', 'public, max-age=60');
    const body = await upstream.text();
    res.status(upstream.status).send(body);
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
};
