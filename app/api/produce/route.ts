"use server";

import { NextResponse } from "next/server";

import Produce from "@/models/Produce";
import { dbConnect } from "@/utils/dbConnect";
import { getServerUser } from "@/lib/session";

export async function POST(req: Request) {
  const user = await getServerUser();

  if (!user || user.role !== "farmer") {
    return NextResponse.json(
      { message: "Unauthorized access", user },
      { status: 401 }
    );
  }

  const { commodity, quantity, price, grade, availableUntil } =
    await req.json();

  if (!commodity || !quantity || !price || !grade || !availableUntil) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    const newProduce = new Produce({
      farmer: user.id,
      commodity,
      quantity,
      price,
      grade,
      availableUntil,
    });

    await newProduce.save();

    return NextResponse.json(
      { message: "Produce listed successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error listing produce:", error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    const produceList = await Produce.find().populate(
      "farmer",
      "name phone state district"
    );

    return NextResponse.json(produceList, { status: 200 });
  } catch (error) {
    console.error("Error fetching produce:", error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
