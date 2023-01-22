interface HabitDayProps {
  title: string;
}

export function HabitDay({ title }: HabitDayProps) {
  return (
    <div
      title={title}
      className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg"
    ></div>
  );
}
