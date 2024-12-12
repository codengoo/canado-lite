export default function FolderArea() {
  return (
    <div className="flex gap-2">
      <div className="flex items-center gap-2 rounded-md bg-white p-1 pr-2">
        <h1>🫤</h1>
        <h1 className="text-sm font-semibold">Default</h1>
      </div>

      <div className="flex items-center justify-center gap-2 rounded-md bg-amber-500 p-1">
        <h1 className="w-6">❤️</h1>
      </div>

      <div className="flex items-center justify-center gap-2 rounded-md bg-blue-500 p-1">
        <h1 className="w-6">😎</h1>
      </div>
    </div>
  );
}
