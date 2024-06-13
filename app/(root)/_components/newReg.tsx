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
import { AreaChart, BarChartHorizontal, User } from "lucide-react";
import Link from "next/link";

export default function NewReg({
  total,
  recent,
  studentsYesterday,
  percentageChange
}: {
  total: number;
  recent: number;
  studentsYesterday: number;
  percentageChange: number;
}) {
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
            <Button asChild>
              <Link href={"/register"}>Register New Student</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card x-chunk="dashboard-05-chunk-1">
          <CardHeader className="pb-2">
            <CardDescription className="w-full flex items-center justify-between">
              Total Enrollments
              <BarChartHorizontal className="text-orange-900" />
            </CardDescription>
            <CardTitle className="text-4xl">{total}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Total enrollments.
            </div>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-05-chunk-2">
          <CardHeader className="pb-2">
            <CardDescription className="w-full flex items-center justify-between">
              Past Enrollments
              <AreaChart className="text-orange-900" />
            </CardDescription>
            <CardTitle className="text-4xl">{studentsYesterday}</CardTitle>
          </CardHeader>
           <CardContent>
            <div className="text-xs text-muted-foreground">
              Enrollments from yesterday
            </div>
          </CardContent>
          {/*<CardFooter>
            <Progress value={12} aria-label="12% increase" />
          </CardFooter> */}
        </Card>
        <Card x-chunk="dashboard-05-chunk-2">
          <CardHeader className="pb-2">
            <CardDescription className="w-full flex items-center justify-between">
              Recent Enrollments
              <User className="text-orange-900" />
            </CardDescription>
            <CardTitle className="text-4xl">{recent}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
            {percentageChange.toFixed(2)}% from yesterday
            </div>
          </CardContent>
          <CardFooter>
            <Progress value={percentageChange > 0 ? percentageChange : 0} aria-label={`${percentageChange.toFixed(2)}% increase`} />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
