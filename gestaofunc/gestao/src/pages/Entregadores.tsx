import React, { useState, useRef, useEffect } from "react";

interface Entregador {
  id: number;
  nome: string;
  telefone: string;
  dataCadastro: string;
}

const Entregadores: React.FC = () => {
  const [entregadores, setEntregadores] = useState<Entregador[]>([
    { id: 1, nome: "SmartCardapio", telefone: "(81) 99533-1231", dataCadastro: "09/10/2025" },
    { id: 2, nome: "SmartCardapio 2", telefone: "(81) 91111-2222", dataCadastro: "09/10/2025" },
    { id: 3, nome: "SmartCardapio 3", telefone: "(81) 97777-3333", dataCadastro: "09/10/2025" },
    { id: 4, nome: "SmartCardapio 4", telefone: "(81) 94444-4444", dataCadastro: "09/10/2025" },
    { id: 5, nome: "SmartCardapio 5", telefone: "(81) 96666-5555", dataCadastro: "09/10/2025" }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [novoNome, setNovoNome] = useState("");
  const [novoTelefone, setNovoTelefone] = useState("");
  const [dropdownOpenId, setDropdownOpenId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpenId(null);
      }
    }
    if (dropdownOpenId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [dropdownOpenId]);

  const handleAddOrEditEntregador = () => {
    if (!novoNome.trim() || !novoTelefone.trim()) {
      alert("Preencha todos os campos!");
      return;
    }

    if (editingId !== null) {
      setEntregadores(entregadores.map(e =>
        e.id === editingId
          ? { ...e, nome: novoNome, telefone: novoTelefone }
          : e
      ));
    } else {
      const novoEntregador: Entregador = {
        id: entregadores.length > 0 ? Math.max(...entregadores.map(e => e.id)) + 1 : 1,
        nome: novoNome,
        telefone: novoTelefone,
        dataCadastro: new Date().toLocaleDateString("pt-BR"),
      };
      setEntregadores([...entregadores, novoEntregador]);
    }
    setNovoNome("");
    setNovoTelefone("");
    setEditingId(null);
    setIsModalOpen(false);
  };

  const handleEditEntregador = (entregador: Entregador) => {
    setNovoNome(entregador.nome);
    setNovoTelefone(entregador.telefone);
    setEditingId(entregador.id);
    setIsModalOpen(true);
    setDropdownOpenId(null);
  };

  const handleDeleteEntregador = (id: number) => {
    setEntregadores(entregadores.filter(ent => ent.id !== id));
    setDropdownOpenId(null);
  };

  return (
    <div className="bg-white min-h-screen w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl px-8">
        <div className="flex items-center justify-between mb-7">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Entregadores</h1>
            <p className="text-gray-700 text-sm">Gerencie os entregadores do seu estabelecimento.</p>
          </div>
          <button
            onClick={() => { setIsModalOpen(true); setEditingId(null); setNovoNome(""); setNovoTelefone(""); }}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 shadow"
          >
            + Novo Entregador
          </button>
        </div>
        <div className="rounded-xl shadow border border-gray-200 overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-md font-bold text-gray-700 uppercase">Nome</th>
                <th className="px-6 py-3 text-md font-bold text-gray-700 uppercase">Telefone</th>
                <th className="px-6 py-3 text-md font-bold text-gray-700 uppercase">Data de cadastro</th>
                <th className="px-3 py-3 text-right text-md font-bold text-gray-700 uppercase">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {entregadores.map((entregador) => (
                <tr key={entregador.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm text-gray-900">{entregador.nome}</td>
                  <td className="px-6 py-3 text-sm text-gray-700">{entregador.telefone}</td>
                  <td className="px-6 py-3 text-sm text-gray-700">{entregador.dataCadastro}</td>
                  <td className="px-3 py-3 text-right">
                    <div className="relative inline-block" ref={dropdownOpenId === entregador.id ? dropdownRef : null}>
                      <button
                        className="p-2 hover:bg-gray-200 rounded-full"
                        onClick={() => setDropdownOpenId(dropdownOpenId === entregador.id ? null : entregador.id)}
                      >
                        <span className="text-2xl">⋮</span>
                      </button>
                      {dropdownOpenId === entregador.id && (
                        <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-lg border border-gray-100 z-10">
                          <button
                            onClick={() => handleEditEntregador(entregador)}
                            className="w-full flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-100"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6 6M4 21h7l9-9a2.828 2.828 0 00-4-4l-9 9v7z" /></svg>
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteEntregador(entregador.id)}
                            className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            Deletar
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-xl shadow-lg p-8 w-[420px] relative flex flex-col">
              <button onClick={() => { setIsModalOpen(false); setEditingId(null); }} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl" >✕</button>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                {editingId !== null ? "Editar Entregador" : "Novo Entregador"}
              </h2>
              <p className="text-gray-500 text-sm mb-5">
                Preencha os dados {editingId !== null ? "para editar o" : "do novo"} entregador abaixo.
              </p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
                <input
                  type="text"
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                  placeholder="Nome completo do entregador"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone *</label>
                <input
                  type="text"
                  value={novoTelefone}
                  onChange={(e) => setNovoTelefone(e.target.value)}
                  placeholder="(00) 00000-0000"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => { setIsModalOpen(false); setEditingId(null); }}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddOrEditEntregador}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                >
                  {editingId !== null ? "Salvar" : "Cadastrar"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Entregadores;