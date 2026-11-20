import React from 'react';
import { Header } from '../../components/layout';
import { ImagePicker, SamplePickerRail } from '../../features/image-picker';
import { ResultsCard } from '../../features/prediction';
import { HistoryList } from '../../features/history';
import { useDashboard } from '../../hooks';
import { DashboardTabs } from './components';

const Dashboard = () => {
  const { state, actions } = useDashboard();
  const {
    selectedImage,
    imageFile,
    activeSample,
    predictionResult,
    loading,
    error,
    activeTab,
    historyRefreshKey,
    userUpdateKey,
    hasScans,
  } = state;

  const {
    setSelectedImage,
    setImageFile,
    setActiveSample,
    setLoading,
    setError,
    setActiveTab,
    handlePredictionSuccess,
    handleUserUpdated,
    handleSelectSample,
  } = actions;

  return (
    <div key={userUpdateKey} className="flex flex-col h-screen bg-white dark:bg-[#121212] text-neutral-900 dark:text-neutral-100 overflow-hidden lg:h-screen max-lg:h-auto max-lg:overflow-y-auto">
      <Header onUserUpdated={handleUserUpdated} />
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 w-full m-0 p-0 overflow-hidden max-lg:overflow-visible">
        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex-1 flex flex-col justify-center items-center px-6 py-4 overflow-y-auto">
            <ImagePicker
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              imageFile={imageFile}
              setImageFile={setImageFile}
              setPredictionResult={handlePredictionSuccess}
              activeSample={activeSample}
              setActiveSample={setActiveSample}
              loading={loading}
              setLoading={setLoading}
              setError={setError}
            />
          </div>
          <SamplePickerRail activeSample={activeSample} onSelectSample={handleSelectSample} />
        </div>

        <div className="flex flex-col h-full border-l max-lg:border-l-0 max-lg:border-t border-neutral-200/80 dark:border-neutral-800/80 px-6 py-4 overflow-y-auto">
          <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} hasScans={hasScans} />
          <div className={`h-full flex flex-col ${activeTab === 'analysis' ? 'flex' : 'hidden'}`}>
            <ResultsCard predictionResult={predictionResult} loading={loading} error={error} />
          </div>
          <div className={`h-full flex flex-col ${activeTab === 'history' ? 'flex' : 'hidden'}`}>
            <HistoryList refreshTrigger={historyRefreshKey} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
