import Image from 'next/image'; // Importing Next.js Image component
import Star from "../Helpers/icons/Star";
import InputCom from "../Helpers/InputCom";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";

export default function ProductsCompaire() {
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="products-compaire-wrapper w-full bg-white pb-[40px]">
        <div className="w-full mb-5">
          <PageTitle
            breadcrumb={[
              { name: "home", path: "/" },
              { name: "compare", path: "/products-compaire" },
            ]}
            title="Product Comparison"
          />
        </div>

        <div className="container-x mx-auto">
          <div className="w-full border border-qgray-border">
            <table className="table-wrapper">
              <tbody>
                <tr className="table-row-wrapper">
                  <td className="w-[233px] pt-[30px] px-[26px] align-top bg-[#FAFAFA]">
                    <div className="">
                      <h1 className="text-[18px] font-medium text-qblack mb-4">
                        Product Comparison
                      </h1>
                      <p className="text-[13px] text-qgraytwo">
                        Select products to see the differences and similarities
                        between them
                      </p>
                    </div>
                  </td>
                  <td className="product w-[235px] bg-white p-6 border-b border-r border-qgray-border">
                    <div className="w-full mb-[30px]">
                      <div className="w-full h-[44px]">
                        <InputCom
                          type="text"
                          placeholder="Search Product..."
                          inputClasses="w-full h-full px-2"
                        >
                          <div
                            className="absolute right-2 z-10 bg-white"
                            style={{ top: "calc(100% - 28px)" }}
                          >
                            <svg
                              width="17"
                              height="17"
                              viewBox="0 0 17 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M11.0821 12.2955C10.0273 13.0961 8.71195 13.5712 7.2856 13.5712C3.81416 13.5712 1 10.757 1 7.2856C1 3.81416 3.81416 1 7.2856 1C10.757 1 13.5712 3.81416 13.5712 7.2856C13.5712 8.97024 12.9085 10.5001 11.8295 11.6286L11.6368 11.436L10.9297 12.1431L11.0821 12.2955ZM11.795 13.0084C10.5546 13.9871 8.98829 14.5712 7.2856 14.5712C3.26187 14.5712 0 11.3093 0 7.2856C0 3.26187 3.26187 0 7.2856 0C11.3093 0 14.5712 3.26187 14.5712 7.2856C14.5712 9.24638 13.7966 11.0263 12.5367 12.3359L16.4939 16.293L15.7868 17.0001L11.795 13.0084Z"
                                fill="#181B31"
                              />
                            </svg>
                          </div>
                        </InputCom>
                      </div>
                    </div>
                    <div className="product-img flex justify-center mb-3 ">
                      <div className="w-[161px] h-[161px]">
                        <Image
                          src={`${
                            process.env.NEXT_PUBLIC_BASE_URL
                          }/assets/images/product-img-15.jpg`}
                          alt="Product Image 15"
                          width={161}
                          height={161}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <p className="text-center text-[15px] font-medium text-qblack leading-[24px] mb-2">
                      Apple MacBook Air 13.3-Inch Display
                    </p>
                    <p className="text-center text-[15px] font-medium text-qred leading-[24px]">
                      $6.99
                    </p>
                  </td>
                  <td className="product w-[235px] bg-white p-6 border-b border-r border-qgray-border">
                    <div className="w-full mb-[30px]">
                      <div className="w-full h-[44px]">
                        <InputCom
                          type="text"
                          placeholder="Search Product..."
                          inputClasses="w-full h-full px-2"
                        >
                          <div
                            className="absolute right-2 z-10 bg-white"
                            style={{ top: "calc(100% - 28px)" }}
                          >
                            <svg
                              width="17"
                              height="17"
                              viewBox="0 0 17 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M11.0821 12.2955C10.0273 13.0961 8.71195 13.5712 7.2856 13.5712C3.81416 13.5712 1 10.757 1 7.2856C1 3.81416 3.81416 1 7.2856 1C10.757 1 13.5712 3.81416 13.5712 7.2856C13.5712 8.97024 12.9085 10.5001 11.8295 11.6286L11.6368 11.436L10.9297 12.1431L11.0821 12.2955ZM11.795 13.0084C10.5546 13.9871 8.98829 14.5712 7.2856 14.5712C3.26187 14.5712 0 11.3093 0 7.2856C0 3.26187 3.26187 0 7.2856 0C11.3093 0 14.5712 3.26187 14.5712 7.2856C14.5712 9.24638 13.7966 11.0263 12.5367 12.3359L16.4939 16.293L15.7868 17.0001L11.795 13.0084Z"
                                fill="#181B31"
                              />
                            </svg>
                          </div>
                        </InputCom>
                      </div>
                    </div>
                    <div className="product-img flex justify-center mb-3 ">
                      <div className="w-[161px] h-[161px]">
                        <Image
                          src={`${
                            process.env.NEXT_PUBLIC_BASE_URL
                          }/assets/images/product-img-16.jpg`}
                          alt="Product Image 16"
                          width={161}
                          height={161}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <p className="text-center text-[15px] font-medium text-qblack leading-[24px] mb-2">
                      Apple MacBook Air 13.3-Inch Display
                    </p>
                    <p className="text-center text-[15px] font-medium text-qred leading-[24px]">
                      $6.99
                    </p>
                  </td>
                  <td className="product w-[235px] bg-white p-6 border-b border-r border-qgray-border">
                    <div className="w-full mb-[30px]">
                      <div className="w-full h-[44px]">
                        <InputCom
                          type="text"
                          placeholder="Search Product..."
                          inputClasses="w-full h-full px-2"
                        >
                          <div
                            className="absolute right-2 z-10 bg-white"
                            style={{ top: "calc(100% - 28px)" }}
                          >
                            <svg
                              width="17"
                              height="17"
                              viewBox="0 0 17 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M11.0821 12.2955C10.0273 13.0961 8.71195 13.5712 7.2856 13.5712C3.81416 13.5712 1 10.757 1 7.2856C1 3.81416 3.81416 1 7.2856 1C10.757 1 13.5712 3.81416 13.5712 7.2856C13.5712 8.97024 12.9085 10.5001 11.8295 11.6286L11.6368 11.436L10.9297 12.1431L11.0821 12.2955ZM11.795 13.0084C10.5546 13.9871 8.98829 14.5712 7.2856 14.5712C3.26187 14.5712 0 11.3093 0 7.2856C0 3.26187 3.26187 0 7.2856 0C11.3093 0 14.5712 3.26187 14.5712 7.2856C14.5712 9.24638 13.7966 11.0263 12.5367 12.3359L16.4939 16.293L15.7868 17.0001L11.795 13.0084Z"
                                fill="#181B31"
                              />
                            </svg>
                          </div>
                        </InputCom>
                      </div>
                    </div>
                    <div className="product-img flex justify-center mb-3 ">
                      <div className="w-[161px] h-[161px]">
                        <Image
                          src={`${
                            process.env.NEXT_PUBLIC_BASE_URL
                          }/assets/images/product-img-12.jpg`}
                          alt="Product Image 12"
                          width={161}
                          height={161}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <p className="text-center text-[15px] font-medium text-qblack leading-[24px] mb-2">
                      Apple MacBook Air 13.3-Inch Display
                    </p>
                    <p className="text-center text-[15px] font-medium text-qred leading-[24px]">
                      $6.99
                    </p>
                  </td>
                  <td className="product w-[235px] bg-white p-6 border-b border-r border-qgray-border">
                    <div className="w-full mb-[30px]">
                      <div className="w-full h-[44px]">
                        <InputCom
                          type="text"
                          placeholder="Search Product..."
                          inputClasses="w-full h-full px-2"
                        >
                          <div
                            className="absolute right-2 z-10 bg-white"
                            style={{ top: "calc(100% - 28px)" }}
                          >
                            <svg
                              width="17"
                              height="17"
                              viewBox="0 0 17 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M11.0821 12.2955C10.0273 13.0961 8.71195 13.5712 7.2856 13.5712C3.81416 13.5712 1 10.757 1 7.2856C1 3.81416 3.81416 1 7.2856 1C10.757 1 13.5712 3.81416 13.5712 7.2856C13.5712 8.97024 12.9085 10.5001 11.8295 11.6286L11.6368 11.436L10.9297 12.1431L11.0821 12.2955ZM11.795 13.0084C10.5546 13.9871 8.98829 14.5712 7.2856 14.5712C3.26187 14.5712 0 11.3093 0 7.2856C0 3.26187 3.26187 0 7.2856 0C11.3093 0 14.5712 3.26187 14.5712 7.2856C14.5712 9.24638 13.7966 11.0263 12.5367 12.3359L16.4939 16.293L15.7868 17.0001L11.795 13.0084Z"
                                fill="#181B31"
                              />
                            </svg>
                          </div>
                        </InputCom>
                      </div>
                    </div>
                    <div className="product-img flex justify-center mb-3 ">
                      <div className="w-[161px] h-[161px]">
                        <Image
                          src={`${
                            process.env.NEXT_PUBLIC_BASE_URL
                          }/assets/images/product-img-11.jpg`}
                          alt="Product Image 11"
                          width={161}
                          height={161}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <p className="text-center text-[15px] font-medium text-qblack leading-[24px] mb-2">
                      Apple MacBook Air 13.3-Inch Display
                    </p>
                    <p className="text-center text-[15px] font-medium text-qred leading-[24px]">
                      $6.99
                    </p>
                  </td>
                </tr>

                {/* Additional table rows with same adjustments for other columns */}
                {/* Unescaped quotes fixed below */}
                <tr className="table-row-wrapper">
                  <td className="w-[233px] px-[26px] align-top bg-[#FAFAFA]">
                    <div className="">
                      <h1 className="text-[15px] font-medium text-qblack">
                        Processor
                      </h1>
                    </div>
                  </td>
                  <td className="product w-[235px] bg-white px-6 border-r border-qgray-border pb-[20px] align-top">
                    <span className="text-[13px] font-normal text-qgraytwo">
                      Apple M1 chip with 8-core CPU and 7-core GPU
                    </span>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
