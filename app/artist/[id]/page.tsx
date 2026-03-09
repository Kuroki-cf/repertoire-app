import Link from "next/link";

// 👇 ① paramsの受け取り方を Promise という最新の型に変更します
export default async function ArtistDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 👇 ② await を使って、確実にURLからIDを取り出します（Next.js 15の新ルール）
  const { id } = await params;
  const artistId = id;

  // FastAPIから「アーティスト情報」と「楽曲一覧」を同時に取得
  const artistRes = await fetch(
    `https://music-xlgv.onrender.com/artists/${artistId}`,
    {
      cache: "no-store",
    }
  );
  const songsRes = await fetch(
    `https://music-xlgv.onrender.com/artists/${artistId}/songs`,
    { cache: "no-store" }
  );

  const artist = artistRes.ok ? await artistRes.json() : null;
  const songs = songsRes.ok ? await songsRes.json() : [];

  // もし該当するアーティストがいなければエラーメッセージを表示
  if (!artist) {
    return (
      <div className="text-center mt-20 text-gray-500">
        アーティストが見つかりません
      </div>
    );
  }

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
          {artist.name}
        </h1>
      </div>

      {/* 楽曲リスト */}
      <div className="w-full max-w-sm">
        <h2 className="text-xs text-gray-500 mb-4 border-b border-gray-200 pb-2 tracking-widest uppercase text-center">
          歌える楽曲リスト
        </h2>
        <ul className="space-y-3 text-gray-700">
          {songs.length === 0 ? (
            <li className="text-center text-gray-400 py-4 text-sm">
              まだ楽曲が登録されていません
            </li>
          ) : (
            songs.map((song: any) => (
              <li
                key={song.id}
                className="flex items-center border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white"
              >
                <span className="mr-4 text-gray-300 text-lg">♪</span>
                <span className="font-medium">{song.title}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </main>
  );
}
