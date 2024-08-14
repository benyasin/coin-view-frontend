"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserInfo } from "@/types";
import { Profile } from "@/components/profile";
import { Customize } from "@/components/customize";

const Dashboard = () => {
  const [user, setUser] = useState<UserInfo | null | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userInfo = localStorage.getItem("coinViewUser");
      if (userInfo) {
        setUser(JSON.parse(userInfo) as UserInfo);
      } else {
        router.push("/");
      }
    }
  }, [router]);

  if (user === undefined || null) {
    return null;
  }

  return (
    <div className="py-8 px-24">
      <Profile user={user as UserInfo} />
      <Customize user={user as UserInfo} />
    </div>
  );
};

export default Dashboard;
