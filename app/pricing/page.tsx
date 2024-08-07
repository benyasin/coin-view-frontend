"use client";

import { Faq } from "@/components/faq";
import { Premium } from "@/components/premium";
import { useEffect } from "react";

export default function Pricing() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <>
      <Premium />
      <Faq />
    </>
  );
}
