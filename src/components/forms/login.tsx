import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { type FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

import { Button } from "~/components/ui/button";
import { Password } from "~/components/ui/custom/password";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

import { cn } from "~/lib/utils";
import { loginZ } from "~/zod/authZ";

interface Props {
  className?: string;
}

const LoginForm: FunctionComponent<Props> = ({ className }) => {
  const router = useRouter();

  const formSchema = loginZ;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast.loading("Logging in...");
    signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    })
      .then(async (s) => {
        toast.dismiss();
        if (s?.ok) {
          toast.success("Logged in successfully");
          void router.push(`/profile`);
        } else {
          toast.error("Failed to log in! You sure about your credentials?");
        }
      })
      .catch((e) => {
        toast.dismiss();
        console.error(e);
        toast.error("Failed to log in");
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(className, "space-y-8 ")}
      >
        <FormMessage className="flex justify-center text-4xl text-white">
          Login
        </FormMessage>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white dark:text-white">
                Email
              </FormLabel>
              <FormControl className="bg-[#494949]">
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white dark:text-white">
                Password
              </FormLabel>
              <FormControl className="bg-[#494949]">
                <Password placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="!mt-2 flex justify-between text-sm">
          <Link
            href="/send-reset-email"
            className="text-muted-foreground text-white underline dark:text-white "
          >
            Forgot password
          </Link>
        </div>
        <div className="flex  flex-col justify-center gap-2">
          <Button className="bg-purple-700 hover:bg-purple-700" type="submit">
            Submit
          </Button>
          <p className="mb-4 text-center text-sm text-white dark:text-white">
            Don&#39;t have an account?
            <strong className="underline">
              <Link href="/signup"> Signup </Link>
            </strong>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
