import * as z from "zod";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewTaskSchema } from "@/schemas";

interface NewTaskModalProps {
  isOpen: boolean;
  toggleModal: any;
  onCreate: (values: z.infer<typeof NewTaskSchema>) => Promise<void>;
}

export const NewTaskModal = ({
  isOpen,
  toggleModal,
  onCreate
}: NewTaskModalProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewTaskSchema>>({
    resolver: zodResolver(NewTaskSchema),
    defaultValues: {
      name: "",
      description: ""
    },
  });

  const onSubmit = (values: z.infer<typeof NewTaskSchema>) => {
    startTransition(async () => {
      onCreate(values);
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
                name="name"
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
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="New task description"
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
