import { useState, useEffect } from "react"

import StatsCard from "./components/StatsCard";
import FormInput from "./components/FormInput";
import TabelDaftar from "./components/TabelDaftar";

export default function App() {
  const [inputProduk, setInputProduk] = useState('');
  const [inputStok, setInputStok] = useState('');
  const [inputHarga, setInputHarga] = useState('');
  const [daftarItem, setDafatarItem] = useState([]);
  const [dataKurs, setDataKurs] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://exchangerate-api.com")
      .then((respons) => {
        if (!respons.ok) throw new Error("Respon server bermasalah");
        return respons.json();
      })
      .then((data) => {
        if (data && data.rates) setDataKurs(data.rates);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Sistem CORS Aktif, Mengaktifkan Data Cadangan:", error);
        setDataKurs({ IDR: 15650, SGD: 1.34 }); 
        setLoading(false);
      });
  }, []);

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
      return item;
    });
    setDafatarItem(daftarTerbaru);
  }

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
        
        {/* KARTU STATUS BARU */}
        <StatsCard 
          totalNilaiAset={totalNilaiAset} 
          totalKuantitasItem={totalKuantitasItem} 
          jumlahMenu={daftarItem.length} 
        />

        {/* LAYOUT GRID UTAMA */}
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          
          {/* PANGGIL PANEL FORM INPUT BARU */}
          <FormInput 
            inputProduk={inputProduk} setInputProduk={setInputProduk}
            inputStok={inputStok} setInputStok={setInputStok}
            inputHarga={inputHarga} setInputHarga={setInputHarga}
            onDaftar={daftarkanBarang}
          />

          {/* PANEL TABEL PRODUK */}
          
          <TabelDaftar
           daftarItem={daftarItem}
           onUbahStok={ubahStok}
           onHapus={hapusDaftar}
          />
        
        </div>
      </div>
    </div>
  )
}
