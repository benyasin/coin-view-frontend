"use client";

import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useIntl } from "react-intl";

export const TimeSelect = () => {
  const { theme } = useTheme();
  const isSSR = useIsSSR();
  const intl = useIntl();

  let tabs = [
    {
      id: "All",
      label: intl.formatMessage({ id: "all" }),
      bullish: "8(80%)",
      bearish: "1(10%)",
      neutral: "1(10%)",
      index: "43",
    },
    {
      id: "1 Week",
      label: intl.formatMessage({ id: "1_week" }),
      bullish: "5(50%)",
      bearish: "4(40%)",
      neutral: "1(10%)",
      index: "44",
    },
    {
      id: "1 Month",
      label: intl.formatMessage({ id: "1_month" }),
      bullish: "7(70%)",
      bearish: "2(20%)",
      neutral: "1(10%)",
      index: "68",
    },
    {
      id: "1 Year",
      label: intl.formatMessage({ id: "1_year" }),
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
