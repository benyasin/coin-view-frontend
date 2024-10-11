"use client";
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useIntl } from "react-intl";
import { CircleHelp } from "lucide-react";

export const Faq = () => {
  const intl = useIntl();
  const itemClasses = {
    base: "py-0 w-full",
    title:
      "text-large font-light tracking-tighter sm:text-xl bg-gradient-to-b from-foreground to-foreground/70 text-transparent bg-clip-text text-pretty",
    trigger: "px-2 py-0 py-3 flex items-center",
    content: "px-2 pb-6 text-balance text-foreground/60",
  };
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
          <h4 className="text-2xl font-light tracking-tighter sm:text-3xl bg-gradient-to-b from-foreground to-foreground/70 text-transparent bg-clip-text text-pretty">
            {intl.formatMessage({ id: "faq" })}
          </h4>
          <p className="mt-3 w-4xl text-foreground/80 text-balance">
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
          className="max-w-6xl text-foreground/50 w-full border border-foreground/35 rounded-md p-1"
        >
          <Accordion
            selectionMode="multiple"
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
            defaultExpandedKeys={["1", "2"]}
            itemClasses={itemClasses}
          >
            <AccordionItem
              key="1"
              startContent={<CircleHelp size={18} />}
              aria-label={intl.formatMessage({ id: "faq_question1" })}
              title={intl.formatMessage({ id: "faq_question1" })}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {intl.formatMessage({ id: "faq_answer1" })}
            </AccordionItem>
            <AccordionItem
              key="2"
              startContent={<CircleHelp size={18} />}
              aria-label={intl.formatMessage({ id: "faq_question2" })}
              title={intl.formatMessage({ id: "faq_question2" })}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {intl.formatMessage({ id: "faq_answer2" })}
            </AccordionItem>
            <AccordionItem
              key="3"
              startContent={<CircleHelp size={18} />}
              aria-label={intl.formatMessage({ id: "faq_question3" })}
              title={intl.formatMessage({ id: "faq_question3" })}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {intl.formatMessage({ id: "faq_answer3" })}
            </AccordionItem>
            <AccordionItem
              key="4"
              startContent={<CircleHelp size={18} />}
              aria-label={intl.formatMessage({ id: "faq_question4" })}
              title={intl.formatMessage({ id: "faq_question4" })}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {intl.formatMessage({ id: "faq_answer4" })}
            </AccordionItem>
          </Accordion>
        </motion.div>
      </section>
    </div>
  );
};
