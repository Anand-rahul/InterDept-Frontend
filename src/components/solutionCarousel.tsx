//carousels/Responsive.js
import { Carousel } from "react-responsive-carousel";
import { SolutionDisplay } from "../models/solution";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import styles from "../styles/Responsive.module.css";
import { SolutionCard } from "./solutionCard";

export default function SolutionCarousel({
  items,
}: {
  items: SolutionDisplay[];
}) {
  return (
    <div>
      <Carousel
        showArrows={true}
        showIndicators={true}
        infiniteLoop={true}
        dynamicHeight={false}
        autoPlay={true}
        interval={6100}
      >
        {items.map((item) => (
          <div key={item.id}>
            <div className="p-1">
              <SolutionCard
                solution={item}
                key={item.id}
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
