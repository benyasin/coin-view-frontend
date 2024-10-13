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
import { ChannelLimits, getPaymentPlan, PriceSettings } from "@/config/enums";
import { getCache } from "@/helpers/store";
import { EventBus } from "@/helpers/events";
import { createOrder, searchPendingOrder } from "@/actions/api";
import { useDebounce } from "@/helpers/utils";
import { useRouter } from "next/navigation"; // 引入你的防抖工具

export const Premium = () => {
  const intl = useIntl();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false); // 控制 loading 状态
  const [existingOrder, setExistingOrder] = useState(null); // 用于存储用户的进行中订单
  const [showPendingModal, setShowPendingModal] = useState(false); // 控制弹出框显示
  const [showPaymentModal, setShowPaymentModal] = useState(false); // 控制弹出框显示
  const [pendingPayUrl, setPendingPayUrl] = useState(""); // 存储待支付订单的支付链接
  const router = useRouter();

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
        intl.formatMessage({ id: "limited_api_usage" }),
      ],
    },
  ];

  const [plans, setPlans] = useState(createPlans);

  useEffect(() => {
    setPlans(createPlans());
  }, [intl, router]);

  const handleCardMouseOver = (index: number) => {
    const updatedPlans = plans.map((plan, idx) => ({
      ...plan,
      isMostPop: idx === index,
    }));
    setPlans(updatedPlans);
  };

  const createNewOrder = async (
    user: { id: string; email: string },
    type: string
  ): Promise<void> => {
    const { data } = await createOrder(
      user.id,
      user.email,
      getPaymentPlan(type) * 12 + ".0000",
      type
    );
    console.log(data);

    if (data && data._id) {
      // 显示确认 Modal
      setShowPaymentModal(true); // 打开确认支付的 Modal
      setPendingPayUrl(data.pay_url); // 保存支付链接
    } else {
      setIsLoading(false); // 如果订单创建失败，停止 loading
      alert("订单创建失败，请稍后重试。");
    }
  };

  // 点击确认支付时的处理函数
  const handleConfirmPayment = () => {
    window.open(pendingPayUrl); // 打开支付链接
    setShowPaymentModal(false); // 关闭 Modal
    document.location.href = "/dashboard";
  };

  // 点击取消时的处理函数
  const handleCancelPayment = () => {
    setShowPaymentModal(false); // 关闭 Modal
    document.location.href = "/dashboard"; // 跳转到 dashboard
  };

  // 使用自定义防抖函数
  const handleStartClick = useDebounce(async (type: string) => {
    if (isLoading) return; // 如果当前正在加载，阻止重复点击

    const user = getCache("user");
    if (!user) {
      EventBus.emit("showLoginDialog", true);
      return;
    }

    if (type === "free_plan") {
      document.location.href = "/dashboard";
      return;
    }

    setIsLoading(true); // 开始加载状态

    // 查询是否有进行中的订单
    const pendingOrder = await checkPendingOrder(user.id);
    console.log(pendingOrder);
    if (pendingOrder) {
      setExistingOrder(pendingOrder);
      setPendingPayUrl(pendingOrder.pay_url); // 设置支付链接
      setShowPendingModal(true); // 显示弹出框
      return;
    }

    // 创建订单
    await createNewOrder(user, type);
  }, 300); // 设置防抖的延时为 300ms

  const checkPendingOrder = async (userId: string) => {
    // 调用接口查询用户是否有进行中的订单
    const { data } = await searchPendingOrder(userId); // 需要实现的API请求
    console.log(data);
    if (data) {
      return data[0]; // 返回进行中的订单
    }
    return null;
  };

  const handleContinuePayment = () => {
    window.open(pendingPayUrl); // 打开支付链接
    setShowPendingModal(false); // 关闭弹出框
    document.location.href = "/dashboard"; // 跳转到 dashboard
  };

  const handleCreateNewOrder = async () => {
    setShowPendingModal(false); // 关闭弹出框

    const user = getCache("user");
    if (!user) {
      EventBus.emit("showLoginDialog", true);
      return;
    }
    // @ts-ignore
    await createNewOrder(user, existingOrder.member_plan);
  };

  return (
    <div>
      <section className="relative max-w-screen-xl w-full mx-auto px-4 py-28 gap-12 md:px-8 flex flex-col justify-center items-center">
        <motion.div
          initial={{ y: 5, opacity: 0 }}
          whileInView={{
            y: 0,
            opacity: 1,
          }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
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
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full h-full absolute left-0 -top-26 flex justify-end items-center"
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
                    {item.type !== "free_plan" && (
                      <span className="text-sm text-default-400">
                        &nbsp;&nbsp;(
                        {intl.formatMessage({ id: "charged_annually" })})
                      </span>
                    )}
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
                    isLoading={isLoading}
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

      {/* Pending Order Modal */}
      <Modal
        backdrop="blur"
        isOpen={showPendingModal}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {intl.formatMessage({ id: "pending_order_found" })}
          </ModalHeader>
          <ModalBody>
            {intl.formatMessage({ id: "pending_order_message" })}
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleContinuePayment} color="primary">
              {intl.formatMessage({ id: "continue_payment" })}
            </Button>
            <Button onClick={handleCreateNewOrder} color="default">
              {intl.formatMessage({ id: "create_new_order" })}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Payment Modal */}
      <Modal
        backdrop="blur"
        isOpen={showPaymentModal}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {intl.formatMessage({ id: "confirm_payment" })}
          </ModalHeader>
          <ModalBody>
            {intl.formatMessage({ id: "payment_window_message" })}
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleConfirmPayment} color="primary">
              {intl.formatMessage({ id: "confirm" })}
            </Button>
            <Button onClick={handleCancelPayment} color="default">
              {intl.formatMessage({ id: "cancel" })}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
