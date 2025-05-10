export default function ContentBlock({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#F7F8FA] shadow-md overflow-hidden w-full h-full">
      {children}
    </div>
  );
}
