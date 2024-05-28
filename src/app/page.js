import {
    FaUser,
    FaChild,
    FaHeartbeat,
    FaSmile,
    FaFrown,
    FaBalanceScale,
} from "react-icons/fa";

export default function Home() {
    return (
        <div className="p-4 md:p-10">
            <h1 className="text-2xl md:text-4xl font-bold mb-4">
                Selamat datang di e-Posyandu
            </h1>
            <p className="mb-10 text-gray-700">
                e-Posyandu adalah platform digital untuk memantau kesehatan anak
                dan orang tua. Kami menyediakan data real-time dan laporan
                kesehatan yang dapat diakses kapan saja dan di mana saja.
            </p>

            <div className="flex flex-wrap gap-4">
                <div className="stat flex-1 min-w-[250px] bg-white shadow-md p-4 rounded-lg">
                    <div className="stat-figure text-primary">
                        <FaUser className="inline-block w-8 h-8" />
                    </div>
                    <div className="stat-title">Jumlah Orang Tua</div>
                    <div className="stat-value text-primary">1,234</div>
                    <div className="stat-desc">Data terbaru</div>
                </div>

                <div className="stat flex-1 min-w-[250px] bg-white shadow-md p-4 rounded-lg">
                    <div className="stat-figure text-secondary">
                        <FaChild className="inline-block w-8 h-8" />
                    </div>
                    <div className="stat-title">Jumlah Anak</div>
                    <div className="stat-value text-secondary">4,567</div>
                    <div className="stat-desc">Data terbaru</div>
                </div>

                <div className="stat flex-1 min-w-[250px] bg-white shadow-md p-4 rounded-lg">
                    <div className="stat-figure text-secondary">
                        <FaHeartbeat className="inline-block w-8 h-8" />
                    </div>
                    <div className="stat-title">Jumlah Pemeriksaan</div>
                    <div className="stat-value text-secondary">789</div>
                    <div className="stat-desc">Data terbaru</div>
                </div>

                <div className="stat flex-1 min-w-[250px] bg-white shadow-md p-4 rounded-lg">
                    <div className="stat-figure text-success">
                        <FaSmile className="inline-block w-8 h-8" />
                    </div>
                    <div className="stat-title">Jumlah Anak Sehat</div>
                    <div className="stat-value text-success">3,890</div>
                    <div className="stat-desc">Data terbaru</div>
                </div>

                <div className="stat flex-1 min-w-[250px] bg-white shadow-md p-4 rounded-lg">
                    <div className="stat-figure text-warning">
                        <FaBalanceScale className="inline-block w-8 h-8" />
                    </div>
                    <div className="stat-title">Jumlah Anak Stunting</div>
                    <div className="stat-value text-warning">123</div>
                    <div className="stat-desc">Data terbaru</div>
                </div>

                <div className="stat flex-1 min-w-[250px] bg-white shadow-md p-4 rounded-lg">
                    <div className="stat-figure text-error">
                        <FaFrown className="inline-block w-8 h-8" />
                    </div>
                    <div className="stat-title">Jumlah Anak Kurang Gizi</div>
                    <div className="stat-value text-error">45</div>
                    <div className="stat-desc">Data terbaru</div>
                </div>
            </div>
        </div>
    );
}
