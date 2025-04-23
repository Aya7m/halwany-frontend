

"use client"; // إذا كنتِ في App Router
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";
import BestSelling from "./bestSellig/page";
import PistachioPage from "./pistachio/page";



export default function Home() {




  const images = [
    "https://res.cloudinary.com/dnejzqj2z/image/upload/v1743365341/Screenshot_2025-03-01_at_1.40.08_AM_2_nauywv.webp",
    "https://res.cloudinary.com/dnejzqj2z/image/upload/v1743365532/farukkkk_dmas4u.webp",
    "https://res.cloudinary.com/dnejzqj2z/image/upload/v1743365961/dd7ca923-a88f-4c56-ac25-08264b3b2092_fvc2g0.webp",
    "https://res.cloudinary.com/dnejzqj2z/image/upload/v1743366134/Farouk_2_copy_aheyex.webp"
  ];





  return (
    <>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        // navigation={true}
        modules={[Autoplay, Pagination]}
        className="w-full h-screen"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-screen bg-cover bg-center"
              style={{ backgroundImage: `url(${src})` }}
            />

            <Link href="/allProducts" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white py-2 px-4 rounded-lg">
              Shop Now
            </Link>


          </SwiperSlide>

        ))}
      </Swiper>



      <BestSelling />
      <div className="w-full my-5 mx-auto flex items-center justify-center">
        <Link href={`/category/Kadayif`} className="text-4xl text-center">

          <div className="relative">
            <img src="https://res.cloudinary.com/dnejzqj2z/image/upload/v1744065776/Kadayif_seperatorr_tpnpwg.webp" alt="" />
            <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold">
              Kadayif
            </h1>
          </div>

        </Link>

      </div>


      <div className="max-w-7xl mx-auto mt-12 flex justify-center items-center">

        <Link href={`/category/Baklava`}>


          <h1 className="text-4xl text-center my-3">𝐁𝐚𝐤𝐥𝐚𝐯𝐚 𝐏𝐥𝐚𝐧𝐞𝐭</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-12">
            <div className="flex-1 flex-col items-center justify-center gap-5 hover:scale-105 trasation duration-300">
              <img src="https://res.cloudinary.com/dnejzqj2z/image/upload/v1744071216/34_5740831e-e21f-4df4-be31-7c962494e9b3_1_diylme.webp" width={700} className="mb-5 w-full" alt="" />
            </div>
            <div className="w-2/3 flex-col mt-5 items-center justify-center gap-5 hover:scale-105 trasation duration-300">
              <img src="https://res.cloudinary.com/dnejzqj2z/image/upload/v1744071297/26_bce36e7f-4605-4379-9915-ba002196554d_x1mecw.webp" width={200} className="mb-5 sm:w-full mx-auto" alt="" />
              <img src="https://res.cloudinary.com/dnejzqj2z/image/upload/v1744071342/18_87eb2fcd-5541-4c14-8c1e-ac29b777a606_x7ocst.webp" width={200} className="mb-5 sm:w-full mx-aut" alt="" />
            </div>


          </div>
        </Link>

      </div>

      <div className="w-full mt-12 flex items-center justify-center mx-auto ">
        <div className="relative">
          <img src="https://res.cloudinary.com/dnejzqj2z/image/upload/v1744072889/pista_snkxzg.webp" alt="" />


          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold">
            𝗕𝗮𝗸𝗲𝗱 𝗙𝗿𝗲𝘀𝗵 𝗗𝗮𝗶𝗹𝘆
          </div>
        </div>


      </div>



      <PistachioPage/>
      <div className="max-w-5xl mx-auto mt-12">
        <div className="text-center my-4 text-4xl font-bold">
          Checolata checo
        </div>

        <div className="flex items-center justify-center gap-12">
          <Link href={`/category/Chocolate`}>
            <img
              src="https://res.cloudinary.com/dnejzqj2z/image/upload/v1744051503/products/fx8cjs7jnaozjkptyakg.webp"
              alt=""
              className="rounded-md cursor-pointer"
            />
          </Link>

          <Link href={`/category/Chocolate`}>
            <img
              src="https://res.cloudinary.com/dnejzqj2z/image/upload/v1744071297/26_bce36e7f-4605-4379-9915-ba002196554d_x1mecw.webp"
              alt=""
              className="cursor-pointer"
            />
          </Link>
        </div>
      </div>

      <div className="w-full my-12 flex items-center justify-center  ">
        <img src="https://res.cloudinary.com/dnejzqj2z/image/upload/v1744116357/HOUSE_OF_BAKLAVAS_ddc712cb-8278-43a4-a465-0aa565529bd4_vl3orf.webp" alt="aaa"  />

      </div>





    </>



  );
}
