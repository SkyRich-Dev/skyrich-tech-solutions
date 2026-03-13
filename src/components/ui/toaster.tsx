import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-[350px]">
      <AnimatePresence>
        {toasts.map(function ({ id, title, description, action }) {
          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="bg-card border border-white/10 shadow-lg rounded-xl p-4 glass flex justify-between items-start gap-4"
            >
              <div className="grid gap-1">
                {title && <div className="font-semibold text-foreground">{title}</div>}
                {description && (
                  <div className="text-sm text-muted-foreground">{description}</div>
                )}
              </div>
              {action}
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
