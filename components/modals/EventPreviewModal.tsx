import Image from "next/image";
import { Event } from "@/lib/types";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";

export const EventPreviewModal = ({
  event,
  originRect,
  onClose,
}: {
  event: Event;
  originRect: DOMRect;
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={{
        position: "fixed",
        top: originRect.top,
        left: originRect.left,
        width: originRect.width,
        height: originRect.height,
        zIndex: 50,
      }}
      animate={{
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        transition: { duration: 0.4, ease: "easeInOut" },
      }}
      exit={{
        top: originRect.top,
        left: originRect.left,
        width: originRect.width,
        height: originRect.height,
        transition: { duration: 0.4, ease: "easeInOut" },
      }}
      className="bg-neutral-900 overflow-auto rounded-none"
    >
      <div className="p-5 absolute">
        <div
          onClick={onClose}
          className="px-6 py-1.5 bg-gradient-to-bl from-neutral-700 to-neutral-800 bg-[length:200%_100%] bg-left hover:bg-right border border-neutral-700 transition-all duration-200 ease-in-out cursor-pointer rounded-full font-sans"
        >
          Close
        </div>
      </div>
      <div className="p-8 max-w-3xl mx-auto mt-20 font-sans">
        <h2 className="text-3xlsemibold mb-4">{event.title}</h2>
        <Image
          src={event.image_url || "https://via.placeholder.com/800x400"}
          alt={event.title}
          width={800}
          height={400}
          className="rounded-md"
        />
        <p className="mt-4 text-neutral-300">{event.description}</p>
        <div className="mt-2 text-sm text-neutral-400 font-mono">
          {formatDate(event.event_date)}
        </div>
      </div>
    </motion.div>
  );
};
