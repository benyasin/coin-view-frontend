"use client";
/* eslint-disable @next/next/no-img-element */
import { useIntl } from "react-intl";
import React, { useEffect, useState } from "react";
import { UserInfo } from "@/types";
import { deleteAuthCookie, findMyOrders, getUserInfo } from "@/actions/api";
import { Profile } from "@/components/profile";
import Menu from "@/components/menu";
import { getLocalizedUrl } from "@/helpers/getLocalizedUrl";

const ProfilePage: React.FC = () => {
  const [user, setUser] = React.useState<UserInfo | null | undefined>(
    undefined
  );
  const [isMember, setIsMember] = React.useState(true);
  const intl = useIntl();
  const [locale, setLocaleState] = useState<string>(intl.locale); // 默认从 Intl 获取语言

  useEffect(() => {
    getUserInfo().then((result) => {
      if (!result || result.description === "Cookie token expired") {
        console.log("Cookie token expired");
        deleteAuthCookie();
        location.href = getLocalizedUrl("/", intl.locale);
      } else {
        setUser(result.data);
        setIsMember(result.data.is_member);
      }
    });
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
