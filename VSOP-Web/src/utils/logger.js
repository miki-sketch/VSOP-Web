export async function sendLog(action, data = {}) {
  try {
    const { GAS_URL } = await import('../config.js');
    await fetch(GAS_URL, {
      method: 'POST',
      body: JSON.stringify({
        action,
        ...data,
        site: 'VSOP-Web',
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (_) {}
}
