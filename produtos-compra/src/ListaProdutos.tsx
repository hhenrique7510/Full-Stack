import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { trpc } from "./utils/trpc"; 


type Produto = {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  status?: string;
  createdAt: string;
};

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

function ListaProdutos() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);



  const { data: produtos, isLoading, error } = trpc.produto.getAll.useQuery();

  const compraMutation = trpc.produto.addCompra.useMutation({
  onSuccess: () => {
    navigate("/StatusProdutos");
  },
  });

  const handleComprar = async (produto: Produto | null) => {
  if (!produto) return;
  await compraMutation.mutateAsync({
    produtoId: produto.id,
    status: "aFazer",
  });
};

  if (isLoading) return <div>Carregando produtos...</div>;
  if (error) return <div>Erro ao carregar produtos.</div>;

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
          {produtos?.map((produto: Produto) => (
            <tr key={produto.id}>
              <td className="px-6 py-4">{produto.nome}</td>
              <td className="px-6 py-4">R${produto.preco.toFixed(2)}</td>
              <td className="px-6 py-4">{produto.descricao}</td>
              <td className="px-6 py-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">
                      Comprar
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onSelect={(e) => {
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
