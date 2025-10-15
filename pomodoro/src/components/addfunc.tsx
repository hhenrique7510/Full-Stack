import React from 'react';

interface AddFuncProps {
  nome: string;
  telefone: string;
  onChangeNome: (nome: string) => void;
  onChangeTelefone: (telefone: string) => void;
  onCadastrar: () => void;
  onCancelar: () => void;
}

const AddFunc: React.FC<AddFuncProps> = ({
  nome,
  telefone,
  onChangeNome,
  onChangeTelefone,
  onCadastrar,
  onCancelar,
}) => {
  return (
    <div>
      <label>Nome:</label>
      <input
        type="text"
        value={nome}
        onChange={e => onChangeNome(e.target.value)}
      />
      <label>Telefone:</label>
      <input
        type="text"
        value={telefone}
        onChange={e => onChangeTelefone(e.target.value)}
      />
      <button onClick={onCadastrar}>Cadastrar</button>
      <button onClick={onCancelar}>Cancelar</button>
    </div>
  );
};

export default AddFunc;
