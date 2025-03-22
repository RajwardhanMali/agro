"use server";
import bcrypt from "bcryptjs";

import User from "@/models/User";
import { dbConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import { console } from "inspector";

export async function POST(req: Request) {
  const { name, phone, email, state, district, mandi, password, role } =
    await req.json();

  if (!name || !phone || !state || !district || !password || !role) {
    return NextResponse.json(
      { message: "Missing required fields" },

      { status: 400 }
    );
  }

  try {
    await dbConnect();

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return NextResponse.json(
        { message: "Phone number already registered" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      phone,
      email,
      state,
      district,
      mandi,
      role,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User Registered Successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
