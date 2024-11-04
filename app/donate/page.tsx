"use client";

import React from "react";
import { useIntl } from "react-intl";
import deposit_btc from "@/public/qrcode.png";
import Image from "next/image";

const Donate = () => {
  const intl = useIntl();
  return (
    <div className="disclaimer-container py-8 px-4 max-w-6xl mx-auto text-default-600">
      <h1 className="text-4xl font-bold mb-6">
        {intl.formatMessage({ id: "receive_donate" })} USDT
      </h1>
      <div>
        <Image
          width={320}
          height={200}
          src={deposit_btc}
          alt="btc"
          loading="lazy"
        />
      </div>
      <p className="text-lg leading-relaxed mb-6">
        {intl.formatMessage({ id: "receive_donate_desc" })}
      </p>
    </div>
  );
};

export default Donate;
