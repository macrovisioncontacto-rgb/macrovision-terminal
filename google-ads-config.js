/**
 * Google Ads Configuration
 * Macrovisión - Financial Terminal
 * 
 * IMPORTANTE: Reemplaza los siguientes valores con tu información real:
 * 1. ca-pub-YOUR_PUBLISHER_ID → Tu Publisher ID de Google AdSense
 * 2. SLOT_ID_1, SLOT_ID_2, etc → Los Slot IDs de tus unidades publicitarias
 */

const GOOGLE_ADS_CONFIG = {
  // Tu Publisher ID - Obtenlo de Google AdSense
  // Formato: ca-pub-XXXXXXXXXXXXXXXX
  publisherId: 'ca-pub-YOUR_PUBLISHER_ID',
  
  // Ad slot IDs para diferentes ubicaciones
  slots: {
    bannerTop: 'SLOT_ID_1',        // Banner superior (horizontal)
    sidebar: 'SLOT_ID_2',          // Sidebar de mercados (vertical)
    newsSidebar: 'SLOT_ID_3',      // Sidebar de noticias (vertical)
    stickyBottom: 'SLOT_ID_4',     // Sticky bottom derecha (vertical)
  },
  
  // Configuración de formatos
  formats: {
    horizontal: 'horizontal',
    vertical: 'vertical',
    responsive: true,
  },
  
  // Comportamiento de anuncios
  behavior: {
    autoRefresh: true,              // Refrescar anuncios automáticamente
    refreshInterval: 30000,         // Cada 30 segundos
    lazyLoad: true,                 // Cargar anuncios cuando sean visibles
    respectUserPreferences: true,   // Respetar configuración de privacidad
  },
};

/**
 * Inicializar Google Ads
 * Se ejecuta automáticamente cuando el DOM está listo
 */
function initializeGoogleAds() {
  console.log('🎯 Inicializando Google AdSense...');
  
  // Actualizar todos los data-ad-client con el Publisher ID real
  const adElements = document.querySelectorAll('[data-ad-client="ca-pub-YOUR_PUBLISHER_ID"]');
  
  adElements.forEach((element, index) => {
    element.setAttribute('data-ad-client', GOOGLE_ADS_CONFIG.publisherId);
    element.closest('.ad-container')?.classList.remove('loading');
  });
  
  console.log(`✅ ${adElements.length} anuncios configurados`);
  
  // Empujar anuncios a la cola de Google
  if (window.adsbygoogle) {
    try {
      window.adsbygoogle.push({});
      console.log('✅ Anuncios procesados por Google AdSense');
    } catch (err) {
      console.warn('⚠️ Error al procesar anuncios:', err.message);
    }
  }
  
  // Configurar auto-refresh si está habilitado
  if (GOOGLE_ADS_CONFIG.behavior.autoRefresh) {
    setupAutoRefresh();
  }
}

/**
 * Actualizar anuncios automáticamente
 */
function setupAutoRefresh() {
  if (GOOGLE_ADS_CONFIG.behavior.autoRefresh && window.adsbygoogle) {
    setInterval(() => {
      try {
        window.adsbygoogle.push({});
      } catch (err) {
        console.warn('⚠️ Error en auto-refresh:', err.message);
      }
    }, GOOGLE_ADS_CONFIG.behavior.refreshInterval);
  }
}

/**
 * Refrescar anuncios manualmente
 * Úsalo después de cargar contenido dinámico
 */
function refreshGoogleAds() {
  console.log('🔄 Actualizando anuncios...');
  if (window.adsbygoogle) {
    try {
      window.adsbygoogle.push({});
      console.log('✅ Anuncios actualizados');
    } catch (err) {
      console.warn('⚠️ Error al actualizar anuncios:', err.message);
    }
  }
}

/**
 * Mostrar/Ocultar contenedores de anuncios
 * @param {boolean} visible - true para mostrar, false para ocultar
 */
function setAdsVisible(visible) {
  const adContainers = document.querySelectorAll('.ad-container');
  const displayValue = visible ? 'block' : 'none';
  
  adContainers.forEach((container) => {
    container.style.display = displayValue;
  });
  
  console.log(`${visible ? '👁️ Anuncios visibles' : '🙈 Anuncios ocultos'}`);
}

/**
 * Obtener el estado de los anuncios
 * @returns {Object} Estado de cada ubicación de anuncios
 */
function getAdsStatus() {
  const status = {};
  
  Object.entries(GOOGLE_ADS_CONFIG.slots).forEach(([key, slotId]) => {
    const element = document.querySelector(`[data-ad-slot="${slotId}"]`);
    status[key] = {
      slotId: slotId,
      isLoaded: !!element,
      isVisible: element ? element.offsetParent !== null : false,
    };
  });
  
  return status;
}

/**
 * Validar configuración de anuncios
 * @returns {boolean} true si la configuración es válida
 */
function validateAdsConfig() {
  const isValid = GOOGLE_ADS_CONFIG.publisherId !== 'ca-pub-YOUR_PUBLISHER_ID';
  
  if (!isValid) {
    console.warn('⚠️ ADVERTENCIA: Publisher ID no configurado. Reemplaza "ca-pub-YOUR_PUBLISHER_ID" en google-ads-config.js');
  }
  
  // Verificar que los Slot IDs estén configurados
  const hasAllSlots = Object.values(GOOGLE_ADS_CONFIG.slots).every(
    (slot) => slot !== 'SLOT_ID_1' && slot !== 'SLOT_ID_2' && slot !== 'SLOT_ID_3' && slot !== 'SLOT_ID_4'
  );
  
  if (!hasAllSlots) {
    console.warn('⚠️ ADVERTENCIA: Algunos Slot IDs no están configurados correctamente');
  }
  
  return isValid && hasAllSlots;
}

/**
 * Registrar información de depuración
 */
function logAdsDebugInfo() {
  console.group('📊 Google AdSense Debug Info');
  console.log('Configuración:', GOOGLE_ADS_CONFIG);
  console.log('Estado de anuncios:', getAdsStatus());
  console.log('Configuración válida:', validateAdsConfig());
  console.log('Google AdSense cargado:', !!window.adsbygoogle);
  console.groupEnd();
}

/**
 * Exposer funciones globales para consola
 */
window.AdsConfig = {
  init: initializeGoogleAds,
  refresh: refreshGoogleAds,
  setVisible: setAdsVisible,
  getStatus: getAdsStatus,
  validate: validateAdsConfig,
  debug: logAdsDebugInfo,
};

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeGoogleAds);
} else {
  initializeGoogleAds();
}

// Validar configuración al cargar
window.addEventListener('load', () => {
  if (!validateAdsConfig()) {
    console.error('❌ Configura Google AdSense antes de usar anuncios');
  }
});

// Log de depuración en consola
console.log('%c📺 Macrovisión Ads Config', 'color: #ddb65c; font-size: 14px; font-weight: bold;');
console.log('Para ver el estado de los anuncios, ejecuta: AdsConfig.debug()');
