import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans selection:bg-blue-500/30">
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-500">Nusa<span className="text-white">Bot</span></h1>
        <div className="space-x-6 hidden md:block">
          <Link href="#features" className="hover:text-blue-400 transition">Fitur</Link>
          <Link href="#pricing" className="hover:text-blue-400 transition">Harga</Link>
          <Link href="#tax" className="hover:text-blue-400 transition">Kepatuhan Pajak</Link>
          <Link href="/dashboard" className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-700 transition">
            Mulai Sekarang
          </Link>
        </div>
      </nav>

      <section className="mt-20 text-center px-4">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          Bot Trading Kripto <br /><span className="text-blue-500">Pertama yang Patuh Pajak RI</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-10">
          Optimalkan profit di Indodax dengan algoritma Grid Trading & DCA yang didesain khusus untuk pasar Indonesia.
          Cepat, Aman, dan Transparan.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/dashboard" className="bg-blue-600 px-8 py-4 rounded-xl font-bold hover:scale-105 transition">
            Coba Gratis
          </Link>
          <button className="glass px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-black transition">
            Lihat Demo
          </button>
        </div>
      </section>

      <section className="max-w-5xl mx-auto mt-24 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-2xl">
          <p className="text-gray-400 text-sm">Volume Trading 24j</p>
          <h3 className="text-2xl font-bold text-green-400">Rp 12,4 Miliar+</h3>
        </div>
        <div className="glass p-6 rounded-2xl border border-blue-500/50">
          <p className="text-gray-400 text-sm">Efisiensi Pajak</p>
          <h3 className="text-2xl font-bold text-blue-400">Otomatis PMK 68</h3>
        </div>
        <div className="glass p-6 rounded-2xl">
          <p className="text-gray-400 text-sm">Active Bot</p>
          <h3 className="text-2xl font-bold text-yellow-400">1,240 Running</h3>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-6">Mengapa NusaBot Lebih Unggul dari Kompetitor Global?</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="text-blue-500 mt-1">
                  {/* Icon substitution */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span><strong>Integrasi Langsung Indodax:</strong> Latensi rendah karena server berada di region
                  yang sama.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="text-blue-500 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span><strong>Laporan Pajak Otomatis:</strong> Langsung jadi format DJP, tidak perlu pusing
                  hitung manual.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="text-blue-500 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span><strong>Pembayaran Lokal:</strong> Langganan via QRIS, GoPay, dan VA Bank lokal.</span>
              </li>
            </ul>
          </div>
          <div className="glass p-8 rounded-3xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold">Live Market (BTC/IDR)</span>
              <span className="text-green-400 animate-pulse">● Live</span>
            </div>
            <div className="h-48 flex items-end gap-2">
              <div className="bg-blue-500 w-full h-20 rounded-t"></div>
              <div className="bg-blue-400 w-full h-32 rounded-t"></div>
              <div className="bg-blue-600 w-full h-16 rounded-t"></div>
              <div className="bg-blue-500 w-full h-40 rounded-t"></div>
              <div className="bg-blue-700 w-full h-24 rounded-t"></div>
            </div>
            <p className="mt-4 text-center text-sm text-gray-400 italic">Antarmuka Dashboard yang Intuitif</p>
          </div>
        </div>
      </section>

      <footer className="text-center py-10 border-t border-gray-800 text-gray-500">
        <p>© 2026 robotrading.biz.id - Bagian dari Ekosistem NusaBot Indonesia.</p>
      </footer>
    </div>
  );
}
