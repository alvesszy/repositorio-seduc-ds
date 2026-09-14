import { useState } from 'react';

function App() {
  const [mensagem, setMensagem] = useState('Aguardando interação.');

  function registrarInfo() {
    console.info('INFO: usuário abriu a aplicação.');
    setMensagem('INFO registrado no console.');
  }

  function registrarAviso() {
    console.warn('WARN: operação merece atenção.');
    setMensagem('WARN registrado no console.');
  }

  function simularErro() {
    try {
      throw new Error('Erro simulado para teste de monitoramento.');
    } catch (error) {
      console.error('ERROR capturado:', error);
      setMensagem(`Erro capturado: ${error.message}`);
    }
  }

  return (
    <main>
      <h1>Painel de Monitoramento</h1>
      <p>{mensagem}</p>
      <button onClick={registrarInfo}>Gerar INFO</button>
      <button onClick={registrarAviso}>Gerar AVISO</button>
      <button onClick={simularErro}>Simular ERRO</button>
    </main>
  );
}

export default App;