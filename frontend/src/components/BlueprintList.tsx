import React, { useState } from 'react';
import { Blueprint } from '../types';
import { blueprintAPI } from '../services/api';
import { Trash2 } from 'lucide-react';

interface BlueprintListProps {
  blueprints: Blueprint[];
  onBlueprintDeleted?: (id: string) => void;
}

export const BlueprintList: React.FC<BlueprintListProps> = ({ blueprints, onBlueprintDeleted }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this blueprint?')) return;

    setLoading(true);
    setError(null);

    try {
      await blueprintAPI.delete(id);
      if (onBlueprintDeleted) {
        onBlueprintDeleted(id);
      }
    } catch (err) {
      setError('Failed to delete blueprint');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (blueprints.length === 0) {
    return <div className="text-gray-500">No blueprints found</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <h2 className="text-2xl font-bold p-6 border-b">Blueprints</h2>
      {error && <div className="text-red-500 p-4">{error}</div>}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Terms Count</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blueprints.map((blueprint) => (
              <tr key={blueprint.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{blueprint.name}</td>
                <td className="px-6 py-4">{blueprint.description}</td>
                <td className="px-6 py-4">{blueprint.terms.length}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(blueprint.id)}
                    disabled={loading}
                    className="text-red-500 hover:text-red-700 disabled:text-gray-400"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
