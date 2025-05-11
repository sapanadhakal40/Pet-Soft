import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export default function PetFormBtn({ actionType }) {
  const { pending } = useFormStatus();
  return (
    <div>
      <Button type="submit" disabled={pending} className="mt-5 self-end">
        {actionType === "add" ? "Add a new Pet" : "Edit Pet"}
      </Button>
    </div>
  );
}
