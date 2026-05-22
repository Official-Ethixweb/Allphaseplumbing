import type { CSSProperties, ElementType, ReactNode } from "react";
import "./StarBorder.css";

interface StarBorderProps {
  as?: ElementType;
  className?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  innerClassName?: string;
  innerStyle?: CSSProperties;
  children?: ReactNode;
  [key: string]: unknown;
}

export function StarBorder({
  as: Component = "button",
  className = "",
  color = "#F5C842",
  speed = "1s",
  thickness = 6,
  innerClassName = "",
  innerStyle = {},
  children,
  ...rest
}: StarBorderProps) {
  return (
    <Component
      className={`star-border-container ${className}`}
      style={{ padding: `${thickness}px 0`, ...(rest.style as CSSProperties) }}
      {...rest}
    >
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div className={`inner-content ${innerClassName}`} style={innerStyle}>
        {children}
      </div>
    </Component>
  );
}
