"use client";

import React from "react";
import { useIntl } from "react-intl";

const About = () => {
  const intl = useIntl();
  return (
    <div className="about-container py-8 px-4 max-w-6xl mx-auto text-default-600">
      <h1 className="text-4xl font-bold mb-6">
        {intl.formatMessage({ id: "about_us" })}
      </h1>
      <p className="text-lg leading-relaxed mb-6">
        {intl.formatMessage({ id: "about_us_content1" })}
      </p>
      <p className="text-lg leading-relaxed mb-6">
        {intl.formatMessage({ id: "about_us_content2" })}
      </p>
      <p className="text-lg leading-relaxed mb-6">
        {intl.formatMessage({ id: "about_us_content3" })}
      </p>
      <p className="text-lg leading-relaxed mb-6">
        {intl.formatMessage({ id: "about_us_content4" })}
      </p>
    </div>
  );
};

export default About;
