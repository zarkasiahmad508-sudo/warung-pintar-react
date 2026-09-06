export default function StatsCard({ totalNilaiAset, totalKuantitasItem, jumlahMenu }) {
  return (
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
        <h1 className="text-2xl font-black text-indigo-700 mt-1">{jumlahMenu} Menu</h1>
      </div>
    </div>
  );
}
