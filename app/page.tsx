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
              <li
                key={artist.id}
                className="cursor-pointer hover:text-black transition-colors flex items-center"
              >
                <span className="mr-3 text-gray-400">・</span>
                <Link href={`/artist/${artist.id}`} className="hover:underline">
                  {artist.name}
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </main>
  );
}
