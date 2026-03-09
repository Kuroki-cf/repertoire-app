"use client"; // ← これが「ユーザーの入力を受け付けるよ」という合図です

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = async () => {
    if (!query) return; // 空欄なら何もしない

    // FastAPIの検索APIにキーワードを送る
    const res = await fetch(
      `https://music-xlgv.onrender.com/search?q=${query}`
    );
    const data = await res.json();

    if (data.found) {
      // 見つかったら、そのアーティストの画面に移動！
      router.push(`/artist/${data.artist_id}`);
    } else {
      // 見つからなければ、「該当なし」画面に移動！
      router.push("/no-result");
    }
  };

  return (
    <div className="w-full max-w-sm mb-12">
      <div className="relative border-b-2 border-gray-900 pb-2 flex items-center">
        <span className="text-gray-500 mr-2 text-lg">🔍</span>
        <input
          type="text"
          placeholder="アーティスト名・曲名..."
          className="w-full bg-transparent outline-none placeholder-gray-400 text-lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Enterキーでも検索できるようにしました
        />
      </div>
      <button
        onClick={handleSearch}
        className="w-full text-center mt-8 bg-gray-900 text-white font-bold py-3.5 rounded-lg hover:bg-gray-700 transition-colors shadow-md"
      >
        検索する
      </button>
    </div>
  );
}
