import Footer from "@/components/Footer";
import BannerItems from "@/components/store/home/banner/BannerItems";

export default function HomeSkel() {

  return <div className='relative z-10 mx-6'>
    <nav className="flex justify-between items-center py-4 px-0">
      <button className="bg-none border-none">
        <img className="navIcons" width={500} height={500} alt="menu-button" src={'/icons/hamburger.png'} /></button>
      <h3 className="cursor-pointer bg-blue-600 absolute left-1/2 px-4 py-2 text-white transform -translate-x-1/2">K Sports</h3>

      <div className="flex items-center" style={{ gap: "2vw" }}>
        <img alt='cart' className="navIcons" src='/icons/cart.png' />
      </div>

    </nav>

    <div className="flex sticky top-0 z-[1] px-[1rem] py-[0.5rem]"
      style={{
        borderRadius: "1rem",
        backgroundColor: "#F3F5F5"
      }}>
      <label>
        <img width={300} height={400} alt="search-icon" style={{ width: "1.5rem", aspectRatio: "1/1", height: "100%" }}
          src="/icons/search.png" /></label>
      <input
        style={{
          marginLeft: "1rem", fontSize: "1.1rem",
          outline: "none",
          border: "none",
          width: "100%",
          backgroundColor: "#F3F5F5"
        }} type="text" placeholder='Search for a product or a sport' />
    </div>

    <div className="overflow-hidden whitespace-nowrap mt-[2vh] h-[20vh] ssm:h-[25vh] sm:h-[35vh] md:h-[40vh]">
      <div
        className="inline-block h-full w-full my-0 mx-auto transition-transform duration-500 ease-in-out transform">
        <div className=":w-[90%] ssm:w-[80%] sm:w-[70%] lg:w-[60%] xl:w-[50%] h-full mx-auto relative">
          {BannerItems[0]}
          <div className="items-center flex absolute top-0 left-0 h-full max-w-[10%] text-7xl ssm:text-8xl">
            <h4></h4>
          </div>
          <div className="items-center flex absolute top-0 right-0 h-full max-w-[10%] text-7xl ssm:text-8xl">
            <h4 style={{ display: "block", cursor: "pointer" }}>&#8250;</h4>
          </div>
        </div>
      </div>
    </div>

    <h1 className="my-[10vh] text-center">Loading Items</h1>

    <Footer />
  </div>
}

