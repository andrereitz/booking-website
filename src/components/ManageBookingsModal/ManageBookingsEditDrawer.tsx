import {
  Drawer, 
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

export const ManageBookingsEditDrawer = ({
 id,
 onClose
} : {
  id: number | null,
  onClose: () => void
}) => {
  return(
    <Drawer open={id ? true : false} onClose={onClose}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
            
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Calories/day
                </div>
              </div>
            </div>
            <div className="mt-3 h-[120px]">
              something
            </div>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}