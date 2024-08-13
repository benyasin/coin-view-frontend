"use client";

import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { UserInfo } from "@/types";
import { useIntl } from "react-intl";

const Dashboard = () => {
  const [user, setUser] = useState<UserInfo | null | undefined>(undefined);
  const router = useRouter();
  const intl = useIntl();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // 只有在客户端环境下才会执行这个代码块
      const userInfo = localStorage.getItem("coinViewUser");
      if (userInfo) {
        setUser(JSON.parse(userInfo) as UserInfo);
      } else {
        // 如果用户信息不存在，重定向到首页
        router.push("/");
      }
    }
  }, [router]);

  const youtubers = [
    {
      title: "Youtuber 1",
      avatar: "https://via.placeholder.com/150",
      subscribers: "1M",
    },
    {
      title: "Youtuber 2",
      avatar: "https://via.placeholder.com/150",
      subscribers: "500K",
    },
    {
      title: "Youtuber 3",
      avatar: "https://via.placeholder.com/150",
      subscribers: "200K",
    },
    {
      title: "Youtuber 4",
      avatar: "https://via.placeholder.com/150",
      subscribers: "150K",
    },
    {
      title: "Youtuber 5",
      avatar: "https://via.placeholder.com/150",
      subscribers: "100K",
    },
  ];

  const handleLogout = () => {
    console.log("User logged out");
    // 清除用户数据，重定向到登录页面或执行其他退出操作
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (user === undefined || null) {
    // 等待 useEffect 执行完毕
    return null;
  }

  return (
    <div className="py-8 px-24">
      {/* Profile Section */}
      <Card className="mb-8 p-8">
        <CardBody>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{user?.username}</div>
              <div className="text-sm">{user?.email}</div>
              <div className="text-sm">
                Plan:{" "}
                {user?.is_member
                  ? user?.membership_level
                  : intl.formatMessage({ id: "free_plan" })}
              </div>
              {user?.is_member ? (
                <div className="text-sm">
                  Expiry Date: {user?.membership_expiry}
                </div>
              ) : (
                <Button color="primary" size="sm">
                  Upgrade to Premium
                </Button>
              )}
            </div>
            <Button size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Config Section */}
      <section
        className={`p-6 rounded-lg ${
          user?.is_member ? "bg-gray-800" : "bg-gray-800 opacity-40"
        }`}
      >
        {user?.is_member ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {youtubers.map((yt, index) => (
              <div
                key={index}
                className="flex items-center p-4 bg-gray-700 rounded-lg"
              >
                <Avatar
                  src={yt.avatar}
                  size="lg"
                  className="mr-4"
                  alt={`Avatar of ${yt.title}`}
                />
                <div>
                  <div className="text-lg font-semibold text-white">
                    {yt.title}
                  </div>
                  <div className="text-gray-400">
                    Subscribers: {yt.subscribers}
                  </div>
                </div>
              </div>
            ))}
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
