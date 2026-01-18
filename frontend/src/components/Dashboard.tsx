import React, { useState, useEffect } from 'react';
import { Blueprint, Contract } from '../types';
import { blueprintAPI, contractAPI } from '../services/api';
import { BlueprintForm } from './BlueprintForm';
import { BlueprintList } from './BlueprintList';
import { ContractForm } from './ContractForm';
import { ContractActions } from './ContractActions';

export const Dashboard: React.FC = () => {
  const [blueprints, setBlueprints] = useState<Blueprint[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [blueprintsData, contractsData] = await Promise.all([
        blueprintAPI.getAll(),
        contractAPI.getAll(),
      ]);
      setBlueprints(blueprintsData);
      setContracts(contractsData);
    } catch (err) {
      setError('Failed to load data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBlueprintCreated = (blueprint: Blueprint) => {
    setBlueprints([...blueprints, blueprint]);
  };

  const handleBlueprintDeleted = (id: string) => {
    setBlueprints(blueprints.filter((b) => b.id !== id));
  };

  const handleContractCreated = (contract: Contract) => {
    setContracts([...contracts, contract]);
  };

  const handleContractStatusChanged = (contract: Contract) => {
    setContracts(
      contracts.map((c) => (c.id === contract.id ? contract : c))
    );
  };

  const handleContractDeleted = (id: string) => {
    setContracts(contracts.filter((c) => c.id !== id));
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Contract Management Platform
          </h1>
        </div>
      </header>

      {error && (
        <div className="max-w-7xl mx-auto my-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <BlueprintForm onBlueprintCreated={handleBlueprintCreated} />
          <ContractForm onContractCreated={handleContractCreated} />
        </div>

        <div className="mb-8">
          <BlueprintList
            blueprints={blueprints}
            onBlueprintDeleted={handleBlueprintDeleted}
          />
        </div>

        {contracts.length > 0 && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <h2 className="text-2xl font-bold p-6 border-b">Contracts</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left">Title</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contracts.map((contract) => (
                    <tr key={contract.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{contract.title}</td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                          {contract.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <ContractActions
                          contract={contract}
                          onStatusChanged={handleContractStatusChanged}
                          onDeleted={handleContractDeleted}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
