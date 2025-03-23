import { Equipment } from "@/models/equipment";
import Produce from "@/models/Produce";
import User from "@/models/User";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await dbConnect();

    if (!id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const produce =
      user.role === "farmer"
        ? await Produce.find({ farmer: id }).select(
            "commodity quantity price grade availableUntil"
          )
        : [];

    const sameLocationUsers = await User.find({
      state: user.state,
      district: user.district,
      _id: { $ne: id },
    }).select("name _id");

    const equipment =
      user.role === "vendor"
        ? await Equipment.find({ vendor: id }).select(
            "title description price image"
          )
        : [];

    return NextResponse.json(
      {
        ...user.toObject(),
        produce,
        equipment,
        sameLocationUsers,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
