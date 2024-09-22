"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useIntl } from "react-intl";
import { ChannelLimits, PriceSettings } from "@/config/enums";
import { getCache } from "@/helpers/store";
import { EventBus } from "@/helpers/events";
import { createOrder } from "@/actions/api";

export const Premium = () => {
  const intl = useIntl();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const createPlans = () => [
    {
      type: "free_plan",
      name: intl.formatMessage({ id: "free_plan" }),
      desc: intl.formatMessage({ id: "enjoy_limited" }),
      price: 0,
      isMostPop: false,
      features: [
        intl.formatMessage({ id: "daily_update" }),
        intl.formatMessage({ id: "recommend_channel" }),
      ],
    },
    {
      type: "basic_plan",
      name: intl.formatMessage({ id: "basic_plan" }),
      desc: intl.formatMessage({ id: "team_schedule" }),
      price: PriceSettings.BasicPlanPrice,
      isMostPop: true,
      features: [
        intl.formatMessage({ id: "daily_update" }),
        intl.formatMessage({ id: "statistic_push" }),
        intl.formatMessage(
          { id: "custom_channel" },
          { plan_youtubers: ChannelLimits.BasicPlanChannels }
        ),
      ],
    },
    {
      type: "enterprise_plan",
      name: intl.formatMessage({ id: "enterprise_plan" }),
      desc: intl.formatMessage({ id: "team_schedule_more" }),
      price: PriceSettings.EnterprisePlanPrice,
      isMostPop: false,
      features: [
        intl.formatMessage({ id: "daily_update" }),
        intl.formatMessage({ id: "statistic_push" }),
        intl.formatMessage(
          { id: "custom_channel" },
          { plan_youtubers: ChannelLimits.EnterprisePlanChannels }
        ),
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

  const handleStartClick = async (type: string) => {
    const user = getCache("user");
    console.log(user);
    if (!user) {
      EventBus.emit("showLoginDialog", true);
    }
    if (!user.is_member) {
      const { data } = await createOrder(user.id, user.email, "7.0000");
      console.log(data);
      if (data.pay_url) {
        window.open(data.pay_url);
      }
    }
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
                    onClick={() => handleStartClick(item.type)}
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

      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">qqqqq</ModalHeader>
              <ModalBody>ssss</ModalBody>
              <ModalFooter>dddd</ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
