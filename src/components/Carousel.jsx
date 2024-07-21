import SalesImg from "../assets/carousel/first.jpg";
import Carousel from "react-material-ui-carousel";

export default function BannerCarousel() {
  return (
    <Carousel>
      <img
        height="700px"
        width="100%"
        src={SalesImg}
        alt="Sales Banner For January"
      />
      <img
        height="700px"
        width="100%"
        src={SalesImg}
        alt="Sales Banner For January"
      />
      <img
        height="700px"
        width="100%"
        src={SalesImg}
        alt="Sales Banner For January"
      />
    </Carousel>
  );
}
