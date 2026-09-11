import "server-only";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { IconBrandX } from "@tabler/icons-react";

const RootFooter = () => {
  return (
    <footer className="w-full sticky bottom-0 z-50 border-t-2 pt-2 pb-1 text-xs">
      <nav className="max-w-container flex justify-between items-center">
        <p>© 2026 Aditya Dixit</p>
        <p>site under construction...</p>
        <ul className="flex items-center gap-x-4">
          <li className="hidden md:block">
            <Button variant="outline" size="icon-xs">
              <Link href="https://x.com/arwenandleia" target="_blank">
                <IconBrandX />
              </Link>
            </Button>
          </li>
          <li className="hidden md:block">
            <Button variant="outline" size="xs">
              <Link href="https://www.boot.dev/u/adityadixit" target="_blank">
                <Image
                  src="https://www.boot.dev/img/bootdev-logo-full-150.png"
                  alt="my boot dev progress"
                  width={320}
                  height={140}
                  style={{
                    objectFit: "contain",
                    height: "auto",
                    width: "48px",
                  }}
                />
              </Link>
            </Button>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default RootFooter;
