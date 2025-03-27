
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  actionText?: string;
  actionLink?: string;
  className?: string;
}

const SectionHeader = ({
  title,
  actionText,
  actionLink,
  className,
}: SectionHeaderProps) => {
  return (
    <div className={cn("flex justify-between items-center mb-4", className)}>
      <h2 className="text-lg font-serif font-medium bg-gradient-to-r from-gold-dark to-gold bg-clip-text text-transparent">{title}</h2>
      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="text-sm text-gold-dark font-medium transition-colors hover:text-gold flex items-center"
        >
          {actionText}
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
