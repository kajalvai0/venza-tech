
import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Feature } from '../types';

interface FeatureBarProps {
  features: Feature[];
}

const FeatureBar: React.FC<FeatureBarProps> = ({ features }) => {
  return (
    <div className="container mx-auto px-4 -mt-10 relative z-20">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature) => {
          const IconComponent = (LucideIcons as any)[feature.iconName] || LucideIcons.Info;
          return (
            <div key={feature.id} className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 flex flex-col items-center text-center gap-3 border border-slate-50 transition-transform hover:-translate-y-1">
              <div className="p-3 bg-blue-50 rounded-full">
                <IconComponent className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{feature.title}</h3>
                <p className="text-xs text-slate-500">{feature.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeatureBar;
