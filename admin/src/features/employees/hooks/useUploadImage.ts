import { type ChangeEvent, useState } from "react";

export function useImageUpload() {
    const [image, setImage] = useState("");
    const [file, setFile] = useState<File | null>(null);

    function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
        const selectedFile = e.target.files?.[0];

        if (!selectedFile) {
            setImage("");
            setFile(null);
            return;
        }

        if (!selectedFile.type.startsWith("image/")) {
            e.target.value = "";
            setImage("");
            setFile(null);
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            if (typeof reader.result === "string") {
                setImage(reader.result);
                setFile(selectedFile);
            }
        };

        reader.readAsDataURL(selectedFile);
    }

    function resetImage() {
        setImage("");
        setFile(null);
    }

    return {
        image,
        file,
        handleImageChange,
        resetImage,
    };
}