"use server";

import { NextResponse } from "next/server";
import { Equipment } from "@/models/equipment";
import { dbConnect } from "@/utils/dbConnect";
import { getServerUser } from "@/lib/session";
import { uploadImage } from "@/lib/utils";

export async function POST(req: Request) {
  const user = await getServerUser();

  if (!user || user.role !== "vendor") {
    return NextResponse.json(
      { message: "Unauthorized access", user },
      { status: 401 }
    );
  }

  const { title, description, price, image } = await req.json();

  if (!title || !description || !price || !image) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    const imageUrl = await uploadImage(image);
    if (!imageUrl.secure_url) {
      return NextResponse.json(
        { message: "Failed to upload image" },
        { status: 400 }
      );
    }
    const newEquipment = new Equipment({
      title,
      description,
      price,
      image: imageUrl.secure_url,
      vendor: user.id,
    });

    await newEquipment.save();
    return NextResponse.json(
      { message: "Equipment listed successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error listing equipment:", error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    const equipmentList = await Equipment.find().populate(
      "vendor",
      "name phone state district"
    );

    return NextResponse.json(equipmentList, { status: 200 });
  } catch (error) {
    console.error("Error fetching equipment:", error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
