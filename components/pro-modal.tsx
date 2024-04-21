"use client";

import axios from "axios";
import {
  Check,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
  Zap,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useProModal } from "@/hooks/use-pro-modal";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";

const tools = [
  {
    label: "Create a conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Generate an image file",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
  },
  {
    label: "Generate a video file",
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
  },
  {
    label: "Generate a music file",
    icon: Music,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Generate code snippets",
    icon: Code,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
];

const ProModal = () => {
  const proModal = useProModal();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      // console.log(error, "STRIPE_CLIENT_ERROR");
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center flex-col gap-y-4 pb-2">
              <div className="flex items-center gap-x-2 font-bold py-1">
                Upgrade To Genius
                <Badge className="uppercase text-sm py-1" variant="premium">
                  pro
                </Badge>
              </div>
            </DialogTitle>
            <DialogDescription className="space-y-2 pt-2 text-center text-zinc-900 font-medium">
              {tools.map((tool) => (
                <Card
                  key={tool.label}
                  className="flex items-center justify-between border-black/5 p-3"
                >
                  <div className="flex items-center gap-x-4">
                    <div className={cn("w-fit rounded-md", tool.bgColor)}>
                      <tool.icon className={cn("w-6 h-6", tool.color)} />
                    </div>
                    <div className="text-sm font-semibold">{tool.label}</div>
                  </div>
                  <Check className="5-6 h5 text-primary" />
                </Card>
              ))}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={onSubscribe}
              size="lg"
              variant="premium"
              className="w-full"
              disabled={loading}
            >
              Upgrade
              <Zap className="w-4 h-4 ml-2 fill-white" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProModal;
