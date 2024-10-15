"use client";

import React, { useEffect } from "react";
import { UserInfo } from "@/types";
import { Profile } from "@/components/profile";
import { Customize } from "@/components/customize";
import { Statistics } from "@/components/statistics";
import { deleteAuthCookie, getUserInfo } from "@/actions/api";
import { getCache, setCache } from "@/helpers/store";
import { useIntl } from "react-intl";

const Dashboard = () => {
  const [user, setUser] = React.useState<UserInfo | null | undefined>(
    undefined
  );
  const [isMember, setIsMember] = React.useState(true);
  const [backdropTop, setBackdropTop] = React.useState("30%"); // 新增状态管理backdrop的top值
  const intl = useIntl();

  useEffect(() => {
    // 从缓存中获取用户信息
    const cachedUser = getCache("user");
    if (cachedUser) {
      setUser(cachedUser);
      setIsMember(cachedUser.is_member);
    } else {
      // 如果缓存中没有用户信息，重新获取并更新状态
      getUserInfo().then((result) => {
        if (!result || result.description === "Cookie token expired") {
          console.log("Cookie token expired");
          deleteAuthCookie();
          location.href = "/";
        } else {
          setUser(result.data);
          setIsMember(result.data.is_member);
          setCache("user", result.data); // 缓存数据
        }
      });
    }
  }, []);

  // 修改 backdrop 的函数
  const handleBackdropChange = (newTopValue: string) => {
    setBackdropTop(newTopValue);
  };

  if (user === undefined || user === null) {
    return null;
  }

  return (
    <div className="dashboard-container py-8 px-2">
      <Profile
        user={user as UserInfo}
        onBackdropChange={handleBackdropChange}
      />
      {/* 传递回调函数 */}
      <Customize user={user as UserInfo} />
      <Statistics user={user as UserInfo} />

      {/* 当 user.is_member === false 时显示模糊蒙层 */}
      {!isMember && (
        <div className="backdrop" style={{ top: backdropTop }}>
          <div className="backdrop-content">
            <p className="text-gray-500">
              {intl.formatMessage({ id: "upgrade_tip" })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
