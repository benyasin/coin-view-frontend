"use client";
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

export const Premium = () => {
  const plans = [
    {
      name: "Hobby Plan",
      desc: "Enjoy limited access to all our features",
      price: 0,
      isMostPop: false,
      features: ["Make the best schedule", "Make the best schedule"],
    },
    {
      name: "Basic Plan",
      desc: "Make the best schedule for your team",
      price: 10,
      isMostPop: true,
      features: [
        "Make the best schedule",
        "Make the best schedule",
        "Make the best schedule",
      ],
    },
    {
      name: "Enterprise Plan",
      desc: "Make the best schedule for your team and more",
      price: 20,
      isMostPop: false,
      features: [
        "Make the best schedule",
        "Make the best schedule",
        "Make the best schedule",
        "Make the best schedule",
      ],
    },
  ];

  return (
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
            Get more features with Premium.
          </h3>
          <div className="mt-3 max-w-xl text-foreground/80 text-balance">
            <p>Select the plan that best suits your needs.</p>
          </div>
        </div>
        <div className="mt-16 gap-10 grid lg:grid-cols-3 place-content-center">
          {plans.map((item, idx) => (
            <Card
              key={idx}
              className={
                item.isMostPop ? "border-2 border-primary sm:scale-110" : ""
              }
            >
              <CardHeader>
                <span className="font-medium">{item.name}</span>
              </CardHeader>
              <Divider />
              <CardBody className="gap-3">
                <div className="text-3xl font-semibold">
                  ${item.price} <span className="text-xl font-normal">/mo</span>
                </div>
                <p>{item.desc}</p>
                <ul className="p-8 space-y-3">
                  <li className="font-medium">
                    <p>Features</p>
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
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="w-full h-full absolute -top-12 flex justify-end items-center"
      >
        <div className="w-3/4 flex justify-center items-center">
          <div className="w-12 h-[600px] bg-light blur-[100px] rounded-3xl max-sm:rotate-[15deg] sm:rotate-[35deg]"></div>
        </div>
      </motion.div>
    </section>
  );
};
