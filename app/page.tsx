import ArtistListSection from "./components/ArtistListSection";

async function getArtists() {
  const res = await fetch("https://music-xlgv.onrender.com/artists", {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
  const initialArtists = await getArtists();

  return (
    <main className="min-h-screen bg-white text-gray-900 flex flex-col items-center py-12 px-6">
      {/* 配信者情報エリア */}
      <div className="flex flex-col items-center mb-10">
        <div className="w-24 h-24 bg-gray-100 rounded-full mb-4 flex items-center justify-center overflow-hidden border border-gray-300 shadow-sm">
          <img
            src="/test.jpeg"
            alt="配信者アイコン"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-xl font-bold tracking-widest">〇〇のMUSIC Room</h1>
      </div>

      {/* 検索とリストをまとめた動的セクション */}
      <ArtistListSection initialArtists={initialArtists} />
    </main>
  );
}
