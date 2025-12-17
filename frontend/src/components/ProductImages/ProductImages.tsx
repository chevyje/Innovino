import Style from "./ProductImages.module.css"

interface ProductImagesProps {
    images: string[]
    alt?: string
}

export default function ProductImages({ images, alt }: ProductImagesProps) {
    return (
        <div className={Style.container}>
            {images.map((src, index) => (
                <div key={index} className={Style.imageWrapper}>
                    <img
                        src={src}
                        alt={alt ? `${alt} ${index + 1}` : `Product image ${index + 1}`}
                        className={Style.image}
                    />
                </div>
            ))}
        </div>
    )
}
