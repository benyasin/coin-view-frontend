"use client";
import React, { useEffect, useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useIntl } from "react-intl";

export const Faq = () => {
  const intl = useIntl();
  const [defaultContent, setDefaultContent] = useState("");

  useEffect(() => {
    setDefaultContent(intl.formatMessage({ id: "faq_description" }));
  }, [intl]);

  return (
    <div id="faq">
      <section className="relative max-w-screen-xl mx-auto px-4 py-28 gap-12 md:px-8 flex flex-col justify-center items-center">
        <motion.div
          initial={{ y: 5, opacity: 0 }}
          whileInView={{
            y: 0,
            opacity: 1,
          }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col gap-3 justify-center items-center"
        >
          <h4 className="text-2xl font-bold sm:text-3xl bg-gradient-to-b from-foreground to-foreground/70 text-transparent bg-clip-text">
            {intl.formatMessage({ id: "faq" })}
          </h4>
          <p className="max-w-xl text-foreground/80 text-center">
            {intl.formatMessage({ id: "faq_description" })}
          </p>
        </motion.div>
        <motion.div
          initial={{ y: 5, opacity: 0 }}
          whileInView={{
            y: 0,
            opacity: 1,
          }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="max-w-5xl text-foreground/50 w-full border border-foreground/35 rounded-md p-1"
        >
          <Accordion
            motionProps={{
              variants: {
                enter: {
                  y: 0,
                  opacity: 1,
                  height: "auto",
                  transition: {
                    height: {
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      duration: 1,
                    },
                    opacity: {
                      easings: "ease",
                      duration: 1,
                    },
                  },
                },
                exit: {
                  y: -10,
                  opacity: 0,
                  height: 0,
                  transition: {
                    height: {
                      easings: "ease",
                      duration: 0.25,
                    },
                    opacity: {
                      easings: "ease",
                      duration: 0.3,
                    },
                  },
                },
              },
            }}
          >
            <AccordionItem
              key="1"
              aria-label="Why NextUI Why NextUI Why NextUI Why NextUI"
              title="Why NextUI Why NextUI Why NextUI Why NextUI"
            >
              {defaultContent}
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="Why NextUI Why NextUI Why NextUI Why NextUI"
              title="Why NextUI Why NextUI Why NextUI Why NextUI"
            >
              {defaultContent}
            </AccordionItem>
            <AccordionItem
              key="3"
              aria-label="Why NextUI Why NextUI Why NextUI Why NextUI"
              title="Why NextUI Why NextUI Why NextUI Why NextUI"
            >
              {defaultContent}
            </AccordionItem>
            <AccordionItem
              key="4"
              aria-label="Why NextUI Why NextUI Why NextUI Why NextUI"
              title="Why NextUI Why NextUI Why NextUI Why NextUI"
            >
              {defaultContent}
            </AccordionItem>
            <AccordionItem
              key="5"
              aria-label="Why NextUI Why NextUI Why NextUI Why NextUI"
              title="Why NextUI Why NextUI Why NextUI Why NextUI"
            >
              {defaultContent}
            </AccordionItem>
            <AccordionItem
              key="6"
              aria-label="Why NextUI Why NextUI Why NextUI Why NextUI"
              title="Why NextUI Why NextUI Why NextUI Why NextUI"
            >
              {defaultContent}
            </AccordionItem>
            <AccordionItem
              key="7"
              aria-label="Why NextUI Why NextUI Why NextUI Why NextUI"
              title="Why NextUI Why NextUI Why NextUI Why NextUI"
            >
              {defaultContent}
            </AccordionItem>
            <AccordionItem
              key="8"
              aria-label="Why NextUI Why NextUI Why NextUI Why NextUI"
              title="Why NextUI Why NextUI Why NextUI Why NextUI"
            >
              {defaultContent}
            </AccordionItem>
            <AccordionItem
              key="9"
              aria-label="Why NextUI Why NextUI Why NextUI Why NextUI"
              title="Why NextUI Why NextUI Why NextUI Why NextUI"
            >
              {defaultContent}
            </AccordionItem>
          </Accordion>
        </motion.div>
      </section>
    </div>
  );
};
