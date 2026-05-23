export default function DashboardLoading() {
  return (
    <div className="px-9 py-8 flex flex-col gap-6 animate-pulse">
      <div className="h-10 w-80 bg-[#EBEFE5] rounded-lg" />
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-[#F6FBF1] rounded-[20px] h-40" />
        <div className="bg-[#F6FBF1] rounded-[20px] h-40" />
        <div className="bg-[#F6FBF1] rounded-[20px] h-40" />
        <div className="col-span-2 bg-[#F6FBF1] rounded-[20px] h-72" />
        <div className="flex flex-col gap-6">
          <div className="bg-[#F6FBF1] rounded-[20px] h-20" />
          <div className="bg-[#F6FBF1] rounded-[20px] h-20" />
          <div className="bg-[#F6FBF1] rounded-[20px] h-20" />
        </div>
      </div>
    </div>
  );
}
