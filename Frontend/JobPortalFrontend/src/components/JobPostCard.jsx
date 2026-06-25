import React from 'react'

const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    if (Number.isNaN(date.getTime())) return dateString
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })
}

const JobPostCard = ({ jobPost }) => {
    const {
        companyLogoUrl,
        companyName,
        createdAt,
        location,
        postProfile,
        postTechStack = [],
        reqExperience,
    } = jobPost || {}

    const visibleStacks = postTechStack.slice(0, 4)
    const remainingStacks = postTechStack.length - visibleStacks.length

    return (
        <article
            className="group w-full overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:border-zinc-300 hover:shadow-md dark:border-zinc-700 dark:bg-slate-900 dark:hover:border-zinc-600 dark:hover:shadow-lg dark:hover:shadow-black/20"
        >
            <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:gap-5 sm:p-5 md:p-6">
                <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-center sm:gap-2">
                    <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 p-1.5 dark:border-zinc-600 dark:bg-slate-800 sm:h-16 sm:w-16">
                        {companyLogoUrl ? (
                            <img
                                className="h-full w-full object-contain"
                                src={companyLogoUrl}
                                alt={`${companyName || 'Company'} logo`}
                            />
                        ) : (
                            <span className="text-lg font-bold text-green-700 dark:text-green-400">
                                {companyName?.charAt(0) || '?'}
                            </span>
                        )}
                    </div>
                    <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 sm:text-center sm:text-xs">
                        {companyName}
                    </p>
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                            <h3 className="truncate text-lg font-bold text-zinc-900 dark:text-neutral-100 sm:text-xl">
                                {postProfile}
                            </h3>
                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-500 dark:text-zinc-400">
                                {location && (
                                    <span className="inline-flex items-center gap-1.5">
                                        <svg
                                            className="h-4 w-4 shrink-0"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 21c-4.418 0-8-4.03-8-9 0-4.418 3.582-8 8-8s8 3.582 8 8c0 4.97-3.582 9-8 9z"
                                            />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                        {location}
                                    </span>
                                )}
                                {createdAt && (
                                    <span className="inline-flex items-center gap-1.5">
                                        <svg
                                            className="h-4 w-4 shrink-0"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <rect x="3" y="4" width="18" height="18" rx="2" />
                                            <path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" />
                                        </svg>
                                        {formatDate(createdAt)}
                                    </span>
                                )}
                            </div>
                        </div>

                        {reqExperience != null && (
                            <span className="inline-flex w-fit shrink-0 items-center rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-800 dark:bg-green-950/60 dark:text-green-300">
                                {reqExperience} {reqExperience === 1 ? 'yr' : 'yrs'} exp
                            </span>
                        )}
                    </div>

                    {postTechStack.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {visibleStacks.map((skill, index) => (
                                <span
                                    key={`${skill}-${index}`}
                                    className="rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 transition-colors dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-300 sm:px-3 sm:text-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                            {remainingStacks > 0 && (
                                <span className="rounded-lg border border-zinc-200 bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-600 dark:border-zinc-600 dark:bg-slate-800 dark:text-zinc-400 sm:px-3 sm:text-sm">
                                    +{remainingStacks} more
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="border-t border-zinc-100 bg-zinc-50/80 px-4 py-2.5 transition-colors group-hover:bg-zinc-100/80 dark:border-zinc-700 dark:bg-slate-800/50 dark:group-hover:bg-slate-800 sm:px-5 md:px-6">
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 sm:text-sm">
                    View job details
                    <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">
                        →
                    </span>
                </p>
            </div>
        </article>
    )
}

export default JobPostCard
