import HomePage from "@/components/HomePage";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<Skeleton className="h-8 w-1/3" />}>
      <HomePage />
    </Suspense>
  );
}
