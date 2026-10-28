describe('Teste de Cadastro de Usuário', () => {
  it('Deve cadastrar um novo usuário com sucesso', () => {
    cy.visit('http://localhost:3000/cadastro');
    
    cy.get('input[name="nome"]').type('João Silva');
    cy.get('input[name="email"]').type('joao@example.com');
    cy.get('input[name="senha"]').type('senha123');
    
    cy.get('button[type="submit"]').click();
    
    cy.contains('Cadastro realizado com sucesso!').should('be.visible');
  });
});
