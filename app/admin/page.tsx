"use client";

import React, { useState, useEffect } from "react";
import { getCache, setCache } from "@/helpers/store";
import { deleteAuthCookie, getUserInfo, whetherIsAdmin } from "@/actions/api";
import { UserInfo } from "@/types";
import { Customize } from "@/components/customize";
import { Viewpoint } from "@/components/viewpoint";

const AdminPage = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [user, setUser] = useState<UserInfo | null>();

  useEffect(() => {
    // 从缓存中获取用户信息
    const cachedUser = getCache("user");
    if (cachedUser) {
      setUser(cachedUser);
    } else {
      // 如果缓存中没有用户信息，重新获取并更新状态
      getUserInfo().then((result) => {
        if (!result || result.description === "Cookie token expired") {
          console.log("Cookie token expired");
          deleteAuthCookie();
          location.href = "/";
        } else {
          setUser(result.data);
          setCache("user", result.data); // 缓存数据
          whetherIsAdmin().then((data) => {
            if (!data.data) {
              console.log("not admin token");
              location.href = "/";
            }
            setIsAdmin(data.data);
            result.data.is_admin = true;
            setUser(result.data);
          });
        }
      });
    }
  }, []);

  if (!user || user === null) {
    return null;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="about-container py-8 px-4 max-w-6xl mx-auto text-default-600">
      <Customize user={user as UserInfo} />
      <Viewpoint user={user as UserInfo} />
    </div>
  );
};

export default AdminPage;
