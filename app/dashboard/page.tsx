"use client";

import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { UserInfo } from "@/types";
import { useIntl } from "react-intl";
import { Profile } from "@/components/profile";

const Dashboard = () => {
  const [user, setUser] = useState<UserInfo | null | undefined>(undefined);
  const router = useRouter();
  const intl = useIntl();

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
      {/* Profile Section */}
      <Profile />

      {/* Config Section */}
      <section
        className={`p-6 rounded-lg shadow-lg ${
          user?.is_member ? "bg-gray-800" : "bg-gray-800 opacity-40"
        }`}
      >
        {user?.is_member ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Config content goes here */}
          </div>
        ) : (
          <div className="text-center text-white">
            Upgrade to access this feature
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
