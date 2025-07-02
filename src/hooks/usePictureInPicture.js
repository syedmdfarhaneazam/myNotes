import { useEffect, useRef } from "react";

export function usePictureInPicture({ enabled }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!enabled || !document.pictureInPictureEnabled) return;

    const video = videoRef.current;
    if (!video) return;

    // Ensure the video is playing (muted autoplay)
    video.muted = true;
    video.play().catch(() => {
      /* ignore autoplay errors */
    });

    // Visibility‐change handler
    const onVisibilityChange = async () => {
      try {
        if (document.visibilityState === "hidden") {
          await video.requestPictureInPicture();
        } else if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        }
      } catch (err) {
        console.warn("PiP failed:", err);
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      // exit PiP on unmount
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture().catch(() => {});
      }
    };
  }, [enabled]);

  return videoRef;
}
