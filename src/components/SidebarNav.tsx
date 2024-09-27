import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/Dropdown-menu";
import CreateCommunityDialog from "./CreateCommunityDialog";
import { ChevronDown, Home, Plus } from "lucide-react";
import { getAuthSession } from "@/lib/auth";
import Auth from "./Auth";

const SideNav = async () => {
  const session = await getAuthSession();

  return (
    <div className="w-72">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full bg-transparent py-2 px-3 text-zinc-200 rounded-lg hover:border-[1px] hover:border-zinc-700 font-light">
          <div className="flex justify-between w-full items-center">
            <div className="flex gap-2 items-center">
              <Home size={22} />
              <span>Home</span>
            </div>
            <div>
              <ChevronDown size={20} />
            </div>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="flex flex-col py-5 px-3 w-72  text-zinc-200 bg-[#1A1A1B] border-zinc-700 ">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span className="text-[0.6rem] font-bold mb-2">MODERATING</span>
              <DropdownMenuItem asChild>
                <Link href="/" className="text-[0.9rem] font-medium">
                  Mode Queue
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/" className="text-[0.9rem] font-medium">
                  Mode mail
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/" className="text-[0.9rem] font-medium">
                  r/Mod
                </Link>
              </DropdownMenuItem>
              {/* your subreddit */}
            </div>

            <div className="flex flex-col mt-4">
              <span className="text-[0.7rem] font-bold">Feeds</span>
              <div className="flex">
                <Plus className="text-zinc-700" />
                {session?.user ? (
                  <CreateCommunityDialog>
                    <p>Create Community</p>
                  </CreateCommunityDialog>
                ) : (
                  <Auth>
                    <p>Create Community</p>
                  </Auth>
                )}
              </div>
            </div>

            <div className="flex flex-col mt-4">
              <span className="text-[0.7rem] font-bold">Feeds</span>
              <DropdownMenuItem asChild>
                <Link href="/" className="text-[0.9rem] font-medium">
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/" className="text-[0.9rem] font-medium">
                  Popular
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/" className="text-[0.9rem] font-medium">
                  All
                </Link>
              </DropdownMenuItem>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SideNav;
