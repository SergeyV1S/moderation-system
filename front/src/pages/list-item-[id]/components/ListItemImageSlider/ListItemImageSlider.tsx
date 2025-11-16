import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";

import styles from "./ListItemImageSlider.module.css";

interface IListItemImageSliderProps {
  images: string[];
}

export const ListItemImageSlider = ({ images }: IListItemImageSliderProps) => (
  <Carousel classNames={styles} withIndicators emblaOptions={{ align: "start" }} slideGap='md'>
    {images.map((image, idx) => (
      <Carousel.Slide key={image}>
        <Image src={image} radius={16} h={300} alt={`Изображение ${idx}`} />
      </Carousel.Slide>
    ))}
  </Carousel>
);
