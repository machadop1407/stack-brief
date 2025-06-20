"use client";

import { useFormStatus } from "react-dom";
import { addSubscriber } from "@/app/actions";
import Image from "next/image";
import { useActionState } from "react";
import { motion } from "framer-motion";

const initialState = {
  message: "",
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="px-8 py-4 text-lg bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Subscribing..." : "Subscribe"}
    </button>
  );
}

export default function HomeClient({
  subscriberCount,
}: {
  subscriberCount: string | null;
}) {
  const [state, formAction] = useActionState(addSubscriber, initialState);

  return (
    <div className="flex items-center justify-center h-[calc(100vh-4rem)] px-4 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center justify-center">
          {/* Left Column: Image */}
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/hero.png"
              alt="Stack Brief"
              width={500}
              height={125}
              priority
            />
            <p className="text-muted-foreground md:w-3/4 text-center text-2xl">
              Your weekly brief on modern web dev news, code snippets, and news
              in the world of tech.
            </p>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            className="max-w-md mx-auto md:mx-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Get the weekly brief
            </h2>
            {!state.success ? (
              <form
                action={formAction}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-4 text-lg rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <SubmitButton />
              </form>
            ) : (
              <div className="text-center md:text-left">
                <p className="text-lg font-semibold text-accent">
                  🎉 {state.message}
                </p>
              </div>
            )}

            {state.message && !state.success && (
              <p className="text-sm text-red-500 mt-2">{state.message}</p>
            )}

            <p className="text-sm text-muted-foreground mt-4">
              {subscriberCount ? (
                <>
                  Join{" "}
                  <motion.strong
                    className="font-bold text-accent"
                    animate={{
                      textShadow: [
                        "0 0 4px rgba(255, 175  , 0, 0.2)",
                        "0 0 12px rgba(255, 175, 0, 0.7)",
                        "0 0 4px rgba(255, 175, 0, 0.2)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {subscriberCount}
                  </motion.strong>{" "}
                  other developers.
                </>
              ) : (
                "Your weekly dose of modern tech insights."
              )}{" "}
              No spam.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
