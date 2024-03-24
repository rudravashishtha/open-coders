"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

// Define the form schema using zod
const formSchema = z.object({
    search: z.string().min(0).max(50),
});

export function SearchBar() {
    const router = useRouter();
    const query = useSearchParams();

    // Initialize the form using react-hook-form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: query.get("search") ?? "",
        },
    });

    const search = query.get("search");

    // Set the form value when the search query changes
    useEffect(() => {
        form.setValue("search", search ?? "");
    }, [search, form]);

    // Handle form submission
    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (values.search) {
            router.push(`/browse?search=${values.search}`);
        } else {
            router.push("/browse");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
                {/* Search input field */}
                <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    className="w-[440px]"
                                    placeholder="Filter rooms by keywords, such as typescript, next.js, python"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit button */}
                <Button type="submit">
                    <SearchIcon />
                </Button>

                {/* Clear button */}
                {query.get("search") && (
                    <Button
                        variant="link"
                        onClick={() => {
                            form.setValue("search", "");
                            router.push("/");
                        }}
                    >
                        Clear
                    </Button>
                )}
            </form>
        </Form>
    );
}
