import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import fs from "fs";
import path from "path";

export async function GET(req: Request) {
  try {
    // Get the file query parameter
    const { searchParams } = new URL(req.url);
    const file = searchParams.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "File path is required" },
        { status: 400 }
      );
    }

    // Construct file path
    const filePath = path.join(process.cwd(), "constants", file);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Read and parse CSV file
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const workbook = XLSX.read(fileContent, { type: "string" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);

    // Return JSON response
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error reading file", error },
      { status: 500 }
    );
  }
}
