import { useEffect, useState } from "react";

import Toast from "../../../components/Toast/Toast";
import DeviceForm from "../components/DeviceForm";
import ActivationCodeDialog from "../components/ActivationCodeDialog";

import styles from "../../../styles/ManagementPage.module.css";

import { useCreateDevice } from "../hooks/useDevices";

function CreateDevicePage() {
    const createDevice = useCreateDevice();

    const [activationDialogOpen, setActivationDialogOpen] = useState<boolean>(false);

    useEffect(() => {
        if (createDevice.isSuccess && createDevice.data?.device_activation_code) {
            setActivationDialogOpen(true);
        }
    }, [createDevice.isSuccess, createDevice.data?.device_activation_code]);

    return (
        <div className={styles.main}>
            {createDevice.isSuccess && (
                <>
                    <Toast message="Device created successfully" />
                    {createDevice.data?.device_activation_code && activationDialogOpen && (
                        <ActivationCodeDialog
                            activationCode={createDevice.data.device_activation_code}
                            onCancel={() => setActivationDialogOpen(false)}
                        />
                    )}
                </>
            )}

            {createDevice.isError && (
                <Toast
                    type="error"
                    message={
                        createDevice.error?.response?.status === 422
                            ? createDevice.error?.response?.data?.detail?.[0]?.field +
                            " " +
                            createDevice.error?.response?.data?.detail?.[0]?.message
                            : createDevice.error?.response?.data?.detail ??
                            "An error occurred while creating device"
                    }
                />
            )}

            <p className={styles.title}>Create new Device</p>

            <DeviceForm
                mode="create"
                isPending={createDevice.isPending}
                onSubmit={(values) =>
                    createDevice.mutate({
                        name: values.deviceName,
                        type: values.deviceType,
                        rtsp_url: values.url,
                    })
                }
            />
        </div>
    );
}

export default CreateDevicePage;