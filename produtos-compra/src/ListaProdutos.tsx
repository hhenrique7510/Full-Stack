import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Produto {
  nome: string;
  preco: string;
  descricao: string;
}

function ListaProdutos() {
  const produtosSalvos: Produto[] = JSON.parse(localStorage.getItem("produtos") || "[]");
  const [open, setOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  const navigate = useNavigate();

  const handleComprar = (produto: Produto | null) => {
  if (!produto) return;
  const produtosComprados = JSON.parse(localStorage.getItem("produtosComprados") || "[]");
  produtosComprados.push({ ...produto, status: "aFazer" });
  localStorage.setItem("produtosComprados", JSON.stringify(produtosComprados));
    navigate("/StatusProdutos");
  };

  return (
    <div className="rounded-xl shadow border border-gray-200 overflow-hidden mt-6">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-md font-bold text-gray-700 uppercase text-left">Nome</th>
            <th className="px-6 py-3 text-md font-bold text-gray-700 uppercase text-left">Preço</th>
            <th className="px-6 py-3 text-md font-bold text-gray-700 uppercase text-left">Descrição</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {produtosSalvos.map((produto, idx) => (
            <tr key={idx}>
              <td className="px-6 py-4">{produto.nome}</td>
              <td className="px-6 py-4">R${produto.preco}</td>
              <td className="px-6 py-4">{produto.descricao}</td>
              <td className="px-6 py-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Comprar</button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onSelect={e => {
                        e.preventDefault();
                        setProdutoSelecionado(produto);
                        setOpen(true);
                      }}
                    >
                      Ver detalhes
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>{produtoSelecionado?.nome}</DialogTitle>
          <DialogDescription>{produtoSelecionado?.descricao}</DialogDescription>
          <DialogFooter>
            <Button onClick={() => handleComprar(produtoSelecionado)}>Comprar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ListaProdutos;
