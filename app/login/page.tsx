import SignupForm from "@/components/client/login/SignupForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function page() {
  return (
    <article className="h-full w-full ">
      <h2>Login Page</h2>
      <section className="flex items-center justify-center h-full w-full md:p-32 p-8">
        <Tabs
          defaultValue="signup"
          className="border-2 border-primary w-full min-h-200"
        >
          <TabsList className="w-full my-4">
            <TabsTrigger value="login" className="dark:data-active:bg-primary">
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="dark:data-active:bg-primary">
              SignUp
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            Login Form Here can be wider if needed
          </TabsContent>
          <TabsContent value="signup">
            <SignupForm />{" "}
          </TabsContent>
        </Tabs>
      </section>
    </article>
  );
}
