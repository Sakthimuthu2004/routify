"use client";

import React from "react";
import { useGlobalContextProvider } from "@/app/contextApi";
import { generateConsistencyInsight } from "@/app/api/utils/habitInsights";
import { HabitType } from "@/app/Types/GlobalTypes";

export default function HabitInsights() {
  const { allHabitsObject } = useGlobalContextProvider();
  const { allHabits } = allHabitsObject;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Habit Insights</h1>
      {allHabits.length === 0 ? (
        <p>No habits available. Log some habits!</p>
      ) : (
        allHabits.map((habit: HabitType) => {
          // Generate insights for each habit
          const insights = generateConsistencyInsight(habit) || [];
          return (
            <div key={habit._id} className="border p-4 rounded mb-4">
              <h2 className="text-xl font-semibold">{habit.name}</h2>
              <p>Status: {habit.isNotificationOn ? "Active" : "Inactive"}</p>
              <p>Notification Time: {habit.notificationTime}</p>
              <p>
                Areas:{" "}
                {habit.areas && habit.areas.length > 0
                  ? habit.areas.map((area: any) => area.name).join(", ")
                  : "No areas"}
              </p>
              <div className="mt-2">
                <h3 className="font-semibold">Insights:</h3>
                {insights.length > 0 ? (
                  <ul className="list-disc ml-4">
                    {insights.map((insight, idx) => (
                      <li key={idx}>{insight}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No insights for this habit.</p>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
