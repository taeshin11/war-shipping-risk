export default function AdHeader() {
  return (
    <div className="flex justify-center my-2">
      <div className="bg-gray-200 flex items-center justify-center text-gray-400 text-xs w-[728px] h-[90px] hidden md:flex">Ad 728×90</div>
      <div className="bg-gray-200 flex items-center justify-center text-gray-400 text-xs w-[320px] h-[50px] md:hidden">Ad 320×50</div>
    </div>
  )
}
