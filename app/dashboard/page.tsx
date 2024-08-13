"use client";

import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { UserInfo } from "@/types";
import { useIntl } from "react-intl";
import { motion } from "framer-motion";

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

  const handleLogout = () => {
    console.log("User logged out");
    localStorage.removeItem("coinViewUser");
    router.push("/login");
  };

  if (user === undefined || null) {
    return null;
  }

  return (
    <div className="py-8 px-24">
      {/* Profile Section */}
      <Card className="mb-8 p-8 bg-gradient-to-r from-gray-900 to-green-950 shadow-lg rounded-lg">
        <CardBody>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div>
                <div className="text-3xl text-gray-300 font-bold mb-2">
                  {user?.username}
                </div>
                <div className="text-md text-gray-400">{user?.email}</div>
                <div className="text-md text-gray-400 mt-1">
                  {intl.formatMessage({ id: "currently_you" })}
                  <span className="font-bold text-yellow-800">
                    {user?.is_member
                      ? intl.formatMessage({
                          id: user?.membership_level.replace(" ", "_"),
                        })
                      : intl.formatMessage({ id: "free_plan" })}
                  </span>
                </div>
                {user?.is_member && (
                  <div className="text-md text-gray-400 mt-1">
                    {intl.formatMessage(
                      { id: "expire_in" },
                      { dueDay: user?.membership_expiry }
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-between items-center">
              <Button
                size="lg"
                onClick={handleLogout}
                color="primary"
                className="mb-8"
                variant="light"
              >
                {intl.formatMessage({ id: "logout" })}
              </Button>

              <Button
                size="sm"
                className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
              >
                {intl.formatMessage({ id: "upgrade_to_premium" })}
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

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
