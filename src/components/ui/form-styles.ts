export const formStyles = {
  form: "space-y-6",
  formGroup: "space-y-2",
  label: "block text-sm font-medium text-gray-400",
  input: `w-full rounded-full
    bg-[#282828] border border-[#282828]
    px-4 py-2.5 text-sm text-white
    placeholder:text-gray-500
    focus:border-white focus:ring-1 focus:ring-white
    hover:border-gray-700
    disabled:cursor-not-allowed disabled:opacity-50
    transition-colors duration-200`,
  select: `w-full rounded-full
    bg-[#282828] border border-[#282828]
    px-4 py-2.5 text-sm text-white
    focus:border-white focus:ring-1 focus:ring-white
    hover:border-gray-700
    disabled:cursor-not-allowed disabled:opacity-50
    transition-colors duration-200`,
  multiSelect: `w-full rounded-xl
    bg-[#282828] border border-[#282828]
    px-4 py-2.5 text-sm text-white
    focus:border-white focus:ring-1 focus:ring-white
    hover:border-gray-700
    [&>option]:bg-[#282828] [&>option]:text-white
    disabled:cursor-not-allowed disabled:opacity-50
    transition-colors duration-200`,
  table: {
    wrapper: "rounded-xl border border-[#282828] bg-[#181818] overflow-hidden",
    header: "bg-[#282828]",
    headerCell: "px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider",
    row: "border-t border-[#282828] hover:bg-[#282828] transition-colors duration-200",
    cell: "px-6 py-4 text-sm text-white",
    actionCell: "px-6 py-4 text-sm flex items-center gap-2",
  }
} 