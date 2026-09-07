export default function TabelDaftar({ daftarItem, onUbahStok, onHapus }) {
  return (
    <div className="w-full md:w-2/3 bg-white p-5 shadow-md rounded-xl overflow-x-auto">
      <span className="text-base text-gray-800 font-bold border-b pb-2 border-gray-100 block">
        📋 Daftar Produk Aktif
      </span>
      
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
                  <button onClick={() => onUbahStok(item.id, -1)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-md cursor-pointer transition-colors font-bold">-</button>
                  <span className="min-w-12 text-center text-blue-600 font-mono">{item.stok.toLocaleString('id-ID')} Pcs</span>
                  <button onClick={() => onUbahStok(item.id, 1)} className="bg-slate-800 hover:bg-slate-900 text-gray-200 px-2.5 py-0.5 rounded-md cursor-pointer transition-colors font-bold">+</button>
                </div>
              </td>
              <td className="py-3 text-center">
                <button onClick={() => onHapus(item.id)} className="text-red-500 hover:text-red-700 font-bold cursor-pointer text-base p-1">❌</button>
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
  );
}
