import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog"

export const ManageBookingsDeleteConfirmation = ({
  id,
  onClose,
  onConfirm
} : {
  id?: number,
  onClose: () => void,
  onConfirm: () => void
}) => (
  <AlertDialog open={id ? true : false}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. Your reservation will be cancelled!
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onClose} data-testid="delete-cancel">Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onConfirm} data-testid="delete-confirm">Delete</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

)