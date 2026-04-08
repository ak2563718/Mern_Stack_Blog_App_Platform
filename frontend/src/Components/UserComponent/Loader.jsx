import { Loader2 } from 'lucide-react';

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
    </div>
  );
}
