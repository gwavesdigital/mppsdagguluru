// ==========================================
// AP Schools PWA - Core Shared Logic & Router
// An initiative of @VALIASS team
// ==========================================

// Global Secret Verification for VALIASS Team Activation / Reset
function verifySchoolActivation(code) {
  // Authorized activation code for VALIASS team distribution
  const validCodes = ['VALIASS2026', 'APSCHOOLS2026', 'VALIASS123', '8985361991'];
  return validCodes.includes(code.trim());
}

// Register Service Worker for Offline PWA Capabilities
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('../sw.js')
      .then((reg) => {
        console.log('AP Schools Service Worker registered successfully:', reg.scope);
      })
      .catch((err) => {
        console.log('Service Worker registration failed:', err);
      });
  });
}
