"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useIntl } from "react-intl";

export const Premium = () => {
  const intl = useIntl();

  const createPlans = () => [
    {
      name: intl.formatMessage({ id: "free_plan" }),
      desc: intl.formatMessage({ id: "enjoy_limited" }),
      price: 0,
      isMostPop: false,
      features: ["大盘数据每日更新", "首页推荐博主频道展示"],
    },
    {
      name: intl.formatMessage({ id: "basic_plan" }),
      desc: intl.formatMessage({ id: "team_schedule" }),
      price: 7,
      isMostPop: true,
      features: [
        "大盘数据每日更新",
        "检索任意博主频道",
        "数据统计与邮件推送",
        "首页定制展示10个博主",
      ],
    },
    {
      name: intl.formatMessage({ id: "enterprise_plan" }),
      desc: intl.formatMessage({ id: "team_schedule_more" }),
      price: 35,
      isMostPop: false,
      features: [
        "大盘数据每日更新",
        "检索任意博主频道",
        "数据统计与邮件推送",
        "首页定制展示50个博主",
      ],
    },
  ];

  const [plans, setPlans] = useState(createPlans);

  useEffect(() => {
    setPlans(createPlans());
  }, [intl]);

  const handleCardMouseOver = (index: number) => {
    const updatedPlans = plans.map((plan, idx) => ({
      ...plan,
      isMostPop: idx === index,
    }));
    setPlans(updatedPlans);
  };

  return (
    <div id="premium">
      <section className="relative max-w-screen-xl w-full mx-auto px-4 py-28 gap-12 md:px-8 flex flex-col justify-center items-center">
        <motion.div
          initial={{ y: 5, opacity: 0 }}
          whileInView={{
            y: 0,
            opacity: 1,
          }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-screen-xl mx-auto px-4 md:px-8"
        >
          <div className="relative max-w-xl mx-auto sm:text-center">
            <h3 className="text-2xl font-light tracking-tighter sm:text-3xl bg-gradient-to-b from-foreground to-foreground/70 text-transparent bg-clip-text text-pretty">
              {intl.formatMessage({ id: "get_more_features" })}.
            </h3>
            <div className="mt-3 max-w-xl text-foreground/80 text-balance">
              <p> {intl.formatMessage({ id: "select_your_plan" })}.</p>
            </div>
          </div>
          <motion.div
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="w-full h-full absolute -top-32 flex justify-end items-center"
          >
            <div className="w-3/4 flex justify-center items-center">
              <div className="w-12 h-[600px] bg-light blur-[100px] rounded-3xl max-sm:rotate-[15deg] sm:rotate-[35deg]"></div>
            </div>
          </motion.div>
          <div className="mt-16 gap-10 grid lg:grid-cols-3 place-content-center">
            {plans.map((item, idx) => (
              <Card
                key={idx}
                className={
                  item.isMostPop ? "border-2 border-primary sm:scale-110" : ""
                }
                onMouseOver={() => handleCardMouseOver(idx)}
                style={{ cursor: "pointer" }}
              >
                <CardHeader>
                  <span className="font-medium">{item.name}</span>
                </CardHeader>
                <Divider />
                <CardBody className="gap-3">
                  <div className="text-3xl font-semibold">
                    ${item.price}{" "}
                    <span className="text-xl font-normal">/mo</span>
                  </div>
                  <p>{item.desc}</p>
                  <ul className="p-8 space-y-3">
                    <li className="font-medium">
                      <p>{intl.formatMessage({ id: "features" })}</p>
                    </li>
                    {item.features.map((featureItem, idx) => (
                      <li key={idx} className="flex items-center gap-5">
                        <Check size={20} />
                        {featureItem}
                      </li>
                    ))}
                  </ul>
                </CardBody>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant="solid"
                    color={item.isMostPop ? "primary" : "default"}
                  >
                    {intl.formatMessage({ id: "get_started" })}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};
