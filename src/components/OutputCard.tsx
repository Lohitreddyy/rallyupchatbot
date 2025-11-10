import React from 'react'

type Props = {
  text: string
  loading?: boolean
  error?: string | null
}

const OutputCard: React.FC<Props> = ({ text, loading, error }) => {
  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white dark:bg-neutral-900">
      {loading ? (
        <div className="animate-pulse">Generating your post…</div>
      ) : error ? (
        <div className="text-red-600 dark:text-red-400">{error}</div>
      ) : text ? (
        <div className="whitespace-pre-wrap leading-7">{text}</div>
      ) : (
        <div className="text-neutral-500">Your post will appear here.</div>
      )}
      <div className="mt-3 flex justify-end">
        <button
          className="px-3 py-1.5 rounded-lg text-sm border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          onClick={() => navigator.clipboard.writeText(text || '')}
          disabled={!text}
        >
          Copy
        </button>
      </div>
    </div>
  )
}

export default OutputCard