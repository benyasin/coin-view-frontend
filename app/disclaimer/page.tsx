"use client";

import React from "react";
import { useIntl } from "react-intl";

const Disclaimer = () => {
  const intl = useIntl();
  return (
    <div className="disclaimer-container py-8 px-4 max-w-6xl mx-auto text-default-600">
      <h1 className="text-4xl font-bold mb-6">
        {intl.formatMessage({ id: "disclaimer" })}
      </h1>
      <p className="text-lg leading-relaxed mb-6">
        {intl.formatMessage({ id: "disclaimer_content1" })}
      </p>
      <p className="text-lg leading-relaxed mb-6">
        {intl.formatMessage({ id: "disclaimer_content2" })}
      </p>
    </div>
  );
};

export default Disclaimer;
