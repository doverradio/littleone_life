import PageTitle from "../../Helpers/PageTitle";
import Layout from "../../Partials/Layout";
import CommentBlog from "./CommentBlog";
import Image from 'next/image';

// Blog Image Component
function BlogImage({ src, alt }) {
  return (
    <div className="img w-full h-[457px] relative">
      <Image src={src} alt={alt} layout="fill" objectFit="cover" />
    </div>
  );
}

// Blog Metadata Component
function BlogMetadata({ author, comments }) {
  return (
    <div className="short-data flex space-x-9 items-center mb-3">
      <div className="flex space-x-1.5 items-center">
        <span>
          <svg
            width="12"
            height="15"
            viewBox="0 0 12 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG Path */}
          </svg>
        </span>
        <span className="text-base text-qgraytwo capitalize">By {author}</span>
      </div>
      <div className="flex space-x-1.5 items-center">
        <span>
          <svg
            width="16"
            height="15"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG Path */}
          </svg>
        </span>
        <span className="text-base text-qgraytwo">{comments} Comments</span>
      </div>
    </div>
  );
}

// Blog Content Component
function BlogContent({ title, content }) {
  return (
    <div className="blog pl-[24px] pt-[24px]">
      <BlogMetadata author="Admin" comments="10" />
      <div className="details">
        <h1 className="text-[22px] text-qblack font-semibold line-clamp-2 mb-1 capitalize">
          {title}
        </h1>
        <p className="text-qgraytwo text-[15px] leading-[30px] mb-10">
          {content}
        </p>
      </div>
    </div>
  );
}

// Extra Content Images Component
function ExtraContentImages({ imageUrls }) {
  return (
    <div className="w-full sm:flex sm:space-x-[30px] mb-3">
      {imageUrls.map((url, index) => (
        <div key={index} className="sm:w-[370px] h-[235px] relative">
          <Image src={url} alt="blog" layout="fill" objectFit="cover" />
        </div>
      ))}
    </div>
  );
}

// Tags and Share Component
function TagsAndShare() {
  return (
    <div className="w-full mt-4">
      <div className="w-full sm:flex justify-between items-center mb-[30px]">
        <div className="tags flex space-x-5 items-center mb-5 sm:mb-0">
          <span className="text-2xl text-qblack">Tags:</span>
          <span className="text-base text-qgraytwo hover:text-qyellow">
            #Technology
          </span>
          <span className="text-base text-qgraytwo hover:text-qyellow">
            #Agency
          </span>
          <span className="text-base text-qgraytwo hover:text-qyellow">
            #Data
          </span>
        </div>
        <div className="tags flex space-x-5 items-center">
          <span className="text-2xl text-qblack">Share:</span>
          {/* Social Share Icons */}
        </div>
      </div>
    </div>
  );
}

// Sidebar Widget Component
function SidebarWidget({ title, children }) {
  return (
    <div data-aos="fade-up" className="widget w-full p-[30px] bg-white mb-[30px]">
      <h1 className="text-[22px] text-qblack font-bold mb-5">{title}</h1>
      <div className="w-full h-[1px] bg-[#DCDCDC] mb-5"></div>
      {children}
    </div>
  );
}

// Blog Component
export default function Blog() {
  const blogTitle = "Business-to-consumer that involves selling fight into the find to a products and services";
  const blogContent = `ten occasional saw everything but conviction. Daughter returned quitting few are day advanced branched...`;
  const imageUrls = [
    `${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/blog-details-1.jpg`,
    `${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/blog-details-2.jpg`
  ];

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="blog-page-wrapper w-full">
        <div className="title-area mb-[60px]">
          <PageTitle
            title="Blog Details"
            breadcrumb={[
              { name: "home", path: "/" },
              { name: "blog details", path: "/blogs/blog" },
            ]}
          />
        </div>
        <div className="content-area w-full">
          <div className="container-x mx-auto">
            <div className="blog-article lg:flex lg:space-x-[30px] mb-7">
              <div className="flex-1">
                <BlogImage
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/blog-img-1.jpg`}
                  alt="blog"
                />
                <BlogContent title={blogTitle} content={blogContent} />
                <ExtraContentImages imageUrls={imageUrls} />
                <TagsAndShare />
                <CommentBlog />
              </div>
              <div className="lg:w-[370px] w-full">
                <SidebarWidget title="Search">
                  <div className="w-full h-[60px] relative">
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full h-full bg-[#F9F3E9] focus:outline-none focus:ring-0 pl-5 pr-16 placeholder:text-qgraytwo"
                    />
                    <span className="absolute right-5 top-[17px]">
                      {/* Search Icon */}
                    </span>
                  </div>
                </SidebarWidget>
                <SidebarWidget title="Latest Post">
                  {/* Latest Post Items */}
                </SidebarWidget>
                <SidebarWidget title="Categories">
                  {/* Categories List */}
                </SidebarWidget>
                <SidebarWidget title="Popular Tags">
                  {/* Popular Tags */}
                </SidebarWidget>
                <SidebarWidget title="Our Newsletter">
                  {/* Newsletter Form */}
                </SidebarWidget>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
