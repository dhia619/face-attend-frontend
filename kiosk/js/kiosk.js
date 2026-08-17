import { CONFIG } from './config.js';
import { api } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {

    if (!localStorage.getItem(CONFIG.STORAGE_KEYS.ACCESS_TOKEN)) {
        window.location.href = 'activation.html';
        return;
    }

    const data = await api.get('/devices/me');

    const deviceName = document.getElementById('device-name');

    deviceName.textContent = data.name

});