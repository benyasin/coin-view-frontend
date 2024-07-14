"use client";

import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";

export const TimeSelect = () => {
  const { theme } = useTheme();
  const isSSR = useIsSSR();

  let tabs = [
    {
      id: "All",
      label: "All",
      bullish: "8(80%)",
      bearish: "1(10%)",
      neutral: "1(10%)",
      index: "43",
    },
    {
      id: "1 Week",
      label: "1 Week",
      bullish: "5(50%)",
      bearish: "4(40%)",
      neutral: "1(10%)",
      index: "44",
    },
    {
      id: "1 Month",
      label: "1 Month",
      bullish: "7(70%)",
      bearish: "2(20%)",
      neutral: "1(10%)",
      index: "68",
    },
    {
      id: "1 Year",
      label: "1 Year",
      bullish: "3(30%)",
      bearish: "4(40%)",
      neutral: "3(30%)",
      index: "89",
    },
  ];

  return (
    <div className="flex w-[280px] flex-col">
      <Tabs aria-label="tabs" items={tabs}>
        {(item) => (
          <Tab key={item.id} title={item.label}>
            <Card className="bg-transparent shadow-none">
              <CardBody className="text-default-500 gap-2 !px-0">
                <div className="flex justify-between">
                  <span>看涨</span>
                  <span>{item.bullish}</span>
                </div>
                <div className="flex justify-between">
                  <span>看跌</span>
                  <span>{item.bearish}</span>
                </div>
                <div className="flex justify-between">
                  <span>中性</span>
                  <span>{item.neutral}</span>
                </div>
                <div className="flex justify-between">
                  <span>涨跌指数</span>
                  <span>{item.index}</span>
                </div>
              </CardBody>
            </Card>
          </Tab>
        )}
      </Tabs>
    </div>
  );
};
