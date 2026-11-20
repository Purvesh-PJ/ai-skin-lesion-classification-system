import React, { useState, useEffect, useCallback } from 'react';
import { historyService } from '../../../services';
import { Spinner } from '../../ui';
import { HistoryHeader, HistoryItem, HistoryEmptyState } from './components';

export const HistoryList = ({ refreshTrigger }) => {
  const [history, setHistory] = useState(() => historyService.getLocalRecords());
  const [loading, setLoading] = useState(false);

  const fetchHistory = useCallback(async (isManual = false) => {
    if (isManual && history.length === 0) {
      setLoading(true);
    }

    try {
      const records = await historyService.getHistory();
      if (Array.isArray(records)) {
        setHistory(records);
      }
    } catch (err) {
      console.warn('Scan history notice:', err);
    } finally {
      setLoading(false);
    }
  }, [history.length]);

  useEffect(() => {
    setHistory(historyService.getLocalRecords());
    fetchHistory(false);
  }, [fetchHistory, refreshTrigger]);

  const handleDelete = (id, e) => {
    e.stopPropagation();
    setHistory((prev) => prev.filter((item) => item._id !== id));
    historyService.deleteHistoryItem(id).catch((err) => {
      console.warn('Background delete failed:', err);
    });
  };

  const handleClearAll = (e) => {
    if (e) e.stopPropagation();
    if (window.confirm('Are you sure you want to clear all recorded scan history?')) {
      setHistory([]);
      historyService.clearHistory().catch((err) => {
        console.warn('Background clear failed:', err);
      });
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <HistoryHeader
        count={history.length}
        loading={loading}
        onRefresh={() => fetchHistory(true)}
        onClearAll={handleClearAll}
      />

      {loading && history.length === 0 ? (
        <div className="flex justify-center p-6">
          <Spinner size="md" />
        </div>
      ) : history.length === 0 ? (
        <HistoryEmptyState />
      ) : (
        <div className="flex flex-col gap-2 max-h-[480px] overflow-y-auto pr-1">
          {history.map((item) => (
            <HistoryItem
              key={item._id}
              item={item}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryList;
