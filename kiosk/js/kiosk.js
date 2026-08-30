import { CONFIG } from './config.js';
import { api } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {

    const accessToken = localStorage.getItem(CONFIG.STORAGE_KEYS.ACCESS_TOKEN);
    const deviceId = localStorage.getItem(CONFIG.STORAGE_KEYS.DEVICE_ID);

    if (!accessToken || !deviceId) {
        window.location.href = 'activation.html';
        return;
    }

    let data = {}
    try {
        data = await api.get('/devices/me');
    } catch {}

    const deviceName = document.getElementById('device-name');
    const kioskStatus = document.getElementById('kiosk-status');
    deviceName.textContent = data.name;
    kioskStatus.textContent = data.status || 'Unknown';

    if (data.status !== 'active') {
        document.getElementById('status-dot').style.backgroundColor = 'red';
        return;
    }
    
    const cameraPreview = document.getElementById('camera-preview');

    const cameraStream = await navigator.mediaDevices.getUserMedia({
        video: {
            deviceId: {
                exact: deviceId
            }
        },
        audio: false
    });

    cameraPreview.srcObject = cameraStream;
    const interval = setInterval(async () => {
        const employeeData = await api.post(
            '/recognition/events',
            {
                device_id: data.id,
                face_image: captureFrame(),
            }
        );
        resetRecognitionResult();
        if (employeeData.full_name) showRecognitionResult(employeeData);
    }, CONFIG.RECOGNITION_INTERVAL);

    const employeePlaceholder = document.querySelector(".employee-placeholder");
    const employeeName = document.getElementById("employeeName");
    const actionText = document.getElementById("actionText");
    const timeText = document.getElementById("timeText");

    function showRecognitionResult(data) {
        employeePlaceholder.classList.add("hidden");
        employeeName.textContent = data.full_name;
        actionText.classList.remove("checked-in", "checked-out", "not-recognized" );

        if (data.check_type === "check_in") {
            actionText.textContent = data.already_recorded
                ? "Already Checked In"
                : "Checked In";
            actionText.classList.add("checked-in");
        }

        if (data.check_type === "check_out") {
            actionText.textContent = data.already_recorded
                ? "Already Checked Out"
                : "Checked Out";
            actionText.classList.add("checked-out");
        }

        const date = new Date(data.timestamp);
        timeText.textContent = date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
    }

    function resetRecognitionResult() {
        employeeName.textContent = "";
        actionText.textContent = "";
        timeText.textContent = "";

        employeePlaceholder.classList.remove("hidden");
    }

    function captureFrame() {
        const canvas = document.createElement('canvas');

        canvas.width = cameraPreview.videoWidth;
        canvas.height = cameraPreview.videoHeight;

        const ctx = canvas.getContext('2d');

        ctx.drawImage(cameraPreview, 0, 0, canvas.width, canvas.height);

        return canvas.toDataURL('image/jpeg', 0.9);
    }

});