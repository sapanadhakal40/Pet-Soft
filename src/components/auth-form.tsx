import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type AuthFormProps = {
  type: "login" | "signup";
};
export default function AuthForm({ type }: AuthFormProps) {
  return (
    <form>
      <div className="space-y-1">
        <Label htmlFor="email" className="text-sm font-medium">
          Email
        </Label>
        <Input id="email" name="email" type="email" />
      </div>
      <div className="mt-2 mb-4 space-y-1">
        <Label htmlFor="password" className="text-sm font-medium">
          Password
        </Label>
        <Input id="password" name="password" type="password" />
      </div>
      <Button className="mt-4">
        {type === "login" ? "Log In" : "Sign Up"}
      </Button>
    </form>
  );
}
