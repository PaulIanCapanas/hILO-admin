"use client";
import { type PropsWithChildren, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { AuthContext } from "../contexts/AuthContext";
import nonProtectedRoutes from "@/enums/routes";
import { Routes } from "@/enums/routes";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { user, loading } = useContext(AuthContext);
  const [showContent, setShowContent] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isNonProtectedRoute = nonProtectedRoutes.includes(pathname);

    if (!loading) {
      if (!user && !isNonProtectedRoute) {
        router.push(`/${Routes.LOGIN}`);
      } else if (user || isNonProtectedRoute) {
        setShowContent(true);
      }
    }
  }, [user, loading, pathname, router]);

  if (!showContent)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-center text-2xl">Loading...</p>
      </div>
    );

  return <>{children}</>;
};

export default ProtectedRoute;
