import Link from 'next/link';
import Image from 'next/image';
import Facebook from "../../../Helpers/icons/Facebook";
import Instagram from "../../../Helpers/icons/Instagram";
import Youtube from "../../../Helpers/icons/Youtube";

export default function Footer() {
  return (
    <footer className="footer-section-wrapper bg-white">
      <div className="container-x block mx-auto pt-[83px]">
        <div className="lg:flex justify-between mb-[95px]">
          <div className="lg:w-4/10 w-full mb-10 lg:mb-0">
            {/* logo area */}
            <div className="mb-14">
              <Link href="/">
                <Image
                  width={152}
                  height={36}
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/logo-2.svg`}
                  alt="logo"
                />
              </Link>
            </div>
            <div>
              <ul className="flex flex-col space-y-5">
                <li>
                  <Link href="/">
                    <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack">
                      Track Order
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack">
                      Delivery & Returns
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack">
                      Warranty
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="lg:w-2/10 w-full mb-10 lg:mb-0">
            <div className="mb-5">
              <h6 className="text-[18px] font-500 text-[#2F2F2F]">About us</h6>
            </div>
            <ul className="flex flex-col space-y-5">
              <li>
                <Link href="/">
                  <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack">
                    Rave’s Story
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack">
                    Work With Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack">
                    Corporate News
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack">
                    Investors
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:w-2/10 w-full mb-10 lg:mb-0">
            <div className="mb-5">
              <h6 className="text-[18px] font-500 text-[#2F2F2F]">Online Shop</h6>
            </div>
            <ul className="flex flex-col space-y-5">
              <li>
                <Link href="/">
                  <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack">
                    Furniture
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack">
                    Decoration
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack">
                    Kitchen
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack">
                    Interior
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:w-2/10 w-full mb-10 lg:mb-0">
            <div className="mb-5">
              <h6 className="text-[18px] font-500 text-[#2F2F2F]">Useful Links</h6>
            </div>
            <ul className="flex flex-col space-y-5">
              <li>
                <Link href="/">
                  <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack">
                    Secure Payment
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack">
                    Privacy Policy
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack">
                    Terms of Use
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="text-[#9A9A9A] text-[15px] hover:text-qblack border-b border-transparent hover:border-qblack">
                    Archived Products
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="bottom-bar border-t border-qgray-border lg:h-[82px] lg:flex justify-between items-center">
          <div className="flex lg:space-x-5 justify-between items-center mb-3">
            <div className="flex space-x-5 items-center">
              <a href="#">
                <Instagram className="fill-current text-qgray hover:text-qblack" />
              </a>
              <a href="#">
                <Facebook className="fill-current text-qgray hover:text-qblack" />
              </a>
              <a href="#">
                <Youtube className="fill-current text-qgray hover:text-qblack" />
              </a>
            </div>
            <span className="sm:text-base text-[10px] text-qgray font-300">
              ©2022
              <a
                href="https://quomodosoft.com/"
                target="_blank"
                rel="noreferrer"
                className="font-500 text-qblack mx-1"
              >
                Quomodosoft
              </a>
              All rights reserved
            </span>
          </div>
          <div className="">
            <a href="#">
              <Image
                width={318}
                height={28}
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/payment-getways.png`}
                alt="payment-getways"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
