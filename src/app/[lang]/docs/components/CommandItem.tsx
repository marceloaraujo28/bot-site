export function CommandItem({
  name,
  description,
  admin = false,
}: {
  name: string;
  description: string;
  admin?: boolean;
}) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded p-4 space-y-1">
      <div className="flex items-center justify-between">
        <h3 className="font-mono text-lg text-green-400">{name}</h3>
        {admin && (
          <span className="text-xs px-2 py-0.5 bg-red-800 text-red-200 rounded-full uppercase font-semibold">
            Admin
          </span>
        )}
      </div>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}
