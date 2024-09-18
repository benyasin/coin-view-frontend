"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserInfo } from "@/types";
import { Profile } from "@/components/profile";
import { Customize } from "@/components/customize";
import { Statistics } from "@/components/statistics";
import { getUserInfo } from "@/actions/api";

const Dashboard = () => {
  const [user, setUser] = useState<UserInfo | null | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getUserInfo();
      if (data) setUser(data);
    };

    fetchData();
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
