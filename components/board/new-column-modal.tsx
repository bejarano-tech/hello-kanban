import * as z from "zod";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewColumnSchema } from "@/schemas";

interface NewColumnModalProps {
  isOpen: boolean;
  toggleModal: any;
  onCreate: (arg0: string) => {};
}

export const NewColumnModal = ({
  isOpen,
  toggleModal,
  onCreate,
}: NewColumnModalProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewColumnSchema>>({
    resolver: zodResolver(NewColumnSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewColumnSchema>) => {
    startTransition(async () => {
      onCreate(values.title);
      toggleModal();
      form.reset();
    });
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg relative flex flex-col">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="New colum title"
                        type="text"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              Create
            </Button>
          </form>
        </Form>
        <Button variant="link" onClick={toggleModal}>Close</Button>
      </div>
    </div>
  );
};
