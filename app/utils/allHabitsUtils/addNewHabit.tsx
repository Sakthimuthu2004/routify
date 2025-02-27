console.log("🚀 addNewHabit function is being called!");

import { AreaType, HabitType } from "../../Types/GlobalTypes";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { iconToText } from "../../Pages/AllHabits/Components/IconsWindow/IconData";
import scheduleNotifications from "../notificationFunctions";

export default async function addNewHabit({
  allHabits,
  setAllHabits,
  habit,
}: {
  allHabits: HabitType[];
  setAllHabits: Dispatch<SetStateAction<HabitType[]>>;
  // Using notificationTime as the start time; no separate startTime property required.
  habit: Omit<HabitType, "_id"> & { taskDurationType: "instant" | "timed"; endTime?: string };
}) {
  try {
    console.log("🔍 Debugging Habit Data:", habit);

    // Convert the main icon to text
    const { icon } = habit;
    const habitIconText = iconToText(icon);

    // Convert each area's icon to text
    const areasCopy = habit.areas.map((area) => ({
      ...area,
      icon: iconToText(area.icon),
    }));

    // Create the updated habit object using notificationTime as the start time
    const updatedHabit = { ...habit, icon: habitIconText, areas: areasCopy };

    const response = await fetch("/api/habits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedHabit),
    });

    if (!response.ok) {
      throw new Error("Failed to add habit");
    }

    // Extract the _id from the response
    const data = await response.json();
    const { _id } = data.habit;

    // Update the habit object with the new _id
    const updatedIdOfHabit = { ...habit, _id };
    console.log("✅ Habit successfully added to database:", updatedIdOfHabit);

    // Add the updated habit to the global state
    setAllHabits([...allHabits, updatedIdOfHabit]);

    // Debugging notification values
    console.log("🔔 Checking Notification Settings:", {
      isNotificationOn: updatedIdOfHabit.isNotificationOn,
      taskDurationType: updatedIdOfHabit.taskDurationType,
      notificationTime: updatedIdOfHabit.notificationTime,
      endTime: updatedIdOfHabit.endTime,
      frequencyDays: updatedIdOfHabit.frequency[0]?.days,
      habitName: updatedIdOfHabit.name,
    });

    // Schedule notifications based on taskDurationType using notificationTime as the start time.
    if (updatedIdOfHabit.isNotificationOn) {
      if (updatedIdOfHabit.taskDurationType === "instant") {
        console.log("📅 Scheduling instant notification at:", updatedIdOfHabit.notificationTime);
        scheduleNotifications(
          updatedIdOfHabit.notificationTime,
          updatedIdOfHabit.frequency[0].days,
          updatedIdOfHabit.name
        );
      } else if (updatedIdOfHabit.taskDurationType === "timed" && updatedIdOfHabit.endTime) {
        console.log("📅 Scheduling timed notification (start) at:", updatedIdOfHabit.notificationTime);
        scheduleNotifications(
          updatedIdOfHabit.notificationTime,
          updatedIdOfHabit.frequency[0].days,
          `Start: ${updatedIdOfHabit.name}`
        );
        console.log("📅 Scheduling timed notification (end) at:", updatedIdOfHabit.endTime);
        scheduleNotifications(
          updatedIdOfHabit.endTime,
          updatedIdOfHabit.frequency[0].days,
          `End: ${updatedIdOfHabit.name}`
        );
      }
    }

    toast.success("Habit added successfully!");
  } catch (error) {
    console.error("❌ Error in addNewHabit:", error);
    toast.error("Something went wrong!... ");
  }
}
