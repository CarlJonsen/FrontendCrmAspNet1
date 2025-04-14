import React, { useRef } from "react";

interface ImageUploaderProps {
  imageUrl: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  imageUrl,
  onImageChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="image-upload-container" onClick={handleClick}>
      {imageUrl ? (
        <img src={imageUrl} alt="Preview" className="image-preview" />
      ) : (
        <div className="upload-placeholder">
          <span className="camera-icon">📷</span>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={onImageChange}
      />
    </div>
  );
};

export default ImageUploader;
