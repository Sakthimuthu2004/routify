// import { NextResponse } from "next/server";
// import connectToDB from "../../lib/conntectToDB";
// import HabitsCollection from "../../Models/HabitSchema";
// import { Error } from "mongoose";
// export async function POST(req: Request) {
//   try {
//     const {
//       name,
//       icon,
//       clerkUserId,
//       frequency,
//       notificationTime,
//       isNotificationOn,
//       areas,
//       completedDays,
//     } = await req.json();

//     await connectToDB();

//     const habit = new HabitsCollection({
//       name,
//       icon,
//       clerkUserId,
//       frequency,
//       notificationTime,
//       isNotificationOn,
//       areas,
//       completedDays,
//     });

//     const savedHabit = await habit.save();

//     return NextResponse.json({ habit: savedHabit });
//   } catch (error) {
//     console.log(error);

//     return NextResponse.json({ error: error }, { status: 400 });
//   }
// }

// export async function GET(req: any) {
//   try {
//     const clerkId = req.nextUrl.searchParams.get("clerkId");
//     await connectToDB();
//     const habits = await HabitsCollection.find({ clerkUserId: clerkId });
//     return NextResponse.json({ habits: habits });
//   } catch (error) {
//     return NextResponse.json({ error: error }, { status: 400 });
//   }
// }

// export async function DELETE(request: any) {
//   try {
//     const { habitId } = await request.json(); // Get projectId from the request body
//     // Get clerkId from the query parameters

//     const habitToDelete = await HabitsCollection.findOneAndDelete({
//       _id: habitId,
//     });

//     if (!habitToDelete) {
//       return NextResponse.json({ message: "habit not found" }, { status: 404 });
//     }

//     return NextResponse.json({ message: "Habit deleted successfully" });
//   } catch (error) {
//     return NextResponse.json({ message: error });
//   }
// }

// export async function PUT(request: any) {
//   try {
//     const habitId = request.nextUrl.searchParams.get("habitId");
//     const {
//       name,
//       icon,
//       frequency,
//       notificationTime,
//       isNotificationOn,
//       areas,
//       completedDays,
//     } = await request.json();

//     if (!habitId) {
//       return NextResponse.json(
//         { message: "Habit ID is required" },
//         { status: 400 }
//       );
//     }

//     // Connect to the database
//     await connectToDB();

//     // Find the habit by habitId and update it
//     const updatedHabit = await HabitsCollection.findOneAndUpdate(
//       { _id: habitId },
//       {
//         $set: {
//           name,
//           icon,
//           frequency,
//           notificationTime,
//           isNotificationOn,
//           areas,
//           completedDays,
//         },
//       },
//       { returnDocument: "after" } // Return the updated document
//     );

//     console.log(updatedHabit);

//     return NextResponse.json({
//       message: "Habit has been updated successfully",
//       habit: updatedHabit.value,
//     });
//   } catch (error) {
//     console.error("Error updating habit:", error);
//     return NextResponse.json(
//       { message: "An error occurred while updating the habit" },
//       { status: 500 }
//     );
//   }
// }


// app/api/habits/route.ts
import { NextResponse } from "next/server";
import connectToDB from "../../lib/conntectToDB";
import HabitsCollection from "../../Models/HabitSchema";

// POST Method (Create a new habit)
export async function POST(req: Request) {
  try {
    const {
      name,
      icon,
      clerkUserId,
      frequency,
      notificationTime,
      isNotificationOn,
      areas,
      completedDays,
    } = await req.json();

    await connectToDB();

    const habit = new HabitsCollection({
      name,
      icon,
      clerkUserId,
      frequency,
      notificationTime,
      isNotificationOn,
      areas,
      completedDays,
    });

    const savedHabit = await habit.save();

    return NextResponse.json({ habit: savedHabit });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

// GET Method (Fetch habits for a specific user)
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const clerkId = url.searchParams.get("clerkId");

    if (!clerkId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    await connectToDB();
    const habits = await HabitsCollection.find({ clerkUserId: clerkId });

    if (!habits || habits.length === 0) {
      return NextResponse.json({ error: "No habits found" }, { status: 404 });
    }

    return NextResponse.json({ habits: habits });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

// DELETE Method (Delete a habit)
export async function DELETE(req: Request) {
  try {
    const { habitId } = await req.json();
    console.log("Received DELETE request for habitId:", habitId);

    const habitToDelete = await HabitsCollection.findOneAndDelete({
      _id: habitId,
    });

    if (!habitToDelete) {
      console.error("Habit not found for deletion with id:", habitId);
      return NextResponse.json({ message: "Habit not found" }, { status: 404 });
    }

    console.log("Habit deleted successfully:", habitToDelete);
    return NextResponse.json({ message: "Habit deleted successfully" });
  } catch (error) {
    console.error("Error in DELETE habit:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}

// PUT Method (Update a habit)
export async function PUT(req: Request) {
  try {
    const url = new URL(req.url);
    const habitId = url.searchParams.get("habitId");

    const {
      name,
      icon,
      frequency,
      notificationTime,
      isNotificationOn,
      areas,
      completedDays,
    } = await req.json();

    if (!habitId) {
      return NextResponse.json(
        { message: "Habit ID is required" },
        { status: 400 }
      );
    }

    await connectToDB();

    const updatedHabit = await HabitsCollection.findOneAndUpdate(
      { _id: habitId },
      {
        $set: {
          name,
          icon,
          frequency,
          notificationTime,
          isNotificationOn,
          areas,
          completedDays,
        },
      },
      { returnDocument: "after" }
    );

    return NextResponse.json({
      message: "Habit has been updated successfully",
      habit: updatedHabit,
    });
  } catch (error) {
    console.error("Error updating habit:", error);
    return NextResponse.json(
      { message: "An error occurred while updating the habit" },
      { status: 500 }
    );
  }
}

// Custom Method for Habit Insights
export async function GETHabitInsights(req: Request) {
  try {
    const url = new URL(req.url);
    const clerkId = url.searchParams.get("clerkId");

    if (!clerkId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    await connectToDB();
    const habits = await HabitsCollection.find({ clerkUserId: clerkId });

    let insights: string[] = [];

    habits.forEach((habit: any) => {
      const completedDates = habit.completedDays.map((day: any) => day.date);
      const morningCount = completedDates.filter((date: string) =>
        date.includes("Morning")
      ).length;
      const eveningCount = completedDates.filter((date: string) =>
        date.includes("Evening")
      ).length;

      // Suggest switching to evening if morning habit is often missed
      if (morningCount < eveningCount) {
        insights.push(
          `You often miss ${habit.name} in the morning. Would you prefer to do it in the evening instead?`
        );
      }

      // Suggest a fixed reminder if the user completes habit more in the evening
      if (eveningCount > morningCount) {
        insights.push(
          `You tend to complete ${habit.name} more in the evening. How about setting a fixed evening reminder?`
        );
      }
    });

    return NextResponse.json({ insights });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
