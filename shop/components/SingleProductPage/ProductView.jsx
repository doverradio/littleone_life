import { useState } from "react";
import Image from "next/image";
import Star from "../Helpers/icons/Star";
import Selectbox from "../Helpers/Selectbox";

export default function ProductView({ className, reportHandler }) {
  const productsImg = [
    {
      id: 1,
      src: "product-details-1.png",
      color: "#FFBC63",
    },
    {
      id: 2,
      src: "product-details-2.png",
      color: "#649EFF",
    },
    {
      id: 3,
      src: "product-details-3.png",
      color: "#FFFFFF",
    },
    {
      id: 4,
      src: "product-details-4.png",
      color: "#FF7173",
    },
    {
      id: 6,
      src: "product-details-5.png",
      color: "",
    },
  ];

  const [src, setSrc] = useState(productsImg[0].src);
  const [quantity, setQuantity] = useState(1);

  const changeImgHandler = (current) => {
    setSrc(current);
  };

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => quantity > 1 && setQuantity((prev) => prev - 1);

  return (
    <div className={`product-view w-full lg:flex justify-between ${className || ""}`}>
      {/* Product Image and Thumbnails */}
      <div data-aos="fade-right" className="lg:w-1/2 xl:mr-[70px] lg:mr-[50px]">
        <div className="w-full">
          <div className="w-full h-[600px] border border-qgray-border flex justify-center items-center overflow-hidden relative mb-3">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/${src}`}
              alt="Product Image"
              width={600}
              height={600}
              className="object-contain"
            />
            <div className="w-[80px] h-[80px] rounded-full bg-qyellow text-qblack flex justify-center items-center text-xl font-medium absolute left-[30px] top-[30px]">
              <span>-50%</span>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            {productsImg.map((img) => (
              <div
                key={img.id}
                onClick={() => changeImgHandler(img.src)}
                className="w-[110px] h-[110px] p-[15px] border border-qgray-border cursor-pointer"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/${img.src}`}
                  alt="Product Thumbnail"
                  width={110}
                  height={110}
                  className={`object-contain ${src !== img.src ? "opacity-50" : ""}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <div className="product-details w-full mt-10 lg:mt-0">
          <span data-aos="fade-up" className="text-qgray text-xs font-normal uppercase tracking-wider mb-2 inline-block">
            Mobile Phones
          </span>
          <p data-aos="fade-up" className="text-xl font-medium text-qblack mb-4">
            Samsung Galaxy Z Fold3 5G 3 colors in 512GB
          </p>

          <div data-aos="fade-up" className="flex space-x-[10px] items-center mb-6">
            <div className="flex">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
            <span className="text-[13px] font-normal text-qblack">6 Reviews</span>
          </div>

          <div data-aos="fade-up" className="flex space-x-2 items-center mb-7">
            <span className="text-sm font-500 text-qgray line-through mt-2">$9.99</span>
            <span className="text-2xl font-500 text-qred">$6.99</span>
          </div>

          <p data-aos="fade-up" className="text-qgray text-sm text-normal mb-[30px] leading-7">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
          </p>

          {/* Product Colors */}
          <div data-aos="fade-up" className="colors mb-[30px]">
            <span className="text-sm font-normal uppercase text-qgray mb-[14px] inline-block">COLOR</span>
            <div className="flex space-x-4 items-center">
              {productsImg.map((img) => (
                img.color && (
                  <button
                    key={img.id}
                    onClick={() => changeImgHandler(img.src)}
                    type="button"
                    style={{ "--tw-ring-color": `${img.color}` }}
                    className="w-[20px] h-[20px] rounded-full focus:ring-2 ring-offset-2 flex justify-center items-center"
                  >
                    <span
                      style={{ background: `${img.color}` }}
                      className="w-[20px] h-[20px] block rounded-full border"
                    ></span>
                  </button>
                )
              ))}
            </div>
          </div>

          {/* Product Size */}
          <div data-aos="fade-up" className="product-size mb-[30px]">
            <span className="text-sm font-normal uppercase text-qgray mb-[14px] inline-block">SIZE</span>
            <Selectbox
              className="w-full"
              datas={["Small", "Medium", "Large", "Extra Large"]}
            >
              {({ item }) => (
                <>
                  <div>
                    <span className="text-[13px] text-qblack">{item}</span>
                  </div>
                  <div className="flex space-x-10 items-center">
                    <span className="text-[13px] text-qblack">3”W x 3”D x 7”H</span>
                  </div>
                </>
              )}
            </Selectbox>
          </div>

          {/* Quantity and Add to Cart */}
          <div data-aos="fade-up" className="quantity-card-wrapper w-full flex items-center h-[50px] space-x-[10px] mb-[30px]">
            <div className="w-[120px] h-full px-[26px] flex items-center border border-qgray-border">
              <div className="flex justify-between items-center w-full">
                <button onClick={decrement} type="button" className="text-base text-qgray">-</button>
                <span className="text-qblack">{quantity}</span>
                <button onClick={increment} type="button" className="text-base text-qgray">+</button>
              </div>
            </div>
            <div className="w-[60px] h-full flex justify-center items-center border border-qgray-border">
              <button type="button">
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 1C14.9 1 13.1 2.1 12 3.7C10.9 2.1 9.1 1 7 1C3.7 1 1 3.7 1 7C1 13 12 22 12 22C12 22 23 13 23 7C23 3.7 20.3 1 17 1Z"
                      stroke="#D5D5D5"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="square"
                    />
                  </svg>
                </span>
              </button>
            </div>
            <div className="flex-1 h-full">
              <button type="button" className="black-btn text-sm font-semibold w-full h-full">
                Add To Cart
              </button>
            </div>
          </div>

          {/* Product Information */}
          <div data-aos="fade-up" className="mb-[20px]">
            <p className="text-[13px] text-qgray leading-7">
              <span className="text-qblack">Category :</span> Kitchen
            </p>
            <p className="text-[13px] text-qgray leading-7">
              <span className="text-qblack">Tags :</span> Beer, Foamer
            </p>
            <p className="text-[13px] text-qgray leading-7">
              <span className="text-qblack">SKU:</span> KE-91039
            </p>
          </div>

          {/* Report Item and Social Share */}
          <div data-aos="fade-up" className="flex space-x-2 items-center mb-[20px]">
            <span>
              <svg width="12" height="13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0C0.247634 0 0.475436 0 0.729172 0C0.738324 0.160174 0.747477 0.316279 0.757647 0.493233C1.05816 0.392044 1.33885 0.282211 1.62818 0.203395C3.11296 -0.201361 4.51385 0.0366111 5.84202 0.779512C6.47661 1.13494 7.14171 1.39071 7.86987 1.47207C8.88125 1.58496 9.82093 1.35817 10.7098 0.88426C10.9335 0.765274 11.1522 0.636627 11.411 0.491199C11.4161 0.606117 11.4237 0.693577 11.4237 0.780529C11.4242 3.18822 11.4222 5.5954 11.4288 8.00309C11.4293 8.1892 11.3718 8.29089 11.2096 8.38039C9.31956 9.42279 7.4285 9.43499 5.54557 8.37734C4.06231 7.54443 2.55363 7.43307 0.992568 8.13835C0.804428 8.22327 0.737816 8.33005 0.739341 8.53904C0.749003 9.9206 0.744426 11.3027 0.744426 12.6842C0.744426 12.7849 0.744426 12.8851 0.744426 13C0.48764 13 0.254244 13 0 13C0 8.67582 0 4.34961 0 0Z" fill="#EB5757" />
              </svg>
            </span>
            <button onClick={reportHandler} className="text-qred font-semibold text-[13px]">
              Report This Item
            </button>
          </div>

          <div data-aos="fade-up" className="social-share flex items-center w-full">
            <span className="text-qblack text-[13px] mr-[17px] inline-block">Share This</span>
            <div className="flex space-x-5 items-center">
              {/* Add SVG Icons here for social sharing */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
