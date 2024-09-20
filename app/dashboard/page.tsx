"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserInfo } from "@/types";
import { Profile } from "@/components/profile";
import { Customize } from "@/components/customize";
import { Statistics } from "@/components/statistics";
import { getUserInfo } from "@/actions/api";
import { getCache, setCache } from "@/helpers/store";

const Dashboard = () => {
  const [user, setUser] = useState<UserInfo | null | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const cachedUser = getCache("user");
      if (cachedUser) {
        setUser(cachedUser);
      } else {
        getUserInfo().then((data) => {
          setUser(data.data);
          setCache("user", data.data); // 缓存数据
        });
      }
    }, 1000);

    return () => clearTimeout(timeout); // 清除定时器以避免内存泄漏
  }, [router]);

  if (user === undefined || null) {
    return null;
  }

  return (
    <div className="py-8 px-24">
      <Profile user={user as UserInfo} />
      <Customize user={user as UserInfo} />
      <Statistics />
    </div>
  );
};

export default Dashboard;
