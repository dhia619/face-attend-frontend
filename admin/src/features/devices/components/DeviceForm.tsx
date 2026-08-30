import { useState, type SubmitEvent } from "react";

import FormField from "../../../components/FormField/FormField";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import ButtonLoader from "../../../components/ButtonLoader/ButtonLoader";
import Card from "../../../components/Card/Card";

type DeviceFormValues = {
    deviceName: string;
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

    const [deviceName, setDeviceName] = useState(initialValues?.deviceName ?? "");
    const [deviceNameError, setDeviceNameError] = useState<string>("");

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!deviceName.trim()) {
            setDeviceNameError("Please enter a device name");
            return;
        } else if (deviceName.trim().length < 4) {
            setDeviceNameError("Device name must be at least 4 characters long");
            return;
        }

        onSubmit({
            deviceName: deviceName.trim(),
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
                        }}
                    />
                </FormField>
                <Button
                    type="submit"
                    disabled={isPending}
                >
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