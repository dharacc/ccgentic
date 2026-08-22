"use client";

import { forwardRef, useEffect, useState } from "react";
import Slider from "react-slick";
import type { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const DEFAULT_SPEED = 500;
const DEFAULT_AUTOPLAY_SPEED = 5000;

export type CarouselConfig = {
  slidesToShow?: number;
  slidesToScroll?: number;
  arrows?: boolean;
  dots?: boolean;
  infinite?: boolean;
  speed?: number;
  autoplay?: boolean;
  autoplaySpeed?: number;
  pauseOnHover?: boolean;
  pauseOnFocus?: boolean;
  variableWidth?: boolean;
  adaptiveHeight?: boolean;
  fade?: boolean;
  cssEase?: string;
  swipeToSlide?: boolean;
  responsive?: Settings["responsive"];
  prevArrow?: React.ReactElement;
  nextArrow?: React.ReactElement;
};

type CarouselProps = CarouselConfig & {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
};

function prefersReducedMotion() {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const Carousel = forwardRef<Slider, CarouselProps>(function Carousel(
  {
    children,
    className,
    ariaLabel,
    slidesToShow = 1,
    slidesToScroll = 1,
    arrows = false,
    dots = false,
    infinite = false,
    speed = DEFAULT_SPEED,
    autoplay = false,
    autoplaySpeed = DEFAULT_AUTOPLAY_SPEED,
    pauseOnHover = true,
    pauseOnFocus = true,
    variableWidth = false,
    adaptiveHeight = false,
    fade = false,
    cssEase,
    swipeToSlide = true,
    responsive,
    prevArrow,
    nextArrow,
  },
  ref,
) {
  const [mounted, setMounted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    setReduceMotion(prefersReducedMotion());
  }, []);

  const settings: Settings = {
    slidesToShow,
    slidesToScroll,
    arrows,
    dots,
    infinite,
    speed: reduceMotion ? 0 : speed,
    autoplay: reduceMotion ? false : autoplay,
    autoplaySpeed,
    pauseOnHover,
    pauseOnFocus,
    variableWidth,
    adaptiveHeight,
    fade,
    cssEase,
    swipeToSlide,
    responsive,
    prevArrow,
    nextArrow,
    accessibility: true,
    waitForAnimate: true,
  };

  if (!mounted) {
    return (
      <div className={className} aria-label={ariaLabel} role="region">
        <div className="carousel-fallback">{children}</div>
      </div>
    );
  }

  return (
    <div className={className} aria-label={ariaLabel} role="region">
      <Slider ref={ref} {...settings}>
        {children}
      </Slider>
    </div>
  );
});

export default Carousel;
