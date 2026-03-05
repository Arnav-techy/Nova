import { cn } from '../../lib/utils'

export function Skeleton({ className, ...props }) {
    return <div className={cn('skeleton', className)} {...props} />
}

export function SkeletonText({ lines = 3, className }) {
    return (
        <div className={cn('space-y-2', className)}>
            {Array.from({ length: lines }).map((_, i) => (
                <div
                    key={i}
                    className="skeleton-text"
                    style={{ width: i === lines - 1 ? '60%' : '100%' }}
                />
            ))}
        </div>
    )
}

export function SkeletonCard({ className }) {
    return (
        <div className={cn('gradient-border rounded-xl p-6 space-y-4', className)}>
            <div className="flex justify-between items-start">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <Skeleton className="h-4 w-32" />
            <div className="flex gap-4">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-20" />
            </div>
            <div className="space-y-2 pt-2">
                <Skeleton className="h-2 w-full rounded-full" />
                <SkeletonText lines={2} />
            </div>
        </div>
    )
}

export function SkeletonChart({ className, label }) {
    return (
        <div className={cn('gradient-border rounded-xl p-6', className)}>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            {/* Fake chart bars */}
            <div className="flex items-end gap-1.5 h-32 mt-4">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="skeleton flex-1 rounded-t-sm"
                        style={{
                            height: `${20 + Math.sin(i * 0.5) * 30 + Math.random() * 30}%`,
                            animationDelay: `${i * 0.1}s`,
                        }}
                    />
                ))}
            </div>
            {label && (
                <p className="text-xs text-gray-500 mt-3 text-center">{label}</p>
            )}
        </div>
    )
}
