"use client";
import { Button } from "@/components/ui/button";
import { CreateRoomForm } from "./create-room-form";
import { useRouter } from "next/navigation";
import { ArrowBigLeft } from "lucide-react";

export default function CreateRoomPage() {
  const router = useRouter();
  return (
    <div className="container mx-auto flex flex-col gap-8 pt-12 pb-24">
      <Button
        onClick={() => router.back()}
        className="w-fit flex justify-start"
      >
        <ArrowBigLeft className="mr-5" /> Back
      </Button>
      <h1 className="text-4xl font-bold">Create Room</h1>

      <CreateRoomForm />
    </div>
  );
}
