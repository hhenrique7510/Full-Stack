import { useState } from "react";

interface ProdutoComprado {
  nome: string;
  preco: string;
  descricao: string;
  status: "aFazer" | "emPreparo" | "concluido";
}

function StatusProdutos() {
  const [atualizar, setAtualizar] = useState(0);
  const produtosComprados: ProdutoComprado[] = JSON.parse(localStorage.getItem("produtosComprados") || "[]");

  function trocarStatus(idx: number, novoStatus: ProdutoComprado["status"]) {
    produtosComprados[idx].status = novoStatus;
    localStorage.setItem("produtosComprados", JSON.stringify(produtosComprados));
    setAtualizar(restart => restart  + 1); 
  }

  return (
    <div className="flex gap-6 mt-8">
      <div className="flex-1 bg-gray-50 p-4 rounded">
        <h3 className="font-bold mb-2">A Fazer</h3>
        {produtosComprados.map((p, idx) =>
          p.status === "aFazer" ? (
            <div key={idx} className="mb-2 p-2 bg-white rounded shadow">
              <div>{p.nome}</div>
              <div>{p.descricao}</div>
              <div>R${p.preco}</div>
              <button
                className="mt-2 px-2 py-1 bg-yellow-500 text-white rounded"
                onClick={() => trocarStatus(idx, "emPreparo")}
              >
                Preparar
              </button>
            </div>
          ) : null
        )}
      </div>
      <div className="flex-1 bg-yellow-50 p-4 rounded">
        <h3 className="font-bold mb-2">Em Preparo</h3>
        {produtosComprados.map((p, idx) =>
          p.status === "emPreparo" ? (
            <div key={idx} className="mb-2 p-2 bg-white rounded shadow">
              <div>{p.nome}</div>
              <div>{p.descricao}</div>
              <div>R${p.preco}</div>
              <button
                className="mt-2 px-2 py-1 bg-green-500 text-white rounded"
                onClick={() => trocarStatus(idx, "concluido")}
              >
                Concluir
              </button>
            </div>
          ) : null
        )}
      </div>
      <div className="flex-1 bg-green-50 p-4 rounded">
        <h3 className="font-bold mb-2">Concluído</h3>
        {produtosComprados.map((p, idx) =>
          p.status === "concluido" ? (
            <div key={idx} className="mb-2 p-2 bg-white rounded shadow">
              <div>{p.nome}</div>
              <div>{p.descricao}</div>
              <div>R${p.preco}</div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
//localStorage.clear();


export default StatusProdutos;
