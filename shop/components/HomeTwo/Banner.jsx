import Link from 'next/link';

export default function Banner({ className }) {
  return (
    <>
      <div className={`w-full ${className || ""}`}>
        <div className="container-x mx-auto">
          <div className="main-wrapper w-full">
            <div className="banner-card xl:flex xl:space-x-[30px] xl:h-[600px]  mb-[30px]">
              <div data-aos="fade-right" className="xl:w-1/2 w-full h-full">
                <Link href="/single-product">
                  <picture>
                    <source
                      media="(min-width:1025px)"
                      srcSet={`${
                        process.env.NEXT_PUBLIC_BASE_URL
                      }/assets/images/banner-1.1.png`}
                    />
                    <img
                      src={`${
                        process.env.NEXT_PUBLIC_BASE_URL
                      }/assets/images/banner-2.1.png`}
                      alt=""
                      className="w-full max-w-full h-auto object-cover"
                    />
                  </picture>
                </Link>
              </div>
              <div
                data-aos="fade-left"
                className="w-1/2 flex xl:flex-col flex-row  xl:space-y-[30px] h-full"
              >
                <div className="w-full ">
                  <Link href="/single-product">
                    <img
                      src={`${
                        process.env.NEXT_PUBLIC_BASE_URL
                      }/assets/images/banner-2.2.png`}
                      alt=""
                      className="w-full h-full"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
