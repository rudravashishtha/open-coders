"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { createRoomAction } from "./actions";

const formSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(200),
  githubRepo: z.string().min(1).max(100),
  tags: z.string().min(1).max(80),
});

export function CreateRoomForm() {
  const { toast } = useToast();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      githubRepo: "",
      tags: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const room = await createRoomAction(values);
    toast({
      title: "Room Created",
      description: "Your room was successfully created",
    });
    router.push(`/rooms/${room.id}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Name</FormLabel>
              <FormControl>
                <Input placeholder="Working on cool stuff!" {...field} />
              </FormControl>
              <FormDescription>
                Enter a name for your room. This will be publicly displayed.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Write yourself a good description" {...field} />
              </FormControl>
              <FormDescription>
                Provide a brief room description to help users understand its
                purpose.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="githubRepo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub Repository Link</FormLabel>
              <FormControl>
                <Input placeholder="https://github.com/rudravashishtha/open-coders" {...field} />
              </FormControl>
              <FormDescription>
                Share your GitHub repository link.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input placeholder="nexjs, typescript, tailwind" {...field} />
              </FormControl>
              <FormDescription>
                Add relevant tags to categorize your room.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center mx-auto lg:w-[40%] xl:w-[50%]">
          <Button type="submit" className="w-full" size="lg">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
