import React, { useState, useRef, useEffect } from "react";

// Import the SVG as a string
const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
  <!-- Background -->
  <rect width="500" height="500" fill="#f0f0f0" />
  
  <!-- Frame 1 - 0 degrees -->
  <g id="frame1">
    <circle cx="250" cy="250" r="150" fill="#ff5f6d" stroke="#333" stroke-width="4"/>
    <text x="250" y="80" text-anchor="middle" font-size="24" font-weight="bold">Frame 1/8</text>
    <polygon points="350,250 250,200 250,300" fill="#fff" stroke="#333" stroke-width="2"/>
    <text x="250" y="255" text-anchor="middle" font-size="36" font-weight="bold" fill="#fff">0°</text>
  </g>
  
  <!-- Frame 2 - 45 degrees -->
  <g id="frame2" style="display:none">
    <circle cx="250" cy="250" r="150" fill="#4e54c8" stroke="#333" stroke-width="4"/>
    <text x="250" y="80" text-anchor="middle" font-size="24" font-weight="bold">Frame 2/8</text>
    <polygon points="320,320 250,200 180,320" fill="#fff" stroke="#333" stroke-width="2" transform="rotate(45 250 250)"/>
    <text x="250" y="255" text-anchor="middle" font-size="36" font-weight="bold" fill="#fff">45°</text>
  </g>
  
  <!-- Frame 3 - 90 degrees -->
  <g id="frame3" style="display:none">
    <circle cx="250" cy="250" r="150" fill="#11998e" stroke="#333" stroke-width="4"/>
    <text x="250" y="80" text-anchor="middle" font-size="24" font-weight="bold">Frame 3/8</text>
    <polygon points="250,350 200,250 300,250" fill="#fff" stroke="#333" stroke-width="2"/>
    <text x="250" y="255" text-anchor="middle" font-size="36" font-weight="bold" fill="#fff">90°</text>
  </g>
  
  <!-- Frame 4 - 135 degrees -->
  <g id="frame4" style="display:none">
    <circle cx="250" cy="250" r="150" fill="#ee0979" stroke="#333" stroke-width="4"/>
    <text x="250" y="80" text-anchor="middle" font-size="24" font-weight="bold">Frame 4/8</text>
    <polygon points="180,320 250,200 320,320" fill="#fff" stroke="#333" stroke-width="2" transform="rotate(135 250 250)"/>
    <text x="250" y="255" text-anchor="middle" font-size="36" font-weight="bold" fill="#fff">135°</text>
  </g>
  
  <!-- Frame 5 - 180 degrees -->
  <g id="frame5" style="display:none">
    <circle cx="250" cy="250" r="150" fill="#8e2de2" stroke="#333" stroke-width="4"/>
    <text x="250" y="80" text-anchor="middle" font-size="24" font-weight="bold">Frame 5/8</text>
    <polygon points="150,250 250,300 250,200" fill="#fff" stroke="#333" stroke-width="2"/>
    <text x="250" y="255" text-anchor="middle" font-size="36" font-weight="bold" fill="#fff">180°</text>
  </g>
  
  <!-- Frame 6 - 225 degrees -->
  <g id="frame6" style="display:none">
    <circle cx="250" cy="250" r="150" fill="#fc4a1a" stroke="#333" stroke-width="4"/>
    <text x="250" y="80" text-anchor="middle" font-size="24" font-weight="bold">Frame 6/8</text>
    <polygon points="180,180 250,300 320,180" fill="#fff" stroke="#333" stroke-width="2" transform="rotate(45 250 250)"/>
    <text x="250" y="255" text-anchor="middle" font-size="36" font-weight="bold" fill="#fff">225°</text>
  </g>
  
  <!-- Frame 7 - 270 degrees -->
  <g id="frame7" style="display:none">
    <circle cx="250" cy="250" r="150" fill="#00b09b" stroke="#333" stroke-width="4"/>
    <text x="250" y="80" text-anchor="middle" font-size="24" font-weight="bold">Frame 7/8</text>
    <polygon points="250,150 300,250 200,250" fill="#fff" stroke="#333" stroke-width="2"/>
    <text x="250" y="255" text-anchor="middle" font-size="36" font-weight="bold" fill="#fff">270°</text>
  </g>
  
  <!-- Frame 8 - 315 degrees -->
  <g id="frame8" style="display:none">
    <circle cx="250" cy="250" r="150" fill="#ad5389" stroke="#333" stroke-width="4"/>
    <text x="250" y="80" text-anchor="middle" font-size="24" font-weight="bold">Frame 8/8</text>
    <polygon points="320,180 250,300 180,180" fill="#fff" stroke="#333" stroke-width="2" transform="rotate(135 250 250)"/>
    <text x="250" y="255" text-anchor="middle" font-size="36" font-weight="bold" fill="#fff">315°</text>
  </g>
  
  <!-- Border -->
  <rect width="500" height="500" fill="none" stroke="#333" stroke-width="2" />
  
  <!-- 360 Indicator -->
  <g transform="translate(400, 50)">
    <circle cx="0" cy="0" r="25" fill="#333" />
    <text x="0" y="5" text-anchor="middle" font-size="16" font-weight="bold" fill="#fff">360°</text>
  </g>
