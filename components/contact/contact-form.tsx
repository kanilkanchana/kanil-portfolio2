"use client";

import { type FC } from "react";
import { AnimatePresence, motion } from "motion/react";
import { revealProps } from "@/animations/scroll-animations";
import { swapLabel } from "@/animations/ui-animations";
import { useContactForm } from "@/hooks/use-contact-form";
import { Alert } from "@/components/portfolio/alert";
import { FloatingField } from "./floating-field";

export const ContactForm: FC = () => {
  const { formData, update, completion, isLoading, alert, handleSubmit } =
    useContactForm();

  const disabled = isLoading || completion < 1;

  return (
    <>
      {alert.visible && <Alert type={alert.type} text={alert.message} />}

      <motion.div
        {...revealProps(0.1)}
        className="glass gradient-border relative overflow-hidden p-7 md:p-10 lg:col-span-7"
      >
        <div className="relative mb-7">
          <p className="text-eyebrow">Contact Me</p>
          <h3 className="mt-1 text-xl font-bold md:text-2xl">Send me a message</h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-400">
            Have a question, internship opportunity or project idea? Send a message and I&apos;ll get back to you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FloatingField
              id="name"
              label="Your name"
              value={formData.name}
              onChange={(value) => update("name", value)}
              required
              autoComplete="name"
            />
            <FloatingField
              id="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={(value) => update("email", value)}
              required
              autoComplete="email"
            />
          </div>

          <FloatingField
            id="message"
            label="Your message"
            value={formData.message}
            onChange={(value) => update("message", value)}
            required
            textarea
          />

          <motion.button
            type="submit"
            disabled={disabled}
            whileTap={{ scale: 0.98 }}
            className={`relative w-full overflow-hidden rounded-full px-6 py-4 text-sm font-medium text-white transition-opacity md:text-base ${
              disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
            }`}
            style={{
              background: "linear-gradient(135deg, #5c33cc 0%, #ea4884 100%)",
              boxShadow: "0 10px 30px -10px rgba(234, 72, 132, 0.55)",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={isLoading ? "loading" : "idle"}
                variants={swapLabel}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="inline-flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send message
                    <span aria-hidden>→</span>
                  </>
                )}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          <p className="text-center text-[11px] text-neutral-500">
            Your message will be sent securely to my admin inbox.
          </p>
        </form>
      </motion.div>
    </>
  );
};
