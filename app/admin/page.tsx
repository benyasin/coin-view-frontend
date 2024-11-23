"use client";

import React, { useState, useEffect } from "react";
import { deleteAuthCookie, getUserInfo, whetherIsAdmin } from "@/actions/api";
import { UserInfo } from "@/types";
import { Customize } from "@/components/customize";
import { Viewpoint } from "@/components/viewpoint";
import { Prediction } from "@/components/prediction";
import { getLocalizedUrl } from "@/helpers/getLocalizedUrl";
import { useIntl } from "react-intl";
import { Announcement } from "@/components/announcement";

const AdminPage = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [user, setUser] = useState<UserInfo | null>();
  const intl = useIntl();

  useEffect(() => {
    getUserInfo().then((result) => {
      if (!result || result.description === "Cookie token expired") {
        console.log("Cookie token expired");
        deleteAuthCookie();
        location.href = getLocalizedUrl("/", intl.locale);
      } else {
        setUser(result.data);
        whetherIsAdmin().then((data) => {
          if (!data.data) {
            console.log("not admin token");
            location.href = getLocalizedUrl("/", intl.locale);
          }
          setIsAdmin(data.data);
          result.data.is_admin = true;
          setUser(result.data);
        });
      }
    });
  }, []);

  if (!user || user === null) {
    return null;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="about-container flex flex-col gap-12 py-8 px-4 max-w-6xl mx-auto text-default-600">
      <Customize user={user as UserInfo} />
      <Viewpoint user={user as UserInfo} />
      <Prediction user={user as UserInfo} />
      <Announcement />
    </div>
  );
};

export default AdminPage;
