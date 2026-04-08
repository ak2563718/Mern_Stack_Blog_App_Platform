import { CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export default function AuthSuccess({
  isOpen,
  onClose,
  title,
  message,
  actionLabel = "Continue",
  type = "login",
}) {
  const defaultTitle = type === "login" ? "Login Successful!" : "Account Created!";
  const defaultMessage =
    type === "login"
      ? "You have successfully logged in to your account."
      : "Your account has been created successfully. Welcome aboard!";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="size-12 text-green-600" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">
            {title || defaultTitle}
          </DialogTitle>
          <DialogDescription className="text-center">
            {message || defaultMessage}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button onClick={onClose} className="w-full sm:w-auto px-8">
            {actionLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
