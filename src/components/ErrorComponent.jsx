import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorComponent({ message, onRetry }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="min-h-screen flex flex-col items-center justify-center p-6"
    >
      <div className="max-w-sm w-full bg-white shadow-2xl rounded-2xl p-6 text-center border border-gray-100">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "backOut" }}
        >
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        </motion.div>

        <h2 className="text-lg font-semibold text-red-700">
          Something went wrong
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-sm text-red-600 text-center mt-2"
        >
          <p className="text-sm text-red-600 text-center mt-2">{message}</p>
        </motion.p>

        {onRetry && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Button
              onClick={onRetry}
              className="mt-4 bg-primary hover:bg-secondary"
            >
              Try Again
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
