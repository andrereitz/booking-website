import { twMerge } from "tailwind-merge"

interface SidebarItemProps extends React.PropsWithChildren {
  className?: string
}

export const SidebarItem = ({
  children,
  className
} : SidebarItemProps) => {
  return(
    <div className={twMerge(`bg-slate-50 rounded-md h-auto flex flex-col p-4 shadow-md`, className)}>
      { children }
    </div>
  )
}