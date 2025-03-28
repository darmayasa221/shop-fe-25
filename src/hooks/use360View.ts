import { useState, useRef, useEffect, useCallback } from "react";

interface Use360ViewOptions {
  images: string[];
  sensitivity?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
}

interface Use360ViewReturnType {
  currentImageIndex: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  isDragging: React.MutableRefObject<boolean>;
  startAutoRotation: () => void;
  stopAutoRotation: () => void;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseUp: () => void;
  handleMouseLeave: () => void;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: () => void;
}

const use360View = ({
  images,
  sensitivity = 10,
  autoRotate = false,
  autoRotateSpeed = 30,
}: Use360ViewOptions): Use360ViewReturnType => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const autoRotateIntervalRef = useRef<number | null>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    stopAutoRotation();
    if (containerRef.current) {
      containerRef.current.classList.add("cursor-grabbing");
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging.current) return;

      const deltaX = e.clientX - startX.current;

      if (Math.abs(deltaX) >= sensitivity) {
        // Calculate how many frames to move
        const framesToMove = Math.floor(Math.abs(deltaX) / sensitivity);

        if (framesToMove > 0) {
          setCurrentImageIndex((prev) => {
            const direction = deltaX > 0 ? 1 : -1;
            let newIndex = (prev + direction * framesToMove) % images.length;
            if (newIndex < 0) newIndex = images.length + newIndex;
            return newIndex;
          });

          startX.current = e.clientX;
        }
      }
    },
    [images.length, sensitivity]
  );

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    if (containerRef.current) {
      containerRef.current.classList.remove("cursor-grabbing");
    }
    if (autoRotate) {
      startAutoRotation();
    }
  }, [autoRotate]);

  const handleMouseLeave = useCallback(() => {
    isDragging.current = false;
    if (containerRef.current) {
      containerRef.current.classList.remove("cursor-grabbing");
    }
    if (autoRotate) {
      startAutoRotation();
    }
  }, [autoRotate]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
    stopAutoRotation();
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging.current) return;

      const deltaX = e.touches[0].clientX - startX.current;

      if (Math.abs(deltaX) >= sensitivity) {
        // Calculate how many frames to move
        const framesToMove = Math.floor(Math.abs(deltaX) / sensitivity);

        if (framesToMove > 0) {
          setCurrentImageIndex((prev) => {
            const direction = deltaX > 0 ? 1 : -1;
            let newIndex = (prev + direction * framesToMove) % images.length;
            if (newIndex < 0) newIndex = images.length + newIndex;
            return newIndex;
          });

          startX.current = e.touches[0].clientX;
        }
      }
    },
    [images.length, sensitivity]
  );

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
    if (autoRotate) {
      startAutoRotation();
    }
  }, [autoRotate]);

  const startAutoRotation = useCallback(() => {
    if (autoRotateIntervalRef.current) {
      window.clearInterval(autoRotateIntervalRef.current);
    }

    autoRotateIntervalRef.current = window.setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, autoRotateSpeed * 10); // Convert to milliseconds with a factor
  }, [images.length, autoRotateSpeed]);

  const stopAutoRotation = useCallback(() => {
    if (autoRotateIntervalRef.current) {
      window.clearInterval(autoRotateIntervalRef.current);
      autoRotateIntervalRef.current = null;
    }
  }, []);

  // Start auto-rotation on initial load if enabled
  useEffect(() => {
    if (autoRotate) {
      startAutoRotation();
    }

    return () => stopAutoRotation();
  }, [autoRotate, startAutoRotation, stopAutoRotation]);

  return {
    currentImageIndex,
    containerRef,
    isDragging,
    startAutoRotation,
    stopAutoRotation,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};

export default use360View;
