"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserInfo } from "@/types";
import { Profile } from "@/components/profile";
import { Customize } from "@/components/customize";
import { Statistics } from "@/components/statistics";
import { deleteAuthCookie, getUserInfo } from "@/actions/api";
import { getCache, setCache } from "@/helpers/store";
import { useIntl } from "react-intl";

const Dashboard = () => {
  const [user, setUser] = useState<UserInfo | null | undefined>(undefined);
  const router = useRouter();
  const [isMember, setIsMember] = useState(true);
  const intl = useIntl();

  useEffect(() => {
    const timeout: NodeJS.Timeout = setTimeout(() => {
      const cachedUser = getCache("user");
      if (cachedUser) {
        setUser(cachedUser);
        setIsMember(cachedUser.is_member);
      } else {
        getUserInfo().then((data) => {
          if (data.description === "Cookie token expired") {
            console.log("Cookie token expired");
            deleteAuthCookie();
            location.href = "/";
          }
          setUser(data.data);
          setIsMember(data.data.is_member);
          setCache("user", data.data); // 缓存数据
        });
      }
    }, 1000);

    return () => clearTimeout(timeout); // 清除定时器以避免内存泄漏
  }, [router]);

  if (user === undefined || user === null) {
    return null;
  }

  if (user === undefined || null) {
    return null;
  }

  return (
    <div className="dashboard-container py-8 px-2">
      <Profile user={user as UserInfo} />
      <Customize user={user as UserInfo} />
      <Statistics user={user as UserInfo} />

      {/* 当 user.is_member === false 时显示模糊蒙层 */}
      {!isMember && (
        <div className="backdrop">
          <div className="backdrop-content">
            <p className="text-gray-500">
              {intl.formatMessage({ id: "upgrade_tip" })}
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        .dashboard-container {
          position: relative;
        }

        .backdrop {
          position: absolute;
          top: 27%;
          left: 0;
          width: 100%;
          height: 70%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 100;
          border-radius: 5px;
        }

        .backdrop-content {
          font-size: 20px;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
