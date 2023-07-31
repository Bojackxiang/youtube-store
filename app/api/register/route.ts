import { hashPassword } from "@/helper/password-helper";
import axios from "axios";
import { NextResponse } from "next/server";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/user-auth/register`;

const POSTPathAlias = "[POST]";

// post request
export async function POST(
  req: Request,
  { params }: { params: { paramName: string } }
) {
  try {
    const body = await req.json()
    const {email, firstName, lastName, password, phone } = body
    const hashedPassword = await hashPassword(password)

    const response = await axios.post(`${URL}`, {
      storeToken: process.env.STORE_TOKEN,
      email: email,
      password: hashedPassword,
      phone: phone,
      firstName: firstName,
      lastName: lastName,
    });
    const { data } = response;

    if(data.success === false){
      throw new Error(data.message)
    }

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
    });
    
  } catch (error: any) {
    console.error("user register error - ", error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}


