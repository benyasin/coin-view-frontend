"use client";

import React, { useState, useEffect } from "react";
import { Button, Card, Progress } from "@nextui-org/react";
import { useIntl } from "react-intl";
import { LoaderCircle, MessageSquareQuote } from "lucide-react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh"; // 导入中文语言包
import "dayjs/locale/en"; // 导入英文语言包
import customize from "@/public/customize.png";
import customize_en from "@/public/customize_en.png";
import customize_dark from "@/public/customize_dark.png";
import customize_dark_en from "@/public/customize_dark_en.png";
import setting from "@/public/setting.png";
import setting_en from "@/public/setting_en.png";
import setting_dark from "@/public/setting_dark.png";
import setting_dark_en from "@/public/setting_dark_en.png";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import { getLocalizedUrl } from "@/helpers/getLocalizedUrl";
import { countYoutubersByUserId, getUserInfo } from "@/actions/api";
import { EventBus } from "@/helpers/events";

// 启用插件
dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(timezone);
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const Trial = () => {
  const intl = useIntl();
  const isSSR = useIsSSR();
  const [locale, setLocaleState] = useState<string>(intl.locale); // 默认从 Intl 获取语言
  const totalSteps = 2; // 操作总步骤数
  const [user, setUser] = useState(null);
  const [completedSteps, setCompletedSteps] = useState(0); // 完成的步骤数
  const [remainingTime, setRemainingTime] = useState(""); // 剩余时间
  const { theme } = useTheme();

  useEffect(() => {
    getUserInfo().then(async ({ data: user }) => {
      if (!user) {
        EventBus.emit("showLoginDialog", true);
        return;
      }
      setUser(user);
    });
  }, []);

  useEffect(() => {
    if (user) {
      if (user["is_member"]) {
        countYoutubersByUserId(user["id"]).then(({ data }) => {
          if (parseInt(data) > 0 && user["telegram_username"]) {
            setCompletedSteps(2);
          } else if (parseInt(data) > 0 && !user["telegram_username"]) {
            setCompletedSteps(1);
          } else if (parseInt(data) === 0 && user["telegram_username"]) {
            setCompletedSteps(1);
          } else {
            setCompletedSteps(0);
          }
        });

        const interval = setInterval(() => {
          const now: Date = new Date();
          const end: Date = new Date(user["membership_expiry"]); // 确保 trialEnd 被正确解析为 Date 类型
          const diff: number = end.getTime() - now.getTime(); // 使用 getTime() 获取时间戳（毫秒）

          if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            setRemainingTime(
              `${days} ${intl.formatMessage({
                id: "days",
              })} ${hours} ${intl.formatMessage({
                id: "hours",
              })} ${minutes} ${intl.formatMessage({ id: "minutes" })}`
            );
          } else {
            setRemainingTime(intl.formatMessage({ id: "trial_end" }));
            clearInterval(interval); // 停止倒计时
          }
        }, 1000);

        return () => clearInterval(interval);
      } else {
        document.location.href = getLocalizedUrl("/", locale);
      }
    }
  }, [user]);

  // 更新完成步骤数
  const markStepCompleted = () => {
    if (completedSteps < totalSteps) {
      //setCompletedSteps(completedSteps + 1);
    }
  };

  if (!user || !user["is_member"]) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Card className="p-6 mb-8 bg-gradient-to-r from-gray-100 to-green-300 dark:from-gray-900 dark:to-green-950 shadow-lg rounded-lg">
        <p className="text-xl text-gray-400 font-bold">
          🎉🎉 {intl.formatMessage({ id: "start_trial_success" })} 🎉🎉
        </p>
        <p className="text-lg mt-4 text-default-500">
          {intl.formatMessage({ id: "trial_period" })}：
          <span className="text-blue-500">
            {dayjs
              .utc(user["membership_expiry"])
              .subtract(user["trial_days"], "days") // 减去 trial_days
              .tz(userTimeZone)
              .format("YYYY-MM-DD hh:mm:ss")}
          </span>{" "}
          {" ~ "}
          <span className="text-blue-500">
            {dayjs
              .utc(user["membership_expiry"])
              .tz(userTimeZone)
              .format("YYYY-MM-DD hh:mm:ss")}
          </span>
        </p>
        <p className="text-lg mt-1 text-default-500">
          {intl.formatMessage({ id: "remain_time" })}：
          <span className="text-green-500">{remainingTime}</span>
        </p>
      </Card>
      <div className="flex flex-row justify-start items-center mb-2">
        <LoaderCircle size={16} color="green" />
        <h2 className="text-xl text-gray-400 font-bold mx-2">
          {intl.formatMessage({ id: "trial_config_progress" })}
        </h2>
        <p className="text-medium text-default-500">
          ( {completedSteps}/{totalSteps} )
        </p>
      </div>

      <Progress
        value={(completedSteps / totalSteps) * 100}
        className="mb-4"
        color="success"
        aria-label={`trial progress：has finished ${completedSteps} step，total ${totalSteps} steps`}
      />

      <ul className="list-decimal pl-6">
        <li className="mb-4">
          <p className="text-lg">
            {intl.formatMessage({ id: "add_youtuber" })}
          </p>
          <p className="text-gray-400">
            {intl.formatMessage({ id: "add_youtuber_description" })}
          </p>
          <Image
            src={
              theme == "dark" || isSSR
                ? locale == "zh"
                  ? customize_dark
                  : customize_dark_en
                : locale == "zh"
                ? customize
                : customize_en
            }
            alt="customize"
            className="w-[70%] rounded-lg mt-2 -ml-8"
          />
          <Button
            color="primary"
            variant="bordered"
            className="mt-8"
            onClick={(): void => {
              window.open(
                getLocalizedUrl("/dashboard/customize", locale),
                "_blank" // 在新标签页中打开
              );
              markStepCompleted();
            }}
          >
            {intl.formatMessage({ id: "go_to_dashboard_customize" })}
          </Button>
        </li>
        <li className="mt-12">
          <p className="text-lg">
            {intl.formatMessage({ id: "link_telegram" })}
          </p>
          <p className="text-gray-400">
            {intl.formatMessage({ id: "link_telegram_description" })}
          </p>
          <Image
            src={
              theme == "dark" || isSSR
                ? locale == "zh"
                  ? setting_dark
                  : setting_dark_en
                : locale == "zh"
                ? setting
                : setting_en
            }
            alt="setting"
            className="w-[68%] rounded-lg mt-2 -ml-6"
          />
          <Button
            color="primary"
            variant="bordered"
            className="mt-8"
            onClick={(): void => {
              window.open(
                getLocalizedUrl("/dashboard/setting", locale),
                "_blank" // 在新标签页中打开
              );
              markStepCompleted();
            }}
          >
            {intl.formatMessage({ id: "go_to_dashboard_setting" })}
          </Button>
        </li>
      </ul>

      <div className="flex flex-row justify-start items-center mt-12">
        <MessageSquareQuote size={16} color="green" />
        <h2 className="text-xl text-gray-400 font-bold mx-2">
          {intl.formatMessage({ id: "feedback" })}
        </h2>
      </div>

      <p className="text-gray-400 pl-2 mt-2">
        {intl.formatMessage({ id: "contact_us_if_you_has_suggestion" })}
      </p>
      <ul className="list-disc pl-6 mt-2 text-gray-400">
        <li>
          {intl.formatMessage({ id: "email" })}：
          <a
            href="mailto:contact@coinview.today"
            className="text-blue-500 underline"
          >
            contact@coinview.today
          </a>
        </li>
        <li>
          {intl.formatMessage({ id: "telegram" })}：
          <a
            href="https://t.me/CoinViewCS"
            target="_blank"
            className="text-blue-500 underline"
          >
            {intl.formatMessage({ id: "contact_us" })}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Trial;
