/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Database, RotateCw, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import localDB from '../services/localDB';
import { SyncLog } from '../types';

export default function OfflineWidget() {
  const [isOnline, setIsOnline] = useState(localDB.isOnlineSimulated());
  const [logs, setLogs] = useState<SyncLog[]>(localDB.getLogs());
  const [metrics, setStorageMetrics] = useState(localDB.getStorageMetrics());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setLogs(localDB.getLogs());
      setStorageMetrics(localDB.getStorageMetrics());
    };

    window.addEventListener('toamerica-db-update', handleUpdate);
    // Poll logs every 2 seconds to make sure any asynchronous changes get caught
    const interval = setInterval(handleUpdate, 2000);

    return () => {
      window.removeEventListener('toamerica-db-update', handleUpdate);
      clearInterval(interval);
    };
  }, []);

  const handleToggle = () => {
    const newStatus = !isOnline;
    localDB.setOnlineSimulated(newStatus);
    setIsOnline(newStatus);
  };

  const handleClearLogs = () => {
    localDB.clearLogs();
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 font-sans" dir="rtl">
      {/* Small pill button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg border text-xs font-semibold transition-all duration-300 ${
            isOnline
              ? 'bg-zinc-900 border-zinc-850 text-zinc-100 hover:bg-zinc-800'
              : 'bg-rose-600 border-rose-500 text-white hover:bg-rose-700'
          }`}
          id="offline-widget-toggle"
        >
          {isOnline ? (
            <Wifi className="w-4 h-4 text-emerald-400 animate-pulse" />
          ) : (
            <WifiOff className="w-4 h-4 text-white animate-bounce" />
          )}
          <span>{isOnline ? 'وضعیت: متصل (آنلاین)' : 'وضعیت: آفلاین (محلی)'}</span>
          <ChevronUp className="w-3.5 h-3.5 opacity-60" />
        </button>
      )}

      {/* Expanded control panel */}
      {isOpen && (
        <div className="w-80 md:w-96 bg-white border border-zinc-250 backdrop-blur-md rounded-2xl p-4 shadow-xl transition-all duration-300 transform scale-100">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-600" />
              <h4 className="text-zinc-900 text-xs md:text-sm font-extrabold">تست پایداری و همگام‌ساز آفلاین</h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-zinc-400 hover:text-zinc-750 hover:bg-zinc-50 transition-colors"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Toggle connectivity switch */}
          <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-3 mb-3 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] text-zinc-700 font-bold">سوییچ وضعیت شبکه</span>
              <span className="text-[10px] text-zinc-400 mt-0.5 font-semibold">شبیه‌سازی سناریوی قطع کامل اینترنت</span>
            </div>
            <button
              onClick={handleToggle}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 ${
                isOnline
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-250 hover:bg-emerald-100'
                  : 'bg-rose-50 text-rose-700 border border-rose-250 hover:bg-rose-100'
              }`}
            >
              {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
              <span>{isOnline ? 'آنلاین' : 'آفلاین'}</span>
            </button>
          </div>

          {/* Cache/Quota stats */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-zinc-50 border border-zinc-200/50 rounded-xl p-2.5 flex flex-col pt-3">
              <span className="text-[9px] text-zinc-400 font-bold">ذخیره‌سازی لوکال (کش)</span>
              <span className="text-xs font-extrabold text-zinc-800 mt-1 select-all">{metrics.formattedUsed}</span>
            </div>
            <div className="bg-zinc-50 border border-zinc-200/50 rounded-xl p-2.5 flex flex-col justify-between pt-3">
              <span className="text-[9px] text-zinc-400 font-bold font-sans">فهم سهمیه (Quota)</span>
              <div className="w-full bg-zinc-200 rounded-full h-1.5 mt-2 overflow-hidden">
                <div
                  className="bg-amber-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(metrics.percentage, 1.5)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Core logs tracking */}
          <div className="flex items-center justify-between mb-2 pb-1">
            <span className="text-[10px] text-zinc-800 font-bold">آخرین لاگ‌های رویداد دیتابیس لوکال</span>
            {logs.length > 0 && (
              <button
                onClick={handleClearLogs}
                className="flex items-center gap-1 text-[9px] text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                <span>پاکسازی لاگ‌ها</span>
              </button>
            )}
          </div>

          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-2.5 h-44 overflow-y-auto custom-scrollbar select-none text-[11px]">
            {logs.length === 0 ? (
              <div className="h-full flex items-center justify-center text-zinc-400 text-xs font-semibold">
                هیچ رویدادی ضبط نشده است.
              </div>
            ) : (
              <div className="space-y-2">
                {logs.map((log) => (
                  <div key={log.id} className="border-b border-zinc-200/40 pb-1.5 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between gap-1 text-zinc-400 mb-0.5">
                      <span className="font-mono text-[9px]">{log.timestamp}</span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${
                          log.status === 'synced'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                            : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                        }`}
                      >
                        {log.status === 'synced' ? 'سینک‌شده' : 'در صف'}
                      </span>
                    </div>
                    <p className="text-zinc-700 leading-relaxed font-sans">{log.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="text-[9px] text-zinc-400 mt-2.5 text-center leading-relaxed font-semibold">
            تغییر وضعیت شبکه روی ذخیره‌ساز، تیکتینگ و فرم مشاوره تأثیر آنی می‌گذارد.
          </div>
        </div>
      )}
    </div>
  );
}
