export default function FormInput({ 
  inputProduk, setInputProduk, 
  inputStok, setInputStok, 
  inputHarga, setInputHarga, 
  onDaftar 
}) {
  return (
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
        <button onClick={onDaftar} className="text-gray-200 text-sm font-bold py-2.5 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-900 transition-colors mt-2">
          Daftarkan Barang
        </button>
      </div>
    </div>
  );
}
