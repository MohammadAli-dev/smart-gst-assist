import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lightbulb } from "lucide-react";
import { toast } from "sonner";
import { SuggestionCard } from "@/components/SuggestionCard";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";

interface Suggestion {
  id: number;
  hsnCode: string;
  description: string;
  gstRate: string;
  // confidence: number;
  // reason: string;
}

const mockHSNDatabase: Suggestion[] = [
  {
    id: 1,
    hsnCode: "4202.92",
    description: "Travel, laptop and similar cases with outer surface of leather or plastic sheeting",
    gstRate: "18%"
    // confidence: 92,
    // reason: "Matches keywords 'bag' and 'case' under Chapter 42 – Leather goods and travel accessories"
  },
  {
    id: 2,
    hsnCode: "8473.30",
    description: "Parts and accessories of computers and laptops",
    gstRate: "18%"
    // confidence: 74,
    // reason: "Contains term 'laptop charger', commonly classified under computer accessories"
  },
  {
    id: 3,
    hsnCode: "3926.20",
    description: "Plastic articles and accessories for office or travel use",
    gstRate: "18%"
    // confidence: 58,
    // reason: "Mentions 'plastic bag' — partial match to Chapter 39 (Plastics and articles thereof)"
  },
  {
    id: 4,
    hsnCode: "6109.10",
    description: "T-shirts, singlets and other vests, knitted or crocheted, of cotton",
    gstRate: "5%"
    // confidence: 88,
    // reason: "Textile clothing items made of cotton"
  },
  {
    id: 5,
    hsnCode: "8517.62",
    description: "Machines for reception, conversion and transmission of voice, images or data",
    gstRate: "18%"
    // confidence: 85,
    // reason: "Covers mobile phones, smartphones and communication devices"
  },
  {
    id: 6,
    hsnCode: "3004.90",
    description: "Medicaments consisting of mixed or unmixed products for therapeutic or prophylactic uses",
    gstRate: "12%"
    // confidence: 90,
    // reason: "Pharmaceutical products and medicines"
  },
  {
    id: 7,
    hsnCode: "8471.30",
    description: "Portable automatic data processing machines, weighing not more than 10 kg",
    gstRate: "18%"
    // confidence: 95,
    // reason: "Laptops and portable computers"
  },
  {
    id: 8,
    hsnCode: "6109",
    description: "T-shirts, singlets and other vests, knitted or crocheted",
    gstRate: "5%"
    // confidence: 95,
    // reason: "Keyword match: 't-shirt', commonly classified under Chapter 61 (apparel, knitted)"
  },
  {
    id: 9,
    hsnCode: "9403",
    description: "Other furniture and parts thereof (office, kitchen, bedroom)",
    gstRate: "18%"
    // confidence: 87,
    // reason: "Matched 'office chair' and 'table' — standard furniture classification under Chapter 94"
  },
  {
    id: 10,
    hsnCode: "2106",
    description: "Food preparations not elsewhere specified or included",
    gstRate: "12%"
    // confidence: 78,
    // reason: "Detected food-related terms — likely under Chapter 21 (misc food products)"
  },
  {
    id: 11,
    hsnCode: "8418",
    description: "Refrigerators, freezers and other refrigerating or freezing equipment",
    gstRate: "18%"
    // confidence: 89,
    // reason: "Recognized 'fridge' keyword; verified GST Council rate mapping"
  },
  {
    id: 12,
    hsnCode: "8703",
    description: "Motor cars and other motor vehicles for the transport of persons",
    gstRate: "28%"
    // confidence: 91,
    // reason: "Identified 'car' and 'automobile' keywords under Chapter 87 — Vehicles"
  },
  {
    id: 13,
    hsnCode: "3824.50.90",
    description: "Prepared binders for foundry moulds or cores; other chemical products n.e.s. (Tile Adhesive / Ready Mix Mortar)",
    gstRate: "18%"
    // confidence: 94,
    // reason: "Detected 'tile adhesive' or 'dry mix' — classified under Chapter 38 as construction chemical preparations"
  },
  {
    id: 14,
    hsnCode: "3824.99.90",
    description: "Other chemical preparations not elsewhere specified (construction-grade polymer mixes, mortars)",
    gstRate: "18%"
    // confidence: 88,
    // reason: "Identified mixture of cement, silica, fly ash and polymer binders — classified under miscellaneous chemical products"
  }
];

