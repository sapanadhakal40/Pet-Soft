"use client";
import { usePetContext } from "@/lib/hooks";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { addPet } from "@/actions/actions";

type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};
export default function PetForm({
  actionType,
  onFormSubmission,
}: PetFormProps) {
  const { selectedPet } = usePetContext();
  return (
    <form action={addPet} className="flex flex-col">
      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            name="name"
            required
            defaultValue={actionType === "edit" ? selectedPet?.name : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            type="text"
            name="ownerName"
            required
            defaultValue={actionType === "edit" ? selectedPet?.ownerName : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input
            id="imageUrl"
            type="text"
            name="imageUrl"
            defaultValue={actionType === "edit" ? selectedPet?.imageUrl : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            name="age"
            required
            defaultValue={actionType === "edit" ? selectedPet?.age : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            rows={3}
            placeholder="Notes"
            name="notes"
            required
            defaultValue={actionType === "edit" ? selectedPet?.notes : ""}
          />
        </div>
      </div>
      <Button type="submit" className="mt-5 self-end">
        {actionType === "add" ? "Add a new Pet" : "Edit Pet"}
      </Button>
    </form>
  );
}
// export default function PetForm({
//   actionType,
//   onFormSubmission,
// }: PetFormProps) {
//   const { handleAddPet, handleEditPet, selectedPet } = usePetContext();
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const formData = new FormData(e.currentTarget);

//     const pet = {
//       name: formData.get("name") as string,
//       ownerName: formData.get("ownerName") as string,
//       imageUrl:
//         (formData.get("imageUrl") as string) ||
//         "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
//       age: +(formData.get("age") as string),
//       notes: formData.get("notes") as string,
//     };

//     if (actionType === "add") {
//       handleAddPet(pet);
//     } else if (actionType === "edit") {
//       handleEditPet(selectedPet!.id, pet);
//     }
//     // console.log(newPet);
//     onFormSubmission();
//   };
//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col">
//       <div className="space-y-4">
//         <div className="space-y-1">
//           <Label htmlFor="name">Name</Label>
//           <Input
//             id="name"
//             type="text"
//             name="name"
//             required
//             defaultValue={actionType === "edit" ? selectedPet?.name : ""}
//           />
//         </div>
//         <div className="space-y-1">
//           <Label htmlFor="ownerName">Owner Name</Label>
//           <Input
//             id="ownerName"
//             type="text"
//             name="ownerName"
//             required
//             defaultValue={actionType === "edit" ? selectedPet?.ownerName : ""}
//           />
//         </div>
//         <div className="space-y-1">
//           <Label htmlFor="imageUrl">Image Url</Label>
//           <Input
//             id="imageUrl"
//             type="text"
//             name="text"
//             defaultValue={actionType === "edit" ? selectedPet?.imageUrl : ""}
//           />
//         </div>
//         <div className="space-y-1">
//           <Label htmlFor="age">Age</Label>
//           <Input
//             id="age"
//             type="number"
//             name="age"
//             required
//             defaultValue={actionType === "edit" ? selectedPet?.age : ""}
//           />
//         </div>
//         <div className="space-y-1">
//           <Label htmlFor="notes">Notes</Label>
//           <Textarea
//             id="notes"
//             rows={3}
//             placeholder="Notes"
//             name="notes"
//             required
//             defaultValue={actionType === "edit" ? selectedPet?.notes : ""}
//           />
//         </div>
//       </div>
//       <Button type="submit" className="mt-5 self-end">
//         {actionType === "add" ? "Add a new Pet" : "Edit Pet"}
//       </Button>
//     </form>
//   );
// }
