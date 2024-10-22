"use client";

import { useTheme } from "next-themes";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useIntl } from "react-intl";
import { useEffect, useState } from "react";
import { getIndexTotal } from "@/actions/api";

type SentimentData = {
  count: number;
  percentage: number;
};

type TotalItemData = {
  bullish: SentimentData;
  bearish: SentimentData;
  neutral: SentimentData;
};

type TotalData = {
  today: TotalItemData;
  week: TotalItemData;
  month: TotalItemData;
  year: TotalItemData;
};

type TabData = {
  id: string;
  label: string;
  bullish: string;
  bearish: string;
  neutral: string;
};

export const TimeSelect = () => {
  const { theme } = useTheme();
  const [tabs, setTabs] = useState<TabData[]>([]);
  const intl = useIntl();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getIndexTotal();
        if (data) {
          const tabsTemp = [
            {
              id: "today",
              label: intl.formatMessage({ id: "today" }),
              bullish: `${data.today.bullish.count} ${intl.formatMessage({
                id: "times",
              })} ( ${Math.round(data.today.bullish.percentage)}% )`,
              bearish: `${data.today.bearish.count} ${intl.formatMessage({
                id: "times",
              })} ( ${Math.round(data.today.bearish.percentage)}% )`,
              neutral: `${data.today.neutral.count} ${intl.formatMessage({
                id: "times",
              })} ( ${Math.round(data.today.neutral.percentage)}% )`,
            },
            {
              id: "1 Week",
              label: intl.formatMessage({ id: "1_week" }),
              bullish: `${data.week.bullish.count} ${intl.formatMessage({
                id: "times",
              })} ( ${Math.round(data.week.bullish.percentage)}% )`,
              bearish: `${data.week.bearish.count} ${intl.formatMessage({
                id: "times",
              })} ( ${Math.round(data.week.bearish.percentage)}% )`,
              neutral: `${data.week.neutral.count} ${intl.formatMessage({
                id: "times",
              })} ( ${Math.round(data.week.neutral.percentage)}% )`,
            },
            {
              id: "1 Month",
              label: intl.formatMessage({ id: "1_month" }),
              bullish: `${data.month.bullish.count} ${intl.formatMessage({
                id: "times",
              })} ( ${Math.round(data.month.bullish.percentage)}% )`,
              bearish: `${data.month.bearish.count} ${intl.formatMessage({
                id: "times",
              })} ( ${Math.round(data.month.bearish.percentage)}% )`,
              neutral: `${data.month.neutral.count} ${intl.formatMessage({
                id: "times",
              })} ( ${Math.round(data.month.neutral.percentage)}% )`,
            },
            {
              id: "1 Year",
              label: intl.formatMessage({ id: "1_year" }),
              bullish: `${data.year.bullish.count} ${intl.formatMessage({
                id: "times",
              })} ( ${Math.round(data.year.bullish.percentage)}% )`,
              bearish: `${data.year.bearish.count} ${intl.formatMessage({
                id: "times",
              })} ( ${Math.round(data.year.bearish.percentage)}% )`,
              neutral: `${data.year.neutral.count} ${intl.formatMessage({
                id: "times",
              })} ( ${Math.round(data.year.neutral.percentage)}% )`,
            },
          ];
          setTabs(tabsTemp);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [intl.locale]);

  if (tabs.length == 0) {
    return null;
  }

  return (
    <div className="flex md:w-[280px] sm:w-full flex-col md:absolute md:top-10 md:left-[39%] mt-16 md:mt-0 px-2">
      <Tabs
        aria-label="tabs"
        items={tabs}
        variant="bordered"
        color="secondary"
        classNames={{
          tabList: "gap-3 w-full relative p-0 border-0 border-b-0",
          tabContent:
            "group-data-[key=today]:text-large group-data-[key=today]:text-[default]",
        }}
      >
        {(item) => (
          <Tab key={item.id} title={item.label}>
            <Card className="bg-transparent shadow-none">
              <CardBody className="text-default-400 gap-2 !px-0">
                <div className="flex justify-between">
                  <span>{intl.formatMessage({ id: "bullish" })}</span>
                  <span>{item.bullish}</span>
                </div>
                <div className="flex justify-between">
                  <span>{intl.formatMessage({ id: "bearish" })}</span>
                  <span>{item.bearish}</span>
                </div>
                <div className="flex justify-between">
                  <span>{intl.formatMessage({ id: "neutral" })}</span>
                  <span>{item.neutral}</span>
                </div>
              </CardBody>
            </Card>
          </Tab>
        )}
      </Tabs>
    </div>
  );
};
