import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css"
function LazyLoadGameImage( {image, title}){
    return(
        <LazyLoadImage 
        className="img-card-custom"
        src={image}
        alt={`the image of the game: ${title}`}
        effect="blur"
        wrapperProps={{style: {transitionDelay: "0.15s"}
        }} />
    )
}

export default LazyLoadGameImage