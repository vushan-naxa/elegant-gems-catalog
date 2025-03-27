
import { cn } from "@/lib/utils";

interface PurityBadgeProps {
  purity: string;
  className?: string;
}

const PurityBadge = ({ purity, className }: PurityBadgeProps) => {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-gold-dark",
        className
      )}
    >
      {purity}
    </div>
  );
};

export default PurityBadge;
