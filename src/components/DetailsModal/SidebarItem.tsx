export const SidebarItem = ({
  children
} : React.PropsWithChildren) => {
  return(
    <div className="bg-slate-50 rounded-md h-auto flex flex-col p-4 shadow-md">
      { children }
    </div>
  )
}