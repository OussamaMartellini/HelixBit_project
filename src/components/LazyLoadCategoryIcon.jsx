import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css"
function LazyLoadCategoryIcon( {image, title}){
    return(
        <LazyLoadImage 
        className="logo-image"
        src={image}
        alt={`the image of the game: ${title}`}
        effect="blur"
        wrapperProps={{
            style: {transitionDelay: "0.001s"}
        }} />
    )
}

export default LazyLoadCategoryIcon