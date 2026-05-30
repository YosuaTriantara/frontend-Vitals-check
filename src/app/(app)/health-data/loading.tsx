export default function HealthDataLoading() {
  return (
    <div className="px-4 py-6 md:px-6 lg:px-9 lg:py-8 flex flex-col gap-4 animate-pulse overflow-x-hidden">
      <div className="h-9 md:h-10 w-48 md:w-64 bg-[#EBEFE5] rounded-lg mb-2" />
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-[#F6FBF1] rounded-[20px] h-24 md:h-20" />
      ))}
    </div>
  );
}