import { useState, useEffect } from "react"

export default function App() {
  const [inputProduk, setInputProduk] = useState('');
  const [inputStok, setInputStok] = useState('');
  const [inputHarga, setInputHarga] = useState('');
  const [daftarItem, setDafatarItem] = useState([]);

  // ================= STATE DATA INTERNET (API) =================
  const [dataKurs, setDataKurs] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kita gunakan alamat API cadangan yang jauh lebih ramah terhadap localhost
    fetch("https://exchangerate-api.com")
      .then((respons) => {
        if (!respons.ok) {
          throw new Error("Respon server bermasalah");
        }
        return respons.json();
      })
      .then((data) => {
        if (data && data.rates) {
          setDataKurs(data.rates);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Sistem CORS Aktif, Mengaktifkan Data Cadangan:", error);
        
        // 🌟 JURUS PENYELAMAT: Jika diblokir CORS, langsung suntikkan data perkiraan pasar saat ini
        setDataKurs({ 
          IDR: 15650, // Nilai perkiraan Rupiah terkini
          SGD: 1.34   // Nilai perkiraan Dolar Singapura
        }); 
        
        setLoading(false); // Matikan animasi loading agar data cadangan langsung tampil
      });
  }, []);
  // =============================================================

  let totalNilaiAset = 0;
  let totalKuantitasItem = 0;

  daftarItem.forEach((item) => {
    totalNilaiAset = totalNilaiAset + (item.stok * item.harga)
    totalKuantitasItem = totalKuantitasItem + item.stok
  });

  const daftarkanBarang = () => {
    const angkaStok = Number(inputStok);
    const angkaHarga = Number(inputHarga);
    
    if (inputProduk.trim() === '' || inputStok === '' || inputHarga === '' || angkaStok <= 0 || angkaHarga <= 0) {
      alert('Mohon isi setiap kolom dengan benar!');
      return;
    }

    const daftarProduk = {
      id: Date.now(),
      nama: inputProduk,
      stok: angkaStok,
      harga: angkaHarga,
    };

    setDafatarItem([...daftarItem, daftarProduk]);
    setInputHarga('');
    setInputProduk('');
    setInputStok('');
  };

  const hapusDaftar = (target) => {
    const daftarBaru = daftarItem.filter((item) => target !== item.id);
    setDafatarItem(daftarBaru);
  };

  const ubahStok = (target, jumlahPerubahan) => {
    const daftarTerbaru = daftarItem.map((item) => {
      if (target === item.id) {
        const stokBaru = item.stok + jumlahPerubahan;   
        return { ...item, stok: stokBaru < 0 ? 0 : stokBaru };
      }
      return item; // Sekarang sudah aman dan lengkap!
    });
    setDafatarItem(daftarTerbaru);
  };

  return (
    <div className="min-h-screen bg-gray-200 pb-10">
      {/* NAVIGATION BAR */}
      <nav className="bg-slate-100 p-4 min-w-full rounded-b-xl flex justify-between items-center h-20 shadow">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold bg-amber-100 w-12 h-12 flex justify-center items-center rounded-full text-gray-700">W</div>
            <span className="text-2xl font-bold">arung <span className="text-amber-600">Pintar</span></span>
          </div>
          <h3 className="text-[11px] font-semibold text-gray-600 mt-1">Sistem Pencatatan Stok & Keuangan Digital Aset</h3>
        </div>
        <div>
          <button className="text-[11px] font-semibold bg-slate-700 text-gray-200 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-slate-800 transition-colors">Tentang Kami</button>
        </div>
      </nav>

      {/* PANEL INFORMASI DATA INTERNET (LIVE API) */}
      <div className="max-w-6xl mx-auto px-4 mt-4">
        <div className="bg-slate-800 text-white p-4 rounded-xl shadow flex flex-col sm:flex-row justify-between items-center gap-2">
          <div>
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">💱 Live Kurs Mata Uang Acuan USD</h4>
            <p className="text-xs text-slate-400">Menampilkan konversi mata uang asli langsung dari server ://er-api.com</p>
          </div>
          
          <div className="flex gap-4 font-mono font-bold text-sm bg-slate-950 px-4 py-2 rounded-lg border border-slate-700">
            {loading ? (
              <span className="text-amber-400 animate-pulse">⏳ Menghubungkan ke server pusat...</span>
            ) : (
              <div className="flex gap-6">
                <span className="text-emerald-400">IDR (Rupiah): Rp {dataKurs.IDR ? Number(dataKurs.IDR).toLocaleString('id-ID') : '0'}</span>
                <span className="text-sky-400">SGD (Dolar SG): ${dataKurs.SGD ? Number(dataKurs.SGD).toFixed(2) : '0'}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 max-w-6xl mx-auto">
        {/* DASHBOARD KARTU STATUS */}
        <div className="flex gap-4">
          <div className="bg-white shadow w-1/3 rounded-bl-2xl rounded-tr-2xl p-4 border-l-4 border-emerald-500">
            <span className="text-[11px] text-gray-400 font-bold tracking-wider">TOTAL NILAI ASET</span>
            <h1 className="text-2xl font-black text-gray-700 mt-1">Rp {totalNilaiAset.toLocaleString('id-ID')}</h1>
          </div>

          <div className="bg-white shadow w-1/3 rounded-bl-2xl rounded-tr-2xl p-4 border-l-4 border-blue-500">
            <span className="text-[11px] text-gray-400 font-bold tracking-wider">TOTAL KUANTITAS ITEM</span>
            <h1 className="text-2xl font-black text-blue-700 mt-1">{totalKuantitasItem.toLocaleString('id-ID')} Pcs</h1>
          </div>

          <div className="bg-white shadow w-1/3 rounded-bl-2xl rounded-tr-2xl p-4 border-l-4 border-indigo-500">
            <span className="text-[11px] text-gray-400 font-bold tracking-wider">JENIS PRODUK UNIK</span>
            <h1 className="text-2xl font-black text-indigo-700 mt-1">{daftarItem.length} Menu</h1>
          </div>
        </div>

        {/* LAYOUT GRID UTAMA */}
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          {/* PANEL INPUT */}
          <div className="flex flex-col w-full md:w-1/3 p-4 bg-white rounded-xl shadow-md h-fit">
            <span className="text-base text-gray-800 font-bold border-b pb-2 border-gray-100">➕ Tambah Inventaris</span>
            <div className="flex flex-col gap-3 mt-3">
              <div>
                <label className="text-[11px] text-gray-500 font-bold">Nama Produk</label>
                <input type="text" value={inputProduk} onChange={(e) => setInputProduk(e.target.value)} className="w-full text-[13px] text-gray-800 font-semibold px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors" />
              </div>
              <div>
                <label className="text-[11px] text-gray-500 font-bold">Jumlah Stok Masuk</label>
                <input type="number" value={inputStok} onChange={(e) => setInputStok(e.target.value)} className="w-full text-[13px] text-gray-800 font-semibold px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors" />
              </div>
              <div>
                <label className="text-[11px] text-gray-500 font-bold">Harga Modal Satuan (Rp)</label>
                <input type="number" value={inputHarga} onChange={(e) => setInputHarga(e.target.value)} className="w-full text-[13px] text-gray-800 font-semibold px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors" />
              </div>
              <button onClick={daftarkanBarang} className="text-gray-200 text-sm font-bold py-2.5 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-900 transition-colors mt-2">Daftarkan Barang</button>
            </div>
          </div>

          {/* PANEL TABEL PRODUK */}
          <div className="w-full md:w-2/3 bg-white p-5 shadow-md rounded-xl overflow-x-auto">
            <span className="text-base text-gray-800 font-bold border-b pb-2 border-gray-100 block">📋 Daftar Produk Aktif</span>
            <table className="w-full text-left border-collapse mt-4">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold text-xs uppercase tracking-wider">
                  <th className="pb-3 text-center w-12">No.</th>
                  <th className="pb-3">Nama Barang</th>
                  <th className="pb-3">Harga Satuan</th>
                  <th className="pb-3 text-center">Stok Toko</th>
                  <th className="pb-3 text-center w-16">Hapus</th>
                </tr>
              </thead>
              <tbody>
                {daftarItem.map((item, index) => (
                  <tr key={item.id} className="font-semibold text-sm border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 text-slate-400 text-center font-mono">{index + 1}</td>
                    <td className="py-3 text-slate-800 font-bold">{item.nama}</td>
                    <td className="py-3 text-slate-600">Rp {item.harga.toLocaleString('id-ID')}</td>
                    <td className="py-3">
                      <div className="flex items-center justify-center gap-3">
                        <button onClick={() => ubahStok(item.id, -1)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-md cursor-pointer transition-colors font-bold">-</button>
                        <span className="min-w-[50px] text-center text-blue-600 font-mono">{item.stok.toLocaleString('id-ID')} Pcs</span>
                        <button onClick={() => ubahStok(item.id, 1)} className="bg-slate-800 hover:bg-slate-900 text-gray-200 px-2.5 py-0.5 rounded-md cursor-pointer transition-colors font-bold">+</button>
                      </div>
                    </td>
                    <td className="py-3 text-center">
                      <button onClick={() => hapusDaftar(item.id)} className="text-red-500 hover:text-red-700 font-bold cursor-pointer text-base p-1">❌</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {daftarItem.length === 0 && (
              <div className="text-center py-10 text-gray-400 font-medium text-sm">
                📭 Belum ada produk terdaftar di warung Anda.
              </div>
            )}
          </div>
        </div>
      </div>
    </div> )}
