import React from 'react';
import { Contract } from '../types';
import { contractAPI } from '../services/api';
import { Trash2 } from 'lucide-react';

interface ContractActionsProps {
  contract: Contract;
  onStatusChanged?: (contract: Contract) => void;
  onDeleted?: (id: string) => void;
}

export const ContractActions: React.FC<ContractActionsProps> = ({
  contract,
  onStatusChanged,
  onDeleted,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleStatusChange = async (newStatus: Contract['status']) => {
    setLoading(true);
    setError(null);

    try {
      const updated = await contractAPI.updateStatus(contract.id, newStatus);
      if (onStatusChanged) {
        onStatusChanged(updated);
      }
    } catch (err) {
      setError('Failed to update status');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this contract?')) return;

    setLoading(true);
    setError(null);

    try {
      await contractAPI.delete(contract.id);
      if (onDeleted) {
        onDeleted(contract.id);
      }
    } catch (err) {
      setError('Failed to delete contract');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const statuses: Contract['status'][] = ['draft', 'pending', 'active', 'completed', 'cancelled'];

  return (
    <div className="flex gap-2">
      {error && <span className="text-red-500 text-sm">{error}</span>}
      {statuses
        .filter((s) => s !== contract.status)
        .map((status) => (
          <button
            key={status}
            onClick={() => handleStatusChange(status)}
            disabled={loading}
            className="text-blue-500 hover:text-blue-700 disabled:text-gray-400 text-sm"
          >
            {status}
          </button>
        ))}
      <button
        onClick={handleDelete}
        disabled={loading}
        className="text-red-500 hover:text-red-700 disabled:text-gray-400"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};
