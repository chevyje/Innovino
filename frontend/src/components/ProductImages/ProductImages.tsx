import Style from "./ProductImages.module.css"

interface ProductImagesProps {
    images: string[]
    alt?: string,
    border?: boolean
}

export default function ProductImages({ images, alt, border=true }: ProductImagesProps) {
    let classes: string = `${Style.image}`

    if(border) {
        classes = classes + ` ${Style.border}`
    }

    return (
        <div className={Style.container}>

            {images.map((src, index) => (
                <div key={index} className={Style.imageWrapper}>
                    <img
                        src={src}
                        alt={alt ? `${alt} ${index + 1}` : `Product image ${index + 1}`}
                        className={classes}
                    />
                </div>
            ))}
        </div>
    )
}
