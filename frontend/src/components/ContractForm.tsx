import React, { useState, useEffect } from 'react';
import { Contract, Blueprint } from '../types';
import { contractAPI } from '../services/api';

interface ContractFormProps {
  blueprints: Blueprint[];
  onContractCreated?: (contract: Contract) => void;
}

export const ContractForm: React.FC<ContractFormProps> = ({ blueprints, onContractCreated }) => {
  const [blueprintId, setBlueprintId] = useState('');
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<Contract['status']>('draft');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (blueprints.length > 0 && !blueprintId) {
      setBlueprintId(blueprints[0].id);
    }
  }, [blueprints]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const contract = await contractAPI.create({
        blueprintId: blueprintId,
        title,
        status,
      });

      setTitle('');
      setBlueprintId('');
      setStatus('draft');

      if (onContractCreated) {
        onContractCreated(contract);
      }
    } catch (err) {
      setError('Failed to create contract');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Create New Contract</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Blueprint</label>
        <select
          value={blueprintId}
          onChange={(e) => setBlueprintId(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select a blueprint</option>
          {blueprints.map((bp) => (
            <option key={bp.id} value={bp.id}>
              {bp.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Contract['status'])}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="draft">Draft</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading || !blueprintId}
        className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {loading ? 'Creating...' : 'Create Contract'}
      </button>
    </form>
  );
};
