import { useState } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { NewEntry } from '@/components/NewEntry';
import { History } from '@/components/History';

type Tab = 'novo' | 'historico';

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>('novo');

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto">
        {activeTab === 'novo' ? <NewEntry /> : <History />}
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
