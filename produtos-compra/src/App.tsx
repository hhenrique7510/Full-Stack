import { useState } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import { trpc } from "./utils/trpc";


function App() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const navigate = useNavigate();
  const utils = trpc.useUtils();

  const adicionarProduto = trpc.produto.add.useMutation({
  onSuccess: () => {
    utils.produto.getAll.invalidate(); 
  },
});

  const handleAdicionar = async () => {
  await adicionarProduto.mutateAsync({
    nome,
    preco: parseFloat(preco.replace(",", ".")),
    descricao,
  });

  navigate("/ListaProdutos");
  setNome("");
  setPreco("");
  setDescricao("");
};


  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-2 text-gray-700">Adicionar Produto</h2>
      <input
        type="text"
        placeholder="Nome do produto"
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={nome}
        onChange={e => setNome(e.target.value)}
      />
      <NumericFormat
        value={preco}
        onValueChange={values => setPreco(values.value)}
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$ "
        decimalScale={2}
        fixedDecimalScale
        allowNegative={false}
        placeholder="Preço"
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        rows={3}
        placeholder="Descrição"
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        value={descricao}
        onChange={e => setDescricao(e.target.value)}
      ></textarea>
      <button
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold"
        onClick={handleAdicionar}
      >
        Adicionar
      </button>
    </div>
    
  );
}

export default App;