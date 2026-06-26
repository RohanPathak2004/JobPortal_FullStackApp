import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {useAuthContext} from '../context/AuthContext.jsx'
import axios from 'axios'
import ApplyPopUp from '../components/ApplyPopUp.jsx'
import {getJobPostById} from "../api-service/getJobPostById.js";

const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    if (Number.isNaN(date.getTime())) return dateString
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })
}

const JobPost = () => {
    const [jobPost, setJobPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const {postId} = useParams()
    const {token} = useAuthContext()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (postId) {
            const fetchJobPostById = async (id) => {
                try {
                    setLoading(true)
                    const data = await getJobPostById(id, token);
                    setJobPost(data);
                } catch (err) {
                    console.log(err)
                } finally {
                    setLoading(false)
                }
            }
            fetchJobPostById(postId);
        }
    }, [postId, token])

    if (loading) {
        return (
            <div className="flex min-h-[60vh] w-full items-center justify-center bg-gray-50 dark:bg-slate-950">
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Loading job details…</p>
            </div>
        )
    }

    if (!jobPost) {
        return (
            <div className="flex min-h-[60vh] w-full items-center justify-center bg-gray-50 dark:bg-slate-950">
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Job post not found.</p>
            </div>
        )
    }

    const {
        companyLogoUrl,
        companyName,
        companyUrl,
        createdAt,
        isExpire,
        location,
        postDesc,
        postId: jobId,
        postProfile,
        postTechStack = [],
        profilePictureUrl,
        reqExperience,
    } = jobPost

    return (
        <div className="min-h-full w-full bg-gray-50 px-4 py-6 dark:bg-slate-950 sm:px-6 sm:py-8 lg:px-8">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
                {/* Main content */}
                <div
                    className="min-w-0 flex-1 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-lg shadow-gray-200/60 dark:border-zinc-700 dark:bg-slate-900 dark:shadow-black/30">
                    {/* Header */}
                    <div className="bg-linear-to-r from-green-600 to-green-700 px-5 py-6 text-white sm:px-8 sm:py-8">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div className="min-w-0 flex-1">
                                <div className="mb-3 flex flex-wrap items-center gap-2">
                                    <span
                                        className="rounded-full bg-white/20 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
                                        Job #{jobId}
                                    </span>
                                    {isExpire && (
                                        <span
                                            className="rounded-full bg-red-500/90 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider">
                                            Expired
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                                    {postProfile}
                                </h1>
                                <div
                                    className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-green-100">
                                    {location && (
                                        <span className="inline-flex items-center gap-1.5">
                                            <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor"
                                                 strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M12 21c-4.418 0-8-4.03-8-9 0-4.418 3.582-8 8-8s8 3.582 8 8c0 4.97-3.582 9-8 9z"/>
                                                <circle cx="12" cy="12" r="3"/>
                                            </svg>
                                            {location}
                                        </span>
                                    )}
                                    {createdAt && (
                                        <span className="inline-flex items-center gap-1.5">
                                            <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor"
                                                 strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                                                <rect x="3" y="4" width="18" height="18" rx="2"/>
                                                <path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18"/>
                                            </svg>
                                            Posted {formatDate(createdAt)}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {reqExperience != null && (
                                <span
                                    className="inline-flex w-fit shrink-0 items-center rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur-md">
                                    {reqExperience} {reqExperience === 1 ? 'year' : 'years'} experience
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Body */}
                    <div className="flex flex-col gap-8 p-5 sm:p-8">
                        {/* Company */}
                        {(companyName || companyLogoUrl) && (
                            <section
                                className="flex flex-col gap-4 rounded-xl border border-zinc-100 bg-zinc-50/80 p-4 dark:border-zinc-700 dark:bg-slate-800/50 sm:flex-row sm:items-center sm:gap-5 sm:p-5">
                                <div
                                    className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-zinc-200 bg-white p-2 dark:border-zinc-600 dark:bg-slate-800">
                                    {companyLogoUrl ? (
                                        <img
                                            className="h-full w-full object-contain"
                                            src={companyLogoUrl}
                                            alt={`${companyName || 'Company'} logo`}
                                        />
                                    ) : (
                                        <span className="text-xl font-bold text-green-700 dark:text-green-400">
                                            {companyName?.charAt(0) || '?'}
                                        </span>
                                    )}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                        Company
                                    </p>
                                    <p className="mt-0.5 text-lg font-bold text-zinc-900 dark:text-neutral-100">
                                        {companyName}
                                    </p>
                                    {companyUrl && (
                                        <a
                                            href={companyUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                        >
                                            View company careers
                                            <span aria-hidden="true">↗</span>
                                        </a>
                                    )}
                                </div>
                            </section>
                        )}

                        {/* Description */}
                        <section>
                            <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-zinc-900 dark:text-neutral-100">
                                <span className="h-6 w-1 rounded-full bg-blue-500"/>
                                Job Description
                            </h2>
                            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-[1.05rem]">
                                {postDesc}
                            </p>
                        </section>

                        {/* Tech stack */}
                        {postTechStack.length > 0 && (
                            <section>
                                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-zinc-900 dark:text-neutral-100">
                                    <span className="h-6 w-1 rounded-full bg-blue-500"/>
                                    Required Skills
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {postTechStack.map((skill, index) => (
                                        <span
                                            key={`${skill}-${index}`}
                                            className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700 transition-colors dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-300 sm:px-4"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Apply CTA — mobile / tablet */}
                        <div className="border-t border-zinc-100 pt-6 dark:border-zinc-700 lg:hidden">
                            {isExpire ? (
                                <p className="text-center text-sm font-medium text-red-600 dark:text-red-400">
                                    This job posting has expired and is no longer accepting applications.
                                </p>
                            ) : (
                                <button
                                    onClick={() => setOpen(true)}
                                    className="mx-auto flex w-full max-w-sm items-center justify-center rounded-xl bg-blue-600 py-3 px-8 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5 hover:bg-blue-700 dark:shadow-md sm:text-base"
                                >
                                    Apply Now
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="flex w-full shrink-0 flex-col gap-4 lg:w-72 xl:w-80">
                    {/* Recruiter / poster */}
                    {profilePictureUrl && (
                        <div
                            className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-slate-900">
                            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                Posted by
                            </p>
                            <div className="mt-3 flex items-center gap-3">
                                <img
                                    className="h-12 w-12 rounded-full border-2 border-zinc-200 object-cover dark:border-zinc-600"
                                    src={profilePictureUrl}
                                    alt="Recruiter profile"
                                />
                                <div>
                                    <p className="text-sm font-semibold text-zinc-900 dark:text-neutral-100">
                                        Hiring Manager
                                    </p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{companyName}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Quick info */}
                    <div
                        className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-slate-900">
                        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Job Overview
                        </p>
                        <dl className="flex flex-col gap-3 text-sm">
                            <div className="flex justify-between gap-2">
                                <dt className="text-zinc-500 dark:text-zinc-400">Job ID</dt>
                                <dd className="font-semibold text-zinc-900 dark:text-neutral-100">#{jobId}</dd>
                            </div>
                            {location && (
                                <div className="flex justify-between gap-2">
                                    <dt className="text-zinc-500 dark:text-zinc-400">Location</dt>
                                    <dd className="font-semibold text-zinc-900 dark:text-neutral-100">{location}</dd>
                                </div>
                            )}
                            {reqExperience != null && (
                                <div className="flex justify-between gap-2">
                                    <dt className="text-zinc-500 dark:text-zinc-400">Experience</dt>
                                    <dd className="font-semibold text-zinc-900 dark:text-neutral-100">
                                        {reqExperience} {reqExperience === 1 ? 'year' : 'years'}
                                    </dd>
                                </div>
                            )}
                            {createdAt && (
                                <div className="flex justify-between gap-2">
                                    <dt className="text-zinc-500 dark:text-zinc-400">Posted</dt>
                                    <dd className="text-right font-semibold text-zinc-900 dark:text-neutral-100">
                                        {formatDate(createdAt)}
                                    </dd>
                                </div>
                            )}
                            <div className="flex justify-between gap-2">
                                <dt className="text-zinc-500 dark:text-zinc-400">Status</dt>
                                <dd
                                    className={`font-semibold ${isExpire ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}
                                >
                                    {isExpire ? 'Expired' : 'Active'}
                                </dd>
                            </div>
                        </dl>
                    </div>

                    {/* Apply — desktop sidebar */}
                    <div
                        className="hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-slate-900 lg:block">
                        {isExpire ? (
                            <p className="text-center text-sm font-medium text-red-600 dark:text-red-400">
                                This posting has expired.
                            </p>
                        ) : (
                            <button
                                onClick={() => setOpen(true)}
                                className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-3 px-6 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5 hover:bg-blue-700 dark:shadow-md"
                            >
                                Apply Now
                            </button>
                        )}
                    </div>
                </aside>
            </div>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl dark:bg-slate-900">
                        <ApplyPopUp jobId={postId} setOpen={setOpen}/>
                    </div>
                </div>
            )}
        </div>
    )
}

export default JobPost
