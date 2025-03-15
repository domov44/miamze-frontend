"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { Upload, X, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
    image: string;
    setImage: (image: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ image, setImage }) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            processImageFile(e.target.files[0]);
        }
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processImageFile(e.dataTransfer.files[0]);
        }
    };

    const processImageFile = (file: File) => {
        if (!file.type.startsWith("image/")) {
            toast.error("Le fichier doit être une image.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target?.result) {
                setImage(event.target.result.toString());
                toast.success("Image ajoutée avec succès !");
            }
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImage("");
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
            />

            {image ? (
                <div className="mt-1 relative rounded-md overflow-hidden">
                    <img src={image} alt="preview" className="w-full h-64 object-cover" />
                    <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 rounded-full"
                        onClick={removeImage}
                    >
                        <X size={18} />
                    </Button>
                </div>
            ) : (
                <div
                    className={`mt-1 border-2 border-dashed rounded-md p-8 text-center transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-gray-300"}`}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={triggerFileInput}
                >
                    <div className="flex flex-col items-center justify-center space-y-2 cursor-pointer">
                        <div className="p-4 rounded-full bg-gray-100">
                            {isDragging ? <Upload className="w-8 h-8 text-primary" /> : <ImageIcon className="w-8 h-8 text-gray-400" />}
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium">
                                {isDragging ? "Déposez l'image ici" : "Cliquez ou glissez une image ici"}
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG, WEBP jusqu'à 5MB</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;