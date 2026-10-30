"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Ghost,
  Bot,
  Cpu,
  Zap,
  CircuitBoard,
  Database,
  Terminal,
  Code,
  Circle,
  Sparkles,
  Stars,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const icons = [Ghost, Bot, Cpu, Zap, CircuitBoard, Database, Terminal, Code];
const bubbleIcons = [Circle, Sparkles, Stars, Plus];

export default function NotFoundPage() {
  const [floatingIcons, setFloatingIcons] = useState<any[]>([]);
  const [sideBubbles, setSideBubbles] = useState<any[]>([]);

  useEffect(() => {
    // Generate random icons with random positions and durations
    const newIcons = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      Icon: icons[Math.floor(Math.random() * icons.length)],
      left: `${Math.random() * 100}%`,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 10,
      size: 20 + Math.random() * 40,
      opacity: 0.05 + Math.random() * 0.1,
    }));
    setFloatingIcons(newIcons);

    // Generate random side bubbles
    const newSideBubbles = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      Icon: bubbleIcons[Math.floor(Math.random() * bubbleIcons.length)],
      side: i % 2 === 0 ? "left" : "right",
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 10,
      size: 16 + Math.random() * 24,
      opacity: 0.1 + Math.random() * 0.2,
      xOffset: (Math.random() - 0.5) * 100,
    }));
    setSideBubbles(newSideBubbles);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-black px-4">
      {/* Grid Background */}
      <div
        className="absolute inset-0 z-0 opacity-[0.3] dark:opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating Side Bubbles (Icons) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {sideBubbles.map((item) => (
          <motion.div
            key={`bubble-${item.id}`}
            initial={{ y: "110%", opacity: 0 }}
            animate={{
              y: "-10%",
              x: [item.xOffset, item.xOffset + (item.side === "left" ? 50 : -50)],
              opacity: [0, item.opacity, item.opacity, 0],
              rotate: 360,
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: "linear",
            }}
            className="absolute"
            style={{
              [item.side === "left" ? "left" : "right"]: `${Math.random() * 15}%`,
            }}
          >
            <item.Icon
              size={item.size}
              className={`${
                item.side === "left" ? "text-blue-500" : "text-indigo-500"
              } blur-[1px]`}
              style={{ opacity: item.opacity }}
            />
          </motion.div>
        ))}
      </div>

      {/* Floating Background Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingIcons.map((item) => (
          <motion.div
            key={item.id}
            initial={{ y: "-10%", opacity: 0 }}
            animate={{
              y: "110%",
              opacity: [0, item.opacity, item.opacity, 0],
              rotate: 360,
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              left: item.left,
              top: "-10%",
            }}
          >
            <item.Icon
              size={item.size}
              className="text-slate-900 dark:text-white"
              style={{ opacity: item.opacity }}
            />
          </motion.div>
        ))}
      </div>

      {/* Background Decorative Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, -50, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[100px]"
        />
      </div>

      <div className="relative z-10 text-center max-w-2xl">
        {/* Animated Skull Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative h-48 w-48 drop-shadow-[0_20px_50px_rgba(59,130,246,0.3)]"
          >
            <Image
              src="/print_399969-273 copy.png"
              alt="404 Illustration"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Staggered Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-8xl md:text-9xl font-bold bg-linear-to-b from-slate-900 to-slate-500 dark:from-white dark:to-slate-500 bg-clip-text text-transparent mb-4"
          >
            404
          </motion.h1>

          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-3xl md:text-5xl font-semibold font-big-shoulders text-slate-800 dark:text-slate-200 mb-4"
          >
            Oops! This page vanished into thin AI.
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-slate-600 dark:text-slate-400 mb-10 font-manrope text-lg max-w-xl mx-auto"
          >
            The path you followed seems to have been recomputed. Let's get you
            back to safety.
          </motion.p>

          {/* Actions */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1 },
            }}
            className="flex font-manrope flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-8 h-12 text-base font-medium transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 group"
            >
              <Link href="/">
                <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                Back to Home
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 text-sm text-slate-400 dark:text-slate-600 font-manrope"
      >
        Clash Gambling &bull; Neural Network v1.0 &bull; ©{" "}
        {new Date().getFullYear()}
      </motion.p>
    </div>
  );
}
