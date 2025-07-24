import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";

const ImageFrameDownloader = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const downloadImage = async () => {
    if (frameRef.current) {
      const canvas = await html2canvas(frameRef.current);
      const dataUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "framed-image.png";
      link.click();
    }
  };

  return (
    <div className="p-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="mb-4"
      />

      <div
        ref={frameRef}
        className="relative w-[500px] h-[600px] border-[10px] border-gray-700 rounded-xl overflow-hidden"
      >
        <img
          src="/frame.jpeg"
          alt="Frame"
          className="absolute w-full h-full "
        />
        {uploadedImage && (
          <img
            src={uploadedImage}
            alt="Uploaded"
            className="absolute top-[49px] left-[50px] w-[400px] h-[385px] object-cover rounded"
          />
        )}
      </div>

      <button
        onClick={downloadImage}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Download Combined Image
      </button>
    </div>
  );
};

export default ImageFrameDownloader;
