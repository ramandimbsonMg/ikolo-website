// src/components/SectionTitle.tsx
export default function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div>
      <h3 className="text-2xl font-bold">{title}</h3>
      {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
    </div>
  );
}
