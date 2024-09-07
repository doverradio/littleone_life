import Image from 'next/image';
import Link from 'next/link';

export default function Banner({ className }) {
  return (
    <>
      <div className={`w-full ${className || ""}`}>
        <div className="container-x mx-auto">
          <div className="main-wrapper w-full">
            <div className="grid w-full sm:grid-cols-3 grid-cols-1 xl:gap-10 gap-5 xl:h-[600px] mb-[60px]">
              <div className="item bg-[#AEE6EC] h-full relative">
                <Image
                  src="/assets/images/banner-4.png"
                  alt="thumb"
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute bottom-[32px] left-0 xl:w-[306px] sm:w-full w-[306px] bg-white py-6 px-[26px] bg-opacity-[0.92]">
                  <div className="mb-[15px]">
                    <span className="px-2.5 py-[3px] bg-qblack text-white text-xs font-semibold leading-5 uppercase rounded-full">
                      BOYS STYLE
                    </span>
                  </div>
                  <p className="xl:text-[30px] sm:text-xl text-[30px] font-semibold xl:leading-10 sm:leading-normal leading-10 mb-[15px]">
                    Best Styles for all <br />
                    Boys
                  </p>
                  <Link href="#">
                    <div className="w-[100px] h-[36px] rounded bg-qh4-pink flex justify-center items-center">
                      <span>Shop Now</span>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="item bg-[#C2D7F0] h-full relative">
                <Image
                  src="/assets/images/banner-4.1.png"
                  alt="thumb"
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute bottom-[32px] left-0 xl:w-[306px] sm:w-full w-[306px] bg-white py-6 px-[26px] bg-opacity-[0.92]">
                  <div className="mb-[15px]">
                    <span className="px-2.5 py-[3px] bg-qblack text-white text-xs font-semibold leading-5 uppercase rounded-full">
                      BOYS STYLE
                    </span>
                  </div>
                  <p className="xl:text-[30px] sm:text-xl text-[30px] font-semibold xl:leading-10 sm:leading-normal leading-10 mb-[15px]">
                    Best Styles for all <br />
                    Boys
                  </p>
                  <Link href="#">
                    <div className="w-[100px] h-[36px] rounded bg-qh4-pink flex justify-center items-center">
                      <span>Shop Now</span>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="item bg-[#FEE7C4] h-full relative">
                <Image
                  src="/assets/images/banner-4.2.png"
                  alt="thumb"
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute bottom-[32px] left-0 xl:w-[306px] sm:w-full w-[306px] bg-white py-6 px-[26px] bg-opacity-[0.92]">
                  <div className="mb-[15px]">
                    <span className="px-2.5 py-[3px] bg-qblack text-white text-xs font-semibold leading-5 uppercase rounded-full">
                      BOYS STYLE
                    </span>
                  </div>
                  <p className="xl:text-[30px] sm:text-xl text-[30px] font-semibold xl:leading-10 sm:leading-normal leading-10 mb-[15px]">
                    Best Styles for all <br />
                    Boys
                  </p>
                  <Link href="#">
                    <div className="w-[100px] h-[36px] rounded bg-qh4-pink flex justify-center items-center">
                      <span>Shop Now</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Additional section */}
            <div
              data-aos="fade-up"
              style={{
                backgroundImage: `url(${
                  process.env.NEXT_PUBLIC_BASE_URL
                }/assets/images/service-bg.png)`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              className="best-services w-full flex flex-col space-y-10 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center lg:h-[110px] px-10 lg:py-0 py-10"
            >
              {/* Service items */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
