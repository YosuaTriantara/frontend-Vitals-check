export default function HealthDataDetailLoading() {
  return (
    <div className="px-9 py-8 flex flex-col gap-6 animate-pulse">
      <div className="h-4 w-32 bg-[#EBEFE5] rounded" />
      <div className="h-10 w-64 bg-[#EBEFE5] rounded-lg" />
      <div className="grid grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-[#F6FBF1] rounded-[20px] h-28" />
        ))}
      </div>
    </div>
  );
}
