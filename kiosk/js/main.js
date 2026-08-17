import { CONFIG } from "./config.js";

if (localStorage.getItem(CONFIG.STORAGE_KEYS.ACCESS_TOKEN) || localStorage.getItem(CONFIG.STORAGE_KEYS.REFRESH_TOKEN)) {
    window.location.href = 'kiosk.html';
} else {
    window.location.href = 'activation.html';
}