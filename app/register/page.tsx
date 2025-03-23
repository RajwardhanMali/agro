"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mic } from "lucide-react"; // Microphone Icon
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    state: "",
    district: "",
    mandi: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Voice Input
  const handleVoiceInput = (field: string) => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Voice input is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setFormData((prev) => ({ ...prev, [field]: transcript }));
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      toast.error("Voice input failed. Please try again.");
    };

    recognition.start();
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText || "Registration failed");
        return;
      }
      toast.success("Registration successful. Please login to continue.");
      router.push("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className={cn("flex flex-col gap-6")}>
          <Card className="overflow-hidden">
            <CardContent className="grid p-0 md:grid-cols-2">
              <form
                className="p-6 md:p-8 space-y-4 grid grid-cols-2"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-6 col-span-2">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Create an Account</h1>
                    <p className="text-balance text-muted-foreground">
                      Register for your KisaanSaathi Inc account
                    </p>
                  </div>
                </div>
                {/* Name */}
                <label className="flex items-center">
                  Full Name
                  <button
                    type="button"
                    aria-label="Voice input for name"
                    onClick={() => handleVoiceInput("name")}
                    className="ml-2"
                  >
                    <Mic size={16} />
                  </button>
                </label>
                <Input
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />

                {/* Phone */}
                <label className="flex items-center">
                  Phone Number
                  <button
                    type="button"
                    aria-label="Voice input for phone"
                    onClick={() => handleVoiceInput("phone")}
                    className="ml-2"
                  >
                    <Mic size={16} />
                  </button>
                </label>
                <Input
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />

                {/* Email (Optional) */}
                <label className="flex items-center">
                  Email (Optional)
                  <button
                    type="button"
                    aria-label="Voice input for email"
                    onClick={() => handleVoiceInput("email")}
                    className="ml-2"
                  >
                    <Mic size={16} />
                  </button>
                </label>
                <Input
                  name="email"
                  placeholder="Email (Optional)"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="off"
                />

                {/* State */}
                <label className="flex items-center">
                  State
                  <button
                    type="button"
                    aria-label="Voice input for state"
                    onClick={() => handleVoiceInput("state")}
                    className="ml-2"
                  >
                    <Mic size={16} />
                  </button>
                </label>
                <Input
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />

                {/* District */}
                <label className="flex items-center">
                  District
                  <button
                    type="button"
                    aria-label="Voice input for district"
                    onClick={() => handleVoiceInput("district")}
                    className="ml-2"
                  >
                    <Mic size={16} />
                  </button>
                </label>
                <Input
                  name="district"
                  placeholder="District"
                  value={formData.district}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />

                {/* Mandi (Optional) */}
                <label className="flex items-center">
                  Mandi (Optional)
                  <button
                    type="button"
                    aria-label="Voice input for mandi"
                    onClick={() => handleVoiceInput("mandi")}
                    className="ml-2"
                  >
                    <Mic size={16} />
                  </button>
                </label>
                <Input
                  name="mandi"
                  placeholder="Mandi (Optional)"
                  value={formData.mandi}
                  onChange={handleChange}
                  autoComplete="off"
                />

                {/* Password */}
                <label className="flex items-center">Password</label>
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />

                {/* Role Selection */}
                <label>Role</label>
                <Select
                  name="role"
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData({ ...formData, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="farmer">Farmer</SelectItem>
                    <SelectItem value="vendor">Vendor</SelectItem>
                    <SelectItem value="transporter">Transporter</SelectItem>
                  </SelectContent>
                </Select>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full col-span-2"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </Button>
              </form>
              <div className="relative hidden bg-muted md:block">
                <img
                  src="https://img.freepik.com/free-photo/digital-environment-scene_23-2151873119.jpg?t=st=1742704914~exp=1742708514~hmac=dac8d8112b0837b97747f8d536c25573a5a8603a8a65098841b6121954cd62d4&w=740"
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </div>
            </CardContent>
          </Card>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
            By clicking register, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
