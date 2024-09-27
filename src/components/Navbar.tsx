import Link from "next/link";
import Image from "next/image";
import NavLink from "./NavLink";
import SideNav from "./SidebarNav";
import { getAuthSession } from "@/lib/auth";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";

const Navbar = async () => {
  const session = await getAuthSession();
  return (
    <div className="fixed top-0 h-fit border-b border-zinc-700 py-3 inset-x-5 z-10 px-2 bg-[#1A1A1B]">
      <div className="grid justify-between grid-cols-12">
        {/* logo */}
        <div className="col-span-3 flex items-center gap-3">
          <Link href="/" className="flex gap-2 items-center">
            <Image
              src="assets/reddit.svg"
              alt="Reddit Logo"
              width={35}
              height={35}
            />
            <p className="hidden md:block text-2xl font-extrabold">reddit</p>
          </Link>

          <SideNav />
        </div>
        {/* Search bar */}
        <div className="col-span-6"></div>
        {/* nav link */}
        <div className="col-span-3">
          <NavLink />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
