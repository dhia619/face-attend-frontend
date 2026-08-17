import { CONFIG } from './config.js';
import { api } from './api.js';


document.addEventListener('DOMContentLoaded', () => {

    /*
    if (localStorage.getItem(CONFIG.STORAGE_KEYS.ACCESS_TOKEN)) {
        window.location.href = 'kiosk.html';
        return;
    }
    */

    const form = document.getElementById('activation-form');

    const codeInput = document.getElementById('activation-code');

    const activationButton = document.getElementById('activation-button');

    const activationError = document.getElementById(
        'activation-code-error'
    );


    const activationCard = document.getElementById(
        'activation-card'
    );

    const activationSuccessCard = document.getElementById(
        'activation-success-card'
    );


    const chooseDeviceContainer = document.getElementById(
        'choose-device'
    );

    const devicesDropdown = document.getElementById(
        'camera-select'
    );

    const cameraInputWrapper = document.getElementById(
        'camera-input-wrapper'
    );

    const cameraError = document.getElementById(
        'camera-error'
    );

    const proceedButton = document.getElementById(
        'confirm-camera-button'
    );

    const cameraPreview = document.getElementById(
        'camera-preview'
    );

    const cameraPreviewWrapper = document.getElementById(
        'camera-preview-wrapper'
    );

let cameraStream = null;

    codeInput.addEventListener('input', (e) => {

        e.target.value = e.target.value
            .toUpperCase()
            .replace(/\s+/g, '');

        hideActivationError();
    });

    form.addEventListener('submit', async (e) => {

        e.preventDefault();
        const code = codeInput.value.trim();

        if (!code) {
            showActivationError(
                'Please enter an activation code.'
            );
            return;
        }

        if (code.length !== 14) {
            showActivationError(
                'Activation code must be 14 characters long.'
            );
            return;
        }

        if (
            !/^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(code)
        ) {
            showActivationError(
                'Activation code format is XXXX-XXXX-XXXX.'
            );
            return;
        }

        hideActivationError();
        setLoading(true);
        /*
        try {

            const data = await api.post(
                '/devices/activate',
                {
                    activation_code: code
                }
            );


            localStorage.setItem(
                CONFIG.STORAGE_KEYS.ACCESS_TOKEN,
                data.access_token
            );


            localStorage.setItem(
                CONFIG.STORAGE_KEYS.REFRESH_TOKEN,
                data.refresh_token
            );


            showActivationSuccess();

        } catch (err) {

            showActivationError(err.message);

            setLoading(false);

        }
        */
        showActivationSuccess();

    });

    devicesDropdown.addEventListener('change', async () => {

        if (!devicesDropdown.value) return;

        clearCameraError();

        try {

            await startCameraPreview(
                devicesDropdown.value
            );
        } catch (error) {
            console.error(
                'Could not start camera preview:',
                error
            );
            cameraError.textContent =
                'Unable to start the selected camera.';
            showCameraError();
        }
    });

    proceedButton.addEventListener('click', () => {

        const selectedCamera = devicesDropdown.value;


        if (!selectedCamera) {

            showCameraError();

            return;
        }


        clearCameraError();


        console.log(
            'Selected camera:',
            selectedCamera
        );


        // Example: store selected camera
        localStorage.setItem(
            'selected_camera_id',
            selectedCamera
        );


        // Continue to kiosk
        // window.location.href = 'kiosk.html';

    });

    function showActivationError(message) {
        activationError.textContent = message;
        activationError.classList.add('show');
    }


    function hideActivationError() {
        activationError.textContent = '';
        activationError.classList.remove('show');
    }

    function showCameraError() {
        cameraInputWrapper.classList.add(
            'input-error'
        );
        cameraError.classList.add(
            'show'
        );
    }


    function clearCameraError() {

        cameraInputWrapper.classList.remove(
            'input-error'
        );

        cameraError.classList.remove(
            'show'
        );

    }

    function setLoading(isLoading) {

        const loader = document.getElementById(
            'activation-loader'
        );

        const square = document.getElementById(
            'activation-logo-square'
        );


        activationButton.disabled = isLoading;

        loader.classList.toggle(
            'hidden',
            !isLoading
        );

        square.classList.toggle(
            'hidden',
            isLoading
        );

    }

    function showActivationSuccess() {

        activationCard.classList.add(
            'hidden'
        );

        activationSuccessCard.classList.remove(
            'hidden'
        );


        setTimeout(() => {

            activationSuccessCard.classList.add(
                'hidden'
            );

            showConfigDevice();

        }, 1500);

    }

    async function showConfigDevice() {

        chooseDeviceContainer.classList.remove(
            'hidden'
        );


        try {

            await loadCameras();

        } catch (error) {

            console.error(
                'Could not load cameras:',
                error
            );


            cameraError.textContent =
                'Unable to access camera devices.';

            showCameraError();

        }

    }

    async function loadCameras() {

        const cameras = await getCameras();


        // Clear old options
        devicesDropdown.innerHTML = '';


        // Add placeholder
        const placeholder = document.createElement(
            'option'
        );

        placeholder.value = '';

        placeholder.textContent =
            'Choose a camera';

        placeholder.disabled = true;

        placeholder.selected = true;


        devicesDropdown.appendChild(
            placeholder
        );


        // No cameras found
        if (cameras.length === 0) {

            placeholder.textContent =
                'No cameras found';

            return;
        }


        // Add cameras
        cameras.forEach(
            (camera, index) => {
                const option =
                    document.createElement(
                        'option'
                    );
                option.value = camera.deviceId;
                option.textContent = camera.label || `Camera ${index + 1}`;
                devicesDropdown.appendChild(option);
            }
        );

    }

    async function getCameras() {

        // Ask permission first so browser
        // can expose camera labels.
        const stream =
            await navigator.mediaDevices.getUserMedia({
                video: true
            });

        // We only needed the stream
        // to obtain permission.
        stream.getTracks().forEach(track => track.stop());
        const devices =
            await navigator.mediaDevices.enumerateDevices();

        return devices.filter(
            device =>
                device.kind === 'videoinput'
        );

    }

    async function startCameraPreview(deviceId) {

        stopCameraPreview();
        cameraStream =
            await navigator.mediaDevices.getUserMedia({
                video: {
                    deviceId: {
                        exact: deviceId
                    }
                },
                audio: false
            });

        cameraPreview.srcObject = cameraStream;
        cameraPreviewWrapper.classList.remove(
            'hidden'
        );

    }

    function stopCameraPreview() {
        if (!cameraStream) return;
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
        cameraPreview.srcObject = null;
    }

});