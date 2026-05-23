export default function ResultsLoading() {
  return (
    <div className="px-9 py-8 flex flex-col gap-6 animate-pulse">
      {/* Welcome skeleton */}
      <div className="py-5">
        <div className="h-10 w-96 bg-[#EBEFE5] rounded-lg mb-3" />
        <div className="h-6 w-[576px] bg-[#EBEFE5] rounded-lg" />
      </div>

      {/* Bento grid skeleton */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left gauge card */}
        <div className="bg-[#F6FBF1] rounded-[24px] h-[561px]" />
        {/* Right column */}
        <div className="col-span-2 flex flex-col gap-6">
          <div className="bg-[#F6FBF1] rounded-[24px] h-48" />
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#F6FBF1] rounded-[24px] h-52" />
            <div className="bg-[#F6FBF1] rounded-[24px] h-52" />
          </div>
        </div>
      </div>

      {/* Recommendations skeleton */}
      <div className="bg-[#F6FBF1] rounded-[24px] h-72" />

      {/* Banner skeleton */}
      <div className="bg-[#EBEFE5] rounded-[24px] h-40" />
    </div>
  );
}
