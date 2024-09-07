import Link from 'next/link';
import Image from 'next/image';

export default function BrandSection({ className, sectionTitle, type }) {
  return (
    <div data-aos="fade-up" className={`w-full ${className || ""}`}>
      <div className="container-x mx-auto">
        {type !== 3 && (
          <div className=" section-title flex justify-between items-center mb-5">
            <div>
              <h1 className="sm:text-3xl text-xl font-600 text-qblacktext">
                {sectionTitle}
              </h1>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-2">
          {[...Array(12).keys()].map((index) => (
            <div className="item" key={index}>
              <div className="w-full h-[130px] bg-white border border-primarygray flex justify-center items-center">
                <Image
                  src={`${
                    process.env.NEXT_PUBLIC_BASE_URL
                  }/assets/images/brand-${index + 1}.png`}
                  alt={`Brand ${index + 1}`}
                  width={130}
                  height={130}
                  objectFit="contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
