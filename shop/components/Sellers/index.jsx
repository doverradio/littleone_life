import Link from 'next/link';
import Image from 'next/image'; // Importing Next.js Image component
import Star from "../Helpers/icons/Star";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";

export default function Sellers() {
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="sellers-page-wrapper w-full mb-[60px]">
        <PageTitle
          title="All Seller"
          breadcrumb={[
            { name: "home", path: "/" },
            { name: "Sellers", path: "/sellers" },
          ]}
        />
      </div>

      <div className="content-wrapper w-full mb-[60px]">
        <div className="container-x mx-auto w-full">
          <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[30px] gap-5">
            <div data-aos="fade-up" className="item w-full">
              <div
                className="w-full sm:h-[328px] sm:p-[30px] p-5"
                style={{
                  background: `url(${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/sellers-cover-1.png) no-repeat`,
                  backgroundSize: "cover",
                }}
              >
                <div className="flex sm:flex-row flex-col-reverse sm:items-center justify-between w-full h-full">
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <h1 className="text-[30px] font-semibold text-qblack">Fusion x</h1>
                      <div className="flex space-x-2 items-center mb-[30px]">
                        <div className="flex">
                          <Star w="24" h="24" />
                          <Star w="24" h="24" />
                          <Star w="24" h="24" />
                          <Star w="24" h="24" />
                          <Star w="24" h="24" />
                        </div>
                        <span className="text-[15px] font-bold text-qblack ">(4.7)</span>
                      </div>
                      <div className="sellers-text-details">
                        <ul>
                          <li className="text-black flex space-x-5 items-center leading-9 text-base font-normal">
                            <span>
                              <svg
                                width="16"
                                height="12"
                                viewBox="0 0 16 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                {/* SVG content */}
                              </svg>
                            </span>
                            <span>Demoemail@gmail.com</span>
                          </li>
                          <li className="text-black flex space-x-5 items-center leading-9 text-base font-normal">
                            <span>
                              <svg
                                width="15"
                                height="14"
                                viewBox="0 0 15 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                {/* SVG content */}
                              </svg>
                            </span>
                            <span>023 434 54354</span>
                          </li>
                          <li className="text-black flex space-x-5 items-center leading-9 text-base font-normal">
                            <span>
                              <svg
                                width="14"
                                height="19"
                                viewBox="0 0 14 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                {/* SVG content */}
                              </svg>
                            </span>
                            <span>Haydarabad, Rord 3,Dhaka</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <Link href="/seller-page">
                        <div className="w-[116px] h-[40px]">
                          <div className="yellow-btn flex justify-center">
                            <div className="flex space-x-2 items-center">
                              <span>Shop Now</span>
                              <span>
                                <svg
                                  width="7"
                                  height="11"
                                  viewBox="0 0 7 11"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  {/* SVG content */}
                                </svg>
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className="flex sm:justify-center justify-start">
                    <div className="w-[170px] h-[170px] rounded-full bg-white mb-[20px] flex justify-center items-center">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/seller-8.png`}
                        alt="Fusion x Seller Image"
                        width={170}
                        height={170}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div data-aos="fade-up" className="item w-full">
              <div
                className="w-full sm:h-[328px] sm:p-[30px] p-5"
                style={{
                  background: `url(${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/sellers-cover-6.png) no-repeat`,
                  backgroundSize: "cover",
                }}
              >
                <div className="flex sm:flex-row flex-col-reverse sm:items-center justify-between w-full h-full">
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <h1 className="text-[30px] font-semibold text-qblack">Rahayanhan</h1>
                      <div className="flex space-x-2 items-center mb-[30px]">
                        <div className="flex">
                          <Star w="24" h="24" />
                          <Star w="24" h="24" />
                          <Star w="24" h="24" />
                          <Star w="24" h="24" />
                          <Star w="24" h="24" />
                        </div>
                        <span className="text-[15px] font-bold text-qblack ">(4.7)</span>
                      </div>
                      <div className="sellers-text-details">
                        <ul>
                          <li className="text-black flex space-x-5 items-center leading-9 text-base font-normal">
                            <span>
                              <svg
                                width="16"
                                height="12"
                                viewBox="0 0 16 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                {/* SVG content */}
                              </svg>
                            </span>
                            <span>Demoemail@gmail.com</span>
                          </li>
                          <li className="text-black flex space-x-5 items-center leading-9 text-base font-normal">
                            <span>
                              <svg
                                width="15"
                                height="14"
                                viewBox="0 0 15 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                {/* SVG content */}
                              </svg>
                            </span>
                            <span>023 434 54354</span>
                          </li>
                          <li className="text-black flex space-x-5 items-center leading-9 text-base font-normal">
                            <span>
                              <svg
                                width="14"
                                height="19"
                                viewBox="0 0 14 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                {/* SVG content */}
                              </svg>
                            </span>
                            <span>Haydarabad, Rord 3,Dhaka</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <Link href="/seller-page">
                        <div className="w-[116px] h-[40px]">
                          <div className="yellow-btn flex justify-center">
                            <div className="flex space-x-2 items-center">
                              <span>Shop Now</span>
                              <span>
                                <svg
                                  width="7"
                                  height="11"
                                  viewBox="0 0 7 11"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  {/* SVG content */}
                                </svg>
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className="flex sm:justify-center justify-start">
                    <div className="w-[170px] h-[170px] rounded-full bg-white mb-[20px] flex justify-center items-center">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/seller-7.png`}
                        alt="Rahayanhan Seller Image"
                        width={170}
                        height={170}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div data-aos="fade-up" className="item w-full">
              <div
                className="w-full sm:h-[328px] sm:p-[30px] p-5"
                style={{
                  background: `url(${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/sellers-cover-2.png) no-repeat`,
                  backgroundSize: "cover",
                }}
              >
                <div className="flex sm:flex-row flex-col-reverse sm:items-center justify-between w-full h-full">
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <h1 className="text-[30px] font-semibold text-qblack">Rikayi Rox</h1>
                      <div className="flex space-x-2 items-center mb-[30px]">
                        <div className="flex">
                          <Star w="24" h="24" />
                          <Star w="24" h="24" />
                          <Star w="24" h="24" />
                          <Star w="24" h="24" />
                          <Star w="24" h="24" />
                        </div>
                        <span className="text-[15px] font-bold text-qblack ">(4.7)</span>
                      </div>
                      <div className="sellers-text-details">
                        <ul>
                          <li className="text-black flex space-x-5 items-center leading-9 text-base font-normal">
                            <span>
                              <svg
                                width="16"
                                height="12"
                                viewBox="0 0 16 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                {/* SVG content */}
                              </svg>
                            </span>
                            <span>Demoemail@gmail.com</span>
                          </li>
                          <li className="text-black flex space-x-5 items-center leading-9 text-base font-normal">
                            <span>
                              <svg
                                width="15"
                                height="14"
                                viewBox="0 0 15 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                {/* SVG content */}
                              </svg>
                            </span>
                            <span>023 434 54354</span>
                          </li>
                          <li className="text-black flex space-x-5 items-center leading-9 text-base font-normal">
                            <span>
                              <svg
                                width="14"
                                height="19"
                                viewBox="0 0 14 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                {/* SVG content */}
                              </svg>
                            </span>
                            <span>Haydarabad, Rord 3,Dhaka</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <Link href="/seller-page">
                        <div className="w-[116px] h-[40px]">
                          <div className="yellow-btn flex justify-center">
                            <div className="flex space-x-2 items-center">
                              <span>Shop Now</span>
                              <span>
                                <svg
                                  width="7"
                                  height="11"
                                  viewBox="0 0 7 11"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  {/* SVG content */}
                                </svg>
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className="flex sm:justify-center justify-start">
                    <div className="w-[170px] h-[170px] rounded-full bg-white mb-[20px] flex justify-center items-center">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/seller-9.png`}
                        alt="Rikayi Rox Seller Image"
                        width={170}
                        height={170}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional sellers can be refactored similarly */}
          </div>
        </div>
      </div>
    </Layout>
  );
}
