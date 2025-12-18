// import style from "./productpagina.module.css";
// import Button from "../components/Button/Button";
// import ProductImages from "../components/ProductImages/ProductImages";
// import testImg from "../assets/testproductimg1.jpg"
// import Banner from "../components/Banner/Banner";
// import Page from "../components/Page/Page";

// export default function ProductPagina () {
//     return(
//         <>
//             <Page>
//              <div className={style.page}>
//                 {/* KOLOM 1 */}
//                 <div className={style.column}>
//                     <Button
//                         title="← Terug"
//                         variant="secondary"
//                         onClick={() => window.history.back()}
//                     />

//                     <img
//                         src={testImg}
//                         className={style.mainImage}
//                         alt="Product afbeelding"
//                     />

//                     <div className={style.thumbnailRow}>
//                         {[1, 2, 3, 4, 5].map((i) => (
//                             <img
//                                 key={i}
//                                 src={testImg}
//                                 className={`${style.thumbnail} ${
//                                     i === 3 ? style.active : ""
//                                 }`}
//                                 alt="Thumbnail"
//                             />
//                         ))}
//                     </div>

//                     <div className={style.priceInfo}>
//                         <p className={style.price}>€ 3,49</p>
//                         <p className={style.amount}>500 ml</p>
//                     </div>
//                 </div>

//                 {/* KOLOM 2 komt later */}
//                 <div />

//                 {/* KOLOM 3 komt later */}
//                 <div />
//             </div>   
//             </Page>
//         </>
//     )
// }
import style from "./productpagina.module.css";
import Button from "../components/Button/Button";
import Page from "../components/Page/Page";
import testImg from "../assets/testproductimg1.jpg";

export default function ProductPagina () {
    return(
        <>
            <Page>
             <div className={style.page}>
                {/* KOLOM 1 */}
                <div className={style.column}>
                    <Button
                        title="← Terug"
                        variant="secondary"
                        onClick={() => window.history.back()}
                    />

          <img src={testImg} className={style.mainImage} alt="Product afbeelding" />

          <div className={style.thumbnailRow}>
            {[1, 2, 3, 4, 5].map((i) => (
              <img
                key={i}
                src={testImg}
                className={`${style.thumbnail} ${i === 3 ? style.active : ""}`}
                alt="Thumbnail"
              />
            ))}
          </div>

          <div className={style.priceInfo}>
            <p className={style.price}>ƒ'ª 3,49</p>
            <p className={style.amount}>500 ml</p>
          </div>
        </div>

        <div />
        <div />
      </div>
    </Page>
  );
}
