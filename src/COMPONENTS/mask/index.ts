export function formatCNPJ(cnpj: string): string {
  cnpj = cnpj.replace(/\D/g, '');
  cnpj = cnpj.replace(/(\d{2})(\d)/, '$1.$2');
  cnpj = cnpj.replace(/(\d{3})(\d)/, '$1.$2');
  cnpj = cnpj.replace(/(\d{3})(\d)/, '$1/$2');
  cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2');
  return cnpj;
}

export function formatCEP(cep: string): string {
  cep = cep.replace(/\D/g, '');
  cep = cep.replace(/(\d{5})(\d)/, '$1-$2');
  return cep;
}

export function formatCPF(cpf: string): string {
  cpf = cpf.replace(/\D/g, '');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1-$2');
  return cpf;
}
