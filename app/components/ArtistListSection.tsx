"use client";

import { useState } from "react";
import Link from "next/link";

export default function ArtistListSection({
  initialArtists,
}: {
  initialArtists: any[];
}) {
  const [artists, setArtists] = useState(initialArtists);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    try {
      // 空なら全表示、文字があれば部分一致（後ほどAPI側も修正しましょう）
      const url = searchQuery.trim()
        ? `https://music-xlgv.onrender.com/artists?name=${encodeURIComponent(
            searchQuery
          )}`
        : `https://music-xlgv.onrender.com/artists`;

      const res = await fetch(url);
      const data = await res.json();
      setArtists(data);
    } catch (error) {
      console.error("検索エラー:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full max-w-sm">
      {/* 検索フォーム */}
      <form onSubmit={handleSearch} className="relative mb-10">
        <input
          type="text"
          placeholder="アーティスト名・曲名..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border-b-2 border-gray-200 py-2 px-1 focus:outline-none focus:border-black transition-colors"
        />
        <button
          type="submit"
          className={`w-full mt-4 py-3 rounded-lg font-bold transition-all active:scale-95 ${
            isSearching
              ? "bg-gray-400"
              : "bg-slate-900 text-white hover:bg-black"
          }`}
        >
          {isSearching ? "検索中..." : "検索する"}
        </button>
      </form>

      {/* アーティスト一覧 */}
      <h2 className="text-xs text-gray-500 mb-4 border-b border-gray-200 pb-2 tracking-widest uppercase">
        登録アーティスト一覧
      </h2>

      <ul className="space-y-4 text-gray-700">
        {artists.length === 0 ? (
          <li className="text-center py-10">
            <p className="text-gray-400 text-sm mb-2">
              {searchQuery
                ? `「${searchQuery}」は見つかりませんでした`
                : "まだ登録されていません"}
            </p>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setArtists(initialArtists);
                }}
                className="text-blue-500 text-xs underline"
              >
                一覧に戻る
              </button>
            )}
          </li>
        ) : (
          artists.map((artist: any) => (
            <Link
              href={`/artist/${artist.id}`}
              key={artist.id}
              className="block"
            >
              <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm transition-all duration-200 active:scale-95 active:bg-gray-100 hover:shadow-md">
                <span className="font-medium text-gray-800">{artist.name}</span>
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
  );
}
