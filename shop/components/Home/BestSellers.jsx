import Link from 'next/link';
import Image from 'next/image';

export default function BestSellers({ className }) {
  return (
    <div className={`w-full ${className || ""}`}>
      <div className="grid xl:grid-cols-6 lg:grid-cols-5 sm:grid-cols-3 grid-cols-1 xl:gap-[30px] gap-5">
        <div
          data-aos="fade-left"
          data-aos-duration="500"
          className="item w-full flex flex-col items-center"
        >
          <div className="w-[170px] h-[170px] rounded-full bg-white flex justify-center items-center overflow-hidden mb-2">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/saller-1.png`}
              alt="Shopno BD"
              width={170}
              height={170}
              className="object-cover"
            />
          </div>
          <Link href="/saller-page">
            <p className="text-base font-500 text-center">Shopno BD</p>
          </Link>
        </div>
        <div
          data-aos="fade-left"
          data-aos-duration="400"
          className="item w-full flex flex-col items-center"
        >
          <div className="w-[170px] h-[170px] rounded-full bg-white flex justify-center items-center overflow-hidden mb-2">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/saller-2.png`}
              alt="Eecoms Shop"
              width={170}
              height={170}
              className="object-cover"
            />
          </div>
          <Link href="/saller-page">
            <p className="text-base font-500 text-center">Eecoms Shop</p>
          </Link>
        </div>
        <div
          data-aos="fade-left"
          data-aos-duration="300"
          className="item w-full flex flex-col items-center"
        >
          <div className="w-[170px] h-[170px] rounded-full bg-white flex justify-center items-center overflow-hidden mb-2">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/saller-3.png`}
              alt="Fusion X"
              width={170}
              height={170}
              className="object-cover"
            />
          </div>
          <Link href="/saller-page">
            <p className="text-base font-500 text-center">Fusion X</p>
          </Link>
        </div>
        <div
          data-aos="fade-left"
          data-aos-duration="200"
          className="item w-full flex flex-col items-center"
        >
          <div className="w-[170px] h-[170px] rounded-full bg-white flex justify-center items-center overflow-hidden mb-2">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/saller-4.png`}
              alt="Rikayi Rox"
              width={170}
              height={170}
              className="object-cover"
            />
          </div>
          <Link href="/saller-page">
            <p className="text-base font-500 text-center">Rikayi Rox</p>
          </Link>
        </div>
        <div
          data-aos="fade-left"
          data-aos-duration="100"
          className="item w-full flex flex-col items-center"
        >
          <div className="w-[170px] h-[170px] rounded-full bg-white flex justify-center items-center overflow-hidden mb-2">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/saller-5.png`}
              alt="Habbriyi"
              width={170}
              height={170}
              className="object-cover"
            />
          </div>
          <Link href="/saller-page">
            <p className="text-base font-500 text-center">Habbriyi</p>
          </Link>
        </div>
        <div
          data-aos="fade-left"
          data-aos-duration="100"
          className="item w-full flex flex-col items-center"
        >
          <div className="w-[170px] h-[170px] rounded-full bg-white flex justify-center items-center overflow-hidden mb-2">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/saller-6.png`}
              alt="Rayhans"
              width={170}
              height={170}
              className="object-cover"
            />
          </div>
          <Link href="/saller-page">
            <p className="text-base font-500 text-center">Rayhans</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
