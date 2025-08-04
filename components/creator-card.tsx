import { Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { CSSProperties } from "react";
import Image from "next/image";

interface CreatorCardProps {
  name: string;
  description: string;
  supporters: number;
  avatar: string;
  className?: string;
  style?: CSSProperties;
}

const CreatorCard = ({
  name,
  description,
  supporters,
  avatar,
  className,
  style,
}: CreatorCardProps) => {
  return (
    <Card
      className={`p-4 bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
      style={style}
    >
      <div className="flex items-start space-x-3">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
          <Image
            src={avatar}
            alt={name}
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-foreground mb-1">
            {description}
          </div>

          <div className="flex items-center mt-2 text-xs text-muted-foreground">
            <Heart className="w-3 h-3 mr-1" />
            <span>{supporters.toLocaleString()} supporters</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CreatorCard;
