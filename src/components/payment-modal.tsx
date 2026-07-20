"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface PaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PaymentModal({ open, onOpenChange }: PaymentModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/10 bg-zinc-900 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Payment Gateway Under Construction
          </DialogTitle>
          <DialogDescription className="text-center text-base leading-relaxed text-zinc-400">
            We were too kikir to integrate a payment gateway.
            <br />
            <br />
            Thanks for considering supporting the developer.
            <br />
            <br />
            Unfortunately, even we don&apos;t know how to accept your money.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-center">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-white/20 hover:bg-white/10"
          >
            Close
          </Button>
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-purple-600 hover:bg-purple-500"
          >
            Try Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
