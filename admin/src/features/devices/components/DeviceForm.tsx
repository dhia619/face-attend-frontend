import { useState, type SubmitEvent } from "react";

import FormField from "../../../components/FormField/FormField";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import ButtonLoader from "../../../components/ButtonLoader/ButtonLoader";
import Card from "../../../components/Card/Card";

import styles from "./DeviceForm.module.css";

type DeviceType = "kiosk" | "ip-camera";

type DeviceFormValues = {
    deviceName: string;
    deviceType?: DeviceType;
    url?: string;
};

type DeviceFormProps = {
    mode: "create" | "edit";
    initialValues?: DeviceFormValues;
    isPending: boolean;
    onSubmit: (values: DeviceFormValues) => void;
};

function DeviceForm({
    mode,
    initialValues,
    isPending,
    onSubmit,
}: DeviceFormProps) {
    const [deviceName, setDeviceName] = useState(
        initialValues?.deviceName ?? ""
    );

    const [deviceType, setDeviceType] = useState<DeviceType>(
        initialValues?.deviceType ?? "kiosk"
    );

    const [url, setUrl] = useState(initialValues?.url ?? "");

    const [deviceNameError, setDeviceNameError] = useState("");
    const [urlError, setUrlError] = useState("");

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        setDeviceNameError("");
        setUrlError("");

        const trimmedDeviceName = deviceName.trim();
        const trimmedUrl = url.trim();

        if (!trimmedDeviceName) {
            setDeviceNameError("Please enter a device name");
            return;
        }

        if (trimmedDeviceName.length < 4) {
            setDeviceNameError(
                "Device name must be at least 4 characters long"
            );
            return;
        }

        if (deviceType === "ip-camera" && !trimmedUrl) {
            setUrlError("Please enter the IP camera URL");
            return;
        }

        onSubmit({
            deviceName: trimmedDeviceName,
            deviceType,
            ...(deviceType === "ip-camera" && {
                url: trimmedUrl,
            }),
        });
    }

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <FormField
                    label="Device Name"
                    htmlFor="device-name"
                    error={deviceNameError}
                >
                    <Input
                        id="device-name"
                        value={deviceName}
                        placeholder="e.g. Main Entrance Camera"
                        onChange={(e) => {
                            setDeviceName(e.target.value);
                            setDeviceNameError("");
                        }}
                    />
                </FormField>

                {mode === "create" && (
                    <div className={styles.deviceTypeOptions}>
                        <label
                            className={`${styles.deviceTypeOption} ${
                                deviceType === "kiosk"
                                    ? styles.selected
                                    : ""
                            }`}
                        >
                            <input
                                type="radio"
                                name="device-type"
                                value="kiosk"
                                checked={deviceType === "kiosk"}
                                onChange={() => {
                                    setDeviceType("kiosk");
                                    setUrl("");
                                    setUrlError("");
                                }}
                            />

                            <div>
                                <strong>Kiosk</strong>
                                <span>
                                    Uses a tablet, PC or smartphone camera.
                                </span>
                            </div>
                        </label>

                        <label
                            className={`${styles.deviceTypeOption} ${
                                deviceType === "ip-camera"
                                    ? styles.selected
                                    : ""
                            }`}
                        >
                            <input
                                type="radio"
                                name="device-type"
                                value="ip-camera"
                                checked={deviceType === "ip-camera"}
                                onChange={() => setDeviceType("ip-camera")}
                            />

                            <div>
                                <strong>IP Camera</strong>
                                <span>
                                    Connects directly using an RTSP stream.
                                </span>
                            </div>
                        </label>
                    </div>
                )}

                {deviceType === "ip-camera" && (
                    <FormField
                        label="Camera URL"
                        htmlFor="camera-url"
                        error={urlError}
                    >
                        <Input
                            id="camera-url"
                            value={url}
                            placeholder="e.g. rtsp://username:password@192.168.1.20:554"
                            onChange={(e) => {
                                setUrl(e.target.value);
                                setUrlError("");
                            }}
                        />
                    </FormField>
                )}

                <Button type="submit" disabled={isPending}>
                    {isPending ? (
                        <ButtonLoader />
                    ) : mode === "create" ? (
                        "Create"
                    ) : (
                        "Confirm"
                    )}
                </Button>
            </form>
        </Card>
    );
}

export default DeviceForm;