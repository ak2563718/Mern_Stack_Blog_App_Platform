import { AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export default function AuthError({
  isOpen,
  onClose,
  title,
  errorMessage,
  onRetry,
  retryLabel = "Try Again",
  type = "login",
}) {
  const defaultTitle = type === "login" ? "Login Failed" : "Signup Failed";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="rounded-full bg-red-100 p-3">
              <AlertCircle className="size-12 text-red-600" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">
            {title || defaultTitle}
          </DialogTitle>
          <DialogDescription className="text-center">
            <div className="mt-2 p-3 bg-red-50 rounded-md border border-red-200">
              <p className="text-sm text-red-800">{errorMessage}</p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center gap-2">
          {onRetry && (
            <Button
              onClick={() => {
                onClose();
                onRetry();
              }}
              className="w-full sm:w-auto px-8"
            >
              {retryLabel}
            </Button>
          )}
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full sm:w-auto px-8"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
