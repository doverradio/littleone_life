import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Arrow from "../../../Helpers/icons/Arrow";

export default function Navbar({ className }) {
  const [categoryToggle, setToggle] = useState(false);
  const [elementsSize, setSize] = useState("0px");

  const handler = () => {
    setToggle(!categoryToggle);
  };

  useEffect(() => {
    if (categoryToggle) {
      const getItems = document.querySelectorAll(`.categories-list li`).length;
      if (categoryToggle && getItems > 0) {
        setSize(`${42 * getItems}px`);
      }
    } else {
      setSize(`0px`);
    }
  }, [categoryToggle]);

  return (
    <div className={`nav-widget-wrapper w-full bg-qh2-green h-[60px] relative z-30 ${className || ""}`}>
      <div className="container-x mx-auto h-full">
        <div className="w-full h-full relative">
          <div className="w-full h-full flex justify-between items-center">
            <div className="category-and-nav flex xl:space-x-7 space-x-3 items-center">
              <div className="category w-[270px] h-[53px] bg-white px-5 rounded-t-md mt-[6px] relative">
                <button onClick={handler} type="button" className="w-full h-full flex justify-between items-center">
                  <div className="flex space-x-3 items-center">
                    <span className="text-qblack">
                      <svg className="fill-current" width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="14" height="1" />
                        <rect y="8" width="14" height="1" />
                        <rect y="4" width="10" height="1" />
                      </svg>
                    </span>
                    <span className="text-sm font-600 text-qblacktext">All Categories</span>
                  </div>
                  <div>
                    <Arrow width="5.78538" height="1.28564" className="fill-current text-qblacktext" />
                  </div>
                </button>
                {categoryToggle && <div className="fixed top-0 left-0 w-full h-full -z-10" onClick={handler}></div>}
                <div className="category-dropdown w-full absolute left-0 top-[53px] overflow-hidden" style={{ height: `${elementsSize}` }}>
                  <ul className="categories-list">
                    <li className="category-item">
                      <Link href="#">
                        <a>
                          <div className="flex justify-between items-center px-5 h-10 bg-white hover:bg-qh2-green transition-all duration-300 ease-in-out cursor-pointer text-qblack hover:text-white">
                            <div className="flex items-center space-x-6">
                              <span>
                                <Image src="/icons/mobile-laptop.svg" alt="Mobile & Laptops" width={12} height={16} />
                              </span>
                              <span className="text-xs font-400">Mobile & Laptops</span>
                            </div>
                            <div>
                              <Arrow width="6" height="9" className="fill-current" />
                            </div>
                          </div>
                        </a>
                      </Link>
                    </li>
                    <li className="category-item">
                      <Link href="#">
                        <a>
                          <div className="flex justify-between items-center px-5 h-10 bg-white hover:bg-qh2-green transition-all duration-300 ease-in-out cursor-pointer text-qblack hover:text-white">
                            <div className="flex items-center space-x-6">
                              <span>
                                <Image src="/icons/gaming-entertainment.svg" alt="Gaming Entertainment" width={19} height={17} />
                              </span>
                              <span className="text-xs font-400">Gaming Entertainment</span>
                            </div>
                            <div>
                              <Arrow width="6" height="9" className="fill-current" />
                            </div>
                          </div>
                        </a>
                      </Link>
                    </li>
                    <li className="category-item">
                      <Link href="#">
                        <a>
                          <div className="flex justify-between items-center px-5 h-10 bg-white hover:bg-qh2-green transition-all duration-300 ease-in-out cursor-pointer text-qblack hover:text-white">
                            <div className="flex items-center space-x-6">
                              <span>
                                <Image src="/icons/image-video.svg" alt="Image & Video" width={18} height={14} />
                              </span>
                              <span className="text-xs font-400">Image & Video</span>
                            </div>
                            <div>
                              <Arrow width="6" height="9" className="fill-current" />
                            </div>
                          </div>
                        </a>
                      </Link>
                    </li>
                    <li className="category-item">
                      <Link href="#">
                        <a>
                          <div className="flex justify-between items-center px-5 h-10 bg-white hover:bg-qh2-green transition-all duration-300 ease-in-out cursor-pointer text-qblack hover:text-white">
                            <div className="flex items-center space-x-6">
                              <span>
                                <Image src="/icons/vehicles.svg" alt="Vehicles" width={20} height={16} />
                              </span>
                              <span className="text-xs font-400">Vehicles</span>
                            </div>
                            <div>
                              <Arrow width="6" height="9" className="fill-current" />
                            </div>
                          </div>
                        </a>
                      </Link>
                    </li>
                    <li className="category-item">
                      <Link href="#">
                        <a>
                          <div className="flex justify-between items-center px-5 h-10 bg-white hover:bg-qh2-green transition-all duration-300 ease-in-out cursor-pointer text-qblack hover:text-white">
                            <div className="flex items-center space-x-6">
                              <span>
                                <Image src="/icons/furnitures.svg" alt="Furnitures" width={17} height={18} />
                              </span>
                              <span className="text-xs font-400">Furnitures</span>
                            </div>
                            <div>
                              <Arrow width="6" height="9" className="fill-current" />
                            </div>
                          </div>
                        </a>
                      </Link>
                    </li>
                    <li className="category-item">
                      <Link href="#">
                        <a>
                          <div className="flex justify-between items-center px-5 h-10 bg-white hover:bg-qh2-green transition-all duration-300 ease-in-out cursor-pointer text-qblack hover:text-white">
                            <div className="flex items-center space-x-6">
                              <span>
                                <Image src="/icons/sport.svg" alt="Sport" width={17} height={21} />
                              </span>
                              <span className="text-xs font-400">Sport</span>
                            </div>
                            <div>
                              <Arrow width="6" height="9" className="fill-current" />
                            </div>
                          </div>
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* You can add other Navbar components here */}
          </div>
        </div>
      </div>
    </div>
  );
}
