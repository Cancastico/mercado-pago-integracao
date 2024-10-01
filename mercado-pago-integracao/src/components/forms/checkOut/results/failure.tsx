import React from 'react';

const FailurePage = () => {

  return (
    <div className="p-8 bg-red-100">
      <h1 className="text-2xl font-bold text-red-700">Pagamento não aprovado!</h1>
      <p className="mt-4 text-red-600">Entre em contato com a operadora do seu cartão!</p>
    </div>
  );
};

export default FailurePage;
