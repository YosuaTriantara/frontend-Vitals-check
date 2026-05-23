export default function HealthDataLoading() {
  return (
    <div className="px-9 py-8 flex flex-col gap-4 animate-pulse">
      <div className="h-10 w-64 bg-[#EBEFE5] rounded-lg mb-2" />
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-[#F6FBF1] rounded-[20px] h-20" />
      ))}
    </div>
  );
}
