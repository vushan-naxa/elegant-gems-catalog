
import { cn } from "@/lib/utils";

interface PurityBadgeProps {
  purity: string;
  className?: string;
}

const PurityBadge = ({ purity, className }: PurityBadgeProps) => {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium bg-white/80 backdrop-blur-sm text-gold-dark border border-gold/20 shadow-sm",
        className
      )}
    >
      {purity}
    </div>
  );
};

export default PurityBadge;