</svg>`;

// Function to create SVG frames from the base SVG string
const createSVGFrames = () => {
  const frames = [];
  for (let i = 1; i <= 8; i++) {
    // Create a modified SVG for each frame by showing only the current frame
    let frameSvg = svgString;
    for (let j = 1; j <= 8; j++) {
      if (j === i) {
        // Show current frame
        frameSvg = frameSvg.replace(
          `id="frame${j}" style="display:none"`,
          `id="frame${j}"`
        );
      } else if (
        j !== i &&
        !frameSvg.includes(`id="frame${j}" style="display:none"`)
      ) {
        // Hide other frames
        frameSvg = frameSvg.replace(
          `id="frame${j}"`,
          `id="frame${j}" style="display:none"`
        );
      }
    }
    frames.push(
      `data:image/svg+xml;charset=utf-8,${encodeURIComponent(frameSvg)}`
    );
  }
  return frames;
};

const ProductView360: React.FC<{
  className?: string;
  altText?: string;
}> = ({ className = "", altText = "Product 360 View" }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const sensitivity = 5;
  const autoRotateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Generate SVG frames
  const frames = createSVGFrames();
  const totalFrames = frames.length;

  // Auto-rotation functionality
  useEffect(() => {
    if (isAutoRotating) {
      autoRotateIntervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % totalFrames);
      }, 150);
    } else if (autoRotateIntervalRef.current) {
      clearInterval(autoRotateIntervalRef.current);
    }

    return () => {
      if (autoRotateIntervalRef.current) {
        clearInterval(autoRotateIntervalRef.current);
      }
    };
  }, [isAutoRotating, totalFrames]);

  // Manual rotation via drag
  useEffect(() => {
    if (!containerRef.current) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (isAutoRotating) {
        setIsAutoRotating(false);
      }
      isDragging.current = true;
      startX.current = e.clientX;
      containerRef.current?.classList.add("cursor-grabbing");
      e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;

      const deltaX = e.clientX - startX.current;

      if (Math.abs(deltaX) >= sensitivity) {
        const framesToMove = Math.floor(Math.abs(deltaX) / sensitivity);

        if (framesToMove > 0) {
          setCurrentImageIndex((prev) => {
            const direction = deltaX > 0 ? 1 : -1;
            let newIndex = (prev + direction * framesToMove) % totalFrames;
            if (newIndex < 0) newIndex = totalFrames + newIndex;
            return newIndex;
          });

          startX.current = e.clientX;
        }
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      containerRef.current?.classList.remove("cursor-grabbing");
    };

    const handleMouseLeave = () => {
      isDragging.current = false;
      containerRef.current?.classList.remove("cursor-grabbing");
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (isAutoRotating) {
        setIsAutoRotating(false);
      }
      isDragging.current = true;
      startX.current = e.touches[0].clientX;
      e.preventDefault();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;

      const deltaX = e.touches[0].clientX - startX.current;

      if (Math.abs(deltaX) >= sensitivity) {
        const framesToMove = Math.floor(Math.abs(deltaX) / sensitivity);

        if (framesToMove > 0) {
          setCurrentImageIndex((prev) => {
            const direction = deltaX > 0 ? 1 : -1;
            let newIndex = (prev + direction * framesToMove) % totalFrames;
            if (newIndex < 0) newIndex = totalFrames + newIndex;
            return newIndex;
          });

          startX.current = e.touches[0].clientX;
        }
      }
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    const element = containerRef.current;

    element.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    element.addEventListener("mouseleave", handleMouseLeave);

    element.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    element.addEventListener("touchmove", handleTouchMove, { passive: false });
    element.addEventListener("touchend", handleTouchEnd);

    return () => {
      element.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      element.removeEventListener("mouseleave", handleMouseLeave);

      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [totalFrames, isAutoRotating]);

  // Handle manual navigation
  const rotateToFrame = (direction: number) => {
    if (isAutoRotating) {
      setIsAutoRotating(false);
    }

    setCurrentImageIndex((prev) => {
      let newIndex = (prev + direction) % totalFrames;
      if (newIndex < 0) newIndex = totalFrames - 1;
      return newIndex;
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative cursor-grab select-none ${className}`}
      aria-label="360° product view. Drag to rotate."
    >
      <div className="relative w-full h-full overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {frames.map((frameSrc, index) => (
            <img
              key={index}
              src={frameSrc}
              alt={`${altText} - View ${index + 1} of ${totalFrames}`}
              className={`w-full h-full object-contain pointer-events-none transition-opacity duration-150`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                opacity: currentImageIndex === index ? 1 : 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-4 flex justify-center items-center gap-2 z-10">
        <div className="bg-black/80 rounded-full px-3 py-1 flex items-center space-x-2">
          {/* Previous button */}
          <button
            onClick={() => rotateToFrame(-1)}
            className="text-white hover:text-gray-300 transition p-1"
            aria-label="Previous view"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Play/Pause button */}
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className="text-white hover:text-gray-300 transition p-1"
            aria-label={
              isAutoRotating ? "Pause auto-rotation" : "Start auto-rotation"
            }
          >
            {isAutoRotating ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>

          {/* Next button */}
          <button
            onClick={() => rotateToFrame(1)}
            className="text-white hover:text-gray-300 transition p-1"
            aria-label="Next view"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Frame counter */}
          <div className="text-white text-xs px-1">
            {currentImageIndex + 1} / {totalFrames}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView360;
