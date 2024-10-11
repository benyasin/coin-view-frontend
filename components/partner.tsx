"use client";
import React from "react";
import { useIntl } from "react-intl";
import { LogoBinance } from "@/components/logo-binance";
import { LogoYoutube } from "@/components/logo-youtube";
import { LogoHxpay } from "@/components/logo-hxpay";
import { LogoOpenai } from "@/components/logo-openai";
import { motion } from "framer-motion";

export const Partner = () => {
  const intl = useIntl();

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
              {intl.formatMessage({ id: "eco_partner" })}
            </h3>
          </div>
          <div className="gap-16 w-full flex flex-row justify-center flex-wrap items-center place-content-center">
            <LogoBinance />
            <LogoYoutube />
            <LogoHxpay />
            <LogoOpenai />
          </div>
        </motion.div>
      </section>
    </div>
  );
};
