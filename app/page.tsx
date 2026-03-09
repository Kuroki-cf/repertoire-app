import Link from "next/link";
import SearchBar from "./components/SearchBar"; // ← ① 新しく作ったパーツを読み込む

async function getArtists() {
  const res = await fetch("https://music-xlgv.onrender.com/artists", {
    cache: "no-store",
  });
  if (!res.ok) {
    return [];
  }
  return res.json();
}

export default async function Home() {
  const artists = await getArtists();

  return (
    <main className="min-h-screen bg-white text-gray-900 flex flex-col items-center py-12 px-6">
      {/* 配信者情報エリア */}
      <div className="flex flex-col items-center mb-10">
        <div className="w-24 h-24 bg-gray-100 rounded-full mb-4 flex items-center justify-center overflow-hidden border border-gray-300 shadow-sm">
          {/* 👇 画像を表示するように変更！（※ファイル名が .png の場合は書き換えてください） */}
          <img
            src="/test.jpeg"
            alt="配信者アイコン"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 👇 タイトルを変更！お好きな名前に書き換えてください */}
        <h1 className="text-xl font-bold tracking-widest">〇〇のMUSIC Room</h1>
      </div>

      {/* 👇 ② 検索エリアを、先ほど作った動くコンポーネントに差し替え！ */}
      <SearchBar />

      {/* 登録アーティスト一覧エリア */}
      <div className="w-full max-w-sm">
        <h2 className="text-xs text-gray-500 mb-4 border-b border-gray-200 pb-2 tracking-widest uppercase">
          登録アーティスト一覧
        </h2>

        <ul className="space-y-4 text-gray-700">
          {artists.length === 0 ? (
            <li className="text-gray-400 text-sm">
              まだ登録されたアーティストはいません
            </li>
          ) : (
            artists.map((artist: any) => (
              <Link
                href={`/artist/${artist.id}`}
                key={artist.id}
                className="block"
              >
                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm transition-all duration-200 active:scale-95 active:bg-gray-100 hover:shadow-md">
                  <span className="font-medium text-gray-800">
                    {artist.name}
                  </span>

                  {/* 右矢印（＞）のアイコン */}
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))
          )}
        </ul>
      </div>
    </main>
  );
}
