"use client";

import { MdOutlinePostAdd } from "react-icons/md";
import { HiOutlineLogin } from "react-icons/hi";
import { HiOutlineLogout } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { signIn, useSession, getProviders, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Nav = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [Providers, setProviders] = useState(null);
  const [MobileToggle, setMobileToggle] = useState(false);
  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMobileToggle(false);
    }
  };

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();

    if (MobileToggle) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [MobileToggle]);

  return (
    <nav className="flex-between w-full mb-10 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Hotpost</p>
      </Link>

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link
              href="/create-post"
              className="flex items-center gap-2 blue_btn"
            >
              Create Post <MdOutlinePostAdd />
            </Link>
            <button
              type="button"
              onClick={() => {
                signOut({ callbackUrl: "/" });
              }}
              className="outline_blue_btn flex items-center gap-2"
            >
              Sign Out <HiOutlineLogout />
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image}
                alt="Profile"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {Providers &&
              Object.values(Providers).map((provider) => (
                <button
                  type="button"
                  onClick={() => signIn(provider.id)}
                  key={provider.name}
                  className="blue_btn flex items-center gap-2"
                >
                  Sign In <HiOutlineLogin />
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative z-10" ref={menuRef}>
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              alt="Profile"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => setMobileToggle((prev) => !prev)}
            />

            {MobileToggle && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link flex items-center gap-2"
                  onClick={() => setMobileToggle(false)}
                >
                  My Profile <CgProfile />
                </Link>
                <Link
                  href="/create-post"
                  className="dropdown_link flex items-center gap-2"
                  onClick={() => setMobileToggle(false)}
                >
                  Create Post <MdOutlinePostAdd />
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setMobileToggle(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="mt-3 w-full blue_btn flex items-center gap-2"
                >
                  Sign Out <HiOutlineLogout />
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {Providers &&
              Object.values(Providers).map((provider) => (
                <button
                  type="button"
                  onClick={() => signIn(provider.id)}
                  key={provider.name}
                  className="blue_btn flex items-center gap-2"
                >
                  Sign In <HiOutlineLogin />
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
