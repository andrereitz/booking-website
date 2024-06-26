import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

export const DetailsModalHeader = ({
  title,
  onClose
} : {
  title: string,
  onClose: () => void
}) => {
  return (
    <div className="flex gap-3 items-center border-b-slate-300 border-b p-4 shadow-md">
      <h2 className="overflow-hidden overflow-ellipsis text-lg font-bold pl-2 whitespace-nowrap">
        {title}
      </h2>
      <Button variant={"ghost"} onClick={onClose} className="ml-auto" data-testid="close-button">
        <XIcon />
      </Button>
    </div>
  )
}