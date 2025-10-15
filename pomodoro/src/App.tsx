import { useState, useEffect } from 'react';
import Modal from './components/Modal';
import './App.css';

interface Func {
  id: number;
  nome: string;
  telefone: string;
  dataCadastro: string;
}

function App() {
  const [dropdownOpenId, setDropdownOpenId] = useState<number | null>(null);
  const [novoNome, setNovoNome] = useState("");
  const [novoTelefone, setNovoTelefone] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [func, setFunc] = useState<Func[]>(() => {
    const data = localStorage.getItem('funcionarios');
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem('funcionarios', JSON.stringify(func));
  }, [func]);

  const salvar = () => {
    if (!novoNome.trim() || !novoTelefone.trim()) {
      alert("Preencha todos os campos!");
      return;
    }

    if (editandoId !== null) {
      setFunc(func.map(f => 
        f.id === editandoId ? { ...f, nome: novoNome, telefone: novoTelefone } : f
      ));
      setEditandoId(null);
    } else {
      setFunc([...func, {
        id: func.length ? func[func.length - 1].id + 1 : 1,
        nome: novoNome,
        telefone: novoTelefone,
        dataCadastro: new Date().toLocaleDateString("pt-BR"),
      }]);
    }

    setNovoNome("");
    setNovoTelefone("");
    setModalOpen(false);
  };

  const excluir = (id: number) => {
      setFunc(func.filter(f => f.id !== id));
      setDropdownOpenId(null);
    
  };

  return (
    <div className="bg-white min-h-screen w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl px-8">
        <div className="flex items-center justify-between mb-7">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Entregadores</h1>
            <p className="text-gray-700 text-sm">Gerencie os entregadores do seu estabelecimento.</p>

            <div>
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 shadow"
                onClick={() => {
                  setEditandoId(null);
                  setNovoNome("");
                  setNovoTelefone("");
                  setModalOpen(true);
                }}
              >
                Adicionar Funcionário
              </button>

              <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome:</label>
                  <input
                    type="text"
                    placeholder="Nome"
                    value={novoNome}
                    onChange={e => setNovoNome(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone:</label>
                  <input
                    type="text"
                    placeholder="Telefone"
                    value={novoTelefone}
                    onChange={e => setNovoTelefone(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  />
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 shadow"
                    onClick={salvar}
                  >
                    {editandoId !== null ? "Salvar Alterações" : "Cadastrar"}
                  </button>
                </div>
              </Modal>
            </div>
          </div>

          <div className="rounded-xl shadow border border-gray-200 overflow-hidden mt-6">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-md font-bold text-gray-700 uppercase text-left">Nome</th>
                  <th className="px-6 py-3 text-md font-bold text-gray-700 uppercase text-left">Telefone</th>
                  <th className="px-6 py-3 text-md font-bold text-gray-700 uppercase text-left">Data de Cadastro</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {func.map(f => (
                  <tr key={f.id} className="border-t">
                    <td className="px-6 py-4">{f.nome}</td>
                    <td className="px-6 py-4">{f.telefone}</td>
                    <td className="px-6 py-4">{f.dataCadastro}</td>
                    <td className="px-6 py-4 text-right relative">
                      <button
                        className="p-2 hover:bg-gray-200 rounded-full"
                        onClick={() =>
                          setDropdownOpenId(dropdownOpenId === f.id ? null : f.id)
                        }
                      >
                        <span className="text-2xl">⋮</span>
                      </button>

                      {dropdownOpenId === f.id && (
                        <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-lg border border-gray-100 z-10">
                          <button
                            className="w-full flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-100"
                            onClick={() => {
                              setEditandoId(f.id);
                              setNovoNome(f.nome);
                              setNovoTelefone(f.telefone);
                              setModalOpen(true);
                              setDropdownOpenId(null);
                            }}
                          >
                            Editar
                          </button>

                          <button
                            className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50"
                            onClick={() => excluir(f.id)}
                          >
                            Deletar
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
