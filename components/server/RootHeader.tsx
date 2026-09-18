import "server-only";

import Link from "next/link";
import LightDarkButton from "../client/LightDarkButton";
import LoginLogoutButton from "../client/login/LoginLogoutButton";

const RootHeader = () => {
  return (
    <header className="w-full sticky top-0 z-50 border-b-2 py-2">
      <nav className="max-w-container flex justify-between items-center">
        <h2 className="text-primary text-lg">
          <Link href="/">adityadixit.dev</Link>
        </h2>
        <ul className="flex items-center gap-x-4">
          <li>
            <LoginLogoutButton />
          </li>
          <li>
            <LightDarkButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default RootHeader;
