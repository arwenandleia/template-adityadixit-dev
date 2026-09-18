"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginLogoutButton = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh();
          router.push("/");
        },
      },
    });
  };

  if (isPending) {
    return <Button variant="outline">Loading..</Button>;
  }
  if (!session) {
    return (
      <Button variant="default">
        <Link href="/login">Login</Link>
      </Button>
    );
  }
  return (
    <Button variant="outline" onClick={handleSignout}>
      Logout
    </Button>
  );
};

export default LoginLogoutButton;
