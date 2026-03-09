"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient"; // ← 鍵の確認ツールを追加

export default function AdminPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // 画面のチラつき防止用

  const [artistName, setArtistName] = useState("");
  const [artists, setArtists] = useState<any[]>([]);
  const [selectedArtistId, setSelectedArtistId] = useState("");
  const [songTitle, setSongTitle] = useState("");

  // 画面が開いたときに「見張り番」がチェックする処理
  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      // ① まず、ログインしているか（セッションがあるか）確認！
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        // ログインしていなかったら、ログイン画面に強制送還！
        alert("このページにアクセスするにはログインが必要です。");
        router.push("/login");
        return;
      }

      // ② ログインしていれば、アーティスト一覧を取得して画面を表示
      const res = await fetch("https://music-xlgv.onrender.com/artists");
      if (res.ok) {
        const data = await res.json();
        setArtists(data);
        if (data.length > 0) {
          setSelectedArtistId(data[0].id);
        }
      }
      setIsLoading(false); // 確認が終わったら画面を表示
    };

    checkAuthAndFetchData();
  }, [router]);

  // アーティスト登録処理
  const handleAddArtist = async () => {
    if (!artistName) return;
    const res = await fetch(
      `https://music-xlgv.onrender.com/artists?name=${encodeURIComponent(
        artistName
      )}`,
      { method: "POST" }
    );
    if (res.ok) {
      alert(`${artistName} を新しく登録しました！`);
      setArtistName("");
      window.location.reload();
    }
  };

  // 楽曲登録処理
  const handleAddSong = async () => {
    if (!selectedArtistId || !songTitle) return;
    const res = await fetch(
      `https://music-xlgv.onrender.com/artists/${selectedArtistId}/songs?title=${encodeURIComponent(
        songTitle
      )}`,
      { method: "POST" }
    );
    if (res.ok) {
      alert(`楽曲「${songTitle}」を追加しました！`);
      setSongTitle("");
    }
  };

  // ログアウト処理（追加！）
  const handleLogout = async () => {
    await supabase.auth.signOut();
    alert("ログアウトしました。");
    router.push("/");
  };

  // 確認中は「読み込み中...」だけ表示して、中身を見せない
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        読み込み中...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white text-gray-900 flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-sm mb-8 flex justify-between items-center">
        <Link
          href="/"
          className="text-gray-500 hover:text-black transition-colors flex items-center text-sm"
        >
          <span className="mr-2">←</span> トップに戻る
        </Link>
        {/* 👇 ログアウトボタンを追加！ */}
        <button
          onClick={handleLogout}
          className="text-red-500 hover:text-red-700 text-sm font-bold"
        >
          ログアウト
        </button>
      </div>

      <h1 className="text-2xl font-bold tracking-widest border-b-2 border-gray-900 pb-2 mb-8 text-center w-full max-w-sm">
        管理画面（データ登録）
      </h1>

      {/* アーティスト登録フォーム */}
      <div className="w-full max-w-sm bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <h2 className="font-bold mb-4 text-lg">👤 新しいアーティストの登録</h2>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="アーティスト名を入力..."
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />
          <button
            onClick={handleAddArtist}
            className="w-full bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-gray-700 transition-colors shadow-md"
          >
            登録する
          </button>
        </div>
      </div>

      {/* 楽曲登録フォーム */}
      <div className="w-full max-w-sm bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <h2 className="font-bold mb-4 text-lg">🎵 楽曲の登録</h2>
        <div className="flex flex-col space-y-4">
          <select
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 bg-white"
            value={selectedArtistId}
            onChange={(e) => setSelectedArtistId(e.target.value)}
          >
            {artists.map((artist) => (
              <option key={artist.id} value={artist.id}>
                {artist.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="曲名を入力..."
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
            value={songTitle}
            onChange={(e) => setSongTitle(e.target.value)}
          />
          <button
            onClick={handleAddSong}
            className="w-full bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-gray-700 transition-colors shadow-md"
          >
            曲を登録する
          </button>
        </div>
      </div>
    </main>
  );
}
