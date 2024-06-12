import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { User } from "lucide-react";

export default function NewReg() {
  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
          <CardHeader className="pb-3">
            <CardTitle>Your Registrations</CardTitle>
            <CardDescription className="max-w-lg text-balance text-sm  font-semibold leading-relaxed">
              Register a student to populate and have an amazing metric values.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button>Register New Student</Button>
          </CardFooter>
        </Card>
        <Card x-chunk="dashboard-05-chunk-1">
          <CardHeader className="pb-2">
            <CardDescription className="w-full flex items-center justify-between">Total Enrollments 
            <User className="text-orange-900" />
            </CardDescription>
            <CardTitle className="text-4xl">
                122
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +25% from last yesterday
            </div>
          </CardContent>
          <CardFooter>
            <Progress value={25} aria-label="25% increase" />
          </CardFooter>
        </Card>
        <Card x-chunk="dashboard-05-chunk-2">
          <CardHeader className="pb-2">
            <CardDescription>Today</CardDescription>
            <CardTitle className="text-4xl">29</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +10% from last yesterday
            </div>
          </CardContent>
          <CardFooter>
            <Progress value={12} aria-label="12% increase" />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
