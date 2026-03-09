"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    // Supabaseの機能を使ってログイン判定！
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert("ログイン失敗：メールアドレスかパスワードが違います");
    } else {
      alert("ログイン成功！管理画面に移動します");
      router.push("/admin"); // 成功したら管理画面へ自動で移動！
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 flex flex-col items-center py-20 px-6">
      <div className="w-full max-w-sm bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-xl font-bold mb-8 text-center tracking-widest border-b-2 border-gray-900 pb-2">
          🔑 配信者ログイン
        </h1>

        <div className="flex flex-col space-y-5">
          <input
            type="email"
            placeholder="メールアドレス"
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="パスワード"
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()} // Enterキーでもログインできます
          />
          <button
            onClick={handleLogin}
            className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-lg hover:bg-gray-700 transition-colors shadow-md mt-4"
          >
            ログインする
          </button>
        </div>
      </div>
    </main>
  );
}
