import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { User, Mail, MapPin, Shield, Calendar } from "lucide-react";

export  function ViewProfile({ user, isOpen , onClose }) {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Dialog open = {isOpen} onOpenChange={onClose}>
      <DialogContent>
          <DialogTitle>User Profile</DialogTitle>
        <div className="flex flex-col gap-6">
          {/* Avatar and Name */}
          <div className="flex flex-col items-center gap-3">
            <Avatar className="size-20">
              <AvatarImage src={user?.profileImage?.secure_url} alt={user.name} />
              <AvatarFallback>{getInitials(user.name || 'unknown')}</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold">{user.name}</h3>
          </div>

          {/* User Details */}
          <div className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex items-start gap-3">
              <Mail className="size-5 text-muted-foreground mt-0.5" />
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">Email</span>
                <span className="text-sm">{user?.userId?.email}</span>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-start gap-3">
              <Shield className="size-5 text-muted-foreground mt-0.5" />
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">Role</span>
                <Badge
                  variant={
                    user?.userId?.role.toLowerCase() === "admin"
                      ? "default"
                      : "secondary"
                  }
                >
                  {user?.userId?.role}
                </Badge>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3">
              <MapPin className="size-5 text-muted-foreground mt-0.5" />
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">
                  Location
                </span>
                <span className="text-sm">{user.location}</span>
              </div>
            </div>

            {/* Bio */}
            <div className="flex items-start gap-3">
              <User className="size-5 text-muted-foreground mt-0.5" />
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">Bio</span>
                <p className="text-sm">{user.bio}</p>
              </div>
            </div>

            {/* Domain */}
            <div className="flex items-start gap-3">
              <div className="size-5 flex items-center justify-center text-muted-foreground mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-muted-foreground">Domain</span>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(user.domain) && user.domain.map((item, index) => (
                    <Badge key={index} variant="secondary">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Joined Date */}
            <div className="flex items-start gap-3">
              <Calendar className="size-5 text-muted-foreground mt-0.5" />
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">Joined</span>
                <span className="text-sm">
                  {formatDate(user?.userId?.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
        </DialogContent>
    </Dialog>
  );
}