const matchSuggestions = (description: string): Suggestion[] => {
  const tokens = description.toLowerCase().split(/\s+/).filter(t => t.length > 2);
  
  if (tokens.length === 0) return [];

  const scored = mockHSNDatabase.map(suggestion => {
    const searchText = `${suggestion.description}`.toLowerCase();
    const matchedTokens = tokens.filter(token => searchText.includes(token));
    const matches = matchedTokens.length;
    const score = (matches / tokens.length) * 100;
    
    // Calculate dynamic confidence based on match quality
    const baseConfidence = Math.round((matches / tokens.length) * 100);
    const adjustedConfidence = Math.min(95, Math.max(45, baseConfidence));
    
    // Generate dynamic reason based on matched tokens
    const reason = matches > 0 
      ? `Matched keywords: '${matchedTokens.join("', '")}' in ${suggestion.description.substring(0, 50)}...`
      : "No direct keyword match";
    
    return {
      ...suggestion,
      matchScore: score,
      confidence: adjustedConfidence,
      reason
    };
  });

  return scored
    .filter(s => s.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);
};

const Index = () => {
  const [description, setDescription] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [rejectedIds, setRejectedIds] = useState<Set<number>>(new Set());

  const handleGetSuggestions = () => {
    if (!description.trim()) {
      toast.error("Please enter a product/service description");
      return;
    }

    setIsLoading(true);
    setSuggestions([]);
    setRejectedIds(new Set());

    // Simulate API call with filtering
    setTimeout(() => {
      const matches = matchSuggestions(description);
      
      if (matches.length === 0) {
        toast.info("No matching HSN codes found", {
          description: "Try different keywords or broader terms"
        });
      }
      
      setSuggestions(matches);
      setIsLoading(false);
    }, 1000);
  };

  const handleAccept = (suggestion: Suggestion) => {
    setHsnCode(suggestion.hsnCode);
    toast.success("✅ AI suggestion applied successfully!", {
      description: `HSN Code ${suggestion.hsnCode} has been applied`,
    });
  };

  const handleReject = (id: number) => {
    setRejectedIds(new Set([...rejectedIds, id]));
    toast.info("Suggestion rejected", {
      description: "This suggestion has been dismissed",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container max-w-5xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Lightbulb className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Smart HSN/SAC Code Assistant</h1>
          </div>
          <p className="text-muted-foreground">AI-powered co-pilot for GST classification</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-5xl mx-auto px-6 py-8">
        {/* Form Section */}
        <div className="bg-card rounded-lg shadow-md p-8 mb-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="description" className="text-base font-medium">
                Product/Service Description
              </Label>
              <Input
                id="description"
                placeholder="e.g., Custom laptop bag with charger"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-12"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-end">
              <div className="space-y-2">
                <Label htmlFor="hsn" className="text-base font-medium">
                  HSN/SAC Code
                </Label>
                <Input
                  id="hsn"
                  placeholder="Auto-filled after accepting suggestion"
                  value={hsnCode}
                  readOnly
                  className="h-12 bg-muted/50"
                />
              </div>
              <Button
                onClick={handleGetSuggestions}
                className="h-12 gap-2 px-6 whitespace-nowrap"
                disabled={isLoading}
              >
                <Lightbulb className="h-5 w-5" />
                Get AI Suggestion
              </Button>
            </div>
          </div>
        </div>

        {/* AI Suggestions Panel */}
        {(isLoading || suggestions.length > 0) && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-border" />
              <span className="text-sm font-medium text-muted-foreground">AI Suggestions</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            {isLoading ? (
              <LoadingSkeleton />
            ) : (
              <div className="space-y-4">
                {suggestions.map((suggestion) => (
                  <SuggestionCard
                    key={suggestion.id}
                    {...suggestion}
                    onAccept={() => handleAccept(suggestion)}
                    onReject={() => handleReject(suggestion.id)}
                    isRejected={rejectedIds.has(suggestion.id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container max-w-5xl mx-auto px-6 py-8">
          <p className="text-center text-sm text-muted-foreground">
            💡 AI-powered suggestions to simplify GST classification. Confidence levels auto-calculated by model.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
