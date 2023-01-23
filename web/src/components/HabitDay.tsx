import * as Popover from "@radix-ui/react-popover";

import { ProgressBar } from "./ProgressBar";
import clsx from "clsx";
import dayjs from "dayjs";
import { HabitsList } from "./HabitsList";
import { useState } from "react";
interface HabitDayProps {
  date: string;
  defaultCompleted?: number;
  amount?: number;
}

export function HabitDay({
  date,
  defaultCompleted = 0,
  amount = 0,
}: HabitDayProps) {
  const [completed, setCompleted] = useState(defaultCompleted);

  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0;

  const dayAndMonth = dayjs(date).format("DD/MM");
  const dayOfWeek = dayjs(date).format("dddd").toLocaleUpperCase();
  const dateFormat = dayjs(date).format("DD/MMM/YYYY");
  const dateIsToday = dayjs(date).isSame(new Date(), "day");
  const isDateInFuture = dayjs(date).isAfter(new Date(), "day");

  function handleCompletedChanged(completed: number) {
    setCompleted(completed);
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        title={dateFormat}
        arial-label={date}
        className={clsx(
          "w-10 h-10 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background",
          {
            "bg-zinc-900 border-zinc-800": completedPercentage === 0,
            "bg-violet-900 border-violet-700":
              completedPercentage > 0 && completedPercentage < 20,
            "bg-violet-800 border-violet-600":
              completedPercentage >= 20 && completedPercentage < 40,
            "bg-violet-700 border-violet-500":
              completedPercentage >= 40 && completedPercentage < 60,
            "bg-violet-600 border-violet-500":
              completedPercentage >= 60 && completedPercentage < 80,
            "bg-violet-500 border-violet-400": completedPercentage >= 80,
            "bg-zinc-900 border-zinc-200": dateIsToday,
            "bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 ":
              isDateInFuture,
          }
        )}
      />
      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background">
          <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="font-extrabold mt-1 leading-tight text-3xl">
            {dayAndMonth}
          </span>
          <div className="w-full flex items-center justify-end">
            <span>
              Hábitos: {completed}/{amount}
            </span>
          </div>
          <ProgressBar progress={completedPercentage} />
          <HabitsList
            date={new Date(date)}
            onCompletedChanged={handleCompletedChanged}
          />

          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
