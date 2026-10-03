import React, { useState } from 'react';
import { Download, ShieldCheck, CheckCircle2, LogOut, UploadCloud, ExternalLink, Sparkles, AlertTriangle, ArrowRight, FileCheck, HelpCircle, X } from 'lucide-react';
import { DownloadAnimationModal } from './DownloadAnimationModal';

interface ResultViewProps {
  score: number;
  correctCount: number;
  incorrectCount: number;
  kkm: number;
  studentName: string;
  noPeserta: string;
  driveUploadUrl?: string;
  onDownloadEncryptedResult: () => void;
  onViewDiscussion?: () => void;
  onRestart: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  studentName,
  noPeserta,
  driveUploadUrl,
  onDownloadEncryptedResult,
  onRestart,
}) => {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [hasClickedDrive, setHasClickedDrive] = useState(false);
  const [showExitWarningModal, setShowExitWarningModal] = useState(false);

  const cleanName = studentName.replace(/[^a-zA-Z0-9]/g, '_');
  const resultFileName = `HASIL_CBT_${noPeserta}_${cleanName}.cbt`;

  const handleDownloadCompleted = () => {
    setHasDownloaded(true);
    onDownloadEncryptedResult();
  };

  const handleAttemptExit = () => {
    if (!hasDownloaded) {
      setShowExitWarningModal(true);
    } else {
      onRestart();
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-slate-900/95 fixed inset-0 z-40 overflow-y-auto p-3 sm:p-6 select-none">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in p-5 sm:p-8 text-center relative border-4 border-indigo-500/30 my-auto space-y-5">
        {/* Decorative Floating Ambient Backgrounds */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-emerald-100 rounded-br-full -z-10 opacity-60 blur-xl"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-indigo-100 rounded-tl-full -z-10 opacity-60 blur-xl"></div>

        {/* Animated Priority Warning Ribbon */}
        <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-amber-600 to-indigo-600 p-[2px] rounded-2xl shadow-lg">
          <div className="bg-slate-950 px-4 py-3 rounded-[14px] flex items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-600/20 border border-red-500 flex items-center justify-center shrink-0 animate-bounce">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider animate-pulse">
                    WAJIB DIKERJAKAN
                  </span>
                  <span className="text-[11px] font-bold text-amber-400">
                    2 Langkah Pasca Ujian
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-extrabold text-white mt-0.5 leading-snug">
                  Wajib Unduh (.cbt) &amp; Unggah ke Google Drive!
                </h4>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Stempel Digital
            </div>
          </div>
        </div>

        {/* Student Profile Info */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-black border border-emerald-300 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Pengerjaan Soal Selesai &amp; Terkunci</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Selamat, {studentName}!
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm font-medium">
            Nomor Peserta: <span className="font-bold text-slate-800 font-mono">{noPeserta}</span>
          </p>
        </div>

        {/* 2-Step Action Cards Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left pt-1">
          {/* STEP 1: Download .CBT File */}
          <div className={`p-4 rounded-2xl border-2 transition-all relative overflow-hidden flex flex-col justify-between ${
            hasDownloaded
              ? 'bg-emerald-50/80 border-emerald-500 shadow-xs'
              : 'bg-gradient-to-b from-slate-900 to-slate-950 text-white border-emerald-400/80 shadow-md shadow-emerald-950/20'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                  hasDownloaded
                    ? 'bg-emerald-200 text-emerald-900 border-emerald-400'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}>
                  LANGKAH 1
                </span>
                {hasDownloaded ? (
                  <span className="flex items-center gap-1 text-[11px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Diunduh
                  </span>
                ) : (
                  <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></span>
                )}
              </div>

              <h4 className={`text-sm font-black flex items-center gap-1.5 ${hasDownloaded ? 'text-emerald-950' : 'text-white'}`}>
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Unduh File (.cbt)</span>
              </h4>
              <p className={`text-[11px] leading-relaxed mt-1 mb-3 ${hasDownloaded ? 'text-emerald-800' : 'text-slate-300'}`}>
                Unduh berkas jawaban terenkripsi untuk bukti resmi pengerjaan ujian Anda.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsDownloadModalOpen(true)}
              className={`w-full py-3 px-4 rounded-xl font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
                hasDownloaded
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black shadow-lg shadow-emerald-500/40 animate-pulse'
              }`}
            >
              <Download className="w-4 h-4 shrink-0" />
              <span>{hasDownloaded ? 'Unduh Ulang (.cbt)' : 'UNDUH SEKARANG'}</span>
              {!hasDownloaded && <Sparkles className="w-3.5 h-3.5 text-slate-950" />}
            </button>
          </div>

          {/* STEP 2: Upload to Google Drive */}
          <div className={`p-4 rounded-2xl border-2 transition-all relative overflow-hidden flex flex-col justify-between ${
            hasClickedDrive
              ? 'bg-indigo-50/80 border-indigo-500 shadow-xs'
              : 'bg-gradient-to-b from-slate-900 to-slate-950 text-white border-indigo-400/80 shadow-md shadow-indigo-950/20'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                  hasClickedDrive
                    ? 'bg-indigo-200 text-indigo-900 border-indigo-400'
                    : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                }`}>
                  LANGKAH 2
                </span>
                {hasClickedDrive ? (
                  <span className="flex items-center gap-1 text-[11px] font-black text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> Terbuka
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-indigo-300">Wajib Upload</span>
                )}
              </div>

              <h4 className={`text-sm font-black flex items-center gap-1.5 ${hasClickedDrive ? 'text-indigo-950' : 'text-white'}`}>
                <UploadCloud className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Upload Google Drive</span>
              </h4>
              <p className={`text-[11px] leading-relaxed mt-1 mb-3 ${hasClickedDrive ? 'text-indigo-800' : 'text-slate-300'}`}>
                Unggah file <b>.cbt</b> yang baru Anda unduh ke folder Google Drive Guru / Kelas.
              </p>
            </div>

            {driveUploadUrl ? (
              <a
                href={driveUploadUrl.startsWith('http') ? driveUploadUrl : `https://${driveUploadUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setHasClickedDrive(true)}
                className={`w-full py-3 px-4 rounded-xl font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95 text-center ${
                  hasDownloaded
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30 ring-2 ring-indigo-300 animate-pulse'
                    : 'bg-indigo-700 hover:bg-indigo-600 text-white opacity-90'
                }`}
              >
                <UploadCloud className="w-4 h-4 shrink-0" />
                <span>BUKA GOOGLE DRIVE</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              </a>
            ) : (
              <div className="bg-slate-800/80 border border-slate-700 p-2.5 rounded-xl text-center">
                <p className="text-[10px] text-slate-400">
                  Folder Drive belum diatur. Serahkan file <b>.cbt</b> langsung ke Guru Pengawas.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Status Checklist Tracker */}
        <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-left space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span>Status Verifikasi Siswa:</span>
            <span className={hasDownloaded ? 'text-emerald-700' : 'text-amber-700'}>
              {hasDownloaded ? '✓ Berkas .cbt Telah Diamankan' : '⚠️ Berkas Belum Diunduh'}
            </span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                hasDownloaded && hasClickedDrive
                  ? 'w-full bg-emerald-500'
                  : hasDownloaded
                  ? 'w-1/2 bg-blue-500'
                  : 'w-1/12 bg-amber-500'
              }`}
            />
          </div>
        </div>

        {/* Exit Action Button */}
        <div className="pt-1">
          <button
            type="button"
            onClick={handleAttemptExit}
            className={`w-full min-h-[48px] font-extrabold py-3.5 px-5 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer active:scale-98 ${
              hasDownloaded
                ? 'bg-slate-900 hover:bg-slate-950 active:bg-black text-white'
                : 'bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-black'
            }`}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Keluar dari Aplikasi (Kembali ke Halaman Utama)</span>
          </button>
        </div>

        <p className="text-[11px] text-gray-400 pt-1">
          <span>create: </span>
          <a href="https://lynk.id/ajisosiologi" target="_blank" rel="noopener noreferrer" className="hover:underline font-bold text-blue-600">
            @ajisosiologi
          </a>{' '}
          - Offline Secure Assessment System
        </p>
      </div>

      {/* Download Animation Modal */}
      <DownloadAnimationModal
        isOpen={isDownloadModalOpen}
        title="Mengunduh Hasil Jawaban (.cbt)"
        subtitle="Memproses stempel digital & enkripsi hasil ujian..."
        fileName={resultFileName}
        fileType="cbt"
        onComplete={handleDownloadCompleted}
        onClose={() => setIsDownloadModalOpen(false)}
      />

      {/* Exit Prevention Warning Modal if Not Downloaded */}
      {showExitWarningModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border-4 border-red-500 space-y-5 text-center relative overflow-hidden">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto shadow-inner border border-red-300">
              <AlertTriangle className="w-9 h-9 animate-bounce" />
            </div>

            <div className="space-y-1.5">
              <span className="bg-red-100 text-red-900 font-mono font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                🚨 PERINGATAN PENTING
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Anda Belum Mengunduh File Jawaban (.cbt)!
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Jika Anda keluar sekarang tanpa mengunduh, Anda tidak akan memiliki bukti berkas ujian dan tidak dapat mengunggah ke Google Drive.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowExitWarningModal(false)}
                className="w-full sm:w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-4 py-3 rounded-2xl text-xs transition cursor-pointer"
              >
                Batal &amp; Kembali
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowExitWarningModal(false);
                  setIsDownloadModalOpen(true);
                }}
                className="w-full sm:w-1/2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-black px-4 py-3 rounded-2xl text-xs transition shadow-lg active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4" /> UNDUH FILE (.cbt)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


