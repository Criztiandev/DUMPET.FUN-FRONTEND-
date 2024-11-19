import { useEffect, useState } from "react";

interface Props {
  thumbnailFile: string;
}

const ImagePreview = ({ thumbnailFile }: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    if (thumbnailFile) {
      const url = URL.createObjectURL(thumbnailFile as any);
      setPreviewUrl(url);

      // Cleanup
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl("");
    }
  }, [thumbnailFile]);

  return (
    <div className="h-[200px] w-full border rounded-md overflow-hidden">
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="Thumbnail preview"
          className="w-full h-full object-cover"
          onError={() => setPreviewUrl("")}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
          <svg
            className="w-12 h-12 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p>No image selected</p>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
