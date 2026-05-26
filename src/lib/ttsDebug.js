/**
 * ttsDebug.js
 *
 * Small, opt-in TTS debug helper.
 * - Exported functions are no-ops unless enabled.
 * - Enable at build-time with Vite env `VITE_TTS_DEBUG=true` or
 *   at runtime by setting `window.__ENABLE_TTS_DEBUG = true` before app load.
 * - Stores recent debug entries on `window.__ttsDebugLog` for later inspection.
 *
 * Keep this file separate so it can be tree-shaken away in production builds
 * when the flag is disabled.
 */

// Build-time check (Vite): set VITE_TTS_DEBUG=true to enable during dev/build
// NOTE: debug is intentionally build-time only to avoid runtime user toggles.
const BUILD_FLAG = typeof import.meta !== 'undefined' && !!import.meta.env?.VITE_TTS_DEBUG;

// Debug enabled only when the build-time flag is present. No runtime override.
const ENABLED = BUILD_FLAG;

/**
 * Returns whether debug logging is enabled.
 */
export const isTtsDebugEnabled = () => ENABLED;

/**
 * Log a structured TTS event. Kept minimal to avoid filling console in production.
 * Events are appended to `window.__ttsDebugLog` (max 100 entries) and also
 * emitted to console.debug when enabled.
 *
 * Expected event shape: { type: 'prompt'|'external-speak'|'native-speak'|'status', ... }
 */
export const logTtsEvent = (evt = {}) => {
  if (!isTtsDebugEnabled()) return;

  try {
    // minimal console output for dev inspection
    console.debug('[TTS DEBUG]', evt);

    // persistent in-memory buffer for later retrieval
    if (typeof window !== 'undefined') {
      window.__ttsDebugLog = window.__ttsDebugLog || [];
      window.__ttsDebugLog.push(Object.assign({ ts: Date.now() }, evt));
      // keep buffer bounded
      if (window.__ttsDebugLog.length > 100) window.__ttsDebugLog.shift();
    }
  } catch (e) {
    // don't allow debug logging to break app
  }
};

/**
 * Helper to quickly clear the debug buffer (useful in dev console)
 */
export const clearTtsDebugLog = () => {
  if (typeof window !== 'undefined') window.__ttsDebugLog = [];
};

export default {
  isTtsDebugEnabled,
  logTtsEvent,
  clearTtsDebugLog
};
