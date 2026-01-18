import React, { useState } from 'react';
import { Blueprint } from '../types';
import { blueprintAPI } from '../services/api';

interface BlueprintFormProps {
  onBlueprintCreated?: (blueprint: Blueprint) => void;
}

export const BlueprintForm: React.FC<BlueprintFormProps> = ({ onBlueprintCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [terms, setTerms] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const termsArray = terms.split('\n').filter((t) => t.trim());
      const blueprint = await blueprintAPI.create({
        name,
        description,
        terms: termsArray,
      });

      setName('');
      setDescription('');
      setTerms('');

      if (onBlueprintCreated) {
        onBlueprintCreated(blueprint);
      }
    } catch (err) {
      setError('Failed to create blueprint');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Create New Blueprint</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Terms (one per line)</label>
        <textarea
          value={terms}
          onChange={(e) => setTerms(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {loading ? 'Creating...' : 'Create Blueprint'}
      </button>
    </form>
  );
};
