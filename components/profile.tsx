"use client";
/* eslint-disable @next/next/no-img-element */
import { useIntl } from "react-intl";
import { Button, Card, CardBody } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { UserInfo } from "@/types";
import { deleteAuthCookie } from "@/actions/api";

type ProfileProps = {
  user: UserInfo; // Ensure that user is of type UserInfo
};

export const Profile: React.FC<ProfileProps> = ({ user }) => {
  const intl = useIntl();

  const handleLogout = async () => {
    console.log("User logged out");
    await deleteAuthCookie();
    location.href = "/";
  };

  const handleUpgrade = async () => {
    location.href = "/pricing";
  };

  return (
    <Card className="mb-8 p-8 bg-gradient-to-r from-gray-100 to-green-300 dark:from-gray-900 dark:to-green-950 shadow-lg rounded-lg">
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
              onClick={handleUpgrade}
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            >
              {intl.formatMessage({ id: "upgrade_to_premium" })}
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
