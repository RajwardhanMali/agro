"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  User,
  Package,
  MapPin,
  Mail,
  Phone,
  Briefcase,
  Users,
  Leaf,
  Tractor,
  Clock,
  DollarSign,
  ShoppingBag,
} from "lucide-react";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const ProfilePage = () => {
  const { id } = useParams();
  const router = useRouter();

  interface UserData {
    _id: string;
    name: string;
    phone: string;
    email: string;
    role: string;
    state: string;
    district: string;
    produce?: { commodity: string; quantity: number; price: number }[];
    equipment?: {
      title: string;
      description: string;
      price: number;
      image: string;
    }[];
    sameLocationUsers: { _id: string; name: string }[];
  }

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/profile/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          return response.json();
        })
        .then((data) => {
          setUserData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-lg font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">User Not Found</CardTitle>
            <CardDescription className="text-center">
              The requested profile could not be found
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button onClick={() => router.push("/")}>Return Home</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  // Get role color
  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "farmer":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "vendor":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section with Banner */}
      <div className="w-full h-48 bg-gradient-to-r from-primary/20 to-primary/40 relative">
        <div className="container mx-auto px-4">
          <div className="absolute -bottom-16 flex items-end gap-4">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${userData.name}`}
                alt={userData.name}
              />
              <AvatarFallback className="text-3xl">
                {getInitials(userData.name)}
              </AvatarFallback>
            </Avatar>
            <div className="mb-4">
              <h1 className="text-3xl font-bold">{userData.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant="outline"
                  className={getRoleBadgeColor(userData.role)}
                >
                  {userData.role === "farmer" ? (
                    <Leaf className="h-3 w-3 mr-1" />
                  ) : (
                    <Tractor className="h-3 w-3 mr-1" />
                  )}
                  {userData.role.charAt(0).toUpperCase() +
                    userData.role.slice(1)}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-primary/10 text-primary hover:bg-primary/10"
                >
                  <MapPin className="h-3 w-3 mr-1" />
                  {userData.district}, {userData.state}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-20 px-4 md:px-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {userData.role === "farmer" && (
              <TabsTrigger value="produce">Produce</TabsTrigger>
            )}
            {userData.role === "vendor" && (
              <TabsTrigger value="equipment">Equipment</TabsTrigger>
            )}
            <TabsTrigger value="network">Network</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{userData.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{userData.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Briefcase className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Role</p>
                      <p className="font-medium capitalize">{userData.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">
                        {userData.district}, {userData.state}
                      </p>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <Button size="sm" className="w-full" asChild>
                    <a href={`tel:${userData.phone}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      Contact Now
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {userData.role === "farmer" ? (
                      <>
                        <Leaf className="h-5 w-5 text-primary" />
                        Farmer Profile
                      </>
                    ) : (
                      <>
                        <Tractor className="h-5 w-5 text-primary" />
                        Vendor Profile
                      </>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {userData.role === "farmer"
                      ? "Specializes in growing and selling agricultural produce"
                      : "Provides agricultural equipment and services to farmers"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userData.role === "farmer" &&
                      userData.produce &&
                      userData.produce.length > 0 && (
                        <div>
                          <h3 className="text-lg font-medium mb-2 flex items-center">
                            <ShoppingBag className="h-5 w-5 mr-2 text-primary" />
                            Available Produce
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {userData.produce.slice(0, 4).map((item, index) => (
                              <Card key={index} className="bg-muted/50">
                                <CardContent className="p-4">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-medium">
                                        {item.commodity}
                                      </h4>
                                      <p className="text-sm text-muted-foreground">
                                        {item.quantity}kg available
                                      </p>
                                    </div>
                                    <Badge
                                      variant="outline"
                                      className="bg-green-50 text-green-700 hover:bg-green-50"
                                    >
                                      ₹{item.price}/kg
                                    </Badge>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                          {userData.produce.length > 4 && (
                            <Button variant="link" className="mt-2 p-0">
                              View all {userData.produce.length} items
                            </Button>
                          )}
                        </div>
                      )}

                    {userData.role === "vendor" &&
                      userData.equipment &&
                      userData.equipment.length > 0 && (
                        <div>
                          <h3 className="text-lg font-medium mb-2 flex items-center">
                            <Tractor className="h-5 w-5 mr-2 text-primary" />
                            Featured Equipment
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {userData.equipment
                              .slice(0, 2)
                              .map((item, index) => (
                                <Card key={index} className="overflow-hidden">
                                  <div className="h-64 relative">
                                    <Image
                                      src={
                                        item.image ||
                                        "/placeholder.svg?height=160&width=320"
                                      }
                                      alt={item.title}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <CardContent className="p-4">
                                    <h4 className="font-medium">
                                      {item.title}
                                    </h4>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                      {item.description}
                                    </p>
                                    <div className="flex items-center justify-between mt-2">
                                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                                        <DollarSign className="h-3 w-3 mr-1" />₹
                                        {item.price}/day
                                      </Badge>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                          </div>
                          {userData.equipment.length > 2 && (
                            <Button variant="link" className="mt-2 p-0">
                              View all {userData.equipment.length} items
                            </Button>
                          )}
                        </div>
                      )}

                    <div>
                      <h3 className="text-lg font-medium mb-2 flex items-center">
                        <Users className="h-5 w-5 mr-2 text-primary" />
                        Local Network
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Connect with other users from {userData.district},{" "}
                        {userData.state}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {userData.sameLocationUsers.slice(0, 5).map((user) => (
                          <Button
                            key={user._id}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                            onClick={() => router.push(`/profile/${user._id}`)}
                          >
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                              />
                              <AvatarFallback className="text-xs">
                                {getInitials(user.name)}
                              </AvatarFallback>
                            </Avatar>
                            {user.name}
                          </Button>
                        ))}
                        {userData.sameLocationUsers.length > 5 && (
                          <Button variant="outline" size="sm">
                            +{userData.sameLocationUsers.length - 5} more
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {userData.role === "farmer" && (
            <TabsContent value="produce">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-primary" />
                    Available Produce
                  </CardTitle>
                  <CardDescription>
                    Agricultural products currently available from this farmer
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userData.produce?.map((item, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="h-40 bg-gradient-to-r from-green-50 to-green-100 flex items-center justify-center">
                          <ShoppingBag className="h-16 w-16 text-green-500/50" />
                        </div>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-semibold">
                              {item.commodity}
                            </h3>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              ₹{item.price}/kg
                            </Badge>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Package className="h-4 w-4 text-muted-foreground" />
                              <p className="text-sm">
                                <span className="font-medium">Quantity:</span>{" "}
                                {item.quantity} kg
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                              <p className="text-sm">
                                <span className="font-medium">
                                  Total Value:
                                </span>{" "}
                                ₹{item.quantity * item.price}
                              </p>
                            </div>
                          </div>

                          <Button className="w-full mt-4" size="sm">
                            <Phone className="h-4 w-4 mr-2" />
                            Contact to Purchase
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {userData.role === "vendor" && (
            <TabsContent value="equipment">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tractor className="h-5 w-5 text-primary" />
                    Equipment for Rent
                  </CardTitle>
                  <CardDescription>
                    Agricultural equipment available for rent from this vendor
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userData.equipment?.map((equipment, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="h-64 relative">
                          <Image
                            src={
                              equipment.image ||
                              "/placeholder.svg?height=192&width=384"
                            }
                            alt={equipment.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-primary text-primary-foreground">
                              ₹{equipment.price}/day
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold mb-2">
                            {equipment.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            {equipment.description}
                          </p>

                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">
                                ₹{equipment.price}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">Per Day</span>
                            </div>
                          </div>

                          <Button className="w-full">
                            <Phone className="h-4 w-4 mr-2" />
                            Contact to Rent
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          <TabsContent value="network">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Users from {userData.district}, {userData.state}
                </CardTitle>
                <CardDescription>
                  Connect with other users in your region
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {userData.sameLocationUsers.map((user) => (
                    <Card
                      key={user._id}
                      className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => router.push(`/profile/${user._id}`)}
                    >
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <Avatar className="h-20 w-20 mb-4">
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                          />
                          <AvatarFallback className="text-xl">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-medium text-lg mb-1">
                          {user.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {userData.district}, {userData.state}
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          View Profile
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </main>
  );
};

export default ProfilePage;
