import { useRouter } from "next/router";
import Link from 'next/link'; // Import Link component from Next.js
import { useEffect, useState } from "react";
import datas from "../../../data/products.json";
import BreadcrumbCom from "../../BreadcrumbCom";
import Layout from "../../Partials/Layout";
import IcoAdress from "./icons/IcoAdress";
import IcoCart from "./icons/IcoCart";
import IcoDashboard from "./icons/IcoDashboard";
import IcoLogout from "./icons/IcoLogout";
import IcoLove from "./icons/IcoLove";
import IcoPassword from "./icons/IcoPassword";
import IcoPayment from "./icons/IcoPayment";
import IcoPeople from "./icons/IcoPeople";
import IcoReviewHand from "./icons/IcoReviewHand";
import IcoSupport from "./icons/IcoSupport";
import AddressesTab from "./tabs/AddressesTab";
import Dashboard from "./tabs/Dashboard";
import OrderTab from "./tabs/OrderTab";
import PasswordTab from "./tabs/PasswordTab";
import Payment from "./tabs/Payment";
import ProfileTab from "./tabs/ProfileTab";
import ReviewTab from "./tabs/ReviewTab";
import SupportTab from "./tabs/SupportTab";
import WishlistTab from "./tabs/WishlistTab";

export default function Profile() {
  const [switchDashboard, setSwitchDashboard] = useState(false);
  const router = useRouter();
  const [active, setActive] = useState("dashboard");
  const [isClient, setIsClient] = useState(false); // Track if the client-side is rendered

  // Ensure this only runs on the client side
  useEffect(() => {
    setIsClient(true); // Set to true when the client renders
  }, []);

  useEffect(() => {
    // Extract hash content and update active state only on the client
    if (isClient) {
      const getHashContent = router.asPath.split("#");
      setActive(getHashContent.length > 1 ? getHashContent[1] : "dashboard");
    }
  }, [router.asPath, isClient]);

  // Early return to prevent hydration issues
  if (!isClient) {
    return null;
  }

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="profile-page-wrapper w-full">
        <div className="container-x mx-auto">
          <div className="w-full my-10">
            <BreadcrumbCom
              paths={[
                { name: "home", path: "/" },
                { name: "profile", path: "/profile" },
              ]}
            />
            <div className="w-full bg-white px-10 py-9">
              <div className="title-area w-full flex justify-between items-center">
                <h1 className="text-[22px] font-bold text-qblack">
                  Your Dashboard
                </h1>
                <div className="switch-dashboard flex space-x-3 items-center">
                  <p className="text-qgray text-base">Switch Dashboard</p>
                  <button
                    onClick={() => setSwitchDashboard(!switchDashboard)}
                    type="button"
                    className="w-[73px] h-[31px] border border-[#D9D9D9] rounded-full relative "
                  >
                    <div
                      className={`w-[23px] h-[23px] bg-qblack rounded-full absolute top-[3px] transition-all duration-300 ease-in-out ${
                        switchDashboard ? "left-[44px]" : "left-[4px]"
                      }`}
                    ></div>
                  </button>
                </div>
              </div>
              <div className="profile-wrapper w-full mt-8 flex space-x-10">
                <div className="w-[236px] min-h-[600px] border-r border-[rgba(0, 0, 0, 0.1)]">
                  <div className="flex flex-col space-y-10">
                    <div className="item group">
                      <Link href="/profile#dashboard">
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack cursor-pointer">
                          <span>
                            <IcoDashboard />
                          </span>
                          <span className="font-normal text-base">Dashboard</span>
                        </div>
                      </Link>
                    </div>
                    <div className="item group">
                      <Link href="/profile#profile">
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack cursor-pointer">
                          <span>
                            <IcoPeople />
                          </span>
                          <span className="font-normal text-base">
                            Personal Info
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="item group">
                      <Link href="/profile#payment">
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack cursor-pointer">
                          <span>
                            <IcoPayment />
                          </span>
                          <span className="font-normal text-base">
                            Payment Method
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="item group">
                      <Link href="/profile#order">
                        <div className="flex space-x-3 items-center text-qgray hover:text-qblack cursor-pointer">
                          <span>
                            <IcoCart />
                          </span>
                          <span className="font-normal text-base">Order</span>
                        </div>
                      </Link>
                    </div>
                    {/* Continue similarly for other links */}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="item-body dashboard-wrapper w-full">
                    {active === "dashboard" && <Dashboard />}
                    {active === "profile" && <ProfileTab />}
                    {active === "payment" && <Payment />}
                    {active === "order" && <OrderTab />}
                    {active === "wishlist" && <WishlistTab />}
                    {active === "address" && <AddressesTab />}
                    {active === "password" && <PasswordTab />}
                    {active === "support" && <SupportTab />}
                    {active === "review" && <ReviewTab products={datas.products} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
