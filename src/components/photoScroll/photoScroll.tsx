import React, { useRef, useState } from "react";

type ImageData = {
  id: number;
  src: string;
  description: string;
  link?: string;
};

type ImageGalleryProps = {
  images: ImageData[];
};

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const baseURL = useRef(window.location.origin);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [showSlider, setShowSlider] = useState(false);
  const [sliderValue, setSliderValue] = useState(images.length);
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setSliderValue(newValue);
    const index = images.length - newValue;
    if (index >= 0 && index < images.length) {
      imageRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // show an image one by one streached to the screen, and scroll to the next image when the user scrolls
  // description is displayed on the image

  // as the user scrolls, description changes
  // when the user scrolls to the next image, the description of the next image is displayed

  return (
    <>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed left-4 top-4 z-20 rounded-full bg-gray-200 p-2 text-gray-700 opacity-50 transition-opacity hover:opacity-100"
        title="ページトップに戻る"
      >
        ↑
      </button>
      <button
        onClick={() =>
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          })
        }
        className="fixed bottom-20 left-4 z-20 rounded-full bg-gray-200 p-2 text-gray-700 opacity-50 transition-opacity hover:opacity-100"
        title="ページ下に移動"
      >
        ↓
      </button>
      <div className="fixed right-4 top-1/2 z-20 -translate-y-1/2 transform">
        {showSlider ? (
          <div className="relative">
            <input
              type="range"
              min="1"
              max={images.length.toString()}
              value={sliderValue}
              onChange={handleSliderChange}
              className="accent-blue-500"
              style={{ transform: "rotate(-90deg)", width: "150px" }}
            />
            <button
              onClick={() => setShowSlider(false)}
              className="mt-2 rounded bg-red-500 p-1 text-xs text-white"
              title="閉じる"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowSlider(true)}
            className="rounded bg-gray-500 p-2 opacity-50 transition-colors duration-300 hover:bg-gray-600 hover:opacity-100"
            title="ページ移動"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 11l5-5 5 5M7 13l5 5 5-5"
              />
            </svg>
          </button>
        )}
      </div>
      <div className="h-screen w-fit snap-y snap-mandatory overflow-y-scroll">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="relative snap-center snap-always"
            ref={(el: HTMLDivElement | null) => {
              imageRefs.current[index] = el;
            }}
            data-index={index}
          >
            <img
              src={image.src}
              alt={`Image ${image.id}`}
              className="h-screen w-full object-cover"
            />

            <div className="pointer-events-none absolute bottom-0 right-0 whitespace-pre-wrap rounded bg-black bg-opacity-70 p-3 text-lg text-white transition-opacity duration-300">
              {image.link ? (
                <a
                  href={`${baseURL.current}${image.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto text-yellow-300 hover:text-yellow-400"
                >
                  {image.description}
                </a>
              ) : (
                image.description
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageGallery;
