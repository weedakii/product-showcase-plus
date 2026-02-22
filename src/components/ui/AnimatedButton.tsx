import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  to?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "outline" | "accent" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  fullWidth?: boolean;
  disabled?: boolean;
}

const variantStyles = {
  primary: "bg-primary text-primary-foreground",
  outline: "border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10",
  accent: "bg-accent text-accent-foreground",
  ghost: "bg-card text-foreground border border-border hover:bg-muted",
};

const sizeStyles = {
  sm: "px-5 py-2 text-sm",
  md: "px-8 py-3.5 text-sm font-semibold",
  lg: "px-10 py-4 text-base font-bold",
};

const AnimatedButton = ({
  to,
  onClick,
  children,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  fullWidth = false,
  disabled = false,
}: AnimatedButtonProps) => {
  const baseClasses = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors relative overflow-hidden",
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
    disabled && "opacity-50 pointer-events-none",
    className
  );

  const motionProps = {
    whileHover: { scale: 1.04, boxShadow: "0 8px 30px -8px hsl(152 40% 18% / 0.3)" },
    whileTap: { scale: 0.96 },
    transition: { type: "spring" as const, stiffness: 400, damping: 17 },
  };

  if (to) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link to={to} className={baseClasses}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...motionProps}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={baseClasses}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
