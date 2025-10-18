import { Card } from "@/components/ui/card";

export const LoadingSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="p-6 animate-fade-in">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-6 w-24 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-shimmer bg-[length:1000px_100%]" />
                <div className="h-6 w-20 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-shimmer bg-[length:1000px_100%]" />
              </div>
              <div className="h-4 w-full bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-shimmer bg-[length:1000px_100%]" />
              <div className="h-4 w-3/4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-shimmer bg-[length:1000px_100%]" />
            </div>
            <div className="ml-4 h-8 w-16 bg-gradient-to-r from-muted via-muted/50 to-muted rounded-full animate-shimmer bg-[length:1000px_100%]" />
          </div>
          <div className="space-y-2 mb-4">
            <div className="h-3 w-full bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-shimmer bg-[length:1000px_100%]" />
          </div>
          <div className="h-16 w-full bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-shimmer bg-[length:1000px_100%]" />
          <div className="flex gap-3 mt-4">
            <div className="h-10 flex-1 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-shimmer bg-[length:1000px_100%]" />
            <div className="h-10 flex-1 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-shimmer bg-[length:1000px_100%]" />
          </div>
        </Card>
      ))}
    </div>
  );
};
