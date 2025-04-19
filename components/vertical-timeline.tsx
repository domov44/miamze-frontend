import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type TimelineStep = {
    title?: string;
    badge?: {
        text: string;
        icon?: React.ReactNode;
        variant?: BadgeProps["variant"];
    };
    description?: string;
    buttonText?: string;
    onButtonClick?: () => void;
    marker?: React.ReactNode | string | number;
    date?: {
        label: string;
        icon: React.ReactNode;
    };
};

type VerticalTimelineProps = {
    steps: TimelineStep[];
    className?: string;
};

export const VerticalTimeline = ({ steps, className }: VerticalTimelineProps) => {
    return (
        <ol className={cn("relative border-s", className)}>
            {steps.map((step, index) => (
                <li key={index} className="ms-6 mb-10 space-y-2">
                    <span className="bg-muted absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full border text-xs font-medium">
                        {typeof step.marker === "string" || typeof step.marker === "number"
                            ? step.marker
                            : step.marker ?? null}
                    </span>

                    {step.title && (
                        <h3 className="flex items-center font-semibold gap-4">
                            {step.title}
                            {step.badge && (
                                <Badge variant={step.badge.variant ?? "default"} className="flex items-center gap-1">
                                    {step.badge.icon}
                                    {step.badge.text}
                                </Badge>
                            )}
                        </h3>
                    )}

                    {step.date && (
                        <time className="text-muted-foreground flex items-center gap-1.5 text-sm leading-none">
                            {step.date.icon}
                            {step.date.label}
                        </time>
                    )}

                    {step.description && (
                        <p className="text-muted-foreground">
                            {step.description}
                        </p>
                    )}

                    {step.buttonText && (
                        <Button onClick={step.onButtonClick}>
                            {step.buttonText}
                        </Button>
                    )}
                </li>
            ))}
        </ol>
    );
};
