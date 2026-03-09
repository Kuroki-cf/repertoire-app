import Link from "next/link";

export default function NoResultPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 flex flex-col items-center py-20 px-6">
      <div className="text-center max-w-sm w-full mt-10">
        {/* アイコンとメッセージ */}
        <div className="text-6xl mb-6 text-gray-300">😢</div>
        <h1 className="text-2xl font-bold tracking-widest mb-4">
          見つかりませんでした
        </h1>
        <p className="text-gray-500 mb-10 text-sm leading-relaxed">
          お探しのアーティストや楽曲は、
          <br />
          まだレパートリーに登録されていないようです。
        </p>

        {/* トップに戻るボタン */}
        <Link
          href="/"
          className="block w-full text-center bg-gray-900 text-white font-bold py-3.5 rounded-lg hover:bg-gray-700 transition-colors shadow-md"
        >
          トップページに戻る
        </Link>
      </div>
    </main>
  );
}
