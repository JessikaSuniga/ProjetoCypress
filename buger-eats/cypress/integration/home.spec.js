
// Describe define o contexto do teste, sobre o que é.
describe('home page', ()=>{
    // it define o ponto a ser testado, o que deve ocorrer.
    it('app deve estar online', ()=>{
        //Controle o tamanho e a orientação da tela para seu aplicativo.
        cy.viewport(1440, 900)

        // Visite um URL remoto.
        cy.visit('https://buger-eats.vercel.app')

        // Confirma o conteúdo do contexto, nesse caso a frase igual.
        cy.get('#page-home main h1').should('have.text', 'Seja um parceiro entregador pela Buger Eats');
        
    })
})