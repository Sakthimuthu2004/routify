// import { AreaType } from "../../Types/GlobalTypes";
// import { IconProp } from "@fortawesome/fontawesome-svg-core";
// import { Dispatch } from "react";
// import { SetStateAction } from "react";
// import toast from "react-hot-toast";
// import { iconToText } from "../../Pages/AllHabits/Components/IconsWindow/IconData";
// export default async function addNewArea({
//   areaItem,
//   allAreas,
//   setAllAreas,
// }: {
//   areaItem: Omit<AreaType, "_id">;
//   allAreas: AreaType[];
//   setAllAreas: React.Dispatch<React.SetStateAction<AreaType[]>>;
// }) {
//   try {
//     //Convert the icon to text
//     const { icon } = areaItem;
//     const areaIconText = iconToText(icon as IconProp);

//     //Update the icon property in the area object
//     const updatedArea = { ...areaItem, icon: areaIconText };

//     try {
//       const response = await fetch("/api/areas", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },

//         body: JSON.stringify(updatedArea),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to add habit");
//       }
//       //Extract the _id from the response
//       const data = await response.json();
//       const { _id } = data.area;
//       //
//       //Update the _id of the area
//       const updatedIdOfArea = { ...areaItem, _id: _id };

//       //Add the updated habit to the allHabits array
//       setAllAreas([...allAreas, updatedIdOfArea]);

//       toast.success("Area added successfully!");
//     } catch (error) {
//       toast.error("Something went wrong!...");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

import { AreaType } from "../../Types/GlobalTypes";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import toast from "react-hot-toast";
import { iconToText } from "../../Pages/AllHabits/Components/IconsWindow/IconData";

export default async function addNewArea({
  areaItem,
  allAreas,
  setAllAreas,
}: {
  areaItem: Omit<AreaType, "_id">;
  allAreas: AreaType[];
  setAllAreas: React.Dispatch<React.SetStateAction<AreaType[]>>;
}) {
  const { icon, ...restAreaItem } = areaItem;

  try {
    // Convert the icon to text
    const areaIconText = iconToText(icon as IconProp);

    // Update the icon property in the area object
    const updatedArea = { ...restAreaItem, icon: areaIconText };

    // Make the API request
    const response = await fetch("/api/areas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedArea),
    });

    if (!response.ok) {
      throw new Error(`Failed to add area: ${response.statusText}`);
    }

    // Extract the _id from the response
    const data = await response.json();

    if (!data.area || !data.area._id) {
      throw new Error("Invalid response from server");
    }

    const { _id } = data.area;

    // Update the _id of the area
    const updatedIdOfArea = { ...areaItem, _id };

    // Add the updated area to the allAreas array
    setAllAreas((prevAreas) => [...prevAreas, updatedIdOfArea]);

    toast.success("Area added successfully!");
  } catch (error) {
    console.error("Error adding area:", error);

    if (error instanceof Error) {
      toast.error(`Failed to add area: ${error.message}`);
    } else {
      toast.error("Something went wrong! Please try again.");
    }
  }
}