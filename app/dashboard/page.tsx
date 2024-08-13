"use client";

import React, { useEffect } from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Divider,
  Spacer,
  Tooltip,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  // 模拟没有用户信息时的情况
  const userInfo = localStorage.getItem("coinViewUser"); // 这里应该是获取存储在 localStorage 的用户信息
  const user = userInfo ? JSON.parse(userInfo) : null;
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      // 如果用户信息为空，重定向到首页
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    // 如果用户信息为空，暂时返回 null，直到完成重定向
    return null;
  }

  const isPremium = user.plan !== "Free";

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

  return (
    <div className="py-8 px-24">
      {/* Profile Section */}
      <Card className="mb-8 p-8">
        <CardBody>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{user.username}</div>
              <div className="text-sm">{user.email}</div>
              <div className="text-sm">Plan: {user.plan}</div>
              {isPremium ? (
                <div className="text-sm">Expiry Date: {user.expiryDate}</div>
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
          isPremium ? "bg-gray-800" : "bg-gray-800 opacity-40"
        }`}
      >
        {isPremium ? (
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
