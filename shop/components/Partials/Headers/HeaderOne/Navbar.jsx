import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Arrow from "../../../Helpers/icons/Arrow";

export default function Navbar({ className, type }) {
  const [categoryToggle, setToggle] = useState(false);
  const [elementsSize, setSize] = useState("0px");

  const handler = () => {
    setToggle(!categoryToggle);
  };

  useEffect(() => {
    if (categoryToggle) {
      const getItems = document.querySelectorAll(`.categories-list li`).length;
      if (getItems > 0) {
        setSize(`${42 * getItems}px`);
      }
    } else {
      setSize(`0px`);
    }
  }, [categoryToggle]);

  return (
    <div
      className={`nav-widget-wrapper w-full h-[60px] relative z-30 ${
        type === 3 ? "bg-qh3-blue" : "bg-qyellow"
      } ${className || ""}`}
    >
      <div className="container-x mx-auto h-full">
        <div className="w-full h-full relative">
          <div className="w-full h-full flex justify-between items-center">
            <div className="category-and-nav flex xl:space-x-7 space-x-3 items-center">
              <div className="category w-[270px] h-[53px] bg-white px-5 rounded-t-md mt-[6px] relative">
                <button
                  onClick={handler}
                  type="button"
                  className="w-full h-full flex justify-between items-center"
                >
                  <div className="flex space-x-3 items-center">
                    <span>
                      <svg
                        className="fill-current"
                        width="14"
                        height="9"
                        viewBox="0 0 14 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="14" height="1" />
                        <rect y="8" width="14" height="1" />
                        <rect y="4" width="10" height="1" />
                      </svg>
                    </span>
                    <span className="text-sm font-600 text-qblacktext">
                      All Categories
                    </span>
                  </div>
                  <div>
                    <Arrow
                      width="5.78538"
                      height="1.28564"
                      className="fill-current text-qblacktext"
                    />
                  </div>
                </button>
                {categoryToggle && (
                  <div
                    className="fixed top-0 left-0 w-full h-full -z-10"
                    onClick={handler}
                  ></div>
                )}
                <div
                  className="category-dropdown w-full absolute left-0 top-[53px] overflow-hidden"
                  style={{ height: `${elementsSize} ` }}
                >
                  <ul className="categories-list">
                    {categoryItems.map((item, index) => (
                      <li className="category-item" key={index}>
                        <Link href="/all-products">
                          <div
                            className={`flex justify-between items-center px-5 h-10 bg-white transition-all duration-300 ease-in-out cursor-pointer text-qblack ${
                              type === 3
                                ? "hover:bg-qh3-blue hover:text-white"
                                : "hover:bg-qyellow"
                            }`}
                          >
                            <div className="flex items-center space-x-6">
                              {/* <Image
                                src={item.icon}
                                width={20}
                                height={20}
                                alt={item.name}
                              /> */}
                              <img src={item.icon} width={20} height={20} alt={item.name} />

                              <span className="text-xs font-400">
                                {item.name}
                              </span>
                            </div>
                            <div>
                              <Arrow
                                width="6"
                                height="9"
                                className="fill-current"
                              />
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Static category items for demo purposes, could be dynamic
const categoryItems = [
  {
    name: "Mobile & Laptops",
    icon: "/assets/icons/mobile-laptop-icon.svg",
  },
  {
    name: "Gaming Entertainment",
    icon: "/assets/icons/gaming-entertainment-icon.svg",
  },
  {
    name: "Image & Video",
    icon: "/assets/icons/image-video-icon.svg",
  },
  {
    name: "Vehicles",
    icon: "/assets/icons/vehicles-icon.svg",
  },
  {
    name: "Furnitures",
    icon: "/assets/icons/furnitures-icon.svg",
  },
  {
    name: "Sport",
    icon: "/assets/icons/sport-icon.svg",
  },
];
