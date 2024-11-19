"use client";
/* eslint-disable @next/next/no-img-element */
import { useIntl } from "react-intl";
import React, { useEffect, useState } from "react";
import { UserInfo } from "@/types";
import { deleteAuthCookie, findMyOrders, getUserInfo } from "@/actions/api";
import { Profile } from "@/components/profile";
import { usePathname } from "next/navigation";
import { getCache, setCache } from "@/helpers/store";
import Menu from "@/components/menu";

type ProfileProps = {
  user: UserInfo; // Ensure that user is of type UserInfo
  onBackdropChange: (newTopValue: string) => void; // 回调函数
};

const ProfilePage: React.FC<ProfileProps> = () => {
  const [user, setUser] = React.useState<UserInfo | null | undefined>(
    undefined
  );
  const [isMember, setIsMember] = React.useState(true);
  const intl = useIntl();
  const [locale, setLocaleState] = useState<string>(intl.locale); // 默认从 Intl 获取语言
  const pathname = usePathname();

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

  if (user === undefined || user === null) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      {/* 引入 Menu 组件 */}
      <Menu locale={locale} />
      <main className="w-4/5 px-8">
        <Profile user={user} />
      </main>
    </div>
  );
};

export default ProfilePage;
