import Link from "next/link";

export default function ArtistPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 flex flex-col items-center py-12 px-6">
      {/* 戻るボタン */}
      <div className="w-full max-w-sm mb-12">
        <Link
          href="/"
          className="text-gray-500 hover:text-black transition-colors flex items-center text-sm w-fit"
        >
          <span className="mr-2">←</span> 戻る
        </Link>
      </div>

      {/* アーティスト名 */}
      <div className="flex flex-col items-center mb-10 w-full max-w-sm">
        <h1 className="text-2xl font-bold tracking-widest border-b-2 border-gray-900 pb-2 px-8 text-center">
          アーティスト A
        </h1>
      </div>

      {/* 楽曲リスト */}
      <div className="w-full max-w-sm">
        <h2 className="text-xs text-gray-500 mb-4 border-b border-gray-200 pb-2 tracking-widest uppercase text-center">
          歌える楽曲リスト
        </h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-center border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white">
            <span className="mr-4 text-gray-300 text-lg">♪</span>
            <span className="font-medium">楽曲タイトル 1</span>
          </li>
          <li className="flex items-center border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white">
            <span className="mr-4 text-gray-300 text-lg">♪</span>
            <span className="font-medium">楽曲タイトル 2</span>
          </li>
          <li className="flex items-center border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white">
            <span className="mr-4 text-gray-300 text-lg">♪</span>
            <span className="font-medium">楽曲タイトル 3</span>
          </li>
        </ul>
      </div>
    </main>
  );
}
