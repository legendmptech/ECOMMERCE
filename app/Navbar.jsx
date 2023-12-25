import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import CartIcon from "./components/Icon/CartIcon";
import Image from "next/image";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <nav className="w-full flex justify-center bg-base-100 border-b-2 fixed top-0 left-0 z-20 h-[70px]">
      <div className="navbar max-w-4xl w-full">
        <div className="navbar-start drawer flex">
          <input id="menu-sidebar" type="checkbox" className="drawer-toggle" />
          <div className="md:hidden">
            <label
              htmlFor="menu-sidebar"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="drawer-side z-40">
            <label
              htmlFor="menu-sidebar"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-3 w-80 min-h-full bg-base-100 text-base-content pt-20">
              {/* Sidebar content here */}
              <li>
                <Link href={"/products/tshirt"} className="">
                  T-Shirts
                </Link>
              </li>
              <li>
                <Link href={"/products/pant"} className="">
                  Pants
                </Link>
              </li>
            </ul>
          </div>
          <Link href={"#"} className="btn btn-ghost text-xl z-30">
            MensFit
          </Link>
        </div>
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href={"/products/tshirt"}>T-Shirts</Link>
            </li>
            <li>
              <Link href={"/products/pant"}>Pants</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {/* SHOPPING CART SIDEBAR */}
          <div className="flex flex-row gap-4 items-center">
            <CartIcon />
            {session ? (
              <div className="flex gap-4 items-center cursor-pointer">
                {/* ____________________PROFILE PICTURE_________________________ */}
                <div className="dropdown dropdown-end z-10">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar z-30"
                  >
                    <div className="rounded-full">
                      <Image
                        alt="profile picture"
                        src={session.user?.image}
                        className="z-30 w-[40px] h-[40px]"
                        width={40}
                        height={40}
                      />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <Link href={"#"} className="justify-between">
                        Profile
                        <span className="badge">New</span>
                      </Link>
                    </li>
                    <li>
                      <Link href={"#"}>Settings</Link>
                    </li>
                    <li>
                      <Link
                        href={"/api/auth/signout"}
                        className="hover:bg-red-300"
                      >
                        SignOut
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <Link className="btn btn-accent" href="/api/auth/signin">
                SignIn
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
