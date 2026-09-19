import { useState } from "react";
import { useParams } from "react-router";
import { useGetDevice, useUpdateDevice } from "../hooks/useDevices";

import styles from "../../../styles/ManagementPage.module.css";

import Loader from "../../../components/Loader/Loader";
import Toast from "../../../components/Toast/Toast";
import DeviceForm from "../components/DeviceForm";
import PageError from "../../../components/PageError/PageError";

function EditDevicePage() {
    const { id } = useParams();
    const deviceId = Number(id);

    const { data: device, isLoading: deviceLoading } = useGetDevice(deviceId);

    const updateDevice = useUpdateDevice();

    const [isEnabled, setIsEnabled] = useState<boolean | null>(null);

    if (deviceLoading) {
        return (
            <div className={styles.main}>
                <Loader />
            </div>
        );
    }

    if (!device) {
        return (
            <div className={styles.main}>
                <PageError message="Device not found :(" />
            </div>
        );
    }

    const enabled =
        isEnabled !== null
            ? isEnabled
            : device.status === "active";

    const handleToggle = () => {
        const nextValue = !enabled;

        setIsEnabled(nextValue);

        updateDevice.mutate(
            {
                id: deviceId,
                payload: {
                    name: undefined,
                    enabled: nextValue,
                },
            },
            {
                onError: () => {
                    setIsEnabled(enabled);
                },
            }
        );
    };

    return (
        <div className={styles.main}>
            {updateDevice.isSuccess && (
                <Toast message="Device updated successfully" />
            )}

            {updateDevice.isError && (
                <Toast
                    type="error"
                    message={
                        updateDevice.error?.response?.status === 422
                            ? updateDevice.error?.response?.data?.detail?.[0]
                                  ?.field +
                              " " +
                              updateDevice.error?.response?.data?.detail?.[0]
                                  ?.message
                            : updateDevice.error?.response?.data?.detail ??
                              "An error occurred while updating device"
                    }
                />
            )}

            <div className={styles.deviceHeader}>
                <p className={styles.title}>Edit Device</p>

                {device.status !== "pending" && (
                    <div className={styles.toggleGroup}>
                        <span
                            className={
                                enabled
                                    ? styles.deviceEnabled
                                    : styles.deviceDisabled
                            }
                        >
                            {enabled
                                ? "Camera enabled"
                                : "Camera disabled"}
                        </span>

                        <button
                            type="button"
                            role="switch"
                            aria-checked={enabled}
                            className={`${styles.toggle} ${
                                enabled ? styles.toggleActive : ""
                            }`}
                            onClick={handleToggle}
                            disabled={updateDevice.isPending}
                        >
                            <span className={styles.toggleThumb} />
                        </button>
                    </div>
                )}
            </div>

            <DeviceForm
                mode="edit"
                initialValues={{
                    deviceName: device.name,
                    deviceType: device.type,
                    url: device.rtsp_url ?? "",
                }}
                isPending={updateDevice.isPending}
                onSubmit={(values) =>
                    updateDevice.mutate({
                        id: deviceId,
                        payload: {
                            name: values.deviceName,
                            ...(values.deviceType === "ip-camera" && {
                                rtsp_url: values.url,
                            }),
                        },
                    })
                }
            />
        </div>
    );
}

export default EditDevicePage;