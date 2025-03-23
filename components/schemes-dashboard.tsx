"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle, HelpCircle } from "lucide-react";
import Link from "next/link";

export function SchemesDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [farmerCategory, setFarmerCategory] = useState("small");
  const [selectedState, setSelectedState] = useState("all");
  const [annualIncome, setAnnualIncome] = useState("<100000");

  // Mock data - in a real app, this would come from an API
  const schemes = [
    {
      id: 1,
      name: "PM-KISAN",
      description:
        "Income support of ₹6,000 per year in three equal installments to all land holding farmer families.",
      category: "Income Support",
      eligibility: "All land holding farmers with cultivable land",
      deadline: "Ongoing",
      state: "Central",
      status: "Active",
    },
    {
      id: 2,
      name: "Pradhan Mantri Fasal Bima Yojana",
      description:
        "Crop insurance scheme to provide financial support to farmers suffering crop loss/damage due to unforeseen events.",
      category: "Insurance",
      eligibility: "All farmers growing notified crops",
      deadline: "Seasonal",
      state: "Central",
      status: "Active",
    },
    {
      id: 3,
      name: "Kisan Credit Card",
      description:
        "Provides farmers with affordable credit for their agricultural needs.",
      category: "Credit",
      eligibility: "All farmers, sharecroppers, and tenant farmers",
      deadline: "Ongoing",
      state: "Central",
      status: "Active",
    },
    {
      id: 4,
      name: "Soil Health Card Scheme",
      description:
        "Provides information on soil health to farmers to help them improve productivity through judicious use of inputs.",
      category: "Technical Support",
      eligibility: "All farmers",
      deadline: "Ongoing",
      state: "Central",
      status: "Active",
    },
    {
      id: 5,
      name: "National Mission for Sustainable Agriculture",
      description:
        "Promotes sustainable agriculture through climate change adaptation measures.",
      category: "Sustainable Farming",
      eligibility: "Farmers adopting sustainable practices",
      deadline: "2025-06-30",
      state: "Central",
      status: "Active",
    },
    {
      id: 6,
      name: "Punjab Farm Loan Waiver",
      description:
        "Waiver of agricultural loans for small and marginal farmers.",
      category: "Loan Waiver",
      eligibility: "Small and marginal farmers with loans up to ₹2 lakhs",
      deadline: "2025-04-15",
      state: "Punjab",
      status: "Active",
    },
    {
      id: 7,
      name: "Karnataka Krishi Yantra Dhare",
      description:
        "Subsidy on purchase of agricultural implements and machinery.",
      category: "Equipment Subsidy",
      eligibility: "All farmers in Karnataka",
      deadline: "2025-05-31",
      state: "Karnataka",
      status: "Active",
    },
    {
      id: 8,
      name: "Maharashtra Jalyukt Shivar Abhiyan",
      description: "Water conservation scheme to make villages drought-proof.",
      category: "Water Conservation",
      eligibility: "Villages in drought-prone areas",
      deadline: "Ongoing",
      state: "Maharashtra",
      status: "Active",
    },
  ];

  const applications = [
    {
      id: 101,
      scheme: "PM-KISAN",
      appliedDate: "2025-02-15",
      status: "Approved",
      nextInstallment: "2025-04-01",
      amount: "₹2,000",
    },
    {
      id: 102,
      scheme: "Pradhan Mantri Fasal Bima Yojana",
      appliedDate: "2025-03-10",
      status: "Pending",
      nextStep: "Document Verification",
    },
    {
      id: 103,
      scheme: "Kisan Credit Card",
      appliedDate: "2025-01-20",
      status: "Approved",
      creditLimit: "₹1,50,000",
      validUntil: "2026-01-20",
    },
  ];

  // Filter schemes based on search query and filters
  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch =
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = stateFilter === "all" || scheme.state === stateFilter;
    const matchesCategory =
      categoryFilter === "all" || scheme.category === categoryFilter;

    return matchesSearch && matchesState && matchesCategory;
  });

  // Get unique categories for filter
  const categories = Array.from(
    new Set(schemes.map((scheme) => scheme.category))
  );

  // Get unique states for filter
  const states = Array.from(new Set(schemes.map((scheme) => scheme.state)));

  // Filter schemes based on eligibility inputs
  const eligibleSchemes = schemes.filter((scheme) => {
    const matchesState =
      selectedState === "all" || scheme.state.toLowerCase() === selectedState;
    const matchesIncome =
      annualIncome === "<100000" ||
      (annualIncome === "100000-300000" &&
        scheme.eligibility.includes("₹1,00,000")) ||
      (annualIncome === "300000-500000" &&
        scheme.eligibility.includes("₹3,00,000")) ||
      (annualIncome === ">500000" && scheme.eligibility.includes("₹5,00,000"));
    const matchesCategory =
      farmerCategory === "all" ||
      scheme.eligibility.toLowerCase().includes(farmerCategory);

    return matchesState && matchesIncome && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <Tabs defaultValue="available">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="available">Available Schemes</TabsTrigger>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
          <TabsTrigger value="eligibility">Eligibility Check</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search schemes..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={stateFilter} onValueChange={setStateFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filter by state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All States</SelectItem>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={categoryFilter}
                    onValueChange={setCategoryFilter}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                {filteredSchemes.length > 0 ? (
                  filteredSchemes.map((scheme) => (
                    <Card key={scheme.id} className="overflow-hidden">
                      <div className="border-l-4 border-primary h-full">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-lg">
                                  {scheme.name}
                                </h3>
                                <Badge variant="outline">
                                  {scheme.category}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {scheme.description}
                              </p>
                              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                                <span>
                                  <strong>Eligibility:</strong>{" "}
                                  {scheme.eligibility}
                                </span>
                                <span>
                                  <strong>Deadline:</strong> {scheme.deadline}
                                </span>
                                <span>
                                  <strong>State:</strong> {scheme.state}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-row md:flex-col gap-2 justify-end">
                              <Button size="sm" asChild>
                                <Link href={`/schemes/${scheme.id}/apply`}>
                                  Apply Now
                                </Link>
                              </Button>
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/schemes/${scheme.id}`}>
                                  View Details
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No schemes found matching your criteria.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Applications</CardTitle>
            </CardHeader>
            <CardContent>
              {applications.length > 0 ? (
                <div className="space-y-4">
                  {applications.map((application) => (
                    <Card key={application.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="space-y-2">
                            <h3 className="font-semibold">
                              {application.scheme}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Applied on: {application.appliedDate}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">
                                Status:
                              </span>
                              {application.status === "Approved" ? (
                                <Badge className="bg-green-500">
                                  {application.status}
                                </Badge>
                              ) : application.status === "Pending" ? (
                                <Badge variant="outline">
                                  {application.status}
                                </Badge>
                              ) : (
                                <Badge variant="destructive">
                                  {application.status}
                                </Badge>
                              )}
                            </div>
                            {application.nextInstallment && (
                              <p className="text-sm">
                                Next Installment: {application.nextInstallment}{" "}
                                ({application.amount})
                              </p>
                            )}
                            {application.nextStep && (
                              <p className="text-sm">
                                Next Step: {application.nextStep}
                              </p>
                            )}
                            {application.creditLimit && (
                              <p className="text-sm">
                                Credit Limit: {application.creditLimit} (Valid
                                until: {application.validUntil})
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link
                                href={`/schemes/applications/${application.id}`}
                              >
                                View Details
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    You haven't applied for any schemes yet.
                  </p>
                  <Button className="mt-4" asChild>
                    <Link href="/schemes?tab=available">
                      Browse Available Schemes
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="eligibility" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Eligibility Check</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  Answer a few questions to find out which agricultural schemes
                  you're eligible for.
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Farmer Category
                    </label>
                    <Select
                      value={farmerCategory}
                      onValueChange={setFarmerCategory}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="marginal">
                          Marginal Farmer ({"< 1 hectare"})
                        </SelectItem>
                        <SelectItem value="small">
                          Small Farmer (1-2 hectares)
                        </SelectItem>
                        <SelectItem value="medium">
                          Medium Farmer (2-4 hectares)
                        </SelectItem>
                        <SelectItem value="large">
                          Large Farmer ({"> 4 hectares"})
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">State</label>
                    <Select
                      value={selectedState}
                      onValueChange={setSelectedState}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All States</SelectItem>
                        {states.map((state) => (
                          <SelectItem key={state} value={state.toLowerCase()}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Annual Income</label>
                    <Select
                      value={annualIncome}
                      onValueChange={setAnnualIncome}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select income range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<100000">
                          Less than ₹1,00,000
                        </SelectItem>
                        <SelectItem value="100000-300000">
                          ₹1,00,000 - ₹3,00,000
                        </SelectItem>
                        <SelectItem value="300000-500000">
                          ₹3,00,000 - ₹5,00,000
                        </SelectItem>
                        <SelectItem value=">500000">
                          More than ₹5,00,000
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full">Check Eligibility</Button>
                </div>

                <div className="border rounded-md p-4 bg-muted/50">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Based on your profile, you may be eligible for:
                  </h3>
                  {eligibleSchemes.length > 0 ? (
                    <ul className="space-y-2 pl-7 list-disc">
                      {eligibleSchemes.map((scheme) => (
                        <li key={scheme.id}>{scheme.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">
                      No schemes match your eligibility criteria.
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
