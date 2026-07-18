import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export const SPECTRA_DEMO_VIDEO_SRC = `${process.env.PUBLIC_URL}/spectra-demo.mp4`;
export const SPECTRA_DEMO_POSTER_SRC = `${process.env.PUBLIC_URL}/spectra-demo.gif`;
/** @deprecated Use SPECTRA_DEMO_VIDEO_SRC — kept for backwards compatibility */
export const SPECTRA_DEMO_SRC = SPECTRA_DEMO_POSTER_SRC;

export const SPECTRA_DEMO_ALT =
  'Spectra dashboard showing YAML test suite run graph with UI, socket, and screen assert steps';

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return reduced;
};

const SpectraDemoGif = ({
  className = '',
  style,
  imgClassName = 'w-100 d-block',
  imgStyle,
  alt = SPECTRA_DEMO_ALT,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const lightboxVideoRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    const video = lightboxVideoRef.current;
    if (video && !prefersReducedMotion) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);

      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    };
  }, [close, isOpen, prefersReducedMotion]);

  return (
    <>
      <button
        type="button"
        className={`spectra-demo-gif-trigger ${className}`.trim()}
        style={style}
        onClick={open}
        aria-label="View Spectra demo in full screen"
      >
        {prefersReducedMotion ? (
          <img
            src={SPECTRA_DEMO_POSTER_SRC}
            alt={alt}
            className={imgClassName}
            style={imgStyle}
            loading="lazy"
          />
        ) : (
          <video
            src={SPECTRA_DEMO_VIDEO_SRC}
            poster={SPECTRA_DEMO_POSTER_SRC}
            className={imgClassName}
            style={imgStyle}
            muted
            loop
            playsInline
            autoPlay
            aria-label={alt}
          />
        )}
        <span className="spectra-demo-gif-hint" aria-hidden="true">
          Click to enlarge
        </span>
      </button>

      {isOpen
        && createPortal(
          <div
            className="spectra-demo-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Spectra demo full screen"
            onClick={close}
          >
            <button
              type="button"
              className="spectra-demo-lightbox-close"
              onClick={close}
              aria-label="Close full screen view"
            >
              ×
            </button>
            <div className="spectra-demo-lightbox-stage">
              <video
                ref={lightboxVideoRef}
                src={SPECTRA_DEMO_VIDEO_SRC}
                poster={SPECTRA_DEMO_POSTER_SRC}
                className="spectra-demo-lightbox-media"
                controls
                playsInline
                onClick={(event) => event.stopPropagation()}
              />
            </div>
            <p className="spectra-demo-lightbox-caption">Press Esc to close</p>
          </div>,
          document.body,
        )}
    </>
  );
};

export default SpectraDemoGif;
