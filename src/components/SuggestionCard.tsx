import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";

interface SuggestionCardProps {
  hsnCode: string;
  description: string;
  gstRate: string;
  confidence: number;
  reason: string;
  onAccept: () => void;
  onReject: () => void;
  isRejected?: boolean;
}

export const SuggestionCard = ({
  hsnCode,
  description,
  gstRate,
  confidence,
  reason,
  onAccept,
  onReject,
  isRejected = false,
}: SuggestionCardProps) => {
  const getConfidenceBadgeColor = (conf: number) => {
    if (conf >= 85) return "bg-success text-success-foreground";
    if (conf >= 60) return "bg-warning text-warning-foreground";
    return "bg-destructive text-destructive-foreground";
  };

  const getProgressColor = (conf: number) => {
    if (conf >= 85) return "bg-success";
    if (conf >= 60) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <Card
      className={`p-6 transition-all duration-300 hover:shadow-lg animate-fade-in ${
        isRejected ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-semibold text-foreground">{hsnCode}</h3>
            <span className="text-sm font-medium text-muted-foreground px-3 py-1 bg-secondary rounded-full">
              GST: {gstRate}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
        <div className={`ml-4 px-3 py-1 rounded-full text-sm font-bold ${getConfidenceBadgeColor(confidence)}`}>
          {confidence}%
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
          <span>Confidence Level</span>
          <span className="font-medium">{confidence}%</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${getProgressColor(confidence)}`}
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>

      <div className="mb-4 p-3 bg-muted/50 rounded-md">
        <p className="text-sm italic text-muted-foreground">
          💬 Reason: {reason}
        </p>
      </div>

      <div className="flex gap-3">
        <Button onClick={onAccept} className="flex-1 gap-2" disabled={isRejected}>
          <Check className="h-4 w-4" />
          Accept
        </Button>
        <Button onClick={onReject} variant="outline" className="flex-1 gap-2" disabled={isRejected}>
          <X className="h-4 w-4" />
          Reject
        </Button>
      </div>
    </Card>
  );
};
