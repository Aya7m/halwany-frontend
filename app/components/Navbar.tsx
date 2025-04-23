// "use client";

// import { LayoutDashboard, Search, ShoppingBag } from 'lucide-react';
// import Link from 'next/link';
// import { useAuthContext } from '../context/AuthContext';

// import { useProductStore } from '../store/useProductStore';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"


// const Navbar = () => {
//   const { authUser } = useAuthContext();

//   console.log("authUser:", authUser);


//   const { cartProducts } = useProductStore()


//   return (
//     <div className='navbar text-white'>
//       <div className='max-w-7xl mx-auto flex justify-between p-10'>
//         <div className='flex gap-10 items-center'>
//           <Link href={'/'}>
//             <h2 className='font-bold text-3xl '>Halwany</h2>
//           </Link>
          // <ul className='flex gap-4'>
          //   <li><Link href={'/'}>Home</Link></li>
          //   <DropdownMenu>
          //     <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
          //     <DropdownMenuContent>
          //       <DropdownMenuLabel>Categories</DropdownMenuLabel>
          //       <DropdownMenuSeparator />

          //       <DropdownMenuItem asChild>
          //         <Link href="/category/Baklava">Baklava</Link>
          //       </DropdownMenuItem>

          //       <DropdownMenuItem asChild>
          //         <Link href="/category/kadayif">Kadayif</Link>
          //       </DropdownMenuItem>

          //       <DropdownMenuItem asChild>
          //         <Link href="/category/Pistachio">Pistachio</Link>
          //       </DropdownMenuItem>

          //       <DropdownMenuItem asChild>
          //         <Link href="/category/Borek">Borek</Link>
          //       </DropdownMenuItem>

          //       <DropdownMenuItem asChild>
          //         <Link href="/category/Chocolate">Chocolate</Link>
          //       </DropdownMenuItem>

          //     </DropdownMenuContent>
          //   </DropdownMenu>

          //   <li><Link href={'/contect'}>Contact</Link></li>
          // </ul>
//         </div>

//         <div className='flex items-center gap-10'>
//           {authUser ? (
//             <>
//               <Search />
//               {authUser?.user?.role === "user" ? (
//                 <Link href={'/myAccount'}>
//                   <span>{authUser?.user?.name || "My Account"}</span>
//                 </Link>
//               ) : (
//                 <Link href={'/dashboard'}>
//                   <LayoutDashboard />
//                 </Link>
//               )}
//             </>
//           ) : (
//             <Link href={'/login'}>Login</Link>
//           )}
//           <Link href={'/cart'} className='relative'>
//             <span className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center'>
//               {cartProducts?.length}
//             </span>
//             <ShoppingBag />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;




"use client";

import { Menu, Search, ShoppingBag, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useProductStore } from "../store/useProductStore";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Navbar = () => {
  const { authUser } = useAuthContext();
  const { getAllProducts, products, cartProducts } = useProductStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    getAllProducts();
  }, []);

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full shadow-md navbar text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 md:py-6">

        {/* Mobile Only - Burger Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="cursor-pointer" />
            </SheetTrigger>
            <SheetContent side="left" className="bg-white text-black w-64">
              <nav className="flex flex-col gap-4 mt-10">
                <Link href="/" className="hover:underline">Home</Link>
                <ul className='flex gap-4'>
          
            <DropdownMenu>
              <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Categories</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/category/Baklava">Baklava</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/category/kadayif">Kadayif</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/category/Pistachio">Pistachio</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/category/Borek">Borek</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/category/Chocolate">Chocolate</Link>
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>

            
          </ul>
                <Link href="/contect">Contact</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo - center on small, left on md+ */}
        <div className="text-xl font-bold text-center w-full md:w-auto md:mr-auto">
          <Link href="/">Halwany</Link>
        </div>

        {/* Desktop - Links on Left */}
        <div className="hidden md:flex items-center gap-4 mr-auto">
        <ul className='flex gap-4'>
            <li><Link href={'/'}>Home</Link></li>
            <DropdownMenu>
              <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Categories</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/category/Baklava">Baklava</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/category/kadayif">Kadayif</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/category/Pistachio">Pistachio</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/category/Borek">Borek</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/category/Chocolate">Chocolate</Link>
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>

            <li><Link href={'/contect'}>Contact</Link></li>
          </ul>
        </div>

        {/* Right side - Always on the right */}
        <div className="flex items-center gap-4">
          {/* Search - input for md+, icon for mobile */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-1 rounded-md border border-gray-300 text-black"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowResults(true);
              }}
            />
            <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
            {showResults && searchTerm && (
              <div className="absolute top-full mt-2 bg-white text-black w-64 rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
                {filteredProducts?.length > 0 ? (
                  filteredProducts.map((product) => (
                    <Link
                      href={`/product/${product._id}`}
                      key={product._id}
                      onClick={() => setShowResults(false)}
                      className="flex items-center gap-2 p-2 hover:bg-gray-100"
                    >
                      <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded" />
                      <span>{product.name}</span>
                    </Link>
                  ))
                ) : (
                  <p className="p-2 text-sm text-gray-500">No products found</p>
                )}
              </div>
            )}
          </div>

          {/* Search icon - mobile only */}
          <Search
            className="block md:hidden cursor-pointer"
            onClick={() => setShowResults(!showResults)}
          />

          {/* Cart */}
          <Link href="/cart" className="relative">
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartProducts?.length || 0}
            </span>
            <ShoppingBag />
          </Link>

          {/* Auth / Dashboard */}
          {authUser ? (
            authUser.role === "user" ? (
              <Link href="/myAccount">
                <span className="hidden md:block"> My Account</span>
              </Link>
            ) : (
              <Link href="/dashboard">
                <LayoutDashboard />
              </Link>
            )
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;


