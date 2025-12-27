import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface RiskBadgeProps {
    level: number; // 1-10
}

export function RiskBadge({ level }: RiskBadgeProps) {
    let colorClass = "bg-gray-500";
    let text = "Unknown";

    if (level <= 2) {
        colorClass = "bg-green-500";
        text = "Very Low Risk";
    } else if (level <= 4) {
        colorClass = "bg-emerald-500";
        text = "Low Risk";
    } else if (level <= 6) {
        colorClass = "bg-yellow-500";
        text = "Moderate Risk";
    } else if (level <= 8) {
        colorClass = "bg-orange-500";
        text = "High Risk";
    } else {
        colorClass = "bg-red-500";
        text = "Very High Risk";
    }

    return (
        <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-muted-foreground">Risk Level: {level}/10</span>
            <Badge className={cn("text-white hover:bg-opacity-80", colorClass)}>
                {text}
            </Badge>
        </div>
    )
}
